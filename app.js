BASE_PATH                      = __dirname;
process.env.NODE_CONFIG_DIR    = 'config/';
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path')


const walletBook               = require('./walletBook');
const question               = require('./question');


const express                   = require('express');
app                           = express();
const port = process.env.PORT || 8080;  




app.get('/*', (req, res) => {res.sendFile(path.join(__dirname, './index.html'));})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



var httpServer = http.createServer(app);



app.post('/calculateWalletPrices',       walletBook.calcuateWalletPrices);
app.post('/findLeastSum',                question.findLeastSum);

httpServer.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
  
    console.log(`server is listening on ${port}`)
  })




