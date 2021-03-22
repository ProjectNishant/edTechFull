<template>
<div>
    <div id="newProfile">
        <!-- <div id="inStart">loading...</div> -->
        <div id="unSuccessAuth">
            <div class="col-lg-6 mt-5" style="text-align: center;">
                <button class="btn btn-success btn-block mt-2" v-b-modal.modalSignIn>Login</button>
                <button class="btn btn-primary btn-block mt-3" v-b-modal.modalSignUp>Register</button>
            </div>
                
            <!-- Login Model is here -->
            <b-modal id="modalSignIn" centered title="Login Now" hide-footer>
                <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="E-Mail" label-for="email-input" invalid-feedback="E-Mail is required">
                <b-form-input id="email-log" required ></b-form-input>
                </b-form-group>

                <b-form-group label="Password" label-for="pass-input" invalid-feedback="Password is required">
                <b-form-input id="pass-log" type="password" required ></b-form-input>
                </b-form-group>

                <div class="row">
                    <div class="form-group ml-3">
                        <p>Haven't Registered Yet?  <a style="color:blue;" @click="$bvModal.hide('modalSignIn')" v-b-modal.modalSignUp>SignUp</a></p>
                    </div>
                </div>
                </form>
                <b-overlay :show="show" rounded="sm">
                <b-card :aria-hidden="show ? 'true' : null">            
                    <b-button class="mt-3" variant="outline-success" block :disabled="show" v-on:click="loginFun">Login</b-button>
                </b-card>
                </b-overlay>
            </b-modal>

            <!-- Sign Up Model is here -->
            <b-modal id="modalSignUp" title="Register Yourself" hide-footer>
                <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="Your Full Name" label-for="name-input" invalid-feedback="Name is required">
                    <b-form-input id="name-reg" v-b-tooltip title="It will be shown in your certificate." required ></b-form-input>
                </b-form-group>

                <b-form-group label="E-Mail" label-for="email-input" invalid-feedback="E-Mail is required">
                    <b-form-input id="email-reg" required ></b-form-input>
                </b-form-group>

                <b-form-group label="Password" label-for="pass-reg" invalid-feedback="Password is required">
                    <b-form-input id="pass-reg" type="password" required ></b-form-input>
                </b-form-group>

                <b-form-group label="Confirm Password" label-for="pass-c-reg" invalid-feedback="Confirm Password is required">
                    <b-form-input id="pass-c-reg" type="password" required ></b-form-input>
                </b-form-group>

                <div class="row">
                    <div class="form-group ml-3">
                        <p>Already Registered?  <a style="color:blue;" @click="$bvModal.hide('modalSignUp')" v-b-modal.modalSignIn>SignIn</a></p>
                    </div>
                </div>
                </form>
                <b-overlay :show="show" rounded="sm">
                <b-card :aria-hidden="show ? 'true' : null"> 
                    <b-button class="mt-3" variant="outline-primary" block :disabled="show" v-on:click="regFun">Register</b-button>
                </b-card>
                </b-overlay>
            </b-modal>
        </div>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
// import Profile from "@/pages/Auth/Profile.vue";
import UserProfile from '@/pages/UserProfile.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
export default {
    name: "checkAuth",
    data() {
      return {
        userName: null,
        authFlag: 0,
        show: false,
      }
    },
    // mounted:function(){
    //   this.getAuth();
    // },
    methods:{
        
        // getAuth: function() {
        //     // localStorage.setItem('authUseToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYzODY2YmEwNjY2ODAxOTE5ZDYyYTciLCJpYXQiOjE1OTUxNjY1Njh9.P9MaT6vWPksMi582TntZzpJDRgLNK5UkVLlzdm_tHwU');
        //     this.authFlag = localStorage.getItem('authUseToken');
            
        //     if(this.authFlag != 0 && this.authFlag != undefined){
        //         Vue.config.productionTip = false
        //         Vue.use(BootstrapVue);
        //         new Vue({
        //           render: h => h(UserProfile),

        //         }).$mount('#profile')
        //     }
        //     // else if(this.authFlag == undefined || this.authFlag == null || this.authFlag == 0){
        //     //     document.getElementById('inStart').style.display = 'none'
        //     //     document.getElementById('unSuccessAuth').style.display = 'block'
        //     // }
        // },
        loginFun: function(){
        this.show = true;
        var userEmail = document.getElementById('email-log').value;
        var password = document.getElementById('pass-log').value;
        axios({
            method: 'POST',
            url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/posts/userLogin',
            data: { userEmail, password },
            validateStatus: () => true
        }).then(res => {
            alert(res.data.message);
            if(res.status == 400 && res.data.code == 0){
                alert(res.data.message);
            }else if(res.status == 400 && res.data.code == 1){
                alert(res.data.message);
            }else if(res.status == 400 && res.data.code == 2){
                alert(res.data.message);
            }else if(res.status == 200 && res.data.code == 3){
                alert(res.data.message);
                localStorage.setItem('authUseToken', res.data.token);
                // loadFunction(res.data.token);
            }
            this.show = false;
        });

        // axios.post('https://boiling-garden-13643.herokuapp.com/posts/userLogin',{
                
        //       email: document.getElementById('loginEmail').value,
        //       password: document.getElementById('loginEmail').value,
        //       validateStatus: () => true,
        //     },
        //     )
        //     .then(response =>{
        //       console.log(response.status),
        //       alert("data entered Successfully\n"+response)
        //     })
        },

        regFun: function(){
        this.show = true;
        var regName = document.getElementById('name-reg').value;
        var regEmail = document.getElementById('email-reg').value;
        var regPassword = document.getElementById('pass-reg').value;
        var regCPassword = document.getElementById('pass-c-reg').value;

        if(regPassword === regCPassword){
        axios({
            method: 'POST',
            url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/posts/userRegistration',
            data: { regName, regEmail, regPassword },
            validateStatus: () => true
        }).then(res => {
            console.log(res.status);
            if(res.status == 400){
                alert(res.data.message);
            }else if(res.status == 200){
                alert('Registered Successfully. \n Now Login');
                document.getElementById('signUp').style.display='none';
                document.getElementById('signIn').style.display='block';
            }
            this.show = false;
        });
        }else{
            alert("Password doesn't matched")
        }

        },
    },
}
</script>