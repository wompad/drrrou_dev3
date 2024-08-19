
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
    <link href="<?php echo base_url(); ?>assets/css/jquery-te-1.4.0.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo base_url(); ?>vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="<?php echo base_url(); ?>vendors/font-awesome/css/font-awesome.css" rel="stylesheet">
    <!-- NProgress -->
    <link rel="stylesheet" href="<?php echo base_url(); ?>vendors/nprogress/nprogress.css" rel="stylesheet">
    <!-- iCheck -->
    <link rel="stylesheet" href="<?php echo base_url(); ?>vendors/iCheck/skins/flat/green.css" rel="stylesheet">

    <!-- bootstrap-progressbar -->
    <link rel="stylesheet" href="<?php echo base_url(); ?>vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
    <!-- JQVMap -->
    <link rel="stylesheet" href="<?php echo base_url(); ?>vendors/jqvmap/dist/jqvmap.min.css" rel="stylesheet" />
    <!-- bootstrap-daterangepicker -->
    <link rel="stylesheet" href="<?php echo base_url(); ?>vendors/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet">

    <link href="<?php echo base_url(); ?>vendors/google-code-prettify/bin/prettify.min.css" rel="stylesheet">

    <link rel="stylesheet" href="<?php echo base_url(); ?>vendors/datatables.net-bs/css/dataTables.bootstrap.css">

    <!-- Custom Theme Style -->
    <link href="<?php echo base_url(); ?>build/css/custom.min.css" rel="stylesheet">

    <link href="<?php echo base_url(); ?>assets/css/jquery-ui.css" rel="stylesheet">

    <link href="<?php echo base_url(); ?>assets/css/autocomplete.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>assets/css/select.css" rel="stylesheet">

    <link href="<?php echo base_url(); ?>assets/css/jquery-confirm.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>assets/js/monthpicker/MonthPicker.min.css" rel="stylesheet">

    <link href="<?php echo base_url(); ?>assets/js/Chosen/docsupport/prism.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>assets/js/Chosen/chosen.css" rel="stylesheet">

    <link href="<?php echo base_url(); ?>assets/js/leaflet/leaflet.css" rel="stylesheet">

    <link href="<?php echo base_url(); ?>assets/autocomplete/jquery.auto-complete.css" rel="stylesheet">

    <link href="<?php echo base_url(); ?>assets/css/contextmenu.css" rel="stylesheet">

    <link href="<?php echo base_url(); ?>images/dromic.png" rel="icon" type="image/png" />

    <style>
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
    </style>

    <!-- jQuery -->
    <script src="<?php echo base_url(); ?>vendors/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="<?php echo base_url(); ?>vendors/bootstrap/dist/js/bootstrap.min.js"></script>

    <script src="<?php echo base_url(); ?>assets/js/dynamics.js"></script>

</head>

