const express = require('express');

const port = 3001;

const app = express();

app.get('/ping', (req, res) => {
    res.send("test");
});

app.listen(port, () => {
    console.log('Server listening on the port   ', port);
})