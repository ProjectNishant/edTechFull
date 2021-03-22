<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-white">
    <div class="container-fluid">
      <div class="logo">
        <a href="data-stats.com" class="simple-text">
            <div class="logo-img">
              <img src="https://www.data-stats.com/wp-content/uploads/2020/06/cropped-DS-3-1.png" alt="">
            </div>
        </a>
      </div>
      

      <form :onsubmit="autoSearch(firstSearch, fullDataSearch)" class="ml-auto mr-auto">
        <input class="form-control w-20 mt-4 ml-1" style=" border: 2px solid;"  id="myInput" name="search" placeholder="Search.." v-on:keyup="mySearch" type="search" onfocus="this.placeholder = 'Search'" onblur="this.placeholder = 'Search'">
        <br>
        <div class="card position-absolute">
          <ul id="myUL" style="display: none; background-color: powderblue; z-index:55;">
            <li  v-for="useCase in fullDataSearch" :key="useCase._id" style=" list-style-position:inside; border: none; padding: 3px;">
              <a v-on:click="searchDiv(useCase)" class="dropdown-item" style="cursor:pointer;">{{useCase.useCaseName}}</a>
            </li>
          </ul>
        </div>
      </form>

      <!-- <a class="navbar-brand ml-2" href="#">{{routeName}}</a> -->
      
      <div class=" navbar-collapse">
        <ul class="ml-auto">
          <!-- <div class="row"> -->

            <!-- <button class="navbar-toggler navbar-burgern col-2 ml-auto mr-auto"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-bar"></span>
              <span class="navbar-toggler-bar"></span>
              <span class="navbar-toggler-bar"></span>
            </button> -->

          <!-- </div>   -->
          <div class="row  mr-1">
            <li class="pt-3">
              <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel"/>
            </li>
            <li class="pt-3">
              <sidebar-link to="/Plans" name="Premium" icon="ti-shield"/>
            </li>

            <drop-down class="pt-3 nav-item"
                      title="Use Cases"
                      title-classes="nav-link"
                      icon="ti-bell"
                       style="color: #000">
              <a class="dropdown-item">
                <sidebar-link to="/MacLearn" name="Machine Learning" icon="ti-shield"/>
              </a>
              <a class="dropdown-item" href="#">
                <sidebar-link to="/BigData" name="Big Data" icon="ti-shield"/>
              </a>
              <a class="dropdown-item" href="#">Cat 3</a>
              <a class="dropdown-item" href="#">Cat 4</a>
              <a class="dropdown-item" style="background-color: rgb(247, 226, 226);">
                <sidebar-link to="/myUseCase" name="My Use Cases" icon="ti-shield"/>
              </a>
            </drop-down>
  
            <li v-if="userCheck">
              <sidebar-link to="/Profile" :name="userName" icon="ti-user"/>
            </li>
            <li v-else-if="!userCheck" class="ml-auto mr-auto">
              <button class="col-5 ml-auto mr-1 btn btn-success"  v-b-modal.modalSignIn>Login</button>
              <button class="col-6 mr-auto btn" style="background-color: #ff8d1a" v-b-modal.modalSignUp>Register</button>
            </li>
          </div>
          <!-- <div class="row"> -->
              
          <!-- </div> -->
          <!-- <input type="text" > -->
          <!-- <form-input size="bg" class="mr-sm-2" placeholder="Search"></form-input>
          <button size="sm" class="my-2 my-sm-0" type="submit">Search</button> -->
         
          <!-- <drop-down class="nav-item"
                     title="5 Notifications"
                     title-classes="nav-link"
                     icon="ti-bell">
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </drop-down> -->
          
        </ul>
      </div>
    </div>
  </nav>

  <a class="navbar-brand ml-5 mt-2" href="#">{{routeName}}</a>

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
                      <b-button class="mt-3 black-background white" block :disabled="show" v-on:click="loginFun">Login</b-button>
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
                    <b-button class="mt-3 black-background white" block :disabled="show" v-on:click="regFun">Register</b-button>
                </b-card>
                </b-overlay>
            </b-modal>

  <!-- <div class="form-login ml-3" id="formLogin">
    <button class="btn btn-danger ml-2 mt-2 mb-auto float-right"  v-on:click="closeForm">Close</button>
    
  </div>
  <div class="form-login ml-3" id="formSignUp">
    <button class="btn btn-danger ml-2 mt-2 mb-auto float-right"  v-on:click="closeForm">Close</button>
    
  </div> -->

  <!-- <div>
    <ul id="myUL" style="display: none; background-color: powderblue;">
      <li  v-for="useCase in fullDataSearch" :key="useCase._id" style=" list-style-position:inside; border: 1px solid black; padding: 3px;">
        <a v-on:click="searchDiv(useCase)" style="cursor:pointer;">{{useCase.useCaseName}}</a>
      </li>
    </ul>
  </div> -->

  <div id="useCaseSrch" style="display:none; position: relative;"  class=" ml-3">
        <div class="row">
          <div class="card position-relative ml-3 shadow-lg bg-white programCard" >
              <div class="cardImage" style="text-align: center;">
                <img class="card-img-top" v-if="searchUseCase.url"  :src="searchUseCase.url" alt="Card Image">
                <img class="card-img-top" v-else-if="!searchUseCase.url"  src="https://i.stack.imgur.com/jRLAt.png" alt="Card Image">
                <h3 class="centered" style="background: rgba(0, 0, 0, 0.5); border-radius: 10px;"><b>{{searchUseCase.useCaseName}}</b></h3>

                <div class=" rwGvJ" v-if="searchUseCase.price"><div class="hICYdA"></div>
                  <div class="BatchCard__BatchTag-sc-1iui1jg-4 jigtzU">
                      <span class="BatchCard__BatchTextTag-sc-1iui1jg-5 bcilPk">₹{{searchUseCase.price}}</span>
                  </div>
                </div>
                <div class=" rwGvJ" v-if="!(searchUseCase.price)"><div class="hICYdA"></div>
                  <div class="BatchCard__BatchTag-sc-1iui1jg-4 jigtzU">
                      <span class="BatchCard__BatchTextTag-sc-1iui1jg-5 bcilPk">FREE</span>
                  </div>
                </div>
              </div>
              <!-- <span class="lable-badge orange-lable-badge">Price: {{searchUseCase.price}}</span> -->
              <div class="card decsCard ">
                <p class="pl-2">Summary:</p>
                  <p class="position-absolute text-dark ">
                  
                            <h6 class="row pl-2">
                          <span class="pr-2 pt-2"> {{searchUseCase.summary}} </span>

                          <!-- <span class="badge badge text-white col-2" style="background-color:#ff6400;"
                          >New</span> -->
                          </h6>
                      <!-- <p class="row pl-4 pt-1" v-if="useCase.price">
                        <strong>{{useCase.price}}</strong>
                      </p> -->
                      <!-- <p class="row pl-4 pt-1" v-else>
                        <strong>Price </strong>
                      </p> -->
                  
                      <!-- <div class="row pl-4 text-secondary">
                          <i class="fa fa-hourglass-o pt-1" aria-hidden="true"></i>
                        <span class="pl-3"> {{getTimeDuration(useCase.createdAt,useCase.updatedAt)}}</span> <span class="pl-3 ">.Online</span>
                      </div> -->

                        
                      <div  orientation="vertical" class="ml-3 mb-3 pt-2">
                        <div class="row">
                          <span type="hollow" class=" dHfCyZ1 ml-1" v-on:click="openForm(searchUseCase.screenshots)"><i class="fa fa-photo"></i> Screenshots</span>
                          <span type="hollow" class=" dHfCyZ" v-on:click="openPreview(searchUseCase.videoUrl)"><i class="fa fa-play-circle"></i> Preview</span>
                          </div>
                      </div>
                      <div class="row pl-4 pb-3" >
                          <p class="text-secondary" >
                          <i class="fa fa-calendar-check-o "></i>    
                                    <span class="pl-3 pt-1">  Created At: {{searchUseCase.createdAt}}</span> 
                          </p>
                                    <!-- <p class="pl-1 text-primary    font-weight-bold" >{{getDate(useCase.startDate)}}</p> -->
                      </div>  
                  
              </div>
              <!-- <h3 class="card-title">
                  <b>{{searchUseCase.summary}}</b>
              </h3>
              <div class="card-body events-schedule">
                  <div class="card-date-status">
                      <span>Learn Topics</span>
                  </div>
                  <div class="card-timer">
                      {{searchUseCase.learnTopics}}
                  </div>
              </div>
              <div class="aboutTime">
                  <p>Created At: {{searchUseCase.createdAt}}<b></b></p>
                  <p>Updated At: {{searchUseCase.updatedAt}}<b></b></p>
                  <p>Version: {{searchUseCase.versions}}<b></b></p>
              </div> -->
              <div class="card-footer">
                <p>
                  
                    Ratings: {{searchUseCase.rating}}<b></b>
                  
                </p>
                
              </div>
              <div class="card-body pt-5">
                  <p class=" row card-text pl-3 pt-5 pr-3 text-secondary" >Category: {{searchUseCase.category}}</p>
                  <p class=" row card-text pl-3 pr-3 text-secondary" >Versions: {{searchUseCase.versions}}</p>
                  <div class="">
                    <p class="row card-text pl-3 pr-3 text-secondary">Rating: 
                      <i class="fa fa-star pt-1 pl-2" style="color:gold;" v-for="index in searchUseCase.rating" :key="index"></i>
                    </p>
                  </div>
                  <div class="float-left pt-2">
                            <img   src="https://www.data-stats.com/wp-content/uploads/2020/06/cropped-DS-3-1.png" height="60px" width="90px" alt="Card image cap">
                      
                  </div>
                  
                  <div class="float-right pt-5 pb-2" v-if="searchUseCase.price">
                    <span type="hollow" class=" dHfCy3" v-on:click="gotoData(searchUseCase._id, searchUseCase.redirectLink, searchUseCase.price)">Enroll <i class="fa fa-sign-in"></i></span>
                  </div>
                  <div class="float-right pt-5 pb-2" v-if="!(searchUseCase.price)">
                    <span type="hollow" class=" dHfCy3" >View <i class="fa fa-sign-in"></i></span>
                  </div>

              </div>
              <!-- <div class="card-overlay">
                <div class="card-overlay-text">
                  <p class="contest-info-short">
                    {{searchUseCase.description}}
                  </p>
                  <div class="user-action-point">
                    <span>Purchased: <i class="fa fa-users"></i> {{searchUseCase.purchased}}  </span>
                  </div>
                  <div class="text-center w-100">
                    <button class="btn av-btn-white mt-5 px-5 text-uppercase"  v-on:click="openVideoPreview(searchUseCase.videoUrl)"><i class="fa fa-play-circle" aria-hidden="true"></i> preview</button>
                  </div>
                  <div class="text-center w-100">
                    <button class="btn av-btn-white mt-3 px-5 text-uppercase"  v-on:click="openScrnshot(searchUseCase.screenshots)">screenshots</button>
                  </div>
                  <div class="text-center w-100">
                    <button class="btn av-btn-white mt-3 px-5 text-uppercase"  v-on:click="gotoData2()">Buy for ₹{{searchUseCase.price}}</button>
                  </div>
                </div>
              </div> -->
          </div>     
      </div>

      <div class="form-popup ml-3" id="myForm3">
      <button class="btn btn-danger ml-2 mt-2 mb-auto float-right"  v-on:click="closeForm">Close</button>
      <div class="row ml-1 mb-auto">
        <div class="card col-lg-3 ml-2"  v-for="imgData in info" :key="imgData._id">
              <img :src="imgData.path" width="100%" height="auto" v-on:click="openImg(imgData.path)">
        </div>
      </div>
    </div>

    <div id="myModal3" class="modal">
      <span class="close mr-5" style="cursor:pointer; color: red;" v-on:click="closeImg">&times;</span>
      <img class="modal-content" id="img01">
    </div>

    <div class="form-popup ml-2" id="myVideo3">
        <button class="btn btn-danger mb-auto float-right"  v-on:click="closePreview">Close</button>
        <div class="row">
            <iframe width="560" height="315" :src="videoData" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
  </div>
  
