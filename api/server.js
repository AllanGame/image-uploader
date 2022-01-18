const express = require('express');
const app = new express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

app.set('port', process.env.SERVER_PORT || 4000);

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(bodyParser.raw());

app.post('/upload', (req, res) => {
    const id = Date.now();

    fs.writeFile(`./public/i/${id}.png`, req.body, () => {})

    res.json({
        path: `/i/${id}.png`
    });
});

app.listen(app.get('port'), () => {
    console.log(`App on port ${app.get('port')}`)
});