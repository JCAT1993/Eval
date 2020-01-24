const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const trans = require('../Data/transactions.json');
const cuentas = require('../Data/cuentas.json');

router.get('/', (req, res) => {
    res.send("Api para transacciones");
});


//Método para obtener todas las transacciones de la cuenta
router.get('/allTrans', (req, res) => {
    
	console.log("rb=",req.body)
	const { fromAccount } = req.body;

	var respuesta={}
	var tran='Transactions'
	respuesta[tran]=[]

	_.each(trans, ( i) => {
	
			console.log("fromAccount=",fromAccount)
            if (i.fromAccount === fromAccount || i.toAccount === fromAccount) {
				console.log("entro algo")
                respuesta[tran].push(i)
            }
			
			console.log("todas las transacciones de la cuenta",respuesta)

        });
	
    res.json(respuesta);
	
	
});

//Método para realizar transacciones hacia otra cuenta
router.get('/sent_trans', (req, res) => {
	
	console.log("rb=",req.body)
	const { fromAccount } = req.body;

	var respuesta={}
	var tran='Transactions'
	respuesta[tran]=[]
	
	_.each(trans, ( i) => {
	
			console.log("fromAccount=",fromAccount)
            if (i.fromAccount === fromAccount) {
				console.log("entro algo")
                respuesta[tran].push(i)
            }
			
			console.log("transacciones a otra cuenta=",respuesta)

        });
	
    res.json(respuesta);
});

//Método para obtener transacciones recibidas
router.get('/rec_trans', (req, res) => {
	
	console.log("rb=",req.body)
	const { fromAccount } = req.body;

	var respuesta={}
	var tran='Transactions'
	respuesta[tran]=[]
	
	_.each(trans, ( i) => {
			console.log("fromAccount=",fromAccount)
            if (i.toAccount === fromAccount) {
				console.log("entro algo")
                respuesta[tran].push(i)
            }
			
			console.log("transacciones recibidas=",respuesta)

        });
	
    res.json(respuesta);
});


//Método para transferir de una cuenta a otra
router.post('/transfer', (req, res) => {

    const { fromAccount, toAccount, amount } = req.body;
	const sentAt = new Date()
    const newTrans = { ...req.body, sentAt };
    if (fromAccount && toAccount && amount) {
        trans.push(newTrans);
		_.each(cuentas, (i) => {
            //if (cuenta.account === fromAccount && parseFloat(cuenta.balance)>= parseFloat(-500.00) ) {
            if (i.account === fromAccount) {
                i.balance-=amount
            }
			if (i.account === toAccount) {
                i.balance+=amount
            }
        });
		
        res.json(trans);
    } else {
        res.status(500).json({error: 'Ocurrio un Error'});
    }
});

module.exports = router;