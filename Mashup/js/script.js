(function() {

	var Traffic = {
		init: function(config) {
			this.url = 'http://api.sr.se/api/v2/traffic/messages?format=json&callback=?&size=100';

			this.map = config.map;

			this.template = config.template;
			this.container = config.container;
			this.category = config.category;
			this.fetch();
		},

		attachTemplate: function() {

			var self = this;

			var markers = new Array();
			var locations = new Array();

			$.each(this.messages, function(i, e) {
				locations.push(new Array(e.priority, e.description, e.category, e.latitude, e.longitude, 4));
			});

			var marker, i;

			var infowindow = new google.maps.InfoWindow();

			for (i = 0; i < locations.length; i++) {

				var priority;
				var markerIcon;

				switch(locations[i][0]) {
					case 1:
						priority = "Mycket allvarlig händelse";
						markerIcon = 'markers/marker1.png';
						break;
					case 2:
						priority = "Stor händelse";
						markerIcon = 'markers/marker2.png';
						break;
					case 3:
						priority = "Störning";
						markerIcon = 'markers/marker3.png';
						break;
					case 4:
						priority = "Information";
						markerIcon = 'markers/marker4.png';
						break;
					case 5:
						priority = "Mindre störning";
						markerIcon = 'markers/marker5.png';
						break;
				}

				marker = new google.maps.Marker({
					position: new google.maps.LatLng(locations[i][3], locations[i][4]),
					icon: markerIcon,
					map: self.map
				});

				markers.push(marker);

				google.maps.event.addListener(marker, 'click', (function(marker, i) {

					return function() {
						infowindow.setContent(locations[i][1]);
						infowindow.open(self.map, marker);
					};
				})(marker, i));
			}

			function show(category) {
				for (var i=0; i<locations.length; i++) {
					if (locations[i][2] == category) {
						markers[i].setVisible(true);
					}
				}
			}

			function hide(category) {
				for (var i=0; i<locations.length; i++) {
					if (locations[i][2] == category) {
						markers[i].setVisible(false);
					}
				}
			}

			$('.all').on('click', function() {
				show(0);
				show(1);
				show(2);
				show(3);
			});

			$('.road').on('click', function() {
				show(0);
				hide(1);
				hide(2);
				hide(3);
			});

			$('.kollektiv').on('click', function() {
				show(1);
				hide(0);
				hide(2);
				hide(3);
			});

			$('.planed').on('click', function() {
				show(2);
				hide(0);
				hide(1);
				hide(3);
			});

			$('.ovrigt').on('click', function() {
				show(3);
				hide(0);
				hide(1);
				hide(2);
			});
		},

		fetch: function() {
			var self = this;

			$.getJSON(this.url, function(data) {
				self.messages = $.map(data.messages, function(message) {
					return {
						description: message.description,
						priority: message.priority,
						longitude: message.longitude,
						latitude: message.latitude,
						category: message.category
					};
				});

				self.attachTemplate();
			});
		}
	};

	function initialize() {
		var myLatlng = new google.maps.LatLng(59.723177,17.662582);
		var mapOptions = {
			zoom: 3,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			minZoom: 6,
			maxZoom: 17,
			zoomControl:true,
			zoomControlOptions: {
				style:google.maps.ZoomControlStyle.DEFAULT // Change to SMALL to force just the + and - buttons.
			},
			panControl:false,
			mapTypeControl:false,
			scaleControl:false,
			streetViewControl:false,
			overviewMapControl:false,
			rotateControl:false
		};

		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		Traffic.init({
			template: $('#traffic-template').html(),
			container: $('ul.traffic'),
			category: 0,
			map: map
		});
    }

    google.maps.event.addDomListener(window, 'load', initialize);

})();






