
var cbndWms;
var vworldTile;
var googlemap;
var wfsSource = new ol.source.Vector();
var wfs_layer;
function mapInit(){
	var view = new ol.View({
		center: ol.proj.fromLonLat([126.978446,37.523184]),
		zoom: 11.3,
	});
	
	vworldTile = new ol.layer.Tile({
        id : 'vworldTile',
        visible: true,
        source: new ol.source.XYZ({
        	crossOrigin: 'anonymous',
            url: 'http://xdworld.vworld.kr:8080/2d/Base/service/{z}/{x}/{y}.png'
        })
    });
	//vworldTile.set("name" , 'vworldTile');
	
	googlemap = new ol.layer.Tile({
		source: new ol.source.OSM(),
	});
	
	wfs_layer = new ol.layer.Vector({
		source: wfsSource,
		style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 228, 0, 0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ff0000',
                width: 3
            }),
        }),
        zIndex : 9999
	});
    
	map = new ol.Map({
//		layers: [
//			new ol.layer.Tile({
//				source: new ol.source.OSM(),
//			}),
//		],
		layers: [
			vworldTile
		],
		target: 'map',
		view: view
	});
	map.addLayer(wfs_layer);
}

function wmslayer(){
	cbndWms = new ol.layer.Tile({
        opacity: 0.7,
        source: new ol.source.TileWMS({
            url: './proxyGetMap.jsp?url='+encodeURIComponent('http://api.vworld.kr/req/wms?key=' + '90D6D336-FE7B-3EAD-860C-19793AC8FE9E'),
            crossOrigin: 'anonymous',
            params: {
            	//'layers': encodeURIComponent('lp_pa_cbnd_bonbun,lp_pa_cbnd_bubun') , 
            	//'styles': encodeURIComponent('lp_pa_cbnd_bonbun_line,lp_pa_cbnd_bubun_line') , 
            	'layers': encodeURIComponent('lt_c_uq111') , 
            	'styles': encodeURIComponent('lt_c_uq111') , 
                'service' : encodeURIComponent('WMS'), 
                'version' : encodeURIComponent('1.3.0'), 
                'request' : encodeURIComponent('GetMap'), 
                'format' : encodeURIComponent('image/png'), 
                'transparent' : encodeURIComponent('true'), 
                'crs' : encodeURIComponent('EPSG:3857'), 
                //'SLD_BODY' : encodeURIComponent(sld()),
                'domain' : encodeURIComponent('localhost:8080')                
            }
        })
      });
    
    map.addLayer(cbndWms);
}  

function clear_wmslayer(){
	map.removeLayer(cbndWms);
}

function setSld(){
	if(cbndWms == null){
		return;
	}
	cbndWms.getSource().updateParams({
		SLD_BODY : encodeURIComponent(sld())
	});
}

function sld() {
	var lyNm = 'lt_c_uq111';
	
    var sld = '<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd">';
    sld += '<NamedLayer>';
    sld += '<Name>sop:'+lyNm+'</Name>';
    sld += '<UserStyle>';
    sld += '<Name>Default Styler</Name>';
    sld += '<Title>테스트</Title>';
    sld += '<Abstract>테스트</Abstract>';
    sld += ' <FeatureTypeStyle>';
    sld += '<Rule>';
    sld += '<Name>도시지역</Name>';
    sld += '<Title>도시지역</Title>';
    //sld += '<Filter xmlns="http://www.opengis.net/ogc">';
    //if(type != "emd"){
    //  sld += '<PropertyIsLike wildCard="_" singleChar="!" escapeChar="?">';
    //  sld += '<PropertyName>'+lyCol+'</PropertyName>';
    //  sld += '<Literal>'+lyVal+'_</Literal>';
    //  sld += '</PropertyIsLike>';
    // }else{
    //   sld += '<PropertyIsEqualTo>';
    //   sld += '<PropertyName>'+lyCol+'</PropertyName>';
    //   sld += '<Literal>'+lyVal+'</Literal>';
    //   sld += '</PropertyIsEqualTo>';
    // }
    //sld += '</Filter>';
    sld += '<PolygonSymbolizer>';
    sld += '<Fill>';
    sld += '<CssParameter name="fill">#000000</CssParameter>';
    sld += '<CssParameter name="fill-opacity">1</CssParameter>';
    sld += '</Fill>';
    sld += '<Stroke>';
    sld += '<CssParameter name="stroke">';
    sld += '<Literal xmlns="http://www.opengis.net/ogc">#FF0000</Literal>';
    sld += '<CssParameter name="stroke-width">3</CssParameter>';
    sld += '</CssParameter>';
    sld += '</Stroke>';
    sld += '</PolygonSymbolizer>';
    // sld += '<TextSymbolizer>';
    // sld += '<Label>';
    // sld += '<PropertyName>sig_kor_nm</PropertyName>';
    // sld += '</Label>';
    // sld += '<Font>';
    // sld += '<CssParameter name="font-family">Arial</CssParameter>';
    // sld += '<CssParameter name="font-size">17</CssParameter>';
    // sld += '<CssParameter name="font-style">italic</CssParameter>';
    // sld += '</Font>';
    // sld += '<Fill>';
    // sld += '<CssParameter name="fill">#FFFF00</CssParameter>';
    // sld += '</Fill>';
    // sld += '</TextSymbolizer>';
    sld += '</Rule>';
    sld += '</FeatureTypeStyle>';
    sld += '</UserStyle>';
    sld += '</NamedLayer>';
    sld += '</StyledLayerDescriptor>';
    
    return sld;
}


function googletile(){
	map.removeLayer(vworldTile);
	map.addLayer(googlemap);
}

function vworldtile(){
	map.removeLayer(googlemap);
	map.addLayer(vworldTile);
}

function startWfs(){
	
	var str = "http://api.vworld.kr/req/wfs?SERVICE=WFS&REQUEST=GetFeature&TYPENAME=lt_c_uq111&BBOX=13987670,3912271,14359383,4642932&PROPERTYNAME=mnum,sido_cd,sigungu_cd,dyear,dnum,ucode,bon_bun,bu_bun,uname,sido_name,sigg_name,ag_geom&VERSION=1.1.0&MAXFEATURES=40&SRSNAME=EPSG:3857&OUTPUT=GML3&EXCEPTIONS=text/xml&KEY=90D6D336-FE7B-3EAD-860C-19793AC8FE9E&DOMAIN=localhost:8080";
	
	var param = encodeURIComponent(str);
	
	$.ajax({
		type : "GET",
		url : './proxyGetMap.jsp?url='+param,
		dataType : "text",
		outputFormat : "json",
		success : function(gml) {
			console.log(gml);
			fn_searchParser_move_smap(gml);
		},
		error : function(e) {
			alert("검색결과를 가져오는데 실패했습니다.");
		}
	});	
}

//지도 위치 이동 + 하이라이팅
function fn_searchParser_move_smap(xml) {
	var gmlParser = new ol.format.GML3();
	gmlParser.extractAttributes = true;
	var features = gmlParser.readFeatures(xml);
	//console.log(features);
	if (features) {
		for (var i = 0; i < features.length; i++) {
			var feature = features[i];
			//var result_feature = getFeature(feature);
			// map.getLayerByName("search_juso").addFeatures(result_feature);
			// var result_feature = init_feature_style(feature);
			wfsSource.addFeature(feature);
			// var point_w = feature.geometry.getBounds().getCenterLonLat();
		}
	} else {
		alert("해당지역의 공간데이터가 없습니다.");
	}
}

function clear_wfslayer(){
	wfsSource.clear();
}