/* DEPENDENCIES */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');

/* MIDDLEWARES */
dotenv.config({ path: './config.env' });
const app = require('./app');

/* ENVIRONMENT */
// console.log(app.get('env'));
// console.log(process.env);
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
    // console.log(con.connections);
  });

/* SERVER */
const port = process.env.PORT;

const server = app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});

const x = 33;
x = 66;
