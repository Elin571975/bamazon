// DEPENDENCIES
var mysql = require("mysql");
var inquirer = require("inquirer");

// CREATE CONNECTION INFORMATION FOR SQL DATABASE
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "TortaPalmito$50",
  database: "bamazon_db"
});

// READING THE ENTIRE DATABASE AND DISPLAY RESULTS
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  managerSearch();
  });

//CREATING INQUIRIES
function managerSearch() {
     inquirer
       .prompt({
           name: "managerSearch",
           type: "list",
           message: "What would you like to do?",
           choices: [
               "View Products for Sale",
               "View Low Inventory",
               "Add to Inventory",    
               "Add New Product",          
               ]
         }) 
      .then(function(answer) {
            
            switch (answer.managerSearch) {
                 case "View Products for Sale":
                    viewProducts();
                    break;
          
                 case "View Low Inventory":
            //        viewLowInventory();
                      break;
          
                 case "Add to Inventory":
                    addInventory();
                    break;
          
                 case "Add New Product":
                    addProduct();
                    break;
            };       
            });
  };


function viewProducts(){
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
   
   //Log all results of the SELECT statement
   console.log(res);
  };
};  


function addInventory(){

    inquirer
       .prompt([
            {
            name: "item",
            type: "input",
            message: "Which item would you like to add inventory?"
          }, 
         {
            name: "quantity",
            type: "input",
            message: "What is the quantity would you like to add to current inventory?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
                }
          }
     ])
       .then(function(answer) {
    
         
           connection.query("UPDATE products SET ? WHERE ?",
           [{
             stock_quantity: answer.quantity
            },
            {
              product_name: answer.item
            },
            ],
    
           function(err) {
              if (err) throw err;
              console.log("Your product was updated!");
           }  

          );
      });
}  
   

function addProduct() {

   inquirer
      .prompt([
      {
          name: "item",
          type: "input",
          message: "What is the product name?"
      },
      {
          name: "department",
          type: "input",
          message: "Which department the product belong to?"
      },
      {
          name: "price",
          type: "input",
          message: "What is the product price?",
          validate: function(value) {
              if (isNaN(value) === false) {
                 return true;
             }
              return false;
          }
      },    
      {
      name: "quantity",
      type: "input",
      message: "What is the product quantity?",
      validate: function(value) {
         if (isNaN(value) === false) {
             return true;
          }
          return false;
          }
      }
  ])
     .then(function(answer) {

      // when finished prompting, insert a new item into the db with that info
      connection.query("INSERT INTO products SET ?",
          {
              product_name: answer.item,
              department_name: answer.department,
              price: answer.price,
              stock_quantity: answer.quantity
          },
          function(err) {
              if (err) throw err;
              console.log("Your product was created successfully!");
              }
          );
      });
  };   


function viewLowInventory(){

   connection.query("SELECT stock_quantity FROM products", function(err, res){
    
   if(err) throw err;

   if(var i=0; i< res.length; i++){

        if(stock_quantity<5){
          console.log(" | " +  res[i].product_id +      
                      " | " +  res[i].product_name +
                      " | " +  res[i].department_name +
                      " | " +  res[i].stock_quantity);
        };
     };
 });
 };


