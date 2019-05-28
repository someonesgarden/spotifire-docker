import axios from 'axios';
import moment from 'moment';

export default{

    methods: {
        c_isOver(item,filter){
            let over = false;
            if(filter.checkartistfreq){
                item.track.artists.map(a=> {
                    if(this.spotify.playlist.afreq){
                        if(!!this.spotify.playlist.afreq[a.id] && this.spotify.playlist.afreq[a.id] >= filter.artistfreq) over = true;
                    }
                })
            }
            return over;
        },

        c_downloadCSV(filter) {
            let playlist = this.spotify.playlist;
            let csv_array = [];
            csv_array.push([
                '#',
                'NG',
                'label name',
                'track URL',
                'track title',
                'artist name',
                'artist duplicate',
                'sub artists'
            ]);

            playlist.tracks.items.forEach((item,index) => {
                let show = true;
                if(filter.use){
                    show = false;
                    switch(filter.state){
                        case 1: //OVER
                            show = this.c_isOver(item,filter) && !item.filtered;
                            break;
                        case 2: //NG
                            show = item.filtered && !(this.c_isOver(item,filter));
                            break;
                        case 3: //NG+OVER
                            show = (this.c_isOver(item,filter) && item.filtered);
                            break;

                        case 4: //OK
                            show = (!this.c_isOver(item,filter) && !item.filtered);
                            break;
                        default:
                            show = true;
                            break;
                    }
                }

                if(show){
                    let ary = [
                        index,
                        item.filtered ? 'NG' : '',
                        item.track.album.label,
                        item.track.uri,item.track.name,
                        item.track.artists[0].name,
                        item.track.artists.filter(a=> playlist.afreq[a.id] >= filter.artistfreq).some((elem)=> !!elem) ? 'Y' : '',
                    ];

                    let artists = item.track.artists.map(a=>[a.name]);
                    let sub_artists = artists.slice(1);
                    if(sub_artists.length > 0) ary.push(...sub_artists);
                    csv_array.push(ary);
                }
            });

            //------ EXPORT EXCELS -----
            this.c_exportExcels(csv_array);
        },

        c_exportExcels(csv_array){
            //配列をTAB区切り文字列に変換
            let csv_string = "";
            for (let i=0; i<csv_array.length; i++) {
                csv_string += csv_array[i].join("\t");
                csv_string += '\r\n';
            }

            let formatted_date = moment(new Date).format('YYYYMMDDHHmm_');

            // EXCEL : UTF-16に変換
            //BOM追加
            let csv_string_excel = "\ufffe" + csv_string; //UTF-16
            let array_excel = [];
            for (let i=0; i<csv_string_excel.length; i++){
                array_excel.push(csv_string_excel.charCodeAt(i));
            }
            let csv_contents_excel = new Uint16Array(array_excel);

            let blob_excel = new Blob([csv_contents_excel] , {
                type: "text/csv;charset=utf-16;"
            });
            let link_excel = document.createElement('a');
            link_excel.href = window.URL.createObjectURL(blob_excel);
            link_excel.download = "Excel_"+formatted_date+'.csv';
            link_excel.click()

            //Google Spreadsheet : 変換
            let csv_contents_gs = csv_string;
            let blob_gs = new Blob([csv_contents_gs] , {
                type: "text/csv;charset=utf-8;"
            });
            let link_gs = document.createElement('a');
            link_gs.href = window.URL.createObjectURL(blob_gs);
            link_gs.download = "Google_"+formatted_date+'.csv';
            link_gs.click()
        }
    }
}
