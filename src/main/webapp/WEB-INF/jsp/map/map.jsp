<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>testMap</title>
<link rel="stylesheet" href="js/ol/ol.css" type="text/css">
<script type="text/javascript" src="js/libs/jquery/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="js/libs/jquery/jquery.migrate-3.0.0.js"></script>
<script type="text/javascript" src="js/libs/jquery/jquery-ui-1.11.4.min.js"></script>
<script src="js/ol/ol.js"></script>
<script src="js/map.js"></script>
<link rel="stylesheet" href="css/index.css" />
<script> 	
	let map;      
	window.onload = function(){
		mapInit();
	}
</script>
</head>
<body>
<hr>
	<div id="wrapper">
		<div id="container">
			<div class="con_left" id="m1">
				<button type="button" onclick="wmslayer();"
					style="width: 130px; height: 30px; font-size: 15px;">wms layer</button>
				<button type="button" onclick="setSld();"
					style="width: 80px; height: 30px; font-size: 15px;">wms	sld</button>
				<button type="button" onclick="clear_wmslayer();"
					style="width: 80px; height: 30px; font-size: 15px;">clear </button>
				<button type="button" onclick="startWfs();"
					style="width: 130px; height: 30px; font-size: 15px;">wfs feature</button>
				<button type="button" onclick="clear_wfslayer();"
					style="width: 80px; height: 30px; font-size: 15px;">clear wfs</button>
				<button type="button" onclick="googletile();"
					style="width: 130px; height: 30px; font-size: 15px;">google tile</button>
				<button type="button" onclick="vworldtile();"
					style="width: 130px; height: 30px; font-size: 15px;">vworld tile</button>
				<br />
			</div>
			<div class="con_right">
				<div class="map" id="map"></div>
			</div>
		</div>
	</div>
</body>
</html>