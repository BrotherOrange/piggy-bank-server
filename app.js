import express from 'express';
import Parse from 'parse/node.js';
import UserController from './controllers/user-controller.js';
import BillController from './controllers/bill-controller.js';

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY

Parse.initialize(
  'ra4Q05prLXzDT2bWx6xYXn34ku6NldBUxoqCFuM9', // This is your Application ID
  'j6u33SNTrj64NeHTr2uSMseU9c5JJPnXOVCcCuTl', // This is your Javascript key
  '6M4DKBByrLx4Kzzbj5l0qs3KRwifeqehSsaKck69' // This is your Master key (never use it in the frontend)
);

const app = express();

app.get('/', (req, res) => {res.send('Welcome to Piggy Bank!!!')});

UserController(app);
BillController(app);

app.listen(4000);
