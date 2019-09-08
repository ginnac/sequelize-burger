//same file as routes...
var express = require("express");
var router = express.Router();


var db = require("../models");

// Extracts the sequelize connection from the models object
var sequelizeConnection = db.sequelize;

// Sync the tables
sequelizeConnection.sync();

//create router and export it at the end of the file

//render html with database table data
router.get("/", function(req, res) {
  db.Burger.findAll({include: [db.Customer]}).then(function(data) {
      
  // Pass the returned data into a Handlebars object and then render it
    var tableObject = { burgers: data };
    //console.log(data);
    res.render('index', tableObject);
    
  });
});

//find customer by id
router.get("/api/customers/:id", function(req, res) {
  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Post
  db.Customer.findOne({
    where: {
      id: req.params.id
    },
    include: [db.Burger]
  }).then(function(dbCustomer) {
    //console.log(res);
    res.json(dbCustomer);
  });
});


//find customer by name
router.get("/api/customer/:name", function(req, res) {
  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Post
  db.Customer.findOne({
    where: {
      customer_name: req.params.name
    },
    include: [db.Burger]
  }).then(function(dbCustomer) {
    //console.log(res);
    res.json(dbCustomer);
  });
});


//post new rows in our burger data
router.post("/api/burgers", function(req, res) {
  //db.Customer.create({Customer_name:"storestock"}).then
    db.Burger.create(req.body).then(
      function() {
    // Send back the ID of the new row
    res.redirect("/");
    });
  });


//post new row in our customer data
router.post("/api/store", function(req, res) {
  //db.Customer.create({Customer_name:"storestock"}).then
  db.Customer.create({customer_name:req.body.customer_name}).then(
    function() {
  // Send back the ID of the new row
    res.redirect("/");
    });
  });


//change rows data
  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    db.Burger.update(
     //{devoured: true, CustomerId:req.body.CustomerId},
     req.body,
     {where: {
      id: req.params.id
    }}).then(function(dbBurger) {


        // If no rows were changed, 
        //then the ID must not exist, so 404 status 
      if (dbBurger.changedRows == 0) {
        return res.status(404).end();
        //else ID must exist so 200 (ok status)
      } else {
        res.status(200).end();
      }
    });
  });

  
  router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition to remove ", condition);
  
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      if (dbBurger.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist,
        // so 404 status
        return res.status(404).end();
         //else ID must exist so 200 (ok status)
      } else {
        res.status(200).end();
      }
    });
  });



  //Export routes for server.js to use.
  module.exports = router;