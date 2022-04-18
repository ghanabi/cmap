/*
지도 설정 파일
User: 백승재
Date: 2021-05-13
Time: 오후 3:47
지도 초기 설정 파일
*/

/* 맵정의 */
var olMap = null;

var emptyTileURL = "img/none.png"; //항공영상 빈타일.
var vworld_apikey = "C2AE7249-2871-3E26-8A65-79AE70F4CE64"; /*브이월드 API 키*/
var vWorld_domain = "http://localhost:8080"; /*브이월드 도메인*/
var vworld_base = "Base"; /*브이월드 타일 맵*/
var vworld_base_img_format = ".png"; /*브이월드 파일 포멧*/

/* BaseMapList */
var baseMapLists = ["Air","VworlBase","VworlGray","VworlMidnigh","VworlHybrid","VworlSatellite","DAUMBase","Emap"];

/* 공통지도 연계 */
var xdWorldUrl = "http://xdworld.vworld.kr";

/*geojsonfilepath*/
var geojsonPath = "js/ol/geojson/";
var geojsonProjNm = "EPSG:4326";


var OlSeesun = []; /* 총괄관리하는 함수명 */
OlSeesun.ol = {}; /* ol함수 */
OlSeesun.ol.viewer = {}; /* 공요함수 저장 함수 */
OlSeesun.ol.function = {}; /* ol 함수 모음 */
OlSeesun.ol.function.edit = {}; /* ol 함수 모음 */
OlSeesun.ol.control = {}; /* ol 함수 모음 */
OlSeesun.ol.eventhandler = {};
OlSeesun.publics = {}; /* 공요함수 저장 함수 */
OlSeesun.sync = {}; /* 연계관련 */