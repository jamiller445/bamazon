var columnify = require('columnify');

// var res = [
//            {p1: "v1",p2: "v2", p3: "v3", p4: "v4", p5: "v5"},
//            {p1: "v1",p2: "v2", p3: "v3", p4: "v4", p5: "v5"},
//            {p1: "v1",p2: "v2", p3: "v3", p4: "v4", p5: "v5"},
//            {p1: "v1",p2: "v2", p3: "v3", p4: "v4", p5: "v5"},
//            {p1: "v1",p2: "v2", p3: "v3", p4: "v4", p5: "v5"},
//            {p1: "v1",p2: "v2", p3: "v3", p4: "v4", p5: "v5"},
//            {p1: "v1",p2: "v2", p3: "v3", p4: "v4", p5: "v5"},
//            {p1: "v1",p2: "v2", p3: "v3", p4: "v4", p5: "v5"},
//            {p1: "v1",p2: "v2", p3: "v3", p4: "v4", p5: "v5"},
//            {p1: "v1",p2: "v2", p3: "v3", p4: "v4", p5: "v5"},
//            {}         
//           ]

var res =[{p1: "v1",p2: "v22222222222222", p3: "v33333333333", p4: "v4444444", p5: "v55555"}];
           

// var columns_inv = columnify({p1: 'v1',p2: 'v2', p3: 'v3', p4: 'v4', p5: 'v5'}, {
// var columns_inv = columnify(res, {
var columns_inv = columnify([{
                ProductID: "v11111111111111111111111" ,
                ProductName: "v2222222222222222222222"         
}], {
    config:{
        ProductID: {
            headingTransform: function(heading) {
              heading = "Product ID\n==========";
              return heading;  
            },
            align: 'center'
        }
    }
    

    

    }




);
// , {
    // showHeaders: false,
    // columns: ['p1', 'p2', 'p3', 'p4', 'p5']
    // columns: ['ProductID', 'p2', 'p3', 'p4', 'p5']

// });

// console.table(res,['ID',"Product","Department","Price","Quantity On Hand"]);
console.log("\nID  Product         Department     Price    Quanity On Hand\n" +
    "--  -------         ----------     -----    ------- -- ----");
console.log(columns_inv);