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
  supervisorSearch();
});

function supervisorSearch(){
    
    inquirer
      .prompt({
        name: "supervisorSearch",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Product Sales by Department",
          "Create New Department" 
        ]     
      })

      .then(function(answer){
        switch (answer.supervisorSearch){
        case "View Product Sales by Department":
          productSales();
          break;
  
        case "Create New Department":
          createDepartment();
          break;
          }
      });
    };  


function productSales(){

    connection.query("SELECT * FROM products", function(err, res) {
        
        console.log(
               
            " | " +  res[0].department_id +
            " | " +  res[0].department_name +
            " | " +  res[0].over_head_costs
        );
        console.log("|----------|----------|----------|----------|----------|")
          
    
        for (var i=1; i<res.length; i++){

        console.log(         
              " | " +  res[i].department_id +
              " | " +  res[i].department_name +
              " | " +  res[i].department_id +
              " | " +  res[i].over_head_costs +
              " | " +  res[i].product_sales +
              " | " +  total_profit 
        );
        };
        });
    };


function createDepartment() {
        // prompt for info about the item being put up for auction
        inquirer
            .prompt([
            {
                name: "departmentName",
                type: "input",
                message: "What is the department name?"
            },
            {
                name: "overheadCosts",
                type: "input",
                message: "What is the department overhead costs?",
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
            connection.query("INSERT INTO departments SET ? WHERE ?",
                [{
                  over_head_costs: answer.departmentCosts,
                },
                {
                  department_name: answer.departmentName,
                },
                ],
                function(err) {
                    if (err) throw err;
                    console.log("Your department was created successfully!");
                    }
                );
            });
        }   


