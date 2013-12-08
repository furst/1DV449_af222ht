<?php

require_once('Connection.php');

Connection::openProducer();
Connection::openDb();

// get the specific message
function getMessage($id) {

	$mysqli = new \mysqli('localhost', 'root', 'root', 'labb2');

	$stmt = $mysqli->prepare("SELECT id, name, content FROM message WHERE pid = ? ORDER BY created DESC;");

	$stmt->bind_param('s', $id);

	$stmt->execute();

	$stmt->bind_result($id, $name, $message);

	$result = array();
	while ($stmt->fetch()) {
		$result[] = array("id" => $id, "name" => $name, "message" => $message);
	}

	$stmt->close();

	$mysqli->close();

	return $result;
}


function getMessageIdForProducer($pid) {

	$q = "SELECT serial FROM messages WHERE pid = $pid";

	$result;
	$stm;
	try {
		$stm = Connection::$db->prepare($q);
		$stm->execute();
		$result = $stm->fetchAll();
	}
	catch(PDOException $e) {
		echo("Error creating query: " .$e->getMessage());
		return false;
	}

	Connection::$db = null;

	if($result)
		return $result;
	else
	 	return false;
}

function getProducer($id) {

	$q = "SELECT * FROM Producers WHERE producerID = '$id'";

	$result;
	$stm;
	try {
		$stm = Connection::$dbProducer->prepare($q);
		$stm->execute();
		$result = $stm->fetchAll();
	}
	catch(PDOException $e) {
		echo("Error creating query: " .$e->getMessage());
		return false;
	}

	Connection::$db = null;

	if($result)
		return $result[0];
	else
	 	return false;
}

function getProducers() {

	$q = "SELECT * FROM Producers";

	$result;
	$stm;
	try {
		$stm = Connection::$dbProducer->prepare($q);
		$stm->execute();
		$result = $stm->fetchAll();
	}
	catch(PDOException $e) {
		echo("Error creating query: " .$e->getMessage());
		return false;
	}

	Connection::$db = null;

	if($result)
		return $result;
	else
	 	return false;
}