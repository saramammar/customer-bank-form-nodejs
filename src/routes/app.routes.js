const express = require("express");
const router = express.Router();
const custControllers = require('../controllers/customer.controller')

router.get("", (req, res) => {
  res.redirect("/showAll");
});

router.get("/showAll", (req, res) => {
    let allCustomers = custControllers.showAll()
    res.render('all-customers', {
        title:"All Customers Data",
        allCustomers,
        isEmpty: allCustomers.length?false:true
    })
  });

  router.get("/add", (req, res) => {
    res.render('add-customer', {
        title:"Add Customer"
    })
  });

  router.post("/add", (req, res) => {
    custControllers.add(req.body)
    res.redirect("/showAll");
  });

  router.get("/edit/:id", (req, res) => {
    customer = custControllers.search(req.params.id)
    res.render('edit-customer', {
        title:"edit Customer",
        customer
    })
  });

  router.post("/edit/:id", (req, res) => {
    custControllers.edit(req.params.id, req.body)
    res.redirect("/showAll");
  });

  router.post("/delete/:id", (req, res) => {
    custControllers.delete(req.params.id)
    res.redirect("/showAll");
  });

  router.get("/show/:id", (req, res) => {
    customer = custControllers.search(req.params.id)
    res.render('show-customer', {
        title:"show Customer",
        customer
    })
  });

  router.get("/deposit/:id", (req, res) => {
    res.render('deposit', {
        title:"deposit"
    })
  });

  router.post("/deposit/:id", (req, res) => {
    customer = custControllers.search(req.params.id)
    custControllers.deposit(customer, req.body.deposit)
    res.redirect("/showAll");
  });

  router.get("/withdraw/:id", (req, res) => {
    res.render('withdraw', {
        title:"withdraw"
    })
  });

  router.post("/withdraw/:id", (req, res) => {
    customer = custControllers.search(req.params.id)
    custControllers.withdraw(customer, req.body.withdraw)
    res.redirect("/showAll");
  });

module.exports = router;
