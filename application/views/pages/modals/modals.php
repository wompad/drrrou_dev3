<div id="addfamnInside" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg" style="width:50%">
    <!-- Modal content-->
    <div class="modal-content" >
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"> <label>Add</label> <strong>Total Affected Families</strong></h4>
        </div>
        <div class="modal-body">
            <div class="row">
              	<div class="form-group col-md-12">
              		<label>
              		Reminders: Kindly fill fields correctly. Fields marked with (<i style="color:red">*</i>) are required.
              		</label>
              	</div>
            </div>
          	<div class="row">
	          	<div class="form-group col-md-6">
	          		<label> <i style="color:red">*</i>  Select Province </label>
	          		<select class="form-control" id="addfamNinsideECprov">
	          			<option value="">--- Select Province ---</option>
	          		</select>
	          	</div>
	          	<div class="form-group col-md-6">
	          		<label> <i style="color:red">*</i> Select City/Municipality </label>
	          		<select class="form-control" id="addfamNinsideECcity">
	          			<option value="">-- Select City/Municipality --</option>
	          		</select>
	          	</div>
	          	<div class="form-group col-md-4">
	          		<label> <i style="color:red">*</i>  No. of Affected Barangay </label>
	          		<input type="number" class="form-control" id="ecnbrgy" style="text-align: center">
	          	</div>
	          	<div class="form-group col-md-4">
	          		<label> <i style="color:red">*</i>  No. of Affected Family </label>
	          		<input type="number" class="form-control" id="ecnfamcum" style="text-align: center">
	          	</div>
	          	<div class="form-group col-md-4">
	          		<label> <i style="color:red">*</i>  No. of Affected Persons </label>
	          		<input type="number" class="form-control" id="ecnpercum" style="text-align: center">
	          	</div>
          	</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default btn-sm" onclick="addnFamIEC()" id="addnECS"><i class="fa fa-plus-circle"></i> Save and Close</button>
              <button type="button" class="btn btn-warning btn-sm" onclick="addnFamAECS()" id="addnAECS"><i class="fa fa-plus-circle"></i> Save and Add New Data</button>
            </div>
      	</div>
  	</div>
	</div>
</div>

