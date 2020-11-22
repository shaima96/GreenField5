//requiring the payment schema
const PaymentModel = require('../DataModel').payment

exports.payment = (req, res) => {
    var today = new Date();
    var ex = new Date(req.body.exDate)
    var cvv = req.body.cvv
    var creditCard = req.body.creditCard
    //check payment information for the database
    PaymentModel.findOne({ cvv: cvv, creditCard: creditCard, exDate: ex }, (err, data) => {
        if (err) {
            return res.status(400).send('wrong format')
        }
        if (!data)
            return res.status(401).send('wrong data')
        //check exp. date for the Credit Card
        else {
            if (ex.getTime() > today.getTime()) {
                return res.status(200).send(data)
            }
            else
                return res.status(406).send('expired')
        }
    })
}

exports.check = (req, res) => { return (req.user) }