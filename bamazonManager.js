
//bamazonManager.js

var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require('columnify');
const cTable = require('console.table');

let db_success = false;

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

function displayInColumns(results){
    var columns = columnify(results, {
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
   console.log(columns);
}

function displayAll() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;

        // console.log(res[0]);
        
        // var columns = columnify(res, {
        //     showHeaders: false,
        //     columns: ['item_id', 'product_name', 'department_name', 'price', 'stock_quanity']
        // })
        // console.log("\nID  Product         Department     Price    Quanity On Hand\n" +
        //     "--  -------         ----------     -----    ------- -- ----");
        // console.log(columns);

        // var columns = columnify(res, {
        //     config: {
        //         item_id: {
        //             headingTransform: function(heading) {
        //                 heading = "ID\n==";
        //                 return heading;     
        //             },
        //             align: 'right'
        //         },
        //         product_name: {
        //             headingTransform: function(heading){
        //                 heading = "Product Name\n============";
        //                 return heading;   
        //             },
        //             align: 'left'  
        //         },
        //         department_name: {
        //             headingTransform: function(heading){
        //                 heading = "Department Name\n===============";
        //                 return heading;   
        //             }  
        //         },
        //         price: {
        //             headingTransform: function(heading){
        //                 heading = "Price\n=====";
        //                 return heading;   
        //             }    
        //         },
        //         stock_quanity: {
        //             headingTransform: function(heading){
        //                 heading = "Quantity\n========\n\n";
        //                 return heading;   
        //             },
        //             align: 'left'   
        //         }
        //     }
        // })
       
        // console.log(columns);
        displayInColumns(res);
        startHere();
    });
}

function startHere() {
    inquirer
        .prompt({
            type: "list",
            name: "action",           
            message: "\nWhat would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add To Inventory",
                "Add New Product",
                "Exit Program"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    displayAll();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add To Inventory":
                    addToStock();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
                case "Exit Program":
                    connection.end();
                    process.exit() ;
                    break ;
            }
        });
}

function runOrder() {
    // console.log("In runOrder");
    let question = [{
        type: 'input',
        name: 'order_p_id',
        message: " Enter Product ID ",
        validate: function validItemNumber(value){
           var pass = value.match(/[0123456789]+/);
           if (pass){
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
    
        // console.log(answer.order_p_id);
        // console.log(answer.order_quant);
        runPlaceOrder(answer.order_p_id, parseInt(answer.order_quant)); 
         
    });
}

function runPlaceOrder(item, quantity){
    // console.log("In runPlaceOrder");
    // let rpo_item = item;
    // let rpo_quantity = quantity;

    // query db with item number to determine if quantity on hand can fill the order
    var query = "SELECT products.item_id, products.stock_quanity FROM products WHERE products.item_id = ?";
    connection.query(query, item, function (err, res) {
        if (err) throw err;

        // console.log("item num= " + res[0].item_id);
        // console.log("stock quanity= " + res[0].stock_quanity);
        console.log("")
        if (res[0].stock_quanity < quantity ) {
            console.log("Insufficient quantity!\n");
            inquirer.prompt(
                {
                type: 'confirm',
                name: 'anyKey',
                message: ' Press any key to continue '
                }
            ).then(answer => {
            // console.log("Continue ...");
                displayAll();
            });
        }
        else {
            // console.log("placing order\n");
            rpo_quantity = res[0].stock_quanity;
            // console.log("rpo_quantity= " + rpo_quantity);
            // console.log("quantity= " + "  " + quantity + typeof quantity);
            rpo_quantity -= quantity;
            // console.log("rpo_quanity= " + rpo_quantity + typeof rpo_quantity);
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
        
                // console.log("item num= " + res[0].item_id);
                // console.log("stock quanity= " + res[0].stock_quanity);

                // console.log("typeof quality= " + typeof(quantity));
                // console.log("res= " + res);
                if ( res.affectedRows > 0 ) {                
                    console.log("Your order has been placed; total cost is " + parseFloat(quantity) * 2.00);

                    inquirer.prompt(
                        {
                        type: 'input',
                        name: 'anyKey',
                        message: ' Press any key to continue '
                        }
                    ).then(answer => {
                    // console.log("Continue ...");
                        displayAll();
                    });
                }               
        });
        
        }
// displayAll();

});
}

