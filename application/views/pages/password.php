<?php

$passwords = 'swad_pdi';
$passwords = "\=45f=".md5($passwords)."==//87*1)";
$passwords = sha1(md5($passwords));

echo $passwords;

?>