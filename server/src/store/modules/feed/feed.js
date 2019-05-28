const state = {
   feed:{},
    src:[
        {   name:"NEWSWEEK JAPAN:コラム",
            url:"https://www.newsweekjapan.jp/column/rss.xml"
        },
        {   name:"NEWSWEEK JAPAN:ストーリー",
            url:  "https://www.newsweekjapan.jp/story/rss.xml"
        },
        {   name:"NHKニュース　主要",
            url:"https://www3.nhk.or.jp/rss/news/cat0.xml"
        },
        {   name:"PHIARY.ME",
            url: "http://phiary.me/rss",
        },
        {   name:"NEWSWEEK J!!",
            url:"https://rss.app/feeds/hmsyAr3PyniBpmOd.xml"
        },

        {   name:"ライフハッカー",
            url:"http://feeds.lifehacker.jp/rss/lifehacker/index.xml"
        },

        {   name:"NEWS2",
            url:"https://www.newsweekjapan.jp/column/rss.xml"
        }
    ],
    proxy:"https://spotifire.work/api/rssproxy?url="
}

const mutations = {
    setFeed(state,val){
      state.feed = val;
    }
}

export default {
    state,
    mutations
}
