const router = require('express').Router();
const connection = require('../database.js');

router.get('/user', function (req, res, next) {
    const username = req.body.username;
    // const course = req.params.course;
    const findusernameQuery = {
        text: 'SELECT * FROM users',
    };
    console.log(findusernameQuery)
    connection.query(findusernameQuery, (error, results) => {
        if (error) {
            console.log(error);
            res
                .status(500)
                .json({
                    Error: 'Something went wrong while finding for user'
                });
        } else {
            if (results.rows.length === 0) {
                res.status(404).json({
                    error: `unable to retrieve users`
                });
            } else {
                res.json({
                    username: results.rows
                });
            }
        }
    });
});


router.put('/updateUsername', (req, res) => {
    
    var email = req.body.email;
    var username = req.body.username;
    const updateEmailQuery = `
        UPDATE users
        SET username = $1
        WHERE email = $2;
        `;
  
    connection.query(updateEmailQuery, [username, email], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Error while updating username' });
      } else {
        console.log(results);
        if (results.rowCount === 1) {
          res.status(200).json({ message: 'Updated username successfully' });
        } else {
          res.status(404).json({ error: `user name ${username} not found` });
        }
      }
    });
  });


  router.post('/createuser', (req, res) => {
    
    var email = req.body.email;
    var username = req.body.username;
    const createUserQuery = `
    INSERT INTO users(username, email)
    VALUES ($1, $2);
        `;
  
    connection.query(createUserQuery, [username, email], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Error while creating user' });
      } else {
        console.log(results);
        if (results.rowCount === 1) {
          res.status(200).json({ message: 'Successfully created user' });
        } else {
          res.status(404).json({ error: `Unable to create user ${username}` });
        }
      }
    });
  });

  router.delete('/delete', function (req, res, next) {
    const email = req.body.email;
    connection
        .query(`DELETE FROM users WHERE email = $1`, [email])
        .then(function (result) {
            return res.sendStatus(200);
        })
        .catch(function (error) {
            console.log(error);
            return next(error);
        });
});

module.exports = router;