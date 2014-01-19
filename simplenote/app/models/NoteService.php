<?php

class NoteService extends NoteServiceBase {

	public function getNotes() {

		$posts = Post::all();

		// try-catch på denna
		$latestPost = Post::orderBy('updated_at', 'desc')->first();

		try {
			$latestUpdate = Update::orderBy('next_update', 'desc')->firstOrFail();
			$nextUpdate = $latestUpdate->next_update;
		} catch (Exception $e) {
			$nextUpdate = date("Y-m-d H:i:s", strtotime('+5 minutes'));
		}

		$now = date("Y-m-d H:i:s");	

		if ($posts->isEmpty() || $nextUpdate < $now) {

			$noteWebservice = new NoteWebservice();
			$posts = $noteWebservice->getNotes();

			foreach ($posts as $item) {

				$newContent = $this->parseContent($item->content);
				$title = $this->createTitle($item->content);
				$link = $this->createLink($title);

				if (Post::where('key', '=', $item->key)->first()) {
					$post = Post::where('key', '=', $item->key)->first();

					$post->title = $title;
					$post->url = $link;
					$post->content = $newContent;
					$post->created_at = $item->createdate;
					$post->updated_at = $item->modifydate;
					$post->key = $item->key;
					$post->is_page = in_array('page', $item->tags);

					$post->save();
				} else {
					$post = new Post;
					$post->title = $title;
					$post->url = $link;
					$post->content = $newContent;
					$post->created_at = $item->createdate;
					$post->updated_at = $item->modifydate;
					$post->key = $item->key;
					$post->is_page = in_array('page', $item->tags);
					$post->save();
				}

				
			}

			$update = Update::find(1);

			$update->next_update = date("Y-m-d H:i:s", strtotime('+5 minutes'));

			$update->save();
			
		}

		$posts = Post::where('is_page', '=', '0')->get();

		return $posts;
	}
}