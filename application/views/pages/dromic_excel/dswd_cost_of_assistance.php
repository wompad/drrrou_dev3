<div id="assistance" class="tab-pane fade">
		<div class="col-md-12" style="margin-top:10px">
			<label><i class="fa fa-info-circle"></i>Reminders: Double click each entry to update/edit.</label>
		</div>
	<div class="col-md-12">
  	<div class="col-md-5 bg-white">
  		<div class="x_panel">
  			<div class="x-title green"><h2><strong>DSWD Food and Non-Food Assistance to LGU</strong></h2></div>
          <div class="clearfix"></div>
          <div class="x-content">
            <div class="dashboard-widget-content" style="text-align:justify">
              <div class="col-md-12 form-group">
            		<select class="form-control" id="provinceAssistance">
          				<option value="">--- Select Province ---</option>
          			</select>
              </div>
              <div class="form-group col-md-12">
            		<select class="form-control" id="cityAssistance">
            			<option value="">-- Select City/Municipality --</option>
            		</select>
            	</div>
          		<div class="col-md-6 xdisplay_inputx form-group has-feedback">
								<label> Augmentation Date </label>
                <input type="text" class="form-control has-feedback-left" id="single_cal3" placeholder="Augmentation Date" aria-describedby="inputSuccess2Status3">
                <span class="fa fa-calendar-o form-control-feedback left" aria-hidden="true"></span>
                <span id="inputSuccess2Status3" class="sr-only">(success)</span>
              </div>
              <div class="col-md-6">
              	<label> Number of families served </label>
              	<input type="number" class="form-control" id="families_served" min="1" placeholder="Number of families served">
              </div>
            	<table class="table table-responsive col-md-12" id="tbl_ch_assistance">
      					<tbody>
      						<tr>
      							<td colspan="4">
      								<center><strong>---- Select Food and Non-Food Assistance ----</strong></center>
      							</td>
      						</tr>
      						<tr>
      							<td style="width:50%">
      								<div class="form-group col-md-12">
					              		<input type="text" class="form-control" id="fnfiassistance" name="fnfiassistance" placeholder="Food and Non-Food">
					              	</div>
      							</td>
      							<td>
      								<div class="form-group col-md-12">
					              		<input type="number" id="fnficost" class="form-control" placeholder="Cost" min="1">
					              	</div>
      							</td>
      							<td>
      								<div class="form-group col-md-12">
					              		<input type="number" id="fnfiquantity" class="form-control" placeholder="Quantity" min="1">
					              	</div>
      							</td>
      							<td style="vertical-align:middle"> <button type="button" class="btn btn-primary btn-xs" id="addasstfnfi"><span class="fa fa-plus-circle"></button> </td>
      						</tr> 
      					</tbody>
  						</table>
      				<table class="table table-responsive col-md-12" id="tbl_assistance_list" style="margin-top:-35px">
      					<thead>
      						<tr>
      							<td colspan="4">
      								<center><strong>List of Food and Non-Food Assistance to be provided...</strong></center>
      							</td>
      						</tr>
      						<tr>
      							<th style="width:50%">
      								Item
      							</th>
      							<th style="width:15%">
      								Cost
      							</th>
      							<th style="width:15%; text-align:right">
      								Quantity
      							</th>
      							<th style="width:15%; text-align:right">
      								Sub-total
      							</th>
      							<td style="width:5%"> </td>
      						</tr>
      					</thead>
      					<tbody>
      					</tbody>
      					<tfoot>
      						<tr>
      							<th style="width:50%; font-size:20px; text-align:left"> Total </th> 
      							<th colspan="3" style="font-size:20px; text-align:right">
      								₱ <span id="fnfi_running_total">0</span>
      							</th>
      							<th> </th>
      						</tr>
      					</tfoot>
      				</table>
      				<div class="form-group col-md-12">
      					<textarea class="form-control" placeholder="Remarks" id="fnfi_remarks"></textarea>
      				</div>
      				<div class="form-group col-md-12">
      					<button type="button" class="btn btn-success pull-right btn-sm" id="saveassistance"> <i class="fa fa-plus-circle"></i> Save Assistance </button>
      				</div>
            </div>
          </div>
  		</div>
  	</div>
  	<div class="col-md-7 bg-white">
  		<br>
  		<div class="pull-right">
				<label style="font-size:15px">Total Number of Family Food Packs Augmented: <span id="totffps"> </span> </label><br>
				<label style="font-size:15px">Total Amount of Family Food Packs Augmented: <span id="amtffps"> </span> </label><br>
				<label style="font-size:15px">Total Amount of Other Food and Non-Food Items: <span id="amtnfi"> </span> </label>
  		</div>
  		<br>
  		<div class="x_panel">
  			<div class="x-title green">
  				<h2>
  					<strong>LGUs Provided with Food and Non-Food Asssitance</strong>
  				</h2>
  			</div>
        <div class="clearfix"></div>
        <div class="x-content">
          <div class="dashboard-widget-content" style="text-align:justify">
          		<table class="table table-responsive table-hover table-striped" id="lgu_list_assistance">
          			<thead>
          				<tr>
            				<th> Province/City/Municipality </th>
            				<th> Food and Non-Food Assistance </th>
            				<th style="text-align:right"> Quantity</th>
            				<th style="text-align:right"> Cost</th>
            				<th style="text-align:right"> Date Augmented </th>
            				<th style="text-align:right"> Amount </th>
            				<th style="text-align:center"></th>
            			</tr>
          			</thead>
          			<tbody>
          			</tbody>
          		</table>
          </div>
        </div>
      </div>
  	</div>
  </div>
</div>