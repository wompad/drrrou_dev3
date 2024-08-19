<?php

class Disaster_model extends CI_Model{

		public function __construct(){

			$this->load->database();

		}


		public function new_disaster($data){
			$query = $this->db->insert('tbl_dromic',$data);

			if($query){
				return 1;
			}else{
				return 0;
			}
		}

		public function get_disaster($username){

			$query = $this->db->query("SELECT
											t1.id, t1.disaster_name, t1.disaster_date, t1.tcount, t1.maxid
										FROM
											(
												SELECT
													t1.*, t2.can_access_username
												FROM
													(
														SELECT
															*
														FROM
															(
																SELECT DISTINCT
																	ON (t1. ID) t1.*
																FROM
																	(
																		SELECT
																			t1.*
																		FROM
																			(
																				SELECT
																					t1. ID,
																					t1.disaster_name,
																					t1.disaster_date,
																					COALESCE (t2.tcount, 0) tcount,
																					t3. ID AS maxid
																				FROM
																					tbl_dromic t1
																				LEFT JOIN (
																					SELECT
																						t1.dromic_id,
																						COUNT (*) AS tcount
																					FROM
																						tbl_disaster_title t1
																					GROUP BY
																						t1.dromic_id
																				) t2 ON t1. ID = t2.dromic_id
																				LEFT JOIN tbl_disaster_title t3 ON t1. ID = t3.dromic_id
																				WHERE
																					t1. ID > 3
																				ORDER BY
																					t1.disaster_date :: DATE DESC
																			) t1
																		ORDER BY
																			t1. ID DESC,
																			t1.maxid DESC
																	) t1
																ORDER BY
																	t1. ID DESC,
																	t1.maxid DESC,
																	t1.disaster_date :: DATE DESC
															) t1
														ORDER BY
															t1.disaster_date DESC
													) t1
												RIGHT JOIN (
													SELECT
														*
													FROM
														tbl_reports_assignment
												) t2 ON t1. ID = t2.dromic_id
										)t1
										WHERE t1.can_access_username = '$username'
										UNION ALL
										(
										SELECT
															*
														FROM
															(
																SELECT DISTINCT
																	ON (t1. ID) t1.*
																FROM
																	(
																		SELECT
																			t1.*
																		FROM
																			(
																				SELECT
																					t1. ID,
																					t1.disaster_name,
																					t1.disaster_date,
																					COALESCE (t2.tcount, 0) tcount,
																					t3. ID AS maxid
																				FROM
																					tbl_dromic t1
																				LEFT JOIN (
																					SELECT
																						t1.dromic_id,
																						COUNT (*) AS tcount
																					FROM
																						tbl_disaster_title t1
																					GROUP BY
																						t1.dromic_id
																				) t2 ON t1. ID = t2.dromic_id
																				LEFT JOIN tbl_disaster_title t3 ON t1. ID = t3.dromic_id
																				WHERE
																					t1. ID > 3
																				AND t1.created_by_user = '$username'
																				ORDER BY
																					t1.disaster_date :: DATE DESC
																			) t1
																		ORDER BY
																			t1. ID DESC,
																			t1.maxid DESC
																	) t1
																ORDER BY
																	t1. ID DESC,
																	t1.maxid DESC,
																	t1.disaster_date :: DATE DESC
															) t1
														ORDER BY
															t1.disaster_date DESC
										)

									 ");

			return $query->result_array();
			
		}

		public function get_my_disaster($username){

			$data = array();

			$rs = array();

			$provinceid 		= "";
			$municipality_id 	= "";

			$query = $this->db->query("SELECT
											*
										FROM
											(
												SELECT DISTINCT
													ON (t1. ID) t1.*
												FROM
													(
														SELECT
															t1.*
														FROM
															(
																SELECT
																	t1. ID,
																	t1.disaster_name,
																	t1.disaster_date,
																	COALESCE (t2.tcount, 0) tcount,
																	t3. ID AS maxid
																FROM
																	tbl_dromic t1
																LEFT JOIN (
																	SELECT
																		t1.dromic_id,
																		COUNT (*) AS tcount
																	FROM
																		tbl_disaster_title t1
																	GROUP BY
																		t1.dromic_id
																) t2 ON t1. ID = t2.dromic_id
																LEFT JOIN tbl_disaster_title t3 ON t1. ID = t3.dromic_id
																WHERE
																	t1. ID > 3
																	AND t1.created_by_user = '$username'
																ORDER BY
																	t1.disaster_date :: DATE DESC
															) t1
														ORDER BY
															t1. ID DESC,
															t1.maxid DESC
													) t1
												ORDER BY
													t1. ID DESC,
													t1.maxid DESC,
													t1.disaster_date :: DATE DESC
											) t1
										ORDER BY
											t1.disaster_date DESC
									 ");

			$data['disaster'] = $query->result_array();

			// if($username == 'jlompad'){

			// 	$isdswd = 't';

			// }else{

			// 	$isdswd = 'f';

			// }

			$q3 = $this->db->query("SELECT * FROM tbl_auth_users WHERE username = '$username' and issuperadmin = 't'");

			if($q3->num_rows() > 0){

				$query1 = $this->db->query("SELECT
											UPPER (
												CONCAT (
													t1.firstname,
													' ',
													t1.lastname
												)
											) fullname,
											t2.province_name,
											t3.municipality_name,
											t1.agency,
											t1.designation,
											t1.username
										FROM
											tbl_auth_users t1
										LEFT JOIN tbl_provinces t2 ON t1.provinceid = t2. ID
										LEFT JOIN tbl_municipality t3 ON t1.municipality_id = t3. ID
										ORDER BY
											t1. ID"
									);


			}else{


				$q2 = $this->db->query("SELECT provinceid, municipality_id FROM tbl_auth_users WHERE username = '$username'");

				$rs['prv'] = $q2->result_array();

				$provinceid 		= $rs['prv'][0]['provinceid'];
				$municipality_id 	= $rs['prv'][0]['municipality_id'];



				$query1 = $this->db->query("SELECT
												UPPER (
													CONCAT (
														t1.firstname,
														' ',
														t1.lastname
													)
												) fullname,
												t2.province_name,
												t3.municipality_name,
												t1.agency,
												t1.designation,
												t1.username
											FROM
												tbl_auth_users t1
											LEFT JOIN tbl_provinces t2 ON t1.provinceid = t2. ID
											LEFT JOIN tbl_municipality t3 ON t1.municipality_id = t3. ID
											WHERE
											t1.provinceid = '$provinceid'
											AND t1.municipality_id = '$municipality_id'
											ORDER BY
												t1. ID"
										);


			}

			

			$data['users'] = $query1->result_array();

			return $data;
			
		}

		public function get_evacuation_stats($id){

			session_start();

			$aff_munis_all = array();

			$query_title = $this->db->query("SELECT
												t1.*,
												t2.disaster_name,
												t2.disaster_date
											FROM
												tbl_disaster_title t1
											LEFT JOIN public.tbl_dromic t2 ON t1.dromic_id = t2. ID
											WHERE
												t1. ID = $id -- disaster_title_id
									");

			$query = $this->db->query("SELECT
											t1. ID dromic_id,
											t3.*
										FROM
											public.tbl_disaster_title t1
										LEFT JOIN public.tbl_dromic t2 ON t1.dromic_id = t2. ID
										LEFT JOIN public.tbl_evacuation_stats t3 ON t1. ID = t3.disaster_title_id
										LEFT JOIN public.tbl_municipality t4 ON t3.municipality_id = t4. ID
										-- LEFT JOIN tbl_provinces t5 ON t3.provinceid = t5. ID
										-- LEFT JOIN tbl_barangay t6 ON CONCAT('0',t3.brgy_located)::integer = t6.id::integer
										WHERE
											t1. ID = '$id' -- disaster_title_id
										ORDER BY
											--t3.municipality_id ASC, t3.evacuation_name ASC, t3.ec_cum DESC, t3.place_of_origin ASC
											
											-- original ni nga codet3.municipality_id ASC, t3.place_of_origin ASC, t3.evacuation_name ASC, t3.ec_cum DESC
											t3.municipality_id ASC, t3.brgy_located_ec ASC, t3.place_of_origin ASC, t3.evacuation_name ASC, t3.ec_cum DESC
									");

			$query1 = $this->db->query("SELECT DISTINCT
											ON (t1.municipality_id) t1.municipality_id ID,
											t2.municipality_name,
											t1.provinceid
										FROM
											(
												SELECT DISTINCT
													ON (t1.municipality_id) t1.municipality_id,
													t1.provinceid
												FROM
													(
														SELECT
															t1.municipality_id,
															t1.provinceid
														FROM
															tbl_evacuation_stats t1
														WHERE
															t1.disaster_title_id = '$id'
														UNION ALL
															(
																SELECT
																	t1.municipality_id,
																	t1.provinceid
																FROM
																	tbl_casualty_asst t1
																WHERE
																	t1.disaster_title_id = '$id'
															)
														UNION ALL
															(
																SELECT
																	t1.municipality_id,
																	t1.provinceid
																FROM
																	tbl_evac_outside_stats t1
																WHERE
																	t1.disaster_title_id = '$id'
															)
														UNION ALL
															(
																SELECT
																	t1.municipality_id,
																	t1.provinceid
																FROM
																	tbl_affected t1
																WHERE
																	t1.disaster_title_id = '$id'
															)
													) t1
											) t1
										LEFT JOIN tbl_municipality t2 ON t1.municipality_id = t2. ID
										ORDER BY
											t1.municipality_id,
											t1.provinceid
									");


			$querybrgy = $this->db->query("SELECT
												t1.*, t2.municipality_name, t3.province_name
											FROM
												public.tbl_barangay t1
											LEFT JOIN public.tbl_municipality t2 ON t1.municipality_id = t2.id
											LEFT JOIN public.tbl_provinces t3 ON t1.provinceid = t3.id ORDER BY t1.id");

			$query2 = $this->db->query("SELECT
											t5.province_name,
											t4.municipality_name,
											COALESCE (
												t6.brgy_name,
												'NOT INDICATED'
											) brgy_name,
											t1. ID dromic_id,
											t3.*
										FROM
											public.tbl_disaster_title t1
										LEFT JOIN public.tbl_dromic t2 ON t1.dromic_id = t2. ID
										LEFT JOIN public.tbl_evac_outside_stats t3 ON t1. ID = t3.disaster_title_id
										LEFT JOIN public.tbl_municipality t4 ON t3.municipality_id = t4. ID
										LEFT JOIN public.tbl_provinces t5 ON t3.provinceid = t5. ID
										LEFT JOIN public.tbl_barangay t6 ON t3.brgy_host :: CHARACTER VARYING = t6. ID :: CHARACTER VARYING
										WHERE
											t3.disaster_title_id = $id -- disaster_title_id
										ORDER BY
											t3.municipality_id,
											t3.brgy_host
									");

			$query_sex_age = $this->db->query("SELECT
													t5.province_name,
													t4.municipality_name,
													t1.ID dromic_id,
													t3.* 
												FROM
													PUBLIC.tbl_disaster_title t1
													LEFT JOIN PUBLIC.tbl_dromic t2 ON t1.dromic_id = t2.ID 
													LEFT JOIN PUBLIC.tbl_sex_age_sector_data t3 ON t1.ID = t3.disaster_title_id
													LEFT JOIN PUBLIC.tbl_municipality t4 ON t3.municipality_id = t4.ID 
													LEFT JOIN PUBLIC.tbl_provinces t5 ON t3.province_id = t5.ID
												WHERE
													t3.disaster_title_id = '$id' -- disaster_title_id
													
												ORDER BY
													t3.municipality_id
																					");

			$masterquery = $this->db->query("SELECT
												t1.provinceid,
												t1.municipality_id,
												SUM (family_a_t) family_a_t,
												SUM (person_a_t) person_a_t,
												SUM (family_cum_i) family_cum_i,
												SUM (family_now_i) family_now_i,
												SUM (person_cum_i) person_cum_i,
												SUM (person_now_i) person_now_i,
												SUM (family_cum_o) family_cum_o,
												SUM (family_now_o) family_now_o,
												SUM (person_cum_o) person_cum_o,
												SUM (person_now_o) person_now_o,
												SUM (family_cum_s_t) family_cum_s_t,
												SUM (family_now_s_t) family_now_s_t,
												SUM (person_cum_s_t) person_cum_s_t,
												SUM (person_now_s_t) person_now_s_t
											FROM
												(
													SELECT
														t1.provinceid,
														t1.municipality_id,
														COALESCE (t1.family_cum_i, '0') + COALESCE (t1.family_cum_o, '0') family_a_t,
														COALESCE (t1.person_cum_i, '0') + COALESCE (t1.person_cum_o, '0') person_a_t,
														t1.family_cum_i,
														t1.family_now_i,
														t1.person_cum_i,
														t1.person_now_i,
														t1.family_cum_o,
														t1.family_now_o,
														t1.person_cum_o,
														t1.person_now_o,
														COALESCE (t1.family_cum_i, '0') + COALESCE (t1.family_cum_o, '0') family_cum_s_t,
														COALESCE (t1.family_now_i, '0') + COALESCE (t1.family_now_o, '0') family_now_s_t,
														COALESCE (t1.person_cum_i, '0') + COALESCE (t1.person_cum_o, '0') person_cum_s_t,
														COALESCE (t1.person_now_i, '0') + COALESCE (t1.person_now_o, '0') person_now_s_t
													FROM
														(
															SELECT
																t1.provinceid,
																t1.municipality_id,
																t1.family_cum_i,
																t1.family_now_i,
																t1.person_cum_i,
																t1.person_now_i,
																t1.family_cum_o,
																t1.family_now_o,
																t1.person_cum_o,
																t1.person_now_o
															FROM
																(
																	SELECT
																		t0.*
																	FROM
																		(
																			SELECT
																				t1.provinceid,
																				t1.municipality_id,
																				t1.family_cum :: INTEGER family_cum_i,
																				t1.family_now :: INTEGER family_now_i,
																				t1.person_cum :: INTEGER person_cum_i,
																				t1.person_now :: INTEGER person_now_i,
																				'0' :: INTEGER family_cum_o,
																				'0' :: INTEGER family_now_o,
																				'0' :: INTEGER person_cum_o,
																				'0' :: INTEGER person_now_o
																			FROM
																				PUBLIC .tbl_evacuation_stats t1
																			LEFT JOIN PUBLIC .tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
																			WHERE
																				t1.disaster_title_id = $id
																			ORDER BY
																				t1.municipality_id
																		) t0
																	UNION ALL
																		(
																			SELECT
																				t1.provinceid,
																				t1.municipality_id,
																				'0' :: INTEGER family_cum_i,
																				'0' :: INTEGER family_now_i,
																				'0' :: INTEGER person_cum_i,
																				'0' :: INTEGER person_now_i,
																				t1.family_cum :: INTEGER family_cum_o,
																				t1.family_now :: INTEGER family_now_o,
																				t1.person_cum :: INTEGER person_cum_o,
																				t1.person_now :: INTEGER person_now_o
																			FROM
																				PUBLIC .tbl_evac_outside_stats t1
																			LEFT JOIN PUBLIC .tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
																			WHERE
																				t1.disaster_title_id = $id
																			ORDER BY
																				t1.municipality_id
																		)
																	UNION ALL
																		(
																			SELECT
																				t1.provinceid,
																				t1.municipality_id,
																				'0' :: INTEGER family_cum_i,
																				'0' :: INTEGER family_now_i,
																				'0' :: INTEGER person_cum_i,
																				'0' :: INTEGER person_now_i,
																				'0' :: INTEGER family_cum_o,
																				'0' :: INTEGER family_now_o,
																				'0' :: INTEGER person_cum_o,
																				'0' :: INTEGER person_now_o
																			FROM
																				PUBLIC .tbl_casualty_asst t1
																			LEFT JOIN PUBLIC .tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
																			WHERE
																				t1.disaster_title_id = $id
																				AND t1.brgy_id <> ''
																				AND (t1.totally_damaged::integer <> 0 OR t1.partially_damaged::integer <> 0)
																			ORDER BY
																				t1.municipality_id
																		)
																	UNION ALL
																		(
																			SELECT
																				t1.provinceid,
																				t1.municipality_id,
																				'0' :: INTEGER family_cum_i,
																				'0' :: INTEGER family_now_i,
																				'0' :: INTEGER person_cum_i,
																				'0' :: INTEGER person_now_i,
																				'0' :: INTEGER family_cum_o,
																				'0' :: INTEGER family_now_o,
																				'0' :: INTEGER person_cum_o,
																				'0' :: INTEGER person_now_o
																			FROM
																				PUBLIC .tbl_affected t1
																			LEFT JOIN PUBLIC .tbl_disaster_title t2 ON t1.disaster_title_id::integer = t2. ID
																			WHERE
																				t1.disaster_title_id::integer = $id
																				AND t1.brgy_affected <> 0
																				AND (t1.fam_no <> 0 OR t1.person_no <> 0)
																			ORDER BY
																				t1.municipality_id
																		)
																) t1
														) t1
													ORDER BY
														t1.municipality_id
												) t1
											GROUP BY
												t1.provinceid,
												t1.municipality_id
											ORDER BY
												t1.municipality_id
									");

			$masterquery2 = $this->db->query("SELECT
													t1.provinceid,
													t1.municipality_id,
													MAX ( brgynum ) brgynum 
												FROM
													(
													SELECT
														* 
													FROM
														(
														SELECT
															t1.* 
														FROM
															(
															SELECT
																t1.provinceid,
																t1.municipality_id,
																COUNT ( t1.brgy :: INTEGER ) brgynum 
															FROM
																(
																SELECT
																	* 
																FROM
																	(
																	SELECT DISTINCT ON
																		( t1.brgy ) t1.provinceid,
																		t1.municipality_id,
																		CONCAT ( '0', t1.brgy ) :: INTEGER brgy 
																	FROM
																		(
																		SELECT DISTINCT ON
																			( tx.brgy ) tx.provinceid,
																			tx.municipality_id,
																			CONCAT ( '0', tx.brgy ) :: INTEGER brgy 
																		FROM
																			(
																			SELECT DISTINCT
																				tx.* 
																			FROM
																				(
																				SELECT
																					t4.provinceid,
																					t4.municipality_id,
																					regexp_split_to_table( t4.brgy_located, '[\\s,]+' ) brgy 
																				FROM
																					PUBLIC.tbl_evacuation_stats t4
																					LEFT JOIN PUBLIC.tbl_disaster_title t5 ON t4.disaster_title_id = t5.ID 
																				WHERE
																					t4.disaster_title_id = '$id' -- disaster_title_id
																					
																				GROUP BY
																					t4.municipality_id,
																					t4.provinceid,
																					t4.brgy_located 
																				ORDER BY
																					t4.brgy_located ASC,
																					t4.municipality_id ASC 
																				) tx UNION ALL
																				(
																				SELECT DISTINCT ON
																					( t1.brgy ) * 
																				FROM
																					(
																					SELECT
																						* 
																					FROM
																						(
																						SELECT DISTINCT ON
																							( t4.brgy_host ) t4.provinceid,
																							t4.municipality_id,
																							t4.brgy_host brgy 
																						FROM
																							PUBLIC.tbl_evac_outside_stats t4
																							LEFT JOIN PUBLIC.tbl_disaster_title t5 ON t4.disaster_title_id = t5.ID 
																						WHERE
																							t4.disaster_title_id = '$id' -- disaster_title_id
																							
																							AND t4.brgy_host <> '0' 
																						GROUP BY
																							t4.municipality_id,
																							t4.provinceid,
																							t4.brgy_host 
																						ORDER BY
																							t4.brgy_host ASC,
																							t4.municipality_id ASC 
																						) t1 UNION ALL
																						(
																						SELECT DISTINCT ON
																							( t4.brgy_origin ) t4.provinceid,
																							t4.municipality_id,
																							t4.brgy_origin brgy 
																						FROM
																							PUBLIC.tbl_evac_outside_stats t4
																							LEFT JOIN PUBLIC.tbl_disaster_title t5 ON t4.disaster_title_id = t5.ID 
																						WHERE
																							t4.disaster_title_id = '$id' -- disaster_title_id
																							
																							AND t4.brgy_origin ~ '^\d+(.\d+)?$' = TRUE 
																						GROUP BY
																							t4.municipality_id,
																							t4.provinceid,
																							t4.brgy_origin 
																						ORDER BY
																							t4.brgy_origin ASC,
																							t4.municipality_id ASC 
																						) 
																					) t1 
																				) UNION ALL
																				(
																				SELECT
																					t1.* 
																				FROM
																					(
																					SELECT DISTINCT ON
																						( t1.brgy ) t1.provinceid,
																						t1.municipality_id,
																						t1.brgy 
																					FROM
																						(
																						SELECT
																							t1.* 
																						FROM
																							(
																							SELECT
																								t1.provinceid,
																								t1.municipality_id,
																								regexp_split_to_table( t1.brgy_id, '[\\s|]+' ) brgy 
																							FROM
																								PUBLIC.tbl_casualty_asst t1 
																							WHERE
																								t1.disaster_title_id = '$id'
																								AND (t1.brgy_id <> '' AND t1.brgy_id is not null)
																							) t1 
																						) t1 
																					ORDER BY
																						t1.brgy 
																					) t1 
																				ORDER BY
																					t1.provinceid,
																					t1.municipality_id,
																					t1.brgy 
																				) 
																			) tx 
																		ORDER BY
																			tx.brgy 
																		) t1 
																	ORDER BY
																		t1.brgy 
																	) t1 
																) t1 
															GROUP BY
																t1.provinceid,
																t1.municipality_id 
															) t1 
														ORDER BY
															t1.provinceid,
															t1.municipality_id 
														) t1 UNION ALL
														( SELECT 
															t2.provinceid, 
															t2.municipality_id, 
															brgy_affected brgy 
															FROM tbl_affected t2 
															WHERE t2.disaster_title_id = '$id'
															AND (t2.fam_no > 0 AND t2.person_no > 0)
														) 
													) t1 
												GROUP BY
													t1.provinceid,
													t1.municipality_id 
												ORDER BY
													t1.provinceid ASC,
													t1.municipality_id ASC 
			");

		// $masterquery2 = $this->db->query("
			// 								SELECT
			// 									provinceid,
			// 									municipality_id,
			// 									brgy_affected AS brgynum
			// 								FROM
			// 									tbl_affected t1 
			// 								WHERE
			// 									t1.disaster_title_id :: INTEGER = $id AND t1.brgy_affected <> 0
		// ");

			$masterquery3 = $this->db->query("SELECT
												t1.provinceid,
												t1.municipality_id,
												t1.ec_cum,
												t1.ec_now
											FROM
												public.tbl_evacuation_stats t1
											LEFT JOIN public.tbl_disaster_title t3 ON t1.disaster_title_id = t3. ID
											WHERE t1.ec_cum <> ''
											AND t1.disaster_title_id = $id -- disaster_title_id
											ORDER BY t1.municipality_id
									");
			$query_casualty_title = $this->db->query("SELECT
														t1.*,
														t3.municipality_name
													FROM
														public.tbl_casualty_asst t1
													LEFT JOIN public.tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
													LEFT JOIN public.tbl_municipality t3 ON t1.municipality_id = t3.id
													WHERE
														t2. ID = $id -- disaster_title_id
													ORDER BY
														t1.municipality_id
									");

			$query_casualties = $this->db->query("SELECT
													t1. ID,
													t1.disaster_title_id,
													UPPER (t1.lastname) lastname,
													UPPER (t1.firstname) firstname,
													UPPER (t1.middle_i) middle_i,
													UPPER (t1.gender) gender,
													t1.provinceid,
													t1.municipalityid,
													UPPER (t1.brgyname) brgyname,
													t1.isdead,
													t1.ismissing,
													t1.isinjured,
													UPPER (t1.remarks) remarks,
													t1.age,
													t3.municipality_name,
													t4.province_name
												FROM
													public.tbl_casualty t1
												LEFT JOIN public.tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
												LEFT JOIN public.tbl_municipality t3 ON t1.municipalityid = t3. ID
												LEFT JOIN public.tbl_provinces t4 ON t1.provinceid = t4. ID
												WHERE
													t1.disaster_title_id = $id -- disaster_title_id
												ORDER BY
													t1.provinceid,
													t1.municipalityid,
													t1.brgyname
								");

			$query_dam_per_brgy = $this->db->query("SELECT
														t1.*,
														t2.brgy_name
													FROM
														public.tbl_damage_per_brgy t1
													LEFT JOIN public.tbl_barangay t2 ON t1.brgy_id = t2.id
													WHERE
														t1.disaster_title_id = $id
													ORDER BY t1.id
								");

			$query_all_affected = $this->db->query("SELECT
														t1.*
													FROM
														public.tbl_affected t1
													WHERE
														t1.disaster_title_id = '$id'
													ORDER BY t1.id
								");

			$query_all_munis = $this->db->query("SELECT
													COUNT (t1.municipality_id) all_munis,
													t1.iscity
												FROM
													(
														SELECT
															t1.*, t2.iscity
														FROM
															(
																SELECT DISTINCT
																	(t1.municipality_id)
																FROM
																	(
																		SELECT DISTINCT
																			(municipality_id)
																		FROM
																			PUBLIC .tbl_evacuation_stats t1
																		WHERE
																			disaster_title_id = $id
																		UNION ALL
																			(
																				SELECT DISTINCT
																					(t2.municipality_id)
																				FROM
																					PUBLIC .tbl_evac_outside_stats t2
																				WHERE
																					t2.disaster_title_id = $id
																			)
																		UNION ALL
																			(
																				SELECT DISTINCT
																					(t3.municipality_id)
																				FROM
																					PUBLIC .tbl_casualty_asst t3
																				WHERE
																					disaster_title_id = $id
																			)
																		UNION ALL
																			(
																				SELECT DISTINCT
																					(t4.municipality_id)
																				FROM
																					PUBLIC .tbl_affected t4
																				WHERE
																					disaster_title_id::integer = $id
																			)
																	) t1
																WHERE
																	t1.municipality_id < 74
															) t1
														LEFT JOIN PUBLIC .tbl_municipality t2 ON t1.municipality_id = t2. ID
													) t1
												GROUP BY
													t1.iscity
								");

			$query_all_prov_chart = $this->db->query("SELECT
														t3.id,
														t3.province_name,
														SUM(t1.family_cum) fam_cum
													FROM
														(
															SELECT
																SUM (t1.family_cum :: NUMERIC) AS family_cum,
																t1.municipality_id,
																t1.municipality_name,
																t1.disaster_title
															FROM
																(
																	SELECT
																		SUM (t1.family_cum :: NUMERIC) AS family_cum,
																		t1.municipality_id,
																		t3.municipality_name,
																		t2.disaster_title
																	FROM
																		public.tbl_evacuation_stats t1
																	LEFT JOIN public.tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
																	LEFT JOIN public.tbl_municipality t3 ON t1.municipality_id = t3. ID
																	WHERE
																		t1.disaster_title_id = $id
																	GROUP BY
																		t1.municipality_id,
																		t3.municipality_name,
																		t2.disaster_title
																	UNION ALL
																		(
																			SELECT
																				SUM (t1.family_cum :: NUMERIC) AS family_cum,
																				t1.municipality_id,
																				t3.municipality_name,
																				t2.disaster_title
																			FROM
																				public.tbl_evac_outside_stats t1
																			LEFT JOIN public.tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
																			LEFT JOIN public.tbl_municipality t3 ON t1.municipality_id = t3. ID
																			WHERE
																				t1.disaster_title_id = $id
																			GROUP BY
																				t1.municipality_id,
																				t3.municipality_name,
																				t2.disaster_title
																		)
																) t1
															GROUP BY
																t1.municipality_id,
																t1.municipality_name,
																t1.disaster_title
														) t1
													LEFT JOIN public.tbl_municipality t2 ON t1.municipality_id = t2. ID
													LEFT JOIN public.tbl_provinces t3 ON t2.provinceid = t3. ID
													GROUP BY t3.id, t3.province_name
													ORDER BY
														t3. ID
								");

			$aff_prov_chart = $query_all_prov_chart->result_array();

			$aff_prov = array();

			$aff_munis = array();
			$aff_munis_drill = array();

			$pid = "";

			for ($ii=0; $ii < count($aff_prov_chart); $ii++) { 

				$chars = 'ABCDEF0123456789';
			    $colors = '#';

			    for ( $l = 0; $l < 6; $l++ ) {
			       $colors .= $chars[rand(0, strlen($chars) - 1)];
			    }

				$aff_prov[] = array(
					'name' 			=> $aff_prov_chart[$ii]['province_name'],
					'y' 			=> (int)$aff_prov_chart[$ii]['fam_cum'],
					'drilldown' 	=> $aff_prov_chart[$ii]['province_name'],
					'color' 		=> $colors

				);

				$pid = $aff_prov_chart[$ii]['id'];


				$query_all_munis_chart = $this->db->query("SELECT
															t1.*
														FROM
															(
																SELECT
																	t3. ID,
																	t3.province_name,
																	t2.municipality_name,
																	t1.family_cum
																FROM
																	(
																		SELECT
																			SUM (t1.family_cum :: NUMERIC) AS family_cum,
																			t1.municipality_id,
																			t1.municipality_name,
																			t1.disaster_title
																		FROM
																			(
																				SELECT
																					SUM (t1.family_cum :: NUMERIC) AS family_cum,
																					t1.municipality_id,
																					t3.municipality_name,
																					t2.disaster_title
																				FROM
																					public.tbl_evacuation_stats t1
																				LEFT JOIN public.tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
																				LEFT JOIN public.tbl_municipality t3 ON t1.municipality_id = t3. ID
																				WHERE
																					t1.disaster_title_id = $id
																				GROUP BY
																					t1.municipality_id,
																					t3.municipality_name,
																					t2.disaster_title
																				UNION ALL
																					(
																						SELECT
																							SUM (t1.family_cum :: NUMERIC) AS family_cum,
																							t1.municipality_id,
																							t3.municipality_name,
																							t2.disaster_title
																						FROM
																							public.tbl_evac_outside_stats t1
																						LEFT JOIN public.tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
																						LEFT JOIN public.tbl_municipality t3 ON t1.municipality_id = t3. ID
																						WHERE
																							t1.disaster_title_id = $id
																						GROUP BY
																							t1.municipality_id,
																							t3.municipality_name,
																							t2.disaster_title
																					)
																			) t1
																		GROUP BY
																			t1.municipality_id,
																			t1.municipality_name,
																			t1.disaster_title
																	) t1
																LEFT JOIN public.tbl_municipality t2 ON t1.municipality_id = t2. ID
																LEFT JOIN public.tbl_provinces t3 ON t2.provinceid = t3. ID
																ORDER BY
																	t3. ID
															) t1
														WHERE t1.id = '$pid'
								");

				$aff_munis_chart = $query_all_munis_chart->result_array();

				if(count($aff_munis_chart) > 0){

					for ($iii=0; $iii < count($aff_munis_chart); $iii++) { 

						$chars = 'ABCDEF0123456789';
					    $colors = '#';

					    for ( $ll = 0; $ll < 6; $ll++ ) {
					       $colors .= $chars[rand(0, strlen($chars) - 1)];
					    }

						$aff_munis[] = array(
							'name' 			=> $aff_munis_chart[$iii]['municipality_name'],
							'y' 			=> (int)$aff_munis_chart[$iii]['family_cum'],
							'color' 		=> $colors
						);

						$aff_munis_all[] = array(
							'name' 			=> $aff_munis_chart[$iii]['municipality_name'],
							'y' 			=> (int)$aff_munis_chart[$iii]['family_cum'],
							'color' 		=> $colors
						);
					}

					$aff_munis_drill[] = array(
						'name' 			=> $aff_prov_chart[$ii]['province_name'],
						'id' 			=> $aff_prov_chart[$ii]['province_name'],
						'data' 			=> $aff_munis
					);
				}

			}

			
			$data['rs'] 					= $query->result();
			$data['rsoutside'] 				= $query2->result();
			$data['rs_sex_age'] 			= $query_sex_age->result();
			$data['city'] 					= $query1->result();
			$data['brgy'] 					= $querybrgy->result();
			$data['masterquery'] 			= $masterquery->result();
			$data['masterquery2'] 			= $masterquery2->result();
			$data['masterquery3'] 			= $masterquery3->result();
			$data['query_title'] 			= $query_title->result();
			$data['query_asst'] 			= $query_casualty_title->result();
			$data['query_casualties'] 		= $query_casualties->result();
			$data['query_damage_per_brgy'] 	= $query_dam_per_brgy->result();
			$data['query_all_munis'] 		= $query_all_munis->result();
			$data['aff_prov'] 				= $aff_prov;
			$data['aff_munis_drill'] 		= $aff_munis_drill;
			$data['aff_munis_all'] 			= $aff_munis_all;
			$data['all_affected'] 			= $query_all_affected->result();

			return $data;
			
		}

		function get_narrative_report($id){

			$query_narrative = $this->db->query("SELECT * FROM tbl_narrative_report t1 WHERE disaster_title_id = '$id' ORDER BY t1.id DESC");

			$data['narrative_report'] 		= $query_narrative->result();

			if($query_narrative->num_rows() > 0){

				return $data;

			}else{
				return 0;
			}

		}

		public function get_disasterdetail($id){

			$query = $this->db->where('id', $id);
			$query = $this->db->get('tbl_dromic');

			$query2 = $this->db->query("SELECT t1.* FROM tbl_disaster_title t1 WHERE dromic_id = $id ORDER BY t1.id DESC");
			
			$data['rs'] = $query->result_array();
			$data['rstitle'] = $query2->result_array();

			return $data;

		}

		public function savenewtitle($data){
			$this->db->insert('tbl_disaster_title', $data);
   			$insert_id = $this->db->insert_id();
   			return $insert_id;
		}

		public function save_affected($obj){

			$query = $this->db->where('municipality_id', $obj['municipality_id']);
			$query = $this->db->where('disaster_title_id', $obj['disaster_title_id']);
			$query = $this->db->get('tbl_affected');


			if(count($query->result_array()) > 0){

				return 2;

			}else{

				$this->db->trans_begin(); 

				$this->db->insert('tbl_affected', $obj);

				if ($this->db->trans_status() === FALSE)
				{
				    $this->db->trans_rollback();
				    return 0;
				}
				else
				{
				    $this->db->trans_commit();
				    return 1;
				}

			}

		}

		public function save_affected2($obj){

			$array = array(
				'fam_no' 			=> $obj['fam_no'],
				'person_no' 		=> $obj['person_no'],
				'brgy_affected' 	=> $obj['brgy_affected']
			);

			$this->db->trans_begin(); 

			$query = $this->db->where('municipality_id', $obj['municipality_id']);
			$query = $this->db->where('disaster_title_id', $obj['disaster_title_id']);
			$query = $this->db->update('tbl_affected', $array);

			if ($this->db->trans_status() === FALSE)
			{
			    $this->db->trans_rollback();
			    return 0;
			}
			else
			{
			    $this->db->trans_commit();
			    return 1;
			}

		}

		public function savenewec($data){

			$this->db->trans_begin(); 

			$this->db->insert('tbl_evacuation_stats', $data);

			if ($this->db->trans_status() === FALSE)
			{
			    $this->db->trans_rollback();
			    return 0;
			}
			else
			{
			    $this->db->trans_commit();
			    return 1;
			}

		}

		public function getAllEC($uriID,$cid){

			$query = $this->db->query("
				SELECT DISTINCT
					(t1.evacuation_name)
				FROM
					tbl_evacuation_stats t1
				WHERE
					t1.disaster_title_id = $uriID
				AND t1.municipality_id = $cid
			");

			$data['rs'] = $query->result_array();

			$query1 = $this->db->query("
				SELECT
					UPPER(t1.evacuation_name) as evacuation_name
				FROM
					tbl_evacuation_list t1
				WHERE municipality_id = '$cid'
				--WHERE
					--t1.disaster_title_id = $uriID
				--AND t1.municipality_id = $cid
			");

			$data['re'] = $query1->result_array();

			return $data;

		}

		public function getECDetail($id){

			$query = $this->db->where('id', $id);
			$query = $this->db->get('tbl_evacuation_stats');

			$data['rs'] = $query->result_array();

			$q2 = $this->db->where('provinceid', $data['rs'][0]['provinceid']);
			$q2 = $this->db->get('tbl_municipality');

			$data['city'] = $q2->result_array();

			$q3 = $this->db->where('provinceid', $data['rs'][0]['provinceid']);
			$q3 = $this->db->get('tbl_barangay');

			$data['brgy'] = $q3->result_array();

			return $data;

		}

		public function getAllOrigin($uriID,$cid){

			$query = $this->db->query("
										SELECT
											t1.*,
											t2.municipality_name
										FROM
											tbl_barangay t1
										LEFt JOIN tbl_municipality t2 ON t1.municipality_id = t2.id
										WHERE
											t1.municipality_id = '$cid'
										ORDER BY
											t1.brgy_name ASC
			");

			return $data['rs'] = $query->result_array();

		}

		public function getAllOriginBrgy($cid){

			$query = $this->db->query("
				SELECT * FROM tbl_barangay t1 WHERE t1.municipality_id = $cid ORDER BY t1.brgy_name ASC
			");

			return $data['rs'] = $query->result_array();

		}

		public function getAllOriginProvince($uriID,$cid){

			$query1 = $this->db->query("SELECT
										*
									FROM
										tbl_municipality t1
									WHERE
										t1.provinceid = $cid
									ORDER BY
										t1. ID ASC
			");

			$data['city'] = $query1->result_array();

			$query2 = $this->db->query("SELECT
										t1.*, t2.municipality_name
									FROM
										tbl_barangay t1
									LEFT JOIN tbl_municipality t2 ON t1.municipality_id = t2.id
									WHERE
										t1.provinceid = $cid
									ORDER BY
										t1.brgy_name ASC
			");

			$data['rs'] = $query2->result_array();

			return $data;

		}

		public function updateEC($id,$data){

			$this->db->trans_begin();

			$disaster_title_id = "";
			$arr = array();

			$query = $this->db->where('id', $id);
			$query = $this->db->update('tbl_evacuation_stats', $data);

			$stat1 = $this->db->trans_status();

			if($stat1 == TRUE){

				if($query){

					$q2 = $this->db->where('id', $id);
					$q2 = $this->db->get('tbl_evacuation_stats');

					$arr = $q2->result_array();

					$disaster_title_id = $arr[0]['disaster_title_id'];

					$ecname = $data['evacuation_name'];

					$data2 = array(
						'ec_now' => 0,
						'family_now' => 0,
						'person_now' => 0
					);

					if(strtolower($data['ec_status']) == 'closed'){

						$query3 = $this->db->where('LOWER(evacuation_name)', strtolower($ecname));
						$query3 = $this->db->where('disaster_title_id', $disaster_title_id);
						$query3 = $this->db->update('tbl_evacuation_stats', $data2);

						$stat2 = $this->db->trans_status();

						if($stat2 == TRUE){

							$this->db->trans_commit();

							return 1;

						}else{

							$this->db->trans_rollback();

							return 0;

						}

					}else{

						$this->db->trans_commit();
						return 1;

					}
				}else{

					$this->db->trans_rollback();
					return 0;
				}

			}else{

				$this->db->trans_rollback();
				return 0;

			}

		}

		public function getECMain($id){
			$query = $this->db->where('id', $id);
			$query = $this->db->get('tbl_disaster_title');
			return $query->result_array();
		}

		public function saveasnewrecordEC($data,$oid){

			$query = $this->db->insert('tbl_disaster_title',$data);

			if($query){

				$insert_id = $this->db->insert_id();

				$q1 = $this->db->where('disaster_title_id', $oid);
				$q1 = $this->db->get('tbl_evacuation_stats');

				$data['rs'] = $q1->result_array();

				for($i = 0 ; $i < count($data['rs']) ; $i++){

					$ec_status = $data['rs'][$i]['ec_status'];

					if((strtolower($ec_status) == strtolower("Newly-Opened")) || (strtolower($ec_status) == strtolower("Re-activated"))){
						$ec_status = "Existing";
					}

					$datai = array(	
						'disaster_title_id' 	=> $insert_id,
						'municipality_id' 		=> $data['rs'][$i]['municipality_id'], 
						'provinceid' 			=> $data['rs'][$i]['provinceid'], 
						'ec_cum' 				=> $data['rs'][$i]['ec_cum'], 
						'ec_now' 				=> $data['rs'][$i]['ec_now'], 
						'evacuation_name' 		=> $data['rs'][$i]['evacuation_name'], 
						'family_cum' 			=> $data['rs'][$i]['family_cum'], 
						'family_now' 			=> $data['rs'][$i]['family_now'], 
						'person_cum' 			=> $data['rs'][$i]['person_cum'], 
						'person_now' 			=> $data['rs'][$i]['person_now'], 
						'place_of_origin' 		=> $data['rs'][$i]['place_of_origin'], 
						'ec_status'	 			=> $ec_status,
						'brgy_located' 			=> $data['rs'][$i]['brgy_located'], 
						'brgy_located_ec' 		=> $data['rs'][$i]['brgy_located_ec'],
						'ec_remarks' 			=> $data['rs'][$i]['ec_remarks']
					); 

					$q1_a= $this->db->insert('tbl_evacuation_stats',$datai);

				}

				$q2 = $this->db->where('disaster_title_id', $oid);
				$q2 = $this->db->get('tbl_evac_outside_stats');

				$data['rs'] = $q2->result_array();

				for($i = 0 ; $i < count($data['rs']) ; $i++){
					$datai = array(	
						'disaster_title_id' 	=> $insert_id,
						'municipality_id' 		=> $data['rs'][$i]['municipality_id'],
						'provinceid' 			=> $data['rs'][$i]['provinceid'],
						'family_cum' 			=> $data['rs'][$i]['family_cum'],
						'family_now' 			=> $data['rs'][$i]['family_now'],
						'person_cum' 			=> $data['rs'][$i]['person_cum'],
						'person_now' 			=> $data['rs'][$i]['person_now'],
						'brgy_host' 			=> $data['rs'][$i]['brgy_host'],
						'brgy_origin' 			=> $data['rs'][$i]['brgy_origin'],
						'municipality_origin' 	=> $data['rs'][$i]['municipality_origin'],
						'province_origin' 		=> $data['rs'][$i]['province_origin'],
					);
					$q2_a= $this->db->insert('tbl_evac_outside_stats',$datai);
				}

				$q3 = $this->db->where('disaster_title_id', $oid);
				$q3 = $this->db->get('tbl_casualty_asst');

				$data['rs'] = $q3->result_array();

				for($i = 0 ; $i < count($data['rs']) ; $i++){
					$datai = array(	
						'disaster_title_id' 	=> $insert_id,
						'municipality_id' 		=> $data['rs'][$i]['municipality_id'],
						'provinceid' 			=> $data['rs'][$i]['provinceid'],
						'totally_damaged' 		=> $data['rs'][$i]['totally_damaged'],
						'partially_damaged' 	=> $data['rs'][$i]['partially_damaged'],
						'dead' 					=> $data['rs'][$i]['dead'],
						'injured' 				=> $data['rs'][$i]['injured'],
						'missing' 				=> $data['rs'][$i]['missing'],
						'dswd_asst' 			=> $data['rs'][$i]['dswd_asst'],
						'lgu_asst' 				=> $data['rs'][$i]['lgu_asst'],
						'ngo_asst' 				=> $data['rs'][$i]['ngo_asst'],
						'brgy_id' 				=> $data['rs'][$i]['brgy_id']

					);
					$q3_a= $this->db->insert('tbl_casualty_asst',$datai);
				}

				$q4 = $this->db->where('disaster_title_id', $oid);
				$q4 = $this->db->get('tbl_casualty');

				$data['rs'] = $q4->result_array();

				for($i = 0 ; $i < count($data['rs']) ; $i++){
					$datai = array(	
						'disaster_title_id' 	=> $insert_id,
						'lastname' 				=> $data['rs'][$i]['lastname'],
						'firstname' 			=> $data['rs'][$i]['firstname'],
						'middle_i' 				=> $data['rs'][$i]['middle_i'],
						'gender' 				=> $data['rs'][$i]['gender'],
						'provinceid' 			=> $data['rs'][$i]['provinceid'],
						'municipalityid' 		=> $data['rs'][$i]['municipalityid'],
						'brgyname' 				=> $data['rs'][$i]['brgyname'],
						'isdead' 				=> $data['rs'][$i]['isdead'],
						'ismissing' 			=> $data['rs'][$i]['ismissing'],
						'isinjured' 			=> $data['rs'][$i]['isinjured'],
						'remarks' 				=> $data['rs'][$i]['remarks'],
						'age' 					=> $data['rs'][$i]['age']
					);
					$q4_a= $this->db->insert('tbl_casualty',$datai);
				}

				$q5 = $this->db->where('disaster_title_id', $oid);
				$q5 = $this->db->get('tbl_fnfi_assistance');

				$data['rs'] = $q5->result_array();

				for($k = 0 ; $k < count($data['rs']) ; $k++){
					$datai = array(	
						'disaster_title_id' 	=> $insert_id,
						'provinceid' 			=> $data['rs'][$k]['provinceid'],
						'municipality_id' 		=> $data['rs'][$k]['municipality_id'],
						'family_served' 		=> $data['rs'][$k]['family_served'],
						'remarks' 				=> $data['rs'][$k]['remarks']
					);

					$id = $data['rs'][$k]['id'];
					$q5_a= $this->db->insert('tbl_fnfi_assistance',$datai);
					$insert_id1 = $this->db->insert_id();

					$q6 = $this->db->where('fnfi_assistance_id', $id);
					$q6 = $this->db->get('tbl_fnfi_assistance_list');

					$arr['rs'] = $q6->result_array();

					for($i = 0 ; $i < count($arr['rs']) ; $i++){
						$datai = array(	
							'fnfi_assistance_id' 	=> $insert_id1,
							'fnfi_name' 			=> $arr['rs'][$i]['fnfi_name'],
							'cost' 					=> $arr['rs'][$i]['cost'],
							'quantity' 				=> $arr['rs'][$i]['quantity'],
							'date_augmented' 		=> $arr['rs'][$i]['date_augmented']
						);
						$q6_a= $this->db->insert('tbl_fnfi_assistance_list',$datai);
					}
				}


				$q7 = $this->db->where('disaster_title_id',$oid);
				$q7 = $this->db->get('tbl_damage_per_brgy');

				$data['rs'] = $q7->result_array();

				for($i = 0 ; $i < count($data['rs']) ; $i++){

					$datai = array(	
						'disaster_title_id' 	=> $insert_id,
						'provinceid' 			=> $data['rs'][$i]['provinceid'],
						'municipality_id' 		=> $data['rs'][$i]['municipality_id'],
						'brgy_id' 				=> $data['rs'][$i]['brgy_id'],

						'totally_damaged' 		=> $data['rs'][$i]['totally_damaged'],
						'partially_damaged' 	=> $data['rs'][$i]['partially_damaged'],

						'tot_aff_fam' 			=> $data['rs'][$i]['tot_aff_fam'],
						'tot_aff_person' 		=> $data['rs'][$i]['tot_aff_person'],

						'dead' 					=> $data['rs'][$i]['dead'],
						'injured' 				=> $data['rs'][$i]['injured'],
						'missing' 				=> $data['rs'][$i]['missing'],
						'costasst_brgy' 		=> $data['rs'][$i]['costasst_brgy']
					);

					$q7_a= $this->db->insert('tbl_damage_per_brgy',$datai);

				}

				$q8 = $this->db->where('disaster_title_id',$oid);
				$q8 = $this->db->get('tbl_affected');

				$data['rs'] = $q8->result_array();

				for($i = 0 ; $i < count($data['rs']) ; $i++){

					$datai = array(	
						'provinceid' 			=> $data['rs'][$i]['provinceid'],
						'municipality_id' 		=> $data['rs'][$i]['municipality_id'],
						'fam_no' 				=> $data['rs'][$i]['fam_no'],
						'person_no' 			=> $data['rs'][$i]['person_no'],
						'disaster_title_id' 	=> $insert_id,
						'brgy_affected' 		=> $data['rs'][$i]['brgy_affected']
					);

					$q8_a= $this->db->insert('tbl_affected',$datai);

				}

				$q9 = $this->db->where('disaster_title_id',$oid);
				$q9 = $this->db->get('tbl_sex_age_sector_data');

				$data['rs'] = $q9->result_array();

				for($i = 0 ; $i < count($data['rs']) ; $i++){

					$datasexage = array(	

						'province_id' 						=> $data['rs'][$i]['province_id'],
						'municipality_id' 					=> $data['rs'][$i]['municipality_id'],
						'infant_male_cum' 					=> $data['rs'][$i]['infant_male_cum'],
						'infant_male_now' 					=> $data['rs'][$i]['infant_male_now'],
						'infant_female_cum' 				=> $data['rs'][$i]['infant_female_cum'],
						'infant_female_now' 				=> $data['rs'][$i]['infant_female_now'],
						'toddlers_male_cum' 				=> $data['rs'][$i]['toddlers_male_cum'],
						'toddlers_male_now' 				=> $data['rs'][$i]['toddlers_male_now'],
						'toddlers_female_cum'				=> $data['rs'][$i]['toddlers_female_cum'],
						'toddlers_female_now'				=> $data['rs'][$i]['toddlers_female_now'],
						'preschoolers_male_cum' 			=> $data['rs'][$i]['preschoolers_male_cum'],
						'preschoolers_male_now' 			=> $data['rs'][$i]['preschoolers_male_now'],
						'preschoolers_female_cum' 			=> $data['rs'][$i]['preschoolers_female_cum'],
						'preschoolers_female_now' 			=> $data['rs'][$i]['preschoolers_female_now'],
						'schoolage_male_cum' 				=> $data['rs'][$i]['schoolage_male_cum'],
						'schoolage_male_now' 				=> $data['rs'][$i]['schoolage_male_now'],
						'schoolage_female_cum' 				=> $data['rs'][$i]['schoolage_female_cum'],
						'schoolage_female_now' 				=> $data['rs'][$i]['schoolage_female_now'],
						'teenage_male_cum' 					=> $data['rs'][$i]['teenage_male_cum'],
						'teenage_male_now' 					=> $data['rs'][$i]['teenage_male_now'],
						'teenage_female_cum' 				=> $data['rs'][$i]['teenage_female_cum'],
						'teenage_female_now' 				=> $data['rs'][$i]['teenage_female_now'],
						'adult_male_cum' 					=> $data['rs'][$i]['adult_male_cum'],
						'adult_male_now' 					=> $data['rs'][$i]['adult_male_now'],
						'adult_female_cum' 					=> $data['rs'][$i]['adult_female_cum'],
						'adult_female_now' 					=> $data['rs'][$i]['adult_female_now'],
						'senior_male_cum' 					=> $data['rs'][$i]['senior_male_cum'],
						'senior_male_now' 					=> $data['rs'][$i]['senior_male_now'],
						'senior_female_cum' 				=> $data['rs'][$i]['senior_female_cum'],
						'senior_female_now' 				=> $data['rs'][$i]['senior_female_now'],
						'pregnant_cum' 						=> $data['rs'][$i]['pregnant_cum'],
						'pregnant_now' 						=> $data['rs'][$i]['pregnant_now'],
						'lactating_mother_cum' 				=> $data['rs'][$i]['lactating_mother_cum'],
						'lactating_mother_now' 				=> $data['rs'][$i]['lactating_mother_now'],
						'unaccompanied_minor_male_cum' 		=> $data['rs'][$i]['unaccompanied_minor_male_cum'],
						'unaccompanied_minor_male_now' 		=> $data['rs'][$i]['unaccompanied_minor_male_now'],
						'unaccompanied_minor_female_cum' 	=> $data['rs'][$i]['unaccompanied_minor_female_cum'],
						'unaccompanied_minor_female_now' 	=> $data['rs'][$i]['unaccompanied_minor_female_now'],
						'pwd_male_cum' 						=> $data['rs'][$i]['pwd_male_cum'],
						'pwd_male_now' 						=> $data['rs'][$i]['pwd_male_now'],
						'pwd_female_cum' 					=> $data['rs'][$i]['pwd_female_cum'],
						'pwd_female_now' 					=> $data['rs'][$i]['pwd_female_now'],
						'solo_parent_male_cum' 				=> $data['rs'][$i]['solo_parent_male_cum'],
						'solo_parent_male_now' 				=> $data['rs'][$i]['solo_parent_male_now'],
						'solo_parent_female_cum' 			=> $data['rs'][$i]['solo_parent_female_cum'],
						'solo_parent_female_now' 			=> $data['rs'][$i]['solo_parent_female_now'],
						'ip_male_cum' 						=> $data['rs'][$i]['ip_male_cum'],
						'ip_male_now' 						=> $data['rs'][$i]['ip_male_now'],
						'ip_female_cum' 					=> $data['rs'][$i]['ip_female_cum'],
						'ip_female_now' 					=> $data['rs'][$i]['ip_female_now'],
						'disaster_title_id' 				=> $insert_id,
					);

					$q9_a= $this->db->insert('tbl_sex_age_sector_data',$datasexage);

				}
 
				return $insert_id;

			}

		}

		public function saveasnewDamAss($data){
			$q= $this->db->insert('tbl_casualty_asst',$data);
			if($q){
				return 1;
			}
		}

		public function getDamAss($id){

			$q1 = $this->db->where('id', $id);
			$q1 = $this->db->get('tbl_casualty_asst');

			$data['rs'] = $q1->result_array();

			$q2 = $this->db->where('provinceid', $data['rs'][0]['provinceid']);
			$q2 = $this->db->get('tbl_municipality');

			$data['city'] = $q2->result_array();
			return $data;

		}

		public function getDamAssMain($municipality_id, $id){

			$q1 = $this->db->where('disaster_title_id', $id);
			$q1 = $this->db->where('municipality_id', $municipality_id);
			$q1 = $this->db->get('tbl_casualty_asst');

			$data['rs'] = $q1->result_array();

			if(count($q1->result_array()) > 0){

				$q2 = $this->db->where('provinceid', $data['rs'][0]['provinceid']);
				$q2 = $this->db->get('tbl_municipality');

				$data['city'] = $q2->result_array();
				return $data;

			}else{

				$q2 = $this->db->where('id', $municipality_id);
				$q2 = $this->db->get('tbl_municipality');

				$arr = $q2->result_array();

				$q3 = $this->db->where('provinceid', $arr[0]['provinceid']);
				$q3 = $this->db->get('tbl_municipality');

				$data['city'] = $q3->result_array();

				$data['rs'][0]['municipality_id'] = $municipality_id;

				return $data;

			}

		}

		public function getAllAffected($municipality_id, $id){

			$q1 = $this->db->where('disaster_title_id', $id);
			$q1 = $this->db->where('municipality_id', $municipality_id);
			$q1 = $this->db->get('tbl_affected');

			$data['rs'] = $q1->result_array();

			if(count($q1->result_array()) > 0){

				$q2 = $this->db->where('provinceid', $data['rs'][0]['provinceid']);
				$q2 = $this->db->get('tbl_municipality');

				$data['city'] = $q2->result_array();
				return $data;

			}else{

				$q2 = $this->db->where('id', $municipality_id);
				$q2 = $this->db->get('tbl_municipality');

				$arr = $q2->result_array();

				$q3 = $this->db->where('provinceid', $arr[0]['provinceid']);
				$q3 = $this->db->get('tbl_municipality');

				$data['city'] = $q3->result_array();

				$data['rs'][0]['municipality_id'] = $municipality_id;

				return $data;

			}

		}

		public function updateDamAss($data,$id){

			$query = $this->db->where('id', $id);
			$query = $this->db->update('tbl_casualty_asst', $data);

			if($query){
				return 1;
			}else{
				return 0;
			}

		}

		public function savenewfamOEC($data){

			$q= $this->db->insert('tbl_evac_outside_stats',$data);

			if ($this->db->trans_status() === FALSE)
			{
			    $this->db->trans_rollback();
			    return 0;
			}
			else
			{
			    $this->db->trans_commit();
			    return 1;
			}

		}

		public function getFamOEC($id){

			$q1 = $this->db->where('id', $id);
			$q1 = $this->db->get('tbl_evac_outside_stats');

			$data['rs'] = $q1->result_array();

			$q2 = $this->db->where('provinceid', $data['rs'][0]['provinceid']);
			$q2 = $this->db->get('tbl_municipality');

			$data['city'] = $q2->result_array();

			$q3 = $this->db->where('municipality_id', $data['rs'][0]['municipality_id']);
			$q3 = $this->db->get('tbl_barangay');

			$data['brgy'] = $q3->result_array();

			$q2 = $this->db->where('provinceid', $data['rs'][0]['province_origin']);
			$q2 = $this->db->get('tbl_municipality');

			$data['city2'] = $q2->result_array();

			$q4 = $this->db->where('municipality_id', $data['rs'][0]['municipality_origin']);
			$q4 = $this->db->get('tbl_barangay');

			$data['brgy2'] = $q4->result_array();

			return $data;


		}

		public function updateFamOEC($data,$id){

			$query = $this->db->where('id', $id);
			$query = $this->db->update('tbl_evac_outside_stats', $data);

			if($query){
				return 1;
			}else{
				return 0;
			}

		}

		public function savenewCAS($data){

			$q = $this->db->insert('tbl_casualty',$data);

			if ($this->db->trans_status() === FALSE)
			{
			    $this->db->trans_rollback();
			    return 0;
			}
			else
			{
			    $this->db->trans_commit();
			    return 1;
			}

		}

		public function getCasualty($id){
			$q1 = $this->db->where('id', $id);
			$q1 = $this->db->get('tbl_casualty');

			$data['rs'] = $q1->result_array();

			$q2 = $this->db->where('provinceid', $data['rs'][0]['provinceid']);
			$q2 = $this->db->get('tbl_municipality');

			$data['city'] = $q2->result_array();
			return $data;
		}

		public function updateCAS($data,$id){

			$query = $this->db->where('id', $id);
			$query = $this->db->update('tbl_casualty', $data);

			if($query){
				return 1;
			}else{
				return 0;
			}

		}

		public function countEOpCen(){

			$count = 0;
			$q1 = $this->db->query("SELECT DISTINCT
											ON (
												province_name,
												municipality_name,
												evacuation_name,
												ecstatus,
												fam_no,
												person_no,
												place_of_origin,
												disaster_name,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_eopcen
										WHERE rstatus = 'NOT READ'
										ORDER BY
											province_name DESC,
											municipality_name DESC,
											evacuation_name DESC,
											ecstatus DESC,
											fam_no DESC,
											person_no DESC,
											place_of_origin DESC,
											disaster_name DESC,
											rstatus DESC,
											ddate :: DATE DESC,
											dtime :: TIME WITHOUT TIME ZONE DESC

								");

			$count = $count + $q1->num_rows();

			$data['inec'] = $q1->num_rows();
			$data['inecdet'] = $q1->result_array();

			$q2 = $this->db->query("SELECT DISTINCT
											ON (
												disaster_name,
												province_name,
												municipality_name,
												tot_damaged,
												part_damaged,
												dead,
												missing,
												injured,
												dswd_asst,
												lgu_asst,
												ngo_asst,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_casualty_asstm
										WHERE rstatus = 'NOT READ'
										ORDER BY
											disaster_name DESC,
											province_name DESC,
											municipality_name DESC,
											tot_damaged DESC,
											part_damaged DESC,
											dead DESC,
											missing DESC,
											injured DESC,
											dswd_asst DESC,
											lgu_asst DESC,
											ngo_asst DESC,
											rstatus DESC,
											ddate :: DATE DESC,
											dtime :: TIME WITHOUT TIME ZONE DESC
								");
			$count = $count + $q2->num_rows();

			$data['damass'] = $q2->num_rows();
			$data['damassdet'] = $q2->result_array();

			$q3 = $this->db->query("SELECT DISTINCT
											ON (
												disaster_name,
												province_name,
												municipality_name,
												lname,
												fname,
												mi,
												age,
												gender,
												brgyname,
												isdead,
												ismissing,
												isinjured,
												remarks,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_casualtym
										WHERE rstatus = 'NOT READ'
										ORDER BY
											disaster_name DESC,
											province_name DESC,
											municipality_name DESC,
											lname DESC,
											fname DESC,
											mi DESC,
											age DESC,
											gender DESC,
											brgyname DESC,
											isdead DESC,
											ismissing DESC,
											isinjured DESC,
											remarks DESC,
											rstatus DESC,
											ddate :: DATE DESC,
											dtime :: TIME WITHOUT TIME ZONE DESC");
			$count = $count + $q3->num_rows();

			$data['casualty'] = $q3->num_rows();
			$data['casualtydet'] = $q3->result_array();

			$q4 = $this->db->query("SELECT DISTINCT
											ON (
												province_name,
												municipality_name,
												brgy,
												fam_no,
												person_no,
												disaster_name,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_outecm_a
										WHERE rstatus = 'NOT READ'
										ORDER BY
											province_name DESC,
											municipality_name DESC,
											brgy DESC,
											fam_no DESC,
											person_no DESC,
											disaster_name DESC,
											rstatus DESC,
											ddate :: DATE DESC,
											dtime :: TIME WITHOUT TIME ZONE	DESC");
			$count = $count + $q4->num_rows();

			$data['outec'] = $q4->num_rows();
			$data['outecdet'] = $q4->result_array();

			$q5 = $this->db->query("SELECT DISTINCT
										ON (
											pics,
											description,
											rstatus,
											ddate :: DATE,
											dtime :: TIME WITHOUT TIME ZONE,
											isnotified
										) *
									FROM
										tbl_images t1
									WHERE rstatus = 'NOT READ'
									ORDER BY
										t1.pics DESC,
										t1.description DESC,
										t1.rstatus DESC,
										t1.ddate :: DATE DESC,
										t1.dtime :: TIME WITHOUT TIME ZONE DESC");
			$count = $count + $q5->num_rows();

			$data['uppics'] = $q5->num_rows();
			$data['uppicsdet'] = $q5->result_array();

			$q6 = $this->db->query("SELECT DISTINCT
											ON (
												province_name,
												municipality_name,
												disaster_name,
												brgy_name,
												part_damage,
												tot_damage,
												dead,
												missing,
												injured,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_damagesm
										ORDER BY
											province_name DESC,
											municipality_name DESC,
											disaster_name DESC,
											brgy_name DESC,
											part_damage DESC,
											tot_damage DESC,
											dead DESC,
											missing DESC,
											injured DESC,
											rstatus DESC,
											ddate :: DATE DESC,
											dtime :: TIME WITHOUT TIME ZONE	DESC
									");
			$count = $count + $q6->num_rows();

			$data['cdamage'] = $q6->num_rows();
			$data['cdamagedet'] = $q6->result_array();

			$data['allcount'] = $count;

			return $data;

		}

		public function radarphp(){

			$a = file_get_contents("http://www1.pagasa.dost.gov.ph/images/radar/mosaic/mosaic_rain_radar.php");
			return $a;
			
		}

		public function cinec(){
			$q1 = $this->db->query("SELECT DISTINCT
											ON (
												province_name,
												municipality_name,
												evacuation_name,
												ecstatus,
												fam_no,
												person_no,
												place_of_origin,
												disaster_name,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_eopcen
										ORDER BY
											province_name DESC,
											municipality_name DESC,
											evacuation_name DESC,
											ecstatus DESC,
											fam_no DESC,
											person_no DESC,
											place_of_origin DESC,
											disaster_name DESC,
											rstatus DESC,
											ddate :: DATE DESC,
											dtime :: TIME WITHOUT TIME ZONE DESC
									");
			return $q1->result_array();
		}

		public function coutec(){
			$q1 = $this->db->query("SELECT DISTINCT
											ON (
												province_name,
												municipality_name,
												brgy,
												fam_no,
												person_no,
												disaster_name,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_outecm_a
										ORDER BY
											province_name DESC,
											municipality_name DESC,
											brgy DESC,
											fam_no DESC,
											person_no DESC,
											disaster_name DESC,
											rstatus DESC,
											ddate :: DATE DESC,
											dtime :: TIME WITHOUT TIME ZONE	DESC
									");
			return $q1->result_array();
		}

		public function cdamage(){
			$q1 = $this->db->query("SELECT DISTINCT
											ON (
												province_name,
												municipality_name,
												disaster_name,
												brgy_name,
												part_damage,
												tot_damage,
												dead,
												missing,
												injured,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_damagesm
										ORDER BY
											province_name DESC,
											municipality_name DESC,
											disaster_name DESC,
											brgy_name DESC,
											part_damage DESC,
											tot_damage DESC,
											dead DESC,
											missing DESC,
											injured DESC,
											rstatus DESC,
											ddate :: DATE DESC,
											dtime :: TIME WITHOUT TIME ZONE	DESC
									");
			return $q1->result_array();
		}

		public function cdamass(){
			$q1 = $this->db->query("SELECT DISTINCT
											ON (
												disaster_name,
												province_name,
												municipality_name,
												tot_damaged,
												part_damaged,
												dead,
												missing,
												injured,
												dswd_asst,
												lgu_asst,
												ngo_asst,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_casualty_asstm
										ORDER BY
											disaster_name DESC,
											province_name DESC,
											municipality_name DESC,
											tot_damaged DESC,
											part_damaged DESC,
											dead DESC,
											missing DESC,
											injured DESC,
											dswd_asst DESC,
											lgu_asst DESC,
											ngo_asst DESC,
											rstatus DESC,
											ddate :: DATE DESC,
											dtime :: TIME WITHOUT TIME ZONE DESC
									");
			return $q1->result_array();
		}

		public function ccasualty(){
			$q1 = $this->db->query("SELECT DISTINCT
											ON (
												disaster_name,
												province_name,
												municipality_name,
												lname,
												fname,
												mi,
												age,
												gender,
												brgyname,
												isdead,
												ismissing,
												isinjured,
												remarks,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_casualtym
										ORDER BY
											disaster_name DESC,
											province_name DESC,
											municipality_name DESC,
											lname DESC,
											fname DESC,
											mi DESC,
											age DESC,
											gender DESC,
											brgyname DESC,
											isdead DESC,
											ismissing DESC,
											isinjured DESC,
											remarks DESC,
											rstatus DESC,
											ddate :: DATE DESC,
											dtime :: TIME WITHOUT TIME ZONE DESC
									");
			return $q1->result_array();
		}

		public function cpics(){
			$q1 = $this->db->query("SELECT DISTINCT
										ON (
											pics,
											description,
											rstatus,
											ddate :: DATE,
											dtime :: TIME WITHOUT TIME ZONE,
											isnotified
										) *
									FROM
										tbl_images t1
									ORDER BY
										t1.pics DESC,
										t1.description DESC,
										t1.rstatus DESC,
										t1.ddate :: DATE DESC,
										t1.dtime :: TIME WITHOUT TIME ZONE DESC
								");
			return $q1->result_array();
		}

		public function picEnlarge($id){
			$q5 = $this->db->query("SELECT * FROM tbl_images t1 WHERE id='$id' ORDER BY t1.id DESC");
			$data['uppicsdet'] = $q5->result_array();
			return $data;
		}

		public function markreadinec(){
			$q1 = $this->db->query("UPDATE tbl_eopcen SET rstatus = 'READ' WHERE rstatus = 'NOT READ'");
			if($q1){
				return 1;
			}
		}

		public function markreaddamass(){
			$q1 = $this->db->query("UPDATE tbl_casualty_asstm SET rstatus = 'READ' WHERE rstatus = 'NOT READ'");
			if($q1){
				return 1;
			}
		}

		public function markreadoutec(){
			$q1 = $this->db->query("UPDATE tbl_outecm_a SET rstatus = 'READ' WHERE rstatus = 'NOT READ'");
			if($q1){
				return 1;
			}
		}

		public function markreadcasualty(){
			$q1 = $this->db->query("UPDATE tbl_casualtym SET rstatus = 'READ' WHERE rstatus = 'NOT READ'");
			if($q1){
				return 1;
			}
		}

		public function markreaduploads(){
			$q1 = $this->db->query("UPDATE tbl_images SET rstatus = 'READ' WHERE rstatus = 'NOT READ'");
			if($q1){
				return 1;
			}
		}

		public function cinecnotif(){

			$q1 = $this->db->query("SELECT DISTINCT
										ON (
											province_name,
											municipality_name,
											evacuation_name,
											ecstatus,
											fam_no,
											person_no,
											place_of_origin,
											disaster_name,
											rstatus,
											ddate :: DATE,
											dtime :: TIME WITHOUT TIME ZONE
										) *
									FROM
										tbl_eopcen
									WHERE
										isnotified = 'NOT NOTIFIED'
								");
			$q2 = $this->db->query("UPDATE tbl_eopcen SET isnotified = 'NOTIFIED' WHERE isnotified = 'NOT NOTIFIED'");

			return $q1->result_array();

		}

		public function coutecnotif(){

			$q1 = $this->db->query("SELECT DISTINCT
											ON (
												province_name,
												municipality_name,
												brgy,
												fam_no,
												person_no,
												disaster_name,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_outecm_a
										WHERE
											isnotified = 'NOT NOTIFIED'
									");
			$q2 = $this->db->query("UPDATE tbl_outecm_a SET isnotified = 'NOTIFIED' WHERE isnotified = 'NOT NOTIFIED'");

			return $q1->result_array();

		}

		public function casualtynotif(){

			$q1 = $this->db->query("SELECT DISTINCT
											ON (
												disaster_name,
												province_name,
												municipality_name,
												lname,
												fname,
												mi,
												age,
												gender,
												brgyname,
												isdead,
												ismissing,
												isinjured,
												remarks,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_casualtym
										WHERE
											isnotified = 'NOT NOTIFIED'
									");
			$q2 = $this->db->query("UPDATE tbl_casualtym SET isnotified = 'NOTIFIED' WHERE isnotified = 'NOT NOTIFIED'");

			return $q1->result_array();

		}

		public function assistnotif(){

			$q1 = $this->db->query("SELECT DISTINCT
											ON (
												disaster_name,
												province_name,
												municipality_name,
												tot_damaged,
												part_damaged,
												dead,
												missing,
												injured,
												dswd_asst,
												lgu_asst,
												ngo_asst,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_casualty_asstm
										WHERE
											isnotified = 'NOT NOTIFIED'
									");
			$q2 = $this->db->query("UPDATE tbl_casualty_asstm SET isnotified = 'NOTIFIED' WHERE isnotified = 'NOT NOTIFIED'");

			return $q1->result_array();

		}

		public function picnotif(){

			$q1 = $this->db->query("SELECT distinct on(pics,description,rstatus,ddate,dtime,isnotified) * FROM tbl_images WHERE isnotified='NOT NOTIFIED'");
			$q2 = $this->db->query("UPDATE tbl_images SET isnotified = 'NOTIFIED' WHERE isnotified = 'NOT NOTIFIED'");

			return $q1->result_array();

		}

		public function damagesnotif(){

			$q1 = $this->db->query("SELECT DISTINCT
											ON (
												province_name,
												municipality_name,
												disaster_name,
												brgy_name,
												tot_damage,
												part_damage,
												dead,
												missing,
												injured,
												rstatus,
												ddate :: DATE,
												dtime :: TIME WITHOUT TIME ZONE
											) *
										FROM
											tbl_damagesm
										WHERE
											isnotified = 'NOT NOTIFIED'
									");
			$q2 = $this->db->query("UPDATE tbl_damagesm SET isnotified = 'NOTIFIED' WHERE isnotified = 'NOT NOTIFIED'");

			return $q1->result_array();

		}

		public function newMessage(){

			$q1 = $this->db->query("SELECT
										COUNT(*) msgcount
									FROM
										sms_in t1
									WHERE
										t1.isnotified = 'NOT NOTIFIED'
									");

			$q2 = $this->db->query("UPDATE sms_in SET isnotified = 'NOTIFIED' WHERE isnotified = 'NOT NOTIFIED'");

			return $q1->result_array();

		}

		public function viewMessage(){

			$q1 = $this->db->query("SELECT * FROM sms_in ORDER BY sent_dt DESC");

			return $q1->result_array();

		}

		public function get_allquake(){

			$b = file_get_contents("http://earthquake-report.com/feeds/recent-eq?json");

			$a = json_decode($b);

			for($i = 0 ; $i < count($a) ; $i++){
				// $q = $a[$i]->location;
				// $w = stripos($q,"Philippine");
				// if($w > 0){
					$data = array(
						'location' 	=> $a[$i]->location,
						'depth' 	=> $a[$i]->depth,
						'latitude' 	=> $a[$i]->latitude,
						'longitude' => $a[$i]->longitude,
						'date_time' => $a[$i]->date_time,
						'magnitude' => $a[$i]->magnitude
					);

					$q1 = $this->db->where('location', $a[$i]->location);
					$q1 = $this->db->where('depth', $a[$i]->depth);
					$q1 = $this->db->where('latitude', $a[$i]->latitude);
					$q1 = $this->db->where('longitude', $a[$i]->longitude);
					$q1 = $this->db->where('date_time', $a[$i]->date_time);
					$q1 = $this->db->where('magnitude', $a[$i]->magnitude);
					$q1 = $this->db->get('tbl_quake');

					if($q1->num_rows() < 1){
						$query = $this->db->insert('tbl_quake',$data);
					}
				// }
			}

			$q2 = $this->db->where('isnotified', "NOT NOTIFIED");
			$q2 = $this->db->get('tbl_quake');

			$datas['quake'] = $q2->result_array();

			$updata = array(
				'isnotified' => "NOTIFIED"
			);

			$query = $this->db->where('isnotified', "NOT NOTIFIED");
			$query = $this->db->update('tbl_quake', $updata);

			return $datas;

		}

		public function getEarthquake(){

			$q1 = $this->db->query("SELECT * FROM tbl_quake ORDER by date_time::timestamp desc");
			return $q1->result();

		}

		public function getWeather(){

			$a = file_get_contents("http://m.weather.gov.ph/agaptest/main_local.php");

			$a = strip_tags($a);

			$a = json_decode($a);
			return $a;

		}

		public function magEarthquake(){

			$q1 = $this->db->query("SELECT * FROM tbl_quake ORDER by date_time::timestamp desc");
		    $b['rs'] = $q1->result();

			for($i = 0 ; $i < count($b['rs']) ; $i++){
				$c['features'][] = Array(
					"type" => "Feature",
					"properties" => array(
						"mag" => $b['rs'][$i]->magnitude,
						"place" => $b['rs'][$i]->location,
						"date_time" => $b['rs'][$i]->date_time,
						"depth" => $b['rs'][$i]->depth,
						"id"=>$b['rs'][$i]->id
					),
					"geometry"=>array(
						"type"=>"Point",
						"coordinates"=>array(
								$b['rs'][$i]->longitude,
								$b['rs'][$i]->latitude
							)
					),
					"id"=>$b['rs'][$i]->id
				);
			}

			$a = array(
				"type" => "FeatureCollection",
				"features" => $c['features']
			);

			return $a;

		}

		public function getfloodintersect($id,$tbl){

			$q1 = $this->db->query("SELECT
										t1.*
									FROM
										(
											SELECT
												floodsusc,
												st_intersects (
													st_transform (
														st_setsrid (st_geometryfromtext(st_astext(geom)), 32651),
														4326
													),
													(
														SELECT
															ST_Transform (
																ST_SetSRID (
																	ST_GeomFromText (
																		CONCAT (
																			'POINT(',
																			t1.longitude,
																			' ',
																			t1.latitude,
																			')'
																		),
																		32651
																	),
																	4326
																),
																4326
															) AS geom
														FROM
															tbl_evacuation t1
														WHERE
															t1. ID = $id
													)
												) :: BOOLEAN AS intersects
											FROM
												$tbl
										) t1
									WHERE t1.intersects = true
								");

			return $q1->result_array();

		}

		public function saveQRT($data){

			$this->db->trans_begin();

			$this->db->insert('tbl_qrt_composition',$data['leader']);
			$this->db->insert('tbl_qrt_composition',$data['statistician']);
			$this->db->insert('tbl_qrt_composition',$data['smu']);
			$this->db->insert('tbl_qrt_composition',$data['aa']);
			for($i = 0 ; $i < count($data['qstaff']) ; $i++){
				$this->db->insert('tbl_qrt_composition',$data['qstaff'][$i]);
			}
			for($i = 0 ; $i < count($data['qdriver']) ; $i++){
				$this->db->insert('tbl_qrt_composition',$data['qdriver'][$i]);
			}

			if($this->db->trans_status() === FALSE){
				 $this->db->trans_rollback();
				 return 0;
			}else{
			    $this->db->trans_commit();
			    return 1;
			}
		}

		public function checkQRTNumber($data){

			$query = $this->db->where('qrt_team_id', $data);
			$query = $this->db->get('tbl_qrt_composition');
			return $query->result_array();

		}

		public function getAllQRT(){

			$query = $this->db->query("SELECT * FROM tbl_qrtteam ORDER BY id ASC");
			$data['team'] = $query->result_array();

			$query1 = $this->db->query("SELECT
											t1.*,
											t2.position_name
										FROM
											tbl_qrt_composition t1
										LEFT JOIN tbl_qrtposition t2
										ON t1.qrt_position_id = t2.id
										ORDER BY
											t1.qrt_team_id ASC, t1.id ASC"
			);
			$data['members'] = $query1->result_array();

			return $data;

		}

		public function getSpecQRT($id){

			$query1 = $this->db->query("SELECT
											t1.*,
											t2.position_name
										FROM
											tbl_qrt_composition t1
										LEFT JOIN tbl_qrtposition t2
										ON t1.qrt_position_id = t2.id
										WHERE qrt_team_id = '$id'
										ORDER BY
											t1.qrt_team_id ASC"
			);
			$data['members'] = $query1->result_array();

			return $data;

		}

		public function deleteQRTTeam($id){

			$this->db->trans_begin();

			$this->db->where('qrt_team_id', $id);
			$this->db->delete('tbl_qrt_composition');

			if($this->db->trans_status() === FALSE){
				 $this->db->trans_rollback();
				 return 0;
			}else{
			    $this->db->trans_commit();
			    return 1;
			}

		}

		public function deleteQRTTeamDriverStaff($id){

			$this->db->trans_begin();

			$this->db->where('id', $id);
			$this->db->delete('tbl_qrt_composition');

			if($this->db->trans_status() === FALSE){
				 $this->db->trans_rollback();
				 return 0;
			}else{
			    $this->db->trans_commit();
			    return 1;
			}

		}

		public function updateQRT($data){

			$this->db->trans_begin();

			$this->db->where('id',$data['leader']['id']);
			$this->db->update('tbl_qrt_composition',$data['leader']);

			$this->db->where('id',$data['statistician']['id']);
			$this->db->update('tbl_qrt_composition',$data['statistician']);

			$this->db->where('id',$data['smu']['id']);
			$this->db->update('tbl_qrt_composition',$data['smu']);

			$this->db->where('id',$data['aa']['id']);
			$this->db->update('tbl_qrt_composition',$data['aa']);


			for($i = 0 ; $i < count($data['qstaff']) ; $i++){
				$this->db->where('id',$data['qstaff'][$i]['id']);
				$this->db->update('tbl_qrt_composition',$data['qstaff'][$i]);
			}
			for($i = 0 ; $i < count($data['qdriver']) ; $i++){
				$this->db->where('id',$data['qdriver'][$i]['id']);
				$this->db->update('tbl_qrt_composition',$data['qdriver'][$i]);
			}

			if($this->db->trans_status() === FALSE){
				 $this->db->trans_rollback();
				 return 0;
			}else{
			    $this->db->trans_commit();
			    return 1;
			}
		}

		public function login($username,$password){

			$passwords = $password;
			$passwords = "\=45f=".md5($passwords)."==//87*1)";
			$passwords = sha1(md5($passwords));

			$query = $this->db->query("SELECT
										t1.*,
										t2.isdswd
									FROM
										tbl_auth_user t1
									LEFT JOIN tbl_auth_users t2 ON t1.username = t2.username
									WHERE
										t1.username = '$username'
									AND t1.password = '$passwords'
									AND t1.isactivated = 't'
					");

			if($query->num_rows() > 0){

				session_start();

				$arr = $query->result_array();

				$_SESSION['username'] = $username;
				$_SESSION['password'] = $password;
				$_SESSION['fullname'] = $arr[0]['fullname'];
				$_SESSION['isadmin'] 	= $arr[0]['isadmin'];
				$_SESSION['ishead'] 	= $arr[0]['ishead'];
				$_SESSION['isdswd'] 	= $arr[0]['isdswd'];

				$_SESSION['can_create_report'] 	=  $arr[0]['can_create_report'];
					
				return 1;

			}else{

				// $query1 = $this->db->query("SELECT * FROM tbl_auth_users WHERE username = '$username' AND password_hash = '$passwords'");

				// if($query1->num_rows() > 0){

				// 	$arr = $query1->result_array();
					
				// 	session_start();

				// 	$_SESSION['username'] 	= $username;
				// 	$_SESSION['password'] 	= $password;

				// 	$_SESSION['fullname'] 	= strtoupper($arr[0]['firstname']) . " " . strtoupper($arr[0]['lastname']);
				// 	$_SESSION['isadmin'] 	= "f";

				// 	$_SESSION['ishead'] 	= "";

				// 	return 1;

				// }else{

				// 	return 0;

				// }

				return 0;


			}

			

		}

		public function getDashboardData(){

			$aff_family = 0;
			$aff_person = 0;
			$dswd_asst = 0;
			$aff_brgy = 0;
			$aff_familyinec = 0;
			$aff_familyoutec = 0;
			$aff_familys = array();
			$assts = 0;
			$title = "";
			$asst = array();
			$rs_asstdrills = array();

			$query1 = $this->db->query("SELECT
																	dromic_id,
																	MAX (t1. ID) AS ID
																FROM
																	(
																		SELECT
																			t1.dromic_id,
																			t1. ID
																		FROM
																			tbl_disaster_title t1 --WHERE t1.id::integer > 12
																		LEFT JOIN tbl_dromic t2 ON t1.dromic_id = t2. ID
																		WHERE
																			date_part(
																				'year',
																				t2.disaster_date :: DATE
																			) = date_part('year', CURRENT_DATE)
																		AND t1.dromic_id > 3
																		ORDER BY
																			t1.dromic_id ASC,
																			t1.ddate DESC,
																			t1. ID DESC
																	) t1
																GROUP BY
																	t1.dromic_id
			");

			if($query1){

				$data['rs'] = $query1->result_array();

				for($i = 0 ; $i < count($data['rs']) ; $i++){

					$id = $data['rs'][$i]['id'];

					$query2 = $this->db->query("SELECT
																			SUM (t1.aff_family) AS aff_family
																		FROM
																			(
																				SELECT
																					SUM (t1.family_cum :: INTEGER) AS aff_family
																				FROM
																					tbl_evacuation_stats t1
																				WHERE
																					t1.disaster_title_id = $id
																				UNION ALL
																					(
																						SELECT
																							SUM (t1.family_cum :: INTEGER) AS aff_family
																						FROM
																							tbl_evac_outside_stats t1
																						WHERE
																							t1.disaster_title_id = $id
																					)
																			) t1
					");

					$data['num_aff_family'] = $query2->result_array();
					for($j = 0 ; $j < count($data['num_aff_family']) ; $j++){
						$aff_family = $aff_family + $data['num_aff_family'][$j]['aff_family'];
					}

					$query3 = $this->db->query("SELECT
																			SUM (t1.aff_person) AS aff_person
																		FROM
																			(
																				SELECT
																					SUM (t1.person_cum :: INTEGER) AS aff_person
																				FROM
																					tbl_evacuation_stats t1
																				WHERE
																					t1.disaster_title_id = $id
																				UNION ALL
																					(
																						SELECT
																							SUM (t1.person_cum :: INTEGER) AS aff_person
																						FROM
																							tbl_evac_outside_stats t1
																						WHERE
																							t1.disaster_title_id = $id
																					)
																			) t1
					");

					$data['num_aff_ind'] = $query3->result_array();
					for($j = 0 ; $j < count($data['num_aff_ind']) ; $j++){
						$aff_person = $aff_person + $data['num_aff_ind'][$j]['aff_person'];
					}

					$query4 = $this->db->query("SELECT
																			t1.dswd_asst
																		FROM
																			tbl_casualty_asst t1
																		WHERE
																			t1.disaster_title_id = $id
					");

					$data['num_dswd_asst'] = $query4->result_array();
					for($j = 0 ; $j < count($data['num_dswd_asst']) ; $j++){
						$dswd_asst = (int) $dswd_asst + (int) $data['num_dswd_asst'][$j]['dswd_asst'];
					}

					$query6 = $this->db->query("SELECT
																			SUM (t1.family_cum :: INTEGER) AS aff_familyinec
																		FROM
																			tbl_evacuation_stats t1
																		WHERE
																			t1.disaster_title_id = $id
					");

					$data['aff_familyinec'] = $query6->result_array();
					for($j = 0 ; $j < count($data['aff_familyinec']) ; $j++){
						$aff_familyinec = $aff_familyinec + $data['aff_familyinec'][$j]['aff_familyinec'];
					}

					$query7 = $this->db->query("SELECT
																				SUM (t1.family_cum :: INTEGER) AS aff_familyoutec
																			FROM
																				tbl_evac_outside_stats t1
																			WHERE
																				t1.disaster_title_id = $id
					");

					$data['aff_familyoutec'] = $query7->result_array();
					for($j = 0 ; $j < count($data['aff_familyoutec']) ; $j++){
						$aff_familyoutec = $aff_familyoutec + $data['aff_familyoutec'][$j]['aff_familyoutec'];
					}

					$querya = $this->db->query("SELECT
																				SUM (t1.aff_family) AS aff_family,
																				t1.disaster_title
																			FROM
																				(
																					SELECT
																						SUM (t1.family_cum :: INTEGER) AS aff_family,
																						t2.disaster_title
																					FROM
																						tbl_evacuation_stats t1
																					LEFT JOIN tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
																					WHERE t1.disaster_title_id = $id
																					GROUP BY
																						t2.disaster_title
																					UNION ALL
																						(
																							SELECT
																								SUM (t1.family_cum :: INTEGER) AS aff_family,
																								t2.disaster_title
																							FROM
																								tbl_evac_outside_stats t1
																							LEFT JOIN tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
																							WHERE t1.disaster_title_id = $id
																							GROUP BY
																								t2.disaster_title
																						)
																				) t1
																			GROUP BY
																				t1.disaster_title
					");

					$r = $querya->result_array();

					$chars = 'ABCDEF0123456789';
				    $colors = '#';
				    for ( $l = 0; $l < 6; $l++ ) {
				       $colors .= $chars[rand(0, strlen($chars) - 1)];
				    }

					if($querya->num_rows() > 0){

						$aff_familys[] = array(
							'name' 			=> $r[0]['disaster_title'],
							'y' 			=> $r[0]['aff_family'],
							'drilldown' 	=> $r[0]['disaster_title'],
							'color' 		=> $colors
		
						);
					}

					$queryafffamilydrill = $this->db->query("SELECT
																										SUM(t1.family_cum::numeric) as family_cum,
																										t1.municipality_id,
																										t1.municipality_name,
																										t1.disaster_title
																									FROM
																										(
																											SELECT
																												SUM(t1.family_cum::numeric) as family_cum,
																												t1.municipality_id,
																												t3.municipality_name,
																												t2.disaster_title
																											FROM
																												tbl_evacuation_stats t1
																											LEFT JOIN tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
																											LEFT JOIN tbl_municipality t3 ON t1.municipality_id = t3.id
																											WHERE
																												t1.disaster_title_id = $id
																											GROUP BY
																												t1.municipality_id,t3.municipality_name,t2.disaster_title
																											UNION ALL
																												(
																													SELECT
																														SUM(t1.family_cum::numeric) as family_cum,
																														t1.municipality_id,
																														t3.municipality_name,
																														t2.disaster_title
																													FROM
																														tbl_evac_outside_stats t1
																													LEFT JOIN tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
																													LEFT JOIN tbl_municipality t3 ON t1.municipality_id = t3.id
																													WHERE
																														t1.disaster_title_id = $id
																													GROUP BY
																														t1.municipality_id,t3.municipality_name,t2.disaster_title
																												)
																										) t1
																									GROUP BY
																										t1.municipality_id,t1.municipality_name,t1.disaster_title
					");

					$rsafffamilydrill = $queryafffamilydrill->result_array();

					if($queryafffamilydrill->num_rows() > 0){

						$drilltitle = $rsafffamilydrill[0]['disaster_title'];

						for($f = 0 ; $f < count($rsafffamilydrill) ; $f++){
							$queryafffamilydrillcity[] = array(
								'name' 			=> $rsafffamilydrill[$f]['municipality_name'],
								'y' 			=> $rsafffamilydrill[$f]['family_cum']
							);
						}

						$queryafffamilydrills[] = array(
							'name' 			=> $drilltitle,
							'id' 			=> $drilltitle,
							'data' 			=> $queryafffamilydrillcity
						);

						$queryafffamilydrillcity = [];

					}
					
					$queryasst = $this->db->query("SELECT
																					t1.dswd_asst,
																					t1.disaster_title
																				FROM
																					(
																						SELECT
																							t1.dswd_asst,
																							t2.disaster_title
																						FROM
																							tbl_casualty_asst t1
																						LEFT JOIN tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
																						WHERE
																							t1.disaster_title_id = $id
																						GROUP BY
																							t1.dswd_asst, t2.disaster_title
																					) t1
																				GROUP BY t1.dswd_asst, t1.disaster_title
					");


					$ra = $queryasst->result_array();

					if($queryasst->num_rows() > 0){	
						for($g = 0 ; $g < count($ra) ; $g++){
							if($ra[$g]['dswd_asst'] != ""){
								$title = $ra[$g]['disaster_title'];
							}
							$assts = (int) $assts + (int) $ra[$g]['dswd_asst'];
						}

						if($assts == 0){

							$assts == null;

						}
						
						if($title != ""){
							$asst[] = array(
								'name' 			=> $title,
								'y' 			=> $assts,
								'drilldown' 	=> $title
							);
						}

						$title = "";
						$assts = null;

					}

					$queryasst_lgu = $this->db->query("SELECT
																							t1.dswd_asst,
																							t1.municipality_name,
																							t1.disaster_title
																						FROM
																							(
																								SELECT
																									t1.dswd_asst,
																									t3.municipality_name,
																									t2.disaster_title
																								FROM
																									tbl_casualty_asst t1
																								LEFT JOIN tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
																								LEFT JOIN tbl_municipality t3 ON t1.municipality_id = t3. ID
																								WHERE
																									t1.disaster_title_id = $id
																								GROUP BY
																									t1.dswd_asst,
																									t3.municipality_name,
																									t2.disaster_title
																							) t1
																						WHERE t1.dswd_asst <> ''
																						GROUP BY
																							t1.dswd_asst,
																							t1.municipality_name,
																							t1.disaster_title
					");

					$rs_asstdrill = $queryasst_lgu->result_array();

					if($queryasst_lgu->num_rows() > 0){

						$drilltitle_asst = $rs_asstdrill[0]['disaster_title'];

						for($f = 0 ; $f < count($rs_asstdrill) ; $f++){
							$query_asstdrillcity[] = array(
								'name' 			=> $rs_asstdrill[$f]['municipality_name'],
								'y' 			=> $rs_asstdrill[$f]['dswd_asst']
							);
						}

						$rs_asstdrills[] = array(
							'name' 			=> $drilltitle,
							'id' 			=> $drilltitle,
							'data' 			=> $query_asstdrillcity
						);

						$query_asstdrillcity = [];

					}

					$query5 = $this->db->query("SELECT
																				COUNT (*) as affbrgy
																			FROM
																				(
																					SELECT DISTINCT
																						ON (t1.municipality_id) t1.municipality_id
																					FROM
																						(
																							SELECT DISTINCT
																								ON (t1.municipality_id) t1.municipality_id
																							FROM
																								tbl_evacuation_stats t1
																							WHERE
																								t1.disaster_title_id = $id
																							UNION ALL
																								(
																									SELECT DISTINCT
																										ON (t2.municipality_id) t2.municipality_id
																									FROM
																										tbl_evac_outside_stats t2
																									WHERE
																										t2.disaster_title_id = $id
																								)
																						) t1
																				) t1
					");

					$data['aff_brgy'] = $query5->result_array();
					
					for($j = 0 ; $j < count($data['aff_brgy']) ; $j++){
						$aff_brgy = $aff_brgy + $data['aff_brgy'][$j]['affbrgy'];
					}

				}

			}

			$datas = array(
				'aff_family' 						=> $aff_family,
				'aff_person' 						=> $aff_person,
				'dswd_asst' 						=> $dswd_asst,
				'aff_brgy' 							=> $aff_brgy,
				'aff_familyinec' 				=> $aff_familyinec,
				'aff_familyoutec' 			=> $aff_familyoutec,
				'pie_aff_family' 				=> $aff_familys,
				'pie_dswd_asst' 				=> $asst,
				'pie_aff_family_drill' 	=> $queryafffamilydrills,
				'pie_asst_drill' 				=> $rs_asstdrills
			);

			return $datas;

		}

		public function get_fnfi(){

			$query = $this->db->query("SELECT * FROM tbl_fnfi WHERE fnfi_type <> '0'");

			return $query->result_array();

		}

		public function get_fnfi_cost($id){

			$query = $this->db->where('id',$id);
			$query = $this->db->get('tbl_fnfi');

			return $query->result_array();

		}

		public function saveFNFILIST($details,$fnfi_list,$date_aug){

			$this->db->trans_begin();

			$did = $details['disaster_title_id'];
			$mid = $details['municipality_id'];

			$q1 = $this->db->query("SELECT * FROM tbl_fnfi_assistance WHERE disaster_title_id = '$did' AND municipality_id = '$mid'");

			$arrs = $q1->result_array();
			$c = $q1->num_rows();

			if($c < 1){

				$this->db->insert('tbl_fnfi_assistance',$details);
				$insert_id = $this->db->insert_id();

				for($i = 0 ; $i < count($fnfi_list) ; $i++){
					$arr = array(
						'fnfi_assistance_id' 	=> $insert_id,
						'fnfi_name' 			=> $fnfi_list[$i]['fnfi_name'],
						'cost' 					=> $fnfi_list[$i]['fnfi_cost'],
						'quantity' 				=> $fnfi_list[$i]['fnfi_quantity'],
						'date_augmented' 		=> $date_aug
					);
					$this->db->insert('tbl_fnfi_assistance_list',$arr);
				}

				$q2 = $this->db->query("SELECT * FROM tbl_casualty_asst WHERE disaster_title_id = '$did' AND municipality_id = '$mid'");

				$arx = $q2->result_array();
				$cc = $q2->num_rows();

				$id = $insert_id;

				$tot = 0;
				$q3 = $this->db->query("SELECT * FROM tbl_fnfi_assistance_list WHERE fnfi_assistance_id = '$id'");
				$rsfnfi = $q3->result_array();

				for($h = 0 ; $h < count($rsfnfi) ; $h++){
					$tot = $tot + ($rsfnfi[$h]['cost'] * $rsfnfi[$h]['quantity']);
				}

				$data_asst = array(
					'disaster_title_id'   	=> $details['disaster_title_id'],
					'municipality_id'   	=> $details['municipality_id'],
					'provinceid' 		    => $details['provinceid'],
					'dswd_asst' 		    => $tot
				);

				if($cc < 1){
					
					$this->db->insert('tbl_casualty_asst',$data_asst);

				}else{

					$this->db->where('id',$arx[0]['id']);
					$this->db->update('tbl_casualty_asst',$data_asst);

				}

			}else{

				for($i = 0 ; $i < count($fnfi_list) ; $i++){
					$arr = array(
						'fnfi_assistance_id' 	=> $arrs[0]['id'],
						'fnfi_name' 			=> $fnfi_list[$i]['fnfi_name'],
						'cost' 					=> $fnfi_list[$i]['fnfi_cost'],
						'quantity' 				=> $fnfi_list[$i]['fnfi_quantity'],
						'date_augmented' 		=> $date_aug
					);
					$this->db->insert('tbl_fnfi_assistance_list',$arr);
				}

				$q2 = $this->db->query("SELECT * FROM tbl_casualty_asst WHERE disaster_title_id = '$did' AND municipality_id = '$mid'");
				$arx = $q2->result_array();
				$cc = $q2->num_rows();

				$id = $arrs[0]['id'];

				$tot = 0;
				$q3 = $this->db->query("SELECT * FROM tbl_fnfi_assistance_list WHERE fnfi_assistance_id = '$id'");
				$rsfnfi = $q3->result_array();

				for($h = 0 ; $h < count($rsfnfi) ; $h++){
					$tot = $tot + ($rsfnfi[$h]['cost'] * $rsfnfi[$h]['quantity']);
				}

				$data_asst = array(
					'disaster_title_id'   	=> $details['disaster_title_id'],
					'municipality_id'   	=> $details['municipality_id'],
					'provinceid' 		    => $details['provinceid'],
					'dswd_asst' 		    => $tot
				);

				if($cc < 1){
					
					$this->db->insert('tbl_casualty_asst',$data_asst);

				}else{

					$this->db->where('id',$arx[0]['id']);
					$this->db->update('tbl_casualty_asst',$data_asst);

				}

			}

			if($this->db->trans_status() == FALSE){
				$this->db->trans_rollback();
				return 0;
			}else{
				$this->db->trans_commit();
				return 1;
			}

		}

		public function get_dswd_assistance($id){

			$query = $this->db->query("
										SELECT
											t1.*, t2.*, t3.municipality_name
										FROM
											tbl_fnfi_assistance t1
										LEFT JOIN tbl_fnfi_assistance_list t2 ON t1.id = t2.fnfi_assistance_id
										LEFT JOIN tbl_municipality t3 ON t1.municipality_id = t3.id
										WHERE t1.disaster_title_id = $id
										ORDER BY t1.municipality_id ASC,
										CASE WHEN lower(t2.fnfi_name) LIKE lower('family%') then 1
										END ASC,
										t2.quantity ASC, t2.date_augmented::date DESC
			");

			return $query->result_array();

		}

		public function get_dswd_assistance_summary($id){

			$query = $this->db->query("
										SELECT
											t1.provinceid,
											t1.province_name,
											t1.municipality_id,
											t1.municipality_name,
											t1.fnfi_name,
											SUM ( t1.quantity ) qty,
											ROUND(SUM ( t1.total_cost ),2) sub_cost
										FROM
											(
											SELECT
												t3.provinceid,
												t4.province_name,
												t3.ID municipality_id,
												t3.municipality_name,
												t1.fnfi_name,
												t1.quantity :: INTEGER,
												( t1.quantity :: INTEGER * t1.cost ) total_cost 
											FROM
												tbl_fnfi_assistance_list t1
												LEFT JOIN tbl_fnfi_assistance t2 ON t1.fnfi_assistance_id = t2.ID 
												LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3.ID 
												LEFT JOIN tbl_provinces t4 ON t3.provinceid = t4.ID
											WHERE
												t2.disaster_title_id = '$id'
											) t1 
										GROUP BY
											t1.provinceid,
											t1.province_name,
											t1.municipality_id,
											t1.municipality_name,
											t1.fnfi_name
										ORDER BY t1.municipality_id ASC, t1.fnfi_name ASC
			");

			return $query->result_array();

		}

		public function get_damage_per_brgy($id){
			if(isset($_GET['id'])){

				$query = $this->db->query("SELECT
												t1.*, t3.municipality_name,
												t4.brgy_name
											FROM
												tbl_damage_per_brgy t1
											LEFT JOIN tbl_disaster_title t2 ON t1.disaster_title_id = t2. ID
											LEFT JOIN tbl_municipality t3 ON t1.municipality_id = t3. ID
											LEFT JOIN tbl_barangay t4 ON t1.brgy_id = t4. ID
											WHERE t1.disaster_title_id = '$id'
											ORDER BY t1.municipality_id ASC, t4.brgy_name ASC
				");

				return $query->result_array();
			}

		}

		public function get_teamleader(){

			session_start();

			$id = $_SESSION['ishead'];

			$query1 = $this->db->query("SELECT * FROM tbl_qrt_composition WHERE qrt_team_id = '$id'");

			$arr1 = $query1->result_array();

			if(count($arr1) > 0){
				return $query1->result_array();
			}else{
				return 0;
			}
		}

		public function get_assistancetype(){

			$query1 = $this->db->get("tbl_assistance_type");
			return $query1->result_array();
		}

		public function save_augmentation_assistance($data,$asstlist){

			$this->db->trans_begin();

			$query = $this->db->insert('tbl_augmentation_list',$data);

			$insert_id = $this->db->insert_id();

			for($i = 0 ; $i < count($asstlist) ; $i++){

				$datas = array(
					'augment_list_code' 	=> $asstlist[$i]['assistance_sub_gen'],
					'assistance_name' 		=> $asstlist[$i]['assistance_name'],
					'cost' 					=> $asstlist[$i]['cost'],
					'quantity' 				=> $asstlist[$i]['quantity'],
					'date_augmented' 		=> $asstlist[$i]['date_aug'],
					'augment_list_id' 		=> $insert_id
				);

				$query1 = $this->db->insert('tbl_augmentation_list_spec',$datas);

			}

			if($this->db->trans_status() === FALSE){
				 $this->db->trans_rollback();
				 return 0;
			}else{
			    $this->db->trans_commit();
			    return 1;
			}
			
		}

		public function get_augmentation_assistance($month,$year,$assttyperelief){

			if($assttyperelief == ""){

				$query1 = $this->db->query("SELECT
												t1.*, t2.provinceid,
												t2.municipality_id,
												t3.municipality_name,
												t4.assistance_name asst_type,
												t2.number_served,
												t2.remarks_particulars,
												t4. ID asst_id
											FROM
												tbl_augmentation_list_spec t1
											LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
											LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
											LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
											WHERE date_part('month',t1.date_augmented::date)::numeric = '$month'::numeric
											AND date_part('year',t1.date_augmented::date)::numeric = '$year'::numeric
											ORDER BY
												t2.municipality_id ASC,
												t1.date_augmented::date ASC,
												t4. ID ASC
				");
			}else{

				$query1 = $this->db->query("SELECT
												t1.*, t2.provinceid,
												t2.municipality_id,
												t3.municipality_name,
												t4.assistance_name asst_type,
												t2.number_served,
												t2.remarks_particulars,
												t4. ID asst_id
											FROM
												tbl_augmentation_list_spec t1
											LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
											LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
											LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
											WHERE date_part('month',t1.date_augmented::date)::numeric = '$month'::numeric
											AND date_part('year',t1.date_augmented::date)::numeric = '$year'::numeric
											AND t1.augment_list_code = '$assttyperelief'
											ORDER BY
												t2.municipality_id ASC,
												t1.date_augmented::date ASC,
												t4. ID ASC
				");

			}

			return $query1->result_array();
		}

		public function get_augmentation_assistance1($year){

			$arr = array();

			$query1 = $this->db->query("SELECT
											t1.*
										FROM
											(
												SELECT
													t1.*, t2.provinceid,
													t2.municipality_id,
													t3.municipality_name,
													t4.assistance_name asst_type,
													t2.number_served,
													t2.remarks_particulars,
													t4. ID asst_id
												FROM
													tbl_augmentation_list_spec t1
												LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
												LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
												LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
												WHERE
													t4. ID = 1
												AND date_part('year', t1.date_augmented) = $year
												ORDER BY
													t2.municipality_id ASC,
													t1.date_augmented :: DATE ASC,
													t4. ID ASC
											) t1
										ORDER BY 
										t1.municipality_id ASC,
													t1.date_augmented :: DATE ASC,
													t1. ID ASC,
										CASE WHEN lower(t1.assistance_name) LIKE lower('family%') then 1
										END ASC

			");

			$query2 = $this->db->query("SELECT
											COUNT (
												DISTINCT (t1.municipality_id)
											) all_munis
										FROM
											(
												SELECT
													t1.*
												FROM
													(
														SELECT
															t1.*, t2.provinceid,
															t2.municipality_id,
															t3.municipality_name,
															t4.assistance_name asst_type,
															t2.number_served,
															t2.remarks_particulars,
															t4. ID asst_id
														FROM
															tbl_augmentation_list_spec t1
														LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
														LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
														LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
														WHERE
															t4. ID = 1
														AND date_part('year', t1.date_augmented) = '$year'
														AND t2.municipality_id < 74
														ORDER BY
															t2.municipality_id ASC,
															t1.date_augmented :: DATE ASC,
															t4. ID ASC
													) t1
												ORDER BY
													t1.municipality_id ASC,
													t1.date_augmented :: DATE ASC,
													t1. ID ASC,
													CASE
												WHEN LOWER (t1.assistance_name) LIKE LOWER ('family%') THEN
													1
												END ASC
											) t1

			");

			$arr['aug_data'] = $query1->result_array();
			$arr['all_munis'] = $query2->result_array();

			return $arr;

		}

		public function get_augmentation_assistanceperd($year){

			$query2 = $this->db->query("SELECT
											t1.disaster_event,
											CASE
												WHEN t1.disaster_event = 'PARS' THEN 'Preparatory Activity for Rainy Season' 
												WHEN t1.disaster_event = 'PREP' THEN 'Preposition Goods'
												ELSE t1.disaster_name
											END disaster_name,
											t1.disaster_date
										FROM
											(
												SELECT
													*
												FROM
													(
														SELECT
															t1.*, t2.disaster_name,
															t2.disaster_date :: DATE
														FROM
															(
																SELECT DISTINCT
																	t1.disaster_event
																FROM
																	(
																		SELECT
																			t2.disaster_event,
																			t2.municipality_id,
																			t1.*
																		FROM
																			tbl_augmentation_list_spec t1
																		LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
																		GROUP BY
																			t2.disaster_event,
																			t2.municipality_id,
																			t1.augment_list_code,
																			t1. ID
																	) t1
																WHERE
																	date_part(
																		'YEAR',
																		t1.date_augmented :: DATE
																	) :: INTEGER = $year
																ORDER BY
																	t1.disaster_event DESC
															) t1
														LEFT JOIN tbl_dromic t2 ON t1.disaster_event :: CHARACTER VARYING = t2. ID :: CHARACTER VARYING
													) t1 -- UNION ALL
													-- 	(
													-- 		SELECT
													-- 			'PARS' disaster_event,
													-- 			'Preparatory Activities for Rainy Season' disaster_name,
													-- 			'01-01-1970' :: DATE
													-- 	)
													-- UNION ALL
													-- 	(
													-- 		SELECT
													-- 			'PREP' disaster_event,
													-- 			'Prepositioned Goods' disaster_name,
													-- 			'01-01-1970' :: DATE
													-- 	)
											) t1
										WHERE
											t1.disaster_event IS NOT NULL
											AND t1.disaster_event <> 'PREP'
										ORDER BY
											t1.disaster_date DESC
						");

			$arr['perd'] = $query2->result_array();

			$query3 = $this->db->query("SELECT
											t1.*
										FROM
											(
												SELECT
													t2.disaster_event,
													t4. ID provinceid,
													t4.province_name,
													t2.municipality_id,
													t2.number_served,
													t3.municipality_name,
													t1.*
												FROM
													tbl_augmentation_list_spec t1
												LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
												LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
												LEFT JOIN tbl_provinces t4 ON t3.provinceid = t4. ID
												WHERE
													date_part(
														'YEAR',
														t1.date_augmented :: DATE
													) :: INTEGER = $year
												GROUP BY
													t2.disaster_event,
													t4. ID,
													t4.province_name,
													t2.municipality_id,
													t2.number_served,
													t3.municipality_name,
													t1.augment_list_code,
													t1. ID
												ORDER BY
													t1.date_augmented DESC
											) t1
										ORDER BY
											t1.municipality_id ASC,
											CASE
										WHEN t1.number_served > 0 THEN
											1
										END ASC,
										 t1.date_augmented DESC,
										 CASE
										WHEN LOWER (t1.assistance_name) LIKE LOWER ('family%') THEN
											1
										END ASC

								");

			$arr['asst'] = $query3->result_array();

			$query4 = $this->db->query("SELECT DISTINCT
											t1.municipality_id,
											t1.municipality_name,
											t1.disaster_event,
											t1.augment_list_code
										FROM
											(
												SELECT
													t1.*
												FROM
													(
														SELECT
															t2.disaster_event,
															t4. ID provinceid,
															t4.province_name,
															t2.municipality_id,
															t2.number_served,
															t3.municipality_name,
															t1.*
														FROM
															tbl_augmentation_list_spec t1
														LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
														LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
														LEFT JOIN tbl_provinces t4 ON t3.provinceid = t4. ID
														WHERE
															date_part(
																'YEAR',
																t1.date_augmented :: DATE
															) :: INTEGER = $year
														GROUP BY
															t2.disaster_event,
															t4. ID,
															t4.province_name,
															t2.municipality_id,
															t2.number_served,
															t3.municipality_name,
															t1.augment_list_code,
															t1. ID
														ORDER BY
															t1.date_augmented DESC
													) t1
												ORDER BY
													t1.municipality_id ASC,
													CASE
												WHEN t1.number_served > 0 THEN
													1
												END ASC,
												t1.date_augmented DESC,
												CASE
											WHEN LOWER (t1.assistance_name) LIKE LOWER ('family%') THEN
												1
											END ASC
											) t1
										GROUP BY t1.municipality_id, t1.municipality_name, t1.augment_list_code, t1.disaster_event
										ORDER BY t1.municipality_id

								");


		
			$arr['muni'] = $query4->result_array();

			return $arr;

		}

		public function get_augmentation_assistanceffw($year){

			$query1 = $this->db->query("SELECT
											t1.*, t2.provinceid,
											t2.municipality_id,
											t3.municipality_name,
											t4.assistance_name asst_type,
											t2.number_served,
											t2.remarks_particulars,
											t4. ID asst_id
										FROM
											tbl_augmentation_list_spec t1
										LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
										LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
										LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
										WHERE t4. ID = 2
										AND date_part('year',t1.date_augmented) = $year
										ORDER BY
											t2.municipality_id ASC,
											t1.date_augmented::date ASC,
											t4. ID ASC
			");

			return $query1->result_array();
		}

		public function get_augmentation_assistanceesa($year){

			$query1 = $this->db->query("SELECT
											t1.*, t2.provinceid,
											t2.municipality_id,
											t3.municipality_name,
											t4.assistance_name asst_type,
											t2.number_served,
											t2.remarks_particulars,
											t4. ID asst_id
										FROM
											tbl_augmentation_list_spec t1
										LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
										LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
										LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
										WHERE
											(t4. ID = 5
										OR t4. ID = 6)
										AND date_part('year', t1.date_augmented) = $year
										ORDER BY
											t2.municipality_id ASC,
											t1.date_augmented :: DATE ASC,
											t4. ID ASC
			");

			return $query1->result_array();
		}

		public function get_augmentation_assistancecfw($year){

			$query1 = $this->db->query("SELECT
											t1.*, t2.provinceid,
											t2.municipality_id,
											t3.municipality_name,
											t4.assistance_name asst_type,
											t2.number_served,
											t2.remarks_particulars,
											t4. ID asst_id
										FROM
											tbl_augmentation_list_spec t1
										LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
										LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
										LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
										WHERE
											(t4. ID = 3
										OR t4. ID = 4)
										AND date_part('year', t1.date_augmented) = $year
										ORDER BY
											t2.municipality_id ASC,
											t1.date_augmented :: DATE ASC,
											t4. ID ASC
			");

			return $query1->result_array();
		}

		public function check_municipality_in_damass($id,$disaster_title_id){

			$query = $this->db->query("SELECT * FROM tbl_casualty_asst WHERE municipality_id = '$id' AND disaster_title_id = '$disaster_title_id'");

			return $query->num_rows();
		}

		public function issuesfound($id){

			$query1 = $this->db->query("SELECT
											t1.brgy_located,
											SUM (t1.person_cum :: INTEGER) AS person_cum,
											t2.tot_population,
											t2. ID,
											t2.brgy_name
										FROM
											tbl_evacuation_stats t1
										LEFT JOIN tbl_barangay t2 ON t1.brgy_located :: INTEGER = t2. ID :: INTEGER
										WHERE
											t1.disaster_title_id = $id
										GROUP BY
											t1.brgy_located,
											t2. ID
			");

			return $query1->result_array();
		}

		public function deleteDamAss($id){

			$query = $this->db->where('id',$id);
			$query = $this->db->delete('tbl_casualty_asst');

			if($query){
				return 1;
			}else{
				return 0;
			}

		}

		public function deleteECS($id){

			$query = $this->db->where('id',$id);
			$query = $this->db->delete('tbl_evacuation_stats');

			if($query){
				return 1;
			}else{
				return 0;
			}
		}

		public function delFamOEC($id){

			$query = $this->db->where('id',$id);
			$query = $this->db->delete('tbl_evac_outside_stats');

			if($query){
				return 1;
			}else{
				return 0;
			}
		}

		public function deleteCAS($id){

			$query = $this->db->where('id',$id);
			$query = $this->db->delete('tbl_casualty');

			if($query){
				return 1;
			}else{
				return 0;
			}
		}

		public function getPictureCoordinates($id){

			$query = $this->db->where('id',$id);
			$query = $this->db->get('tbl_images');

			return $query->result_array();
		}

		public function checkBrgy_tbl_damage_per_brgy($data){

			$count = 0;

			$did = $data['disaster_title_id'];
			$mid = $data['municipality_id'];
			$bid = $data['brgy_id'];

			$query = $this->db->query("
																SELECT
																	count(*) count_brgy
																FROM
																	tbl_damage_per_brgy t1 
																WHERE
																	t1.disaster_title_id = '$did' 
																	AND t1.municipality_id = '$mid' 
																	AND t1.brgy_id = '$bid'
			");

			$arr = $query->result_array();

			return $arr[0]['count_brgy'];

		}

		// public function saveDamageperBrgy($data){
		// 	return $data[1]['brgy_id'];
		// }

		public function saveDamageperBrgy($data){

			for($b = 0 ; $b < count($data) ; $b++){

				// $this->db->trans_begin();

				$did = $data[$b]['disaster_title_id'];
				$mid = $data[$b]['municipality_id'];
				$bid = $data[$b]['brgy_id'];
				$pid = $data[$b]['provinceid'];

				$query1 = $this->db->query("
																	SELECT * FROM tbl_damage_per_brgy t1 WHERE t1.disaster_title_id = '$did' AND t1.municipality_id = '$mid' and t1.brgy_id = '$bid'
				");

				if($query1->num_rows() < 1){

					$data_insert = array(
						'disaster_title_id' 		=> $data[$b]['disaster_title_id'],
						'provinceid' 						=> $data[$b]['provinceid'],
						'municipality_id' 			=> $data[$b]['municipality_id'],
						'brgy_id' 							=> $data[$b]['brgy_id'],
						'totally_damaged' 			=> $data[$b]['totally_damaged'],
						'partially_damaged' 		=> $data[$b]['partially_damaged'],

						'tot_aff_fam' 					=> $data[$b]['tot_aff_fam'],
						'tot_aff_person' 				=> $data[$b]['tot_aff_person'],

						'dead' 									=> '0',
						'injured' 							=> '0',
						'missing' 							=> '0',
						
						'costasst_brgy' 				=> $data[$b]['costasst_brgy']
					);

					$this->db->insert("tbl_damage_per_brgy",$data_insert);

					$query2 = $this->db->query("SELECT * FROM tbl_casualty_asst WHERE disaster_title_id = '$did' AND municipality_id = '$mid'");

					$arx = $query2->result_array();

					$query3 = $this->db->query("
						SELECT * FROM tbl_damage_per_brgy t1 WHERE t1.disaster_title_id = '$did' AND t1.municipality_id = '$mid'
					");

					$query4 = $this->db->query("SELECT * FROM tbl_affected WHERE disaster_title_id = '$did' AND municipality_id = '$mid'");

					$arr_affected = $query4->result_array();

					$tot 						= 0;
					$part 					= 0;
					$dead 					= 0;
					$injured 				= 0;
					$missing 				= 0;
					$costasst_brgy 	= 0;
					$brgy_id 				= "";
					$tot_fam 				= 0;
					$tot_person 		= 0;
					$count_brgys 		= 0;

					$arr = $query3->result_array();

					$count_brgys 	= count($arr);

					for($r = 0 ; $r < count($arr) ; $r++){

						$tot 					= (int)$tot + (int)$arr[$r]['totally_damaged'];
						$part 				= (int)$part + (int)$arr[$r]['partially_damaged'];
						$tot_fam 			= (int)$tot_fam + (int)$arr[$r]['tot_aff_fam'];
						$tot_person 	= (int)$tot_person + (int)$arr[$r]['tot_aff_person'];

						if($r == 0){
							$brgy_id = $arr[$r]['brgy_id'];
						}else{
							$brgy_id = $brgy_id."|".$arr[$r]['brgy_id'];
						}

					}

					$data_tot = array(
						'disaster_title_id' 		=> $did,
						'municipality_id' 			=> $mid,
						'provinceid' 						=> $pid,
						'totally_damaged' 			=> $tot,
						'partially_damaged' 		=> $part,
						'brgy_id' 							=> $brgy_id
					);

					$data_tot_affected = array(
						'provinceid' 				=> $pid,
						'municipality_id' 	=> $mid,
						'fam_no' 						=> $tot_fam,
						'person_no' 	 			=> $tot_person,
						'brgy_affected' 		=> $count_brgys,
						'disaster_title_id'	=> $did
					);

					//insert or update tb_casualty_asst
					if($query2->num_rows() < 1){
						$this->db->insert('tbl_casualty_asst',$data_tot);
					}else{
						$this->db->where('id',$arx[0]['id']);
						$this->db->update('tbl_casualty_asst',$data_tot);
					}
					//insert or update tbl_affected
					if($query4->num_rows() < 1){
						$this->db->insert('tbl_affected',$data_tot_affected);
					}else{

						$id = $arr_affected[0]['id'];

						$this->db->where('id',$id);
						$this->db->update('tbl_affected',$data_tot_affected);
					}

					// if($this->db->trans_status() == FALSE){
					// 	$this->db->trans_rollback();
					// 	return 0;
					// }else{
					// 	$this->db->trans_commit();
					// 	return 1;
					// }

				}

			}

		}

		public function get_damage_per_brgy_details($id){

			$query = $this->db->query("SELECT
											t1.*, t2.province_name, t3.municipality_name, t4.brgy_name
										FROM
											tbl_damage_per_brgy t1
											LEFT JOIN tbl_provinces t2 ON t1.provinceid = t2.id
											LEFT JOIN tbl_municipality t3 ON t1.municipality_id = t3.id
											LEFT JOIN tbl_barangay t4 ON t1.brgy_id = t4.id
										WHERE
											t1.ID = '$id'");

			$data['details'] = $query->result_array();
			
			$pid = $data['details'][0]['provinceid'];
			$mid = $data['details'][0]['municipality_id'];

			$q1 = $this->db->query("SELECT * FROM tbl_municipality WHERE provinceid = '$pid'");
			$data['municipality'] = $q1->result_array();

			$q2 = $this->db->query("SELECT * FROM tbl_barangay WHERE municipality_id = '$mid'");
			$data['barangay'] = $q2->result_array();

			return $data;


		}

		public function deletedamageperbrgy($id, $disaster_title_id, $municipality_id){

			$this->db->trans_begin();

			$totally_damaged 	= 0;
			$partially_damaged 	= 0;

			$dead 				= 0;
			$injured 			= 0;
			$missing 			= 0;
			$brgy_id 			= "";

			$tot_fam 			= 0;
			$tot_person 		= 0;

			$q1 = $this->db->where('id',$id);
			$q1 = $this->db->delete('tbl_damage_per_brgy');

			if($q1){

				$q2 = $this->db->query("SELECT * FROM tbl_damage_per_brgy WHERE disaster_title_id = '$disaster_title_id' AND municipality_id = '$municipality_id'");
				$arr = $q2->result_array();
				$count_brgys = count($arr);

				for($i = 0 ; $i < count($arr) ; $i++){

					$tot_fam 		= (int)$tot_fam + (int)$arr[$i]['tot_aff_fam'];
					$tot_person 	= (int)$tot_person + (int)$arr[$i]['tot_aff_person'];

					$totally_damaged 	= (int)$totally_damaged + (int)$arr[$i]['totally_damaged'];
					$partially_damaged 	= (int)$partially_damaged + (int)$arr[$i]['partially_damaged'];
					// $dead 				= (int)$dead + (int)$arr[$i]['dead'];
					// $injured 			= (int)$injured + (int)$arr[$i]['injured'];
					// $missing 			= (int)$missing + (int)$arr[$i]['missing'];

					if($i == 0){
						$brgy_id = $arr[$i]['brgy_id'];
					}else{
						$brgy_id = $brgy_id."|".$arr[$i]['brgy_id'];
					}

				}

				$dataup = array(

					'totally_damaged' 	=> $totally_damaged,
					'partially_damaged' => $partially_damaged,

					'dead' 				=> $dead,
					'injured' 			=> $injured,
					'missing' 			=> $missing,
					'brgy_id'			=> $brgy_id
				);

				$data_up_aff = array(
					'fam_no' 			=> $tot_fam,
					'person_no' 	 	=> $tot_person,
					'brgy_affected' 	=> $count_brgys
				);

				$q3 = $this->db->query("SELECT * FROM tbl_casualty_asst WHERE disaster_title_id = '$disaster_title_id' AND municipality_id = '$municipality_id'");
				$arx = $q3->result_array();

				$cid = $arx[0]['id'];

				$q4 = $this->db->where('id',$cid);
				$q4 = $this->db->update('tbl_casualty_asst',$dataup);



				$q5 = $this->db->query("SELECT * FROM tbl_affected WHERE disaster_title_id = '$disaster_title_id' AND municipality_id = '$municipality_id'");

				$arr = $q5->result_array();

				if($q5->num_rows() > 0){

					$id = $arr[0]['id'];

					$q6 = $this->db->where('id',$id);
					$q6 = $this->db->update('tbl_affected',$data_up_aff);

				}

			}

			// $query = $this->db->where('id',$id);
			// $query = $this->db->get('tbl_damage_per_brgy');

			// $data['details'] = $query->result_array();

			// $mid 				= $data['details'][0]['municipality_id'];
			// $disaster_title_id 	= $data['details'][0]['disaster_title_id'];
			// $totally_damaged 	= $data['details'][0]['totally_damaged'];
			// $partially_damaged 	= $data['details'][0]['partially_damaged'];
			// $dead 				= $data['details'][0]['dead'];
			// $injured 			= $data['details'][0]['injured'];
			// $missing 			= $data['details'][0]['missing'];

			// $q1 = $this->db->query("SELECT * FROM tbl_casualty_asst WHERE disaster_title_id = '$disaster_title_id' AND municipality_id = '$mid'");
			// $data['asst'] = $q1->result_array();

			// $asstid 				= $data['asst'][0]['id'];
			// $totally_damaged_tot 	= $data['asst'][0]['totally_damaged'] - $totally_damaged;
			// $partially_damaged_tot 	= $data['asst'][0]['partially_damaged'] - $partially_damaged;
			// $dead_tot 				= $data['asst'][0]['dead'] - $dead;
			// $injured_tot 			= $data['asst'][0]['injured'] - $injured;
			// $missing_tot 			= $data['asst'][0]['missing'] - $missing;

			// $dswd_asst 				= $data['asst'][0]['dswd_asst'];
			// $lgu_asst 				= $data['asst'][0]['lgu_asst'];
			// $ngo_asst 				= $data['asst'][0]['ngo_asst'];

			// $dataup = array(
			// 	'totally_damaged' 	=> $totally_damaged_tot,
			// 	'partially_damaged' => $partially_damaged_tot,
			// 	'dead' 				=> $dead_tot,
			// 	'injured' 			=> $injured_tot,
			// 	'missing' 			=> $missing_tot
			// );


			// $q2 = $this->db->where('id',$id);
			// $q2 = $this->db->delete('tbl_damage_per_brgy');

			// if($q2){
			// 	if($totally_damaged_tot <= 0 AND $partially_damaged_tot <= 0 AND $dead_tot <= 0 AND $injured_tot <= 0 AND $missing_tot <= 0 AND $dswd_asst <= 0 AND $lgu_asst <= 0 AND $ngo_asst <= 0){
			// 		$q3 = $this->db->where('id',$asstid);
			// 		$q3 = $this->db->delete('tbl_casualty_asst');
			// 	}else{
			// 		$q3 = $this->db->where('id',$asstid);
			// 		$q3 = $this->db->update('tbl_casualty_asst',$dataup);
			// 	}
			// }

			if($this->db->trans_status() === FALSE){
				$this->db->trans_rollback();
				return 0;
			}else{
				$this->db->trans_commit();
				return 1;
			}


		}

		public function updatedamageperbrgy($id,$disaster_title_id,$municipality_id,$data){

			$this->db->trans_begin();

			$totally_damaged 	= 0;
			$partially_damaged 	= 0;

			$dead 				= 0;
			$injured 			= 0;
			$missing 			= 0;
			$brgy_id 			= "";

			$tot_fam 			= 0;
			$tot_person 		= 0;

			$q1 = $this->db->where('id',$id);
			$q1 = $this->db->update('tbl_damage_per_brgy',$data);

			if($q1){

				$q2 = $this->db->query("SELECT * FROM tbl_damage_per_brgy WHERE disaster_title_id = '$disaster_title_id' AND municipality_id = '$municipality_id'");

				$arr = $q2->result_array();
				$count_brgys = count($arr);

				for($i = 0 ; $i < count($arr) ; $i++){

					$tot_fam 		= (int)$tot_fam + (int)$arr[$i]['tot_aff_fam'];
					$tot_person 	= (int)$tot_person + (int)$arr[$i]['tot_aff_person'];

					$totally_damaged 	= (int)$totally_damaged + (int)$arr[$i]['totally_damaged'];
					$partially_damaged 	= (int)$partially_damaged + (int)$arr[$i]['partially_damaged'];
					// $dead 				= (int)$dead + (int)$arr[$i]['dead'];
					// $injured 			= (int)$injured + (int)$arr[$i]['injured'];
					// $missing 			= (int)$missing + (int)$arr[$i]['missing'];

					if($i == 0){
						$brgy_id = $arr[$i]['brgy_id'];
					}else{
						$brgy_id = $brgy_id."|".$arr[$i]['brgy_id'];
					}

				}

				$dataup = array(
					'totally_damaged' 	=> $totally_damaged,
					'partially_damaged' => $partially_damaged,
					'dead' 				=> 0,
					'injured' 			=> 0,
					'missing' 			=> 0,
					'brgy_id'			=> $brgy_id
				);

				$data_up_aff = array(
					'fam_no' 			=> $tot_fam,
					'person_no' 	 	=> $tot_person,
					'brgy_affected' 	=> $count_brgys
				);

				$q3 = $this->db->query("SELECT * FROM tbl_casualty_asst WHERE disaster_title_id = '$disaster_title_id' AND municipality_id = '$municipality_id'");

				$arx = $q3->result_array();

				$cid = $arx[0]['id'];

				$q4 = $this->db->where('id',$cid);
				$q4 = $this->db->update('tbl_casualty_asst',$dataup);

				$q5 = $this->db->query("SELECT * FROM tbl_affected WHERE disaster_title_id = '$disaster_title_id' AND municipality_id = '$municipality_id'");

				$arr = $q5->result_array();

				if($q5->num_rows() > 0){

					$id = $arr[0]['id'];

					$q6 = $this->db->where('id',$id);
					$q6 = $this->db->update('tbl_affected',$data_up_aff);

				}

			}

			if($this->db->trans_status() === FALSE){
				$this->db->trans_rollback();
				return 0; 
			}else{
				$this->db->trans_commit();
				return 1;
			}

		}

		public function get_spec_assistance($id){

			$query = $this->db->query("
										SELECT
											t1.*, t2.provinceid,
											t2.municipality_id,
											t2.family_served
										FROM
											tbl_fnfi_assistance_list t1
										LEFT JOIN tbl_fnfi_assistance t2 ON t1.fnfi_assistance_id = t2. ID
										WHERE
											t1. ID = '$id'
			");

			$data['rs'] = $query->result_array();

			$pid = $data['rs'][0]['provinceid'];
			$mid = $data['rs'][0]['municipality_id'];

			$query2 = $this->db->where('provinceid',$pid);
			$query2 = $this->db->get('tbl_municipality');

			$data['city'] = $query2->result_array();

			$query3 = $this->db->where('municipality_id',$mid);
			$query3 = $this->db->get('tbl_barangay');

			$data['brgy'] = $query3->result_array();

			return $data;

		}

		public function del_spec_assistance($id){

			$this->db->trans_begin();

			$dswd_asst = 0;

			$query1 = $this->db->query("
										SELECT
											t1.*, t2.provinceid,
											t2.municipality_id,
											t2.disaster_title_id,
											t2.family_served
										FROM
											tbl_fnfi_assistance_list t1
										LEFT JOIN tbl_fnfi_assistance t2 ON t1.fnfi_assistance_id = t2. ID
										WHERE
											t1. ID = '$id'
			");

			$data['rs'] = $query1->result_array();

			$fnfi_assistance_id = $data['rs'][0]['fnfi_assistance_id'];

			$disaster_title_id 	= $data['rs'][0]['disaster_title_id'];
			$municipality_id 	= $data['rs'][0]['municipality_id'];

			if($query1){

				$query2 = $this->db->where('id',$id);
				$query2 = $this->db->delete('tbl_fnfi_assistance_list');

				if($query2){

					$query3 = $this->db->query("
												SELECT
													t1.*
												FROM
													tbl_fnfi_assistance_list t1
												WHERE
													t1.fnfi_assistance_id = '$fnfi_assistance_id'
					");

					$data['tot'] = $query3->result_array();

					for($i = 0 ; $i < count($data['tot']) ; $i++){
						$dswd_asst = $dswd_asst + ($data['tot'][$i]['cost'] * $data['tot'][$i]['quantity']);
					}

					$query4 = $this->db->query("SELECT * FROM tbl_casualty_asst WHERE disaster_title_id = '$disaster_title_id' AND municipality_id = '$municipality_id'");
					$data['asst'] = $query4->result_array();

					$aid = $data['asst'][0]['id'];

					$dataup = array(
						'dswd_asst' => $dswd_asst
					);

					$query5 = $this->db->where('id',$aid);
					$query5 = $this->db->update('tbl_casualty_asst',$dataup);

					$w = $this->db->where('fnfi_assistance_id',$fnfi_assistance_id);
					$w = $this->db->get('tbl_fnfi_assistance_list');

					if($w->num_rows() < 1){
						$query2 = $this->db->where('id',$fnfi_assistance_id);
						$query2 = $this->db->delete('tbl_fnfi_assistance');
					}

				}

			}

			if($this->db->trans_status() == FALSE){
				$this->db->trans_rollback();
				return 0;
			}else{
				$this->db->trans_commit();
				return 1;
			}

			
		}

		public function get_assistancetype_li(){

			$query = $this->db->get("tbl_assistance_type");
			return $query->result_array();

		}

		public function get_congressional($month,$year){

			$querycity = $this->db->query("SELECT
											t2.province_name,
											t1.district,
											t1.municipality_name,
											t1. ID AS municipality_id
										FROM
											tbl_municipality t1
										LEFT JOIN tbl_provinces t2 ON t1.provinceid = t2. ID
										WHERE
											t1.district IS NOT NULL
										ORDER BY
											t1.district ASC,
											t1. ID ASC
			");

			$data['city'] = $querycity->result_array();

			$querycfw2 = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																date_part(
																	'month',
																	t1.date_augmented :: DATE
																) = '$month'::numeric
															AND date_part(
																'year',
																t1.date_augmented :: DATE
															) = '$year'::numeric
															AND t4.assistance_type_gen = 'cfw'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['cfw2'] = $querycfw2->result_array();

			$queryesa = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																date_part(
																	'month',
																	t1.date_augmented :: DATE
																) = '$month'::numeric
															AND date_part(
																'year',
																t1.date_augmented :: DATE
															) = '$year'::numeric
															AND t4.assistance_type_gen = 'esa'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['esa'] = $queryesa->result_array();

			$queryffw = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																date_part(
																	'month',
																	t1.date_augmented :: DATE
																) = '$month'::numeric
															AND date_part(
																'year',
																t1.date_augmented :: DATE
															) = '$year'::numeric
															AND t4.assistance_type_gen = 'aug_ffw'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['ffw'] = $queryffw->result_array();

			$queryaug = $this->db->query("SELECT
											t1.municipality_id,
											SUM (t1.number_served :: NUMERIC) serve,
											SUM (t1.amount :: NUMERIC) amount
										FROM
											(
												SELECT
													t1.municipality_id,
													t1.municipality_name,
													t1.amount,
													t1.number_served
												FROM
													(
														SELECT
															t1.*, t2.number_served,
															t2.municipality_id,
															t3.municipality_name,
															t4.assistance_type_gen,
															t2.amount
														FROM
															tbl_augmentation_list_spec t1
														LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
														LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
														LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
														WHERE
															date_part(
																'month',
																t1.date_augmented :: DATE
															) = '$month'::numeric
														AND date_part(
															'year',
															t1.date_augmented :: DATE
														) = '$year'::numeric
														AND t4.assistance_type_gen = 'aug'
														ORDER BY
															t2.municipality_id ASC,
															t1.date_augmented ASC
													) t1
												GROUP BY
													t1.municipality_name,
													t1.municipality_id,
													t1.date_augmented,
													t1.number_served,
													t1.amount
											) t1
										GROUP BY
											t1.municipality_id
			");

			$data['aug'] = $queryaug->result_array();

			return $data;

		}

		public function get_congressional_quart($quarter,$year){

			$querycity = $this->db->query("SELECT
											t2.province_name,
											t1.district,
											t1.municipality_name,
											t1. ID AS municipality_id
										FROM
											tbl_municipality t1
										LEFT JOIN tbl_provinces t2 ON t1.provinceid = t2. ID
										WHERE
											t1.district IS NOT NULL
										ORDER BY
											t1.district ASC,
											t1. ID ASC
			");

			$data['city'] = $querycity->result_array();

			$querycfw2 = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																EXTRACT (
																	QUARTER
																	FROM
																		t1.date_augmented :: DATE
																) = $quarter :: NUMERIC
															AND date_part(
																'year',
																t1.date_augmented :: DATE
															) = $year :: NUMERIC
															AND t4.assistance_type_gen = 'cfw'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['cfw2'] = $querycfw2->result_array();

			$queryesa = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																EXTRACT (
																	QUARTER
																	FROM
																		t1.date_augmented :: DATE
																) = $quarter :: NUMERIC
															AND date_part(
																'year',
																t1.date_augmented :: DATE
															) = $year :: NUMERIC
															AND t4.assistance_type_gen = 'esa'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['esa'] = $queryesa->result_array();

			$queryffw = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																EXTRACT (
																	QUARTER
																	FROM
																		t1.date_augmented :: DATE
																) = $quarter :: NUMERIC
															AND date_part(
																'year',
																t1.date_augmented :: DATE
															) = $year :: NUMERIC
															AND t4.assistance_type_gen = 'aug_ffw'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['ffw'] = $queryffw->result_array();

			$queryaug = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																EXTRACT (
																	QUARTER
																	FROM
																		t1.date_augmented :: DATE
																) = $quarter :: NUMERIC
															AND date_part(
																'year',
																t1.date_augmented :: DATE
															) = $year :: NUMERIC
															AND t4.assistance_type_gen = 'aug'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['aug'] = $queryaug->result_array();

			return $data;

		}

		public function get_congressional_sem(){

			$querycity = $this->db->query("SELECT
											t2.province_name,
											t1.district,
											t1.municipality_name,
											t1. ID AS municipality_id
										FROM
											tbl_municipality t1
										LEFT JOIN tbl_provinces t2 ON t1.provinceid = t2. ID
										WHERE
											t1.district IS NOT NULL
										ORDER BY
											t1.district ASC,
											t1. ID ASC
			");

			$data['city'] = $querycity->result_array();

			$querycfw2 = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																t1.date_augmented between '2021-01-01' AND '2021-06-30'
															AND t4.assistance_type_gen = 'cfw'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['cfw2'] = $querycfw2->result_array();

			$queryesa = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																t1.date_augmented between '2021-01-01' AND '2021-06-30'
															AND t4.assistance_type_gen = 'esa'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['esa'] = $queryesa->result_array();

			$queryffw = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																t1.date_augmented between '2021-01-01' AND '2021-06-30'
															AND t4.assistance_type_gen = 'aug_ffw'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['ffw'] = $queryffw->result_array();

			$queryaug = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																t1.date_augmented between '2021-01-01' AND '2021-06-30'
															AND t4.assistance_type_gen = 'aug'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['aug'] = $queryaug->result_array();

			return $data;

		}

		public function get_congressional_yearly($year){

			$querycity = $this->db->query("SELECT
											t2.province_name,
											t1.district,
											t1.municipality_name,
											t1. ID AS municipality_id
										FROM
											tbl_municipality t1
										LEFT JOIN tbl_provinces t2 ON t1.provinceid = t2. ID
										WHERE
											t1.district IS NOT NULL
										ORDER BY
											t1.district ASC,
											t1. ID ASC
			");

			$data['city'] = $querycity->result_array();

			$querycfw2 = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																date_part(
																'year',
																t1.date_augmented :: DATE
															) = $year :: NUMERIC
															AND t4.assistance_type_gen = 'cfw'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['cfw2'] = $querycfw2->result_array();

			$queryesa = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																date_part(
																'year',
																t1.date_augmented :: DATE
															) = $year :: NUMERIC
															AND t4.assistance_type_gen = 'esa'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['esa'] = $queryesa->result_array();

			$queryffw = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																date_part(
																'year',
																t1.date_augmented :: DATE
															) = $year :: NUMERIC
															AND t4.assistance_type_gen = 'aug_ffw'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['ffw'] = $queryffw->result_array();

			$queryaug = $this->db->query("SELECT
												t1.municipality_id,
												SUM (t1.number_served :: NUMERIC) serve,
												SUM (t1.amount :: NUMERIC) amount
											FROM
												(
													SELECT
														t1.municipality_id,
														t1.municipality_name,
														t1.amount,
														t1.number_served
													FROM
														(
															SELECT
																t1.*, t2.number_served,
																t2.municipality_id,
																t3.municipality_name,
																t4.assistance_type_gen,
																t2.amount
															FROM
																tbl_augmentation_list_spec t1
															LEFT JOIN tbl_augmentation_list t2 ON t1.augment_list_id = t2. ID
															LEFT JOIN tbl_municipality t3 ON t2.municipality_id = t3. ID
															LEFT JOIN tbl_assistance_type t4 ON t1.augment_list_code = t4.assistance_type_sub_gen
															WHERE
																date_part(
																'year',
																t1.date_augmented :: DATE
															) = $year :: NUMERIC
															AND t4.assistance_type_gen = 'aug'
															ORDER BY
																t2.municipality_id ASC,
																t1.date_augmented ASC
														) t1
													GROUP BY
														t1.municipality_name,
														t1.municipality_id,
														t1.date_augmented,
														t1.number_served,
														t1.amount
												) t1
											GROUP BY
												t1.municipality_id
			");

			$data['aug'] = $queryaug->result_array();

			return $data;

		}

		public function get_disaster_events(){

			$d_events = $this->db->query("SELECT
												*
											FROM
												(
													SELECT
														t1. ID,
														t1.disaster_name,
														t1.disaster_date :: DATE
													FROM
														tbl_dromic t1
													ORDER BY
														t1. ID
												) t1
											ORDER BY
												t1.disaster_date DESC
										");

			return $d_events->result_array();

		}

		public function get_unique_lgus($year){

			$d_events = $this->db->query("SELECT
												COUNT (*)
											FROM
												(
													SELECT DISTINCT
														(t1.municipality_id)
													FROM
														tbl_augmentation_list t1
													LEFT JOIN tbl_augmentation_list_spec t2 ON t1.id = t2.augment_list_id
													WHERE extract(year from t2.date_augmented) = '$year'
												) t1
										");

			return $d_events->result_array();

		}

		public function getDromic(){

			$d_events = $this->db->query("SELECT * FROM tbl_dromic ORDER BY disaster_date DESC");

			return $d_events->result_array();

		}

		public function savetoDisasterReport($data){

			$etype = $data['message'][0];

			$dromic_id = $data['dromic_id'];

			$query1 = $this->db->query("SELECT MAX(id) as maxid FROM tbl_disaster_title WHERE dromic_id = '$dromic_id'");

			if($query1->num_rows() > 0){

				$id = $query1->result_array();
				$id = $id[0]["maxid"];

				if($etype == "E"){

					$municipality_name = $data['message'][2];

					$query2 = $this->db->query("SELECT id FROM tbl_municipality WHERE municipality_name = '$municipality_name'");

					$municipality_id = $query2->result_array();
					$municipality_id = $municipality_id[0]["id"];

					$query3 = $this->db->query("SELECT * FROM tbl_evacuation_stats WHERE disaster_title_id = '$id' AND municipality_id = '$municipality_id'");

					
				}


			}else{
				return 0;
			}

		}

		public function signup_user($data){

			$password 	= "\=45f=".md5($data['password'])."==//87*1)";
			$password 	= sha1(md5($password));

			$datas = array(
				'firstname' 				=> $data['firstname'],
				'middlename' 				=> $data['middlename'],
				'lastname' 					=> $data['lastname'],
				'provinceid' 				=> $data['provinceid'],
				'municipality_id' 	=> $data['municipality_id'],
				'address' 					=> $data['address'],
				'agency' 						=> $data['agency'],
				'designation' 			=> $data['position'],
				'emailaddress' 			=> $data['emailaddress'],
				'mobile' 						=> $data['mobile'],
				'username' 					=> $data['username'],
				'password_hash' 		=> $password,
				'isdswd' 						=> 'f'
			);

			$username = $data['username'];


			$query1 = $this->db->query("SELECT * FROM tbl_auth_users WHERE username = '$username'");

			if($query1->num_rows() > 0){

				return 2;

			}else{

				$query = $this->db->insert('tbl_auth_users',$datas);

				if($query){

					$datains = array(
						'fullname' 		=> strtoupper($data['firstname']) . " " . strtoupper($data['lastname']),
						'position' 		=> strtoupper($data['position']),
						'username' 		=> $data['username'],
						'password' 		=> $password,
						'isadmin' 		=> 'f',
						'ishead' 		=> 'f',
						'isactivated' 	=> 'f'
					);

					$query2 = $this->db->insert('tbl_auth_user',$datains);

					return 1;

				}else{

					return 0;

				}

			}


		}

		public function save_reports_assignment($disaster_reports,$users_list,$username,$can_edit){


			$this->db->trans_begin(); 

			$arr = array();

			for($i = 0 ; $i < count($disaster_reports) ; $i++){

				for($j = 0 ; $j < count($users_list) ; $j++){

					$arr = array(
						'dromic_id' 			=> $disaster_reports[$i]['dromic_id'],
						'can_access_username' 	=> $users_list[$j]['can_access_username'],
						'assigned_by_username' 	=> $username,
						'can_edit' 				=> $can_edit
					);

					$query1 = $this->db->insert('tbl_reports_assignment',$arr);

				}

			}

			if ($this->db->trans_status() === FALSE)
			{
			    $this->db->trans_rollback();
			    return 0;
			}
			else
			{
			    $this->db->trans_commit();
			    return 1;
			}


		}

		public function get_can_edit($id,$username){

			session_start();

			$query = $this->db->query("SELECT * FROM tbl_disaster_title WHERE id = '$id'");

			$arr = $query->result_array();

			$ids = $arr[0]['dromic_id'];

			$query2 = $this->db->query("SELECT * FROM tbl_dromic WHERE id = '$ids'");

			$arr2 = $query2->result_array();

			if($username == $arr2[0]['created_by_user']){

				return 1;

			}else{

				$query3 = $this->db->query("SELECT * FROM tbl_reports_assignment WHERE dromic_id = '$ids' AND can_access_username = '$username'");

				$arr3 = $query3->result_array();

				if($arr3[0]['can_edit'] == 't'){

					$_SESSION['can_edit'] = '1';

					return 1;
				}else{

					$_SESSION['can_edit'] = false;
					return 0;
				}

			}

		}


		public function save_report_comment($id, $msg, $username){

			$query = $this->db->query("SELECT * FROM tbl_disaster_title WHERE id = '$id'");

			$arr = $query->result_array();

			$ids = $arr[0]['dromic_id'];

			$data = array(
				'disaster_title_id' 	=> $ids,
				'msg' 					=> $msg,
				'by_user' 				=> $username
			);

			$this->db->trans_begin(); 

			$query1 = $this->db->insert('tbl_comments',$data);

			if ($this->db->trans_status() === FALSE)
			{
			    $this->db->trans_rollback();
			    return 0;
			}
			else
			{
			    $this->db->trans_commit();
			    return 1;
			}
			

		}

		public function get_comments($id){

			$arr2 = array();


			$query = $this->db->query("SELECT * FROM tbl_disaster_title WHERE id = '$id'");

			$arr = $query->result_array();

			$ids = $arr[0]['dromic_id'];

			$query1 = $this->db->query("SELECT * FROM tbl_comments t1 WHERE t1.disaster_title_id = '$ids' ORDER BY t1.date DESC, t1.time DESC");

			$arr2['comment'] = $query1->result_array();

			$query2 = $this->db->query("SELECT * FROM tbl_replies t1 WHERE t1.dromic_id = '$ids' ORDER BY t1.date_added ASC, t1.time ASC");

			$arr2['reply'] = $query2->result_array();

			return $arr2;

		}

		public function get_can_view($id,$username){


			$query = $this->db->query("SELECT * FROM tbl_disaster_title WHERE id = '$id'");

			$arr = $query->result_array();

			$ids = $arr[0]['dromic_id'];

			$query2 = $this->db->query("SELECT * FROM tbl_dromic WHERE id = '$ids'");

			$arr2 = $query2->result_array();

			if($username == $arr2[0]['created_by_user']){

				return 1;

			}else{

				$query3 = $this->db->query("SELECT * FROM tbl_reports_assignment WHERE dromic_id = '$ids' AND can_access_username = '$username'");

				if($query3->num_rows() >= 1){
					return 1;
				}else{
					return 0;
				}

			}

		}

		public function getmunicipality($id){


			$query = $this->db->where('id',$id);
			$query = $this->db->get('tbl_municipality');

			$arr = $query->result_array();

			$provinceid = $arr[0]['provinceid'];

			$query1 = $this->db->where('provinceid',$provinceid);
			$query1 = $this->db->get('tbl_municipality');

			return $query1->result_array();

		}

		public function save_reply($id, $msg, $comment_id, $username){

			$query = $this->db->query("SELECT * FROM tbl_disaster_title WHERE id = '$id'");

			$arr = $query->result_array();

			$ids = $arr[0]['dromic_id'];

			$data = array(
				'dromic_id' 			=> $ids,
				'msg' 					=> nl2br($msg),
				'comment_id' 			=> $comment_id,
				'by_user' 				=> $username
			);

			$this->db->trans_begin(); 

			$query1 = $this->db->insert('tbl_replies',$data);

			if ($this->db->trans_status() === FALSE)
			{
			    $this->db->trans_rollback();
			    return 0;
			}
			else
			{
			    $this->db->trans_commit();
			    return 1;
			}
			

		}


		public function upload_file($data){


			$this->db->trans_begin(); 

			$query1 = $this->db->insert('tbl_narrative_report', $data);

			if ($this->db->trans_status() === FALSE)
			{
			    $this->db->trans_rollback();
			    return 0;
			}
			else
			{
			    $this->db->trans_commit();
			    return 1;
			}
			

		}

		public function get_if_narrative($id){

			$c = 0;

			$query = $this->db->query("SELECT * FROM tbl_narrative_report WHERE  disaster_title_id = '$id'");

			$arr = array();

			$arr = $query->result_array();

			for ($i = 0; $i < count($arr); $i++) { 
				$c += 1;
			}

			return $c;
			

		}


		public function get_map($id){

			$query = $this->db->query("SELECT
											row_to_json (fc) AS features
										FROM
											(
												SELECT
													'FeatureCollection' AS TYPE,
													array_to_json (ARRAY_AGG(f)) AS features
												FROM
													(
														SELECT
															'Feature' AS TYPE,
															t1.id_1 AS ID,
															row_to_json (t2) properties,
															st_asgeojson (st_union(t1.geom)) :: json geometry
														FROM
															tbl_map_sdn t1
														LEFT JOIN (
															SELECT
																t1.id_1 municipality_id,
																t1.municipality_name,
																t3.province_name,
																COALESCE (t2.fam_cum, 0) density -- 	st_asgeojson (st_union(t1.geom)) :: json geometry
															FROM
																tbl_map_sdn t1
															LEFT JOIN (
																SELECT
																	t1.*
																FROM
																	(
																		SELECT
																			t2.municipality_id, t2.fam_cum
																		FROM
																			(
																			SELECT ROW_NUMBER
																				( ) OVER ( PARTITION BY t1.municipality_id ORDER BY t1.fam_cum DESC ) AS ROW_NUMBER, * 
																			FROM
																				(
																				SELECT
																					t1.municipality_id,
																					t1.fam_cum 
																				FROM
																					(
																					SELECT
																						t1.municipality_id,
																						SUM ( t1.fam_cum ) fam_cum 
																					FROM
																						(
																						SELECT
																							t1.* 
																						FROM
																							(
																							SELECT
																								t1.municipality_id,
																								SUM ( t1.family_cum :: INTEGER ) AS fam_cum 
																							FROM
																								tbl_evacuation_stats t1
																								LEFT JOIN tbl_provinces t3 ON t1.provinceid = t3.ID 
																							WHERE
																								t1.disaster_title_id = '$id' 
																								AND ( t3.psgc_code IS NOT NULL ) 
																							GROUP BY
																								t1.municipality_id 
																							) t1 UNION
																							(
																							SELECT
																								t2.municipality_id,
																								SUM ( t2.family_cum :: INTEGER ) AS fam_cum 
																							FROM
																								tbl_evac_outside_stats t2
																								LEFT JOIN tbl_provinces t3 ON t2.provinceid = t3.ID 
																							WHERE
																								t2.disaster_title_id = '$id' 
																								AND ( t3.psgc_code IS NOT NULL ) 
																							GROUP BY
																								t2.municipality_id 
																							) 
																						) t1 
																					GROUP BY
																						t1.municipality_id 
																					) t1 UNION ALL
																					( SELECT t1.municipality_id, t1.fam_no fam_cum FROM tbl_affected t1 WHERE t1.disaster_title_id :: INTEGER = '$id' ) 
																				) t1 
																			) t2 WHERE t2.row_number = 1
																	) t1
															) t2 ON t1.id_1 = t2.municipality_id
															LEFT JOIN tbl_provinces t3 ON t1.id_0 = t3. ID
															GROUP BY
																t1.id_1,
																t1.municipality_name,
																t3.province_name,
																t2.fam_cum
														) t2 ON t1.id_1 = t2.municipality_id
														GROUP BY
															t2.*, t1.id_1
													) f
											) AS fc
										");

			$arr = array();

			$arr = $query->result_array();

			$str = "";

			$str = $arr[0]['features'];

			return json_decode($str);
			

		}


		public function get_feature_info($id, $municipality_id){

			$arr 		= array();

			$query 		= $this->db->query("SELECT sum(t1.family_cum::integer) as fam_cum FROM tbl_evacuation_stats t1 WHERE t1.disaster_title_id = '$id' AND t1.municipality_id = '$municipality_id'");

			$arr['inside'] = $query->result_array();

			$query2 	= $this->db->query("SELECT sum(t1.family_cum::integer) as fam_cum FROM tbl_evac_outside_stats t1 WHERE t1.disaster_title_id = '$id' AND t1.municipality_id = '$municipality_id'");

			if($query2->num_rows() < 1){

				$arr['outside'][] = array(
					'fam_cum' 	 => 0
				);

			}else{

				$arr['outside'] = $query2->result_array();

			}

			$query3 	= $this->db->query("SELECT
												t1.totally_damaged,
												t1.partially_damaged,
												t1.dswd_asst
											FROM
												tbl_casualty_asst t1
											WHERE t1.disaster_title_id = '$id'
											AND t1.municipality_id = '$municipality_id'
										");

			if($query3->num_rows() < 1){

				$arr['dam_asst'][] = array(
					'totally_damaged' 	 => 0,
					'partially_damaged'  => 0,
					'dswd_asst' 		 => 0
				);

			}else{

				$arr['dam_asst'] = $query3->result_array();

			}

			return $arr;

		}


		public function get_mobile_user(){

			$query 	= $this->db->query("SELECT * FROM tbl_mobile_user_a t1 ORDER BY t1.id DESC");

			return $query->result_array();


		}

		public function activateuser($users){

			$data = array();

			for($i = 0 ; $i < count($users) ; $i++){

				$id = $users[$i]['id'];

				$data = array(
					'isactivated' => 't'
				);

				$query = $this->db->where('id', $id);
				$query = $this->db->update('tbl_mobile_user_a', $data);

			}
			

			return 1;


		}


		public function deactivateuser($users){

			$data = array();

			for($i = 0 ; $i < count($users) ; $i++){

				$id = $users[$i]['id'];

				$data = array(
					'isactivated' => 'f'
				);

				$query = $this->db->where('id', $id);
				$query = $this->db->update('tbl_mobile_user_a', $data);

			}
			

			return 1;

		}

		public function get_all_disasters(){

			$data = array();
			$latest_id = "";
			$separate_data = array();
			$str = "";

			$query 	= $this->db->query("SELECT
											t1.ID AS dromic_id, t1.disaster_name, t1.disaster_date, MAX(t2.ID) as latest_id
										FROM
											tbl_dromic t1 
										LEFT JOIN tbl_disaster_title t2 ON t1.ID = t2.dromic_id
										WHERE
											date_part( 'YEAR', t1.disaster_date :: DATE ) >= '2018' 
											GROUP BY t1.id
										ORDER BY
											t1.ID ASC, t1.disaster_date::date ASC
									");

			$data = $query->result_array();

			$str = "<table><tr>";
			$str = $str."<td>disaster_id</td>";
			$str = $str."<td>provinceid</td>";
			$str = $str."<td>municipality_id</td>";
			$str = $str."<td>family_a_t</td>";
			$str = $str."<td>person_a_t</td>";
			$str = $str."<td>family_cum_i</td>";
			$str = $str."<td>family_now_i</td>";
			$str = $str."<td>person_cum_i</td>";
			$str = $str."<td>person_now_i</td>";
			$str = $str."<td>family_cum_o</td>";
			$str = $str."<td>family_now_o</td>";
			$str = $str."<td>person_cum_o</td>";
			$str = $str."<td>person_now_o</td>";
			$str = $str."<td>family_cum_s_t</td>";
			$str = $str."<td>family_now_s_t</td>";
			$str = $str."<td>person_cum_s_t</td>";
			$str = $str."<td>person_now_s_t</td>";
			$str = $str."<td>fam_no</td>";
			$str = $str."<td>person_no</td>";
			$str = $str."</tr>";

			for($i = 0 ; $i < count($data) ; $i++){

				$latest_id = $data[$i]['latest_id'];

				$query_data   = $this->db->query("SELECT
														t1.provinceid,
														t1.municipality_id,
														SUM ( family_a_t ) family_a_t,
														SUM ( person_a_t ) person_a_t,
														SUM ( family_cum_i ) family_cum_i,
														SUM ( family_now_i ) family_now_i,
														SUM ( person_cum_i ) person_cum_i,
														SUM ( person_now_i ) person_now_i,
														SUM ( family_cum_o ) family_cum_o,
														SUM ( family_now_o ) family_now_o,
														SUM ( person_cum_o ) person_cum_o,
														SUM ( person_now_o ) person_now_o,
														SUM ( family_cum_s_t ) family_cum_s_t,
														SUM ( family_now_s_t ) family_now_s_t,
														SUM ( person_cum_s_t ) person_cum_s_t,
														SUM ( person_now_s_t ) person_now_s_t,
														SUM( fam_no ) fam_no,
														SUM (person_no) person_no
													FROM
														(
													SELECT
														t1.provinceid,
														t1.municipality_id,
														COALESCE ( t1.family_cum_i, '0' ) + COALESCE ( t1.family_cum_o, '0' ) family_a_t,
														COALESCE ( t1.person_cum_i, '0' ) + COALESCE ( t1.person_cum_o, '0' ) person_a_t,
														t1.family_cum_i,
														t1.family_now_i,
														t1.person_cum_i,
														t1.person_now_i,
														t1.family_cum_o,
														t1.family_now_o,
														t1.person_cum_o,
														t1.person_now_o,
														COALESCE ( t1.family_cum_i, '0' ) + COALESCE ( t1.family_cum_o, '0' ) family_cum_s_t,
														COALESCE ( t1.family_now_i, '0' ) + COALESCE ( t1.family_now_o, '0' ) family_now_s_t,
														COALESCE ( t1.person_cum_i, '0' ) + COALESCE ( t1.person_cum_o, '0' ) person_cum_s_t,
														COALESCE ( t1.person_now_i, '0' ) + COALESCE ( t1.person_now_o, '0' ) person_now_s_t,
														t1.fam_no,
														t1.person_no
													FROM
														(
													SELECT
														t1.provinceid,
														t1.municipality_id,
														t1.family_cum_i,
														t1.family_now_i,
														t1.person_cum_i,
														t1.person_now_i,
														t1.family_cum_o,
														t1.family_now_o,
														t1.person_cum_o,
														t1.person_now_o,
														t1.fam_no,
														t1.person_no
													FROM
														(
													SELECT
														t0.* 
													FROM
														(
													SELECT
														t1.provinceid,
														t1.municipality_id,
														t1.family_cum :: INTEGER family_cum_i,
														t1.family_now :: INTEGER family_now_i,
														t1.person_cum :: INTEGER person_cum_i,
														t1.person_now :: INTEGER person_now_i,
														'0' :: INTEGER family_cum_o,
														'0' :: INTEGER family_now_o,
														'0' :: INTEGER person_cum_o,
														'0' :: INTEGER person_now_o,
														'0' :: INTEGER fam_no,
														'0' :: INTEGER person_no
													FROM
														PUBLIC.tbl_evacuation_stats t1
														LEFT JOIN PUBLIC.tbl_disaster_title t2 ON t1.disaster_title_id = t2.ID 
													WHERE
														t1.disaster_title_id = '$latest_id' 
													ORDER BY
														t1.municipality_id 
														) t0 UNION ALL
														(
													SELECT
														t1.provinceid,
														t1.municipality_id,
														'0' :: INTEGER family_cum_i,
														'0' :: INTEGER family_now_i,
														'0' :: INTEGER person_cum_i,
														'0' :: INTEGER person_now_i,
														t1.family_cum :: INTEGER family_cum_o,
														t1.family_now :: INTEGER family_now_o,
														t1.person_cum :: INTEGER person_cum_o,
														t1.person_now :: INTEGER person_now_o,
														'0' :: INTEGER fam_no,
														'0' :: INTEGER person_no
													FROM
														PUBLIC.tbl_evac_outside_stats t1
														LEFT JOIN PUBLIC.tbl_disaster_title t2 ON t1.disaster_title_id = t2.ID 
													WHERE
														t1.disaster_title_id = '$latest_id' 
													ORDER BY
														t1.municipality_id 
														) UNION ALL
														(
													SELECT
														t1.provinceid,
														t1.municipality_id,
														'0' :: INTEGER family_cum_i,
														'0' :: INTEGER family_now_i,
														'0' :: INTEGER person_cum_i,
														'0' :: INTEGER person_now_i,
														'0' :: INTEGER family_cum_o,
														'0' :: INTEGER family_now_o,
														'0' :: INTEGER person_cum_o,
														'0' :: INTEGER person_now_o,
														'0' :: INTEGER fam_no,
														'0' :: INTEGER person_no	
													FROM
														PUBLIC.tbl_casualty_asst t1
														LEFT JOIN PUBLIC.tbl_disaster_title t2 ON t1.disaster_title_id = t2.ID 
													WHERE
														t1.disaster_title_id = '$latest_id' 
													ORDER BY
														t1.municipality_id 
														) UNION ALL
														(
													SELECT
														t1.provinceid,
														t1.municipality_id,
														'0' :: INTEGER family_cum_i,
														'0' :: INTEGER family_now_i,
														'0' :: INTEGER person_cum_i,
														'0' :: INTEGER person_now_i,
														'0' :: INTEGER family_cum_o,
														'0' :: INTEGER family_now_o,
														'0' :: INTEGER person_cum_o,
														'0' :: INTEGER person_now_o, 
														t1.fam_no :: INTEGER fam_no,
														t1.person_no :: INTEGER person_no
													FROM
														PUBLIC.tbl_affected t1
														LEFT JOIN PUBLIC.tbl_disaster_title t2 ON t1.disaster_title_id :: INTEGER = t2.ID 
													WHERE
														t1.disaster_title_id :: INTEGER = '$latest_id' 
													ORDER BY
														t1.municipality_id 
														) 
														) t1 
														) t1 
													ORDER BY
														t1.municipality_id 
														) t1 
													GROUP BY
														t1.provinceid,
														t1.municipality_id 
													ORDER BY
														t1.municipality_id
									");

				$separate_data = $query_data->result_array();

				for($j = 0 ; $j < count($separate_data) ; $j++){
					$str = $str."<tr>";
					$str = $str."<td>".$data[$i]['dromic_id']."</td>";
					$str = $str."<td>".$separate_data[$j]['provinceid']."</td>";
					$str = $str."<td>".$separate_data[$j]['municipality_id']."</td>";
					$str = $str."<td>".$separate_data[$j]['family_a_t']."</td>";
					$str = $str."<td>".$separate_data[$j]['person_a_t']."</td>";
					$str = $str."<td>".$separate_data[$j]['family_cum_i']."</td>";
					$str = $str."<td>".$separate_data[$j]['family_now_i']."</td>";
					$str = $str."<td>".$separate_data[$j]['person_cum_i']."</td>";
					$str = $str."<td>".$separate_data[$j]['person_now_i']."</td>";
					$str = $str."<td>".$separate_data[$j]['family_cum_o']."</td>";
					$str = $str."<td>".$separate_data[$j]['family_now_o']."</td>";
					$str = $str."<td>".$separate_data[$j]['person_cum_o']."</td>";
					$str = $str."<td>".$separate_data[$j]['person_now_o']."</td>";
					$str = $str."<td>".$separate_data[$j]['family_cum_s_t']."</td>";
					$str = $str."<td>".$separate_data[$j]['family_now_s_t']."</td>";
					$str = $str."<td>".$separate_data[$j]['person_cum_s_t']."</td>";
					$str = $str."<td>".$separate_data[$j]['person_now_s_t']."</td>";
					$str = $str."<td>".$separate_data[$j]['fam_no']."</td>";
					$str = $str."<td>".$separate_data[$j]['person_no']."</td>";
					$str = $str."</tr>";
				}

				echo $str;

				$str = "";

			}

			$str = $str."</table>";

		}

		

		public function authenticate_user($username,$password){

			$db1 = $this->load->database('otherdb', TRUE);

			$arr = [];

			$query = $db1->where('username', $username);
			$query = $db1->get('user');

			$arr = $query->result_array();

			if(count($arr) > 0){

				$password_hash = $arr[0]['password_hash'];

				$bool = password_verify($password,$password_hash);

				if($bool == "true"){

					$username 	= $arr[0]['username'];
					$id_number 	= $arr[0]['id_number'];

					$data = array(
						'bool' => $bool,
						'username' => $username,
						'id_number' => $id_number
					);

					return $data;

				}else{

					$data = array(
						'bool' => 'false',
						'username' => null,
						'id_number' => null
					);

					return $data;

				}
			}else{

				$data = array(
					'bool' => 'false',
					'username' => null,
					'id_number' => null
				);

				return $data;

			}

		}

		public function get_payroll($id_number){

			$db1 = $this->load->database('otherdb', TRUE);

			$query = $db1->query("SELECT * FROM tbl_payroll WHERE employee_id = '$id_number' AND YEAR(period_covered_from) = YEAR(CURDATE()) ORDER BY payroll_id DESC");


			$payroll = array(
				'payroll' => $query->result_array()
			);

			return $payroll;

		}

		public function get_payroll_t($payroll_id){

			$db1 = $this->load->database('otherdb', TRUE);

			$query = $db1->query("SELECT * FROM tbl_payroll WHERE payroll_id = '$payroll_id'");

			$arr = $query->result_array();

			$dv_no = $arr[0]['dv_no'];

			$payroll["payroll"] = $query->result_array();

			$db2 = $this->load->database('otherdb2', TRUE);

			$query1 = $db2->query("SELECT
										rx.dv_no,
										rx.dv_date,
										rx.amt_budget,
										rx.amt_journal,
										rx.approval_date,
										rx.check_id,
										rx.check_issued
									FROM
										(
											SELECT
												*
											FROM
												(
													SELECT
														2018_t.*, 2018_ps.`name` AS projectsrc_name,
														2018_p.`check_id`,
														2018_p.`is_cancel`,
														2018_p.`is_multiple`,
														2018_p.`validate_budget`,
														2018_p.`check_issued`,
														2018_p.`check_released`,
														2018_c.`account_number`,
														2018_c.`ada_trans`,
														2018_c.`check_amount`,
														2018_c.`check_no`,
														2018_c.`check_status`,
														2018_c.`date_received`,
														2018_c.`date_transact`,
														2018_c.`paid`,
														2018_c.`paid_voucher`,
														2018_c.`printed_name`,
														2018_c.`release_date`,
														2018_c.`release_userlog`,
														2018_c.`userlog` AS userlog_cash
													FROM
														infimos_2018.`transactions` AS 2018_t
													LEFT JOIN infimos_2018.`trans_payeename` AS 2018_p ON 2018_p.`transaction_id` = 2018_t.`transaction_id`
													LEFT JOIN infimos_2018.`trans_check` AS 2018_c ON 2018_c.`check_id` = 2018_p.`check_id`
													LEFT JOIN infimos_2018.`project_src` AS 2018_ps ON 2018_ps.`projectsrc_id` = 2018_t.`projectsrc_id`
												) AS rs
										) AS rx
									WHERE rx.dv_no = '$dv_no'
								");

			$payroll["status"] = $query1->result_array();

			return $payroll;

		}

		public function get_tev($id_number){

			$db2 = $this->load->database('otherdb2', TRUE);

			$query = $db2->query("SELECT 
									rs.namelist_id,
									rs.id_number,
									rs.dv_date,
									rs.purpose,
									rs.amount,
									rs.amt_budget,
									rs.amt_journal,
									rs.approval_date,
									rs.check_id 
									FROM (
									SELECT
										rs.*
									FROM
										(
											SELECT
												l.*, t.`dv_no`,
												t.`dv_date`,
												t.`modepayment`,
												t.`amt_budget`,
												t.`amt_journal`,
												t.`approval_date`,
												p.`check_id`
											FROM
												`trans_namelist` AS l,
												`transactions` AS t,
												`trans_payeename` AS p
											WHERE
												l.`transaction_id` = t.`transaction_id`
											AND t.`transaction_id` = p.`transaction_id`
										) AS rs ) as rs
										WHERE rs.id_number = '$id_number'
										ORDER BY rs.namelist_id DESC

								");


			$tev = array(
				'tev' => $query->result_array()
			);

			return $tev;

		}

		public function get_tev_t($namelist_id){

			$db2 = $this->load->database('otherdb2', TRUE);

			$query = $db2->query("SELECT 
									rs.namelist_id,
									rs.id_number,
									rs.dv_date,
									rs.purpose,
									rs.amount,
									rs.amt_budget,
									rs.amt_journal,
									rs.approval_date,
									rs.check_id 
									FROM (
									SELECT
										rs.*
									FROM
										(
											SELECT
												l.*, t.`dv_no`,
												t.`dv_date`,
												t.`modepayment`,
												t.`amt_budget`,
												t.`amt_journal`,
												t.`approval_date`,
												p.`check_id`
											FROM
												`trans_namelist` AS l,
												`transactions` AS t,
												`trans_payeename` AS p
											WHERE
												l.`transaction_id` = t.`transaction_id`
											AND t.`transaction_id` = p.`transaction_id`
										) AS rs ) as rs
										WHERE rs.namelist_id = '$namelist_id'

								");


			$tev = array(
				'tev' => $query->result_array()
			);

			return $tev;

		}

		public function searchSexAgeData($id){

			$query = $this->db->where('id', $id);
			$query = $this->db->get('tbl_sex_age_sector_data');

			return $query->result_array();

		}

		public function saveSexAgeData($disaster_title_id, $municipality_id, $data){

			$query = $this->db->where('municipality_id', $municipality_id);
			$query = $this->db->where('disaster_title_id', $disaster_title_id);
			$query = $this->db->get('tbl_sex_age_sector_data');

			if(count($query->result_array()) < 1){

				$this->db->trans_begin(); 
				$this->db->insert('tbl_sex_age_sector_data', $data);

				if ($this->db->trans_status() === FALSE)
				{
				    $this->db->trans_rollback();
				    return 0;
				}else{
				    $this->db->trans_commit();
				    return 1;
				}
			}

			return 2;

		}

		public function deleteSexAgeData($disaster_title_id, $municipality_id){

			$this->db->trans_begin();

			$this->db->where('disaster_title_id', $disaster_title_id);
			$this->db->where('municipality_id', $municipality_id);
			$this->db->delete('tbl_sex_age_sector_data');

			if($this->db->trans_status() === FALSE){
				 $this->db->trans_rollback();
				 return 0;
			}else{
			    $this->db->trans_commit();
			    return 1;
			}

		}

		public function updateSexAgeData($disaster_title_id, $municipality_id, $data){

			$this->db->trans_begin(); 

			$query = $this->db->where('municipality_id', $municipality_id);
			$query = $this->db->where('disaster_title_id', $disaster_title_id);
			$query = $this->db->update('tbl_sex_age_sector_data', $data);

			if ($this->db->trans_status() === FALSE)
			{
			    $this->db->trans_rollback();
			    return 0;
			}else{
			    $this->db->trans_commit();
			    return 1;
			}

		}

		public function closeAllECs($disaster_title_id, $municipality_id){

			$data_nums = array(
				'ec_now' 		=> 0,
				'family_now' 	=> 0,
				'person_now' 	=> 0
			);

			$data_status = array(
				'ec_status' 	=> 'Closed'
			);


			$this->db->trans_begin(); 

			$query = $this->db->where('municipality_id', $municipality_id);
			$query = $this->db->where('disaster_title_id', $disaster_title_id);
			$query = $this->db->update('tbl_evacuation_stats', $data_nums);

			$query = $this->db->where('municipality_id', $municipality_id);
			$query = $this->db->where('disaster_title_id', $disaster_title_id);
			$query = $this->db->where('ec_status', 'Existing');
			$query = $this->db->or_where('ec_status', 'Re-activated');
			$query = $this->db->or_where('ec_status', 'Newly-Opened');
			$query = $this->db->update('tbl_evacuation_stats', $data_status);

			if ($this->db->trans_status() === FALSE)
			{
			    $this->db->trans_rollback();
			    return 0;
			}else{
			    $this->db->trans_commit();
			    return 1;
			}

		}


}