<template>
  <card class="card-user">
    <div slot="image">
      <img src="@/assets/img/background.jpg" alt="...">
    </div>
    <div>
      <div class="author">
        <img class="avatar border-white" src="@/assets/img/faces/face-1.jpg" alt="...">
        <h4 class="title">{{user.name}}
          <br>
          <a href="#">
            <small>{{user.email}}</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">
        "I like the way you work it
        <br> No diggity
        <br> I wanna bag it up"
      </p>
      <button class="btn btn-secondary btn-block" style="background: gray;" v-on:click="logOut">Logout</button>
    </div>
    <hr>
    <!-- <div class="text-center">
      <div class="row">
        <div v-for="(info, index) in details" :key="index" :class="getClasses(index)">
          <h5>{{info.title}}
            <br>
            <small>{{info.subTitle}}</small>
          </h5>
        </div>
      </div>
    </div> -->
  </card>
</template>
<script>
const axios = require('axios').default;
export default {
  data() {
    return {
      user: [
        {
          name: "Your Name",
          email: "email.com"
        },
      ],
      details: [
        {
          title: "12",
          subTitle: "Files"
        },
        {
          title: "2GB",
          subTitle: "Used"
        },
        {
          title: "24,6$",
          subTitle: "Spent"
        }
      ]
    };
  },
  mounted: function() {
      this.getProfile();
  },
  methods: {
    getProfile() {
      var userToken = localStorage.getItem('authUseToken');
        axios({
          method: "GET",
          url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/posts/getUserProfile',
          headers:{authorization : userToken},
        }).then(response => {
          this.user.name = response.data.fullName;
          this.user.email = response.data.email;
          console.log(userToken,this.user.name, response);
        });
      // alert("Your data: " + JSON.stringify(this.user));
    },
    logOut(){
      localStorage.removeItem('authUseToken');
      window.location.reload();
    },
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-lg-3 offset-lg-1";
      } else if (remainder === 2) {
        return "col-lg-4";
      } else {
        return "col-lg-3";
      }
    }
  }
};
</script>
<style>
</style>
