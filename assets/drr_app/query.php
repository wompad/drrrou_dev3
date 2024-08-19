<?php
	
	header("Access-Control-Allow-Origin: *");

	include_once 'connection.php';

	$data = array();

	if(isset($_GET['ecids'])){

		$a = 0;

		$province_name 		= $_GET['province_name'];
		$municipality_name 	= $_GET['municipality_name'];
		$evacuation_name 	= $_GET['evacuation_name'];
		$ecstatus 			= $_GET['ecstatus'];
		$fam_no 			= $_GET['fam_no'];
		$person_no 			= $_GET['person_no'];
		$place_of_origin 	= $_GET['place_of_origin'];
		$disaster_name 		= $_GET['disaster_name'];
		$ddate 				= $_GET['ddate'];
		$dtime 				= $_GET['dtime'];
		$brgy_located 		= $_GET['brgy_located'];
		$username 			= $_GET['username'];
		$ref_code 			= $_GET['ref_code'];

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
				echo $_GET['callback'] . '(' . json_encode(1) . ')';
			}
		}

	}

	if(isset($_GET['costasstid'])){

		$b = 0;

		$disaster_name 		= $_GET['disaster_name']; 
		$province_name 		= $_GET['province_name']; 
		$municipality_name 	= $_GET['municipality_name']; 
		$tot_damaged 		= $_GET['tot_damaged']; 
		$part_damaged 		= $_GET['part_damaged']; 
		$dead 				= $_GET['dead']; 
		$missing 			= $_GET['missing']; 
		$injured 			= $_GET['injured']; 
		$dswd_asst 			= $_GET['dswd_asst']; 
		$lgu_asst 			= $_GET['lgu_asst']; 
		$ngo_asst 			= $_GET['ngo_asst']; 
		$ddate 				= $_GET['ddate']; 
		$dtime 				= $_GET['dtime'];
		$username 			= $_GET['username'];
		$ref_code 			= $_GET['ref_code'];

		$q = pg_query($con,"SELECT
								*
							FROM
								tbl_casualty_asstm
							WHERE
								disaster_name = '$disaster_name'
							AND province_name = '$province_name'
							AND municipality_name = '$municipality_name'
							AND tot_damaged = '$tot_damaged'
							AND part_damaged = '$part_damaged'
							AND dead = '$dead'
							AND missing = '$missing'
							AND injured = '$injured'
							AND dswd_asst = '$dswd_asst'
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
										'$tot_damaged',
										'$part_damaged',
										'$dead',
										'$missing',
										'$injured',
										'$dswd_asst',
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
				echo $_GET['callback'] . '(' . json_encode(1) . ')';
			}
		}

	}

	if(isset($_GET['outecid'])){

		$c = 0;

		$province_name       = $_GET['province_name'];
        $municipality_name   = $_GET['municipality_name'];
        $brgy_no             = $_GET['brgy_no'];
        $fam_no              = $_GET['fam_no'];
        $person_no           = $_GET['person_no'];
        $disaster_name       = $_GET['disaster_name'];
        $ddate               = $_GET['ddate'];
        $dtime               = $_GET['dtime'];
        $username            = $_GET['username'];
        $ref_code            = $_GET['ref_code'];

        $q = pg_query($con,"SELECT
								*
							FROM
								tbl_outecm
							WHERE
								province_name = '$province_name'
							AND municipality_name = '$municipality_name'
							AND brgy_no = '$brgy_no'
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
	        $query = pg_query($con,"INSERT INTO tbl_outecm (
										province_name,
										municipality_name,
										brgy_no,
										fam_no,
										person_no,
										disaster_name,
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
											'$brgy_no',
											'$fam_no',
											'$person_no',
											'$disaster_name',
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

	if(isset($_GET['casualtyid'])){

		$d = 0;

		$disaster_name       = $_GET['disaster_name'];
        $province_name       = $_GET['province_name'];
        $municipality_name   = $_GET['municipality_name'];
        $lname               = $_GET['lname'];
        $fname               = $_GET['fname'];
        $mi                  = $_GET['mi'];
        $age                 = $_GET['age'];
        $gender              = $_GET['gender'];
        $brgyname            = $_GET['brgyname'];
        $isdead              = $_GET['isdead'];
        $ismissing           = $_GET['ismissing'];
        $isinjured           = $_GET['isinjured'];
        $remarks             = $_GET['remarks'];
        $ddate               = $_GET['ddate'];
        $dtime               = $_GET['dtime'];
        $username            = $_GET['username'];
        $ref_code            = $_GET['ref_code'];

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

	if(isset($_POST['picid'])){

		$e = 0;

        $description 		= $_POST['photodesc'];
        $randompic 			= "upload_".$_FILES["file"]["name"];
        $ddate 				= $_POST['ddate'];
        $dtime 				= $_POST['dtime'];
        $province_name 		= $_POST['province_name'];
        $municipality_name 	= $_POST['municipality_name'];
        $brgy_located 		= $_POST['brgy_located'];
        $spec_location 		= $_POST['spec_location'];
        $username 			= $_POST['username'];
        $xcoordinate 		= $_POST['xcoordinate'];
        $ycoordinate 		= $_POST['ycoordinate'];



        $q = pg_query("SELECT
						*
					FROM
						tbl_pics t1
					WHERE
						t1.pics = '$randompic'
					AND t1.description = '$description'
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
	        $query = pg_query($con,"INSERT INTO tbl_pics (
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
										'$randompic',
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
				print_r($_FILES);
				$new_image_name = $randompic;
				move_uploaded_file($_FILES["file"]["tmp_name"], "upload/".$new_image_name);
			}
		}

	}

	if(isset($_GET['ddamageid'])){

		$c = 0;

		$province_name       = $_GET['province_name'];
        $municipality_name   = $_GET['municipality_name'];
        $disaster_name       = $_GET['disaster_name'];
        $brgy_name           = $_GET['brgy_name'];
        $part_damage         = $_GET['part_damage'];
        $tot_damage          = $_GET['tot_damage'];
        $dead          		 = $_GET['dead'];
        $missing             = $_GET['missing'];
        $injured             = $_GET['injured'];
        $ddate               = $_GET['ddate'];
        $dtime               = $_GET['dtime'];
        $username            = $_GET['username'];
        $ref_code            = $_GET['ref_code'];

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
				echo $_GET['callback'] . '(' . json_encode(1) . ')';
			}
		}

	}

	if(isset($_GET['logid'])){

		$username = $_GET['username'];
		$cpassword = $_GET['password'];

		$password = $cpassword;
		$salt = sha1(md5($password)).'k32duem01vZsQ2lB8g0s'; 
		$password = md5($password.$salt);	

		$data = Array();

		$a = 0;

		$query = pg_query($con,"SELECT * FROM tbl_mobile_user WHERE username = '$username' AND password_hash = '$password' AND isactivated = 't'");

		if($query){

			while($row = pg_fetch_array($query)){
				$data['rs'] = $row;
				$a = $a + 1;
			}

			if($a >= 1){
				echo $_GET['callback'] . '(' . json_encode($data) . ')';
			}else{
				echo $_GET['callback'] . '(' . json_encode(0) . ')';
			}

		}

	}

	if(isset($_GET['muserid'])){

		$lastname 			= $_GET['lastname']; 			
		$firstname 			= $_GET['firstname']; 			
		$middlename 		= $_GET['middlename']; 		
		$email_or_phone 	= $_GET['email_or_phone']; 	
		$cusername 			= $_GET['cusername']; 			
		$cpassword 			= $_GET['cpassword']; 	

		$password = $cpassword;
		$salt = sha1(md5($password)).'k32duem01vZsQ2lB8g0s'; 
		$password = md5($password.$salt);	

		$data = Array();

		$i = 0;

		$query = pg_query($con,"SELECT * FROM tbl_mobile_user WHERE username = '$cusername'");

		if($query){

			while($row = pg_fetch_array($query)){
				$i = $i + 1;
			}

			if($i >= 1){
				echo $_GET['callback'] . '(' . json_encode(0) . ')';
			}else{
				$query = pg_query($con,"INSERT INTO tbl_mobile_user (
										lname,
										fname,
										mi,
										email_phone,
										username,
										password_hash,
										isactivated
									)
									VALUES
										(
											'$lastname',
											'$firstname',
											'$middlename',
											'$email_or_phone',
											'$cusername',
											'$password',
											'f'
										)
	        	");

		        	$query1 = pg_query($con,"SELECT * FROM tbl_mobile_user WHERE username = '$cusername'");
		        	while($row = pg_fetch_array($query1)){
						$data['rs'] = $row;
					}

		        	echo $_GET['callback'] . '(' . json_encode($data) . ')';
			}
		} 

	}

?>