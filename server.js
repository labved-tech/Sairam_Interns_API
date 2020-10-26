/* DEPENDENCIES */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');

/* MIDDLEWARES */
dotenv.config({ path: './config.env' });
const app = require('./app');

/* ENVIRONMENT */
// console.log(app.get('env'));
//console.log(process.env);
console.log(process.env.NODE_ENV);
let DB = process.env.DATABASE_LOCAL;

if (process.env.NODE_ENV === 'production') DB = process.env.DATABASE;

/* DATABASE */
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Connection to database sucessfull');
    //console.log(con.connections);
  });

/* SERVER */
const port = process.env.PORT;

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
