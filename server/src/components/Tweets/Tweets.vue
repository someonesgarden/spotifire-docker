<template>
    <div class="twitter__container">
        <carousel :autoplay="true" :autoplayTimeout="12000" :dots="false" :per-page="col" :nav="false" v-if="tweets">

            <slide class="twitter__block" v-for="(tweet,index) in tweets.statuses" :key="'tweet'+index" v-if="tweets.statuses">
                <figure>
                    <img :src="tweet.user.profile_image_url" />
                </figure>
                <div class="twitter__block-text">
                    <div class="name">{{tweet.user.name}}<span class="name_reply">@{{tweet.user.screen_name}}</span></div>
                    <div class="date">10分前</div>
                    <div class="text">
                        {{tweet.text}}<br>
                    </div>
                    <div class="twitter__icon">
                        <span class="twitter-bubble"></span>
                        <span class="twitter-loop"></span>
                        <span class="twitter-heart"></span>
                    </div>
                </div>
            </slide>
        </carousel>
    </div>
</template>

<script>
    export default {
        name: "Tweets",
        props:['col','tweets']
    }
</script>

<style scoped>

</style>
