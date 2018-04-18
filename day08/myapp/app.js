const express = require('express');
const app = express();
app.get('/',(req,res) => {
    res.send('Hello Express!!!');
});
let server = app.listen(3000,() => {
    let host = server.address.address;
    let port = server.address.port;
    console.log('app is listening at '+host+'==='+port);
})
