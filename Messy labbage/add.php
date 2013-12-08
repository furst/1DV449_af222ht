<?php

function addToDB($name, $message, $id) {

	$mysqli = new \mysqli('localhost', 'root', 'root', 'labb2');

	$stmt = $mysqli->prepare("INSERT INTO message (name, content, pid) VALUES (?, ?, ?);");

	$stmt->bind_param('sss', $name, $message, $id);

	$stmt->execute();

	$stmt->close();

	$mysqli->close();

	$file = 'name.txt';
	$handle = fopen($file, 'w');
	fwrite($handle, $name);
	fclose($handle);

	$file = 'message.txt';
	$handle = fopen($file, 'w');
	fwrite($handle, $message);
	fclose($handle);
}
