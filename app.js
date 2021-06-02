const express =require('express');
const mysql=require('mysql');
const dotenv=require('dotenv');
const path=require('path');
const cookieParser=require('cookie-parser');

dotenv.config({path:'./.env'});

const app=express();

const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory=path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieParser());


app.set('view engine', 'hbs');


db.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("MySql Connected...");
    }
})

//define routs
app.use('/',require('./routs/pages'));
app.use('/auth',require('./routs/auth'));


app.listen('3001',()=>{
    console.log('server started on port 3001');
});

