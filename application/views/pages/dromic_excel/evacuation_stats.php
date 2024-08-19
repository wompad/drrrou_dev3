<div id="evacuation_stats" class="tab-pane fade">
	<div class="col-md-12" style="margin-top:10px">
		<label><i class="fa fa-info-circle"></i> Reminders: Double click each entry to update/edit.</label>
	</div>
	<div class="col-md-3 pull-right" id="count_ec" style="font-weight:bold; font-size: 15px"></div>
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  	<div class="col-md-12" id="tbl_evac_stats" style="border:1px solid gray">
  		<table style="width:100%;">
    		<thead>
    			<tr>
    				<th style="text-align:center; font-weight:lighter; color: #000" colspan="12">Department of Social Welfare and Development</th>
    			</tr>
    			<tr>
    				<th style="text-align:center; color: #000" colspan="12"><b>DISASTER RESPONSE, OPERATIONS, MONITORING AND INFORMATION CENTER</b></th>
    			</tr>
    			<tr>
    				<th style="text-align:center; font-weight:lighter; color: #000" colspan="12">Batasan Pambansa Complex, Constitution Hills</th>
    			</tr>
    			<tr>
    				<th style="text-align:center; font-weight:lighter; color: #000" colspan="12">Quezon City</th>
    			</tr>
    			<tr>
    				<th style="text-align:center; font-weight:lighter; color: #000" colspan="12"><br></th>
    			</tr>
    			<tr>
    				<th style="text-align:center; color: #000" colspan="12"><b>STATUS OF EVACUATION CENTERS</b></th>
    			</tr>
    			<tr>
    				<th style="text-align:center; font-weight:lighter; color: #000" id="asofdate_IEC" colspan="12">As of: </th>
    			</tr>
    			<tr>
    				<th style="text-align:center; font-weight:lighter; color: #000" id="asoftime_IEC" colspan="12">Time: </th>
    			</tr>
    			<tr>
    				<th style="text-align:left; font-weight:lighter; color: #000" colspan="12">Region:<b> <script>document.write(`${REGION}`)</script> </b> </th>
    			</tr>
    			<tr>
    				<th style="text-align:left; font-weight:lighter; color: #000" id="disastertype_IEC" colspan="12"></th>
    			</tr>
    			<tr>
    				<th style="text-align:left; font-weight:lighter; color: #000" id="disasterdate_IEC" colspan="12"></th>
    			</tr>
    		</thead>
    		<tbody>
    		</tbody>
    	</table>
  		<table style="width:100%" id="evac_stats">
  			<thead>
  				<tr>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000" rowspan="3">PLACE OF EVACUATION CENTER<br>Province/City/Municipality</th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000" rowspan="2" colspan="2">No of ECs'</th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000" rowspan="3">BRGY LOCATED (EC)</th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000" rowspan="3">NAME OF EVACUATION CENTER</th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000" colspan="4">NUMBER SERVED</th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000" rowspan="3">BRGY LOCATED (EVACUEES)</th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000" rowspan="3">STATUS OF EC<br>(Newly-Opened/Re-opened/<br>Activated/Existing/Closed)</th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000" rowspan="3">REMARKS</th>
  				</tr>
  				<tr>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000" colspan="2">Families</th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000" colspan="2">Persons</th>
  				</tr>
  				<tr>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000">Cum</th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000">Now</th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000">Cum</th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000">Now</th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000">Cum</th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000">Now</th>
  				</tr>		
  			</thead>
  			<tbody>
  				<tr style="background-color:red; color:#fff">
  					<th style="border: 1px solid #000; text-align:left; padding:2px;"><b><script>document.write(`${REGION}`)</script></b></th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px" id="caraga_ec_cum"></th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px" id="caraga_ec_now"></th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px"></th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px" id="caraga_fam_cum"></th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px" id="caraga_fam_now"></th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px" id="caraga_per_cum"></th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px" id="caraga_per_now"></th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px"></th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px"></th>
  					<th style="border: 1px solid #000; text-align:center; padding:2px"></th>
  				</tr>
  			</tbody>
  			<tfoot>
				<tr>
					<td colspan="12" style="border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000"><center><strong>**** NOTHING FOLLOWS ****</strong></center></td>
				</tr>
				<tr>
    				<th style="text-align:center; font-weight:lighter" colspan="11"> </th>
    			</tr>
				<tr>
    				<th style="text-align:center; font-weight:bolder; color: #000" colspan="4">Prepared by: </th>
    				<th style="text-align:center; font-weight:bolder; color: #000" colspan="4">Recommended by: </th>
    				<th style="text-align:center; font-weight:bolder; color: #000" colspan="4">Approved by: </th>
    			</tr>
    			<tr>
    				<th style="text-align:center; font-weight:lighter; color: #000" colspan="12"> </th>
    			</tr>
    			<tr>
    				<th style="text-align:center; font-weight:bolder; color: #000" colspan="4" id="spreparedby2"></th>
    				<th style="text-align:center; font-weight:bolder; color: #000" colspan="4" id="srecommendedby2"></th>
    				<th style="text-align:center; font-weight:bolder; color: #000" colspan="4" id="sapprovedby2"></th>
    			</tr>
    			<tr>
    				<th style="text-align:center; font-weight:bolder; color: #000" colspan="4" id="spreparedbypos2"></th>
    				<th style="text-align:center; font-weight:bolder; color: #000" colspan="4" id="srecommendedbypos2"></th>
    				<th style="text-align:center; font-weight:bolder; color: #000" colspan="4" id="sapprovedbypos2"></th>
    			</tr>
			</tfoot>
  		</table>
  	</div>	
	</div>
</div>