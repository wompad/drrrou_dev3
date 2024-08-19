<div id="reportsummary" class="tab-pane fade">

	<?php
		include('navigation/dromic_report_tabmenu.php');
	?>

	<div class="tab-content">
		<div id="allsummary" class="tab-pane fade in active">
			<div class="col-md-12" style="border:1px solid gray; " id="tbl_masterquery_summary">
		    	<table style="width:100%; font-size: 11px" id="tbl_masterquery_rev_summary" class="tbl_masterquery_revs">
		    		<thead>
		    			<tr>
		    				<th style="vertical-align: middle; text-align:center; font-weight:lighter; color: #000; font-family: Arial" colspan="25">Department of Social Welfare and Development</th>
		    			</tr>
		    			<tr>
		    				<th style="vertical-align: middle; text-align:center; color: #000; font-family: Arial" colspan="25"><b>DISASTER RESPONSE, OPERATIONS, MONITORING AND INFORMATION CENTER</b></th>
		    			</tr>
		    			<tr>
		    				<th style="vertical-align: middle; text-align:center; font-weight:lighter; color: #000; font-family: Arial" colspan="25">Batasan Pambansa Complex, Constitution Hills</th>
		    			</tr>
		    			<tr>
		    				<th style="vertical-align: middle; text-align:center; font-weight:lighter; color: #000; font-family: Arial" colspan="25">Quezon City</th>
		    			</tr>
		    			<tr>
		    				<th style="vertical-align: middle; text-align:center; font-weight:lighter; color: #000; font-family: Arial" colspan="25"><br></th>
		    			</tr>
		    			<tr>
		    				<th style="vertical-align: middle; text-align:center; color: #000; font-family: Arial" colspan="25"><b>STATUS OF DISASTER OPERATIONS</b></th>
		    			</tr>
		    			<tr>
		    				<th style="vertical-align: middle; text-align:center; font-weight:lighter; color: #000; font-family: Arial" id="asofdate_summary" colspan="25">As of: </th>
		    			</tr>
		    			<tr>
		    				<th style="vertical-align: middle; text-align:center; font-weight:lighter; color: #000; font-family: Arial" id="asoftime_summary" colspan="25">Time: </th>
		    			</tr>
		    			<tr>
		    				<th style="vertical-align: middle; text-align:left; font-weight:lighter; color: #000; font-family: Arial" colspan="25">Region:<b> <script>document.write(`${REGION}`)</script> </b> </th>
		    			</tr>
		    			<tr>
		    				<th style="vertical-align: middle; text-align:left; font-weight:lighter; color: #000; font-family: Arial" id="disastertype_summary" colspan="25"></th>
		    			</tr>
		    			<tr>
		    				<th style="vertical-align: middle; text-align:left; font-weight:lighter; color: #000; font-family: Arial" id="disasterdate_summary" colspan="25"></th>
		    			</tr>
		    			<tr>
							<th rowspan="3" style="vertical-align: middle; text-align:center; border:1px solid #000; font-family: Arial; background-color: #B6DDE8; color: #000; font-family: Arial">
								<b>AFFECTED AREAS</b>
							</th>
							<th rowspan="3" colspan="3" style="vertical-align: middle; text-align:center; border:1px solid #000; font-family: Arial; background-color: #B6DDE8; color: #000; font-family: Arial">
								<b>NUMBER OF AFFECTED</b>
							</th>
							<th rowspan="3" colspan="2" style="vertical-align: middle; text-align:center; border:1px solid #000; font-family: Arial; background-color: #B6DDE8; color: #000; font-family: Arial">
								<b>NUMBER OF ECs</b>	
							</th>
							<td colspan="12" style="vertical-align: middle; text-align:center; border:1px solid #000; font-family: Arial; background-color: #B6DDE8; color: #000; font-family: Arial">
								<b>TOTAL NUMBER SERVED</b>
							</td>
							<td rowspan="3" colspan="3" style="vertical-align: middle; text-align:center; border:1px solid #000; font-family: Arial; background-color: #B6DDE8; color: #000; font-family: Arial; padding:0px">
								<b>NO. OF DAMAGED HOUSES</b>
							</td>
							<td rowspan="3" colspan="4" style="vertical-align: middle; text-align:center; border:1px solid #000; font-family: Arial; background-color: #B6DDE8; color: #000">
								<b>TOTAL COST OF ASSISTANCE (PhP)</b>
							</td>
							</tr>
							<tr>
								<td colspan="4" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;">
									<b>INSIDE EC</b>
								</td>
								<td colspan="4" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;">
									<b>OUTSIDE EC</b>
								</td>
								<td colspan="4" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;">
									<b>TOTAL SERVED</b>
								</td>
							</tr>
							<tr>
								<td colspan="2" style="vertical-align: middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Families </td>
								<td colspan="2" style="vertical-align: middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Persons </td>
								<td colspan="2" style="vertical-align: middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Families </td>
								<td colspan="2" style="vertical-align: middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Persons </td>
								<td colspan="2" style="vertical-align: middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Families </td>
								<td colspan="2" style="vertical-align: middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Persons </td>
							</tr>
							<tr>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Province/<br>City/Municipality </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Brgys. </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Families </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Persons </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Cum </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Now </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Cum </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Now </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Cum </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Now </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Cum </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Now </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Cum </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Now </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Cum </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Now </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Cum </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Now </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Total </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Totally </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> Partially </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> DSWD </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> LGU </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> NGOs/OTHERS </td>
								<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"> GRAND TOTAL </td>
							</tr>
							<tr>
								<td style="background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;"><b><script>document.write(`${REGION}`)</script></b></td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totalbrgy_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totalfamily_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totalperson_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totalec_cum_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totalec_now_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totalinsideec_fam_cum_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totalinsideec_fam_now_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totalinsideec_person_cum_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totalinsideec_person_now_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totaloutisideec_fam_cum_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totaloutisideec_fam_now_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totaloutsideec_person_cum_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totaloutsideec_person_now_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totalserved_fam_cum_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totalserved_fam_now_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totalserved_person_cum_summary"> </td>
								<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="totalserved_person_now_summary"> </td>
								<td style="text-align: center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="tott_damaged_summary"> </td>
								<td style="text-align: center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="tot_damaged_summary"> </td>
								<td style="text-align: center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="part_damaged_summary"> </td>
								<td style="text-align: right; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="tdswd_asst_summary"> </td>
								<td style="text-align: right; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="tlgu_asst_summary"> </td>
								<td style="text-align: right; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="tngo_asst_summary"> </td>
								<td style="text-align: right; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;" id="ttotal_asst_summary"> </td>
							</tr>
		    		</thead>
		    		<tbody>
		    		</tbody>
		    		<tfoot>
							<tr>
								<td colspan="25" style="text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000; font-family: Arial;">
									 *** NOTHING FOLLOWS ***
								</td>
							</tr>
							<tr>
			    				<th style="text-align:center; font-weight:lighter" colspan="25"> </th>
			    		</tr>
		    			<tr>
		    				<th style="text-align:center; font-weight:bolder; color: #000; font-family: Arial;" colspan="8">Prepared by: </th>
		    				<th style="text-align:center; font-weight:bolder; color: #000; font-family: Arial;" colspan="9">Recommended by: </th>
		    				<th style="text-align:center; font-weight:bolder; color: #000; font-family: Arial;" colspan="8">Approved by: </th>
		    			</tr>
		    			<tr>
		    				<th style="text-align:center; font-weight:lighter" colspan="25"> </th>
		    			</tr>
		    			<tr>
		    				<th style="text-align:center; font-weight:bolder; color: #000; font-family: Arial;" colspan="8" id="spreparedby_summary"></th>
		    				<th style="text-align:center; font-weight:bolder; color: #000; font-family: Arial;" colspan="9" id="srecommendedby_summary"></th>
		    				<th style="text-align:center; font-weight:bolder; color: #000; font-family: Arial;" colspan="8" id="sapprovedby_summary"></th>
		    			</tr>
		    			<tr>
		    				<th style="text-align:center; font-weight:bolder; color: #000; font-family: Arial;" colspan="8" id="spreparedbypos_summary"></th>
		    				<th style="text-align:center; font-weight:bolder; color: #000; font-family: Arial;" colspan="9" id="srecommendedbypos_summary"></th>
		    				<th style="text-align:center; font-weight:bolder; color: #000; font-family: Arial;" colspan="8" id="sapprovedbypos_summary"></th>
		    			</tr>
						</tfoot>
		    	</table>
		  </div>
		</div>
		<div id="summary_breakdown" class="tab-pane fade" style="background-color: #ffffff">
		  	<div class="col-sm-12" id="" style="font-size:30px;">
		  		<div class="col-md-6">
		  			<button class="btn btn-default btn-sm" onclick="selectElementContents( document.getElementById('tbl_materquery_summary'));" title="Copy to clipboard">
		  				<span class="fa fa-copy"></span></button>
		  			<h4 style="color: #000">Summary of Affected Families and Persons</h4>
			  		<table id="tbl_materquery_summary" style="font-family: Arial; font-size: 11px; color: #000; width: 600px">
			  			<thead>
			  				<tr>
			  					<th rowspan="2" class="report_summary_td">PROVINCE/CITY/<br>MUNICIPALITY</th>
			  					<th colspan="3" class="report_summary_td">NUMBER OF AFFECTED</th>
			  				</tr>
			  				<tr>
			  					<th class="report_summary_td">BARANGAYS</th>
			  					<th class="report_summary_td">FAMILIES</th>
			  					<th class="report_summary_td">PERSONS</th>
			  				</tr>
			  				<tr>
			  					<th class="report_summary_td" style="text-align: left"><script>document.write(`${REGION}`)</script></th>
			  					<th class="report_summary_td" id="tbl_materquery_summary_brgy"></th>
			  					<th class="report_summary_td" id="tbl_materquery_summary_fam"></th>
			  					<th class="report_summary_td" id="tbl_materquery_summary_person"></th>
			  				</tr>
			  			</thead>
			  			<tbody>
			  			</tbody>
			  		</table>
			  	</div>
			  	<div class="col-md-6">
			  		<button class="btn btn-default btn-sm" onclick="selectElementContents( document.getElementById('tbl_evac_summary'));" title="Copy to clipboard">
		  				<span class="fa fa-copy"></span></button>
			  		<h4 style="color: #000">Summary of Displaced Families and Persons Inside ECs</h4>
			  		<table id="tbl_evac_summary" style="font-family: Arial; font-size: 11px; color: #000; width: 600px">
			  			<thead>
			  				<tr>
			  					<th rowspan="4" class="report_summary_td">PROVINCE/CITY/<br>MUNICIPALITY</th>
			  					<th rowspan="3" colspan="2" class="report_summary_td">NUMBER OF <br>EVACUATION CENTER (ECs)</th>
			  					<th colspan="4" class="report_summary_td">NUMBER OF DISPLACED</th>
			  				</tr>
			  				<tr>
			  					<th colspan="4" class="report_summary_td">INSIDE ECs</th>
			  				</tr>
			  				<tr>
			  					<th colspan="2" class="report_summary_td">FAMILIES</th>
			  					<th colspan="2" class="report_summary_td">PERSONS</th>
			  				</tr>
			  				<tr>
			  					<th class="report_summary_td">CUM</th>
			  					<th class="report_summary_td">NOW</th>
			  					<th class="report_summary_td">CUM</th>
			  					<th class="report_summary_td">NOW</th>
			  					<th class="report_summary_td">CUM</th>
			  					<th class="report_summary_td">NOW</th>
			  				</tr>
			  				<tr>
			  					<th class="report_summary_td" style="text-align: left"><script>document.write(`${REGION}`)</script></th>
			  					<th class="report_summary_td" id="tbl_evac_summary_ec_cum"></th>
			  					<th class="report_summary_td" id="tbl_evac_summary_ec_now"></th>
			  					<th class="report_summary_td" id="tbl_evac_summary_family_cum"></th>
			  					<th class="report_summary_td" id="tbl_evac_summary_family_now"></th>
			  					<th class="report_summary_td" id="tbl_evac_summary_person_cum"></th>
			  					<th class="report_summary_td" id="tbl_evac_summary_person_now"></th>
			  				</tr>
			  			</thead>
			  			<tbody>
			  			</tbody>
			  		</table>
			  	</div>
		  	</div>
		  	<div class="col-sm-12" id="" style="font-size:30px; margin-top: 10px">
		  		<div class="col-md-6">
			  		<button class="btn btn-default btn-sm" onclick="selectElementContents( document.getElementById('tbl_evac_outside_summary'));" title="Copy to clipboard">
		  				<span class="fa fa-copy"></span></button>
			  		<h4 style="color: #000">Summary of Displaced Families and Persons Outside ECs</h4>
			  		<table id="tbl_evac_outside_summary" style="font-family: Arial; font-size: 11px; color: #000; width: 600px">
			  			<thead>
			  				<tr>
			  					<th rowspan="3" class="report_summary_td">PROVINCE/CITY/<br>MUNICIPALITY</th>
			  					<th colspan="4" class="report_summary_td">NUMBER OF DISPLACED OUTSIDE ECs</th>
			  				</tr>
			  				<tr>
			  					<th colspan="2" class="report_summary_td">FAMILY</th>
			  					<th colspan="2" class="report_summary_td">PERSONS</th>
			  				</tr>
			  				<tr>
			  					<th class="report_summary_td">CUM</th>
			  					<th class="report_summary_td">NOW</th>
			  					<th class="report_summary_td">CUM</th>
			  					<th class="report_summary_td">NOW</th>
			  				</tr>
			  				<tr>
			  					<th class="report_summary_td" style="text-align: left"><script>document.write(`${REGION}`)</script></th>
			  					<th class="report_summary_td" id="tbl_evac_outside_summary_family_cum"></th>
			  					<th class="report_summary_td" id="tbl_evac_outside_summary_family_now"></th>
			  					<th class="report_summary_td" id="tbl_evac_outside_summary_person_cum"></th>
			  					<th class="report_summary_td" id="tbl_evac_outside_summary_person_now"></th>
			  				</tr>
			  			</thead>
			  			<tbody>
			  			</tbody>
			  		</table>
			  	</div>
		  		<div class="col-md-6">
		  			<button class="btn btn-default btn-sm" onclick="selectElementContents( document.getElementById('tbl_displaced_summary'));" title="Copy to clipboard">
		  				<span class="fa fa-copy"></span></button>
			  		<h4 style="color: #000">Summary of Displaced Families and Persons</h4>
			  		<table id="tbl_displaced_summary" style="font-family: Arial; font-size: 11px; color: #000; width: 600px">
			  			<thead>
			  				<tr>
			  					<th rowspan="3" class="report_summary_td">PROVINCE/CITY/<br>MUNICIPALITY</th>
			  					<th colspan="4" class="report_summary_td">NUMBER OF DISPLACED</th>
			  				</tr>
			  				<tr>
			  					<th colspan="2" class="report_summary_td">FAMILIES</th>
			  					<th colspan="2" class="report_summary_td">PERSONS</th>
			  				</tr>
			  				<tr>
			  					<th class="report_summary_td">CUM</th>
			  					<th class="report_summary_td">NOW</th>
			  					<th class="report_summary_td">CUM</th>
			  					<th class="report_summary_td">NOW</th>
			  				</tr>
			  				<tr>
			  					<th class="report_summary_td" style="text-align: left"><script>document.write(`${REGION}`)</script></th>
			  					<th class="report_summary_td" id="tbl_displaced_summary_family_cum"></th>
			  					<th class="report_summary_td" id="tbl_displaced_summary_family_now"></th>
			  					<th class="report_summary_td" id="tbl_displaced_summary_person_cum"></th>
			  					<th class="report_summary_td" id="tbl_displaced_summary_person_now"></th>
			  				</tr>
			  			</thead>
			  			<tbody>
			  			</tbody>
			  		</table>
			  	</div>
		  	</div>
		  	<div class="col-sm-12" style="margin-top: 10px">
		  		<div class="col-md-6">
			  		<button class="btn btn-default btn-sm" onclick="selectElementContents( document.getElementById('tbl_damaged_summary'));" title="Copy to clipboard">
		  				<span class="fa fa-copy"></span></button>
			  		<h4 style="color: #000">Summary of Damaged Houses</h4>
			  		<table id="tbl_damaged_summary" style="font-family: Arial; font-size: 11px; color: #000; width: 600px">
			  			<thead>
			  				<tr>
			  					<th rowspan="2" class="report_summary_td">PROVINCE/CITY/MUNICIPALITY</th>
			  					<th colspan="3" class="report_summary_td">NUMBER OF DAMAGED HOUSES</th>
			  				</tr>
			  				<tr>
			  					<th class="report_summary_td">TOTAL</th>
			  					<th class="report_summary_td">TOTALLY</th>
			  					<th class="report_summary_td">PARTIALLY</th>
			  				</tr>
			  				<tr>
			  					<th class="report_summary_td" style="text-align: left"><script>document.write(`${REGION}`)</script></th>
			  					<th class="report_summary_td" id="tbl_damaged_summary_tot"></th>
			  					<th class="report_summary_td" id="tbl_damaged_summary_totally"></th>
			  					<th class="report_summary_td" id="tbl_damaged_summary_patially"></th>
			  				</tr>
			  			</thead>
			  			<tbody>
			  			</tbody>
			  		</table>
			  	</div>
			  	<div class="col-md-6">
			  		<button class="btn btn-default btn-sm" onclick="selectElementContents( document.getElementById('tbl_cost_assistance_summary'));" title="Copy to clipboard">
		  				<span class="fa fa-copy"></span></button>
			  		<h4 style="color: #000">Summary of Cost of Assistance Provided</h4>
			  		<table id="tbl_cost_assistance_summary" style="font-family: Arial; font-size: 11px; color: #000; width: 600px">
			  			<thead>
			  				<tr>
			  					<th rowspan="2" class="report_summary_td">PROVINCE/CITY/MUNICIPALITY</th>
			  					<th colspan="4" class="report_summary_td">TOTAL COST OF ASSISTANCE</th>
			  				</tr>
			  				<tr>
			  					<th class="report_summary_td">DSWD</th>
			  					<th class="report_summary_td">LGU</th>
			  					<th class="report_summary_td">NGOs/OTHERS</th>
			  					<th class="report_summary_td">GRAND TOTAL</th>
			  				</tr>
			  				<tr>
			  					<th class="report_summary_td" style="text-align: left"><script>document.write(`${REGION}`)</script></th>
			  					<th class="report_summary_td" style="text-align: right; padding-right: 3px" id="tdswd_asst_summary_breakdown"></th>
			  					<th class="report_summary_td" style="text-align: right; padding-right: 3px" id="tlgu_asst_summary_breakdown"></th>
			  					<th class="report_summary_td" style="text-align: right; padding-right: 3px" id="tngo_asst_summary_breakdown"></th>
			  					<th class="report_summary_td" style="text-align: right; padding-right: 3px" id="ttotal_asst_summary_breakdown"></th>
			  				</tr>
			  			</thead>
			  			<tbody>
			  			</tbody>
			  		</table>
			  	</div>
		  	</div>
		</div>
		<div id="cost_dswd_summary" class="tab-pane fade" style="background-color: #ffffff; padding: 5px">
			<button class="btn btn-default btn-sm" onclick="selectElementContents( document.getElementById('tbl_cost_dswd_summary'));" title="Copy to clipboard"><span class="fa fa-copy"></span></button>
			<table id="tbl_cost_dswd_summary" style="font-family: Arial; font-size: 11px; color: #000; width: 1000px;">
	  			<thead>
	  			</thead>
	  			<tbody>
	  			</tbody>
	  			<tfoot>
	  			</tfoot>
	  		</table>
		</div>
		<div id="summary_sex_age_breakdown" class="tab-pane fade" style="color: #000">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="background-color: #FFF" id="tbl_evacuation_sex_age_summary">
				<button class="btn btn-default btn-sm" 
					onclick="selectElementContents( document.getElementById('tbl_sex_age_summary'));" 
					title="Copy to clipboard">
					<span class="fa fa-copy"></span>
				</button>
	  		<table style="width:100%; font-size: 10px" id="tbl_sex_age_summary">
	  			<thead>
	  				<tr>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px;" rowspan="3">PROVINCE/CITY/MUNICIPALITY</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="16">
	  					SEX AND AGE DISTRIBUTION OF IDPs CURRENTLY INSIDE ECs</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="10">
	  					SECTORAL DATA OF IDPs CURRENTLY INSIDE ECs</th>
	  				</tr>	
	  				<tr>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
	  					INFANT <br/>< 1 y/o (0-11 mos)</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
	  					TODDLERS <br/>1-3 y/o</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
	  					PRESCHOOLERS <br/>2-5 y/o</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
	  					SCHOOL AGE <br/>6-12 y/o</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
	  					TEENAGE <br/>13-19 y/o</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
	  					ADULT <br/>20-59 y/o</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
	  					SENIOR CITIZENS <br/>60 and above</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
	  					TOTAL</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="1">
	  					PREGNANT WOMEN</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="1">
	  					LACTATING MOTHER</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
	  					UNACCOMPANIED CHILDREN</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
	  					PWDs</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
	  					SOLO PARENTS</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
	  					IPs</th>
	  				</tr>	
	  				<tr>
	  					<!-- infant -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">MALE</th>
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>
	  					<!-- toddlers -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">MALE</th>
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>
	  					<!-- preschoolers -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">MALE</th>
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>
	  					<!-- schoolage -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">MALE</th>
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>
	  					<!-- teenage -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">MALE</th>
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>
	  					<!-- adult -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">MALE</th>
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>
	  					<!-- senior -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">MALE</th>
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>
	  					<!-- total -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">MALE</th>
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>

	  					<!-- pregnant -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>
	  					<!-- lactating -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>
	  					<!-- unaccompanied -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">MALE</th>
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>
	  					<!-- pwd -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">MALE</th>
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>
	  					<!-- solo parent -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">MALE</th>
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>
	  					<!-- ip -->
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">MALE</th>
	  					<th style="width: 60px; background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px">FEMALE</th>
	  				</tr>
	  				<tr id="sex_age_total_caraga_summary">
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:left; padding:2px">
	  						<script>document.write(`${REGION}`)</script>
	  					</th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="infant_male_now_c_summary"></th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="infant_female_now_c_summary"></th>

	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="toddlers_male_now_c_summary"></th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="toddlers_female_now_c_summary"></th>

	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="preschoolers_male_now_c_summary"></th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="preschoolers_female_now_c_summary"></th>

	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="schoolage_male_now_c_summary"></th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="schoolage_female_now_c_summary"></th>

	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="teenage_male_now_c_summary"></th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="teenage_female_now_c_summary"></th>

	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="adult_male_now_c_summary"></th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="adult_female_now_c_summary"></th>

	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="senior_male_now_c_summary"></th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="senior_female_now_c_summary"></th>

	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="tot_male_now_c_summary"></th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="tot_female_now_c_summary"></th>

	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="pregnant_now_c_summary"></th>

	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="lactating_mother_now_c_summary"></th>

	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="unaccompanied_minor_male_now_c_summary"></th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="unaccompanied_minor_female_now_c_summary"></th>

	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="pwd_male_now_c_summary"></th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="pwd_female_now_c_summary"></th>

	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="solo_parent_male_now_c_summary"></th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="solo_parent_female_now_c_summary"></th>

	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="ip_male_now_c_summary"></th>
	  					<th style="background-color: #B6DDE8; color: #000; border:1px solid #000; text-align:center; padding:2px" 
	  					id="ip_female_now_c_summary"></th>
	  				</tr>
	  			</thead>
	  			<tbody>
	  			</tbody>
	  		</table>	
		  </div>
		</div>
	</div>
</div>