</div>

</template>
<script>
const axios = require('axios').default;
import NewProfile from "@/pages/UserProfile/newUser.vue";
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    
  },
  components:{
    NewProfile,
  },
  data() {
    return {
      activeNotifications: false,
      fullDataSearch: [],
      infoScrnshot: [],
      searchUseCase:[],
      videoData2: [],
      userName: "",
      show: false,
      info: [],
      videoData: [],
      userCheck: false,
      searchValue: null,
      firstSearch: "",
      tentiveSearchDataValues:null,
      searchResultData:null,
      isSearchBarIsBlank:false,
    };
  },
  mounted () {
      this.getData();
      // console.log(this.fullDataSearch);
  },
  methods: {
    getData(){
      axios
      .get('https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/usecase')
      .then(response => (this.fullDataSearch=response.data))
      console.log(this.fullDataSearch);
      var userToken = localStorage.getItem('authUseToken');
      if(userToken == null || userToken == undefined){
        this.userCheck = false;
        this.userName = "Login-Reg";
      }else if(userToken != null && userToken != undefined && userToken != 0){
        axios({
          method: "GET",
          url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/posts/getUserProfile',
          headers:{authorization : userToken},
        }).then(response => {
          this.userCheck = true;
          this.userName = response.data.fullName;
        });
      }
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    mySearch : function() { 
      // console.log(this.fullDataSearch);
      this.isSearchBarIsBlank = true;
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      ul = document.getElementById("myUL");
      ul.setAttribute('style', 'display: block; list-style-type: none;');
      li = ul.getElementsByTagName("li");

      for (i = 0; i < li.length; i++) {
          a = li[i].getElementsByTagName("a")[0];
          txtValue = a.textContent || a.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            this.firstSearch = li[0];
              li[i].style.display = "";
          } else {
              li[i].style.display = "none";
          }
      }
      if(input.value == ''){
        ul.setAttribute('style', 'display: none');
      }
    },
    searchDiv: function(searchData){
      this.searchUseCase = searchData;
      document.getElementById('useCaseSrch').style.display = "block";
      document.getElementById("myInput").value = this.searchUseCase.useCaseName;
      document.getElementById("myUL").style.display = 'none';
    },
    autoSearch: function(name, data){
      console.log(name);
      for(var useCase in this.fullDataSearch ){
        if(useCase.useCaseName == name){
          this.searchDiv(this.useCase);
        }
      }
    },

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

    openForm : function(screenshotData) { 
          this.info = screenshotData;
        return document.getElementById("myForm3").style.display = "flex";
        },
        closeForm : function() { 
        return document.getElementById("myForm3").style.display = "none";
        },
        openImg : function(path) { 
        var modal = document.getElementById("myModal3");
        var modalImg = document.getElementById("img01");
          // window.open(path,"_self");
          modal.style.display = "block";
          modalImg.src = path;
          var span = document.getElementsByClassName("close")[0];

          span.onclick = function() { 
            modal.style.display = "none";
          }
        },
        closeImg : function(){
          document.getElementById("myModal3").style.display = 'none';
        },

        openPreview : function(vidData) { 
          this.videoData = vidData;
        return document.getElementById("myVideo3").style.display = "block";
        },
        closePreview : function() { 
        return document.getElementById("myVideo3").style.display = "none";
        },

        gotoData : function(useId, link, usePrice) { 
          if(usePrice){
            localStorage.setItem('usId', useId);
            localStorage.setItem('usePrc', usePrice);
            this.makePayment(useId);
              // Vue.config.productionTip = false
              //   Vue.use(BootstrapVue);
              //   new Vue({
              //     router,
                  
              //     render: h => h(Payment),

              //   }).$mount('#useCase')
          }else if(!usePrice || usePrice == null){
            // window.open(link);
              Vue.config.productionTip = false
                Vue.use(BootstrapVue);
                new Vue({
                  router,
                  
                  render: h => h(link),

                }).$mount('#freeUseCase')
          }
        },
    mySearchAutoComplete(){
            console.log("mysearch")
            const axios=require('axios');
            axios.get('https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/course/autocomplete?search='+this.searchValue).then(
                resData=>{
                    if(resData.status == 200){
                        this.tentiveSearchDataValues = resData.data.label;
                        if(this.searchValue == ''){
                            this.tentiveSearchDataValues=null;
                            this.isSearchBarIsBlank=true
                        }
                        else{
                            this.isSearchBarIsBlank=false
                        }

                    }
                }
            )
        },
            completeSearch(){
                console.log("namna")
                this.$router.push('/find/'+this.searchValue)
                
            },

            assignValueInSearchBar(tentiveSearchDataValue){
                console.log("naman")
                this.searchValue = tentiveSearchDataValue;
                this.isSearchBarIsBlank=true;
                this.completeSearch();
            },
  }
};
</script>

