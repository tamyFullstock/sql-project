import express from 'express';
import con from '../models/db.js';
import User from '../models/userDl.model.js'
import Password from '../models/passwordDl.model.js';

//register route

const registerRoute = app => {

    const router = express.Router();

    router.post('/', function(req, res) {

        const {  name, username, password, email, address, phone, website, company } = req.body;
        //user must have username or password or email
        if(!username || !password || !email){
            res.status(400).send('missing user details');
        }
        //check there is no user with the same username yet
        con.query(`select * from users where username = "${username}"`, function(error, data) {
            if (error) {
                res.status(500).send('Internal Server Error');
                return;
            }
            //any user must have another username
            if (data.length > 0) {
                res.status(400).send('please choose another username');
            }
        });
        //create a user and insert him to the DB
        const new_user = new User({
            name: name,
            username: username,
            password: password,
            email: email,
            address: address,
            phone: phone,
            website: website,
            company: company
        })
        let user_id;
        // Save user in the database
        User.create(new_user, (err, data) => {
            if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while register the user."
            });
            //user created successfully: create a password for the user:
            else {
                user_id = data.id;
                // Create a password
                const new_password = new Password({
                    userId : user_id,
                    username : req.body.username,
                    password: req.body.password,
                });
                // Save password in the database using the DL layer, then return the response object with status code and data the error is a data
                Password.create(new_password, (err, data) => {
                    if (err)
                        res.status(500).send({
                        message:
                            err.message || "Some error occurred while register the user."
                        });
                    //succeed to cretae user and password in DB:
                    else res.send("user registered successfully");
                });
            }
        });
     });

    app.use('/register', router);
};

export default registerRoute;