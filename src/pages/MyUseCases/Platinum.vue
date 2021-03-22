<template>
<div>
    <div id="platinum">Loading...</div>
</div>
</template>
<script>
const axios = require('axios').default;
import Choose from './Choose.vue'
import Plans from './Plans.vue'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
export default {
    data() {
        return {
            status: '',
        }
    },
    mounted () {
      this.checkValid();
    },
    methods:{
        checkValid(){
            var userToken = localStorage.getItem('authUseToken');
            axios({
            method: "GET",
            url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/posts/getStatusPremium',
            headers:{authorization : userToken},
            }).then(response => {
            console.log(status, response.data);
                this.status = response.data;
                if(response.data.code === '3'){
                    Vue.config.productionTip = false
                    Vue.use(BootstrapVue);
                    new Vue({
                    render: h => h(Choose),

                    }).$mount('#platinum')
                }
                else{
                    alert("Unauthenticated user");
                }
            });
            if(userToken == null || userToken == undefined){
                Vue.config.productionTip = false
                    Vue.use(BootstrapVue);
                    new Vue({
                    render: h => h(Plans),

                    }).$mount('#platinum')
            }
            
        }
    }

}
</script>