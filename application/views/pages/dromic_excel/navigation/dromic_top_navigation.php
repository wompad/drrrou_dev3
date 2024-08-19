<ul class="nav nav-tabs">
  <li class="active"><a data-toggle="tab" class="btn btn-sm btn-danger tabpill" href="#home" style="border-radius:0px; color:#fff; border-radius: 5px; padding: 5px; font-size: 15px" id="toexcel1">Form 1 (Main Report - F1)</a></li>
  <li><a data-toggle="tab" href="#home2" class="btn btn-sm btn-danger tabpill" style="border-radius:0px; color:#fff; border-radius: 5px; padding: 5px; font-size: 15px" id="toexcel2">Form 1.2 (Damages and Assistance - F2)</a></li>
  <li class="dropdown">
  		<a class="dropdown-toggle btn btn-sm btn-danger tabpill" data-toggle="dropdown" href="#" style="border-radius:0px; color:#fff; border-radius: 5px; padding: 5px; font-size: 15px">  Status of Displacement <b class="caret"></b></a>
  		<ul class="dropdown-menu">
        	 <li ><a data-toggle="tab" href="#evacuation_stats" id="toexcel3" style="font-size: 15px">Form 2 - (Evacuations - F3)</a></li>
        	 <li ><a data-toggle="tab" href="#evacuation_stats_outside" id="toexcel4" style="font-size: 15px">Form 3 (Outside Evacuations - F4)</a></li>
        	 <li ><a data-toggle="tab" href="#evacuation_sex_age" id="toexcel_sex_age" style="font-size: 15px">Sex and Age Disaggregated Data</a></li>
        </ul>
  </li>
  <li><a data-toggle="tab" href="#damagesperbrgy" class="btn btn-sm btn-danger tabpill" style="border-radius:0px; color:#fff; border-radius: 5px; padding: 5px; font-size: 15px" id="toexcel7">Damages and Assistance per Barangay - F7</a></li>

  <?php if($_SESSION['isdswd'] == 't'){ ?>
  	<li><a data-toggle="tab" href="#assistance" class="btn btn-sm btn-danger tabpill" style="border-radius:0px; color:#fff; border-radius: 5px; padding: 5px; font-size: 15px" id="toexcel6">Food and Non-Food Assistance - F6</a></li>
  <?php } ?>

  <li class="dropdown">
  		<a class="dropdown-toggle btn btn-sm btn-danger tabpill" data-toggle="dropdown" href="#" style="border-radius:0px; color:#fff; border-radius: 5px; padding: 5px; font-size: 15px"> <span class="fa fa-wrench"></span> Chart and Tools <b class="caret"></b></a>
  		<ul class="dropdown-menu">
            <!-- <?php if($_SESSION['can_create_report'] == 't'){ ?> <li ><a id="addnarrativebtn" style="font-size: 15px"> <span class="fa fa-file-word-o"></span> Attach Narrative Report</a></li> <?php } ?> -->
			     <li><a id="viewcharts" data-toggle="tab" href="#viewchart" style="font-size: 15px"> <span class="fa fa-bar-chart"></span> Chart of Affected LGUs </a></li>
			     <!-- <li><a data-toggle="tab" href="#narrative" style="font-size: 15px"> <span class="fa fa-newspaper-o"></span> View Narrative Report </a></li> -->
			     <li><a id="disaster_map" data-toggle="tab" href="#disastermap" style="font-size: 15px"> <span class="fa fa-map"></span> Disaster Map</a></li>
			     <li><a id="report_summary" data-toggle="tab" href="#reportsummary" style="font-size: 15px"> <span class="fa fa-file"></span> Report Summary</a></li>
        </ul>
  </li>
</ul>
