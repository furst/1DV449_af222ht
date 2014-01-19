<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
    return View::make('home');
});

Route::get('posts', 'NoteController@getNotes');
Route::get('service', 'NoteController@checkService');
Route::get('pages', 'Notecontroller@getPages');

Route::get('page/{slug}', function()
{
    return View::make('home');
});

App::error(function($exception, $code)
{
    switch ($code)
    {
        case 403:
            return Response::view('errors.403', array(), 403);

        case 404:
            return Response::view('errors.404', array(), 404);

        case 500:
            return Response::view('errors.500', array(), 500);

        default:
            return Response::view('errors.default', array(), $code);
    }
});