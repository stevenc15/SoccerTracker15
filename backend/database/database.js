//all elements working=YES, includes the .env file
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'test') {
    dotenv.config({ path: './backend_details.env' }); 
}

let sequelize;
console.log(process.env.POSTGRES_URL);

sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;
/*
const {Sequelize} = require('sequelize');

const dotenv = require('dotenv');
if (process.env.NODE_ENV!=='test'){
    
    dotenv.config({path:'./backend_details.env'}); //relative to server.js location 
}
const useCloud = process.env.USE_CLOUD==='true';

let sequelize;
console.log(process.env.MYSQL_PUBLIC_URL);
console.log(process.env.MYSQLDATABASE);
console.log(process.env.MYSQLUSER);
console.log(process.env.MYSQLPASSWORD);
if(useCloud){
    sequelize=new Sequelize(process.env.CL_DB_NAME, process.env.CL_DB_USER, process.env.CL_DB_PASSWORD, {
        host:process.env.CL_DB_HOST,
        dialect:'mysql',
    });
}else{
    console.log("not cloud");
    sequelize=new Sequelize(process.env.MYSQL_PUBLIC_URL, {
        dialect:'mysql',
    });
}

module.exports= sequelize;
*/