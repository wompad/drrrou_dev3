<?php

	class Mswd_model extends CI_Model{

		public function __construct(){
			$this->load->database();
		}

		public function send_sms($number,$body){

			$con = mysqli_connect("172.26.158.250",'drr_sms','disasteraction','sms_server');

			$tquery = mysqli_query($con,"INSERT INTO Messages (Body, ToAddress, DirectionID, TypeID, StatusID, CustomField2) VALUES ('$body', '$number', 2, 1, 1,'DRRROU')");

		}

		public function get_provinces(){

			$query = $this->db->get('tbl_provinces');
			return $query->result_array();
		}

		public function get_munics(){
			$query = $this->db->query('SELECT * FROM tbl_municipality t1 ORDER BY t1.ID ASC');
			return $query->result_array();
		}

		public function insert_mswdos($data){
			$query = $this->db->insert('tbl_mswd', $data);

			if($query){
				return 1;
			}else{
				return 0;
			}
		}

		public function get_mswdos(){
			$query = $this->db->query(
					"SELECT t1.*,t2.province_name, t3.municipality_name FROM tbl_mswd t1 LEFT JOIN tbl_provinces t2 ON t1.province_id = t2.id
					LEFT JOIN tbl_municipality t3 on t1.municipality_id = t3.id"
				);
			return $query->result_array();
		}

		public function get_mswdosinfo($data){
			$query = $this->db->query(
					"SELECT * FROM tbl_mswd WHERE id = $data"
				);	
			return $query->result_array();
		}

		function update_mswd($id,$data){
			$query = $this->db->where('id', $id);
			$query = $this->db->update('tbl_mswd', $data);

			if($query){
				return 1;
			}else{
				return 0;
			}
		}

		function delete_mswdo($id){
			$query = $this->db->where('id', $id);
			$query = $this->db->delete('tbl_mswd');

			if($query){
				return 1;
			}else{
				return 0;
			}
		}

	}