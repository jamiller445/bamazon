
//bamazonCustomer.js

var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require('columnify');

let db_success = false;
let prodCount = 0;

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "BootCamp18",
    database: "bamazon_db"
});

function displayAll() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        prodCount = res.length;
        console.log("number of products= " + res.length);
        var columns = columnify(res, {
            config: {
                item_id: {
                    headingTransform: function(heading) {
                        heading = "ID\n==";
                        return heading;     
                    },
                    align: 'right'
                },
                product_name: {
                    headingTransform: function(heading){
                        heading = "Product Name\n============";
                        return heading;   
                    },
                    align: 'left'  
                },
                department_name: {
                    headingTransform: function(heading){
                        heading = "Department Name\n===============";
                        return heading;   
                    }  
                },
                price: {
                    headingTransform: function(heading){
                        heading = "Price\n=====";
                        return heading;   
                    }    
                },
                stock_quanity: {
                    headingTransform: function(heading){
                        heading = "Quantity\n========\n\n";
                        return heading;   
                    },
                    align: 'left'   
                }
            }
        })
        console.log(columns + "\n");
        startHere();
    });
}

function startHere() {
    inquirer
        .prompt({
            type: "list",
            name: "action",          
            message: "What would you like to do?",
            choices: [
                "Place Order",
                "Exit Program"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Place Order":
                    runOrder();
                    break;
                case "Exit Program":
                    process.exit() ;
                    break ;
            }
        });
}

function runOrder() {
    let question = [{
        type: 'input',
        name: 'order_p_id',
        message: " Enter Product ID ",
        validate: function validItemNumber(value){
           var pass = value.match(/[0123456789]+/);
           if (pass && value <= prodCount){
               return true;
           }
           return "Please enter a valid item number."
        }
        },
        {
            type: 'input',
            name: 'order_quant',
            message: ' Enter number of units to order ',
            validate: function validOrderQuant(value){
                var pass = value.match(/[0123456789]+/);
                if (pass){
                    return true;
                }
                return "Please enter a valid item number.";
             }
        }];
          inquirer.prompt(question).then(answer => {
            runPlaceOrder(answer.order_p_id, parseInt(answer.order_quant));          
    });
}

function runPlaceOrder(item, quantity){
    var query = "SELECT products.item_id, products.stock_quanity, products.price FROM products WHERE products.item_id = ?";
    connection.query(query, item, function (err, res) {
        if (err) throw err;
        console.log("")
        if (res[0].stock_quanity < quantity ) {
            console.log("Insufficient quantity to fill order!\n");
            inquirer.prompt(
                {
                type: 'input',
                name: 'anyKey',
                message: ' Press any key to continue '
                }
            ).then(answer => {
                displayAll();
            });
        }
        else {
            rpo_quantity = res[0].stock_quanity;
            rpo_price = res[0].price;
            rpo_quantity -= quantity;
            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [ 
                    {   
                        stock_quanity: rpo_quantity
                    },
                    {
                        item_id: item
                    } 
                ],
                function (err, res) {
                if (err) throw err;
                if ( res.affectedRows > 0 ) {                
                    console.log("Your order has been placed; total cost is " +
                                 parseInt(quantity) * rpo_price);

                    inquirer.prompt(
                        {
                        type: 'input',
                        name: 'anyKey',
                        message: ' Press any key to continue '
                        }
                    ).then(answer => {
                        displayAll();
                    });
                }               
        });
        
        }
});
}
displayAll();