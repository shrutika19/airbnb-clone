const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Booking = require('./models/Booking.js');
const Accomodation = require('./models/Accomodation.js');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Razorpay = require('razorpay');
const crypto = require("crypto");

require('dotenv').config()

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'gwft83fegv3hhi3ub3jecbvuvghi84ghb4bjnryv7'

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(__dirname + '/assests'))
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

app.post('/checkout', async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };
        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something went worng!" })
            }
            res.status(200).json({ data: order })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Sever Error!" });
    }

})

//verify the payment
app.post('/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(sign.toString())
            .digest("hex");
        if (razorpay_signature === expectedSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Sever Error!" });
    }
})

app.get('/api/getkey', (req, res) => {
    return res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
})

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        })
    })
}

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/test', (req, res) => {
    res.send('Hello, World! testing');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });

        res.json(userDoc)
    } catch (error) {
        res.status(422).json(error)
    }

});

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const userDoc = await User.findOne({ email });

//         if (!userDoc) {
//             return res.status(401).json({ message: 'User not found!' });
//         }
//         const isPasswordMatch = bcrypt.compareSync(password, userDoc.password);
//         if (!isPasswordMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }
//         // Generate JWT token
//         jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (error, token) => {
//             if (error) {
//                 console.error('JWT signing error:', error);
//                 return res.status(500).json({ message: 'Failed to generate token' });
//             }
//             // Set token as a cookie
//             res.cookie('token', token, { httpOnly: true });
//             res.status(200).json({ userDoc, message: 'Login successful!' });
//         });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (userDoc) {
        const isPasswordMatch = bcrypt.compareSync(password, userDoc.password);
        if (isPasswordMatch) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (error, token) => {
                if (error) throw error;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok')
        }
    } else {
        res.json("not found");
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        })
    } else {
        res.json(null);
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})



app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newPhotoName = 'image' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/assests/' + newPhotoName,
    });
    res.json(newPhotoName)
});

const imageMiddleware = multer({ dest: 'assests/' });
app.post('/upload', imageMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('assests\\', ''));
    }
    res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, perks, additionalInfo, checkIn, checkOut, maxGuests, price } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const accomodationDoc = await Accomodation.create({
            owner: userData.id,
            title, address, addedPhotos, description, perks, additionalInfo, checkIn, checkOut, maxGuests, price
        })
        res.json(accomodationDoc)
    });

})

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Accomodation.find({ owner: id }));
    });
})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Accomodation.findById(id));
})

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const { id, title, address, addedPhotos, description, perks, additionalInfo, checkIn, checkOut, maxGuests, price } = req.body;
    console.log({ price })
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Accomodation.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, addedPhotos, description, perks, additionalInfo, checkIn, checkOut, maxGuests, price
            })
            await placeDoc.save();
            res.json('ok');
        }
    })
});

app.get('/places', async (req, res) => {
    res.json(await Accomodation.find())
})

app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const { place, checkInDate, checkOutDate, numberOfGuests, name, mobile, price } = req.body;
    Booking.create({
        place, checkInDate, checkOutDate, numberOfGuests, name, mobile, price,
        user: userData.id
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    })
})



app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