function lowInventory(){
var query = "SELECT * FROM products WHERE stock_quanity < '5'";
// var query = "SELECT * FROM products WHERE stock_quanity  = '4'";

// var query = "SELECT * FROM products";

    connection.query(query,
        // "SELECT *  \
        //  FROM products WHERE stock_quanity < '5'",
            function (err, res) {
            if (err) throw err;
            // var columns = columnify(res, {
            //     showHeaders: false,
            //     columns: ['item_id', 'product_name', 'department_name', 'price', 'stock_quanity']
            // });
            
            // // console.table(res,['ID',"Product","Department","Price","Quantity On Hand"]);
            // console.log("\nLow Inventory Status Report; less than 5 units");
            // console.log("ID  Product         Department     Price    Quanity On Hand\n" +
            //     "--  -------         ----------     -----    ------- -- ----");
            // console.log(columns);
            displayInColumns(res);
            console.log("\n");
            backToStart();
    }
    );
    // startHere();
}

function addToStock(){
    let question = [{
        type: 'input',
        name: 'add_p_id',
        message: " Enter Product ID ",
        validate: function validItemNumber(value){
           var pass = value.match(/[0123456789]+/);
           if (pass){
               return true;
           }
           return "Please enter a valid item number."
        }
        },
        {
            type: 'input',
            name: 'add_quant',
            message: ' Enter number of units to add. ',
            validate: function validOrderQuant(value){
                var pass = value.match(/[0123456789]+/);
                if (pass){
                    return true;
                }
                return "Please enter a valid item number.";
             }
        }];
      
    inquirer.prompt(question).then(answer => {

        // console.log("item to update stock= " + answer.add_p_id);
        // console.log("quantity to add= " + answer.add_quant);

        // var query = connection.query(
            var query = "UPDATE products SET stock_quanity = stock_quanity + " +
                        parseInt(answer.add_quant) + " WHERE item_id " +
                        "= " + parseInt(answer.add_p_id);
            connection.query(query,
            // "UPDATE products SET stock_quanity = stock_quanity + ? WHERE ?",
            // [ 
            //     {   
            //         answer.add_quant
            //     },
            //     {
            //         item_id: answer.add_p_id
            //     } 
            // ],
            function (err, res) {
            if (err) throw err;
    
            if ( res.affectedRows > 0 ) {                
            
                console.log("\nThe inventory has been updated - number of rows affected: " +
                            res.affectedRows);

                inquirer.prompt(
                    {
                    type: 'input',
                    name: 'anyKey',
                    message: ' Press any key to continue '
                    }
                ).then(answer => {
                // console.log("Continue ...");
                    displayAll();
                });
            } 
            else {
                console.log("\nError in updating quantity for item number " + answer.add_p_id);
                backToStart();
            }              
    });
         
    });

}

function backToStart(){
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

function addNewProduct(){
    let question = [{
        type: 'input',
        name: 'add_p_name',
        message: " Enter Product Name: "
        // validate: function validItemNumber(value){
        //    var pass = value.match(/[0123456789]+/);
        //    if (pass){
        //        return true;
        //    }
        //    return "Please enter a valid item number."
        // }
        },
        {
            type: 'input',
            name: 'add_depart_name',
            message: ' Enter department name '
            // validate: function validOrderQuant(value){
            //     var pass = value.match(/[0123456789]+/);
            //     if (pass){
            //         return true;
            //     }
            //     return "Please enter a valid item number.";
            //  }
        },
        {
            type: 'input',
            name: 'add_price',
            message: ' Enter item price:' 
        },
        {
            type: 'input',
            name: 'add_stock_quantity',
            message: ' Enter inventory amount: '
        
        }];
        inquirer.prompt(question).then(a => {

            let query = "INSERT INTO products (product_name, department_name, price, stock_quanity) \
                         VALUES ?";
            let values = [
                [a.add_p_name, a.add_depart_name, a.add_price, a.add_stock_quantity]
            ];
                
                connection.query(query, [values],
                function (err, res) {
                if (err) throw err;
        
                if ( res.affectedRows > 0 ) {                
                    console.log("\nThe " + a.add_p_name + " has been added to inventory. " +
                                 "\nProduct ID: " + res.insertId + " number of rows affected: " +
                                res.affectedRows + "\n");
                    backToStart();
                }
                else {
                     console.log("\nError in updating quantity for item number " + answer.add_p_id);
                }
        });

    });
}

startHere();
