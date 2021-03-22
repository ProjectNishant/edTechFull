<template>
<div class="pb-5">
<div class="">
    <div class="row">
        
      <div>
        <div class=" row  pt-3">
          <div class="col-md-3 ml-5 mt-2" v-for="useCase in fullData.slice().reverse()" :key="useCase._id">
              <a  data-toggle="tooltip" class="tTip"  :title="useCase.description">
    <div class="card position-relative shadow-lg bg-white programCard">
        
        <div class="cardImage" style="text-align: center;">
          <img class="card-img-top" v-if="useCase.url"  :src="useCase.url" alt="Card Image">
          <img class="card-img-top" v-else-if="!useCase.url"  src="https://i.stack.imgur.com/jRLAt.png" alt="Card Image">
          <h3 class="centered" style="background: rgba(0, 0, 0, 0.5); border-radius: 10px;"><b>{{useCase.useCaseName}}</b></h3>

          <div class=" rwGvJ" v-if="useCase.price"><div class="hICYdA"></div>
            <div class="BatchCard__BatchTag-sc-1iui1jg-4 jigtzU">
                <span class="BatchCard__BatchTextTag-sc-1iui1jg-5 bcilPk">₹{{useCase.price}}</span>
            </div>
          </div>
          <div class=" rwGvJ" v-if="!(useCase.price)"><div class="hICYdA"></div>
            <div class="BatchCard__BatchTag-sc-1iui1jg-4 jigtzU">
                <span class="BatchCard__BatchTextTag-sc-1iui1jg-5 bcilPk">FREE</span>
            </div>
          </div>
        </div>
        

        <div class="card decsCard ">
          <p class="pl-2">Summary:</p>
            <p class="position-absolute text-dark ">
             
                       <h6 class="row pl-2">
                    <span class="pr-2 pt-2"> {{useCase.summary}} </span>

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
                    <span type="hollow" class=" dHfCyZ1 ml-1" v-on:click="openForm(useCase.screenshots)"><i class="fa fa-photo"></i> Screenshots</span>
                    <span type="hollow" class=" dHfCyZ" v-on:click="openPreview(useCase.videoUrl)"><i class="fa fa-play-circle"></i> Preview</span>
                    </div>
                </div>
                <div class="row pl-4 pb-3" >
                    <p class="text-secondary" >
                    <i class="fa fa-calendar-check-o "></i>    
                              <span class="pl-3 pt-1">  Created At: {{useCase.createdAt.slice(0, 10)}}</span> 
                    </p>
                              <!-- <p class="pl-1 text-primary    font-weight-bold" >{{getDate(useCase.startDate)}}</p> -->
                </div>  
            
        </div>

        <div class="card-body pt-5">
          <p class=" row card-text pl-3 pt-5 pr-3 text-secondary" >Category: {{useCase.category}}</p>
          <p class=" row card-text pl-3 pr-3 text-secondary" >Versions: {{useCase.versions}}</p>
          <div class="">
            <p class="row card-text pl-3 pr-3 text-secondary">Rating: 
              <i class="fa fa-star pt-1 pl-2" style="color:gold;" v-for="index in useCase.rating" :key="index"></i>
            </p>
          </div>
          <div class="float-left pt-2">
                    <img   src="https://www.data-stats.com/wp-content/uploads/2020/06/cropped-DS-3-1.png" height="60px" width="90px" alt="Card image cap">
              
          </div>
          
          <div class="float-right pt-5 pb-2">
            <span type="hollow" class=" dHfCy3" v-on:click="gotoData(useCase._id, useCase.isPaid, useCase.redirectLink, useCase.price)">Enroll <i class="fa fa-sign-in"></i></span>
          </div>

          </div>
        </div>
        </a>
        </div>
      </div>
      </div>

  </div>
  </div>
    <div class="form-popup ml-3" id="myForm">
      <button class="btn btn-danger ml-2 mt-2 mb-auto float-right"  v-on:click="closeForm">Close</button>
      <div class="row ml-1 mb-auto">
        <div class="card col-lg-3 ml-2"  v-for="imgData in info" :key="imgData._id">
              <img :src="imgData.path" width="100%" height="auto" v-on:click="openImg(imgData.path)">
        </div>
      </div>
    </div>

    <div id="myModal" class="modal">
      <span class="close mr-5" style="cursor:pointer; color: red;" v-on:click="closeImg">&times;</span>
      <img class="modal-content" id="img01">
    </div>

    <div class="form-popup ml-2" id="myVideo">
        <button class="btn btn-danger mb-auto float-right"  v-on:click="closePreview">Close</button>
        <div class="row">
            <iframe width="560" height="315" :src="videoData" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import Razorpay from 'razorpay'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from '@/./././router'

