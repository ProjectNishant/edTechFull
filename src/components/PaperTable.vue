<template>
<div>
  <table class="table" :class="tableClass">
    <thead>
    <slot name="columns">
      <th v-for="column in columns" :key="column">{{column}}</th>
    </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="(column, index) in columns"
            :key="index"
            v-if="hasValue(item, column)">
          {{itemValue(item, column)}}
        </td>
        <td>
          <div class="table-icons">
              <a rel="tooltip" title="View" class="btn btn-simple btn-info btn-icon table-action view mr-1" v-on:click="showData(item)"><i class="ti-image"></i>
              </a>
              <a rel="tooltip" title="Edit" class="btn btn-simple btn-warning btn-icon table-action edit mr-1" v-on:click="openForm(item)"><i class="ti-pencil-alt"></i></a>
              <a rel="tooltip" title="Remove" class="btn btn-simple btn-danger btn-icon table-action remove"  data-toggle="modal" data-target="#exampleModal"><i class="ti-close"></i></a>
          </div>
        </td>
  
      </slot>
    </tr>
    </tbody>
  </table>

  <!-- editable form -->
  <div class="form-popup" id="myForm">
    <form class="form-container">
      <h3>Edit</h3>

      <label for="id"><b>Id</b></label>
      <input type="text" :placeholder="rowItem.id" name="id" required>

      <label for="psw"><b>Name</b></label>
      <input type="text" :placeholder="rowItem.name" name="psw" required>

      <label for="psw"><b>Summ</b></label>
      <input type="text" :placeholder="rowItem.name" name="psw" required>

      <label for="psw"><b>Name</b></label>
      <input type="text" :placeholder="rowItem.name" name="psw" required>

      <label for="psw"><b>Name</b></label>
      <input type="text" :placeholder="rowItem.name" name="psw" required>

      <label for="psw"><b>Name</b></label>
      <input type="text" :placeholder="rowItem.name" name="psw" required>



      <button type="submit" class="btn">Update</button>
      <button type="button" class="btn cancel" v-on:click="closeForm()">Close</button>
    </form>
  </div>

<!-- modal for delete -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'paper-table',
  props: {
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      rowItem: '',
    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  methods: {
    showData(data){
      alert(JSON.stringify(data));
    },
    deleteData(data){
      this.rowItem = data;
    },
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },

    openForm(data) {
      this.rowItem = data;
      document.getElementById("myForm").style.display = "block";
    },
    closeForm() {
      document.getElementById("myForm").style.display = "none";
    }
  }
};
</script>
<style>

/* The popup form - hidden by default */
.form-popup {
  display: none;
  position: absolute;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

/* Full-width input fields */
.form-container input[type=text], .form-container input[type=password] {
  width: 100%;
  padding: 10px;
  margin: 5px 0 12px 0;
  border: none;
  background: #f1f1f1;
}

/* When the inputs get focus, do something */
.form-container input[type=text]:focus, .form-container input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/login button */
.form-container .btn {
  background-color: #f8a840;
  color: white;
  padding: 8px 20px;
  border: none;
  cursor: pointer;
  margin-left: 2%;
  width: 40%;
  margin-bottom:10px;
  opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}
.fixed-table-container tbody tr:first-child td {
    border-top: none;
}

.bootstrap-table .table, .bootstrap-table .table > tbody > tr > th, .bootstrap-table .table > tfoot > tr > th, .bootstrap-table .table > thead > tr > td, .bootstrap-table .table > tbody > tr > td, .bootstrap-table .table > tfoot > tr > td {
    padding: 8px !important;
}
.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
    padding: 12px 11px;
    vertical-align: middle;
}
.table thead tr > th, .table thead tr > td, .table tbody tr > th, .table tbody tr > td, .table tfoot tr > th, .table tfoot tr > td {
    border-top: 1px solid #CCC5B9;
}
.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
}
.table th, .table td {
    vertical-align: middle;
    box-sizing: border-box;
}
.text-right {
    text-align: right;
}
h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6, p, .navbar, .brand, a, .td-name, td {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: 'Muli', "Helvetica", Arial, sans-serif;
}
td, th {
    padding: 0;
}
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
user agent stylesheet
td {
    display: table-cell;
    vertical-align: inherit;
}
.table-icons {
    display: inline-block;
    min-width: 110px;
}

* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
user agent stylesheet
div {
    display: block;
}
.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
}
.text-right {
    text-align: right;
}
h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6, p, .navbar, .brand, a, .td-name, td {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: 'Muli', "Helvetica", Arial, sans-serif;
}
.sidebar .nav a, .sidebar .nav .collapse i, .sidebar .nav .collapse a > span, .sidebar .sidebar-wrapper > .nav p, .sidebar .user .info > a > span, .sidebar .user .info .collapse .nav a > span, .sidebar .logo a.logo-mini, .sidebar .logo a.logo-normal, .table > tbody > tr .td-actions .btn, .caret {
    -webkit-transition: all 150ms ease-in;
    -moz-transition: all 150ms ease-in;
    -o-transition: all 150ms ease-in;
    -ms-transition: all 150ms ease-in;
    transition: all 150ms ease-in;
}

.btn.btn-icon, .navbar .navbar-nav > li > a.btn.btn-icon {
    border-radius: 25px;
    padding: 7px 10px;
}
.card .card-title, .card .stats, .card .category, .card .description, .card .social-line, .card .actions, .card .card-content, .card .card-footer, .card small, .card a {
    position: relative;
}
.btn, .pagination a {
    -webkit-transition: all 100ms ease-in;
    -moz-transition: all 100ms ease-in;
    -o-transition: all 100ms ease-in;
    -ms-transition: all 100ms ease-in;
    transition: all 100ms ease-in;
}
.btn-simple {
    border: 0;
    padding: 7px 18px;
}
.navbar .navbar-nav > li > a.btn.btn-info, .btn-info {
    border-color: #68B3C8;
    color: #68B3C8;
}
.btn, .navbar .navbar-nav > li > a.btn {
    border-radius: 20px;
    box-sizing: border-box;
    border-width: 2px;
    background-color: transparent;
    font-size: 14px;
    font-weight: 600;
    padding: 7px 18px;
    border-color: #66615B;
    color: #66615B;
    -webkit-transition: all 150ms linear;
    -moz-transition: all 150ms linear;
    -o-transition: all 150ms linear;
    -ms-transition: all 150ms linear;
    transition: all 150ms linear;
}
.btn-info {
    color: #fff;
    background-color: #5bc0de;
    border-color: #46b8da;
}
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
a {
    color: #68B3C8;
}
h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6, p, .navbar, .brand, a, .td-name, td {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: 'Muli', "Helvetica", Arial, sans-serif;
}
a {
    color: #337ab7;
    text-decoration: none;
}
a {
    background-color: transparent;
}
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
user agent stylesheet
a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}
</style>
