let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let HttpError = require('./src/models/httpErrors');
const fs = require('fs');
const path = require('path');
let storeRoutes = require('./src/routes/store-routes');
let requestRoutes = require('./src/routes/request-routes');
const adminRoutes = require('./src/routes/admin-routes');

let app = express();

app.use(bodyParser.json());

app.use('/uploads/images',express.static(path.join('uploads','images')));
//express.static makes it available for us to return a file

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use('/products',storeRoutes);
app.use('/request',requestRoutes);
app.use('/admin',adminRoutes);

app.use((req,res,next)=>{
    throw new HttpError('wrong route put',404);
});

app.use((error, req, res, next) => {
    if(req.file){
        fs.unlink(req.file.path,(err)=>{console.log(err)});
    }
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message:  error.message || "An unknown error occurred!" });
});


mongoose.connect('mongodb+srv://Randy:beauty@cluster0.q6xbz.mongodb.net/ECommerce?retryWrites=true&w=majority')
    .then(()=>{
        app.listen(5000,()=>{console.log('app running on port 5000')});
    })
    .catch(err => console.log(err));
