//  to process user request only 

const express = require('express');
const router = express.Router();
const Model = require('../models/userModel');



// RESPPONSE CODES
//200 - SUCCESSFUL
//400 - CLIENT SIDE ERROR
//500 -SERVER SIDE ERROR


router.post('/add', (req, res) => {
  console.log(req.body);


  new Model(req.body).save()
    .then((result) => {
      console.log(result);
      res.json(result);

    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);

    });

})
router.get('/getall', (req, res) => {


  Model.find({})
    .then((result) => {
      console.log(result);
      res.json(result);
    }).catch((err) => {
      console.log(err);
      res.json(err);

    });

})
router.get('/getbyemail/:email/', (req, res) => {
  console.log(req.params.email);
  Model.find({ email: req.params.email })
    .then((result) => {
      res.json(result);

    }).catch((err) => {
      res.json(err);

    });

})

router.delete('/delete/:id', (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);

    }).catch((err) => {
      res.json(err);

    });


})

router.post('/authenticate', (req, res) => {

  const formdata = req.body;

  Model.findOne({email : formdata.email, password : formdata.password})
  .then((result) => {
      if(result){
          res.status(200).json(result);
      }else{
          res.status(401).json({status : 'login failed'});
      }
  })
  .catch((err) => {
      console.log(err);
      res.status(500).json(err);
  });

})

module.exports = router;