<?php

class Connection {

	public static $db;
	public static $dbProducer;

	public static function openDb() {
		try {
			self::$db = new PDO("sqlite:db.db");
			self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		catch(PDOEception $e) {
			die("Del -> " .$e->getMessage());
		}
	}

	public static function openProducer() {
		try {
			self::$dbProducer = new PDO("sqlite:producerDB.sqlite");
			self::$dbProducer->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		catch(PDOEception $e) {
			die("Del -> " .$e->getMessage());
		}
	}
}