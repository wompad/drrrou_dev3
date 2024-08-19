<?php

	include_once 'connection.php';


	if(isset($_POST['ecids'])){

		$a = 0;

		$province_name 		= $_POST['province_name'];
		$municipality_name 	= $_POST['municipality_name'];
		$evacuation_name 	= $_POST['evacuation_name'];
		$ecstatus 			= $_POST['ecstatus'];
		$fam_no 			= $_POST['fam_no'];
		$person_no 			= $_POST['person_no'];
		$place_of_origin 	= $_POST['place_of_origin'];
		$disaster_name 		= $_POST['disaster_name'];
		$ddate 				= $_POST['ddate'];
		$dtime 				= $_POST['dtime'];
		$brgy_located 		= $_POST['brgy_located'];
		$username 			= $_POST['username'];
		$ref_code 			= $_POST['ref_code'];

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

			if($query){
				echo "1";
			}else{
				echo "0";
			}

		}

	}

	if(isset($_POST['outecid'])){

		$c = 0;

		$province_name       	= $_POST['province_name'];
        $municipality_name   	= $_POST['municipality_name'];
        $brgy             		= $_POST['brgy'];
        $fam_no              	= $_POST['fam_no'];
        $person_no           	= $_POST['person_no'];
        $disaster_name       	= $_POST['disaster_name'];
        $province_origin       	= $_POST['province_origin'];
        $municipality_origin    = $_POST['municipality_origin'];
        $brgy_origin       		= $_POST['brgy_origin'];
        $ddate               	= $_POST['ddate'];
        $dtime               	= $_POST['dtime'];
        $username            	= $_POST['username'];
        $ref_code            	= $_POST['ref_code'];

        $q = pg_query($con,"SELECT
								*
							FROM
								tbl_outecm_a
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

	     	if($query){
				echo "1";
			}else{
				echo "0";
			}
		}

	}

	if(isset($_POST['costasstid'])){

		$b = 0;

		$disaster_name 		= $_POST['disaster_name']; 
		$province_name 		= $_POST['province_name']; 
		$municipality_name 	= $_POST['municipality_name'];  
		$lgu_asst 			= $_POST['lgu_asst']; 
		$ngo_asst 			= $_POST['ngo_asst']; 
		$ddate 				= $_POST['ddate']; 
		$dtime 				= $_POST['dtime'];
		$username 			= $_POST['username'];
		$ref_code 			= $_POST['ref_code'];

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
							AND username = '$username'
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

			if($query){
				echo "1";
			}else{
				echo "0";
			}
		}

	}

	if(isset($_POST['ddamageid'])){

		$c = 0;

		$province_name       = $_POST['province_name'];
        $municipality_name   = $_POST['municipality_name'];
        $disaster_name       = $_POST['disaster_name'];
        $brgy_name           = $_POST['brgy_name'];
        $part_damage         = $_POST['part_damage'];
        $tot_damage          = $_POST['tot_damage'];
        $dead          		 = $_POST['dead'];
        $missing             = $_POST['missing'];
        $injured             = $_POST['injured'];
        $ddate               = $_POST['ddate'];
        $dtime               = $_POST['dtime'];
        $username            = $_POST['username'];
        $ref_code            = $_POST['ref_code'];

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

	        if($query){
				echo "1";
			}else{
				echo "0";
			}

		}

	}

	if(isset($_POST['casualtyid'])){

		$d = 0;

		$disaster_name       = $_POST['disaster_name'];
        $province_name       = $_POST['province_name'];
        $municipality_name   = $_POST['municipality_name'];
        $lname               = $_POST['lname'];
        $fname               = $_POST['fname'];
        $mi                  = $_POST['mi'];
        $age                 = $_POST['age'];
        $gender              = $_POST['gender'];
        $brgyname            = $_POST['brgyname'];
        $isdead              = $_POST['isdead'];
        $ismissing           = $_POST['ismissing'];
        $isinjured           = $_POST['isinjured'];
        $remarks             = $_POST['remarks'];
        $ddate               = $_POST['ddate'];
        $dtime               = $_POST['dtime'];
        $username            = $_POST['username'];
        $ref_code            = $_POST['ref_code'];

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
				echo "1";
			}else{
				echo "0";
			}
		}

	}

	if(isset($_POST['picid'])){

		$e = 0;

        $description 		= $_POST['description'];
        $randompic 			= $_POST['pics'];
        $ddate 				= $_POST['ddate'];
        $dtime 				= $_POST['dtime'];
        $province_name 		= $_POST['province_name'];
        $municipality_name 	= $_POST['municipality_name'];
        $brgy_located 		= $_POST['brgy_name'];
        $spec_location 		= $_POST['spec_location'];
        $username 			= $_POST['username'];
        $xcoordinate 		= $_POST['xcoordinate'];
        $ycoordinate 		= $_POST['ycoordinate'];



        $rand 	= rand(100000,99999999);
		$data 	= base64_decode($randompic);
		$file 	= 'upload/'. 'upload_'. $rand . '.png';
		$file2 	= 'upload_'. $rand . '.png';



        $q = pg_query("SELECT
						*
					FROM
						tbl_images t1
					WHERE
					t1.description = '$description'
					AND t1.province_name = '$province_name'
					AND t1.municipality_name = '$municipality_name'
					AND t1.brgy_located = '$brgy_located'
					AND t1.spec_location = '$spec_location'
					AND t1.ddate = '$ddate'
					AND t1.dtime = '$dtime'
					AND t1.username = '$username'
        ");

        while($row = pg_fetch_array($q)){
        	$e = $e + 1;
        }

        if($e <= 1){
	        $query = pg_query($con,"INSERT INTO tbl_images (
	        						pics,
									description,
									province_name,
									municipality_name,
									brgy_located,
									spec_location,
									rstatus,
									ddate,
									dtime,
									username,
									xcoordinate,
									ycoordinate
								)
								VALUES
									(
										'$file2',
										'$description',
										'$province_name',
										'$municipality_name',
										'$brgy_located',
										'$spec_location',
										'NOT READ',
										'$ddate',
										'$dtime',
										'$username',
										'$xcoordinate',
										'$ycoordinate'
									)
			");

	        if($query){

				echo "1";

				$success = file_put_contents($file, $data);

			}else{
				echo $query;
			}
		}

	}

	if(isset($_POST['userregid'])){

		$firstname 			= $_POST['firstname'];
		$middlename 		= $_POST['middlename'];
		$lastname 			= $_POST['lastname'];
		$province 			= $_POST['province'];
		$municipality 		= $_POST['municipality'];
		$address 			= $_POST['address'];
		$agency 			= $_POST['agency'];
		$designation 		= $_POST['designation'];
		$emailaddress 		= $_POST['emailaddress'];
		$mobile 			= $_POST['mobile'];
		$username 			= $_POST['username'];
		$password_hash 		= md5($_POST['password_hash']);

		$q = pg_query("SELECT * FROM tbl_mobile_user_a WHERE username = '$username'");

		if(pg_num_rows($q) > 0){

			echo "2";

		}else{

			$query = pg_query($con,"INSERT INTO tbl_mobile_user_a (
										firstname,
										middlename,
										lastname,
										province,
										municipality,
										address,
										agency,
										designation,
										emailaddress,
										mobile,
										username,
										password_hash,
										isactivated
									)
									VALUES
										(
											'$firstname',
											'$middlename',
											'$lastname',
											'$province',
											'$municipality',
											'$address',
											'$agency',
											'$designation',
											'$emailaddress',
											'$mobile',
											'$username',
											'$password_hash',
											'f'

										)
	        ");

	        if($query){
				echo "1";
			}else{
				echo "0";
			}


		}


	}

	if(isset($_POST['loginid'])){

		$username 			= $_POST['username'];
		$password_hash 		= md5($_POST['password_hash']);

		$q = pg_query("SELECT * FROM tbl_mobile_user_a WHERE username = '$username' AND password_hash = '$password_hash' AND isactivated = 't'");

		if(pg_num_rows($q) > 0){

			echo "1";

		}else{

			echo "0";

		}

	}



?>