<div id="addfaminsideEC" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg" style="width:50%">
      <!-- Modal content-->
    <div class="modal-content" >
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"> <label id="headertitle">Add</label> <strong>Affected Families Inside Evacuation Center</strong></h4>
      </div>
      <div class="modal-body">
        <div class="row">
          	<div class="form-group col-md-12">
          		<label>
          		Reminders: Kindly fill fields correctly. Fields marked with (<i style="color:red">*</i>) are required.
          			However, if the evacuation center already exist you can leave the (EC CUM, EC NOW and EC Status) as blank.
          		</label>
          	</div>
        </div>
        <div class="row">
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i>  Select Province </label>
        		<select class="form-control" id="addfaminsideECprov">
        			<option value="">--- Select Province ---</option>
        		</select>
        	</div>
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i> Select City/Municipality </label>
        		<select class="form-control" id="addfaminsideECcity">
        			<option value="">-- Select City/Municipality --</option>
        		</select>
        	</div>
        	<div class="form-group col-md-12">
        		<label> <i style="color:red">*</i>  Barangay Located (EC) </label>
        		<select id="brgylocated_ec" style="width: 100%">
        			<option value="">Select Barangay</option>
        		</select>
        	</div>
        	<div class="form-group col-md-12">
        		<label> <i style="color:red">*</i>  Name of Evacuation Center </label>
        		<input type="text" class="form-control" id="ecname">
        	</div>
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i>  EC CUM </label>
        		<input type="number" class="form-control" id="ecicum" min="0">
        	</div>
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i>  EC NOW </label>
        		<input type="number" class="form-control" id="ecinow" min="0">
        	</div>
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i>  Family CUM </label>
        		<input type="number" class="form-control" id="ecfamcum">
        	</div>
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i>  Family NOW </label>
        		<input type="number" class="form-control" id="ecfamnow">
        	</div>
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i>  Persons CUM </label>
        		<input type="number" class="form-control" id="ecpercum">
        	</div>
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i>  Persons NOW </label>
        		<input type="number" class="form-control" id="ecpernow">
        	</div>
        	<div class="form-group col-md-12">
        		<label> <i style="color:red">*</i>  Place of Origin (Evacuees) </label>
        		<select id="ecplaceorigin" style="width: 100%" multiple>
        		</select>
        	</div>
        	<div class="form-group col-md-12">
        		<label> EC Status </label>
        		<select class="form-control" id="ecistatus">
        			<option value="">-- Select EC Status --</option>
        			<option value="Newly-Opened">Newly-Opened</option>
        			<option value="Existing">Existing</option>
        			<option value="Closed">Closed</option>
        			<option value="Re-activated">Re-activated</option>
        		</select>
        	</div>
        	<div class="form-group col-md-12">
        		<label> Remarks: </label>
        		<input type="text" class="form-control" id="ec_remarks">
        	</div>
        </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-default btn-sm" onclick="addFamIEC()" id="addECS"><i class="fa fa-plus-circle"></i> Save and Close</button>
          <button type="button" class="btn btn-warning btn-sm" onclick="addFamAECS()" id="addAECS"><i class="fa fa-plus-circle"></i> Save Data and Add New EC</button>
          <button type="button" class="btn btn-primary btn-sm" onclick="addFamCECS()" id="addCECS"><i class="fa fa-plus-circle"></i> Save Data and continue current EC</button>
          <button type="button" class="btn btn-success btn-sm" onclick="addFamIECS()" id="addMECS"><i class="fa fa-plus-circle"></i> Save Data and continue with this municipality</button>
          <!-- <button type="button" class="btn btn-primary btn-sm" id="addCOECS"><i class="fa fa-pencil"></i> Clear Fields and Add Evacuees from Other Barangay with this EC</button> -->

          <button type="button" class="btn btn-warning btn-sm" id="updateECS"><i class="fa fa-pencil"></i> Update Data</button>
          <button type="button" class="btn btn-danger btn-sm" id="deleteECS"><i class="fa fa-remove"></i> Delete Data</button>
          <button type="button" class="btn btn-primary pull-left btn-sm" id="clearECS" title="Clear other fields except EC and add evacuees from other barangay in this EC">
          	<i class="fa fa-eraser"></i> Clear field and add evacuees in this EC
          </button>
      </div>
    </div>
  </div>
</div>

<div id="addnewReport" class="modal fade" role="dialog">
  <div class="modal-dialog modal-sm" style="width:35%">
      <!-- Modal content-->
    <div class="modal-content" >
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"></h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="form-group col-md-12">
              <label>Would you like to continue to following details before saving?</label>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div class="form-group col-md-3">
                <label style="margin-top:8px">Disaster Title</label>
              </div>
              <div class="form-group col-md-9">
                <input type="text" class="form-control" id="newreporttitle">
              </div>
          	</div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group col-md-3">
                  <label style="margin-top:8px">As of Date</label>
                </div>
                <div class="form-group col-md-9">
                  <input type="text" class="form-control" value="<?php echo date('Y-m-d') ?>" id="newreportdate">
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group col-md-3">
                  <label style="margin-top:8px">As of Time</label>
                </div>
                <div class="form-group col-md-9">
                  <input type="text" class="form-control" value="<?php echo date('H:i:s') ?>" id="newreporttime">
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group col-md-3">
                  <label style="margin-top:8px">Prepared by: </label>
                </div>
                <div class="form-group col-md-9">
                  <input type="text" class="form-control" id="preparedby">
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group col-md-3">
                  <label style="margin-top:8px">Position: </label>
                </div>
                <div class="form-group col-md-9">
                  <input type="text" class="form-control" id="preparedbypos">
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group col-md-3">
                  <label style="margin-top:8px">Recommended by: </label>
                </div>
                <div class="form-group col-md-9">
                  <input type="text" class="form-control" id="recommendedby">
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group col-md-3">
                  <label style="margin-top:8px">Position: </label>
                </div>
                <div class="form-group col-md-9">
                  <input type="text" class="form-control" id="recommendedbypos">
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group col-md-3">
                  <label style="margin-top:8px">Approved by: </label>
                </div>
                <div class="form-group col-md-9">
                  <input type="text" class="form-control" id="approvedby" value="MARI-FLOR A. DOLLAGA LIBANG">
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group col-md-3">
                  <label style="margin-top:8px">Position: </label>
                </div>
                <div class="form-group col-md-9">
                  <input type="text" class="form-control" id="approvedbypos" value="Regional  Director">
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="alert alert-danger col-md-12" id="errmsgnewdromicec">
                </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-sm" onclick="savenewDromicEC()">
          	<i class="fa fa-mail-forward"></i> Continue
          </button>
        </div>
    </div>
  </div>