<body class="nav-md" style="background-color: #fff">
    <div class="container body">
        <div class="main_container">
            <div class="row">
                <div role="main">
                    <!-- top tiles -->
                    <div class="row tile_count" style="background-color: #fff">
                        <div class="col-md-12 col-sm-12 col-xs-12 tile_stats_count">
                            <center>
                                <h4><strong>Total for Disaster Events <?= date("Y"); ?></strong></h4>
                            </center>
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                            <center><span class="count_top"><i class="fa fa-map-marker"></i> Total LGUs Affected</span>
                                <div class="count red" id="aff_brgy" style="font-size:30px; cursor:pointer">0</div>
                                <span class="count_bottom"> For the Year <?php echo date("Y") ?></span></center>
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                            <center><span class="count_top"><i class="fa fa-user"></i> Total Affected Families</span>
                                <div class="count red" id="aff_families" style="font-size:30px; cursor:pointer">0</div>
                                <span class="count_bottom"> For the Year <?php echo date("Y") ?></span></center>
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                            <center><span class="count_top"><i class="fa fa-users"></i> Total Affected Individuals</span>
                                <div class="count red" id="aff_individuals" style="font-size:30px; cursor:pointer">0</div>
                                <span class="count_bottom"> For the Year <?php echo date("Y") ?></span></center>
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                            <center><span class="count_top"><i class="fa fa-money"></i> Total DSWD Assistance</span>
                                <div class="count green" id="tot_assistance" style="font-size:30px; cursor:pointer">0</div>
                                <span class="count_bottom"> For the Year <?php echo date("Y") ?></span></center>
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                            <center><span class="count_top"><i class="fa fa-user"></i> Total Families Inside ECs</span>
                                <div class="count" style="color:#EC971F; font-size:30px; cursor:pointer" id="aff_inec">0</div>
                                <span class="count_bottom"> For the Year <?php echo date("Y") ?></span></center>
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                            <center><span class="count_top"><i class="fa fa-user"></i> Total Families Outside ECs</span>
                                <div class="count" style="color:#EC971F; font-size:30px; cursor:pointer" id="aff_outec">0</div>
                                <span class="count_bottom"> For the Year <?php echo date("Y") ?> </span></center>
                        </div>
                    </div>
                    <!-- /top tiles -->
                    <hr class="line" style="border:1px solid #ADB2B5">
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="dashboard_graph">
                                <div class="col-md-6 col-sm-12 col-xs-12">
                                    <div class="x_panel tile overflow_hidden" style="height:500px; border: 3px solid #1ABB9C">
                                        <div class="x_title">
                                            <h4 class="green"><strong>Pie Chart of Total Affected Families (<?php echo date("Y"); ?>) </strong></h4>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="x_content" id="tot_family_graph">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12 col-xs-12">
                                    <div class="x_panel tile" style="height:500px; overflow: auto; border: 3px solid #34B4EB">
                                        <div class="x_title blue">
                                            <h4><strong>Pie Chart of DSWD Total Assistance (<?php echo date("Y"); ?>) </strong></h4>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="x_content" id="tot_assistance_graph">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 col-sm-12 col-xs-12">
                                    <div class="x_panel tile overflow_hidden" style="height:600px; border: 3px solid #1ABB9C">
                                        <div class="x_title">
                                            <h4 class="green"><strong>Column Chart of Total Affected Families (<?php echo date("Y"); ?>) </strong></h4>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="x_content" id="tot_family_graph_column" style='height:85%'>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="dashboard_graph">
                                <div class="col-md-3 col-sm-12 col-xs-12">
                                    <div class="x_panel" style="border: 3px solid #E74C3C; height:653px; overflow:auto">
                                        <div class="x-title green">
                                            <h4><strong>Public Weather Forecast <span id="issuedat"></span></strong></h4>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="x-content">
                                          <a class="twitter-timeline" href="https://twitter.com/dost_pagasa?ref_src=twsrc%5Etfw">Tweets by dost_pagasa</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                                            <!-- <div class="dashboard-widget-content" style="text-align:justify">
                                                <ul class="list-unstyled timeline widget" id="weathertextforecasts">
                                                </ul>
                                            </div>
                                            <div class="dashboard-widget-content" style="text-align:justify">
                                                <h5>Source: <a href="http://www1.pagasa.dost.gov.ph/" target="_blank">http://www1.pagasa.dost.gov.ph/</a></h5>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12 col-xs-12">
                                    <div class="x_panel" style="height:653px; border: 3px solid #EC971F">
                                        <div class="x-title green">
                                            <h4><strong>Weather Radar Image </strong></h4>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="x-content">
                                            <div class="dashboard-widget-content" style="text-align:justify">
                                                <object data="https://www1.pagasa.dost.gov.ph/images/radar/mosaic/mosaic_rain_radar.php" style="width:100%; height:530px" id="radarphp"></object>
                                            </div>
                                            <div class="dashboard-widget-content" style="text-align:justify">
                                                <h5>Source: <a href="https://www1.pagasa.dost.gov.ph/" target="_blank">http://www1.pagasa.dost.gov.ph/</a></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-3 col-sm-12 col-xs-12">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <div class="x_panel" style="height:653px; border: 3px solid #199919;">
                                            <div>
                                                <div>
                                                    <div class="x_panel" style="padding:0px">
                                                        <div class="x-content">
                                                            <div class="dashboard-widget-content" style="text-align:justify;">
                                                                <object data="https://oras.pagasa.dost.gov.ph/widget.shtml" class="form-control" style="height:150px; border:0px"></object>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <div class="x_panel" style="padding:0px">
                                                        <div class="x-content" style="padding:0px">
                                                            <div class="dashboard-widget-content" style="text-align:justify; overflow-y:hidden;">
                                                                <iframe src="https://feed.mikle.com/widget/v2/27254/" class="form-control" style="height:449px; border:0px;"></iframe>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="dashboard_graph">
                                
                                <div class="col-md-3 col-sm-12 col-xs-12">
                                    <div class="x_panel" style="border: 3px solid #E74C3C; height:1123px; overflow:auto">
                                        <div class="x-title green">
                                            <h4><strong>PHIVOLCS Advisories <span id="issuedat"></span></strong></h4>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="x-content">
                                          <a class="twitter-timeline" href="https://twitter.com/phivolcs_dost?ref_src=twsrc%5Etfw">Tweets by phivolcs_dost</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                                            <!-- <div class="dashboard-widget-content" style="text-align:justify">
                                                <ul class="list-unstyled timeline widget" id="weathertextforecasts">
                                                </ul>
                                            </div>
                                            <div class="dashboard-widget-content" style="text-align:justify">
                                                <h5>Source: <a href="http://www1.pagasa.dost.gov.ph/" target="_blank">http://www1.pagasa.dost.gov.ph/</a></h5>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-9 col-sm-12 col-xs-12">
                                    <div class="x_panel" style="border: 3px solid #E74C3C; overflow:auto">
                                        <div class="x-title red">
                                            <h4><strong>Hazard Visualization</strong></h4>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="x-content">
                                            <div class="dashboard-widget-content" style="text-align:justify">
                                                <iframe height="1000px" src="https://embed.windy.com/embed2.html?lat=10.790&lon=121.069&zoom=5&level=surface&overlay=rain&menu=&message=true&marker=&calendar=&pressure=true&type=map&location=coordinates&detail=&detailLat=14.649&detailLon=121.051&metricWind=default&metricTemp=default"
                                                    frameborder="0" style="width:100%"></iframe>
                                            </div>
                                            <div class="dashboard-widget-content" style="text-align:justify">
                                                <h5>Source: <a href="https://www.windy.com/?rain,14.649,121.051,5,i:pressure" target="_blank">https://www.windy.com/</a></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="<?php echo base_url(); ?>assets/js/ip.js"></script>

