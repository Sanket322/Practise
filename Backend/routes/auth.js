const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { body, validationResult } = require('express-validator');   //this is for validator from website
const bcrypt = require('bcrypt');       //this is for using salt in password hashing
var jwt = require('jsonwebtoken');      //this is for jwt authentcation
const fetchuser = require('../middleware/fetchuser'); //for the fetchuser

const JWT_SECRET = "HarryisgoodB$oy"    //this is in jwt authentication for signature

//ROUTE 1 : create a user using : POST "/api/auth/createuser" - no login is required
router.post('/createuser',
    body('email', 'Enter A valid Email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password Must be Atleast 5 charactes').isLength({ min: 5 }),
    //body('parameter', 'message you want to send if not validate').isLength({ min: 5 }),
    //above 3 lines are for validation of email,name,password  taken from express-validator website

    async (req, res) => {

        // if there are error return bad request and the errors
        //here errors will contain errors after validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //the above code is for validation which is taken from express-validator website

        try {
            //check whether user with this email exist already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ errors: "This Email Id Already Exists " });
            }

            //here we have use await because it is promise , we will have to wait until salt is generated so
            // await is used
            const salt = await bcrypt.genSalt(10);    //generate a salt
            const secPass = await bcrypt.hash(req.body.password, salt)

            //create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            const data = {       //this is part of jwt authentiation
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);   //this is part of jwt authentication

            res.json(authtoken);
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server  Error Occured");
        }

    }
)

//ROUTE 2 : authenticate a user using : Post  "/api/auth/login"
router.post(
    '/login', [
    body('email', 'Enter A valid Email').isEmail(),
    body('password', 'PasswordCan Not Be Blank').exists(),
],
    async (req, res) => {

        // if there are error return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });    //finding the user with email
            if (!user) {                             //if user does not exist
                return res.status(400).json({ errors: "Please try to login with correct login credentials" })
            }

            const passwordCompare = await bcrypt.compare(password, user.password);    //comparing the password
            if (!passwordCompare) {                                             //if password is not write
                return res.status(400).json({ errors: "Please try to login with correct login credentials" })
            }
            //if password is correct then send token
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);   //this is part of jwt authentication
            res.json(authtoken);

        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server Error Occured");
        }

    }
)

//ROUTE 3 : Get logged in user details using POST : "/api/auth/getuser" , login required
//here fetchuser is middleware - we want that whenever this function is caleed that middleware is also called
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error Occured");
    }

});

module.exports = router;