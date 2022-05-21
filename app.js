const express = require('express');
const mysql = require('mysql');
const port = 3005;

// Create connection
const db  = mysql.createConnection({
    host : 'phx-0008.snphxprshared1.gbucdsint02phx.oraclevcn.com',
    user : 'root',
    password : 'CSMom10.0',
    database: 'UIMDATA'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...')
});

const app = express();

// Get service list
app.get('/getservices/:reg', (req, res) => {
    console.log(req.params.reg);
    let sql = `SELECT MASTERSERVICEID FROM CD_CIRCUITS_ALL WHERE CIRCLE = '${req.params.reg}'
        limit 10`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('Service List Fetched');
        console.log(results);
        res.set('Access-Control-Allow-Origin', '*');
        res.send(results);
    })
});

// Get service data
app.get('/getservice/:id', (req, res) => {
    console.log(req.params.id);
    let sql = `SELECT * FROM CD_CIRCUITS_ALL WHERE MASTERSERVICEID = '${req.params.id}'
        AND AENDNODENAME IS NOT NULL
        order by SEGMENTID, SEQUENCEID`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('Circuit Data Fetched');
//        console.log(results);
        res.set('Access-Control-Allow-Origin', '*');
        res.send(results);
    })
});


app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
})
