const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const multer = require('multer')

const conn = require('../db')

// test connect to db
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected Successfully");
});

//Create storage
var storage = multer.diskStorage({
    destination:(req, file, callBack) => {
        callBack(null, '../uploads/images/')
    },
    filename: (req, file, callBack) => {
        // callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        callBack(null, file.fieldname + '-' + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
})

//register route
router.post('/register', upload.single('image'), (req,res) => {
    try{
        const {name, surname, phone, email, password, dob, gender, village, district, province} = req.body
        const hashed_password = md5(password)
        const imgsrc = 'http://127.0.0.1:4000/uploads/images/'+ req.file.filename

        const checkEmail = "SELECT email FROM customers WHERE email = '" + email + "'"
        conn.query(checkEmail, [email], (err, result, fileds) => {
            if(!result.length) {
                
                const sql = "INSERT INTO customers (name, surname, phone, email, password, dob, gender, village, district, province, image) VALUES(?,?,?,?,?,?,?,?,?,?,?)"
                conn.query(
                sql, [name, surname, phone, email, hashed_password, dob, gender, village, district, province, imgsrc],
                  (err, result, fields) => {
                    if(err){
                        res.status(500).send({ message: err });
                    }else{
                        let token = jwt.sign({ data: result }, 'secret')
                        res.status(200).send({ data: result, token : token });
                    }
                })
            }
        })
    }catch(err){
        res.status(500).send(err)
    }
})

//login route
router.post('/login', (req, res, next) => {
    try {
        const { email, password } = req.body; 
        
        const hashed_password = md5(password.toString())
        const sql = "SELECT * FROM customers WHERE email = '"+password+"' AND password = '"+password+"'"
        conn.query(
            sql, [email, hashed_password], (err, result, fields) => {
            if(err){
                res.status(500).send({ message: err });
            }else{
                let token = jwt.sign({ data: result }, 'secret')
                res.status(200).send({ data: result, token: token });
            }
        })
    } catch (error) {
        res.status(500).send(err)
    }
});

module.exports = router