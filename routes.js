const express = require('express');
const routers = express.Router();
const User = require('./db').users
const payment = require('./db').payment

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { Router } = require('express');

const auth = require('./auth')
routers.get('/', function (req, res, next) {
    res.send('imad');
});

routers.get('/signup', (req, res) => {
    var userMail = req.body.userMail
    var userPass = req.body.userPass
    User.findOne({ userMail: userMail }, async (err, user) => {
        if (err) {
            console.log(err)
            return res.status(500).send()
        }
        if (!user) {
            console.log('user not found')
            return res.status(404).send()
        }
        else {
            const vaildPass = await bcrypt.compare(req.body.userPass, user.userPass)
            if (!vaildPass) {
                res.status(400).send('invalid Password')
            }
            else {
                var token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '30s' })
                res.header('authToken', token)
                return res.status(200).send(token)
            }
        }

    })
});

routers.post('/register', async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.userPass, salt)
    User.findOne({ userMail: req.body.userMail }, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(400).send('error')
        }
        if (!user) {
            var newuser = new User()
            newuser.userName = req.body.userName
            newuser.userMail = req.body.userMail
            newuser.userPass = hashedPass
            newuser.userNum = req.body.userNum
            newuser.trips = []
            newuser.newsLetter = req.body.newsLetter
            newuser.save((err, saveduse) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send('error')
                }
                return res.status(200).send('created')
            })
        }
        else
            return res.status(400).send('user existed')
    })


});


// //routers.post('/payment', auth, (req, res) => {

//     // auth(req, res)
//     User.findOne({ _id: req.user._id }, (err, data) => {
//         if (err) {
//             res.status(400).send('err')
//         }
//         return res.status(200).send(data)
//     })
// })

routers.post('/checkpayment',(req,res)=>{
    console.log(req.body)
   // res.send(req.body)
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

//today = mm + '/' + dd + '/' + yyyy;
today = new Date();
var ex = new Date(req.body.exDate)
console.log(new Date(req.body.exDate))
payment.findOne({exDate: req.body.exDate,creditCard: req.body.creditCard,cvv: req.body.cvv},(err,data)=>{
    console.log(today)
    if(ex.getTime()>today.getTime()){
        return res.status(200).send(data)
       }
    return   res.status(400).send('err')
    
}) 
  
})



module.exports = routers;