<style scoped>
.search-box{
/* position: absolute; */
border: 0px;

transform: translate(6%,-6%);
}
ul {
    list-style-type: none;
}
    .search-box input{
        height: 50px;
        /* width: 500px; */
        /* padding: 0px 45px; */
        border-radius: 50px;
        border: 0px;
    }

   .search-box input:focus{
        outline: none;
    }
    .form-control{
        /* padding-left: 10px; */
    }
   
    .search-box:before{
    content: "\F002";
    font-family: 'FontAwesome';
    position: absolute;
    /* left: 12px;
    line-height: 50px; */
    color: #ff6400;
    font-size: 25px;

    }

    .registerBtn{
        background-color: #ff6400;
    }

    ul li button.registerBtn :hover{
        background-color: #ff00;
    }

   /* nav>ul>li>a.nav-link :hover{
        background-color: #ff6400;
    } */
     .navbar-light .navbar-nav .nav-link:hover {
    color: #ff6400;
    }

    .navbar-light .navbar-nav .nav-link .registerBtn:hover{
                background-color: #ff5900;

    }

.loginDiv{
  display: none;
}
.black-background {background-color:#ff8d1a;}
.white {color:#ffffff;}

.signup {
  margin-bottom: 150px; }

.signup-content {
  background-color: #fff;
  border-radius: 20px;
  padding: 75px 0; }

.signup-form, .signup-image, .signin-form, .signin-image {
  width: 100%;
  overflow: hidden; }

.signup-image {
  margin: 0 55px; }

.form-title {
  margin-bottom: 33px; }

.signup-image {
  margin-top: 45px; }
.form-title {
  margin-bottom: 33px; }
.register-form {
  width: 100%; }
/* .zmdi-email-open:before {
  content: '\f159';
}
.zmdi-email:before {
  content: '\f15a';
} */
.slider_text {
  padding: 180px 0;
}
@media (min-width: 992px) and (max-width: 1200px) {
  .slider_text {
    padding: 130px 0;
  }
}
@media (max-width: 767px) { 
  .slider_text {
    padding: 130px 0;
  }
}

.label-agree-term {
  position: relative;
  top: 0%;
  transform: translateY(0);
  -moz-transform: translateY(0);
  -webkit-transform: translateY(0);
  -o-transform: translateY(0);
  -ms-transform: translateY(0); 
  }
.zmdi-lock-open:before {
  content: '\f18f';
}
.zmdi-lock-outline:before {
  content: '\f190';
}
.zmdi-lock:before {
  content: '\f191';
}

.form-popup {
  display: none;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.9);
  position: fixed;
  border-radius: 30px;
  /* bottom: 0; */
  top: 15%;
  bottom: 15%;
  left: 5%;
  right: 5%;
  flex-wrap: wrap;
  width: 90%;
  border: 3px solid #f1f1f1;
  z-index: 1;
}
.form-container {
  max-width: 100%;
  padding: 10px;
  background-color: white;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 5px;
  margin-top: 10%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.9);
}

