const express = require('express');
const {engine} = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session')
const bodyParser = require('body-parser')

const loginRoutes = require('./routes/login')
const routerPdf = require('./routes/pdfs');

const app = express();

app.set('port', 4000);

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());

app.use(myconnection(mysql, {
    host: '108.62.106.26',
    user: 'root',
    password: '',
    port: 3306,
    database: 'nodelogin'
}))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))



app.listen(app.get('port'), () => {
    console.log('Corriendo en puerto ', app.get('port'));
});

app.use('/', loginRoutes);

app.get('/',(req, res) => {
    if(req.session.loggedin == true){

        res.render('home',{ name: req.session.name});

    } else {
        res.redirect('/login')
    }
})

app.use('/', routerPdf);