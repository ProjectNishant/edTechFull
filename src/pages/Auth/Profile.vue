<template>
<div>
    <div id="profile">
        <div id="inStart">loading...</div>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import NewProfile from "@/pages/UserProfile/newUser.vue";
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
    mounted:function(){
      this.getAuth();
    },
    methods:{
        
        getAuth: function() {
            // localStorage.setItem('authUseToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYzODY2YmEwNjY2ODAxOTE5ZDYyYTciLCJpYXQiOjE1OTUxNjY1Njh9.P9MaT6vWPksMi582TntZzpJDRgLNK5UkVLlzdm_tHwU');
            this.authFlag = localStorage.getItem('authUseToken');
            
            if(this.authFlag != 0 && this.authFlag != undefined){
                Vue.config.productionTip = false
                Vue.use(BootstrapVue);
                new Vue({
                  render: h => h(UserProfile),

                }).$mount('#profile')
            }
            else if(this.authFlag == undefined || this.authFlag == null || this.authFlag == 0){
                Vue.config.productionTip = false
                Vue.use(BootstrapVue);
                new Vue({
                  render: h => h(NewProfile),

                }).$mount('#profile')
            }
        },
        // loginFun: function(){
        // this.show = true;
        // var userEmail = document.getElementById('email-log').value;
        // var password = document.getElementById('pass-log').value;
        // axios({
        //     method: 'POST',
        //     url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/posts/userLogin',
        //     data: { userEmail, password },
        //     validateStatus: () => true
        // }).then(res => {
        //     alert(res.data.message);
        //     if(res.status == 400 && res.data.code == 0){
        //         alert(res.data.message);
        //     }else if(res.status == 400 && res.data.code == 1){
        //         alert(res.data.message);
        //     }else if(res.status == 400 && res.data.code == 2){
        //         alert(res.data.message);
        //     }else if(res.status == 200 && res.data.code == 3){
        //         alert(res.data.message);
        //         localStorage.setItem('authUseToken', res.data.token);
        //         // loadFunction(res.data.token);
        //     }
        //     this.show = false;
        // });

        // // axios.post('https://boiling-garden-13643.herokuapp.com/posts/userLogin',{
                
        // //       email: document.getElementById('loginEmail').value,
        // //       password: document.getElementById('loginEmail').value,
        // //       validateStatus: () => true,
        // //     },
        // //     )
        // //     .then(response =>{
        // //       console.log(response.status),
        // //       alert("data entered Successfully\n"+response)
        // //     })
        // },

        // regFun: function(){
        // this.show = true;
        // var regName = document.getElementById('name-reg').value;
        // var regEmail = document.getElementById('email-reg').value;
        // var regPassword = document.getElementById('pass-reg').value;
        // var regCPassword = document.getElementById('pass-c-reg').value;

        // if(regPassword === regCPassword){
        // axios({
        //     method: 'POST',
        //     url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/posts/userRegistration',
        //     data: { regName, regEmail, regPassword },
        //     validateStatus: () => true
        // }).then(res => {
        //     console.log(res.status);
        //     if(res.status == 400){
        //         alert(res.data.message);
        //     }else if(res.status == 200){
        //         alert('Registered Successfully. \n Now Login');
        //         document.getElementById('signUp').style.display='none';
        //         document.getElementById('signIn').style.display='block';
        //     }
        //     this.show = false;
        // });
        // }else{
        //     alert("Password doesn't matched")
        // }

        // },
    },
}
</script>