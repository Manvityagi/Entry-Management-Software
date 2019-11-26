const router = require("express").Router(),
  Host = require("../models/host"),
  Visitor = require("../models/visitor");

router.get("/", async (req,res)=>{
    const visitors = await Visitor.find().populate("host_alloted");
    try{
        //  console.log(visitors);
        res.render("dashboard",{visitors: visitors});
    }
    catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
   
});

module.exports = router;