let express = require('express')
let app = express();
let http = require('http');
let server = http.Server(app);


const assert = require('assert');
const port = process.env.PORT || 3000;


server.listen(port, () => {
  console.log('started on port: ${port}');
});

app.use(express.static(__dirname + '/www'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/www/index.html');
});

app.post('/add', function (req, res) {
  res.send({'success':true});
});

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {poolSize:10}, function(err, client) {
  console.log("Connected successfully to server");
  if (err) {return console.log(err)}
  const dbName = 'productsdb';
  const db = client.db(dbName);
  require('./routes/add.js')(app, db);
  require('./routes/create.js')(app, db);
  require('./routes/read.js')(app, db);
  require('./routes/remove.js')(app, db);
  require('./routes/update.js')(app, db);
});
