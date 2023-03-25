const { Router } = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

const userRoute = Router();

userRoute.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userAlreadyPresent = await UserModel.findOne({ email });
        if (userAlreadyPresent?.email) {
            res.send({ 'msg': 'user already present' });
        }
        else {
            bcrypt.hash(password, 5, async function (err, hash) {
                await UserModel.create({ email, password: hash });
                res.send({ 'msg': 'User signed up successfully' });
            })
        }
    }
    catch (err) {
        console.log('Something went wrong', err);
    }
})

module.exports = userRoute;