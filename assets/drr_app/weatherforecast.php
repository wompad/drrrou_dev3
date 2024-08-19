<?php

	$a = file_get_contents("http://m.weather.gov.ph/agaptest/main_local.php");

	$a = json_decode($a);

	echo $_GET['callback'] . '(' . json_encode($a) . ')';

?>