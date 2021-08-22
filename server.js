const app = require('./src/app');

app.listen(process.env.PORT, () => console.log(`Serve at localhost:${process.env.PORT}`))