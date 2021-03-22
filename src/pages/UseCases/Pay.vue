<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <form>
          <div class="form-group">
            <label>Name</label>
            <input v-model="name" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input v-model="desc" type="text" class="form-control" />
          </div>

          <div class="form-group">
            <label>Price</label>
            <input v-model="price" type="number" class="form-control" />
          </div>

          <button @click="makePayment" class="btn btn-success">Submit</button>
        </form>
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
      desc: ""
    };
  },
  methods: {
    //Function to create order ID
    makePayment: function() {
      ev.preventDefault();
    //   localStorage.setItem('usId', useId);
      var data = {};
        (data["name"] = "Nishant"),
        (data["desc"] = "Check Out"),
        (data["amount"] = 500),
        axios({
          method: "GET",
          url: 'https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/pay/generateOrderId/'+useCsId,
          // data: data,
        })
          .then(res => {
            this.order_id = res.data.id;
            //Initiation of Razorpay PG
            var rzp1 = new Razorpay({
              key_id: 'rzp_test_vhsfxnSM8g4PUf',
              key_secret: '9dQE8o5zOK1gJYScj0U2kJrE',
              amount: "500",
              name: "Data Stats",
              currency: "INR",
              description: "Check Out for your Use Case Model.",
              image: "https://www.data-stats.com/wp-content/uploads/2020/06/cropped-DS-3-1.png",
              //Uncomment if you are using handler function
              "handler": function (response){
                alert(response.razorpay_payment_id);
              },
              //callback_url: 'http://13.126.183.214/razorpay/checkstatus/?orderid='+this.order_id,
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
              callback_url: "http://domain.com/#/about/" + this.order_id,
              redirect: true
            });
            rzp1.open();
          })
          .catch(err => {
            console.log("ERR", err);
          });
    }
    //if you are using handler function
    // verify: function(response) {
    // }
  }
};
</script>