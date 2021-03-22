<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
          
          <div class="row" >
              <h3 class="mt-1 ml-2">Select an usecase <br>
                <select class="ml-1" id="choosenId" style="border-radius: 20px;">
                  <option value="-1" style="background-color:gray;">select an usecase you want</option>
                  <option :value="useCase._id" v-for="(useCase, indx) in fullDataSearch" :key="useCase._id">{{indx+1}}. {{useCase.useCaseName}}</option>
                </select> 
              </h3>    
          </div>
          <button class="btn btn-primary" v-on:click="postSelecedCards">Proceed</button>
      </div>
    </div>
    
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "home",
  components: {},
  data() {
    return {
      price: 0,
      order_id: "",
      name: "",
      desc: "",
      fullDataSearch: [],
      selectedIDs: [],
    };
  },
  mounted () {
      this.getCardNames();
  },
  methods: {
    getCardNames(){
        axios
        .get('https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/usecase')
        .then(response => (this.fullDataSearch=response.data))
        console.log(this.fullDataSearch);
    },
    postSelecedCards(){
      this.selectedIDs = document.getElementById('choosenId').value;
      var authTok = localStorage.getItem('authUseToken');
      axios({
          method: 'POST',
          url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/posts/enrollMultiUseCase/',
          headers:{authorization : authTok},
          body :
          {
            usecases: [this.selectedIDs]
          }
      }).then(response => {
        // (this.fullData=response.data.useCaseDetails)
        console.log(response)
      });
    },
    mySearch2 : function() { 
      // console.log(this.fullDataSearch);
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
              li[i].style.display = "";
          } else {
              li[i].style.display = "none";
          }
      }
      if(input.value == ''){
        ul.setAttribute('style', 'display: none');
      }
    },
    searchDiv2: function(searchData){
      this.searchUseCase = searchData;
      document.getElementById('useCaseSrch').style.display = "block";
      document.getElementById("myInput").value = this.searchUseCase.useCaseName;
      document.getElementById("myUL").style.display = 'none';
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
    //if you are using handler function
    // verify: function(response) {
    // }
  }
};
</script>