<?php

$file_message = 'message.txt';
$file_name = 'name.txt';

$last = isset($_GET['timestamp']) ? $_GET['timestamp'] : 0;
$current = filemtime($file_name);

while( $current <= $last) {
	usleep(100000);
	clearstatcache();
	$current = filemtime($file_name);
}

$response = array();
$response['name'] = file_get_contents($file_name);
$response['msg'] = file_get_contents($file_message);
$response['timestamp'] = $current;

echo json_encode($response);