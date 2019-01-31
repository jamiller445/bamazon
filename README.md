# Bamazon
## Description
This application implements a simple command line based storefront using the npm [inquirer](https://www.npmjs.com/package/inquirer) package and the MySQL database backend together with the npm [mysql](https://www.npmjs.com/package/mysql) package. The application presents two interfaces: customer and manager.

## MySQL Database Setup
You must setup a MySQL database on your machine before you attempt to run this application. If you don't have MySQL installed on your machine you can visit the [MySQL](https://dev.mysql.com/doc/) documentation page to install the version you need for your operating system. Once you have MySQL isntalled, you will be able to create the Bamazon database and the products table with the SQL code found in [bamazon_db.sql](https://github.com/jamiller445/bamazon/bamazon_db.sql). Run this code inside your MySQL client like MySQL Workbench to populate the database, then you will be ready to proceed with running the Bamazon customer and manager interfaces.

## Customer Interface
The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located, item unit price, and quantity on hand in the inventory. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is notified that insuffecient inventory quantity exists and is allowed to resubmit the order with new values.  

To run the customer interface please follow the steps below:

```
git clone git@github.com:jamiller445/bamazon.git
npm install
node bamazonCustomer.js
```

## Manager Interface
The manager interface presents a list of four options, as below.

```
? Please select an option: (Use arrow keys)
❯ View Products for Sale 
  View Low Inventory 
  Add to Inventory 
  Add New Product
  ```

  The **View Products for Sale** option allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located, price,and the quantity available in stock.

  The **View Low Inventory** option shows the user the items which currently have fewer than five units available.

  The **Add to Inventory** option allows the user to select a given item ID and add additional inventory to the target item.

  The **Add New Product** option allows the user to enter a new product into the database prompting the user for product descriptions, department, price, and quantity on hand.

  ## Banazon Screen Shots

  ### Customer Interface

  **Customer Interface**

  ![](/images/bamazonCustomer.png)

  **Place Order**

  ![](/images/placeorder.png)

  **Place Order Result**

  ![](/images/placeorderresult.png)

  ### Manager Interface

  **View Products**

  ![](/images/viewproducts.png)

  **View Low Inventory**

   ![](/images/lowinventory.png)

   **Add Inventory**

   ![](/images/addinventory.png)

   **Add New Product**

   ![](/images/addproduct.png)

   **Exit**

   ![](/images/exit.png)
