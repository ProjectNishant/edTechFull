<template>
    <div>
        <b-navbar toggleable="lg" type="dark"  variant="info">
            <b-navbar-brand href="#" style="color: #fff; font-size:30px; font-family: 'Segoe Script', 'Zapfino', 'Savoye LET';">QuizBuzz</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <!-- <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form> -->


                <b-navbar-nav>
                <b-nav-item href="index.html" >Home</b-nav-item>
                <b-nav-item v-on:click="teamFun">Team</b-nav-item>
                <b-nav-item v-on:click="contactUs">Contact Us</b-nav-item>
                </b-navbar-nav>

                <b-nav-item-dropdown right style="display: none;" id="forNewOne">
                    <template v-slot:button-content>
                        <em>{{userName}}</em>
                    </template>
                    <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
                    <b-dropdown-item v-on:click="logOut">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown right style="display: none;" id="forAllUser">
                    <template v-slot:button-content>
                        <em>Login</em>
                    </template>
                    <b-dropdown-item v-b-modal.modalSignIn>Sign In</b-dropdown-item>
                    <b-dropdown-item v-b-modal.modalSignUp>Sign Up</b-dropdown-item>
                </b-nav-item-dropdown>

            </b-navbar-nav>
            </b-collapse>
            
        </b-navbar>

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
                <!-- <label for="pass"><i class="fa fa-lock"></i></label> -->
                <!-- <input type="password" class="w-90" name="pass" id="LoginPass" placeholder="Password"/> -->
            </div>
            </div>
            </form>
            <b-overlay :show="show" rounded="sm">
            <b-card :aria-hidden="show ? 'true' : null">            
                <b-button class="mt-3" variant="outline-success" block :disabled="show" v-on:click="login">Login</b-button>
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

            <b-form-group label="College Id" label-for="id-input" invalid-feedback="College Id is required">
                <b-form-input id="id-reg" required ></b-form-input>
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
                    <!-- <label for="pass"><i class="fa fa-lock"></i></label> -->
                    <!-- <input type="password" class="w-90" name="pass" id="LoginPass" placeholder="Password"/> -->
                </div>
            </div>
            </form>
            <b-overlay :show="show" rounded="sm">
            <b-card :aria-hidden="show ? 'true' : null"> 
                <b-button class="mt-3" variant="outline-primary" block :disabled="show" v-on:click="register">Register</b-button>
            </b-card>
            </b-overlay>
            <!-- <p>
            This
            <b-button v-b-popover="'Popover inside a modal!'" title="Popover">Button</b-button>
            triggers a popover on click. Sign Up
            </p>
            <p>
            This <a href="#" v-b-tooltip title="Tooltip in a modal!">Link</a> will show a tooltip on
            hover.
            </p> -->
        </b-modal>

    </div>
</template>


<script>
import Vue from 'vue'
import firebase from 'firebase';
// import VueRouter from 'vue-router'
import Team from '@/./views/Team.vue'
import Admin from '@/./views/Admin.vue'
import Contact from '@/./views/ContactUs.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import BootstrapVue2 from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// import func from '../../../vue-temp/vue-editor-bridge';
// import router from '@/./././router'
export default {
    name: 'Header',
    data() {
      return {
        userName: null,
        show: false,
      }
    },
    mounted:function(){
      this.checkLogin();
    },
    methods:{

      // onLoad: function(){
      //   this.checkLogin();
      // },

      teamFun : function(){
        Vue.config.productionTip = false
          Vue.use(BootstrapVue);
          new Vue({
            render: h => h(Team),

          }).$mount('#app')
      },

      contactUs: function(){
        Vue.config.productionTip = false
            Vue.use(BootstrapVue2);
            new Vue({
              render: h => h(Contact),

            }).$mount('#app')
      },

      register: function(){
        this.show = true;
        let uName=document.getElementById("name-reg").value;
        let uEmail=document.getElementById("email-reg").value;
        let uId=document.getElementById("id-reg").value;
        let uPass=document.getElementById("pass-reg").value;
        let uCpass=document.getElementById("pass-c-reg").value;

        if(uName != '' && uEmail != '' && uId != '' && uPass != '' && uCpass != ''){
          if(uPass === uCpass){
            firebase
              .auth()
              .createUserWithEmailAndPassword(uEmail, uPass)
              .then(data => {
                  firebase.database().ref('/users/').child('students').child(firebase.auth().currentUser.uid).set({
                      'Name': uName,
                      'Id': uId,
                      'Email': uEmail
                  });
                alert("Successfully registered \n"+data);
                localStorage.setItem('uid',firebase.auth().currentUser.uid);
                this.show = false;
                // doEditProfile();
                location.href='index.html';
              })
          }else{
            alert("Password doesn't matched");
            this.show = false;
          }
        }else{
            alert("Please enter sufficient details.");
            this.show = false;
          }

      },

      login: function(){
        this.show = true;
        let lEmail=document.getElementById("email-log").value;
        let lPass=document.getElementById("pass-log").value;

        if(lPass != '' && lEmail != ''){
          firebase.auth().signInWithEmailAndPassword(lEmail, lPass)
          .then(data =>{
            if (lEmail == 'mitrcnishant@gmail.com' || lEmail == 'jainshailina23@gmail.com') {
              localStorage.currentUser = lEmail;
              localStorage.setItem('uid', firebase.auth().currentUser.uid)
            //   window.location.href = "../admin.html";
              alert('Successfully logging in. \n'+ data);
                Vue.config.productionTip = false
                Vue.use(BootstrapVue2);
                new Vue({
                render: h => h(Admin),

                }).$mount('#appp')

              this.show = false;
            } 
            else {
              localStorage.currentUser = lEmail;
              localStorage.setItem('uid', firebase.auth().currentUser.uid);
              alert('Successfully logging in.')
              // window.location.href = "index.html";
              this.show = false;
              location.href='index.html';
            }
          })
        }else{
            alert("Please enter sufficient details.");
            this.show = false;
          }
      },

      checkLogin: function(){
        

        var localUid = localStorage.getItem('uUid');
        var localUname = localStorage.getItem('uName');
        if(localUid != null && localUname != null){
          
          this.userName = localUname;
          document.getElementById("forNewOne").style.display = "block";
          
        }else if(localUid == null && localUname == null){
          document.getElementById("forAllUser").style.display = "block";
        }
      },

      logOut: function(){
        firebase.auth().signOut()
        .then(data => {
            localStorage.removeItem('uUid');
            localStorage.removeItem('uName');
            alert("Logged Out Successfully"+ data);
            location.href='index.html';

        })
      },


    },

    
}
</script>