</div>

<div id="adddamageasst" class="modal fade" role="dialog">
  <div class="modal-dialog modal-sm" style="width:35%">
      <!-- Modal content-->
    <div class="modal-content" >
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><strong>Cost of Assistance Provided (LGU)</strong></h4>
      </div>
      <div class="modal-body">
        <div class="row">
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i>  Select Province </label>
        		<select class="form-control" id="addDamprov">
        			<option value="">--- Select Province ---</option>
        		</select>
        	</div>
					<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i> Select City/Municipality </label>
        		<select class="form-control" id="addDamcity">
        			<option value="">-- Select City/Municipality --</option>
        		</select>
        	</div>
        	<div class="form-group col-md-12">
            <center>
            	<label style="font-size:15px; display:none" class="green">Number of Damaged Houses</label>
            </center>
          </div>
          <div class="form-group col-md-6" style="margin-top:-15px; display:none">
            <center><label>Totally Damaged</label></center>
            <input type="number" class="form-control" style="text-align:center" id="ntotally">
          </div>
          <div class="form-group col-md-6" style="margin-top:-15px; display:none">
            <center><label>Partially Damaged</label></center>
            <input type="number" class="form-control" style="text-align:center" id="npartially">
          </div>
          <div class="form-group col-md-12">
            <center>
            	<label style="font-size:15px; display:none" class="green">Number of Casualties</label>
            </center>
          </div>
          <div class="form-group col-md-4" style="margin-top:-15px; display:none">
            <center><label>Dead</label></center>
            <input type="number" class="form-control" style="text-align:center" id="ndead">
          </div>
          <div class="form-group col-md-4" style="margin-top:-15px; display:none">
            <center><label>Missing</label></center>
            <input type="number" class="form-control" style="text-align:center" id="nmising">
          </div>
          <div class="form-group col-md-4" style="margin-top:-15px; display:none">
            <center><label>Injured</label></center>
            <input type="number" class="form-control" style="text-align:center" id="ninjured">
          </div>
          <div class="form-group col-md-12">
            <center>
            	<label style="font-size:15px; margin-top:-15px" class="green">Cost of Assistance</label>
            </center>
          </div>
          <div class="form-group col-md-4" style="margin-top:-10px; display:none">
            <center><label>DSWD</label></center>
            <input type="number" class="form-control" style="text-align:center" id="ndswd">
          </div>
          <div class="form-group col-md-6" style="margin-top:-10px">
            <center><label>Cost of Assistance (LGU)</label></center>
            <input type="number" class="form-control" style="text-align:center" id="nlgu">
          </div>
          <div class="form-group col-md-6" style="margin-top:-10px;">
            <center><label>NGO/Other GOs</label></center>
            <input type="number" class="form-control" style="text-align:center" id="nngo">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btn-sm" onclick="savenewDamAss()" id="saveDamAss"><i class="fa fa-plus-circle"></i> Save Data</button>
        <button type="button" class="btn btn-warning btn-sm" id="upDamAss"><i class="fa fa-pencil"></i> Update Data</button>
        <button type="button" class="btn btn-danger btn-sm" id="deleteDamAss"><i class="fa fa-remove"></i> Delete Data</button>
      </div>
    </div>
  </div>