const axios = require('axios').default;
    export default {
        name: 'Card',
        data() {
            return {
                fullData: [],
                info: [],
                videoData: [],
                order_id: '',
            }
        },
        mounted () {
            axios
            .get('https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/usecase/getCategory/Big Data')
            .then(response => (this.fullData=response.data))
            
        },
        // router:{
        //   path: '/pay-paytm',
        //   component: Vue.component('payPaytm', require('@/./components/frontend/usecase/Redirect.vue')),
        //   name: 'payPaytm',
        //   props: true
        // },
        methods: { 
          // loadCards: function(){
            
          // },
          // chk: function (iD){
          //   axios({
          //       method: 'POST',
          //       url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/pay/generateOrderId/useCaseId',
          //       data: { iD },
          //       validateStatus: () => true
          //   }).then(res => {
          //       console.log(res);
          //   });
          // },

        openForm : function(screenshotData) { 
          this.info = screenshotData;
        return document.getElementById("myForm").style.display = "flex";
        },
        closeForm : function() { 
        return document.getElementById("myForm").style.display = "none";
        },
        openImg : function(path) { 
        var modal = document.getElementById("myModal");
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
          document.getElementById("myModal").style.display = 'none';
        },

        openPreview : function(vidData) { 
          this.videoData = vidData;
        return document.getElementById("myVideo").style.display = "block";
        },
        closePreview : function() { 
        return document.getElementById("myVideo").style.display = "none";
        },

        gotoData : function(useId, ispaid, link, usePrice) { 
          if(ispaid == true){
            localStorage.setItem('usId', useId);
            localStorage.setItem('usePrc', usePrice);
            this.makePayment(useId);
              // Vue.config.productionTip = false
              //   Vue.use(BootstrapVue);
              //   new Vue({
              //     router,
                  
              //     render: h => h(Payment),

              //   }).$mount('#useCase')
          }else if(ispaid == false){
            // window.open(link);
              Vue.config.productionTip = false
                Vue.use(BootstrapVue);
                new Vue({
                  router,
                  
                  render: h => h(link),

                })
          }
        },

        //Function to create order ID
    makePayment: function(useCsId) {
      // ev.preventDefault();
      var razorOrderId = null;
      var razorPaymentId=null;
      var razorSignature=null;
      // localStorage.setItem('authUseToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYzODY2YmEwNjY2ODAxOTE5ZDYyYTciLCJpYXQiOjE1OTUxNjY1Njh9.P9MaT6vWPksMi582TntZzpJDRgLNK5UkVLlzdm_tHwU');
      var userToken = localStorage.getItem('authUseToken');
      if(!userToken){
        alert("You have to login first!!!")
      }else if(userToken){
          var data = {};
            (data["name"] = "Nishant"),
            (data["desc"] = "Check Out"),
            (data["amount"] = 500),
            axios({
              method: "GET",
              url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/pay/generateOrderId/'+useCsId,
              headers:{authorization:userToken}
            })
              .then(res => {
                this.order_id = res.data.id;
                //Initiation of Razorpay PG
                var rzp1 = new window.Razorpay({
                  key_id: 'rzp_test_vhsfxnSM8g4PUf',
                  key_secret: '9dQE8o5zOK1gJYScj0U2kJrE',
                  amount: "500",
                  name: "Data Stats",
                  currency: "INR",
                  description: "Check Out for your Use Case Model.",
                  image: "https://www.data-stats.com/wp-content/uploads/2020/06/cropped-DS-3-1.png",
                  //Uncomment if you are using handler function
                  "handler": function (response){
                    razorOrderId = response.razorpay_order_id
                    razorPaymentId = response.razorpay_payment_id
                    razorSignature = response.razorpay_signature
                    alert(response.razorpay_payment_id);
                    // axios({
                    //   method: "POST",
                    //   url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/pay/addPaymentDetailsForCourse/'+useCsId,
                    //   headers:{authorization:userToken},
                    //   body :
                    //   {
                    //   razorOrderId:response.razorpay_order_id,
                    //   razorPaymentId:response.razorpay_payment_id,
                    //   razorSignature:response.razorpay_signature

                    //   }
                    // }).then(resDa=>{
                    //   console.log(resDa)
                    // });
                    axios.post(
                      'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/pay/addPaymentDetailsForCourse/'+useCsId,
                          {razorOrderId:razorOrderId,razorPaymentId:razorPaymentId,razorSignature:razorSignature},
                          {headers:{
                            Authorization:userToken
                            }
                          }
                      ).then(res=>
                        {
                          console.log(res)
                        });
                  
                    // axios({
                    //   method: "POST",
                    //   url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/posts/enrollUseCase/',
                    //   headers :{useCsId, userToken}
                    // })
                    // localStorage.setItem('1st',response.razorpay_payment_id);
                    // localStorage.setItem('2nd',response.razorpay_order_id);
                    // localStorage.setItem('3rd',response.razorpay_signature);
                  },
                  // callback_url: 'http://13.126.183.214/razorpay/checkstatus/?orderid='+this.order_id,
                  prefill: {
                    name: "Nishant Sharma",
                    email: "rjnishant49@gmail.com"
                  },
                  notes: {
                    address: "Kala kuan, Alwar"
                  },
                  theme: {
                    color: "#00ffff"
                  },
                  order_id: res.data.id,
                  // callback_url: "http://localhost:8081/",
                  // redirect: true
                });
                            
                rzp1.open();
              })
              .catch(err => {
                console.log("ERR", err);
              });
          }
    },
    // if you are using handler function
    verify: function(response) {
      console.log(localStorage.getItem('1st'), localStorage.getItem('2nd'), localStorage.getItem('3nd'));
    },
    // getTimeDuration(starting,ending){
    //             var startDate=starting[0]+starting[1];
    //             var endDate=ending[0]+ending[1];

    //             var startMonth=starting[3]+starting[4];
    //             var endMonth=ending[3]+ending[4];

    //             var startYear=starting[6]+starting[7]+starting[8]+starting[9];
    //             var endYear=ending[6]+ending[7]+ending[8]+ending[9];

    //             var  newStartDate = new Date(startMonth+'/'+startDate+'/'+startYear);
    //             var newEndDate= new Date(endMonth+'/'+endDate+'/'+endYear)

    //             var difference_in_time= newEndDate.getTime() - newStartDate.getTime()

    //             var difference_in_days = difference_in_time / (1000*3600*24);

    //             return Math.floor(difference_in_days/30)+' '+ 'Month'+',' + (difference_in_days % 30)+' '+  'Days'
                
    // },

    }
        
    }
    
</script>

<style scoped>
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