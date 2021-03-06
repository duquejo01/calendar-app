/**
 * 
 * Index JS Logic
 */
const express = require('express');
require('dotenv').config();
const path = require ('path');
const cors = require('cors');
const { dbConnection } = require('./database/config');

const port = process.env.PORT || 3001;
const app = express();

dbConnection();

app.use( cors() );

app.use( express.static( path.resolve( __dirname, 'public' ))); // Public Path

app.use( express.json() ); // Parse JSON contents

app.use( '/api/auth', require( './routes/auth' ) ); // Auth routes
app.use( '/api/events', require( './routes/events' ) ); // Events routes

// Default route
app.get('*', (req, res) => {
  res.sendFile( path.resolve( __dirname, 'public', 'index.html' ));
});

app.listen( port, () => {
  console.log( `Server started on port ${ port }` );
});