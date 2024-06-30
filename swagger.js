const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title: "Todo Backend",
        description: "Todo Backend",
        version: "1.0.0"
    },
    host:'localhost:3000',
    schemes:['http']
};

const output = './swagger.json';
const endpoint = ['./index.js'];

swaggerAutogen(output,endpoint,doc).then(()=>{
    require('./index.js');
})