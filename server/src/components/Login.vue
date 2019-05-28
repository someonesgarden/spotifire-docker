<template>
    <mu-container class="flex_v">
        <div>

            <mu-flex class="flex-wrapper" justify-content="center" align-items="center" direction="column">

                <img class="menu-icon" src="/static/img/spotifire_logo.png">
                <h1><mu-icon value="vpn_key"></mu-icon>LOGIN..</h1>

                <mu-form ref="adminform" :model="admin" class="mu-demo-form" label-position="left" label-width="100">

                    <div class="ui grid">
                        <div class="sixteen wide mobile eight wide tablet eight wide computer column">
                            <mu-form-item :rules="emptyRules" prop="id" label="admin ID" class="range">
                                <mu-text-field prop="id" v-model="admin.id"></mu-text-field>
                            </mu-form-item>
                        </div>

                        <div class="sixteen wide mobile eight wide tablet eight wide computer column">
                            <mu-form-item :rules="emptyRules" prop="pass" label="password" class="range">
                                <mu-text-field  type="password" prop="pass"  v-model="admin.pass"  label="Password" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"></mu-text-field>
                            </mu-form-item>
                        </div>
                    </div>

                    <div class="ui grid">
                        <mu-col span="12" sm="12" md="12" lg="12" xl="12">
                            <div class="grid-cell">
                                <mu-button color="primary" class="smallbtn" full-width @click="loginAction">LOGIN</mu-button>
                            </div>
                        </mu-col>
                    </div>
                </mu-form>


            </mu-flex>

        </div>
    </mu-container>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';

    import {ruleEmpty} from '../store/rules';

    export default {
        name: 'mylogin',
        data(){
          return{
              emptyRules: [ruleEmpty],
              visibility:false,
              admin:{
                  id:null,
                  pass:null
              }
          }
        },
        computed:mapGetters(['loggedIn']),
        methods:{
            ...mapActions(['a_login']),

            loginAction(){
                this.$refs.adminform.validate().then(valid => {

                    if(valid){
                        this.a_login(this.admin);
                        if(this.loggedIn) this.$router.push('/');
                    }

                });
            }
        },

    }
</script>
