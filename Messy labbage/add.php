<?php

require_once('Connection.php');

Connection::openDb();

function addToDB($name, $message, $pid) {

	$q = "INSERT INTO messages (message, name, pid) VALUES(?, ?, ?)";

	try {
		$stmt = Connection::$db->prepare($q);

		$stmt->bindParam(1, $message);
		$stmt->bindParam(2, $name);
		$stmt->bindParam(3, $pid);

		$stmt->execute();

		if(!$stmt) {
			die("Fel vid insert");
		}
	}
	catch(PDOException $e) {
		die("Something went wrong -> " .$e->getMessage());
	}

	$msg = 'skriv';
	$file = 'data.txt';
	$handle = fopen($file, 'a');
	fwrite($handle, $msg);
	fclose($handle);

	Connection::$db = null;
}
