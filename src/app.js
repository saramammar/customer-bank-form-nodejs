require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express()

const routes = require('./routes/app.routes')

const hbs = require('hbs');
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '../public')))
app.set('views', path.join(__dirname, './design/pages'))
hbs.registerPartials(path.join(__dirname, './design/layouts'))

app.use(express.urlencoded({ extended: true }))

app.use(routes)

module.exports = app;
