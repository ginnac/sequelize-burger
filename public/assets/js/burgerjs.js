// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
 
  localStorage.clear();  

    $(".change-eaten").off().on("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    var id = $(this).data("id");
    var customerName = $("#customer-name").val().trim();

    if(customerName === ""){
      alert("Sorry, customer name can not be blank. Please enter a valid name.")
    }
    else{
      localStorage.setItem("custName", customerName);
      localStorage.setItem("tabId", id);
      //create eater customer
      var name = localStorage.getItem("custName");
      $.get("/api/customer/" + name, function(data) {
        if(data){
          name = name + "-1"
        }
        var store = {
          customer_name: name,
          real_customer:true
        } 
          $.ajax("/api/store",{
            type: "POST",
            data: store,
          }).then(function(data){
            console.log(data);
            findCustomerData(name);
          
          });
          
        });
  
     
  
  
      function findCustomerData(name){
        $.get("/api/customer/" + name, function(data) {
          console.log(data.id);
          var custId = data.id;
          localStorage.setItem("custId", custId);
          updateBurger();
            
          });
      }
  
  
  
      function updateBurger(){
        var id = localStorage.getItem("tabId");
        var customerId = localStorage.getItem("custId");
        var newDevourState = {
          devoured: true,
          CustomerId: customerId,
        };
    
        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: newDevourState
        }).then(
          function() {
            console.log("changed Devoured to: " + newDevourState );
            // Reload the page to get the updated list
            location.reload();
          });
      }
    }
  
  });

//.................................................
  
    $(".create-form").on("submit", function(event) {
     // Make sure to preventDefault on a submit event.
      event.preventDefault();

      if($("#burgerName").val().trim() === ""){
        alert("Sorry Burger Name cannot be blank")
      }
      else{
         //get to find one with id #1 in customer table 
      //if not we dont need to create new row....
      var id = "1";

      $.get("/api/customers/" + id, function(data) {
        console.log(data);
        //if there is a customer with id===1
        if (data){
          callApi();
        }
        else{
          console.log("no data!!")
          createCustomerid();
        }
          
        });


      function createCustomerid(){
        var store = {
          customer_name: "burger-store",
          real_customer:false
        } 

        $.ajax("/api/store",{
          type: "POST",
          data: store,
        }).then(function(){
          callApi();
        });
      }


      function callApi(){
        var newBurger = {
          burger_name: $("#burgerName").val().trim(),
          devoured: false,
          CustomerId: "1",
        };
    
        // Send the POST request.
        $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
        }).then(
          function() {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
          }
        );
      } 
      }
    });

  
    $(".delete-burger").off().on("click", function(event) {
      event.preventDefault();
      var id = $(this).data("id");
      //get customerId
      $.ajax("/api/burger/" + id,{
        type:"GET"
      }).then(function(data) {
      console.log(data.CustomerId);
      var customerId = data.CustomerId;
      var object= {real_customer:false, customer_name:"none"}
      //changed real_customer status to false 
        // Send the PUT request.
        $.ajax("/api/cust/" + customerId, {
        type: "PUT",
        data: object
        }).then(function() {
          console.log(customerId);
          console.log(object);
          // Send the DELETE request.
          $.ajax("/api/burgers/" + id, {
            type: "DELETE"
            }).then(
            function() {
            console.log("deleted burger", id);
            // Reload the page to get the updated list
            location.reload();
            }
          );
        });
      });
    });
  });
