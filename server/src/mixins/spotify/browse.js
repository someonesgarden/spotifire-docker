import axios from 'axios';

export default{
    methods: {

        p_out_seeds_csv(gen) {
            let val   = gen.val;
            let range = gen.range;
            let seeds = gen.seeds;
            let seed_labels = [];
            let seed_ids    = [];
            let seed_types  = [];

            seeds.forEach((seed,i)=>{
                seed_labels.push('seed'+i);
                seed_ids.push(seed.id);
                seed_types.push(seed.type);
            });

            console.log(gen);

            console.log(this.spotify.gen);



            let idlabel={
                'target':'target',
                'min':'min',
                'max':'max',
                'gp001':'min/max±0.01',
                'gp005':'min/max±0.05',
                'gp010':'min/max±0.1',
                'gp100':'min/max±1',
                'gp200':'min/max±2',
                'gp500':'min/max±5',
                'gp800':'min/max±8',
                '':'-',
            }

            let modelabel={
                '1':'min',
                '0':'max',
                '':'-'
            }


            let csv_array = [];
            seed_labels = seed_labels.concat( [
                '',
                'acousticness',
                'danceability',
                'energy',
                'instrumentalness',
                'key',
                'liveness',
                'loudness',
                'mode',
                'speechiness',
                'tempo',
                'valence',
                'popularity',
                'market']);

            seed_ids    = seed_ids.concat([
                '',
                val.acousticness,
                val.danceability,
                val.energy,
                val.instrumentalness,
                val.key,
                val.liveness,
                val.loudness,
                val.mode,
                val.speechiness,
                val.tempo,
                val.valence,
                gen.popularity,
                gen.market]);

            seed_types  = seed_types.concat([
                '',
                idlabel[range.acousticness],
                idlabel[range.danceability],
                idlabel[range.energy],
                idlabel[range.instrumentalness],
                idlabel[range.key],
                idlabel[range.liveness],
                idlabel[range.loudness],
                modelabel[range.mode],
                idlabel[range.speechiness],
                idlabel[range.tempo],
                idlabel[range.valence],
                idlabel[range.popularity],
                gen.country
            ]);

            csv_array.push(seed_labels);
            csv_array.push(seed_types);
            csv_array.push(seed_ids);

            //------ EXPORT EXCELS -----
            this.c_exportExcels(csv_array);
        },

        p_out_tracks_csv() {
            let tracks = this.$store.state.pocky.reco.tracks;

            let csv_labels = ['track_name','track_id', 'artist_name', 'artist_id','album_name','album_id','popularity','','acousticness','danceability','duration_ms','energy','instrumentalness','key','liveness','loudness','mode','speechiness','tempo','time_signature','valence'];
            let csv_array = [csv_labels];
            let ary2_dummy =  ['','','','','','','','','','','','',''];


            tracks.forEach(el => {

                let ary1 = [el['name'],el['id'], el['artists'][0].name,el['artists'][0].id, el['album'].name,el['album'].id, el['popularity'], ''];

                if(el['audio_feature']){

                    let ary2 =  [el['audio_feature']['acousticness'],
                        el['audio_feature']['danceability'],
                        el['audio_feature']['duration_ms'],
                        el['audio_feature']['energy'],
                        el['audio_feature']['instrumentalness'],
                        el['audio_feature']['key'],
                        el['audio_feature']['liveness'],
                        el['audio_feature']['loudness'],
                        el['audio_feature']['mode'],
                        el['audio_feature']['speechiness'],
                        el['audio_feature']['tempo'],
                        el['audio_feature']['time_signature'],
                        el['audio_feature']['valence']];

                    ary1 = ary1.concat(ary2);
                }else{
                    ary1 = ary1.concat(ary2_dummy);
                }
                csv_array.push(ary1);
            });

            //配列をTAB区切り文字列に変換
            let csv_string = "";
            for (let i=0; i<csv_array.length; i++) {
                csv_string += csv_array[i].join("\t");
                csv_string += '\r\n';
            }

            //BOM追加
            csv_string = "\ufffe" + csv_string; //UTF-16
            console.log (csv_string);

            //UTF-16に変換
            let array = [];
            for (let i=0; i<csv_string.length; i++){
                array.push(csv_string.charCodeAt(i));
            }
            let csv_contents = new Uint16Array(array);

            //ファイル名作成
            let formatted_date = moment(new Date).format('YYYYMMDDHHmm_');
            let searched_as = this.$store.state.filter.searchlabelname!=="" ? "_LABEL="+this.$store.state.filter.searchlabelname : "";

            let blob = new Blob([csv_contents] , {
                type: "text/csv;charset=utf-16;"
            });
            let link = document.createElement('a');

            link.href = window.URL.createObjectURL(blob);
            link.download = 'result_tracks_aside_'+formatted_date+'.csv';
            link.click()
        },

        p_out_playlistfeatures_csv() {
            let playlist = this.$store.state.spotify.playlist;
            let tracks = playlist.tracks.items;

            let csv_labels = ['track_name','track_id', 'artist_name', 'artist_id','album_name','album_id','popularity','',
                'acousticness','danceability','duration_ms','energy','instrumentalness','key','liveness','loudness','mode','speechiness','tempo','time_signature','valence'];

            let csv_array = [csv_labels];

            tracks.forEach(el => {
                csv_array.push([el['track'].name,el['track'].id, el['track'].artists[0].name,el['track'].artists[0].id, el['track'].album.name,el['track'].album.id,el['track'].popularity, '',
                    el['audio_feature']['acousticness'],
                    el['audio_feature']['danceability'],
                    el['audio_feature']['duration_ms'],
                    el['audio_feature']['energy'],
                    el['audio_feature']['instrumentalness'],
                    el['audio_feature']['key'],
                    el['audio_feature']['liveness'],
                    el['audio_feature']['loudness'],
                    el['audio_feature']['mode'],
                    el['audio_feature']['speechiness'],
                    el['audio_feature']['tempo'],
                    el['audio_feature']['time_signature'],
                    el['audio_feature']['valence']
                ]);
            });

            //配列をTAB区切り文字列に変換
            let csv_string = "";
            for (let i=0; i<csv_array.length; i++) {
                csv_string += csv_array[i].join("\t");
                csv_string += '\r\n';
            }

            //BOM追加
            csv_string = "\ufffe" + csv_string; //UTF-16
            console.log (csv_string);

            //UTF-16に変換
            let array = [];
            for (let i=0; i<csv_string.length; i++){
                array.push(csv_string.charCodeAt(i));
            }
            let csv_contents = new Uint16Array(array);

            //ファイル名作成
            let formatted_date = moment(new Date).format('YYYYMMDDHHmm_');
            let searched_as = this.$store.state.filter.searchlabelname!=="" ? "_LABEL="+this.$store.state.filter.searchlabelname : "";

            let blob = new Blob([csv_contents] , {
                type: "text/csv;charset=utf-16;"
            });
            let link = document.createElement('a');

            link.href = window.URL.createObjectURL(blob);
            link.download = 'audiofeatures_'+playlist.id+"_"+formatted_date+'.csv';
            link.click()
        },


        c_gen_condition_csv:function(gen){
            this.p_out_seeds_csv(gen);
        },


        c_search:function(isTerm=true){

            if(!isTerm){
                // 検索語がなく、IDのみの場合、なんのIDかを突き止める
                let params =  {'anyid': this.spotify.searchQuery.id};
                let headers = {Authorization:this.spotify.credential.access_token};
                axios.get('/api/spotify/browse/idcheck',{params:params, headers: headers}).then(
                    res => {
                        let body = res.data.body;
                        let searchNum = 0;

                        this.a_spotify(['set','searchQuery',{key:'datatypes',val:[body.type]}]);

                        this.a_spotify(['set','playlists', null]);
                        this.a_spotify(['set','tracks', null]);
                        this.a_spotify(['set','artists', null]);
                        this.a_spotify(['set','albums', null]);
                        this.a_spotify(['set','episodes', null]);
                        this.a_spotify(['set','shows', null]);


                        if(body.type==='playlist'){
                            this.a_spotify(['set','playlists', {items:[res.data.body]}]);
                            searchNum = 1;
                        }
                        else if(body.type==='album'){
                            this.a_spotify(['set','albums', {items:[res.data.body]}]);
                            searchNum = 1;
                        }
                        else if(body.type==='artist'){
                            this.a_spotify(['set','artists', {items:[res.data.body]}]);
                            searchNum = 1;
                        }
                        else if(body.type==='track'){
                            this.a_spotify(['set','tracks', {items:[res.data.body]}]);
                            searchNum = 1;
                        }

                        this.a_spotify(['set','searchNum', searchNum]);

                    }).catch(error => {
                    console.log(error);
                });
            }
            else{
                    //検索語の場合

                    const conditions = {
                        conditions:this.spotify.searchQuery,
                        access_token:this.spotify.credential.access_token
                    }

                    axios.post('/api/spotify/browse/search',conditions)
                        .then(res => {

                            let searchNum = 0;
                            let data = res.data;

                            console.log(res);

                            if(!!data['playlists']){
                                this.a_spotify(['set','playlists', data['playlists']]);
                                searchNum += data['playlists'].items.length;
                            }else{
                                this.a_spotify(['set','playlists', null]);
                            }

                            if(!!data['tracks']){
                                this.a_spotify(['set','tracks', data['tracks']]);
                                searchNum += data['tracks'].items.length;
                            }else{
                                this.a_spotify(['set','tracks', null]);
                            }

                            if(!!data['artists']){
                                this.a_spotify(['set','artists', data['artists']]);
                                searchNum += data['artists'].items.length;
                            }else{
                                this.a_spotify(['set','artists', null]);
                            }


                            if(!!data['albums']){
                                this.a_spotify(['set','albums', data['albums']]);
                                searchNum += data['albums'].items.length;
                            }else{
                                this.a_spotify(['set','albums', null]);
                            }

                            if(!!data['episodes']){
                                this.a_spotify(['set','episodes', data['episodes']]);
                                searchNum += data['episodes'].items.length;
                            }else{
                                this.a_spotify(['set','episodes', null]);
                            }

                            if(!!data['shows']){
                                this.a_spotify(['set','shows', data['shows']]);
                                searchNum += data['shows'].items.length;
                            }else{
                                this.a_spotify(['set','shows', null]);
                            }

                            this.a_spotify(['set','searchNum', searchNum]);

                        }).catch(error => {
                        console.log(error);
                    });
            }
        },

        c_reco:function(){
            let queries = {};
            let gen = this.spotify.gen;
            let val = gen.val;
            let range = gen.range;
            let seeds = gen.seeds;

            Object.keys(val).forEach(key=>{

                switch(range[key]){
                    case 'max':
                    case 'min':
                    case 'target':
                        queries[range[key]+'_'+key] = val[key];
                        break;
                    case 'gp001':
                        queries['min_'+key] = val[key]-0.01;
                        queries['max_'+key] = val[key]+0.01;
                        break;
                    case 'gp005':
                        queries['min_'+key] = val[key]-0.05;
                        queries['max_'+key] = val[key]+0.05;
                        break;
                    case 'gp010':
                        queries['min_'+key] = val[key]-0.1;
                        queries['max_'+key] = val[key]+0.1;
                        break;
                    case 'gp100':
                        queries['min_'+key] = val[key]-1;
                        queries['max_'+key] = val[key]+1;
                        break;
                    case 'gp200':
                        queries['min_'+key] = val[key]-2;
                        queries['max_'+key] = val[key]+2;
                        break;
                    case 'gp500':
                        queries['min_'+key] = val[key]-5;
                        queries['max_'+key] = val[key]+5;
                        break;
                    case 'gp800':
                        queries['min_'+key] = val[key]-8;
                        queries['max_'+key] = val[key]+8;
                        break;
                    case true:
                        queries[key] = val[key];
                        break;
                }
            });

            seeds.forEach(seed => {
                switch (seed.type) {
                    case 'TRACK':
                        if(seed.id) {
                            if (!queries.seed_tracks) queries.seed_tracks=[];
                            queries.seed_tracks.push(seed.id);
                        }
                        break;
                    case 'GENRE':
                        if(seed.id) {
                            if (!queries.seed_genres) queries.seed_genres=[];
                            queries.seed_genres.push(seed.id);
                        }
                        break;
                    case 'ARTIST':
                        if(seed.id){
                            if(!queries.seed_artists) queries.seed_artists=[];
                            queries.seed_artists.push(seed.id);
                        }
                        break;
                }
            });

            console.log(queries);

            const conditions = {
                queries:queries,
                access_token:this.spotify.credential.access_token
            };

            axios.post('/api/spotify/browse/recommendations',conditions)
                .then(res => {
                    console.log(res);
                        this.a_spotify(['set','generated',res.data]);
                        this.a_spotify(['update','item','generated']);
                }).catch(error => {
                console.log(error);
            });
        }
    }
}
