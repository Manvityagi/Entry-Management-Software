const router = require('express').Router(),
      Visitor = require('../models/visitor');

router.get('/checkin', (req,res)=> {
    res.render("visitor_checkin")
});

router.get('/checkout', (req,res)=> {
    res.render("visitor_checkout")
});

router.post('/checkin', (req,res)=> {
    Visitor.create(req.body, (err,newVisitor) => {
        if(err){
            console.log(err);
        }else{
            console.log(newVisitor);
            res.redirect("/visitor/checkin")
        }
    });
});

module.exports = router;
