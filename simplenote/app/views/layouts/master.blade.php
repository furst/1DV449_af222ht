<html>
    <body>
        <h1>Simplenote cms</h1>
		
		<!-- <ul>
			<li>{{ link_to( '/', 'Hem') }}</li>
        @foreach ($nav as $link)
			<li>{{ link_to( $link->url, $link->title) }}</li>
		@endforeach
		</ul> -->

        @yield('content')
    </body>
</html>