import axios from 'axios';

export default{

    methods: {
        c_ary_split(ary,size){
            let  b      = ary.length, // 26
                cnt    = size,              // いくつずつに分割するか
                newArr = [];             // 新しく作る配列
            for(let i = 0; i < Math.ceil(b / cnt); i++) {
                let arrEl = []; // newArr に追加していく配列
                for(let j = 0; j < cnt; j++) {
                    let p = ary.shift(); // 元配列の先頭を取得して元配列から削除
                    if(!p) { break;}        // この場合は 'ZZZ' の次に来たらループを抜ける
                    arrEl.push(p);           // arrEl に取得した要素を追加
                }
                newArr.push(arrEl); // 作った arrEl を newArr に追加
            }
            return newArr;
        },

        c_filter:function(filter){

            let playlist = this.spotify.playlist;
            //Album IDだけのリストを作成
            let albumIDs = playlist.tracks.items.map((item)=>item.track.album.id);
            //一回にクエリできる上限は20までなので、アルバムIDを全てその塊で分割する。
            let albumIDsAry = this.c_ary_split(albumIDs, 20);
            //Axios並列処理
            let promises = [];
            albumIDsAry.forEach((ary)=>{promises.push(this.c_getAlbumsPromise(ary))});
            Promise.all(promises).then( (results) => {
                let album_byid = {};
                results.forEach(res=>{ if(res.data.albums) res.data.albums.forEach(al=>album_byid[al.id]=al)});
                playlist.tracks.items.map((item)=> {if(album_byid[item.track.album.id]) item.track.album = album_byid[item.track.album.id]});

                //フィルタの適用
                this.c_filter_action(filter);
            })
        },

        c_trim_space: function(val){
            val = val+"";
            val = val.replace(/^\s+|\s+$/g,'').replace(/ +/g,' ');
            val = val.trim();
            return val;
        },

        c_filter_action:function(filter){

            //空白の除去 + 小文字化
            let blacklist  = this.spotify.filter.blacklist;
            let checkwords = blacklist.labels.map(checkword=>{ return this.c_trim_space(checkword).toLowerCase()})
            let playlist   = this.spotify.playlist;

            playlist.afreq = {};
            playlist.amax  = 0;
            playlist.tracks.items.forEach(item=>{
                item.filtered = false;
                let label = item.track.album.label;
                let copyrights = filter.checkcopyright ? JSON.stringify(item.track.album.copyrights) : null;

                //チェックワードの検査
                checkwords.forEach(checkword=>{
                    if(checkword === this.c_trim_space(label).toLowerCase())  item.filtered = true;
                    if (!!copyrights && copyrights.indexOf(checkword) !== -1) item.filtered = true;
                });

                //アーティストの反復検査
                if(filter.checkartistfreq){
                    item.track.artists.forEach(artist=>{
                        if(playlist.afreq[artist.id]!==undefined){
                            playlist.afreq[artist.id]++;
                        }else{
                            playlist.afreq[artist.id]=1;
                        }
                    });
                }
            });
            if(filter.checkartistfreq) Object.keys(playlist.afreq).forEach(key=> playlist.amax = Math.max(playlist.amax,playlist.afreq[key]));
            this.a_spotify(['set','playlist',playlist]);
        },

        c_getPlaylistById: function (cb) {
            let params =  {'playlistid': this.spotify.playlist.id};
            let headers = {Authorization:this.spotify.credential.access_token};
            axios.get('/api/spotify/playlist/byid',{params:params, headers: headers})
                .then(res => {
                    cb(res);
                }).catch(error => {
                console.log(error);
            });
        },
    }
}
