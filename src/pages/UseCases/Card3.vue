<template>
    <div id="useCase">
      <div class="row">
        <div opacity="1" class="Carousel__ItemWrap-sc-1owlrrs-2 eCykC card position-relative shadow-lg bg-white programCard ml-5 mt-4" v-for="useCase in fullData.slice().reverse()" :key="useCase._id">
                <div class="ghWIBu" orientation="vertical">
                    <a class="exwfAE" href="">
                        <div orientation="vertical" class=" fWbtym iaXrsE">
                          <div style="text-align:center;" class="container">
                            <img src="https://i.stack.imgur.com/jRLAt.png" alt="" orientation="vertical" class="kVtcyG">
                            <h3 class="centered">{{useCase.useCaseName}}</h3>
                          </div>
                            
                        </div>
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
                    </a>
                    <div orientation="vertical" class="BatchCardDetails__Wrapper-sc-4091eg-0 fWVYTt">
                      <div>
                        <a class="Link__StyledAnchor-sc-1n9f3wx-0 exwfAE" href="">
                            <h6 color="#3C4852" class="sPdMX">{{useCase.summary}}</h6>
                        </a>
                        <div class="row">
                          <span type="hollow" class=" dHfCyZ1 ml-1" v-on:click="openForm(useCase.screenshots)">Screenshots</span>
                          <span type="hollow" class=" dHfCyZ" v-on:click="openPreview(useCase.videoUrl)">Preview</span>
                          <span type="hollow" class=" dHfCy3" v-on:click="gotoData(useCase._id, useCase.isPaid, useCase.redirectLink, useCase.price)">Get</span>
                        </div>
                        <p color="#808080" class="P2-sc-6jrkt9-0 BatchCardDetails__CourseInfo-sc-4091eg-2 dumfX2">Learn Topics: </p>
                        <p color="#808080" class="P2-sc-6jrkt9-0 BatchCardDetails__CourseInfo-sc-4091eg-2 dumfXl">{{useCase.learnTopics}}</p>
                      </div>
                    
                      <p color="#3C4852" class="P2-sc-6jrkt9-0 BatchCardDetails__EducatorName-sc-4091eg-3 hwQFuS" style="font-size:14px;">Created At: <b>{{useCase.createdAt.slice(0, 10)}}</b></p>
                      <p  style="font-size:12px;">Version: <b>{{useCase.versions}}</b></p>
                      
                    </div>
            </div>
        </div>
      </div>
      <div class="form-popup ml-3" id="myForm">
        <button class="btn btn-danger btn-lg btn-block col-lg-12"  v-on:click="closeForm">Close</button>
        <div class="row mt-2">
          <div class="card col-lg-4 ml-2"  v-for="imgData in info" :key="imgData._id">
                <img :src="imgData.path" v-on:click="openImg(imgData.path)">
                
            </div>
        </div>
      </div>
      <div id="myModal" class="modal">
        <span class="close" v-on:click="closeImg">&times;</span>
        <img class="modal-content" id="img01">
      </div>
      <div class="form-popup ml-2" id="myVideo">
          <button type="button" class="btn btn-danger btn-lg btn-block col-lg-12"  v-on:click="closePreview">Close</button>
          <div>
              <iframe width="560" height="315" :src="videoData" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { stringify } from 'querystring';
import { type } from 'os';

    const axios = require('axios');

    export default {
        data: function () {
            return {
                cardDetailsSets:[]
            }
        },

        methods: {
            numberOfCard(index){
                var totalNumberOfCard=index+1;
                if(totalNumberOfCard<=2){
                    return true;
                }
                else{
                    return false
                }
            },
            showCourseDetails(index){

                   var id = this.cardDetailsSets[index]._id

                this.$router.push('/courseDetails/'+id);
},
            getDate(startDate){
                 var monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
                 var date=startDate[0]+startDate[1];
                 var month= startDate[3]+startDate[4];
                 var year = startDate[6]+startDate[7]+startDate[8]+startDate[9];
                 var selectedMonthName=monthNames[parseInt(month)]
                 
                 return (selectedMonthName+' '+date+','+year)
            },
            getTimeDuration(starting,ending){
                var startDate=starting[0]+starting[1];
                var endDate=ending[0]+ending[1];

                var startMonth=starting[3]+starting[4];
                var endMonth=ending[3]+ending[4];

                var startYear=starting[6]+starting[7]+starting[8]+starting[9];
                var endYear=ending[6]+ending[7]+ending[8]+ending[9];

                var  newStartDate = new Date(startMonth+'/'+startDate+'/'+startYear);
                var newEndDate= new Date(endMonth+'/'+endDate+'/'+endYear)

                var difference_in_time= newEndDate.getTime() - newStartDate.getTime()

                var difference_in_days = difference_in_time / (1000*3600*24);

                return Math.floor(difference_in_days/30)+' '+ 'Month'+',' + (difference_in_days % 30)+' '+  'Days'
                
    }

        },

        mounted: function(){
            axios.get('https://cors-anywhere.herokuapp.com/https://boiling-garden-13643.herokuapp.com/usecase')
            .then(resData=>{
                console.log(resData)
                this.cardDetailsSets=resData.data;
                console.log(this.cardDetailsSets);
})
            .catch(err=>{
                console.log(err)
            })
        }
    }

</script>


<style scoped>
 .decription{
        padding-top:55px;
         font-size: 14px; 
       }

       .bedge{
        border-radius: 2px;
         font-size: 65%;
        line-height: 15px;
       }

        .programCard{
            height:400px;
            width: 320px;
            border-radius: 10px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

        }

        .card-img-top{
            height: 160px;
             width: 100%;
             border-radius: 10px;
        }

        .decsCard{
            box-shadow: 0px 4px 16px rgba(189, 189, 189, 0.24);
            border-radius:10px;
            margin-left: 8px;
            justify-content: center;
            position: absolute;
            top:120px;
            height:135px;
            width: 95%;
        }
        p {
            margin-bottom: 0rem;
            padding: 0;
            margin: 0;
        }

</style>
