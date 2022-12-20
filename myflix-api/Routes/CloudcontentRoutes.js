const { getContentUrl } = require("../Controllers/CloudContentController");
const router = require("express").Router();
let Content =require("../Models/CloudContentModel");

router.route('/geturl/:id').get((req, res) => {
    const {id} = req.params;
    Content.findOne({id})
    .then(Contents => {res.json(Contents);
    //console.log("here at cloudcentent routes");
})
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{
    const id = req.body.id;
    const url = req.body.url;
    const newContent = new Content({id,url});

    newContent.save()
    .then(()=> res.json('Content added!'))
    .catch(err=> res.status(400).json('Error: '+ err));
});
//router.get("/geturl/:id", getContentUrl);


module.exports = router;