import {mapActions} from 'vuex';
import axios from 'axios';

export default{
    methods: {
        ...mapActions(['a_feed']),

        // kuromojiParse(q='') {
        //
        //     let params = new URLSearchParams();
        //     params.append('data', "test123");
        //     axios.post('https://spotifire.work/api/form/contactinfo', params)
        //         .then(res => {
        //             console.log('OK');
        //             console.log(res);
        //         }).catch(error => {
        //         console.log(error);
        //     });
        // },

        async kuromojiParse(q='詩は金融市場とは無縁ですが、詩をお金の力が届かない聖域に祭り上げるのも、誤魔化しのように思えます。') {

            // q='広島'

            return  await axios.post('/api/analyze/parser/kuromoji', {q:q});
        }
    }
}

