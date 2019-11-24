const express = require('express')
const app = express()
const port = process.env.PORT || 9090;
const corsOptions = {
    origin: 'http://localhost:5000', // 허락하고자 하는 요청 주소
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




app.get('/', (req, res) => {
  res.send('서버 만듦.')
})

app.get('/admin/googlechart', (req, res) => { 
    connection.query(
        'SELECT * FROM log;', (err, rows) => {
            console.log(err)
              
        }
    )
    var forsankey = ''
    var forscatter = ''
    var forchart = ''
    res.send(forsankey, forscatter, forchart) 
})

app.listen(port, () => {
  console.log(port, '번 port에 http server를 띄웠습니다.')
})