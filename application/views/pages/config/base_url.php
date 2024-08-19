<?php
  $protocol = is_https() ? "https://" : "http://";
  $base_url = $protocol."".$_SERVER['SERVER_NAME']."/drrrou_dev/";
?>