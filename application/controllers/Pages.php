<?php

	class Pages extends CI_Controller{

		public function view($page = 'dashboard'){
			
			if(!file_exists(APPPATH.'views/pages/'.$page.'.php')){
				show_404();
			}

			if($page == 'login' || $page == 'logout'){
				$this->load->view('pages/'.$page);
			}elseif($page == 'weatherforecast'){
				$this->load->view('pages/'.$page);
			}elseif($page == 'disasterkiosk' || $page == 'wordtopdf'){
				$this->load->view('pages/'.$page);
			}else{
				$this->load->view('template/header');
				$this->load->view('pages/'.$page);
				$this->load->view('template/footer');
			}

		}

		public function get_province(){
			echo json_encode($data['result'][] = $this->Mswd_model->get_provinces());
		}

		public function get_municipality(){
			echo json_encode($data['result'][] = $this->Mswd_model->get_munics());
		}

		public function getmunicipality(){
			echo json_encode($data['result'][] = $this->Disaster_model->getmunicipality($_GET['municipality_id']));
		}

		public function insert_mswdo(){

			$data = array(
				'fullname' 			=> $_GET['fullname'],
				'mayor'				=> $_GET['mayor'],
				'vmayor'			=> $_GET['vmayor'],
				'province_id' 		=> $_GET['province'],	
				'municipality_id' 	=> $_GET['city'],
				'mobile' 			=> $_GET['mobile'],
				'telephone' 		=> $_GET['telephone'],
				'emailaddress' 		=> $_GET['emailadd']
			);

			echo json_encode($data['result'][] = $this->Mswd_model->insert_mswdos($data));

		}

		public function get_mswdo(){
			echo json_encode($data['result'][] = $this->Mswd_model->get_mswdos());
		}

		public function get_mswdinfo(){
			echo json_encode($data['result'][] = $this->Mswd_model->get_mswdosinfo($_GET['id']));
		}

		public function update_mswd(){

			$data = array(
				'fullname' 			=> $_GET['fullname'],
				'mayor'				=> $_GET['mayor'],
				'vmayor'			=> $_GET['vmayor'],
				'province_id' 		=> $_GET['province'],
				'municipality_id' 	=> $_GET['city'],
				'mobile' 			=> $_GET['mobile'],
				'telephone' 		=> $_GET['telephone'],
				'emailaddress' 		=> $_GET['emailadd']
			);

			echo json_encode($data['result'][] = $this->Mswd_model->update_mswd($_GET['id'],$data));

		}

		public function delete_mswd(){
			echo json_encode($data['result'][] = $this->Mswd_model->delete_mswdo($_GET['id']));
		}

		public function get_matleader(){

			echo json_encode($data['result'][] = $this->Matleader_model->get_matleaders());

		}

		public function get_pats(){

			echo json_encode($data['result'][] = $this->Matleader_model->get_pats());

		}

		public function get_ldrrmos(){

			echo json_encode($data['result'][] = $this->Matleader_model->get_ldrrmos());

		}

		public function insert_matleader(){

			$data = array(
				'fullname' 			=> $_GET['fullname'],
				'position'			=> $_GET['position'],
				'program'			=> $_GET['program'],
				'gender' 			=> $_GET['gender'],
				'yearinservice' 	=> $_GET['yearinservice'],
				'course' 			=> $_GET['course'],
				'provinceid' 		=> $_GET['provinceid'],
				'municipalityid' 	=> $_GET['municipalityid'],
				'mobile' 			=> $_GET['mobile'],
				'emailaddress' 		=> $_GET['emailaddress'],
				'isleader'			=> $_GET['isleader']
			);

			echo json_encode($data['result'][] = $this->Matleader_model->insert_matleaders($data));

		}

		public function get_matleaderinfo(){

			$datas = $_GET['id'];

			echo json_encode($data['result'][] = $this->Matleader_model->get_matleaderinfos($datas));

		}

		public function update_matleader(){

			$data = array(
				'fullname' 			=> $_GET['fullname'],
				'position'			=> $_GET['position'],
				'program'			=> $_GET['program'],
				'gender' 			=> $_GET['gender'],
				'yearinservice' 	=> $_GET['yearinservice'],
				'course' 			=> $_GET['course'],
				'provinceid' 		=> $_GET['provinceid'],
				'municipalityid' 	=> $_GET['municipalityid'],
				'mobile' 			=> $_GET['mobile'],
				'emailaddress' 		=> $_GET['emailaddress']
			);

			echo json_encode($data['result'][] = $this->Matleader_model->update_matleaders($_GET['id'],$data));

		}

		public function delete_matleader(){
			echo json_encode($data['result'][] = $this->Matleader_model->delete_matleaders($_GET['id']));
		}

		// public function get_matmember(){

		// 	echo json_encode($data['result'][] = $this->Matleader_model->get_matmembers());

		// }

		public function addnew_disaster(){

			$data = array(
				'disaster_name' 	=> $_GET['disaster_name'],
				'disaster_date' 	=> $_GET['disaster_date'],
				'created_by_user' 	=> $_GET['created_by_user']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->new_disaster($data));
		}

		public function getdisaster(){
			echo json_encode($data['result'][] = $this->Disaster_model->get_disaster($_GET['usernameid']));
		}

		public function sendsms(){

			$number = $_GET['number'];
			$body 	= $_GET['body'];

			echo json_encode($data['result'][] = $this->Mswd_model->send_sms($number,$body));
		}

		public function get_evac_stats(){
			if(isset($_GET['id'])){
				$id = $_GET['id'];
				echo json_encode($data['result'][] = $this->Disaster_model->get_evacuation_stats($id));
			}
		}

		public function get_disasterdetail(){
			$id = $_GET['id'];
			echo json_encode($data['result'][] = $this->Disaster_model->get_disasterdetail($id));
		}

		public function savenewtitle(){

			$data = array(
				'dromic_id' 			=> $_GET['id'],
				'disaster_title'		=> $_GET['newreporttitle'],
				'ddate' 				=> $_GET['newreportdate'],
				'asoftime' 				=> $_GET['newreporttime'],
				'preparedby' 			=> $_GET['preparedby'],
				'recommendedby' 		=> $_GET['recommendedby'],
				'approvedby' 			=> $_GET['approvedby'],
				'preparedbypos' 		=> $_GET['preparedbypos'],
				'recommendedbypos' 		=> $_GET['recommendedbypos'],
				'approvedbypos' 		=> $_GET['approvedbypos']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->savenewtitle($data),JSON_NUMERIC_CHECK);
		}

		public function save_affected(){

			$array = array(
				'provinceid' 		=> $_GET['provinceid'],
				'municipality_id' 	=> $_GET['municipality_id'],
				'fam_no' 			=> $_GET['fam_no'],
				'person_no' 		=> $_GET['person_no'],
				'disaster_title_id' => $_GET['disaster_title_id'],
				'brgy_affected' 	=> $_GET['brgy_affected']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->save_affected($array),JSON_NUMERIC_CHECK);

		}

		public function save_affected2(){

			$array = array(
				'provinceid' 		=> $_GET['provinceid'],
				'municipality_id' 	=> $_GET['municipality_id'],
				'fam_no' 			=> $_GET['fam_no'],
				'person_no' 		=> $_GET['person_no'],
				'disaster_title_id' => $_GET['disaster_title_id'],
				'brgy_affected' 	=> $_GET['brgy_affected']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->save_affected2($array),JSON_NUMERIC_CHECK);

		}

		public function savenewEC(){

			$data = array(
				'disaster_title_id' 	=> $_GET['disasterID'],
				'municipality_id' 		=> $_GET['ecicity'],
				'provinceid' 			=> $_GET['eciprov'],
				'ec_cum' 				=> $_GET['ecicum'],
				'ec_now' 				=> $_GET['ecinow'],
				'evacuation_name' 		=> $_GET['eciname'],
				'family_cum' 			=> $_GET['ecifamcum'],
				'family_now' 			=> $_GET['ecifamnow'],
				'person_cum' 			=> $_GET['ecipercum'],
				'person_now' 			=> $_GET['ecipernow'],
				'brgy_located_ec' 		=> $_GET['brgy_located_ec'],
				'brgy_located' 			=> $_GET['brgy_located'],
				'place_of_origin' 		=> "",
				'ec_status' 			=> $_GET['ecstatus'],
				'ec_remarks' 			=> $_GET['ec_remarks'],
			);

			echo json_encode($data['result'][] = $this->Disaster_model->savenewec($data),JSON_NUMERIC_CHECK);

		}

		public function getAllEC(){
			echo json_encode($data['result'][] = $this->Disaster_model->getAllEC($_GET['uriID'],$_GET['cid']),JSON_NUMERIC_CHECK);
		}

		public function getECDetail(){
			echo json_encode($data['result'][] = $this->Disaster_model->getECDetail($_GET['id']),JSON_NUMERIC_CHECK);
		}

		public function getAllOrigin(){
			echo json_encode($data['result'][] = $this->Disaster_model->getAllOrigin($_GET['uriID'],$_GET['cid']),JSON_NUMERIC_CHECK);
		}

		public function getAllOriginBrgy(){
			echo json_encode($data['result'][] = $this->Disaster_model->getAllOriginBrgy($_GET['cid']),JSON_NUMERIC_CHECK);
		}

		public function getAllOriginProvince(){
			echo json_encode($data['result'][] = $this->Disaster_model->getAllOriginProvince($_GET['uriID'],$_GET['pid']),JSON_NUMERIC_CHECK);
		}

		public function updateEC(){

			$data = array( 
				'municipality_id'		=> $_GET['ecicity'],
				'provinceid'			=> $_GET['eciprov'],
				'ec_cum'				=> $_GET['ecicum'],
				'ec_now'				=> $_GET['ecinow'],
				'evacuation_name'		=> $_GET['eciname'],
				'family_cum'			=> $_GET['ecifamcum'],
				'family_now'			=> $_GET['ecifamnow'],
				'person_cum'			=> $_GET['ecipercum'],
				'person_now'			=> $_GET['ecipernow'],
				'brgy_located_ec'		=> $_GET['brgy_located'],
				'brgy_located'			=> $_GET['eciplaceorigin'],
				'ec_status'				=> $_GET['ecstatus'],
				'ec_remarks'			=> $_GET['ec_remarks']
 		 
			);

			echo json_encode($data['result'][] = $this->Disaster_model->updateEC($_GET['id'],$data));

		}

		public function getECMain(){
			echo json_encode($data['result'][] = $this->Disaster_model->getECMain($_GET['id']));
		}

		public function saveasnewrecordEC(){

			$data = array(
				'dromic_id' 			=> $_GET['id'],
				'disaster_title'		=> $_GET['newreporttitle'],
				'ddate' 				=> $_GET['newreportdate'],
				'asoftime' 				=> $_GET['newreporttime'],
				'preparedby' 			=> $_GET['preparedby'],
				'recommendedby' 		=> $_GET['recommendedby'],
				'approvedby' 			=> $_GET['approvedby'],
				'preparedbypos' 		=> $_GET['preparedbypos'],
				'recommendedbypos' 		=> $_GET['recommendedbypos'],
				'approvedbypos' 		=> $_GET['approvedbypos']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->saveasnewrecordEC($data,$_GET['oid']),JSON_NUMERIC_CHECK);

		}

		public function saveasnewDamAss(){

			$data = array(
				'disaster_title_id' => $_GET['disaster_title_id'],
				'municipality_id' 	=> $_GET['municipality_id'],
				'provinceid' 		=> $_GET['provinceid'],
				'totally_damaged' 	=> $_GET['totally_damaged'],
				'partially_damaged' => $_GET['partially_damaged'],
				'dead' 				=> $_GET['dead'],
				'injured' 			=> $_GET['injured'],
				'missing' 			=> $_GET['missing'],
				'dswd_asst' 		=> $_GET['dswd_asst'],
				'lgu_asst' 			=> $_GET['lgu_asst'],
				'ngo_asst' 			=> $_GET['ngo_asst']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->saveasnewDamAss($data),JSON_NUMERIC_CHECK);

		}

		public function getDamAss(){

			echo json_encode($data['result'][] = $this->Disaster_model->getDamAss($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function getDamAssMain(){

			echo json_encode($data['result'][] = $this->Disaster_model->getDamAssMain($_GET['municipality_id'], $_GET['URLID']),JSON_NUMERIC_CHECK);

		}

		public function getAllAffected(){

			echo json_encode($data['result'][] = $this->Disaster_model->getAllAffected($_GET['municipality_id'], $_GET['URLID']),JSON_NUMERIC_CHECK);

		}

		public function updateDamAss(){

			$data = array(
				'municipality_id' 	=> $_GET['municipality_id'],
				'provinceid' 		=> $_GET['provinceid'],
				'totally_damaged' 	=> $_GET['totally_damaged'],
				'partially_damaged' => $_GET['partially_damaged'],
				'dead' 				=> $_GET['dead'],
				'injured' 			=> $_GET['injured'],
				'missing' 			=> $_GET['missing'],
				'dswd_asst' 		=> $_GET['dswd_asst'],
				'lgu_asst' 			=> $_GET['lgu_asst'],
				'ngo_asst' 			=> $_GET['ngo_asst']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->updateDamAss($data,$_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function savenewfamOEC(){

			$data = array(
				'disaster_title_id' 		=> $_GET['disaster_title_id'],
				'provinceid' 				=> $_GET['provinceid'],
				'municipality_id' 			=> $_GET['municipality_id'],
				'family_cum' 				=> $_GET['family_cum'],
				'family_now' 				=> $_GET['family_now'],
				'person_cum' 				=> $_GET['person_cum'],
				'person_now' 				=> $_GET['person_now'],
				'brgy_host' 				=> $_GET['brgy_host'],
				'brgy_origin' 				=> $_GET['brgy_origin'],
				'province_origin' 			=> $_GET['province_origin'],
				'municipality_origin' 		=> $_GET['municipality_origin']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->savenewfamOEC($data),JSON_NUMERIC_CHECK);
		}

		public function getFamOEC(){
			echo json_encode($data['result'][] = $this->Disaster_model->getFamOEC($_GET['id']),JSON_NUMERIC_CHECK);
		}

		public function updateFamOEC(){

			$data = array(
				'provinceid' 			=> $_GET['provinceid'],
				'municipality_id' 		=> $_GET['municipality_id'],
				'family_cum' 			=> $_GET['family_cum'],
				'family_now' 			=> $_GET['family_now'],
				'person_cum' 			=> $_GET['person_cum'],
				'person_now' 			=> $_GET['person_now'],
				'brgy_host' 			=> $_GET['brgy_host'],
				'province_origin' 		=> $_GET['province_origin'],
				'municipality_origin' 	=> $_GET['municipality_origin'],
				'brgy_origin' 			=> $_GET['brgy_origin']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->updateFamOEC($data,$_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function savenewCAS(){

			$data = array(
				'disaster_title_id' 		=> $_GET['disaster_title_id'],
				'lastname' 					=> $_GET['lastname'],
				'firstname' 				=> $_GET['firstname'],
				'middle_i'					=> $_GET['middle_i'],
				'gender' 					=> $_GET['gender'],
				'provinceid' 				=> $_GET['provinceid'],
				'municipalityid' 			=> $_GET['municipalityid'],
				'brgyname' 					=> $_GET['brgyname'],
				'isdead' 					=> $_GET['isdead'],
				'ismissing' 				=> $_GET['ismissing'],
				'isinjured' 				=> $_GET['isinjured'],
				'remarks' 					=> $_GET['remarks'],
				'age'						=> $_GET['age']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->savenewCAS($data),JSON_NUMERIC_CHECK);

		}

		public function getCasualty(){
			echo json_encode($data['result'][] = $this->Disaster_model->getCasualty($_GET['id']),JSON_NUMERIC_CHECK);
		}

		public function updateCAS(){

			$data = array(
				'lastname' 					=> $_GET['lastname'],
				'firstname' 				=> $_GET['firstname'],
				'middle_i'					=> $_GET['middle_i'],
				'gender' 					=> $_GET['gender'],
				'provinceid' 				=> $_GET['provinceid'],
				'municipalityid' 			=> $_GET['municipalityid'],
				'brgyname' 					=> $_GET['brgyname'],
				'isdead' 					=> $_GET['isdead'],
				'ismissing' 				=> $_GET['ismissing'],
				'isinjured' 				=> $_GET['isinjured'],
				'remarks' 					=> $_GET['remarks'],
				'age'						=> $_GET['age']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->updateCAS($data,$_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function countEOpCen(){
			echo json_encode($data['result'][] = $this->Disaster_model->countEOpCen(),JSON_NUMERIC_CHECK);
		}

		public function picEnlarge(){
			$id = $_GET['id'];
			echo json_encode($data['result'][] = $this->Disaster_model->picEnlarge($id),JSON_NUMERIC_CHECK);
		}

		public function markreadinec(){
			echo json_encode($data['result'][] = $this->Disaster_model->markreadinec(),JSON_NUMERIC_CHECK);
		}

		public function markreaddamass(){
			echo json_encode($data['result'][] = $this->Disaster_model->markreaddamass(),JSON_NUMERIC_CHECK);
		}

		public function markreadoutec(){
			echo json_encode($data['result'][] = $this->Disaster_model->markreadoutec(),JSON_NUMERIC_CHECK);
		}

		public function markreadcasualty(){
			echo json_encode($data['result'][] = $this->Disaster_model->markreadcasualty(),JSON_NUMERIC_CHECK);
		}

		public function markreaduploads(){
			echo json_encode($data['result'][] = $this->Disaster_model->markreaduploads(),JSON_NUMERIC_CHECK);
		}

		public function get_allquake(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_allquake(),JSON_NUMERIC_CHECK);

		}

		public function getEarthquake(){

			echo json_encode($data['result'][] = $this->Disaster_model->getEarthquake(),JSON_NUMERIC_CHECK);

		}

		public function getWeather(){

			echo json_encode($data['result'][] = $this->Disaster_model->getWeather(),JSON_NUMERIC_CHECK);

		}

		public function markEarthquake(){

			// $data['result'] = $this->Disaster_model->getEarthquake();
			
			// echo json_encode($data);
			$a = file_get_contents("http://www.phivolcs.dost.gov.ph/html/update_SOEPD/EQLatest.html");
			echo $a;

		}

		public function magEarthquake(){
			echo json_encode($data['result'][] = $this->Disaster_model->magEarthquake(),JSON_NUMERIC_CHECK);
		}

		public function getclick(){

			$a = file_get_contents($_GET['url']);

			$a = json_decode($a);

			echo $_GET['callback']. '('. json_encode($a) . ')';

		}

		public function getfloodintersect(){

			$id = $_GET['id'];
			$provinceid = $_GET['provinceid'];

			if($provinceid == 1){
				$tbl = "adn_flood";
			}elseif($provinceid == 2){
				$tbl = "tbl_ads";
			}elseif($provinceid == 3){
				$tbl = "tbl_sdn";
			}elseif($provinceid == 4){
				$tbl = "tbl_sds";
			}elseif($provinceid == 5){
				$tbl = "tbl_pdi";
			}

			$data['rs'] = $this->Disaster_model->getfloodintersect($id,$tbl);

			echo $_GET['callback']. '('. json_encode($data,JSON_NUMERIC_CHECK) . ')';

		}

		public function saveQRT(){

			$data = array(
				'leader' 		=> $_GET['leader'],
				'statistician' 	=> $_GET['statistician'],
				'smu' 			=> $_GET['smu'],
				'aa' 			=> $_GET['aa'],
				'qstaff' 		=> $_GET['qstaff'],
				'qdriver' 		=> $_GET['qdriver']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->saveQRT($data),JSON_NUMERIC_CHECK);

		}

		public function checkQRTNumber(){

			echo json_encode($data['result'][] = $this->Disaster_model->checkQRTNumber($_GET['number']),JSON_NUMERIC_CHECK);

		}

		public function getAllQRT(){

			echo json_encode($data['result'][] = $this->Disaster_model->getAllQRT(),JSON_NUMERIC_CHECK);

		}

		public function getSpecQRT(){

			$id = $_GET['id'];

			echo json_encode($data['result'][] = $this->Disaster_model->getSpecQRT($id),JSON_NUMERIC_CHECK);

		}

		public function deleteQRTTeam(){

			$id = $_GET['id'];

			echo json_encode($data['result'][] = $this->Disaster_model->deleteQRTTeam($id),JSON_NUMERIC_CHECK);

		}

		public function deleteQRTTeamDriverStaff(){

			$id = $_GET['id'];

			echo json_encode($data['result'][] = $this->Disaster_model->deleteQRTTeamDriverStaff($id),JSON_NUMERIC_CHECK);

		}

		public function updateQRT(){

			$data = array(
				'leader' 		=> $_GET['leader'],
				'statistician' 	=> $_GET['statistician'],
				'smu' 			=> $_GET['smu'],
				'aa' 			=> $_GET['aa'],
				'qstaff' 		=> $_GET['qstaff'],
				'qdriver' 		=> $_GET['qdriver']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->updateQRT($data),JSON_NUMERIC_CHECK);

		}

		public function login(){

			echo $_GET['callback'] . '(' .json_encode($data['result'][] = $this->Disaster_model->login($_GET['username'],$_GET['password']),JSON_NUMERIC_CHECK) . ')';

		}

		public function getDashboardData(){

			echo json_encode($data['result'][] = $this->Disaster_model->getDashboardData(),JSON_NUMERIC_CHECK);

		}

		public function get_fnfi(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_fnfi(),JSON_NUMERIC_CHECK);

		}

		public function get_fnfi_cost(){

			$id = $_GET['id'];

			echo json_encode($data['result'][] = $this->Disaster_model->get_fnfi_cost($id),JSON_NUMERIC_CHECK);

		}

		public function saveFNFILIST(){

			echo json_encode($data['result'][] = $this->Disaster_model->saveFNFILIST($_GET['details'],$_GET['fnfi_list'],$_GET['date_augmented']),JSON_NUMERIC_CHECK);

		}

		public function get_dswd_assistance(){
			if(isset($_GET['id'])){
				echo json_encode($data['result'][] = $this->Disaster_model->get_dswd_assistance($_GET['id']),JSON_NUMERIC_CHECK);
			}
		}

		public function get_dswd_assistance_summary(){
			if(isset($_GET['id'])){
				echo json_encode($data['result'][] = $this->Disaster_model->get_dswd_assistance_summary($_GET['id']),JSON_NUMERIC_CHECK);
			}
		}

		public function get_teamleader(){
			echo json_encode($data['result'][] = $this->Disaster_model->get_teamleader(),JSON_NUMERIC_CHECK);

		}

		public function get_assistancetype(){
			echo json_encode($data['result'][] = $this->Disaster_model->get_assistancetype(),JSON_NUMERIC_CHECK);

		}

		public function save_augmentation_assistance(){

			$datains1 = array(
				'provinceid'			=> $_GET['details']['provinceid'],
				'municipality_id'		=> $_GET['details']['municipality_id'],
				'number_served'			=> $_GET['details']['number_served'],
				'amount'				=> $_GET['details']['amount'],
				'assistance_type_code'	=> $_GET['details']['assistance_type_code'],
				'remarks_particulars'	=> $_GET['details']['remarks_particulars'],
				'disaster_event' 		=> $_GET['details']['disaster_event'],
			);

			echo json_encode($data['result'][] = $this->Disaster_model->save_augmentation_assistance($datains1,$_GET['asst_list']),JSON_NUMERIC_CHECK);

			//echo json_encode($_GET['asst_list']);

		}

		public function get_augmentation_assistance(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_augmentation_assistance($_GET['month'],$_GET['year'],$_GET['assttyperelief']),JSON_NUMERIC_CHECK);

		}

		public function get_augmentation_assistance1(){

			$year = $_GET["tyears"];

			echo json_encode($data['result'][] = $this->Disaster_model->get_augmentation_assistance1($year),JSON_NUMERIC_CHECK);

		}

		public function get_augmentation_assistanceperd(){

			$year = $_GET["tyears"];

			echo json_encode($data['result'][] = $this->Disaster_model->get_augmentation_assistanceperd($year),JSON_NUMERIC_CHECK);

		}

		public function get_augmentation_assistanceffw(){

			$year = $_GET["tyears"];

			echo json_encode($data['result'][] = $this->Disaster_model->get_augmentation_assistanceffw($year),JSON_NUMERIC_CHECK);

		}

		public function get_augmentation_assistanceesa(){

			$year = $_GET["tyears"];

			echo json_encode($data['result'][] = $this->Disaster_model->get_augmentation_assistanceesa($year),JSON_NUMERIC_CHECK);

		}

		public function get_augmentation_assistancecfw(){

			$year = $_GET["tyears"];

			echo json_encode($data['result'][] = $this->Disaster_model->get_augmentation_assistancecfw($year),JSON_NUMERIC_CHECK);

		}

		public function check_municipality_in_damass(){

			echo json_encode($data['result'][] = $this->Disaster_model->check_municipality_in_damass($_GET['id'],$_GET['disaster_title_id']),JSON_NUMERIC_CHECK);

		}

		public function issuesfound(){

			echo json_encode($data['result'][] = $this->Disaster_model->issuesfound($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function deleteDamAss(){

			echo json_encode($data['result'][] = $this->Disaster_model->deleteDamAss($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function deleteECS(){

			echo json_encode($data['result'][] = $this->Disaster_model->deleteECS($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function delFamOEC(){

			echo json_encode($data['result'][] = $this->Disaster_model->delFamOEC($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function deleteCAS(){

			echo json_encode($data['result'][] = $this->Disaster_model->deleteCAS($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function getPictureCoordinates(){

			echo json_encode($data['result'][] = $this->Disaster_model->getPictureCoordinates($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function checkBrgy_tbl_damage_per_brgy(){

			$data = array(
				'disaster_title_id' 		=> $_GET['disaster_title_id'],
				'municipality_id' 			=> $_GET['municipality_id'],
				'brgy_id' 					=> $_GET['brgy_id']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->checkBrgy_tbl_damage_per_brgy($data),JSON_NUMERIC_CHECK);

		}

		public function saveDamageperBrgy(){

			// $data = array(
			// 	'disaster_title_id' 		=> $_GET['disaster_title_id'],
			// 	'provinceid' 				=> $_GET['provinceid'],
			// 	'municipality_id' 			=> $_GET['municipality_id'],
			// 	'brgy_id' 					=> $_GET['brgy_id'],
			// 	'totally_damaged' 			=> $_GET['totally_damaged'],
			// 	'partially_damaged' 		=> $_GET['partially_damaged'],

			// 	'tot_aff_fam' 				=> $_GET['tot_aff_fam'],
			// 	'tot_aff_person' 			=> $_GET['tot_aff_person'],

			// 	'dead' 						=> '0',
			// 	'injured' 					=> '0',
			// 	'missing' 					=> '0',
				
			// 	'costasst_brgy' 			=> $_GET['costasst_brgy']
			// );

			echo json_encode($data['result'][] = $this->Disaster_model->saveDamageperBrgy($_GET['data_dam_per_brgy_arr']),JSON_NUMERIC_CHECK);

		}

		public function get_damage_per_brgy(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_damage_per_brgy($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function get_damage_per_brgy_details(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_damage_per_brgy_details($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function updatedamageperbrgy(){

			$data = array(
				'totally_damaged' 	=> $_GET['totally_damaged'],
				'partially_damaged' => $_GET['partially_damaged'],

				'tot_aff_fam' 		=> $_GET['tot_aff_fam'],
				'tot_aff_person'	=> $_GET['tot_aff_person'],

				'dead' 				=> $_GET['dead'],
				'injured' 			=> $_GET['injured'],
				'missing' 			=> $_GET['missing'],
				'costasst_brgy' 	=> $_GET['costasst_brgy']
			);

			echo json_encode($data['result'][] = $this->Disaster_model->updatedamageperbrgy($_GET['id'],$_GET['disaster_title_id'],$_GET['municipality_id'],$data),JSON_NUMERIC_CHECK);

		}

		public function deletedamageperbrgy(){

			echo json_encode($data['result'][] = $this->Disaster_model->deletedamageperbrgy($_GET['id'], $_GET['disaster_title_id'], $_GET['municipality_id']),JSON_NUMERIC_CHECK);

		}

		public function get_spec_assistance(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_spec_assistance($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function del_spec_assistance(){

			echo json_encode($data['result'][] = $this->Disaster_model->del_spec_assistance($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function get_assistancetype_li(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_assistancetype_li(),JSON_NUMERIC_CHECK);

		}

		public function get_congressional(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_congressional($_GET['month'],$_GET['year']),JSON_NUMERIC_CHECK);

		}

		public function get_congressional_quart(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_congressional_quart($_GET['quarter'],$_GET['year']),JSON_NUMERIC_CHECK);

		}

		public function get_congressional_yearly(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_congressional_yearly($_GET['year']),JSON_NUMERIC_CHECK);

		}

		public function get_congressional_sem(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_congressional_sem(),JSON_NUMERIC_CHECK);

		}

		public function get_disaster_events(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_disaster_events(),JSON_NUMERIC_CHECK);

		}

		public function get_unique_lgus(){

			$year = $_GET['tyears'];

			echo json_encode($data['result'][] = $this->Disaster_model->get_unique_lgus($year),JSON_NUMERIC_CHECK);

		}

		public function getDromic(){

			echo json_encode($data['result'][] = $this->Disaster_model->getDromic(),JSON_NUMERIC_CHECK);

		}

		public function savetoDisasterReport(){

			echo json_encode($data['result'][] = $this->Disaster_model->savetoDisasterReport($_GET['data']),JSON_NUMERIC_CHECK);

		}

		public function signup_user(){

			echo json_encode($data['result'][] = $this->Disaster_model->signup_user($_GET['data']),JSON_NUMERIC_CHECK);

		}

		public function get_my_disaster(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_my_disaster($_GET['username']),JSON_NUMERIC_CHECK);

		}

		public function save_reports_assignment(){

			echo json_encode($data['result'][] = $this->Disaster_model->save_reports_assignment($_GET['disaster_reports'],$_GET['users_list'],$_GET['username'],$_GET['can_edit']),JSON_NUMERIC_CHECK);

		}

		public function get_can_edit(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_can_edit($_GET['id'],$_GET['username']),JSON_NUMERIC_CHECK);

		}

		public function save_report_comment(){

			echo json_encode($data['result'][] = $this->Disaster_model->save_report_comment($_GET['id'], $_GET['msg'], $_GET['username']),JSON_NUMERIC_CHECK);

		}

		public function get_comments(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_comments($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function get_can_view(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_can_view($_GET['id'],$_GET['username']),JSON_NUMERIC_CHECK);

		}

		public function save_reply(){

			echo json_encode($data['result'][] = $this->Disaster_model->save_reply($_GET['id'], $_GET['msg'], $_GET['comment_id'], $_GET['username']),JSON_NUMERIC_CHECK);

		}

		public function upload_file(){

			if($_FILES["file"]["name"] != '')
			{
			 $test = explode('.', $_FILES["file"]["name"]);
			 $ext = end($test);
			 $name = rand(100, 999).'_'.$_POST['disaster_title_id']. '.' . $ext;
			 $location = 'assets/drr_app/upload/' . $name;  

			 move_uploaded_file($_FILES["file"]["tmp_name"], $location);

			 $data = array(

			 	'disaster_title_id' 	=> $_POST['disaster_title_id'],
			 	'file' 					=> 'https://docs.google.com/viewer?url=https://apps2.caraga.dswd.gov.ph/drrrou/assets/drr_app/upload/' . $name . '&embedded=true',
			 	'by_user' 				=> $_POST['by_user']

			 );

			 echo json_encode($data['result'][] = $this->Disaster_model->upload_file($data),JSON_NUMERIC_CHECK);

			}

		}

		public function get_if_narrative(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_if_narrative($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function get_narrative_report(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_narrative_report($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function get_map(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_map($_GET['id']),JSON_NUMERIC_CHECK);

		}

		public function get_feature_info(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_feature_info($_GET['id'], $_GET['municipality_id']),JSON_NUMERIC_CHECK);

		}

		public function get_mobile_user(){

			echo json_encode($data['result'][] = $this->Disaster_model->get_mobile_user());

		}


		public function activateuser(){

			echo json_encode($data['result'][] = $this->Disaster_model->activateuser($_GET['userslist']));

		}

		public function deactivateuser(){

			echo json_encode($data['result'][] = $this->Disaster_model->deactivateuser($_GET['userslist']));

		}

		public function authenticate_user(){

			$username = $_POST['username'];
			$password = $_POST['password'];

			echo json_encode($data['result'][] = $this->Disaster_model->authenticate_user($username,$password));


		}

		public function get_payroll(){

			$id_number = $_POST['id_number'];

			echo json_encode($data['result'][] = $this->Disaster_model->get_payroll($id_number),JSON_NUMERIC_CHECK);

		} 

		public function get_payroll_t(){

			$payroll_id = $_POST['payroll_id'];

			echo json_encode($data['result'][] = $this->Disaster_model->get_payroll_t($payroll_id),JSON_NUMERIC_CHECK);

		}

		public function get_tev(){

			$id_number = $_POST['id_number'];

			echo json_encode($data['result'][] = $this->Disaster_model->get_tev($id_number),JSON_NUMERIC_CHECK);

		}

		public function get_tev_t(){

			$namelist_id = $_POST['namelist_id'];

			echo json_encode($data['result'][] = $this->Disaster_model->get_tev_t($namelist_id),JSON_NUMERIC_CHECK);

		}

		public function get_all_disasters(){
			
			echo json_encode($data['result'][] = $this->Disaster_model->get_all_disasters(),JSON_NUMERIC_CHECK);

		}

		public function searchSexAgeData(){
			echo json_encode($data['result'][] = $this->Disaster_model->searchSexAgeData( $_GET['id']),JSON_NUMERIC_CHECK);
		}

		public function saveSexAgeData(){

			$data = array(
				'province_id' 						=> $_GET['province_id'],
				'municipality_id' 					=> $_GET['municipality_id'],
				'disaster_title_id' 				=> $_GET['disaster_title_id'],

				'infant_male_cum' 					=> $_GET['infant_male_cum'],
				'infant_male_now'					=> $_GET['infant_male_now'],
				'infant_female_cum' 				=> $_GET['infant_female_cum'],
				'infant_female_now' 				=> $_GET['infant_female_now'],
				'toddlers_male_cum' 				=> $_GET['toddlers_male_cum'],
				'toddlers_male_now' 				=> $_GET['toddlers_male_now'],
				'toddlers_female_cum' 				=> $_GET['toddlers_female_cum'],
				'toddlers_female_now' 				=> $_GET['toddlers_female_now'],
				'preschoolers_male_cum' 			=> $_GET['preschoolers_male_cum'],
				'preschoolers_male_now' 			=> $_GET['preschoolers_male_now'],
				'preschoolers_female_cum' 			=> $_GET['preschoolers_female_cum'],
				'preschoolers_female_now' 			=> $_GET['preschoolers_female_now'],
				'schoolage_male_cum' 				=> $_GET['schoolage_male_cum'],
				'schoolage_male_now' 				=> $_GET['schoolage_male_now'],
				'schoolage_female_cum' 				=> $_GET['schoolage_female_cum'],
				'schoolage_female_now' 				=> $_GET['schoolage_female_now'],
				'teenage_male_cum' 					=> $_GET['teenage_male_cum'],
				'teenage_male_now' 					=> $_GET['teenage_male_now'],
				'teenage_female_cum' 				=> $_GET['teenage_female_cum'],
				'teenage_female_now' 				=> $_GET['teenage_female_now'],
				'adult_male_cum' 					=> $_GET['adult_male_cum'],
				'adult_male_now' 					=> $_GET['adult_male_now'],
				'adult_female_cum' 					=> $_GET['adult_female_cum'],
				'adult_female_now' 					=> $_GET['adult_female_now'],
				'senior_male_cum' 					=> $_GET['senior_male_cum'],
				'senior_male_now' 					=> $_GET['senior_male_now'],
				'senior_female_cum' 				=> $_GET['senior_female_cum'],
				'senior_female_now' 				=> $_GET['senior_female_now'],
				'pregnant_cum' 						=> $_GET['pregnant_cum'],
				'pregnant_now' 						=> $_GET['pregnant_now'],
				'lactating_mother_cum' 				=> $_GET['lactating_mother_cum'],
				'lactating_mother_now' 				=> $_GET['lactating_mother_now'],
				'unaccompanied_minor_male_cum' 		=> $_GET['unaccompanied_minor_male_cum'],
				'unaccompanied_minor_male_now' 		=> $_GET['unaccompanied_minor_male_now'],
				'unaccompanied_minor_female_cum' 	=> $_GET['unaccompanied_minor_female_cum'],
				'unaccompanied_minor_female_now' 	=> $_GET['unaccompanied_minor_female_now'],
				'pwd_male_cum' 						=> $_GET['pwd_male_cum'],
				'pwd_male_now' 						=> $_GET['pwd_male_now'],
				'pwd_female_cum' 					=> $_GET['pwd_female_cum'],
				'pwd_female_now' 					=> $_GET['pwd_female_now'],
				'solo_parent_male_cum'				=> $_GET['solo_parent_male_cum'],
				'solo_parent_male_now'				=> $_GET['solo_parent_male_now'],
				'solo_parent_female_cum' 			=> $_GET['solo_parent_female_cum'],
				'solo_parent_female_now' 			=> $_GET['solo_parent_female_now'],
				'ip_male_cum' 						=> $_GET['ip_male_cum'],
				'ip_male_now' 						=> $_GET['ip_male_now'],
				'ip_female_cum' 					=> $_GET['ip_female_cum'],
				'ip_female_now' 					=> $_GET['ip_female_now']
			);
			
			echo json_encode($data['result'][] = $this->Disaster_model->saveSexAgeData($_GET['disaster_title_id'], $_GET['municipality_id'], $data),JSON_NUMERIC_CHECK);

		}

		public function deleteSexAgeData(){
			echo json_encode($data['result'][] = $this->Disaster_model->deleteSexAgeData($_GET['disaster_title_id'], $_GET['municipality_id']),JSON_NUMERIC_CHECK);
		}

		public function updateSexAgeData(){

			$data = array(
				'infant_male_cum' 					=> $_GET['infant_male_cum'],
				'infant_male_now'					=> $_GET['infant_male_now'],
				'infant_female_cum' 				=> $_GET['infant_female_cum'],
				'infant_female_now' 				=> $_GET['infant_female_now'],
				'toddlers_male_cum' 				=> $_GET['toddlers_male_cum'],
				'toddlers_male_now' 				=> $_GET['toddlers_male_now'],
				'toddlers_female_cum' 				=> $_GET['toddlers_female_cum'],
				'toddlers_female_now' 				=> $_GET['toddlers_female_now'],
				'preschoolers_male_cum' 			=> $_GET['preschoolers_male_cum'],
				'preschoolers_male_now' 			=> $_GET['preschoolers_male_now'],
				'preschoolers_female_cum' 			=> $_GET['preschoolers_female_cum'],
				'preschoolers_female_now' 			=> $_GET['preschoolers_female_now'],
				'schoolage_male_cum' 				=> $_GET['schoolage_male_cum'],
				'schoolage_male_now' 				=> $_GET['schoolage_male_now'],
				'schoolage_female_cum' 				=> $_GET['schoolage_female_cum'],
				'schoolage_female_now' 				=> $_GET['schoolage_female_now'],
				'teenage_male_cum' 					=> $_GET['teenage_male_cum'],
				'teenage_male_now' 					=> $_GET['teenage_male_now'],
				'teenage_female_cum' 				=> $_GET['teenage_female_cum'],
				'teenage_female_now' 				=> $_GET['teenage_female_now'],
				'adult_male_cum' 					=> $_GET['adult_male_cum'],
				'adult_male_now' 					=> $_GET['adult_male_now'],
				'adult_female_cum' 					=> $_GET['adult_female_cum'],
				'adult_female_now' 					=> $_GET['adult_female_now'],
				'senior_male_cum' 					=> $_GET['senior_male_cum'],
				'senior_male_now' 					=> $_GET['senior_male_now'],
				'senior_female_cum' 				=> $_GET['senior_female_cum'],
				'senior_female_now' 				=> $_GET['senior_female_now'],
				'pregnant_cum' 						=> $_GET['pregnant_cum'],
				'pregnant_now' 						=> $_GET['pregnant_now'],
				'lactating_mother_cum' 				=> $_GET['lactating_mother_cum'],
				'lactating_mother_now' 				=> $_GET['lactating_mother_now'],
				'unaccompanied_minor_male_cum' 		=> $_GET['unaccompanied_minor_male_cum'],
				'unaccompanied_minor_male_now' 		=> $_GET['unaccompanied_minor_male_now'],
				'unaccompanied_minor_female_cum' 	=> $_GET['unaccompanied_minor_female_cum'],
				'unaccompanied_minor_female_now' 	=> $_GET['unaccompanied_minor_female_now'],
				'pwd_male_cum' 						=> $_GET['pwd_male_cum'],
				'pwd_male_now' 						=> $_GET['pwd_male_now'],
				'pwd_female_cum' 					=> $_GET['pwd_female_cum'],
				'pwd_female_now' 					=> $_GET['pwd_female_now'],
				'solo_parent_male_cum'				=> $_GET['solo_parent_male_cum'],
				'solo_parent_male_now'				=> $_GET['solo_parent_male_now'],
				'solo_parent_female_cum' 			=> $_GET['solo_parent_female_cum'],
				'solo_parent_female_now' 			=> $_GET['solo_parent_female_now'],
				'ip_male_cum' 						=> $_GET['ip_male_cum'],
				'ip_male_now' 						=> $_GET['ip_male_now'],
				'ip_female_cum' 					=> $_GET['ip_female_cum'],
				'ip_female_now' 					=> $_GET['ip_female_now']
			);
			
			echo json_encode($data['result'][] = $this->Disaster_model->updateSexAgeData($_GET['disaster_title_id'], $_GET['municipality_id'], $data),JSON_NUMERIC_CHECK);

		}

		public function closeAllECs(){

			echo json_encode($data['result'][] = $this->Disaster_model->closeAllECs($_GET['urlID'], $_GET['municipality_id']),JSON_NUMERIC_CHECK);
		}

	}
