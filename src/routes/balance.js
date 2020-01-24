const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const cuentas = require('../Data/cuentas.json');

//Método para acceder al balance dada una cuenta
router.get('/', (req, res) => {
	
	console.log("rb=",req.body)
	const { account } = req.body;

	var o = {}
	var key = 'Orientation Sensor';
	o[key] = []; 
	var respuesta={}
	var tran='balance'
	respuesta[tran]=[]
	_.each(cuentas, ( i) => {
	
			console.log("fromAccount=",account)
            if (i.account === account) {

                respuesta[tran].push(i)
            }
			
			console.log("balance=",respuesta)

        });
	
    res.json(respuesta);
});



module.exports = router;