<!-- FastClick -->
<script src="<?php echo base_url(); ?>vendors/fastclick/lib/fastclick.js"></script>
<!-- NProgress -->
<script src="<?php echo base_url(); ?>vendors/nprogress/nprogress.js"></script>
<!-- Chart.js -->
<script src="<?php echo base_url(); ?>vendors/Chart.js/dist/Chart.min.js"></script>
<!-- gauge.js -->
<script src="<?php echo base_url(); ?>vendors/gauge.js/dist/gauge.min.js"></script>
<!-- bootstrap-progressbar -->
<script src="<?php echo base_url(); ?>vendors/bootstrap-progressbar/bootstrap-progressbar.min.js"></script>
<!-- iCheck -->
<script src="<?php echo base_url(); ?>vendors/iCheck/icheck.min.js"></script>
<!-- Skycons -->
<script src="<?php echo base_url(); ?>vendors/skycons/skycons.js"></script>
<!-- Flot -->
<script src="<?php echo base_url(); ?>vendors/Flot/jquery.flot.js"></script>
<script src="<?php echo base_url(); ?>vendors/Flot/jquery.flot.pie.js"></script>
<script src="<?php echo base_url(); ?>vendors/Flot/jquery.flot.time.js"></script>
<script src="<?php echo base_url(); ?>vendors/Flot/jquery.flot.stack.js"></script>
<script src="<?php echo base_url(); ?>vendors/Flot/jquery.flot.resize.js"></script>
<!-- Flot plugins -->
<script src="<?php echo base_url(); ?>vendors/flot.orderbars/js/jquery.flot.orderBars.js"></script>
<script src="<?php echo base_url(); ?>vendors/flot-spline/js/jquery.flot.spline.min.js"></script>
<script src="<?php echo base_url(); ?>vendors/flot.curvedlines/curvedLines.js"></script>
<!-- DateJS -->
<script src="<?php echo base_url(); ?>vendors/DateJS/build/date.js"></script>
<!-- JQVMap -->
<script src="<?php echo base_url(); ?>vendors/jqvmap/dist/jquery.vmap.js"></script>
<script src="<?php echo base_url(); ?>vendors/jqvmap/dist/maps/jquery.vmap.world.js"></script>
<script src="<?php echo base_url(); ?>vendors/jqvmap/examples/js/jquery.vmap.sampledata.js"></script>
<!-- bootstrap-daterangepicker -->
<script src="<?php echo base_url(); ?>vendors/moment/min/moment.min.js"></script>
<script src="<?php echo base_url(); ?>vendors/bootstrap-daterangepicker/daterangepicker.js"></script>
<script src="<?php echo base_url(); ?>vendors/bootstrap-wysiwyg/js/bootstrap-wysiwyg.min.js"></script>
<script src="<?php echo base_url(); ?>vendors/jquery.hotkeys/jquery.hotkeys.js"></script>
<script src="<?php echo base_url(); ?>vendors/google-code-prettify/src/prettify.js"></script>

