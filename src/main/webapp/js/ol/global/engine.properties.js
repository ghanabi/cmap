/*좌표계 정의*/
proj4.defs(["EPSG:5179", '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs']);
proj4.defs(["EPSG:5181", '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs']); //다음 좌표계
proj4.defs(["EPSG:5187", '+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs']);

/*Ol5버전에서는 다음과 같이 정의된 값 등록*/
ol.proj.proj4.register(proj4);

var epsg5179 = ol.proj.get('EPSG:5179'); //네이버
var epsg5187 = ol.proj.get('EPSG:5187'); //네이버


// 공간정보연계
var nsdiUrl = "http://openapi.nsdi.go.kr";
var nsdiKey = "dc6ce00f5b39240ea023de";

// 영상지도연계
var ngiiUrl = "http://map.ngii.go.kr";
var ngiiKey = "A60320BA17E8E49E4B4A20478E7D0890";

/*엔진 좌표계*/
// var engineProj = epsg5179;
// var engineProjNm = "EPSG:5179";
/*지오서버 샘플*/
var engineProj = epsg5187;
var engineProjNm = "EPSG:5187";


var wms_geoserver = "http://seesunit.iptime.org:18989/geoserver/ows?";/*지오서버 테스트*/
var wfs_geoserver = "http://seesunit.iptime.org:18989/geoserver/ssp/wfs?";

var wms_FDMS_BML_UTMK_EngineUrl = "http://10.137.1.187:9090/iserver/services/map-FDMS_BML_UTMK/wms111/TB_FGDI_CM100_ST?"; /*엔진주소*/
var wfs_FDMS_BML_UTMK_EngineUrl ="http://10.137.1.187:9090/iserver/services/data-FDMS_BML_UTMK/wfs100/utf-8?";
var wfs_FDMS_INDEX_UTMK_EngineUrl ="http://10.137.1.187:9090/iserver/services/data-FDMS_INDEX_UTMK/wfs100/utf-8?";


var PROJ = "EPSG:900913"; /*경위도 좌표*/
var dataHouse = "ssp"; /*공간데이터 데이터 하우스 명*/
var maxFeature = 9999; /*wfs 가져오는 퓨저 갯수*/
var geoServer_poxy_url = "proxy/geoproxy.jsp?PROXY_URL=";
var layerNm = "";
var geoType = "geom";
var gisdbType = "0";