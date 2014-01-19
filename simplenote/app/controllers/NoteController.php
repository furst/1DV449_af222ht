<?php

class NoteController extends BaseController {

	protected $layout = 'layouts.master';

	public $restful = true;

	public function getNotes() {

		$posts = Post::all();

		return $posts;
	}

	public function checkService() {
		$noteService = new NoteService();
		$notes = $noteService->getNotes();

		return $notes;
	}

	public function getPages() {
		$pages = Post::where('is_page', '=', '1')->get();

	    return $pages;
	}
}