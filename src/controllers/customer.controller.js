const fs = require('fs');

let allCustomers = null;

const readFromJsonFile = () => {
    try {
        allCustomers = JSON.parse(fs.readFileSync('src/model/all-customers.json').toString());
        if (!Array.isArray(allCustomers)) throw new Error('Data is not array')
    }
    catch(err) {
        allCustomers = []
    }
}

const writeOnJsonFile = () => {
    fs.writeFileSync('src/model/all-customers.json', JSON.stringify(allCustomers));
}

class Customer {
    add(customerData) {
        let customer = {
            _id: new Date().getTime(),
            name: customerData.name,
            accNum: customerData.accNum,
            balance: customerData.balance,
            status: true
        }
        readFromJsonFile();
        allCustomers.push(customer);
        writeOnJsonFile();
        console.log('Customer added successfuly');
    }

    delete(id) {
        readFromJsonFile();
        const indx = allCustomers.findIndex(c => c._id == id);
        if (indx === -1) return console.log('Customer is not found');
        allCustomers.splice(indx, 1);
        writeOnJsonFile();
        console.log('Customer deleted successfuly');
    }

    showAll() {
        readFromJsonFile();
        // if (allCustomers.length === 0) return console.log('No Data to show');
        // allCustomers.map(c => console.log(`name: ${c.name} - balance: ${c.balance} - status: ${c.status}`));
        return allCustomers
    }

    changeStatus(customerData) {
        readFromJsonFile();
        const indx = allCustomers.findIndex(c => c._id === customerData._id);
        if (indx === -1) return console.log('Customer is not found');
        if (!allCustomers[indx].status && customerData.status == 'false') return console.log(`Customer already deactivated`);
        if (allCustomers[indx].status && customerData.status == 'true') return console.log(`Customer already activated`);
        allCustomers[indx].status = !allCustomers[indx].status;
        writeOnJsonFile();
        console.log("Customer's status changed successfuly");
    }

    search(id) {
        readFromJsonFile();
        const indx = allCustomers.findIndex(c => c._id == id);
        // if (indx === -1) return console.log('Customer is not found');
        // console.log(
        //   `name: ${allCustomers[indx].name} - balance: ${allCustomers[indx].balance} - status: ${allCustomers[indx].status}`
        // );
        return allCustomers[indx]
    }

    edit(id, customerData) {
        readFromJsonFile();
        const indx = allCustomers.findIndex(c => c._id == id);
        // if (indx === -1) return console.log('Customer is not found');
        customerData._id = allCustomers[indx]._id
        customerData.status = allCustomers[indx].status
        allCustomers[indx] = customerData;
        writeOnJsonFile()
    }

    withdraw(customerData, withdrawAmount) {
        readFromJsonFile();
        const indx = allCustomers.findIndex(c => c._id == customerData._id);
        if (indx === -1) return console.log('Customer is not found');
        if (!allCustomers[indx].status) return console.log('Customer is suspended');
        if (allCustomers[indx].balance < withdrawAmount) return console.log('Not enough balance to withdraw');
        if (+withdrawAmount > 5000) return console.log('Maximum 5000 per day');
        allCustomers[indx].balance = +allCustomers[indx].balance - (+withdrawAmount);
        writeOnJsonFile();
        console.log(`You withdrawed ${withdrawAmount} successfully. Your balance became ${allCustomers[indx].balance}`);
    }

    deposit(customerData, depositAmount) {
        readFromJsonFile();
        const indx = allCustomers.findIndex(c => c._id == customerData._id);
        if (indx === -1) return console.log('Customer is not found');
        if (!allCustomers[indx].status) return console.log('Customer is suspended');
        if (+depositAmount > 10000) return console.log('Maximum 10000 per day');
        allCustomers[indx].balance = +allCustomers[indx].balance + (+depositAmount);
        writeOnJsonFile();
        console.log(`You deposited ${depositAmount} successfully. Your balace became ${allCustomers[indx].balance}`);
    }
}

const customer = new Customer();
module.exports = customer;