.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
}
.container {
  position: relative;
  text-align: center;
  color: #fff;
  /* width: 100%; */
}

.centered {
  position: absolute;
  font-size: 20px;
  top: 10%;
  color: #fff;
  left: 50%;
  font-family:'Zapfino', 'Savoye LET', Times, serif; 
  font-style: normal; 
  transform: translate(-50%, -50%);
}
 .decription{
        padding-top:55px;
         font-size: 14px; 
         /* color: black; */
       }

       .bedge{
        border-radius: 2px;
         font-size: 65%;
        line-height: 15px;
       }

        .programCard{
            height:auto;
            width: 320px;
            border-radius: 10px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

        }

        .card-img-top{
            height: 160px;
             width: 100%;
             opacity: 0.8;
             border-radius: 10px;
        }

        .decsCard{
            box-shadow: 0px 4px 16px rgba(189, 189, 189, 0.24);
            border-radius:10px;
            margin-left: 8px;
            justify-content: center;
            position: absolute;
            top:110px;
            height:auto;
            width: 95%;
        }
        p {
            margin-bottom: 0rem;
            padding: 0;
            margin: 0;
        }


.eCykC {
    opacity: 1;
    display: flex;
    grid-column: span 6 / auto;
    transition: opacity 1000ms ease-in 0s, transform 400ms ease-in 0s !important;
}

