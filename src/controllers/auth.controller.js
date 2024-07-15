const User = require('../models/user.model.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).send( { message: 'User created sucessfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send( { message: 'Error creating user', error })
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`Attempting to login user: ${username}`);

        const user = await User.findOne({ username });
        if (!user) { 
            console.error('User not found');
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        console.log(`User found: ${user}`); // Log the user found
        console.log(`Comparing password: ${password}`);

        const isPasswordCorrect = await user.comparePassword(password);
        console.log(`Password comparison result: ${isPasswordCorrect}`);
        
        if (!isPasswordCorrect) {
            console.error('Incorrect password');
            return res.status(401).send({ message: 'Invalid credentials'});
        }

        console.log('User authenticated successfuly');
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const hash = crypto.createHash('sha256').update(token).digest('hex')
        res.send({ token, hash });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send({ message: 'Error logging in', error })
    }
};

module.exports = { register, login }; 