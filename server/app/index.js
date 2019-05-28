const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./keys');
const spotifyRouter = require('./routes/spotify/index');
const twitterRouter = require('./routes/twitter/index');
const analyzeRouter = require('./routes/analyzer/index');
const mysqlRouter   = require('./routes/mysql/index');
const app = express();
let http = require('http').Server(app);


//*-------------------------------  REDIS
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000});
const redisPublisher = redisClient.duplicate();
//*-------------------------------  REDIS



//*-------------------------------  SOCKET.IO
const io = require('socket.io')(http);

let connect_history = {};

// io :     全員に送られる
// socket : そのユーザーだけに送られる

io.on('connection',function(socket){

    //接続したユーザーにIDを識別情報として保存させる
    console.log('socket_id: ' + socket.id + ' is connected');
    socket.emit('new-socket-id',{socketid:socket.id});

    // 新規ユーザーの回線オープン
    socket.on('open-socket', function(msg) {

        console.log(Object.keys(connect_history));

        // 指定ユーザーだけ
        let resmsg = {...msg,socketid:socket.id};
        socket.emit('open-socket-success',resmsg);
        connect_history[socket.id] = resmsg;

        // 全ユーザーへ
        clients = Object.keys(io.eio.clients).map(key=> connect_history[key])
        clients = clients.filter(v => !!v)
        io.emit('new-user-added',{clients:clients});
    });

    socket.on('close-socket', function(msg) {
        console.log("close-socket:success");

        // 個別
        socket.emit('close-socket-success',null);

        //自分がdisconnectする最後の一人の場合、connect_history=を空に戻す。
        if(Object.keys(io.eio.clients).length===1 && Object.keys(io.eio.clients)[0]===socket.id) connect_history = {};

        // 指定ユーザーを削除した全ユーザーIDの配列
        let id_ary_after =  Object.keys(io.eio.clients).filter( key=> key !== socket.id)

        clients = id_ary_after.map(key=> connect_history[key])
        clients = clients.filter(v => !!v)
        io.emit('user-disconnected',{clients:clients});

        socket.disconnect();
    });

    // クライアントが切断したときの処理
    socket.on('disconnect', function(msg){
        console.log(msg);
        console.log("disconnect called");
    });

});
//*-------------------------------  SOCKET.IO


app.use(cors());
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// CORSを許可する
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.static(path.join(__dirname, 'dist')));


// app.get('/' , function(req, res){
//     res.render('index', { title: 'Hey', message: 'Hello there!' });
// });

app.use('/api/spotify', spotifyRouter);
app.use('/api/twitter', twitterRouter);
app.use('/api/analyze', analyzeRouter);
app.use('/api/mysql',   mysqlRouter);


const PORT = 8080;
http.listen(PORT, ()=>{
    console.log('server listening. Port:' + PORT);
});

