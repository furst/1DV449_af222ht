var timestamp = null;
function comet(id) {
	$.ajax({
		type : 'GET',
		url : 'getMessage.php',
		data : {timestamp: timestamp, mid: id},
		async : true,
		cache : false,

		success : function(data) {
			var json = eval('(' + data + ')');
			if(json['msg'] == ''){
				console.log('empty');
			} else {
				$( "#mess_p_mess" ).prepend( "<p class='message_container'>" +json.msg +"<br />Skrivet av: " + json.name +"</p>");
			}
			timestamp  = json['timestamp'];

			setTimeout(function() {
				comet(id);
			}, 1000);
		},
		error : function(XMLHttpRequest, textstatus, error) {
			//alert(error);
			setTimeout(function() {
				comet(id);
			}, 15000);
		}
	});
}

$( document ).ready(

	function() {

		$("#logout").bind( "click", function() {
			window.location = "index.php";
		});

		$('#mess_container').hide();
		$("#add_btn").bind( "click", function() {

			var name_val = $('#name_txt').val();
			var message_val = $('#message_ta').val();
			var pid =  $('#mess_p_headline').attr('class');
			var token = $('#token').val();

			// make ajax call to logout
			$.ajax({
				type: "GET",
				url: "functions.php",
				data: {function: "add", name: name_val, message: message_val, pid: pid, token: token}
			}).done(function(data) {
				$('p.messageholder').text(data);
			});
		});

		$('.producer-link').on('click', function(event) {
			var pid = $(this).data('id');
			comet(pid);
			changeProducer(pid);
		});

		// Called when we click on a producer link - gets the id for the producer
		function changeProducer(pid) {

			// Clear and update the hidden stuff
			$( "#mess_inputs").val(pid);
			$( "#mess_p_mess").text("");

			// get all the stuff for the producers
			// make ajax call to functions.php with teh data
			$.ajax({
				type: "GET",
				url: "functions.php",
				data: {function: "producers", pid: pid}
			}).done(function(data) { // called when the AJAX call is ready

				var j = JSON.parse(data);

				$("#mess_p_headline").removeClass().addClass(j.producerID).text("Meddelande till " +j.name +", " +j.city);

				if(j.url !== "") {

					$("#mess_p_kontakt").text("Länk till deras hemsida " +j.url);
				}
				else {
					$("#mess_p_kontakt").text("Producenten har ingen webbsida");
				}

				if(j.imageURL !== "") {
					$("#p_img_link").attr("href", j.imageURL);
					$("#p_img").attr("src", j.imageURL);
				}
				else {
					$("#p_img_link").attr("href", "#");
					$("#p_img").attr("src", "img/noimg.jpg");
				}
			});

			$.ajax({
				type: "GET",
				url: "functions.php",
				data: {function: "getMessage", pid: pid},
				timeout: 2000
			}).done(function(data) {
				var j = JSON.parse(data);
				j.forEach(function(entry) {
					$( "#mess_p_mess" ).append( "<p class='message_container'>" +entry.message +"<br />Skrivet av: " +entry.name +"</p>");
				});
			});

			// show the div if its unvisible
			$("#mess_container").show("slow");

		}
	}
);