</div>

<div id="addfamOEC" class="modal fade" role="dialog">
  <div class="modal-dialog modal-sm" style="width:35%">
      <!-- Modal content-->
    <div class="modal-content" >
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><strong>Families Outside EC</strong></h4>
      </div>
      <div class="modal-body">
        <div class="row">
    			<h4 style="font-weight:bold" class="green">  HOST LGU (Temporary Displacement of Evacuees) </h4>
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i>  Select Province </label>
        		<select class="form-control" id="addfamOECprov">
        			<option value="">--- Select Province ---</option>
        		</select>
        	</div>
					<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i> Select City/Municipality </label>
        		<select class="form-control" id="addfamOECcity">
        			<option value="">-- Select City/Municipality --</option>
        		</select>
        	</div>
        	<div class="form-group col-md-12">
        		<label> <i style="color:red">*</i> Select Barangay </label>
        		<select class="form-control" id="addfamOECbrgy">
        			<option value="">-- Select Barangay --</option>
        		</select>
        	</div>
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i> Family CUM </label>
        		<input type="number"  class="form-control" id="famcumO" style="text-align:center">
        	</div>
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i> Family NOW </label>
        		<input type="number"  class="form-control" id="famnowO" style="text-align:center">
        	</div>
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i> Person CUM </label>
        		<input type="number"  class="form-control" id="personcumO" style="text-align:center">
        	</div>
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i> Person NOW </label>
        		<input type="number"  class="form-control" id="personnowO" style="text-align:center">
        	</div>
        	<h4 style="font-weight:bold" class="green">  PLACE OF ORIGIN (Evacuees) </h4>
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i>  Select Province </label>
        		<select class="form-control" id="addfamOECprovO">
        			<option value="">--- Select Province ---</option>
        		</select>
        	</div>
					<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i> Select City/Municipality </label>
        		<select class="form-control" id="addfamOECcityO">
        			<option value="">-- Select City/Municipality --</option>
        		</select>
        	</div>
        	<div class="form-group col-md-12">
        		<label> <i style="color:red">*</i> Select Barangay </label>
        		<select class="form-control" id="addfamOECbrgyO">
        			<option value="">-- Select Barangay --</option>
        		</select>
        	</div>
        	<div class="form-group col-md-12">
        		<label> <i style="color:red">*</i> Please Specify if Others</label>
        		<input class="form-control" id="addfamOECbrgyOothers" disabled>
        	</div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btn-sm" onclick="savenewfamOEC()" id="saveFamOEC"><i class="fa fa-plus-circle"></i> Save Data</button>
        <button type="button" class="btn btn-warning btn-sm" onclick="updateFamOEC()" id="upFamOEC"><i class="fa fa-pencil"></i> Update Data</button>
        <button type="button" class="btn btn-danger btn-sm" id="delFamOEC"><i class="fa fa-remove"></i> Delete Data</button>
      </div>
  	</div>
  </div>
</div>

