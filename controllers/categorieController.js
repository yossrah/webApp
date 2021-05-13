const categorieModel=require('../models/categorieModel')
module.exports={
    addCategorie: function(req, res) {

        categorieModel.create({
                titre: req.body.titre,
                ref: req.body.ref,
                image:req.file.filename
            },
            function(err, categorie) {
                if (err) {
                    res.json({ message: 'error' + err, statut: 500, data: null })
                } else {
                    res.json({ message: 'Categorie created', statut: 200, data: categorie })
                }
            })
    },
    getImage:function(req,res){
        file=req.params.file
        console.log('file',file)
        res.sendFile(__dirname+ '/uploads/'+file)
    },
    getAllcategories: function(req, res) {
        categorieModel.find({}).exec(function(err, categories) {
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'les categories :', statut: 200, data: categories })
            }
        })
    },
    getById: function(req, res) {
        categorieModel.findById({ _id: req.params.id }).exec(function(err, categorie) {
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'categ By Id :', statut: 200, data: categorie })
            }
        })

    },
    updatecat: function(req, res) {
        categorieModel.findByIdAndUpdate({ _id: req.params.id }, {
                $set: {
                    titre: req.body.titre,
                    ref: req.body.ref,
                    image:req.body.image
                }

            }, { runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true },
            function(err, categorie) {
                if (err) {
                    res.json({ message: 'error' + err, statut: 500, data: null })
                } else {
                    res.json({ message: 'categ updated:', statut: 200, data: categorie })
                }

            })
    },
    deletecategr: function(req, res) {
        categorieModel.findByIdAndDelete({ _id: req.params.id }, function(err) {
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'categorie deleted:', statut: 200 })
            }

        })
    },
   
   
}