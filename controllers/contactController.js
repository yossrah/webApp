const contactModel=require('../models/contactmodel')
module.exports = {
    save:function(req, res){
        new_email={
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text,
        }
        contactModel.create(new_email, function(err, email) {
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'email created', statut: 200, data: email })
            }
        })
    },

    
    getEmails:function(req, res){
        contactModel.find({}).exec(function(err, emails) {
        if (err) {
            res.json({ message: 'error' + err, statut: 500, data: null })
        } else {
            res.json({ message: 'all emails :', statut: 200, data: emails })
        }
    })
    

    }

}