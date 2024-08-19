<div id="evacuation_sex_age" class="tab-pane fade">
	<br>
	<div class="col-md-12" style="margin-top:10px">
		<label><i class="fa fa-info-circle"></i> 
			Reminders: Double click each entry to update/edit.
		</label>
	</div>
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="border:1px solid gray;" id="tbl_evacuation_sex_age">
    <table style="width:100%;">
  		<thead>
  			<tr>
  				<th colspan="53" style="text-align:center; font-weight:lighter">Department of Social Welfare and Development</th>
  			</tr>
  			<tr>
  				<th colspan="53" style="text-align:center;"><b>DISASTER RESPONSE, OPERATIONS, MONITORING AND INFORMATION CENTER</b></th>
  			</tr>
  			<tr>
  				<th colspan="53" style="text-align:center; font-weight:lighter">Batasan Pambansa Complex, Constitution Hills</th>
  			</tr>
  			<tr>
  				<th colspan="53" style="text-align:center; font-weight:lighter">Quezon City</th>
  			</tr>
  			<tr>
  				<th colspan="53" style="text-align:center; font-weight:lighter"><br></th>
  			</tr>
  			<tr>
  				<th colspan="53" style="text-align:center; font-weight: lighter">
  					<b>SEX AND AGE DISAGGREGATED DATA</b><br/>
  					<span id="asofdate_SEX"></span><br/>
  					<span id="asoftime_SEX"></span>
  				</th>
  			</tr>
  			<tr>
  				<th colspan="53" style="text-align:left; font-weight: lighter">
  					Region: <b><script>document.write(`${REGION}`)</script></b><br/>
  					<span id="disastertype_SEX"></span><br/>
  					<span id="disasterdate_SEX"></span>
  				</th>
  			</tr>
  		</thead>
  		<tbody>
  		</tbody>
  	</table>
		<table style="width:100%; font-size: 10px" id="tbl_sex_age">
			<thead>
				<tr>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px;" rowspan="4">PROVINCE/CITY/MUNICIPALITY</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="32">
					SEX AND AGE DISTRIBUTION OF IDPS INSIDE EC</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="20">
					SECTORAL DATA OF IDPS INSIDE EC</th>
				</tr>	
				<tr>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="4">
					INFANT < 1 y/o (0-11 mos)</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="4">
					TODDLERS 1-3 y/o</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="4">
					PRESCHOOLERS 4-5 y/o</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="4">
					SCHOOL AGE 6-12 y/o</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="4">
					TEENAGE 13-19 y/o</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="4">
					ADULT 20-59 y/o</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="4">
					SENIOR CITIZENS 60 and above</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="4">
					TOTAL</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
					PREGNANT WOMEN</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">
					LACTATING MOTHER</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="4">
					UNACCOMPANIED CHILDREN</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="4">
					PWDs</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="4">
					SOLO PARENTS</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="4">
					IPs</th>
				</tr>	
				<tr>
					<!-- infant -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">MALE</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>
					<!-- toddlers -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">MALE</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>
					<!-- preschoolers -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">MALE</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>
					<!-- schoolage -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">MALE</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>
					<!-- teenage -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">MALE</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>
					<!-- adult -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">MALE</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>
					<!-- senior -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">MALE</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>
					<!-- total -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">MALE</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>

					<!-- pregnant -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>
					<!-- lactating -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>
					<!-- unaccompanied -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">MALE</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>
					<!-- pwd -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">MALE</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>
					<!-- solo parent -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">MALE</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>
					<!-- ip -->
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">MALE</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" colspan="2">FEMALE</th>
				</tr>
				<tr>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>

					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>

					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>

					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>

					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>

					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>

					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>

					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>

					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>

					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>

					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>

					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">CUM</th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px">NOW</th>
				</tr>
				<tr id="sex_age_total_caraga">
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:left; padding:2px"><script>document.write(`${REGION}`)</script></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="infant_male_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="infant_male_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="infant_female_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="infant_female_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="toddlers_male_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="toddlers_male_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="toddlers_female_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="toddlers_female_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="preschoolers_male_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="preschoolers_male_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="preschoolers_female_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="preschoolers_female_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="schoolage_male_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="schoolage_male_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="schoolage_female_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="schoolage_female_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="teenage_male_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="teenage_male_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="teenage_female_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="teenage_female_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="adult_male_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="adult_male_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="adult_female_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="adult_female_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="senior_male_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="senior_male_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="senior_female_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="senior_female_now_c"></th>

					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="tot_male_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="tot_male_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="tot_female_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="tot_female_now_c"></th>

					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="pregnant_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="pregnant_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="lactating_mother_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="lactating_mother_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="unaccompanied_minor_male_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="unaccompanied_minor_male_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="unaccompanied_minor_female_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="unaccompanied_minor_female_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="pwd_male_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="pwd_male_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="pwd_female_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="pwd_female_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="solo_parent_male_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="solo_parent_male_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="solo_parent_female_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="solo_parent_female_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="ip_male_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="ip_male_now_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="ip_female_cum_c"></th>
					<th style="background-color: #808080; color: #000; border:1px solid #000; text-align:center; padding:2px" id="ip_female_now_c"></th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>	
	</div>
</div>