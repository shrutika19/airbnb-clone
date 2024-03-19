const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs')
require('dotenv').config()

const bcryptSalt = bcrypt.genSaltSync(10);

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

})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
