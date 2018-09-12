module.exports = function(app, db) {
  app.post('/routes/add', (req, res) => {

    const assert = require('assert');

    const collection = db.collection('products')

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = { name: "Pear", price: "4", type: "Fruit", desc: "A simple Pear."};
      collection.insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        if (!err){
          res.send({'name':name, 'type':type, 'success':true});
        }else{
          res.send({'name':name, 'success':false});
        }
      });
    });
  });
}
