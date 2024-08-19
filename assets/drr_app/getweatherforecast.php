<?php

		$a = file_get_contents("http://m.weather.gov.ph/agaptest/main_local.php");

		$a = strip_tags($a);

		$a = json_decode($a);

		$str = json_encode($a);


		echo $str;

?>