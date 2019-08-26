# Burger app
The Burger Eater App
Burger eater is an application that lets the user list names of Burgers, which will be posted in the waiting to be devoured list; then the user can click on the devoured button which will take the burger data to the devoured burgers column.  

This application uses mysql, express, handlebars node packages; and it applies the ORM structure to reuse the ORM module for new possible tables coming in so it can make it easier in case of any updates to its code.

Important: 
- to run this code in your command line: 
    * create your own database, I used mysql. This code works with the table "burgers". information on the table and colums are in the 
    schema.sql file
    * Add your database interfase information in  config/connection.js file to connect the server to your database.
    * Before running this code, install the different packages (dependecies); run npm i 
    in the command line.


*This code has been deployed to heroku, example on how the page works at: https://burgers-eater-app.herokuapp.com/*

Developer: Ginna Campbell Technologies applied: Node.js