<script src="<?php echo base_url(); ?>vendors/datatables.net/js/jquery.dataTables.js"></script>
<script src="<?php echo base_url(); ?>vendors/datatables.net-bs/js/dataTables.bootstrap.js"></script>

<script src="<?php echo base_url(); ?>assets/js/jquery-ui.js"></script>
<script src="<?php echo base_url(); ?>assets/js/jquery-confirm.js"></script>
<script src="<?php echo base_url(); ?>assets/js/tabletoexcel.js"></script>
<script src="<?php echo base_url(); ?>assets/js/mask.js"></script>

<script src="<?php echo base_url(); ?>assets/js/Highcharts/highcharts.js"></script>
<script src="<?php echo base_url(); ?>assets/js/Highcharts/highcharts-3d.js"></script>
<script src="<?php echo base_url(); ?>assets/js/Highcharts/modules/data.js"></script>
<script src="<?php echo base_url(); ?>assets/js/Highcharts/modules/drilldown.js"></script>
<script src="<?php echo base_url(); ?>assets/js/Highcharts/exporting.js"></script>

<script src="<?php echo base_url(); ?>assets/js/monthpicker/MonthPicker.min.js"></script>
<script src="<?php echo base_url(); ?>assets/js/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/js/Chosen/docsupport/prism.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo base_url(); ?>assets/js/Chosen/docsupport/init.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo base_url(); ?>assets/js/Hotkeys/jquery.hotkeys.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo base_url(); ?>assets/js/select.js" type="text/javascript" charset="utf-8"></script>

<script src="<?php echo base_url(); ?>assets/js/contextmenu.js" type="text/javascript" charset="utf-8"></script>

<script src="<?php echo base_url(); ?>assets/js/contextmenu2.js" type="text/javascript" charset="utf-8"></script>

<script src="<?php echo base_url(); ?>assets/autocomplete/jquery.auto-complete.js" type="text/javascript" charset="utf-8"></script>

<script src="<?php echo base_url(); ?>assets/js/leaflet/leaflet.js"></script>

<script src="<?php echo base_url(); ?>assets/js/custom_user.js"></script>
<!-- Custom Theme Scripts -->
<script src="<?php echo base_url(); ?>build/js/custom.min.js"></script>



<script>
    //This page is a result of an autogenerated content made by running test.html with firefox.

var tbl_masterquery = $('#tbl_masterquery_rev');

