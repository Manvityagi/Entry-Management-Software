const router = require('express').Router();

router.get('/', (req,res)=> {
    res.render("visitor")
});

module.exports = router;
