import io from 'socket.io-client'
import {mapGetters, mapActions} from 'vuex';

//let socket = io({path: '/ws/socket.io'});
let socket = io();

//socket.close(); //一度接続して置いておく

export default{

    computed:mapGetters(['ws']),
    methods: {
        ...mapActions(['a_ws']),

        socketInit(){
            // YOUR SOCKET
            socket.on('new-socket-id', (msg)=>{
                console.log("new-socket-id");
                console.log(msg);
                this.a_ws(['set','socketid',msg.socketid]);
            });

            socket.on('open-socket-success',(msg)=>{
                console.log("open-socket-success");
                console.log(msg);
                this.a_ws(['set','connect',socket.connected]);
                this.a_ws(['set','socketid',msg.socketid]);
                this.a_ws(['set','youname',msg.name]);
            });

            socket.on('close-socket-success',(msg)=>{
                console.log("close-socket-success");
                console.log(msg);
                this.a_ws(['reset','you']);
            });

            // BROADCAST
            socket.on('new-user-added', (msg)=>{
                console.log("new-user-added!");
                console.log(msg);
                this.a_ws(['set','users',msg.clients]);
            });

            socket.on('user-disconnected', (msg)=>{
                console.log("user-disconnected!");
                console.log(msg);
                this.a_ws(['set','users',msg.clients]);
            });
        },

        socketConnect(userdata){
            if(socket.disconnected) socket.open();
            socket.emit('open-socket', {...userdata, date:new Date});
        },

        socketDisconnect(){
            if(socket.connected) socket.emit('close-socket',{});
        }
    }
}
