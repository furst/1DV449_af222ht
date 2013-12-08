<?php

class Csrf {

	public function __construct() {
		//session_start();
	}

	public function get_token() {
		$token = hash('sha512', mt_rand(0, mt_getrandmax(). microtime(TRUE)));
		$_SESSION['token'] = $token;

		return $token;
	}

	public function check_token($token) {
		$sessiontoken = $this->get_token_from_session();
		if (strlen($sessiontoken) == 128 && strlen($token) == 128 && $sessiontoken == $token) {
			return TRUE;
		}
		return FALSE;
	}

	public function get_token_from_url() {
		return isset($_GET['token']) ? $_GET['token'] : '';
	}

	public function get_token_from_session() {
		if (isset($_SESSION['token'])) {
			return $_SESSION['token'];
		}
		return '';
	}

	public function get_token_from_post() {
		if (isset($_POST['token'])) {
			return $_POST['token'];
		}
		return '';
	}
}