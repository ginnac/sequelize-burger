// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
 
  localStorage.clear();  

    $(".change-eaten").on("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    var id = $(this).data("id");
    localStorage.setItem("tabId", id);

    var customerName = $("#customer-name").val().trim();
    localStorage.setItem("custName", customerName);
    //create eater customer
    var store = {
      customer_name: customerName
    } 

    $.ajax("/api/store",{
      type: "POST",
      data: store,
    }).then(function(){
      findCustomerData();
      
    });


    function findCustomerData(){
      var name = localStorage.getItem("custName");
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
    
    
  });

//.................................................
  
    $(".create-form").on("submit", function(event) {
     // Make sure to preventDefault on a submit event.
      event.preventDefault();

       //get to find one with id #1 in customer table 
      //if not we dont need to create new row....
      var id = "1";

      $.get("/api/customers/" + id, function(data) {
        console.log(data);
        //if there is a customer with id===1
        if (data || data.length){
          callApi();
        }
        else{
          console.log("no data!!")
          createCustomerid();
        }
          
        });


      function createCustomerid(){
        var store = {
          customer_name: "burger-store"
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

    });

  
    $(".delete-burger").on("click", function(event) {
      var id = $(this).data("id");
  
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
