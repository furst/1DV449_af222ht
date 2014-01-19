<?php

class NoteServiceBase {

	public function parseContent($content) {

		$newContent = Parsedown::instance()->parse($content);

		preg_match('#<h1>(.*?)</h1>#', $newContent, $title);

		if (!empty($title)) {
			$newContent = str_replace($title[0] . "\n", '', $newContent);
		}

		return $newContent;
	}

	public function createTitle($content) {

		$newContent = Parsedown::instance()->parse($content);

		preg_match('#<h1>(.*?)</h1>#', $newContent, $title);

		if (empty($title)) {
			$str = wordwrap($content, 40);
			$str = explode("\n", $str);
			$title = $str[0] . '...';
		} else {
			$title = str_replace('<h1>', '', $title[0]);
			$title = str_replace('</h1>', '', $title);
		}

		return $title;
	}

	public function createLink($title) {

		$newTitle = str_replace(' ', '-', $title);

		return $newTitle;

	}
}