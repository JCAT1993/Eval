const express = require('express');

const app = express();

app.set('port', process.env.PORT || 4000);


app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(require('./routes'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/balance', require('./routes/balance'));


app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});