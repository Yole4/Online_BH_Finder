const db = require('./database');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');
const { sanitizeAndValidate, sanitizeAndValidateArray } = require('../utils/validator and sanitizer/ValidatorAndSanitizer');

const createToken = (_id) => {
    const secretKey = "this is my secret key yole143";

    return jwt.sign({ _id }, secretKey, { expiresIn: "3d" });
}

const registerUser = (req, res) => {
    const { fullname, username, password, confirmPassword } = req.body;
    
    try {
        const findUsername = `SELECT * FROM users WHERE username = ?`;
        db.query(findUsername, [username], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: "Username already exist!" });
                } else {
                    if (!fullname || !password || !confirmPassword) {
                        res.status(401).json({ message: "All fields is required!" });
                    } else {
                        // if (!validator.isEmail(email)) {
                        //     res.status(401).json({message: "Invalid Email!"});
                        // }else{
                        // check pass and conpass
                        if (password === confirmPassword) {
                            if (password.length > 7) {
                                // register user
                                const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
                                const registerUser = `INSERT INTO users (fullname, username, password) VALUES (?, ?, ?)`;
                                db.query(registerUser, [fullname, username, hashedPassword], (error, results) => {
                                    if (error) {
                                        res.status(401).json({ message: "Server side error!" });
                                    } else {
                                        // user register response
                                        // create token
                                        const userId = results.insertId;
                                        
                                        const token = createToken(userId);
                                        res.status(200).json({ message: "New user has been successfully registered!", token: token, id: userId});
                                    }
                                });
                            } else {
                                res.status(401).json({ message: "Password must have at least 7 characters!" });
                            }
                        } else {
                            res.status(401).json({ message: "Password and Confirm password is not equal!" });
                        }
                        // }
                    }
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({message: error});
    }
}

const loginUser = (req, res) => {
    const {username, password} = req.body;

    try {
        if (!username || !password){
            res.status(401).json({message: "Invalid Input!"});
        }else{
            // select username
            const getUsername = `SELECT * FROM users WHERE username = ?`;
            db.query(getUsername, [username], (error, results) => {
                if (error) {
                    res.status(401).json({message: "Server side error!"});
                }else{
                    if (results.length > 0){
                        // get password
                        const dbPassword = results[0].password;
                        // hash user input password
                        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    
                        // check if password is valid
                        if (dbPassword === hashedPassword){
                            // success login
                            // create token
                            // get user id
                            const userId = results[0].id;
                            const token = createToken(userId);
    
                            // send to client
                            res.status(200).json({message: "Login success!", token: token, id: userId});
                        }else{
                            res.status(401).json({message: "Invalid Password!"});
                        }
                    }else{
                        res.status(401).json({message: "Invalid Username!"});
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({message: error});
    }
}

const findUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        // find user id
        const findId = `SELECT * FROM users WHERE id = ?`;
        db.query(findId, [userId], (error, results) => {
            if (error) {
                res.status(401).json({message: "Server side error!"});
            }else{
                if (results.length > 0){
                    res.status(200).json({user: results});
                }else{
                    res.status(401).json({message: "No user found!"});
                }
            }
        });
    } catch (error) {   
        console.log(error);
        res.status(401).json({message: error});
    }
}

const getUsers = async (req, res) => {
    try {
        // fetch all users
        const getUsers = `SELECT * FROM users`;
        db.query(getUsers, (error, results) => {
            if (error) {
                res.status(401).json({message: "Server side error!"});
            }else{
                if (results.length > 0){
                    res.status(200).json({users: results});
                }else{
                    res.status(401).json({message: "No users found!"});
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({message: error});
    }
}

module.exports = { registerUser, loginUser, findUserId, getUsers };