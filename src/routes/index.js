const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
    
    res.json("Rest api transacciones");
});  

module.exports = router;
