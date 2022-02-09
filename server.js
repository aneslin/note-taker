//const apiRoutes= require('./routes/apiRoutes');
//const htmlRoutes= require('./routes/htmlRoutes');

const express = require('express')

const PORT = process.envPORT || 3001;


const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'))

app.listen(PORT, ()=>{
    console.log(`Server is now on port ${PORT}`)
})