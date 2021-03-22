<template>
<div class="row">
    <!-- Silver Card -->
    <div class="col-xl-4 col-lg-5 col-md-6">
        <card class="card-user">
            <div slot="image">
                <img src="@/assets/img/2.png" alt="...">
            </div>
            <div>
            <div class="author">
                <img class="avatar border-white" src="https://blog.spoongraphics.co.uk/wp-content/uploads/2013/text-styles/10.jpg" alt="...">
                <h4 class="title">Basic Plan
                <br>
                <a href="#">
                    <small>1 Use Cases</small>
                </a>
                </h4>
            </div>
            <p class="description text-center">
            We will be supporting or teach you <br><b>1</b> use case and share you the complete deployment on cloud and demonstrate how we can integrate with the application.
                <br> <b>Support</b>
                <br> Our team will contact with you soon after you will successfully enrolls for a use case and share the availability time.
            </p>
            </div>
            <hr>
            <div class="text-center">
            <div class="row">
                <div v-for="(info, index) in basicDetails" :key="index" :class="getClasses(index)">
                <h5>{{info.title}}
                    <br>
                    <small>{{info.subTitle}}</small>
                </h5>
                </div>
            </div>
            </div>
            <button class="btn btn-block" style="background: #ff8d1a">Select Plan</button>
        </card>
    </div>
    <!-- Gold Card -->
    <div class="col-xl-4 col-lg-5 col-md-6">
        <card class="card-user">
            <div slot="image">
                <img src="@/assets/img/1.png" alt="...">
            </div>
            <div>
            <div class="author">
                <img class="avatar border-white" src="https://images.all-free-download.com/images/graphiclarge/72_3d_shiny_gold_text_effects_preview_6821569.jpg" alt="...">
                <h4 class="title">Intermediate Learning Plan
                <br>
                <a href="#">
                    <small>5 Use Cases</small>
                </a>
                </h4>
            </div>
            <p class="description text-center">
            We will be supporting or teach you <br><b>5</b> use case and share you the complete deployment on cloud and demonstrate how we can integrate with the application.
                <br> <b>Support</b>
                <br> Our team will contact with you soon after you will successfully enrolls for use cases and share the availability time.
            </p>
            </div>
            <hr>
            <div class="text-center">
            <div class="row">
                <div v-for="(info, index) in interMedDetails" :key="index" :class="getClasses(index)">
                <h5>{{info.title}}
                    <br>
                    <small>{{info.subTitle}}</small>
                </h5>
                </div>
            </div>
            </div>
            <button class="btn btn-block" style="background: #ff8d1a">Select Plan</button>
        </card>
    </div>
    <!-- Diamond Card -->
    <div class="col-xl-4 col-lg-5 col-md-6">
        <card class="card-user">
            <div slot="image">
                <img src="@/assets/img/3.png" alt="...">
            </div>
            <div>
            <div class="author">
                <img class="avatar border-white" src="https://image.shutterstock.com/image-vector/thin-line-diamond-logo-jewelry-260nw-1230292213.jpg" alt="...">
                <h4 class="title">Premium Learning Plan
                <br>
                <a>
                    <small>10 Use Cases</small>
                </a>
                </h4>
            </div>
            <p class="description text-center">
            We will be supporting or teach you <br><b>10</b> use case and share you the complete deployment on cloud and demonstrate how we can integrate with the application.
                <br> <b>Support</b>
                <br> Our team will contact with you soon after you will successfully enrolls for use cases and share the availability time.
            </p>
            </div>
            <hr>
            <div class="text-center">
                <div class="row">
                    <div v-for="(info, index) in proDetails" :key="index" :class="getClasses(index)">
                    <h5>{{info.title}}
                        <br>
                        <small>{{info.subTitle}}</small>
                    </h5>
                    </div>
                </div>
            </div>
            <button class="btn btn-block" style="background: #ff8d1a">Select Plan</button>
        </card>
    </div>
</div>
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
      basicDetails: [
        {
          title: "1",
          subTitle: "Use Case"
        },
        // {
        //   title: "2GB",
        //   subTitle: "Used"
        // },
        {
          title: "₹300",
          subTitle: "Fee"
        }
      ],
      interMedDetails: [
        {
          title: "5",
          subTitle: "Use Cases"
        },
        // {
        //   title: "2GB",
        //   subTitle: "Used"
        // },
        {
          title: "₹1,200",
          subTitle: "Fee"
        }
      ],
      proDetails: [
        {
          title: "10",
          subTitle: "Use Cases"
        },
        // {
        //   title: "2GB",
        //   subTitle: "Used"
        // },
        {
          title: "₹2,000",
          subTitle: "Fee"
        }
      ]
    };
  },
  // mounted: function() {
  //     this.getProfile();
  // },
  methods: {
    // getProfile() {
    //   var userToken = localStorage.getItem('authUseToken');
    //     axios({
    //       method: "GET",
    //       url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/posts/getUserProfile',
    //       headers:{authorization : userToken},
    //     }).then(response => {
    //       this.user.name = response.data.fullName;
    //       this.user.email = response.data.email;
    //       console.log(userToken,this.user.name, response);
    //     });
    //   // alert("Your data: " + JSON.stringify(this.user));
    // },
    getClasses(index) {
      var remainder = index % 3;
      // console.log(remainder);
      if (remainder === 0) {
        return "col-lg-6";
      } else if (remainder === 1) {
        return "col-lg-6";
      } else {
        return "col-lg-3";
      }
    }
  }
};
</script>
<style>
</style>
