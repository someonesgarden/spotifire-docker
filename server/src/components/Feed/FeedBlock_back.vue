<template>
    <div class="card flex_v">
        <div class="inner">
            <a @click="clickAction('title',item.title)">
                <h1>
                    <mu-icon value="format_quote" size="45"></mu-icon>
                    {{item.title}}
                </h1>
            </a>
            <a @click="clickAction('title',item.content)">
                <h3>{{item.content | truncate}}</h3>
            </a>
            <hr>
            <div class="tweets" v-if="nicelist">
                <div class="header">
                    <mu-form :model="form" label-width="100">
                    <mu-form-item prop="checkbox">
                        <mu-checkbox v-model="form.searchwords" :value="nl" :label="nl"  v-for="(nl,index) in nicelist" :key="'nl'+index" @change="twitterSearch"></mu-checkbox>
                    </mu-form-item>
                    </mu-form>
                </div>
                <div class="inner">
                    <tweets :col="col" :tweets="tweets"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Markov} from '../../../parsers/markov';
    import tweetMixin from '../../mixins/tweet/index';
    import feedMixin from '../../mixins/feed/index';
    import utilMixin from '../../mixins/util';

    import Tweets from '../Tweets/Tweets';
    import {mapGetters,mapActions} from 'vuex';
    export default {
        name: "FeedBlock",
        props:['item','col'],
        mixins:[feedMixin,tweetMixin,utilMixin],
        components:{Tweets},
        methods:{
            ...mapActions(['a_index']),

            clickAction(mode,link){
                this.a_index(['bottom','open']);
               // this.parseContent();
            },

            twitterSearch(){
                this.tweetSearch(this.form.searchwords.join(' ')).then((data)=>this.tweets = data.data);
            },

            parseContent(){
                if(this.item.content){
                    this.nicelist = null;
                    this.over4length = [];
                    this.top5 = [];
                    this.pure_txt = this.item.title+this.item.content;
                    this.pure_txt = this.pure_txt.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
                    this.pure_txt = this.pure_txt.replace(/\s+/g, "");

                    let parsing = this.kuromojiParse(this.pure_txt);
                    parsing.then((res)=>{
                        this.tokens = res.data;
                        this.getFreqs(this.tokens);
                    })
                }
            },

            getFreqs(tokens){
                // const TARGET_POS = ['名詞', '動詞', '形容詞'];
                const TARGET_POS = ['名詞', '形容詞'];
                const NO_CONTENT = '*';
                const freqWords = tokens
                    // pos（品詞）を参照し、'名詞', '動詞', '形容詞'のみを抽出
                    .filter(t => TARGET_POS.includes(t.pos))
                    // 単語を抽出(basic_formかsurface_formに単語が存在する)
                    .map(t => t.basic_form === NO_CONTENT ? t.surface_form : t.basic_form)
                    // [{text: 単語, value: 出現回数}]の形にReduce
                    .reduce((data, text) => {
                        const target = data.find(c => c.text === text)
                        if(target) {
                            target.value = target.value + 1
                        } else {
                            data.push({text, value: 1})
                        }
                        return data
                    }, []);

                //一文字だけの単語は除去・四文字以上は特別扱い
                let freqWords2 = [];
                freqWords.map(word=>{ if(word.text.length>1){
                    freqWords2.push(word);
                    if(word.text.length>3) this.over4length.push(word.text);
                } });
                freqWords2.sort((a,b)=> b.value - a.value);

                //トップ５を抽出
                freqWords2.forEach((d,i)=> {if(i<5) this.top5.push(d.text)});

                let temp  = [...this.top5,...this.over4length];
                let temp2 = temp.filter((d)=> !this.isNumber(d));
                let temp3 = temp2.filter((d)=> !this.isSpecialCharas(d));
                let temp4 = temp3.filter((d)=> !this.isHiragana(d));
                this.nicelist = temp4.filter((x, i, self)=> self.indexOf(x) === i);
                console.log(this.nicelist);
            },

            makeMarkov(tokens){
                //文中表記
                this.words = tokens.map((token)=>token.surface_form);
                this.markov.add(this.words);
                console.log(this.markov.make());
            }
        },
        data(){
          return{
              pure_txt:null,
              tokens:null,
              words:null,
              markov:null,
              top5:[],
              over4length:[],
              nicelist:null,
              tweets:null,
              form:{
                  searchwords:[]
              }

          }
        },
        mounted(){
            this.markov = new Markov();
            this.parseContent();

        },
        watch:{
            'item.content':{
                handler(newData){
                    this.parseContent();
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
