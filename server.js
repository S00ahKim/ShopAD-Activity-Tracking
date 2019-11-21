const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000', // 허락하고자 하는 요청 주소
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가.
};

app.use(cors(corsOptions)); // CORS 미들웨어 추가
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

app.post('/log_send', (req,res) => {
    res.send('ok') //이 부분 써줘야 오류 안 남
    // 13개
    var date = req['body']['actionTime'].slice(0, 19).replace('T', ' ')
    var sql = 'INSERT INTO \
                log (userId, actionType, actionTime, clientX, clientY, \
                    pageX, pageY, wheelPosition, category, pageNum, productId, channelNm, productName) \
                values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
    connection.query(
        sql, [req['body']['userId'],req['body']['actionType'],date,
            req['body']['clientX'],req['body']['clientY'],req['body']['pageX'],req['body']['pageY'],
            req['body']['wheelPosition'],req['body']['category'],req['body']['page'],
            req['body']['productId'],req['body']['channelNm'],req['body']['productName'],], function(err){
            //console.log('ERROR: ', err)
        }
    )
})

app.get('/log_send', (req,res) => {
    console.log(req['body'])
    res.send('hey')
})

app.get('/', (req, res) => {
    connection.query(
        'SELECT userId FROM members',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

app.listen(port, () => console.log(`Listening on port ${port}`));