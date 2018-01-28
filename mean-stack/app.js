var express = require('express');
const app = express();

app.use('', express.static('static'));

app.get('/',(req,res) => {
    res.send("App is working");
});

app.listen(8000, console.log("Yayy"));
