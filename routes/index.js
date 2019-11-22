const router = require('express').Router();

router.get('/', (req,res)=> {
    res.json("Home page")
});

module.exports = router;