.ghWIBu {
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(221, 230, 237, 0.4) 0px 16px 32px 0px;
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    grid-column: span 6 / auto;
    transition: box-shadow 0.2s ease-in-out 0s;
    flex: 1 1 0%;
}
.exwfAE {
    line-height: 150%;
    font-size: 12px;
    font-weight: normal;
}
.fWVYTt {
    display: flex;
    flex-direction: column;
    -webkit-box-pack: justify;
    justify-content: space-between;
    background-color: rgb(255, 255, 255);
    text-align: left;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    height: 152px;
    padding: 16px;
}
.iaXrsE {
    width: 272px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 0px;
}
.kVtcyG {
    height: 100%;
    width: 100%;
    transform: scale(1.02);
    background-color: rgb(221, 230, 237);
}
.cyQJxg {
    position: absolute;
    right: 16px;
    top: 16px;
    display: flex;
    border-radius: 8px;
}
.kqPmni {
    width: 0px;
    height: 32px;
    background-color: rgb(255, 255, 255);
    margin-right: -7px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    color: rgb(60, 72, 82);
    font-weight: 600;
    line-height: 32px;
    white-space: nowrap;
    padding: 0px;
    transition: width 300ms ease-out 0s, padding 300ms ease-out 0s;
    overflow: hidden;
}
.jpJaLS {
    box-shadow: none;
}
.rwGvJ {
    position: absolute;
    display: flex;
    flex-direction: column;
    left: -6px;
    top: 16px;
    height: 25px;
}
.hICYdA {
    width: 0px;
    height: 0px;
    left: 10px;
    bottom: 38px;
    border-left: 6px solid transparent;
    border-bottom: 3px solid rgb(60, 72, 82);
}
.jigtzU {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    height: 22px;
    background-color: rgb(252, 168, 58);
    border-radius: 0px 4px 4px;
    padding: 0px 12px 0px 16px;
}
.bcilPk {
    font-size: 15px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    line-height: 100%;
}
.fWVYTt {
    display: flex;
    flex-direction: column;
    -webkit-box-pack: justify;
    justify-content: space-between;
    background-color: rgb(255, 255, 255);
    text-align: left;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    height: 152px;
    padding: 16px;
}
.dHfCyZ1 {
    background-color: rgb(73, 168, 240);
    color: #fff;
    font-size: 13px;
    font-weight: bold;
    display: inline-block;
    text-transform: uppercase;
    line-height: 1;
    width: fit-content;
    margin-right: 8px;
    padding: 6px;
    border-radius: 4px;
    transition: all 300ms ease 0s;
    cursor: pointer;
}
.dHfCyZ {
    background-color: rgb(6, 201, 104);
    color: #fff;
    font-size: 13px;
    font-weight: bold;
    display: inline-block;
    text-transform: uppercase;
    line-height: 1;
    width: fit-content;
    margin-right: 8px;
    padding: 6px;
    border-radius: 4px;
    transition: all 300ms ease 0s;
    cursor: pointer;
}
.dHfCy3 {
    background-color: rgb(250, 151, 59);
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    display: inline-block;
    /* text-transform: uppercase; */
    line-height: 1;
    width: fit-content;
    margin-right: 8px;
    padding: 6px;
    border-radius: 4px;
    transition: all 300ms ease 0s;
    cursor: pointer;
}
.exwfAE {
    line-height: 150%;
    font-size: 12px;
    color: orange;
    font-weight: normal;
}
.dumfX2 {
    font-weight: normal;
    font-size: 10px;
    line-height: 100%;
    color: rgb(128, 128, 128);
    padding-top: 4px;
    padding-bottom: 2px;
    margin: 0px;
}
.dumfXl {
    font-weight: normal;
    font-size: 12px;
    line-height: 150%;
    color: rgb(250, 192, 85);
    padding-top: 2px;
    padding-bottom: 4px;
    margin: 0px;
}

</style>