<div id="addCasualtyModal" class="modal fade" role="dialog">
  <div class="modal-dialog modal-sm" style="width:35%">
      <!-- Modal content-->
    <div class="modal-content" >
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><strong>Casualties</strong></h4>
      </div>
      <div class="modal-body">
        <div class="row">
        	<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i>  Select Province </label>
        		<select class="form-control" id="addcasualtyprov">
        			<option value="">--- Select Province ---</option>
        		</select>
        	</div>
					<div class="form-group col-md-6">
        		<label> <i style="color:red">*</i> Select City/Municipality </label>
        		<select class="form-control" id="addcasualtycity">
        			<option value="">-- Select City/Municipality --</option>
        		</select>
        	</div>
        	<div class="form-group col-md-12">
        		<label> <i style="color:red">*</i> Place of Origin </label>
        		<input type="text"  class="form-control" id="addcasualtybrgy" style="text-align:center">
        	</div>
        	<div class="form-group col-md-5">
        		<label> <i style="color:red">*</i> Lastname </label>
        		<input type="text"  class="form-control" id="addcasualtylname" style="text-align:center">
        	</div>
        	<div class="form-group col-md-5">
        		<label> <i style="color:red">*</i> Firstname </label>
        		<input type="text"  class="form-control" id="addcasualtyfname" style="text-align:center">
        	</div>
        	<div class="form-group col-md-2">
        		<label> M.I. </label>
        		<input type="text"  class="form-control" id="addcasualtymi" style="text-align:center">
        	</div>
        	<div class="form-group col-md-6">
        		<label> Age </label>
        		<input type="number"  class="form-control" id="addcasualtyage" style="text-align:center">
        	</div>
        	<div class="form-group col-md-6">
        		<label> Sex </label>
        		<select class="form-control" id="addcasualtysex">
        			<option value="Male">Male</option>
        			<option value="Female">Female</option>
        		</select>
        	</div>
        	<center>
		        <div class="form-group col-md-4">
		          <label class="custom-control custom-checkbox">
							  <input type="radio" class="custom-control-input flat" name="iscasualty" value="dead">
							  <span class="custom-control-description">Dead</span>
							</label>
						</div>
						<div class="form-group col-md-4">
		          <label class="custom-control custom-checkbox">
							  <input type="radio" class="custom-control-input flat" name="iscasualty" value="missing">
							  <span class="custom-control-description">Missing</span>
							</label>
						</div>
						<div class="form-group col-md-4">
		          <label class="custom-control custom-checkbox">
							  <input type="radio" class="custom-control-input flat" name="iscasualty" value="injured">
							  <span class="custom-control-description">Injured</span>
							</label>
						</div>
					</center>
        	<div class="form-group col-md-12">
        		<label> Remarks </label>
        		<textarea class="form-control" rows="5" id="addcasualtyremarks"></textarea>
        	</div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btn-sm" onclick="savenewCAS()" id="addcasualty"><i class="fa fa-plus-circle"></i> Save Data</button>
        <button type="button" class="btn btn-warning btn-sm" onclick="updateCAS()" id="updatecasualty"><i class="fa fa-pencil"></i> Update Data</button>
        <button type="button" class="btn btn-danger btn-sm" onclick="deleteCAS()" id="deletecasualty"><i class="fa fa-remove"></i> Delete Data</button>
      </div>
    </div>
  </div>
</div>

<div id="addCommentsModal" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg" style="width:75%">
    <!-- Modal content-->
    <div class="modal-content" >
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><strong>Comments and Discussions</strong></h4>
      </div>
      <div class="modal-body">
        <div class="row">
            <div class="col-sm-10">
		 					<textarea class="form-control" id="txt_comment" data-autoresize placeholder="Enter discussions here..." style="resize: none; overflow: hidden; border-radius: 5px">
		 					</textarea>
            </div>
            <div class="col-sm-2">
            	  <button type="button" class="btn btn-primary btn-sm pull-right" onclick="saveComment()" style="margin-top: 10px; border-radius: 100px">
            	  	<i class="fa fa-comment"></i> Save Comment
            	  </button>
            </div>
      	</div>
        <div class="row" style="height:750px; overflow: auto; border: 3px solid #EB4C3C; margin-top: 10px; padding: 10px">
          	<div class="col-sm-12" id="div_comment">
          	</div>
        </div>
    	</div>

  	</div>
  </div>
</div>

<div id="addNarrativeModal" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content" >
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><strong>Attach a Narrative Report</strong></h4>
      </div>
      <div class="modal-body">
        <div class="row">
            <div class="col-sm-9">
									<input type="file" class="form-control" id="txt_file" accept=".doc, .docx"/>
            </div>
            <div class="col-sm-3">
            	  <button type="button" class="btn btn-primary btn-sm pull-right" onclick="uploadFile()" style="border-radius: 100px"><i class="fa fa-save"></i> Upload File</button>
            </div>
      	</div>
      	<br>
      	<div class="row">
      		<div class="col-sm-12" id="dropbox">
          </div>
      	</div>
    	</div>
  	</div>
	</div>
