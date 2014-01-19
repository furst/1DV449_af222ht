<?php

class NoteWebservice {

	private $email;
	private $password;
	private $authToken;

	public function __construct() {
		$this->email = Config::get('simplenote.email', 'test');
		$this->password = Config::get('simplenote.password', 'test');
	}

	public function getNotes() {

		// Authentication
		$url = 'https://simple-note.appspot.com/api/login';
		$data = base64_encode(http_build_query(array(
		    "email" => $this->email,
		    "password" => $this->password
		)));

		$options = array(
		    'http' => array(
		        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
		        'method'  => 'POST',
		        'content' => $data
		    ),
		);
		$context  = stream_context_create($options);
		$this->authToken = file_get_contents($url, false, $context);

		$url = 'https://simple-note.appspot.com/api2/index?length=100&auth=' . $this->authToken .'&email=' . $this->email;

		$options = array(
		    'http' => array(
		        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
		        'method'  => 'GET',
		    ),
		);

		$context  = stream_context_create($options);
		$result = file_get_contents($url, false, $context);

		$allNotesIndex = json_decode($result);

		$this->deleteCheck($allNotesIndex);

		$posts = $this->getNotesByIndex($allNotesIndex);

		return $posts;
	}

	private function getNotesByIndex($index) {

		$posts = array();

		if (Post::all()->isEmpty()) {
			
			foreach ($index->data as $item) {

				if ($item->deleted == 0 && in_array('published', $item->tags)) {

					$url = 'https://simple-note.appspot.com/api2/data/' . $item->key .'?auth=' . $this->authToken . '&email=' . $this->email;

					$options = array(
					    'http' => array(
					        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
					        'method'  => 'GET',
					    ),
					);

					$context  = stream_context_create($options);
					$result = file_get_contents($url, false, $context);

					$posts[] = json_decode($result);
				}
				
			}

		} else {
			$latestChange = Post::orderBy('updated_at', 'desc')->first()->updated_at;

			foreach ($index->data as $item) {

				if ($item->deleted == 0 && in_array('published', $item->tags)) {

					if (Post::where('key', '=', $item->key)->first()) {

						if (in_array('page', $item->tags)) {
							$post = Post::where('key', '=', $item->key)->first();
							$post->is_page = 1;
							$post->save();
						} else {
							$post = Post::where('key', '=', $item->key)->first();
							$post->is_page = 0;
							$post->save();
						}

						if (date('Y-m-d H:i:s', $item->modifydate) > $latestChange) {

							$url = 'https://simple-note.appspot.com/api2/data/' . $item->key .'?auth=' . $this->authToken . '&email=' . $this->email;

							$options = array(
							    'http' => array(
							        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
							        'method'  => 'GET',
							    ),
							);

							$context  = stream_context_create($options);
							$result = file_get_contents($url, false, $context);

							$posts[] = json_decode($result);
						}
						
					} else {
						$url = 'https://simple-note.appspot.com/api2/data/' . $item->key .'?auth=' . $this->authToken . '&email=' . $this->email;

						$options = array(
						    'http' => array(
						        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
						        'method'  => 'GET',
						    ),
						);

						$context  = stream_context_create($options);
						$result = file_get_contents($url, false, $context);

						$posts[] = json_decode($result);
					}
				} elseif($item->deleted == 0) {

					if (Post::where('key', '=', $item->key)->first()) {
						$post = Post::where('key', '=', $item->key)->first();
						$post->delete();
					}
				}
				
			}

		}

		return $posts;
	}

	public function deleteCheck($index) {

		foreach ($index->data as $item) {

			if (Post::where('key', '=', $item->key)->first() && $item->deleted == 1) {
				$post = Post::where('key', '=', $item->key)->first();

				$post->delete();
			}
		}
	}
}





