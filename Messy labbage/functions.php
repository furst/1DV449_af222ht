<?php
require_once("get.php");
require_once("add.php");
require_once("sec.php");
sec_session_start();

/*
* It's here all the ajax calls goes
*/
if(isset($_GET['function'])) {

	if($_GET['function'] == 'logout') {
		logout();
    } elseif($_GET['function'] == 'add') {

        $name = filter_input(INPUT_POST | INPUT_GET, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
        $message = filter_input(INPUT_POST | INPUT_GET, 'message', FILTER_SANITIZE_SPECIAL_CHARS);
        $mid = filter_input(INPUT_POST | INPUT_GET, 'mid', FILTER_SANITIZE_SPECIAL_CHARS);

        $csrf = new Csrf();

        if (!$csrf->check_token($csrf->get_token_from_url())) {
          die('Det går inte att spara meddelande, felaktig token');
        }

        if (strlen($name) > 30 || strlen($name) <= 0 || empty($name)) {
          echo "Namn är i ogiltigt format";
        }
        else if(strlen($message) > 30 || strlen($message) <= 0 || empty($message)) {
          echo "Meddelande är i ogiltigt format";
        }
        else {
          addToDB($name, $message, $mid);
          echo "Meddelande publicerat";
        }
    }
    elseif($_GET['function'] == 'producers') {
   		echo(json_encode(getProducer($_GET["pid"])));
    }
    elseif($_GET['function'] == 'getIdsOfMessages') {
   	   	echo(json_encode(getMessageIdForProducer($_GET["pid"])));
    }
    elseif($_GET['function'] == 'getMessage') {
   	   	echo(json_encode(getMessage($_GET["pid"])));
    }
}