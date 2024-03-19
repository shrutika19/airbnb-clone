const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs')
require('dotenv').config()

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'gwft83fegv3hhi3ub3jecbvuvghi84ghb4bjnryv7'

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URL);


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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });

        if (!userDoc) {
            return res.status(401).json({ message: 'User not found!' });
        }
        const isPasswordMatch = bcrypt.compareSync(password, userDoc.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (error, token) => {
            if (error) {
                console.error('JWT signing error:', error);
                return res.status(500).json({ message: 'Failed to generate token' });
            }
            // Set token as a cookie
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ userDoc, message: 'Login successful!' });
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
