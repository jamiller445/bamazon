
//bamazonCustomer.js

var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require('columnify');

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

        console.log(res[0]);
        
        var columns = columnify(res, {
            showHeaders: false,
            columns: ['item_id', 'product_name', 'department_name', 'price', 'stock_quanity']
        })
        console.log("0123456789012345678901234567890123456789012345678901234567890123456789");
        console.log("\nID  Product         Department     Price    Quanity On Hand\n" +
            "--  -------         ----------     -----    ------- -- ----");
        console.log(columns);
        startHere();
    });
    // connection.end();
}

function startHere() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Place Order"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Place Order":
                    runOrder();
                    break;
            }
        });
}

function runOrder() {
    console.log("In runOrder");
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
        runPlaceOrder(answer.order_p_id, answer.order_quant);  
    });
}

function runPlaceOrder(item, quantity){
    console.log("In runPlaceOrder");
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
        }
        else {
            // console.log("placing order\n");
            rpo_quantity = res[0].stock_quanity;
            console.log("rpo_quantity= " + rpo_quantity);
            console.log("quantity= " + quantity);
            rpo_quantity -= quantity;
            console.log("rpo_quanity= " + rpo_quantity + typeof rpo_quantity);
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
        });
        }
});

}


displayAll();
// connection.end();
