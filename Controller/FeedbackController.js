//requiring the feedback schema
const UserModel = require('../DataModel').feedback


exports.addFeedback = async (req, res) => {
    // Feedback Data
    userMail = req.body.userMail
    UserModel.findOne({ userMail: req.body.userMail }, (err, feedback) => {
        if (err) {
            console.log(err)
            return res.status(400).send('error')
        }
        var newFeedback = new UserModel()
        newFeedback.userName = req.body.userName
        newFeedback.userMail = req.body.userMail
        newFeedback.feedback = req.body.feedback
        newFeedback.save((err, saveduse) => {
            if (err) {
                res.status(400).json({ 'error': err })
                res.status(201).json('sucessfully')
            }
        })
    })
}


