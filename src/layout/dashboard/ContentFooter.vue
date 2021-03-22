
  <!-- <footer class="footer"> -->
    <!-- <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul>
          <li>
            <router-link :to="{path:'/admin'}">Dashboard</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright d-flex flex-wrap">
        &copy; Coded with
        <i class="fa fa-heart heart"></i> by
        <a href="https://data-stats.com" target="_blank"> &nbsp; Data-Stats.</a>&nbsp;
        Designed by <a href="https://github.com/ATTITUDD" target="_blank">&nbsp; NIshant Sharma.</a>
      </div>
    </div> -->
  <!-- </footer>
</template> -->

<template>
  <div id="footer-wrapper">
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">
              Data-Stats is an initiative to help the upcoming programmers with
              the code. Data-Stats focuses on providing the most efficient
              training to the students. We will help students build up concepts
              in different programming languages that include Machine learning,
              Deep Learning and many more...
            </p>
          </div>
 
          <div class="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul class="footer-links">
              <li><a href="#">Machine learning</a></li>
              <li><a href="#">Deep Learning</a></li>
              <li><a href="#">AWS</a></li>
              <li><a href="#">Big Data</a></li>
            </ul>
          </div>
 
          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
 
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">
              Copyright &copy; 2020 All Rights Reserved by
              <a href="#">Data-Stats</a>.
            </p>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li>
                <a class="facebook" href="https://www.facebook.com/Data-stats-110582074007292/"><i class="fa fa-facebook"></i></a>
              </li>
              <li>
                <a class="twitter" href="#"><i class="fa fa-twitter"></i></a>
              </li>
              <li>
                <a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
 
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
* {
  box-sizing: border-box;
}
 
.site-footer {
  width: 100%;
}
.site-footer {
  background-color: #323437;
  padding: 30px 0 18px;
  font-size: 15px;
  line-height: 24px;
  color: white;
}
 
.site-footer hr {
  border-top-color: #bbb;
  opacity: 0.5;
}
 
.site-footer h6 {
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-top: 10px;
  padding: 10px 0px 20px;
  color: #ff7744;
}
 
.site-footer a {
  color: #ffffff;
}
.site-footer a:hover {
  color: #ff7744;
  text-decoration: none;
}
.footer-links {
  list-style: none;
  padding: 0;
}
.site-footer .social-icons {
  text-align: right;
}
.social-icons {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.social-icons li {
  display: inline-block;
  margin-bottom: 4px;
}
 
.social-icons a {
  background-color: #eceeef;
  color: grey !important;
  font-size: 16px;
  display: inline-block;
  line-height: 44px;
  width: 44px;
  height: 44px;
  text-align: center;
  margin-right: 8px;
  border-radius: 100%;
}
/* @media (max-width: 991px) {
  .site-footer [class^="col-"] {
    margin-bottom: 30px;
  }
}
@media (max-width: 767px) {
  .site-footer {
    padding-bottom: 0;
  }
  .site-footer .copyright-text.site-footer .social-icons {
    text-align: center;
  }
} */
.social-icons a.facebook:hover {
  background-color: #3b5998;
  color: white !important;
}
.social-icons a.twitter:hover {
  background-color: #00aced;
  color: white !important;
}
.social-icons a.linkedin:hover {
  background-color: #007bb6;
  color: white !important;
}
 
/* @media (max-width: 767px) {
  .social-icons li.title {
    display: block;
    margin-right: 0;
    font-weight: 600;
  }
} */
</style>
 
