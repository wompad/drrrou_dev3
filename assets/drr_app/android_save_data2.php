<?php

	include_once 'connection.php';


	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	if(isset($obj->ecids)){

		$a = 0;

		$province_name 		= $obj->province_name;
		$municipality_name 	= $obj->municipality_name;
		$evacuation_name 	= $obj->evacuation_name;
		$ecstatus 			= $obj->ecstatus;
		$fam_no 			= $obj->fam_no;
		$person_no 			= $obj->person_no;
		$place_of_origin 	= $obj->place_of_origin;
		$disaster_name 		= $obj->disaster_name;
		$ddate 				= $obj->ddate;
		$dtime 				= $obj->dtime;
		$brgy_located 		= $obj->brgy_located;
		$username 			= $obj->username;
		$ref_code 			= $obj->ref_code;

		$q = pg_query($con,"SELECT
								*
							FROM
								tbl_eopcen
							WHERE
								province_name = '$province_name'
							AND municipality_name = '$municipality_name'
							AND evacuation_name = '$evacuation_name'
							AND ecstatus = '$ecstatus'
							AND fam_no = '$fam_no'
							AND person_no = '$person_no'
							AND place_of_origin = '$place_of_origin'
							AND disaster_name = '$disaster_name'
							AND ddate = '$ddate'
							AND dtime = '$dtime'
							AND brgy_located = '$brgy_located'
							AND username = '$username'
							AND ref_code = '$ref_code'
		");

		while($row = pg_fetch_array($q)){
			$a = $a + 1;
		}

		if($a < 1){
			$query = pg_query($con,"INSERT INTO tbl_eopcen (province_name, 
									municipality_name, 
									evacuation_name, 
									ecstatus, 
									fam_no, 
									person_no, 
									place_of_origin, 
									disaster_name,
									rstatus,
									ddate,
									dtime,
									brgy_located,
									username,
									ref_code
								)
								VALUES 
									(
										'$province_name', 
										'$municipality_name',
										'$evacuation_name',
										'$ecstatus',
										'$fam_no',
										'$person_no',
										'$place_of_origin',
										'$disaster_name',
										'NOT READ',
										'$ddate',
										'$dtime',
										'$brgy_located',
										'$username',
										'$ref_code'
									)
			");

			// if($query){
			// 	echo "Data saved";
			// }else{
			// 	echo "Not saved";
			// }

		}

	}

	if(isset($obj->outecid)){

		$c = 0;

		$province_name       	= $obj->province_name;
        $municipality_name   	= $obj->municipality_name;
        $brgy             		= $obj->brgy;
        $fam_no              	= $obj->fam_no;
        $person_no           	= $obj->person_no;
        $disaster_name       	= $obj->disaster_name;
        $province_origin       	= $obj->province_origin;
        $municipality_origin    = $obj->municipality_origin;
        $brgy_origin       		= $obj->brgy_origin;
        $ddate               	= $obj->ddate;
        $dtime               	= $obj->dtime;
        $username            	= $obj->username;
        $ref_code            	= $obj->ref_code;

        $q = pg_query($con,"SELECT
								*
							FROM
								tbl_outecm
							WHERE
								province_name = '$province_name'
							AND municipality_name = '$municipality_name'
							AND brgy = '$brgy'
							AND fam_no = '$fam_no'
							AND person_no = '$person_no'
							AND disaster_name = '$disaster_name'
							AND ddate = '$ddate'
							AND dtime = '$dtime'
							AND username = '$username'
							AND ref_code = '$ref_code'
		");

		while($row = pg_fetch_array($q)){
			$c = $c + 1;
		}
		if($c < 1){
	        $query = pg_query($con,"INSERT INTO tbl_outecm_a (
										province_name,
										municipality_name,
										brgy,
										fam_no,
										person_no,
										disaster_name,
										rstatus,
										ddate,
										dtime,
										username,
										ref_code,
										province_origin,
										municipality_origin,
										brgy_origin
									)
									VALUES
										(
											'$province_name',
											'$municipality_name',
											'$brgy',
											'$fam_no',
											'$person_no',
											'$disaster_name',
											'NOT READ',
											'$ddate',
											'$dtime',
											'$username',
											'$ref_code',
											'$province_origin',
											'$municipality_origin',
											'$brgy_origin'
										)
	        ");

	  //       if($query){
			// 	echo $_GET['callback'] . '(' . json_encode(1) . ')';
			// }
		}

	}

	if(isset($obj->costasstid)){

		$b = 0;

		$disaster_name 		= $obj->disaster_name; 
		$province_name 		= $obj->province_name; 
		$municipality_name 	= $obj->municipality_name;  
		$lgu_asst 			= $obj->lgu_asst; 
		$ngo_asst 			= $obj->ngo_asst; 
		$ddate 				= $obj->ddate; 
		$dtime 				= $obj->dtime;
		$username 			= $obj->username;
		$ref_code 			= $obj->ref_code;

		$q = pg_query($con,"SELECT
								*
							FROM
								tbl_casualty_asstm
							WHERE
								disaster_name = '$disaster_name'
							AND province_name = '$province_name'
							AND municipality_name = '$municipality_name'
							AND lgu_asst = '$lgu_asst'
							AND ngo_asst = '$ngo_asst'
							AND ddate = '$ddate'
							AND dtime = '$dtime'
							AND username = '$username',
							AND ref_code = '$ref_code'
		");

		while($row = pg_fetch_array($q)){
			$b = $b + 1;
		}
		if($b < 1){
			$query = pg_query($con,"INSERT INTO tbl_casualty_asstm (
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
									ddate,
									dtime,
									username,
									ref_code
								)
								VALUES
									(
										'$disaster_name',
										'$province_name',
										'$municipality_name',
										'0',
										'0',
										'0',
										'0',
										'0',
										'0',
										'$lgu_asst',
										'$ngo_asst',
										'NOT READ',
										'$ddate',
										'$dtime',
										'$username',
										'$ref_code'
									)
			");

			// if($query){
			// 	echo $_GET['callback'] . '(' . json_encode(1) . ')';
			// }
		}

	}

	if(isset($obj->ddamageid)){

		$c = 0;

		$province_name       = $obj->province_name;
        $municipality_name   = $obj->municipality_name;
        $disaster_name       = $obj->disaster_name;
        $brgy_name           = $obj->brgy_name;
        $part_damage         = $obj->part_damage;
        $tot_damage          = $obj->tot_damage;
        $dead          		 = $obj->dead;
        $missing             = $obj->missing;
        $injured             = $obj->injured;
        $ddate               = $obj->ddate;
        $dtime               = $obj->dtime;
        $username            = $obj->username;
        $ref_code            = $obj->ref_code;

        $q = pg_query($con,"SELECT
								*
							FROM
								tbl_damagesm
							WHERE
								province_name = '$province_name'
							AND municipality_name = '$municipality_name'
							AND disaster_name = '$disaster_name'
							AND brgy_name = '$brgy_name'
							AND part_damage = '$part_damage'
							AND tot_damage = '$tot_damage'
							AND dead = '$dead'
							AND missing = '$missing'
							AND injured = '$tot_damage'
							AND ddate = '$ddate'
							AND dtime = '$dtime'
							AND username = '$username'
							AND ref_code = '$ref_code'
		");

		while($row = pg_fetch_array($q)){
			$c = $c + 1;
		}

		if($c <= 1){
	        $query = pg_query($con,"INSERT INTO tbl_damagesm (
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
										ddate,
										dtime,
										username,
										ref_code
									)
									VALUES
										(
											'$province_name',
											'$municipality_name',
											'$disaster_name',
											'$brgy_name',
											'$part_damage',
											'$tot_damage',
											'$dead',
											'$missing',
											'$injured',
											'NOT READ',
											'$ddate',
											'$dtime',
											'$username',
											'$ref_code'
										)
	        ");

		}

	}

	if(isset($obj->casualtyid)){

		$d = 0;

		$disaster_name       = $obj->disaster_name;
        $province_name       = $obj->province_name;
        $municipality_name   = $obj->municipality_name;
        $lname               = $obj->lname;
        $fname               = $obj->fname;
        $mi                  = $obj->mi;
        $age                 = $obj->age;
        $gender              = $obj->gender;
        $brgyname            = $obj->brgyname;
        $isdead              = $obj->isdead;
        $ismissing           = $obj->ismissing;
        $isinjured           = $obj->isinjured;
        $remarks             = $obj->remarks;
        $ddate               = $obj->ddate;
        $dtime               = $obj->dtime;
        $username            = $obj->username;
        $ref_code            = $obj->ref_code;

        $q = pg_query($con,"SELECT
								*
							FROM
								tbl_casualtym
							WHERE
								disaster_name = '$disaster_name'
							AND province_name = '$province_name'
							AND municipality_name = '$municipality_name'
							AND lname = '$lname'
							AND fname = '$fname'
							AND mi = '$mi'
							AND age = '$age'
							AND gender = '$gender'
							AND brgyname = '$brgyname'
							AND isdead = '$isdead'
							AND ismissing = '$ismissing'
							AND isinjured = '$isinjured'
							AND remarks = '$remarks'
							AND ddate = '$ddate'
							AND dtime = '$dtime'
							AND username = '$username'
							AND ref_code = '$ref_code'
		");

		while($row = pg_fetch_array($q)){
			$d = $d + 1;
		}
		if($d < 1){

	        $query = pg_query($con,"INSERT INTO tbl_casualtym (
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
										ddate,
										dtime,
										username,
										ref_code
									)
									VALUES
										(
											'$disaster_name',
											'$province_name',
											'$municipality_name',
											'$lname',
											'$fname',
											'$mi',
											'$age',
											'$gender',
											'$brgyname',
											'$isdead',
											'$ismissing',
											'$isinjured',
											'$remarks',
											'NOT READ',
											'$ddate',
											'$dtime',
											'$username',
											'$ref_code'
										)
	        ");

	        if($query){
				echo $_GET['callback'] . '(' . json_encode(1) . ')';
			}
		}

	}



?>