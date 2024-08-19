<?php

  session_start();

  if(isset($_SESSION['username'])){
    
  }else{
    header("Location: /login");
  }

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>DSWD DRMD | </title>

    <!-- Bootstrap -->
    <link href="/assets/css/jquery-te-1.4.0.css" rel="stylesheet">
    <link rel="stylesheet" href="/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="/vendors/font-awesome/css/font-awesome.css" rel="stylesheet">
    <!-- NProgress -->
    <link rel="stylesheet" href="/vendors/nprogress/nprogress.css" rel="stylesheet">
    <!-- iCheck -->
    <link rel="stylesheet" href="/vendors/iCheck/skins/flat/green.css" rel="stylesheet">
	
    <!-- bootstrap-progressbar -->
    <link rel="stylesheet" href="/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
    <!-- JQVMap -->
    <link rel="stylesheet" href="/vendors/jqvmap/dist/jqvmap.min.css" rel="stylesheet"/>
    <!-- bootstrap-daterangepicker -->
    <link rel="stylesheet" href="/vendors/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet">

    <link href="/vendors/google-code-prettify/bin/prettify.min.css" rel="stylesheet">

    <link rel="stylesheet" href="/vendors/datatables.net-bs/css/dataTables.bootstrap.css">

    <!-- Custom Theme Style -->
    <link href="/build/css/custom.min.css" rel="stylesheet">

    <link href="/assets/css/jquery-ui.css" rel="stylesheet">

    <link href="/assets/css/autocomplete.css" rel="stylesheet">
    <link href="/assets/css/select.css" rel="stylesheet">

    <link href="/assets/css/jquery-confirm.css" rel="stylesheet">
    <link href="/assets/js/monthpicker/MonthPicker.min.css" rel="stylesheet">

    <link href="/assets/js/Chosen/docsupport/prism.css" rel="stylesheet">
    <link href="/assets/js/Chosen/chosen.css" rel="stylesheet">

    <link href="/assets/js/leaflet/leaflet.css" rel="stylesheet">

    <link href="/assets/autocomplete/jquery.auto-complete.css" rel="stylesheet">

    <link href="/assets/css/contextmenu.css" rel="stylesheet">

    <link href="/images/dromic.png" rel="icon" type="image/png"/>

    <style>
      .report_summary_td{
        text-align: center;
        border:  1px solid #000;
        background-color:#B6DDE8;
        padding:  3px;
      }

      .btn {
        border-radius: 0px;
      }
      .modal-content {
        border-radius: 0px;
      }
      .ui-autocomplete { z-index:2147483647; }
      #map {
        height: 100%;
        width:100%;
      }
      .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
      }

      .switch input {display:none;}

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }

      input:checked + .slider {
        background-color: #2196F3;
      }

      input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }

      input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }

      /* Rounded sliders */
      .slider.round {
        border-radius: 34px;
      }

      .slider.round:before {
        border-radius: 50%;
      }
      .legends {
        padding: 10px;
        border-radius: 5px;
        position: absolute;
        right: 20px;
        top: 10px;
        background-color: white;
        width:350px;
        z-index:10000;
        font-size:15px
      }
      .loader {
        border: 9px solid #f3f3f3;
        border-radius: 50%;
        border-top: 9px solid #3498db;
        width: 45px;
        height: 45px;
        -webkit-animation: spin 1s linear infinite;
        animation: spin 1s linear infinite;
      }

      @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      a.tabpill:hover{
        color:#000 !important;
        background-color: #000;
        cursor: pointer;
      }

      .custom-menu {
          display: none;
          z-index: 1000;
          position: absolute;
          overflow: hidden;
          border: 1px solid #CCC;
          white-space: nowrap;
          font-family: sans-serif;
          background: #FFF;
          color: #333;
          border-radius: 5px;
      }

      .custom-menu li {
          padding: 8px 12px;
          cursor: pointer;
      }

      .custom-menu li:hover {
          background-color: #DEF;
      }

      .hoveredit:hover{
        background-color: yellow;
        font-weight:bold;
        cursor:pointer;
      }

      .inputfile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }

      .inputfile + label {
          font-size: 1.25em;
          font-weight: 700;
          color: white;
          background-color: black;
          display: inline-block;
      }

      .inputfile:focus + label,
      .inputfile + label:hover {
          background-color: red;
      }

      .inputfile + label {
        cursor: pointer; /* "hand" cursor */
      }

      .info {
          padding: 6px 8px;
          font: 14px/16px Arial, Helvetica, sans-serif;
          background: white;
          background: rgba(255,255,255,0.8);
          box-shadow: 0 0 15px rgba(0,0,0,0.2);
          border-radius: 5px;
          background-color: #272822;
          color: #fff;
      }
      .info h4 {
          margin: 0 0 5px;
          color: #fff;
      }

      .legend {
          line-height: 18px;
          color: #555;
          border: 1px solid gray;
          padding: 10px;
          border-radius: 5px;
          font-size:15px;
          text-align:left;
          background-color: #272822;
          color: #fff;
      }
      .legend i {
          width: 18px;
          height: 18px;
          float: left;
          margin-right: 8px;
          opacity: 0.7;
          text-align:left;
      }

      .tbl_masterquery_revs td {
        font-size: 10px;
      }

      #snackbar {
        visibility: hidden;
        min-width: 250px;
        margin-left: -125px;
        background-color: #333;
        color: #fff;
        text-align: center;
        border-radius: 2px;
        padding: 16px;
        position: fixed;
        z-index: 1;
        left: 50%;
        bottom: 30px;
        font-size: 17px;
        font-family: Arial;
      }

      #snackbar.show {
        visibility: visible;
        -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
        animation: fadein 0.5s, fadeout 0.5s 2.5s;
      }

      @-webkit-keyframes fadein {
        from {bottom: 0; opacity: 0;} 
        to {bottom: 30px; opacity: 1;}
      }

      @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
      }

      @-webkit-keyframes fadeout {
        from {bottom: 30px; opacity: 1;} 
        to {bottom: 0; opacity: 0;}
      }

      @keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
      }

    </style>

    <!-- jQuery -->
  <script src="/vendors/jquery/dist/jquery.min.js"></script>
  <!-- Bootstrap -->
  <script src="/vendors/bootstrap/dist/js/bootstrap.min.js"></script>

  <script src="/assets/js/dynamics.js"></script>

  </head>

	<body class="nav-md" oncontextmenu="return false">
    <div class="container body">
      <div class="main_container">
        <div class="col-md-3 left_col">
          <div class="left_col scroll-view">
            <div class="navbar nav_title" style="border: 0; margin-top:5px">
              <a href="/" class="site_title"><img src="/images/dreamblogoweb.png" style="width:50px; height:50px;" class="img img-circle"> <span style="font-size:15px">DSWD DRMD</span></a>
            </div>

            <div class="clearfix"></div>
            <label id="usernameid" style="display :none"><?= $_SESSION['username']; ?></label>
            <label id="can_edit" style="display :none"></label>
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <ul class="nav side-menu">
                  <li class="active"><a href="/dashboard"> <i class="fa fa-dashboard"></i> Dashboard <span class="fa fa-chevron-right"></span></a></li>
                </ul>
                <ul class="nav side-menu" id="panelmenu">
                  <?php 
                      if($_SESSION['isadmin'] == "reports"){?>
                      <li class='active'><a><i class='fa fa-th'></i> Reports <span class='fa fa-chevron-down'></span></a>
                        <ul class='nav child_menu' style='display:block'>
                          <li><a href='congressional'>Congressional Report</a></li>
                          <li><a href='reliefassistance'>Augmentation Assistance Report</a></li>
                        </ul>
                      </li>
                  <?php }else{ ?>
                  <li class="active"><a><i class="fa fa-table"></i> Operation Center<span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu" style="display:block">
                      <?php if($_SESSION['can_create_report'] == 't'){ ?> <li><a href="/dromic_new">Add New | View DROMIC Report</a></li> <?php } ?>
                      <!-- <li><a href="/eopcen">Virtual OpCen <span class="badge" style="background-color:#D9534F" id="counteopcen"> </span> </a></li> -->
                      <!-- <li><a href="/inbox2">Messages (Inbox) </a></li> -->
                      <li><a href="/weatherimage">Latest Weather Forecast</a></li>
                      <li><a href="/weatherradar">Weather Radar Image</a></li>
                      <li><a href="/earthquake">Earthquake Bulletin</a></li>
                    </ul>
                  </li>
                  <!-- <li class="active">
                    <a><i class="fa fa-phone"></i> My Contact List <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu" style="display:block">
                      <li><a href="/home">C/MSWDO Contacts</a></li>
                      <li><a href="/cmatleaders">CMAT/PAT Contacts</a></li>
                    </ul>
                  </li> -->
                  <?php 
                      if($_SESSION['isadmin'] == "t"){?>
                  <!-- <li class="active"><a><i class="fa fa-map-o"></i> Web Map Application <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu" style="display:block">
                      <li><a href="/webmap">View Map</a></li>
                    </ul>
                  </li> -->
                  <!-- <li class='active'><a><i class='fa fa-th'></i> Reports <span class='fa fa-chevron-down'></span></a>
                    <ul class='nav child_menu' style='display:block'>
                      <li><a href='addreliefassistance'>Add Relief Assistance</a></li>
                      <li><a href='reliefassistance'>Augmentation Assistance Report</a></li>
                      <li><a href='congressional'>Congressional Report</a></li>
                    </ul>
                  </li> -->
                  <!-- <li class='active'><a><i class='fa fa-users'></i> User Management <span class='fa fa-chevron-down'></span></a>
                    <ul class='nav child_menu' style='display:block'>
                      <li><a href='qrt_teams'>QRT Teams</a></li>
                    </ul>
                  </li> -->
                  <?php } } ?>
                  <li class='active'><a><i class='fa fa-users'></i> Tools <span class='fa fa-chevron-down'></span></a>
                    <ul class='nav child_menu' style='display:block'>
                      <?php 
                      if($_SESSION['isadmin'] == "t"){?>
                      <!-- <li><a href='mobile_user_activation'>Activate Mobile Users</a></li> -->
                      <?php } ?>

                      <?php 
                      if($_SESSION['can_create_report'] == "t"){?> <li><a href='/reportsmanagement'>Reports Management</a></li>
                      <?php } ?>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="top_nav">
          <div class="nav_menu" style="background-color:#304456; color:#fff; padding:0px; height:40px; border-left:3px solid #fff">
            <nav>
              <div class="nav toggle" style="margin-top:-10px;">
                <a id="menu_toggle"><i class="fa fa-bars" style="color:#fff"></i></a>
              </div>
              <ul class="nav navbar-nav navbar-right" style="margin-top:-10px;">
                <li style="height:50px">
                  <a href="/javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="true" style="height:50px">
                    <span class="fa fa-user" style="color:#fff"></span> <span style="color:#fff; text-transform:capitalize"><?php echo $_SESSION['fullname']; ?></span>
                    <span class=" fa fa-angle-down" style="color:#fff"></span>
                  </a>
                  <ul class="dropdown-menu dropdown-usermenu pull-right">
                    <li><a href="/logout"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                    <!-- <li><a href="/changepassword"><i class="fa fa-key pull-right"></i> Change Password</a></li> -->
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="right_col" role="main">
      
