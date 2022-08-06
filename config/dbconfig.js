
const mongoose = require('mongoose'); 
 
 mongoose.Promise = global.Promise;
 require('dotenv').config()
console.log(process.env.TEST)

 mongoose.connect('mongodb+srv://${process.env.user}:${process.env.PASS}@cluster0.9zwax.mongodb.net/myFirstDatabase?retryWrites=true', {
  dbName: process.env.DB_NAME,
  user: process.env.USER,
  pass: process.env.PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true
 }, function (err) {
 
  if (err) throw err;
  
  console.log('Successfully connected');
  
  });
{/*}
 mongoose.connect('mongodb://localhost:27017/LMS', function (err) {
 
    if (err) throw err;
  
    console.log('Successfully connected');
  
 });
*/}
 module.exports = db=mongoose.connection;