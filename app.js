const express = require('express');
const mysql = require('mysql');
const port = 3005;

// Create connection
const db  = mysql.createConnection({
    host : 'phx-zzz.wwww.xxxx.qqq.com',
    user : 'root',
    password : '*****',
    database: '****'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...')
});

const app = express();

// Get service data
app.get('/getservice/:id', (req, res) => {
    let sql = `SELECT * FROM E2E_CIRCUITS_GUJ WHERE SERVICEID LIKE '${req.params.id}'
        order by SEGMENTID, SEQNO`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('Circuit Data Fetched');
        res.set('Access-Control-Allow-Origin', '*');
        res.send(results);
    })
});


app.listen(port, () =>{
    console.log(`Server startee on port ${port}`);
})
