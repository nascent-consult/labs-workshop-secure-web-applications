import * as fs from 'fs';
import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import errorHandler = require("errorhandler");
//import cookieParser = require("cookie-parser");

import { router as apiRouter } from './api/router';
import { tokenValidator } from './api/auth';

var app = express();

app.use( bodyParser.urlencoded( { extended: true } ) );
//app.use(cookieParser());
app.use( bodyParser.json() );

var env = process.env.NODE_ENV || 'development';
if ( env === 'development' ) {
  app.use( errorHandler() );
}

// Mount public as '/'
app.use( express.static(__dirname + '/../../public') );

// mount /api
app.use( '/api', apiRouter );

//
let port = 8303;
app.listen( port, ()=>{
  console.log("Cryptographix Secure-BOX (plus) Application server listening on port %d in %s mode", port, app.settings.env );
} );

export var App = app;
