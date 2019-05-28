<template>
    <mu-container class="flex_v">
        <div class="base">
            <mu-form :model="form" class="mu-demo-form"label-width="100">
                <mu-form-item prop="select" label="Select10:31">
                    <mu-select v-model="form.feedsrc" @change="loadFeed">
                        <mu-option v-for="(src,index) in feed.src" :key="'feedsrc'+index" :label="src.name" :value="src.url"></mu-option>
                    </mu-select>
                </mu-form-item>
            </mu-form>
            <div class="hello" v-if="!!feed.feed.items">

                <feed-block :item="feed.feed.items[0]" class="large" :col="3"/>

                <masonry ref="itemarea" :cols="cols" :gutter="gutter">
                    <feed-block :item="item" v-for="(item,index) in feed.feed.items" v-if="index>0 && index<7" :key="'item'+index" :col="1"/>
                </masonry>

            </div>
        </div>
    </mu-container>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex';
    import feedMixin from '../mixins/feed/index';
    import FeedBlock from './Feed/FeedBlock';

    export default {
        name: 'news',
        mixins:[feedMixin],
        components:{
            FeedBlock
        },
        data: function () {
            return {
                cols:{default: 3, 1199: 2, 991: 2, 767: 1, 400: 1},
                gutter:{default: '12px', 700: '12px'},
                limit: 5,
                form:{
                    feedsrc:"https://www.newsweekjapan.jp/column/rss.xml"
                }
            }
        },

        computed:mapGetters(['feed']),
        methods:{
            ...mapActions(['a_spotify','a_index']),
            loadFeed(){
                this.fetchData(this.feed.proxy+this.form.feedsrc);
            }
        },

        mounted() {
            if (!!this.$route.query.code) this.a_spotify(['code', 'set', this.$route.query.code]);
            this.loadFeed();
        }
    }
</script>

<style scoped lang="scss">
</style>
