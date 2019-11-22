const router = require('express').Router();

router.get('/', (req,res)=> {
    res.render("host")
});

router.post('/', (req,res)=> {
    res.render("host")
});

module.exports = router;