</div>

<div class="modal fade" id="editDamageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">
        	<strong>Update Affected/Damages Houses</strong>
        </h4>
      </div>
      <div class="modal-body">
        <form>
	        <div class="col-md-12">
	            <label style="font-size: 18px">
	            	<span id="details_province"></span> > <span id="details_muni"></span> > <span id="details_brgy"></span>
	            </label>
	            <br/>
	        </div><br/><br/>
	        <div class="form-group col-md-12">
	            <label>Cost of Assistance Provided</label>
	            <input type="number" class="form-control" placeholder="Cost of Assistance Provided" min="0" id="costasst_brgyv2">
	        </div>
	        <div class="form-group col-md-6">
	            <label>Affected Families</label>
	            <input type="number" class="form-control" placeholder="Affected Families" min="0" id="damperbrgy_tot_aff_famv2">
	        </div>
	        <div class="form-group col-md-6">
	            <label>Affected Persons</label>
	            <input type="number" class="form-control" placeholder="Affected Persons" min="0" id="damperbrgy_tot_aff_personv2">
	        </div>
	        <div class="form-group col-md-6">
	            <label>Totally Damaged</label>
	            <input type="number" class="form-control" placeholder="Totally Damaged" min="0" id="damperbrgy_totallyv2">
	        </div>
	        <div class="form-group col-md-6">
	            <label>Partially Damaged</label>
	            <input type="number" class="form-control" placeholder="Partially Damaged" min="0" id="damperbrgy_partiallyv2">
	        </div>
        </form>
      </div>
      <div class="modal-footer">
        <div class="pull-right">
        	<button type="button" data-dismiss="modal" class="btn btn-default btn-sm" id="close_edit_modal">
        		<i class='fa fa-times'></i> Cancel
        	</button>	
						<button type="button" class="btn btn-warning btn-sm" id="updatedata_dam_per_brgyv2">
							<i class='fa fa-edit'></i> Update Data
						</button>	
						<button type="button" class="btn btn-danger btn-sm" id="deldata_dam_per_brgyv2">
							<i class='fa fa-times-circle'></i> Remove Data
						</button>	
					</div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="addSexAgeDataModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
      	<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close_edit_modal">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title"><strong>Add Sex and Age Data</strong></h4>
      </div>
      <div class="modal-body">
        <form>
	        <div class="col-md-6">
	        	<label>Province</label>
	            <select class="form-control" id="provinceSexAge">
            			<option value="">--- Select Province ---</option>
            		</select>
	        </div>
	        <div class="form-group col-md-6">
	        	<label>City/Municipality</label>
	            <select class="form-control" id="citySexAge">
            			<option value="">--- Select City/Municipality ---</option>
            		</select>
	        </div>
	        <div class="form-group col-md-12">
		        <table class="table table-condensed table-bordered">
		        	<tbody>
		        		<tr>
		        			<th rowspan="2" style="text-align: center; width: 250px; vertical-align: middle">Age Range</th>
		        			<th colspan="2" style="text-align: center">Male</th>
		        			<th colspan="2" style="text-align: center">Female</th>
		        		</tr>
		        		<tr>
		        			<th style="text-align: center">Cum</th>
		        			<th style="text-align: center">Now</th>
		        			<th style="text-align: center">Cum</th>
		        			<th style="text-align: center">Now</th>
		        		</tr>
		        		<tr>
		        			<td style="vertical-align: middle">INFANT less than 1 y/o</td>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="infant_male_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="infant_male_now"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="infant_female_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="infant_female_now"></th>
		        		</tr>
		        		<tr>
		        			<td style="vertical-align: middle">TODDLERS 1-3 y/o</td>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="toddlers_male_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="toddlers_male_now"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="toddlers_female_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="toddlers_female_now"></th>
		        		</tr>
		        		<tr>
		        			<td style="vertical-align: middle">PRESCHOOLERS 4-5 y/o</td>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="preschoolers_male_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="preschoolers_male_now"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="preschoolers_female_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="preschoolers_female_now"></th>
		        		</tr>
		        		<tr>
		        			<td style="vertical-align: middle">SCHOOL AGE 6-12 y/o</td>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="schoolage_male_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="schoolage_male_now"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="schoolage_female_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="schoolage_female_now"></th>
		        		</tr>
		        		<tr>
		        			<td style="vertical-align: middle">TEENAGE 13-19 y/o</td>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="teenage_male_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="teenage_male_now"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="teenage_female_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="teenage_female_now"></th>
		        		</tr>
		        		<tr>
		        			<td style="vertical-align: middle">ADULT 20-59 y/o</td>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="adult_male_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="adult_male_now"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="adult_female_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="adult_female_now"></th>
		        		</tr>
		        		<tr>
		        			<td style="vertical-align: middle">SENIOR CITIZEN 60 y/o and up</td>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="senior_male_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="senior_male_now"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="senior_female_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="senior_female_now"></th>
		        		</tr>
		        		<tr>
		        			<th rowspan="2" style="text-align: center; width: 250px; vertical-align: middle">Sector/Group</th>
		        			<th colspan="2" style="text-align: center">Male</th>
		        			<th colspan="2" style="text-align: center">Female</th>
		        		</tr>
		        		<tr>
		        			<th style="text-align: center">Cum</th>
		        			<th style="text-align: center">Now</th>
		        			<th style="text-align: center">Cum</th>
		        			<th style="text-align: center">Now</th>
		        		</tr>
		        		<tr>
		        			<td style="vertical-align: middle">PREGNANT</td>
		        			<th style="text-align: center"></th>
		        			<th style="text-align: center"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="pregnant_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="pregnant_now"></th>
		        		</tr>
		        		<tr>
		        			<td style="vertical-align: middle">LACTATING WOMEN</td>
		        			<th style="text-align: center"></th>
		        			<th style="text-align: center"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="lactating_mother_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="lactating_mother_now"></th>
		        		</tr>
		        		<tr>
		        			<td style="vertical-align: middle">UNACCOMPANIED CHILDREN</td>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="unaccompanied_minor_male_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="unaccompanied_minor_male_now"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="unaccompanied_minor_female_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="unaccompanied_minor_female_now"></th>
		        		</tr>
		        		<tr>
		        			<td style="vertical-align: middle">PERSONS WITH DISABILITIES</td>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="pwd_male_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="pwd_male_now"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="pwd_female_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="pwd_female_now"></th>
		        		</tr>
		        		<tr>
		        			<td style="vertical-align: middle">SOLO PARENTS</td>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="solo_parent_male_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="solo_parent_male_now"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="solo_parent_female_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="solo_parent_female_now"></th>
		        		</tr>
		        		<tr>
		        			<td style="vertical-align: middle">INDIGENOUS PEOPLES</td>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="ip_male_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="ip_male_now"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="ip_female_cum"></th>
		        			<th style="text-align: center"><input class="form-control" style="text-align: center" type="number" min="0" id="ip_female_now"></th>
		        		</tr>
		        	</tbody>
		        </table>
		    	</div>
        </form>
      </div>
      <div class="modal-footer">
        <div class="pull-right">
        	<button type="button" class="btn btn-success btn-sm" id="saveSexAgeDate">
        		<i class='fa fa-save'></i> Save Data
        	</button>	
						<!-- <button type="button" class="btn btn-warning btn-sm" id="updateSexAgeDate"><i class='fa fa-edit'></i> Update Data</button>	 -->
						<button type="button" class="btn btn-danger btn-sm" id="deleteSexAgeDate">
							<i class='fa fa-times-circle'></i> Remove Data
						</button>	
					</div>
      </div>
    </div>
  </div>
</div>

