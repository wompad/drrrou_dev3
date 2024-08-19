<?php

print_r($_FILES);
$new_image_name = "namethisimage.jpg";
move_uploaded_file($_FILES["file"]["tmp_name"], "upload/".$new_image_name);

echo json_encode($_POST["value1"]);

?>