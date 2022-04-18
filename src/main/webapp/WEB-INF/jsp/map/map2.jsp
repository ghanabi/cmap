<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>testMap</title>
<link rel="stylesheet" href="js/ol/ol.css" type="text/css">
<script src="js/ol/ol.js"></script>
<link rel="stylesheet" href="css/index.css" />
<script>   
      let map;
      window.onload = function(){
        var view = new ol.View({
          center: ol.proj.fromLonLat([126.978446,37.523184]),
          zoom: 11.3,
        });
      
        map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                }),
            ],
            target: 'map',
            view: view
        });       
      }      
    </script>
</head>
<body>
    <div id="map" class="map" style="background:red;"></div>
</body>
</html>