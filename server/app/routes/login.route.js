import express from 'express';
import con from '../models/db.js';

const loginRoute = app => {

    const router = express.Router();

    router.post('/', function(request, response) {

        const { username, user_password } = request.body;

        if (username && user_password) {
            const query = `
                SELECT * FROM passwords
                WHERE username = "${username}"
            `;

            con.query(query, function(error, data) {

                if (error) {
                    response.status(500).send('Internal Server Error');
                    return;
                }

                if (data.length > 0) {

                    const user = data.find(entry => entry.password === user_password);
                    
                    if (user) {
                        request.session.user_id = user.user_id;
                        response.redirect("/");
                    } else {
                        response.status(401).send('Incorrect Password');
                    }

                } else {
                    response.status(404).send('Incorrect username');
                }
            });
        } else {
            response.status(400).send('Please Enter user name and Password Details');
        }
    });

    app.use('/login', router);
};

export default loginRoute;