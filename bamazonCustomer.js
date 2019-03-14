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


connection.connect(function(err) {
   if (err) throw err;
   console.log("connected as id " + connection.threadId + "\n");
   
   //READING THE ENTIRE DATABASE AND DISPLAY RESULTS
   runSearch();

});


function runSearch() {
   connection.query("SELECT * FROM products", function(err, res) {
     if (err) throw err;
    
    //Log all results of the SELECT statement
    console.log(res);

    //Choose the product to buy
    inquirer
    .prompt([
     {
     name: "idSearch",
     type: "list",
     message: "What's the ID of the product you want to buy?",
     choices: [
       "1",
       "2",
       "3",    
       "4",          
       "5",
       "6",
       "7",
       "8",
       "9",
       "10"    
     ]}, 
   
    {
    name: "unitsBuy",
    type: "input",
    message: "How many units would you like to buy?",
    validate: function(value) {
       if (isNaN(value) === false) {
       return true;
       }
       return false;
       }
      }     
     ])
  
   .then(function(answer) {
    
       var query = "SELECT stock_quantity FROM products WHERE ?";
      
       connection.query(query, {item_id: answer.idSearch}, function(err, res){

          //To adjust inventory in the database
          if (err) throw err;
          if(answer.unitsBuy > res){
            console.log("Insufficient quantity!");
          } else{
            console.log("Your purchase of " + answer.unitsBuy + " is completed"); 
            var updateInventory = res - answer.unitsBuy;
            connection.query("UPDATE stock_quantity FROM products WHERE ?", {item_id: answer.idSearch}, updateInventory);
            }; 
        });
 });
});
};
