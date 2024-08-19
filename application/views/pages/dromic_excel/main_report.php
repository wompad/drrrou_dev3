<div id="home" class="tab-pane fade in active">
	<div class="col-md-8" style="color:#000; font-weight: bold; margin-top: 10px; font-size: 15px">
		<label class="green">Report notes:</label> <br>
		<label class="red" style="font-size:13px">
			1.) Right-click in each city/municipality to toggle menu. 
				<ul>
					<li>Update Cost of Assistance from LGUs</li>
					<li>Update Total Affected Families</li> 
					<li>Add/Update DSWD Assistance Data</li>
					<li>Add/Update House Damages Data</li>
				</ul>
			2.) Right-click in each evacuation center to update evacuation center data.
		</label>
	</div>
	<div class="col-md-4 pull-right" style="color:#000; font-weight: bold; margin-top: 10px; font-size: 15px">
			Number of affected municipalities: <label id="count_allmunis"></label><br>
			Number of affected cities: <label id="count_allcity"></label>
	</div>
	<div class="col-md-12" style="border:1px solid gray; " id="tbl_masterquery_revs">
  	<table style="width:100%; font-size: 11px; font-family: Arial" id="tbl_masterquery_rev" class="tbl_masterquery_revs">
  		<thead>
  			<tr>
  				<th style="vertical-align: middle; text-align:center; font-weight:lighter; color: #000" colspan="27">Department of Social Welfare and Development</th>
  			</tr>
  			<tr>
  				<th style="vertical-align: middle; text-align:center; color: #000" colspan="27"><b>DISASTER RESPONSE, OPERATIONS, MONITORING AND INFORMATION CENTER</b></th>
  			</tr>
  			<tr>
  				<th style="vertical-align: middle; text-align:center; font-weight:lighter; color: #000" colspan="27">Batasan Pambansa Complex, Constitution Hills</th>
  			</tr>
  			<tr>
  				<th style="vertical-align: middle; text-align:center; font-weight:lighter; color: #000" colspan="27">Quezon City</th>
  			</tr>
  			<tr>
  				<th style="vertical-align: middle; text-align:center; font-weight:lighter; color: #000" colspan="27"><br></th>
  			</tr>
  			<tr>
  				<th style="vertical-align: middle; text-align:center; color: #000" colspan="27"><b>STATUS OF DISASTER OPERATIONS</b></th>
  			</tr>
  			<tr>
  				<th style="vertical-align: middle; text-align:center; font-weight:lighter; color: #000" id="asofdate" colspan="27">As of: </th>
  			</tr>
  			<tr>
  				<th style="vertical-align: middle; text-align:center; font-weight:lighter; color: #000" id="asoftime" colspan="27">Time: </th>
  			</tr>
  			<tr>
  				<th style="vertical-align: middle; text-align:left; font-weight:lighter; color: #000" colspan="27">Region:<b> <script>document.write(`${REGION}`)</script> </b> </th>
  			</tr>
  			<tr>
  				<th style="vertical-align: middle; text-align:left; font-weight:lighter; color: #000" id="disastertype" colspan="27"></th>
  			</tr>
  			<tr>
  				<th style="vertical-align: middle; text-align:left; font-weight:lighter; color: #000" id="disasterdate" colspan="27"></th>
  			</tr>
  			<tr>
				<td rowspan="3" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000">
					<b>AFFECTED AREAS</b>
				</td>
				<td rowspan="4" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000;">
					<b>BARANGAYS</b>
				</td>
				<td rowspan="4" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000;">
					<b>EVACUATION CENTERS</b>
				</td>
				<td rowspan="3" colspan="3" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000">
					<b>NUMBER OF AFFECTED</b>
				</td>
				<td rowspan="3" colspan="2" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000">
					<b>NUMBER OF ECs</b>
				</td>
				<td colspan="12" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000">
					<b>TOTAL NUMBER SERVED</b>
				</td>
				<td rowspan="3" colspan="3" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000; padding:0px">
					<b>NO. OF DAMAGED HOUSES</b>
				</td>
				<td rowspan="3" colspan="4" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000">
					<b>TOTAL COST OF ASSISTANCE (PhP)</b>
				</td>
			</tr>
			<tr>
				<td colspan="4" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000">
					<b>INSIDE EC</b>
				</td>
				<td colspan="4" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000">
					<b>OUTSIDE EC</b>
				</td>
				<td colspan="4" style="vertical-align: middle; text-align:center; border:1px solid #000; background-color: #B6DDE8; color: #000">
					<b>TOTAL SERVED</b>
				</td>
			</tr>
			<tr>
				<td colspan="2" style="vertical-align: middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Families </td>
				<!-- <td colspan="2" style="vertical-align: middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Persons Actual </td> -->
				<td colspan="2" style="vertical-align: middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Persons </td>
				<td colspan="2" style="vertical-align: middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Families </td>
				<td colspan="2" style="vertical-align: middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Persons </td>
				<td colspan="2" style="vertical-align: middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Families </td>
				<td colspan="2" style="vertical-align: middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Persons </td>
			</tr>
			
			<tr>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Province/<br>City/Municipality </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Brgys. </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Families </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Persons </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Cum </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Now </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Cum </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Now </td>
				<!-- <td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Cum </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Now </td> -->
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Cum </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Now </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Cum </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Now </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Cum </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Now </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Cum </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Now </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Cum </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Now </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Total </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Totally </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> Partially </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> DSWD </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> LGU </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> NGOs/OTHERS </td>
				<td style="vertical-align:middle; text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> GRAND TOTAL </td>
			</tr>
			<tr>
				<td style="background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000"><b><script>document.write(`${REGION}`)</script></b></td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000"></td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000"></td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalbrgy"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalfamily"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalperson"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalec_cum"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalec_now"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalinsideec_fam_cum"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalinsideec_fam_now"> </td>
				<!-- <td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalinsideec_person_cum_a"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalinsideec_person_now_a"> </td> -->
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalinsideec_person_cum"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalinsideec_person_now"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totaloutisideec_fam_cum"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totaloutisideec_fam_now"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totaloutsideec_person_cum"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totaloutsideec_person_now"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalserved_fam_cum"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalserved_fam_now"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalserved_person_cum"> </td>
				<td style="text-align:center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="totalserved_person_now"> </td>
				<td style="text-align: center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="tott_damaged"> </td>
				<td style="text-align: center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="tot_damaged"> </td>
				<td style="text-align: center; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="part_damaged"> </td>
				<td style="text-align: right; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="tdswd_asst"> </td>
				<td style="text-align: right; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="tlgu_asst"> </td>
				<td style="text-align: right; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="tngo_asst"> </td>
				<td style="text-align: right; font-weight:bold; background-color:red; color:#fff; border:1px solid #000; background-color: #B6DDE8; color: #000" id="ttotal_asst"> </td>
			</tr>
  		</thead>
  		<tbody>
  		</tbody>
  		<tfoot>
			<tr>
				<td colspan="27" style="text-align:center; font-weight:bold; border:1px solid #000; background-color: #B6DDE8; color: #000"> *** NOTHING FOLLOWS ***</td>
			</tr>
			<tr>
  				<th style="text-align:center; font-weight:lighter" colspan="27"> </th>
  			</tr>
  			<tr>
  				<th style="text-align:center; font-weight:bolder; color: #000" colspan="8">Prepared by: </th>
  				<th style="text-align:center; font-weight:bolder; color: #000" colspan="10">Recommended by: </th>
  				<th style="text-align:center; font-weight:bolder; color: #000" colspan="11">Approved by: </th>
  			</tr>
  			<tr>
  				<th style="text-align:center; font-weight:lighter" colspan="27"> </th>
  			</tr>
  			<tr>
  				<th style="text-align:center; font-weight:bolder; color: #000" colspan="8" id="spreparedby"></th>
  				<th style="text-align:center; font-weight:bolder; color: #000" colspan="10" id="srecommendedby"></th>
  				<th style="text-align:center; font-weight:bolder; color: #000" colspan="11" id="sapprovedby"></th>
  			</tr>
  			<tr>
  				<th style="text-align:center; font-weight:bolder; color: #000" colspan="8" id="spreparedbypos"></th>
  				<th style="text-align:center; font-weight:bolder; color: #000" colspan="10" id="srecommendedbypos"></th>
  				<th style="text-align:center; font-weight:bolder; color: #000" colspan="11" id="sapprovedbypos"></th>
  			</tr>
		</tfoot>
  	</table>
  </div>
</div>