if(tbl_masterquery.length){
    function domo(){
        jQuery('#platform-details').html('<code>' + navigator.userAgent + '</code>');
        
        var elements = [
            // "esc","tab","space","return","backspace","scroll","capslock","numlock","insert","home","del","end","pageup","pagedown",
            // "left","up","right","down",
            // "f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12",
            // "1","2","3","4","5","6","7","8","9","0",
            // "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
            // "Ctrl+a","Ctrl+b","Ctrl+c","Ctrl+d","Ctrl+e","Ctrl+f","Ctrl+g","Ctrl+h","Ctrl+i","Ctrl+j","Ctrl+k","Ctrl+l","Ctrl+m",
            // "Ctrl+n","Ctrl+o","Ctrl+p","Ctrl+q","Ctrl+r","Ctrl+s","Ctrl+t","Ctrl+u","Ctrl+v","Ctrl+w","Ctrl+x","Ctrl+y","Ctrl+z",
            // "Shift+a","Shift+b","Shift+c","Shift+d","Shift+e","Shift+f","Shift+g","Shift+h","Shift+i","Shift+j","Shift+k","Shift+l",
            // "Shift+m","Shift+n","Shift+o","Shift+p","Shift+q","Shift+r","Shift+s","Shift+t","Shift+u","Shift+v","Shift+w","Shift+x",
            // "Shift+y","Shift+z",
            // "Alt+a","Alt+b","Alt+c","Alt+d","Alt+e","Alt+f","Alt+g","Alt+h","Alt+i","Alt+j","Alt+k","Alt+l",
            // "Alt+m","Alt+n","Alt+o","Alt+p","Alt+q","Alt+r","Alt+s","Alt+t","Alt+u","Alt+v","Alt+w","Alt+x","Alt+y","Alt+z",
            // "Ctrl+esc","Ctrl+tab","Ctrl+space","Ctrl+return","Ctrl+backspace","Ctrl+scroll","Ctrl+capslock","Ctrl+numlock",
            // "Ctrl+insert","Ctrl+home","Ctrl+del","Ctrl+end","Ctrl+pageup","Ctrl+pagedown","Ctrl+left","Ctrl+up","Ctrl+right",
            // "Ctrl+down",
            // "Ctrl+f1","Ctrl+f2","Ctrl+f3","Ctrl+f4","Ctrl+f5","Ctrl+f6","Ctrl+f7","Ctrl+f8","Ctrl+f9","Ctrl+f10","Ctrl+f11","Ctrl+f12",
            // "Shift+esc","Shift+tab","Shift+space","Shift+return","Shift+backspace","Shift+scroll","Shift+capslock","Shift+numlock",
            // "Shift+insert","Shift+home","Shift+del","Shift+end","Shift+pageup","Shift+pagedown","Shift+left","Shift+up",
            // "Shift+right","Shift+down",
            // "Shift+f1","Shift+f2","Shift+f3","Shift+f4","Shift+f5","Shift+f6","Shift+f7","Shift+f8","Shift+f9","Shift+f10","Shift+f11","Shift+f12",
            // "Alt+esc","Alt+tab","Alt+space","Alt+return","Alt+backspace","Alt+scroll","Alt+capslock","Alt+numlock",
            // "Alt+insert","Alt+home","Alt+del","Alt+end","Alt+pageup","Alt+pagedown","Alt+left","Alt+up","Alt+right","Alt+down",
            // "Alt+f1","Alt+f2","Alt+f3","Alt+f4","Alt+f5","Alt+f6","Alt+f7","Alt+f8","Alt+f9","Alt+f10","Alt+f11","Alt+f12"
            "Ctrl+s","f1","f2","f3","f4","f5","f6","f7","Ctrl+x","Ctrl+i","Ctrl+d","Ctrl+e","Ctrl+q"
        ];
        
        // the fetching...
        $.each(elements, function(i, e) { // i is element index. e is element as text.
           var newElement = ( /[\+]+/.test(elements[i]) ) ? elements[i].replace("+","_") : elements[i];
           
           // Binding keys
           $(document).bind('keydown', elements[i], function assets() {
               //$('#_'+ newElement).addClass("dirty");
               if(newElement == "Ctrl_s"){
                  $('#saveasnewrecord').trigger('click');
               }
               if(newElement == "f1"){
                  $('#toexcel1').trigger('click');
               }
               if(newElement == "f2"){
                  $('#toexcel2').trigger('click');
               }
               if(newElement == "f3"){
                  $('#toexcel3').trigger('click');
               }
               if(newElement == "f4"){
                  $('#toexcel4').trigger('click');
               }
               if(newElement == "f5"){
                  $('#toexcel5').trigger('click');
               }
               if(newElement == "f6"){
                  $('#toexcel6').trigger('click');
               }
               if(newElement == "f7"){
                  $('#toexcel7').trigger('click');
               }
               if(newElement == "Ctrl_e"){
                  $('#exporttoexcel').trigger('click');
               }
               if(newElement == "Ctrl_i"){
                  $('#addfamiec').trigger('click');
               }
               if(newElement == "Ctrl_d"){
                  $('#adddamass').trigger('click');
               }
               if(newElement == "Ctrl_x"){
                  $('#addcasualtybtn').trigger('click');
               }
               if(newElement == "Ctrl_q"){
                  $('#addfamoec').trigger('click');
               }

               return false;
           });
        });
        
    }
    
    jQuery(document).ready(domo);
}
</script>

</div>
</div>
</div>
<footer style="background-color: #fff">
    <div class="pull-right">
        DSWD DRMD - All Rights Reserved
        <?= date("Y"); ?>
    </div>
    <div class="clearfix"></div>
</footer>
</body>

</html>