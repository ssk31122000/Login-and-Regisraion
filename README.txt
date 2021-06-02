# HackrushProject

****** TO RUN CODE ******

Install node js in your system
Start the Apache and MySQL servers in XAMPP
open command promt in he project folder
run command 'npm insall'
after installing pakages, run 'node app.js'

go to the browser and type url- http://localhost:3001/

****** DATABASE CREATION ******

The login and registration functionality will not work without a database
to create one, download XAMPP
In XAMPP control panel, start Apache and MySQL servers
click on Admin button corresponding to MySQL server
On Admin page, go to SQL tab and run the following query-

CREATE DATABASE nodeJslogin;

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255),
    password varchar(255),
    branch varchar(255),
    PRIMARY KEY (id)
);
