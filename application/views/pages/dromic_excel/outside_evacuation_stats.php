<div id="evacuation_stats_outside" class="tab-pane fade">
	<br>
	<div class="col-md-12" style="margin-top:10px">
		<label><i class="fa fa-info-circle"></i> Reminders: Double click each entry to update/edit.</label>
	</div>
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="border:1px solid gray;" id="tbl_evacuation_stats_outside">
    <table style="width:100%;">
  		<thead>
  			<tr>
  				<th colspan="7" style="text-align:center; font-weight:lighter">Department of Social Welfare and Development</th>
  			</tr>
  			<tr>
  				<th colspan="7" style="text-align:center;"><b>DISASTER RESPONSE, OPERATIONS, MONITORING AND INFORMATION CENTER</b></th>
  			</tr>
  			<tr>
  				<th colspan="7" style="text-align:center; font-weight:lighter">Batasan Pambansa Complex, Constitution Hills</th>
  			</tr>
  			<tr>
  				<th colspan="7" style="text-align:center; font-weight:lighter">Quezon City</th>
  			</tr>
  			<tr>
  				<th colspan="7" style="text-align:center; font-weight:lighter"><br></th>
  			</tr>
  			<tr>
  				<th colspan="7" style="text-align:center;"><b>STATUS OF OUTSIDE EVACUATION CENTERS</b></th>
  			</tr>
  			<tr>
  				<th colspan="7" style="text-align:center; font-weight:lighter" id="asofdate_OEC">As of: </th>
  			</tr>
  			<tr>
  				<th colspan="7" style="text-align:center; font-weight:lighter" id="asoftime_OEC">Time: </th>
  			</tr>
  			<tr>
  				<th colspan="7" style="text-align:left; font-weight:lighter">Region:<b> <script>document.write(`${REGION}`)</script> </b> </th>
  			</tr>
  			<tr>
  				<th colspan="7" style="text-align:left; font-weight:lighter" id="disastertype_OEC"></th>
  			</tr>
  			<tr>
  				<th colspan="7" style="text-align:left; font-weight:lighter" id="disasterdate_OEC"></th>
  			</tr>
  		</thead>
  		<tbody>
  		</tbody>
  	</table>
		<table style="width:100%" id="evac_stats_outside">
			<thead>
				<tr>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px; width:30%" rowspan="3">HOST LGU<br>Province/City/Municipality</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" rowspan="3">BARANGAY</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="4">NUMBER SERVED</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" rowspan="3">PLACE OF ORIGIN</th>
				</tr>
				<tr>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">Families</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">Persons</th>
				</tr>
				<tr>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">Cum</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">Now</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">Cum</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">Now</th>
				</tr>		
			</thead>
			<tbody>
				<tr style="background-color:red; color:#fff">
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:left; padding:2px;"><b><script>document.write(`${REGION}`)</script></b></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="caraga_brgy_num_o"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="caraga_fam_cum_o"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="caraga_fam_now_o"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="caraga_per_cum_o"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="caraga_per_now_o"></th>
				</tr>
			</tbody>
			<tfoot>
			<tr>
				<th colspan="7" style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px;"> <center>*** NOTHING FOLLOWS ***</center></th>
			</tr>
    		<tr>
  				<th style="text-align:center; font-weight:lighter" colspan="7"> </th>
  			</tr>
			<tr>
  				<th style="text-align:center; font-weight:bolder" colspan="1">Prepared by: </th>
  				<th style="text-align:center; font-weight:bolder" colspan="3">Recommended by: </th>
  				<th style="text-align:center; font-weight:bolder" colspan="3">Approved by: </th>
  			</tr>
  			<tr>
  				<th style="text-align:center; font-weight:lighter" colspan="7"> </th>
  			</tr>
  			<tr>
  				<th style="text-align:center; font-weight:bolder" colspan="1" id="spreparedby3"></th>
  				<th style="text-align:center; font-weight:bolder" colspan="3" id="srecommendedby3"></th>
  				<th style="text-align:center; font-weight:bolder" colspan="3" id="sapprovedby3"></th>
  			</tr>
  			<tr>
  				<th style="text-align:center; font-weight:bolder" colspan="1" id="spreparedbypos3"></th>
  				<th style="text-align:center; font-weight:bolder" colspan="3" id="srecommendedbypos3"></th>
  				<th style="text-align:center; font-weight:bolder" colspan="3" id="sapprovedbypos3"></th>
  			</tr>
		</tfoot>
		</table>	
	</div>
</div>