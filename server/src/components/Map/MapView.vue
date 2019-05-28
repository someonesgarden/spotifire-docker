<template>
    <div ref="map">
        <div id="map"></div>
    </div>
</template>
<script>

    import {mapGetters, mapActions} from 'vuex';
    import mapMixin from '../../mixins/map/index';

    let GoogleMapsLoader = require("google-maps");
    GoogleMapsLoader.KEY = 'AIzaSyCKLKkjFM9Q8YyCpALce51eEC0hcSnHURA';
    GoogleMapsLoader.LANGUAGE = "ja";

    export default {
        name: "MapView",
        mixins:[mapMixin],
        props: {},
        data() {
            return {
                zoom:           20,
                lat0:           34.722677,
                lng0:           135.492364,
                lat:            34.722677,
                lng:            135.492364,
                map:            null,
                mapWidth:       window.innerWidth,
                mapHeight:      window.innerHeight,

                othermarkers:   [],
                usermarkers:    [],
                mainuser:       null,
                trackTimeout:   false,
                infowindow:     null,
                watchId:        null,
                userpoly:       null,

                geocodingOptions : {enableHighAccuracy: true, timeout : 5000, maximumAge: 0},

                geocodingOptions2:{enableHighAccuracy: true, timeout: 6000, maximumAge: 600000},

                userpolyOptions:{
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                }
            };
        },
        computed: mapGetters(['mapstore','ws']),
        watch: {
            'mapstore.tracking': {
                handler: function () {
                    if(this.mapstore.tracking) this.keepTracking();
                }
            },

            'ws.users':{
                handler:function(){
                    this.removeAllUserMarkers();
                    this.addUserMarkers();
                    this.drawUserPoly();

                },deep:true
            }
        },
        mounted() {
            GoogleMapsLoader.load(this.loadMap);
        },

        beforeDestroy() {
            // GoogleMapsLoader.release(function () {
            //     console.log("No google maps api around");
            // });
        },

        methods: {
            ...mapActions(['a_mapstore','a_ws']),

            loadMap(google) {
                console.log("loadMap");
                let mapOptions = {
                    mapTypeControlOptions:      { position: google.maps.ControlPosition.TOP_CENTER },
                    fullscreenControlOptions:   { position: google.maps.ControlPosition.TOP_LEFT },
                    streetViewControlOptions:   { position: google.maps.ControlPosition.LEFT_CENTER },
                    zoomControlOptions:         { position: google.maps.ControlPosition.RIGHT_CENTER },
                    rotateControlOptions:       { position: google.maps.ControlPosition.RIGHT_TOP },
                    center: {lat: this.lat, lng: this.lng}, //初期座標
                    zoom: this.zoom,
                    gestureHandling: "greedy",    // スワイプ判定を強めに設定(地図を移動させるには..問題)
                    //gestureHandling: "auto",
                    draggable: true,
                    disableDoubleClickZoom: false// ダブルクリックズーム制限
                };

                this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

                // google.maps.event.addListener( "dragend", ( argument )=> {
                //     console.log( argument ) ;
                // });

                this.infowindow = new google.maps.InfoWindow();

                this.mainuser = this.markerMaker( {
                    title:'For Your Holidays.',
                    subtitle:'top smooth tracks',
                    body:'あなたは現在視聴中です。',
                    thumb:'/static/img/covers/p1.jpg',
                    pid:'',
                    tid:'',
                    id:0,
                    type:'mainuser',
                    lat: this.lat,
                    lng: this.lng,
                    w:54,
                    h:54
                })

                this.afterMapLoaded();
            },

            afterMapLoaded(){

                console.log("afterMapLoaded");

                // 現在地の取得
                navigator.geolocation.getCurrentPosition(position => {
                    this.lat = position.coords.latitude;
                    this.lng = position.coords.longitude;

                    //自分のいる近傍にランダムにポイントを生成する
                    let rand_points = this.randomPointsRange(this.lat,this.lng,60,8,80)
                    this.a_mapstore(['set','locations',rand_points]);
                    //自分のいるポイントを起点に生成したランダムポイントをマーク

                    this.resetPos(position);

                    setTimeout(()=>{
                        this.addOtherMarkers();
                    },2000);

                }, this.geoError);


                // this.watchId = navigator.geolocation.watchPosition(position=>{
                //
                //    // if(this.mapstore.tracking){
                //         console.log("watching");
                //         this.resetPos(position);
                //     //}
                // },this.geoError,this.geocodingOptions);
            },

            keepTracking(){
                this.geolocation();

                // 3秒後に実行
                if(this.mapstore.tracking){
                    this.trackTimeout = true;
                    setTimeout(this.keepTracking, this.mapstore.trackDuration);
                }else{
                    this.trackTimeout = false;
                }
            },

            mapPanTo(lat,lng){
                let latLng = new google.maps.LatLng(lat,lng);
                this.map.panTo(latLng);
            },

            resetPos(position){
                if(!!this.map && !!position){
                    this.lat = position.coords.latitude;
                    this.lng = position.coords.longitude;
                    let latLng = new google.maps.LatLng(this.lat,this.lng);
                    this.map.panTo(latLng);
                    // this.map.setCenter(latLng);
                    this.mainuser.setPosition(latLng);
                    this.drawUserPoly();
                }
            },

            geolocation() {
                if(!!navigator.geolocation) navigator.geolocation.getCurrentPosition(this.resetPos, this.geoError,this.geocodingOptions2);
            },

            geoError(error) {
                console.log(error);
            },

            mainuserWindowClicked(){
                window.alert("あなたはメインユーザーです");
            },

            friendsWindowClicked(pid){
              window.alert(pid);
            },

            drawUserPoly(){

                if(this.userpoly) this.userpoly.setMap(null);

                let userpoly_coords = [];
                this.ws.users.forEach((user,index)=> userpoly_coords.push({lat:user.lat, lng:user.lng}));

               if(this.ws.users && this.ws.users.length>=3){
                   // Construct the polygon.
                   this.userpoly = new google.maps.Polygon({...this.userpolyOptions, paths:userpoly_coords});
                   this.userpoly.setMap(this.map);
               }

            },

            markerMaker(m){
                let icons = this.mapstore.icons[m.type];

                //乱数ではなく、タイトルの一文字目でアイコン画像を判別する
                let icon  = icons[m.title.charCodeAt(0) % icons.length];
                let w = m.w ? parseInt(m.w) : 22;
                let h = m.h ? parseInt(m.h) : 22;

                let options = {
                    map: this.map,
                    position: {lat: parseFloat(m.lat), lng: parseFloat(m.lng)},
                    icon: {
                        url: icon,
                        scaledSize: new google.maps.Size(w, h)
                    },
                    bouncy:false
                };

                if(m.type==='mainuser') options = {...options, animation: google.maps.Animation.DROP}

                let marker = new google.maps.Marker(options);
                let dom = document.createElement("div");
                dom.innerHTML ='<div class="mu-card marker" style="width:150px; margin: 0 auto;">'+
                    '<div class=" mu-card-media">'+
                    '<img src="'+m.thumb+'">'+
                    '<div class="mu-card-media-title">'+
                    '<div class="mu-card-title">'+m.title+'</div>'+
                    '<div class="mu-card-sub-title">'+m.subtitle+'</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="mu-card-text">'+m.body+
                    ' </div>';

                dom.addEventListener("click", ()=> {
                    if(m.type==='mainuser' || m.type==='user'){
                        this.mainuserWindowClicked.call(this);
                    }else{
                        this.friendsWindowClicked.call(this,m.pid);
                    }
                });

                marker.addListener("click", ()=> {
                    this.infowindow.setContent(dom);
                    this.infowindow.open(this.map, marker);
                });
                return marker;
            },

            removeAllOtherMarkers(){
                this.othermarkers.forEach(marker => marker.setMap(null));
                this.othermarkers.splice(0, this.othermarkers.length);
            },

            removeAllUserMarkers(){
                // ユーザーマーカーだけを全部クリア
                this.usermarkers.forEach(marker => marker.setMap(null));
                this.usermarkers.splice(0, this.usermarkers.length);
            },

            addOtherMarkers() {
                this.removeAllOtherMarkers();
                this.mapstore.locations.forEach(m => this.othermarkers.push(this.markerMaker(m)))
            },

            addUserMarkers(){
                // ユーザーマーカーだけを再描画
                this.removeAllUserMarkers();
                this.ws.users.forEach(user=>{
                    let m = {
                        lat:    user.lat,
                        lng:    user.lng,
                        type:   'user',
                        thumb:  '/static/img/covers/dummy.jpg',
                        title:  user.name,
                        subtitle:"サブタイトル",
                        body:   "本文",
                        pid:    user.pid,
                        w:48,
                        h:48
                    }
                    if(this.ws.you.socketid){
                        if(user.socketid !== this.ws.you.socketid) this.usermarkers.push(this.markerMaker(m))
                    }else{
                        if(user.name !== this.ws.you.name) this.usermarkers.push(this.markerMaker(m))
                    }
                })
            }
        }
    };
</script>
