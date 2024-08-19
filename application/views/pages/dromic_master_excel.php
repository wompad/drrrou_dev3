<script>
	var REGION = "CARAGA";
</script>

<div id="snackbar">Table copied to clipboard...</div>

<div class="row">

	<?php
		include('dromic_excel/navigation/dromic_top_navigation.php');
	?>

	<div style="left:50%; top:45%; position:fixed; z-index:99999; background-color:#304456; padding-top:20px; padding-bottom:20px; padding-left:50px; padding-right:45px; border-radius:5px; color:#fff" id="loader">
    	<center>
    		<div class="loader"></div>
    	</center>
    	Loading data...
  </div>

	<div class="tab-content">
		<br>

		<?php
			include('dromic_excel/navigation/dromic_secondary_navigation.php');
		?>

		<?php
			include('dromic_excel/secondary_report_summary.php');
		?>

	  <!-- Disaster Map -->
	  <?php
			include('dromic_excel/disaster_map.php');
		?>

	  <!-- Narrative Report -->
	  <div id="narrative" class="tab-pane fade">
  		<iframe src="" style="width: 100%; height: 1500px; border: 0px; background-color: #F7F7F7; margin-top: 20px" id="frame_narrative_report">	
  		</iframe>
	  </div>

	  <!-- Main Report Summary -->
	  <?php
			include('dromic_excel/main_report.php');
		?>

	  <div id="menu1" class="tab-pane fade">
		    <h3>Menu 1</h3>
		    <p>Some content in menu 1.</p>
	  </div>

	  <!-- Inside Evacuation Center -->
	  <?php
			include('dromic_excel/evacuation_stats.php');
		?>

	  <!-- Outside Evacuation Center -->
	  <?php
			include('dromic_excel/outside_evacuation_stats.php');
		?>

	  <!-- Sex Disaggregated Data -->
	  <?php
			include('dromic_excel/sex_disaggregated_data.php');
		?>

	  <!-- Casualties not used anymore -->
	  <?php
			include('dromic_excel/casualties.php');
		?>

	  <!-- Damaged Houses -->
		<?php
			include('dromic_excel/status_of_damages.php');
		?>

		<!-- DSWD Assistance -->
		<?php
			include('dromic_excel/dswd_cost_of_assistance.php');
		?>

		<!-- Damages Per Brgy -->
		<?php
			include('dromic_excel/damages_per_brgy.php');
		?>

		<div id="viewchart" class="tab-pane fade">
	 		<div class="col-md-12" style="margin-top:20px; width:100%;">
	 			<div class="col-md-12 bg-white" id="dromic_chart" style="height: 600px">
		 		</div>
	 		</div>
	 		<div class="col-md-12" style="margin-top:20px; width:100%;">
	 			<div class="col-md-12 bg-white" id="dromic_chart_2" style="height: 600px">
		 		</div>
	 		</div>
		</div>
	</div>
	<ul class='custom-menu'>
	  <li data-action = "first">First thing</li>
	  <li data-action = "second">Second thing</li>
	  <li data-action = "third">Third thing</li>
	</ul>
	<?php
		include('modals/modals.php');
	?>
</div>
	