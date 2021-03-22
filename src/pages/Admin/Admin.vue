<template>
<div>
    <div class="btn-group btn-block mb-5">
      <button class="btn btn-secondary" v-on:click="addData"> Upload Use Cases</button>
      <button class="btn btn-secondary" v-on:click="tableShow"> Verify UseCases</button>
      <button class="btn btn-secondary"> xyz</button>
    </div>

    <div class="service_products" id="addData">
        <div class="container">
            <div class="service_wrap">
                <div class="row">
                    
                    <div class="col-lg-6">
                        <div class="download_left" id="dataCont">
                            <p style="color: orange; font-size: 50px;">Use Case Data</p>
                        
                            <div class="row">
                                <input class="form-control inrTxt w-90 mt-3 ml-2" id="useCaseName" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Use Case Name'" placeholder = 'Enter Use Case Name'>
                            </div>
                            <div class="row">
                                <input class="form-control inrTxt w-90 mt-3 ml-2" id="category" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Category'" placeholder = 'Enter Category'>
                            </div>
                            <div class="row">
                                <input class="form-control inrTxt w-90 mt-3 ml-2" id="summary" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Summary'" placeholder = 'Enter Summary'>
                            </div>
                            
                            <div class="row">
                                <input class="form-control inrTxt w-90 mt-3 ml-2" id="versions" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter version'" placeholder = 'Enter version'>
                            </div>
                            <div class="row">
                                <input class="form-control inrTxt w-90 mt-3 ml-2" id="videoUrl" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Video URL'" placeholder = 'Enter Video URL'>
                            </div>
                            <div class="row">
                            <p id="pId"></p>
                            </div>
                            <div class="form-grp1 row">
                                <p class=" mt-3 ml-2">Add an image </p>
                                <input class="mt-3 ml-2" style="border-radius: 30px;" @change="previewImage" accept="image/*" type="file" id="imgId" name="images[]"/><br>
                            </div>
                            <div>
                            <p >Progress: {{uploadValue.toFixed()+"%"}}
                            <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
                            </div>
                            <div v-if="imageData!=null">
                                <img class="preview" :src="picture">
                                <br>
                            <button class=" btn btn-primary mt-3 ml-2" @click="onUpload">Generate URL</button>
                            </div>
                            <div>
                            <!-- v-for="arrData in scrnshotArr" :key="arrData._id" -->
                            <p>{{scrnshotArr}}</p>
                            </div>
                            <div class="row">
                                <button class=" btn btn-success mt-3 ml-2" v-on:click="submit">Upload Card Data</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 mt-5">
                        <div class="row mt-5">
                            <textarea class="form-control inrTxt w-90 mt-3 ml-2" id="description" cols="30" rows="6" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Description'" placeholder = 'Description'></textarea>
                        </div>
                        <div class="row">
                            <input class="form-control inrTxt w-90 mt-3 ml-2" id="LTopic" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Learn Topics'" placeholder = 'Enter Learn Topics'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="tabId" style="display:none;">
      <TableList/>
    </div>
    
</div>
</template>
<script>
import firebase from 'firebase';
import TableList from './VerifyUseCase.vue';
const axios = require('axios').default;
export default {
    name: 'UseCaseUpload',
    data(){
      return{
        scrnshotArr:[],
        imageData: null,
        picture: null,
        uploadValue: 0
      }
    },
    components:{
      TableList,
    },
    methods: {
      addData(){
        document.getElementById('addData').style.display = 'block';
        document.getElementById('tabId').style.display = 'none';
      },
      tableShow(){
        document.getElementById('addData').style.display = 'none';
        document.getElementById('tabId').style.display = 'block';
      },

        previewImage(event) {
          this.uploadValue=0;
          this.picture=null;
          this.imageData = event.target.files[0];
        },

        onUpload(){
          this.picture=null;
          const storageRef=firebase.storage().ref(`${this.imageData.name}`).child('screenshots').put(this.imageData);
          storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.picture =url;
              this.scrnshotArr = url;
            });
          }
          );
        },

        submit : function() { 
          axios.post('https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/usecase',{
            // headers: {
            //   authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWExYjY4YWFhZmM2OTBlODY2YjdiMWQiLCJpYXQiOjE1OTAxMjAxNzh9.oMLacbm20X269mBcoNwY8zytZABckAlr5siwJhjS1zY"
            // },
            useCaseName: document.getElementById('useCaseName').value,
            category: document.getElementById('category').value,
            summary: document.getElementById('summary').value,
            description: document.getElementById('description').value,
            videoUrl: document.getElementById('videoUrl').value,
            
            screenshots: [{
                path: this.scrnshotArr,
            }],
            learnTopics: document.getElementById('LTopic').value,
            versions: document.getElementById('versions').value,

          })
          .then(response =>{
            alert("data entered Successfully\n"+response)
          })
          .catch(error=>{
            alert("Error: "+error)
          });
        },

    },
}
</script>

<style scoped>
img.preview {
    width: 200px;
}
.inrTxt {
    background-color: rgb(250, 184, 62);
}
.service_products {
  /* background-image: linear-gradient(to right, rgb(243, 180, 120), rgb(253, 252, 251)); */
  /* background-color: #fff; */
  padding-top: 0px;
  padding-bottom: 60px;
}

.service_products .padding_left {
  padding-left: 68px;
}

@media (max-width: 767px) {.service_products .padding_left {
    padding-left: 0;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .service_products .padding_left {
    padding-left: 0;
  }
}
.service_products .service_wrap {
  margin-bottom: 60px;
}
.service_products .service_wrap .thumb img {
  width: 100%;
}
.service_products .service_wrap .service_text {
  margin: 30px 0;
}

.service_products .service_wrap .service_text h3 {
  color: #fff;
  font-size: 36px;
  font-weight: 400;
}
.service_products .service_wrap .service_text p {
  color: #C9C9C9;
  font-size: 16px;
  line-height: 28px;
  margin: 30px 0;
}
.service_products .service_wrap .service_text .boxed-btn3-line {
  margin-top: 10px;
}

</style>