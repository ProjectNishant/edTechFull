<template>
  <card class="card" title="Edit Profile">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      label="Company"
                      placeholder="Paper dashboard"
                      v-model="user.company">
            </fg-input>
          </div>
          <div class="col-md-3">

            <fg-input type="text"
                      label="Phone No."
                      placeholder="Phone No."
                      v-model="user.phone">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="email"
                      :disabled="true"
                      label="UserEmail"
                      placeholder="Email"
                      v-model="user.email">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <fg-input type="text"
                      label="Full Name"
                      placeholder="Full Name"
                      v-model="user.firstName">
            </fg-input>
          </div>
          <!-- <div class="col-md-6">
            <fg-input type="text"
                      label="Last Name"
                      placeholder="Last Name"
                      v-model="user.lastName">
            </fg-input>
          </div> -->
        </div>

        <div class="row">
          <div class="col-md-12">
            <fg-input type="text"
                      label="Address"
                      placeholder="Home Address"
                      v-model="user.address">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <!-- <div class="col-md-4">
            <fg-input type="text"
                      label="City"
                      placeholder="City"
                      v-model="user.city">
            </fg-input>
          </div> -->
          <div class="col-md-4">
            <fg-input type="text"
                      label="Country"
                      placeholder="Country"
                      v-model="user.country">
            </fg-input>
          </div>
          <!-- <div class="col-md-4">
            <fg-input type="number"
                      label="Postal Code"
                      placeholder="ZIP Code"
                      v-model="user.postalCode">
            </fg-input>
          </div> -->
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>About Me</label>
              <textarea rows="5" class="form-control border-input"
                        placeholder="Here can be your description"
                        v-model="user.aboutMe">

              </textarea>
            </div>
          </div>
        </div>
        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="updateProfile">
            Update Profile
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
const axios = require('axios').default;
export default {
  data() {
    return {
      user: {
        company: "Data Stats",
        phone: "0000000000",
        email: "",
        firstName: "Your Name",
        // lastName: "Name",
        address: "Melbourne, Australia",
        country: "Melbourne",
        // postalCode: "",
        aboutMe: `Something about yourself`
      }
    };
  },
  mounted: function() {
      this.fetchProfile();
  },
  methods: {
    fetchProfile() {
      var userToken = localStorage.getItem('authUseToken');
        axios({
          method: "GET",
          url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/posts/getUserProfile',
          headers:{authorization : userToken},
        }).then(response => {
          console.log(userToken, response.data);
          this.user.address = response.data.address;
          this.user.country = response.data.country;
          this.user.phone = response.data.mobNo
          this.user.firstName = response.data.fullName;
          this.user.email = response.data.email;
        });
      // alert("Your data: " + JSON.stringify(this.user));
    },
    updateProfile() {
      
      var userToken = localStorage.getItem('authUseToken');
      axios({
        method: "POST",
        url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/posts/userProfileUpdate',
        headers:{authorization : userToken},
        body :
        {
        mobNo:this.user.phone,                                        
        country:this.user.country,
        address:this.user.address,                     
        aboutMe:this.user.aboutMe,
         college:this.user.company
        }
      });
      // alert("Your data: " + JSON.stringify(this.user));
    }
  }
};
</script>
<style>
</style>
