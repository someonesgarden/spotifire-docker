import axios from 'axios';

export default{
    methods: {
        async tweetSearch(word ='大阪') {
            return  await axios.get('/api/twitter/search?q='+word);
        }

    }
}
