import {mapActions} from 'vuex';
import RSSParser from "rss-parser";

export default{
    methods: {
        ...mapActions(['a_feed']),

        async fetchData(feedUrl) {
           let error = "";
            let loading = true;
            try {
                const data = await fetch(feedUrl);
                if (data.ok) {
                    const text = await data.text();
                    const parser = new RSSParser();
                    parser.parseString(text, (err, parsed) => {
                        if (err) {
                            loading = false;
                            error = `Error occured while parsing RSS Feed ${err.toString()}`;
                        } else {
                            this.a_feed(['set','feed',parsed]);
                        }
                    });
                } else {
                    error = "Error occured while fetching the feed";
                    loading = false;
                }
            } catch (e) {
                if (e.toString() === "TypeError: Failed to fetch") {
                    error = "Error due to CORS policy";
                } else {
                    error = e.toString();
                }
                loading = false;
            }
        }
    }
}
