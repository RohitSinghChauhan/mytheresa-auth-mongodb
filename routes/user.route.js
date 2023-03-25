const { Router } = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

const userRoute = Router();

userRoute.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        bcrypt.hash(password, 5, async function (err, hash) {
            await UserModel.create({ email, password: hash });
            res.send({ 'msg': 'User signed up successfully' });
        })

    }
    catch (err) {
        console.log('Something went wrong', err);
    }
})

module.exports = userRoute;