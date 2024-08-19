

<div id="damagesperbrgy" class="tab-pane fade">
	<div class="col-md-6" style="margin-top:20px; position: sticky; position: -webkit-sticky;">
		<div class="col-md-12 bg-white">
			<h4 class="red">Damages and Assistance per Barangay</h4>
			<div class="form-group col-md-6">
				<select class="form-control" id="province_dam_per_brgy">
					<option value="">-- Select Province --</option>
	        </select>
			</div>
			<div class="form-group col-md-6">
				<select class="form-control" id="city_dam_per_brgy">
					<option value="">-- Select City/Municipality --</option>
	        </select>
			</div>

			<div class="col-md-12">
				<table class="table table-condensed table-bordered">
					<thead>
						<tr>
							<td colspan="2">
								<select class="form-control" id="brgy_dam_per_brgy">
									<option value="">-- Select Barangay --</option>
					    	</select>
							</td>
							<td colspan="2">
								<input 
								type="number" style="text-align: center" placeholder="Cost of Assistance from Barangay" class="form-control" min="0" id="costasst_brgy">
							</td>
							<th rowspan="2" style="text-align: center; vertical-align: middle;">
								Action
							</th>
						</tr>
						<tr>
							<th style="text-align: center;">Affected Families</th>
							<th style="text-align: center;">Affected Persons</th>
							<th style="text-align: center;">Totally Damaged</th>
							<th style="text-align: center;">Partially Damaged</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style="text-align: center">
								<input 
								type="number" 
								style="text-align: center" 
								placeholder="Affected Families" class="form-control" min="0" id="damperbrgy_tot_aff_fam">
							</td>
							<td style="text-align: center">
								<input 
								type="number" 
								style="text-align: center" 
								placeholder="Affected Persons" class="form-control" min="0" id="damperbrgy_tot_aff_person">
							</td>
							<td style="text-align: center">
								<input type="number" 
								style="text-align: center" 
								placeholder="Totally Damaged" class="form-control" min="0" id="damperbrgy_totally">
							</td>
							<td style="text-align: center">
								<input type="number" 
								style="text-align: center" 
								placeholder="Partially Damaged" class="form-control" min="0" id="damperbrgy_partially">
							</td>
							<td style="text-align: center">
								<button class="btn btn-danger btn-sm" onclick="savedata_dam_per_brgyQ();" id="saveBrgytoArray">
									<span class="fa fa-plus-circle"></span>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="col-md-12">
				<table class="table table-bordered table-condensed" id="tbl_damage_per_brgy_q">
					<thead>
						<tr>
							<th style="vertical-align: middle;" rowspan="3">Brgy Name</th>
							<th style="vertical-align: middle; text-align: center" rowspan="3">Brgy Assistance</th>
						</tr>
						<tr>
							<th style="vertical-align: middle; text-align: center" colspan="2">Affected</th>
							<th style="vertical-align: middle; text-align: center" colspan="2">Damaged</th>
							<th style="vertical-align: middle; text-align: center" rowspan="4">Action</th>
						</tr>
						<tr>
							<th style="vertical-align: middle; text-align: center">Families</th>
							<th style="vertical-align: middle; text-align: center">Persons</th>
							<th style="vertical-align: middle; text-align: center">Totally</th>
							<th style="vertical-align: middle; text-align: center">Partially</th>
						</tr>
					</thead>
					<tbody>
						<script>
							function populateDataDamagePerBrgy(arr){
								let tableStr = "";
								for(i = 0 ; i < arr.length ; i++){
									tableStr += `<tr>
																<td>${arr[i].brgy_name}</td>
																<td style="text-align: right">${arr[i].costasst_brgy}</td>
																<td style="text-align: center">${arr[i].tot_aff_fam}</td>
																<td style="text-align: center">${arr[i].tot_aff_person}</td>
																<td style="text-align: center">${arr[i].totally_damaged}</td>
																<td style="text-align: center">${arr[i].partially_damaged}</td>
																<td style="text-align: center">
																	<button class="btn btn-danger" onclick="removeBrgy(${i})"><span class="fa fa-trash"></span></button>
																</td>
															 </tr>
									`;
								}
								$('#tbl_damage_per_brgy_q tbody').empty().append(tableStr);
							}
							function removeBrgy(index){
								data_dam_per_brgy_arr.splice(index, 1);
								populateDataDamagePerBrgy(data_dam_per_brgy_arr);
							}
						</script>
					</tbody>
				</table>
			</div>

			<div class="col-md-12">
	 			<div class="pull-right">
	 				<button type="button" class="btn btn-success btn-sm" id="savedata_dam_per_brgy"><i class='fa fa-plus-circle'></i> Save Data</button>	
	 				<button type="button" class="btn btn-warning btn-sm" id="updatedata_dam_per_brgy" style="display: none"><i class='fa fa-edit'></i> Update Data</button>	
	 				<button type="button" class="btn btn-danger btn-sm" id="deldata_dam_per_brgy" style="display: hidden"><i class='fa fa-times-circle'></i> Remove Data</button>	
	 			</div>
 			</div>
			<div class="form-group col-md-4" style="visibility: hidden">	
				<label>Dead</label>
				<input type="number" class="form-control" placeholder="Dead" min="0" id="damperbrgy_dead">
			</div>
			<div class="form-group col-md-4" style="visibility: hidden">
				<label>Injured</label>
				<input type="number" class="form-control" placeholder="Injured" min="0" id="damperbrgy_injured">
			</div>
			<div class="form-group col-md-4" style="visibility: hidden">
				<label>Missing</label>
				<input type="number" class="form-control" placeholder="Missing" min="0" id="damperbrgy_missing">
			</div>
		</div>
	</div>
	<div class="col-md-6" style="margin-top:20px">
		<div class="col-md-12 bg-white">
			<div class="col-md-12" style="margin-top:10px"><label><i class="fa fa-info-circle"></i> Reminders: Double click each entry to update/edit.</label></div>
    	<div class="col-md-12" id="tbl_damage_assistance">
	    	<table style="width:100%;">
	    		<tbody>
	    			<table style="width:100%;" id="tbl_damages_per_brgy">
	    				<thead>
	    					<tr>
	    						<th rowspan="3" style="border:1px solid #000; text-align:center">AFFECTED AREAS <br>(Province/City/Municipality)</th>
	    						<th rowspan="3" style="border:1px solid #000; text-align:center">COST OF ASSISTANCE PROVIDED</th>
	    						<th colspan="4" style="border:1px solid #000; text-align:center">NUMBER OF</th>
	    					</tr>
	    					<tr><th colspan="2" style="border:1px solid #000; text-align:center">AFFECTED</th>
	    						<th colspan="2" style="border:1px solid #000; text-align:center">DAMAGED HOUSES</th>
	    					</tr>
	    					<tr>
	    						<th style="border:1px solid #000; text-align:center">FAMILIES</th>
	    						<th style="border:1px solid #000; text-align:center">INDIVIDUALS</th>
	    						<th style="border:1px solid #000; text-align:center">TOTALLY</th>
	    						<th style="border:1px solid #000; text-align:center">PARTIALLY</th>
	    					</tr>
	    				</thead>
	    				<tbody>
	    				</tbody>
	    			</table>
	    		</tbody>
	    	</table>
	    </div>
	</div>
	</div>
</div>