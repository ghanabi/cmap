/*
지도 설정 파일
User: 백승재
Date: 2021-05-13
Time: 오후 3:47
지도 옵션 설정
*/
function optionClass(){
    this.emptyTileURL = emptyTileURL; //항공영상 빈타일.
    this.vworld_apikey = vworld_apikey; /*브이월드 API 키*/
    this.vWorld_domain = vWorld_domain; /*브이월드 도메인*/
    this.vworld_base = vworld_base; /*브이월드 타일 맵*/
    this.vworld_base_img_format = vworld_base_img_format; /*브이월드 파일 포멧*/
    this.baseMap = null; /*현제 베이스맵 */



    /**
     생성일 : 2021-05-13
     user : 백승재
     내용 : 베이스 지도에 따른 옵션 설정
     */
    optionClass.prototype.baseMapOtp = function ( _optBaseNm ){
        /*옵션값 저장하는 변수*/
        var opt = {};
        switch ( _optBaseNm ){
            case "DaumOpt" : /*다음*/
                opt = {
                    projection: 'EPSG:5181',
                    units: "m",
                    maxExtent: [-30000,-60000,-30000+Math.pow(2,19)*2, -60000+Math.pow(2, 19)*2],
                    numZoomLevels:14,
                    maxResolution:2048,
                    code:"EPSG:5181"
                }
                break;
            case "AirOpt" : /*항공사진*/
                opt = {
                    projection: 'EPSG:3857',  //좌표체계
                    units: "m",	 //미터(길이 단위)
                    maxExtent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34], //전체 범위
                    numZoomLevels:23,  //최대 줌레벨
                    maxResolution:156543.03390625, //최대 레볼루션
                    code:"EPSG:3857"
                }
                break;
            case "VworldOpt" : /*브이월드*/
                opt = {
                projection: 'EPSG:3857',  //좌표체계
                units: "m",
                maxExtent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34], //전체 범위
                numZoomLevels:23,
                maxResolution:156543.03390625,
                code:"EPSG:3857"
                }
                break;
            case "Emap" : /*바로이맵*/
                opt = {
                    projection: 'EPSG:5179',  //좌표체계
                    units: "m",
                    maxExtent: [-200000.0, -3015.4524155292, 3803015.45241553, 4000000.0], //전체 범위
                    numZoomLevels:23,
                    maxResolution:2088.96,
                    code:"EPSG:5179"
                }
                break;
        }
        return opt;
    }
    /**
     생성일 : 2021-05-13
     user : 백승재
     내용 : 베이스맵 세팅 리스트
     */
    optionClass.prototype.setBaseMapList = function (){
        var baseMapList = baseMapLists;
        var mapList = {};
        for(var i = 0; i < baseMapList.length; i++){
            switch (baseMapList[i]) {
                case "Air": /* 영상지도 */
                    mapList = {
                        name : "AIR_PICTURE",
                        opt : OlSeesun.ol.viewer.v_option.baseMapOtp("AirOpt"), /* 지도의 옵션 */
                        zoom : 17,
                        minZoom : 13,
                        maxZoom : 19,
                        geturl : OlSeesun.ol.viewer.v_option.getTileUrl_AIR
                    };
                    break;
                case "VworlBase": /* 브이월드 베이스 */
                    mapList = {
                        name : "VBASE",
                        opt : OlSeesun.ol.viewer.v_option.baseMapOtp("VworldOpt"),
                        zoom : 9,
                        minZoom : 6,
                        maxZoom : 19,
                        geturl : getTileUrl_VWORLD( "VBASE" )
                    };
                    break;
                case "VworlGray": /* 회색지도 */
                    mapList = {
                        name : "VGRAY",
                        opt : OlSeesun.ol.viewer.v_option.baseMapOtp("VworldOpt"),
                        zoom : 9,
                        minZoom : 6,
                        maxZoom : 18,
                        geturl : getTileUrl_VWORLD( "VGRAY" )
                    };
                    break;
                case "VworlMidnigh" : /* 야간지도 지도 */
                    mapList = {
                        name : "VMIDNIGHT",
                        opt : OlSeesun.ol.viewer.v_option.baseMapOtp("VworldOpt"),
                        zoom : 9,
                        minZoom : 6,
                        maxZoom : 18,
                        geturl : getTileUrl_VWORLD( "VMIDNIGHT" )
                    };
                    break;
                case "VworlSatellite" : /* 항공영상 */
                    mapList = {
                        name : "VSATELLITE",
                        opt : OlSeesun.ol.viewer.v_option.baseMapOtp("VworldOpt"),
                        zoom : 9,
                        minZoom : 6,
                        maxZoom : 19,
                        geturl : getTileUrl_VWORLD( "VSATELLITE" )
                    };
                    break;
                case "DAUMBase": /* 다음지도 베이스 */
                    mapList = {
                        name : "DAUM",
                        opt : OlSeesun.ol.viewer.v_option.baseMapOtp("DaumOpt"),
                        url : "http://map2.daumcdn.net/map_2d/1sta/",
                        zoom : 8,
                        minZoom : 2,
                        maxZoom : 15,
                        geturl : getTileUrl_Daum
                    }
                    break;
                case "Emap": /* 바로이맵 */
                    mapList = {
                        name : "Emap",
                        opt : OlSeesun.ol.viewer.v_option.baseMapOtp("Emap"),
                        zoom : 9,
                        minZoom : 5,
                        maxZoom : 18,
                    }
                    break;
            }
            /*메이스맵 배열에 넣기*/
            baseMap.map_list.push( mapList );
        }
    }
}
/*클래스 정의 */
OlSeesun.ol.viewer.v_option =  new optionClass();

/**
 생성일 : 2021-05-13
 user : 백승재
 내용 : 베이스맵 정보를 담는 변수
 */
var baseMap = {
    map_list : [], //베이스맵 리스트
    base_name : "VBASE",
    init : function(){ /*베이스맵 초기 함수*/
        this.map_list = [];
        OlSeesun.ol.viewer.v_option.setBaseMapList();

    },
    getMap : function(name){ //해당 배경설정 가져오기.
        var mobj = null;
        for(var i=0;i<this.map_list.length;i++){
            if(this.map_list[i].name == name){
                mobj = this.map_list[i];
            }
        }
        return mobj;
    }
}

/**
 생성일 : 2021-05-13
 user : 백승재
 내용 : 브이월드 타일 URL 설정
 */
var getTileUrl_VWORLD = function ( _baseNm ){
    switch ( _baseNm ) {
        case "VBASE": /*베이스맵*/
            OlSeesun.ol.viewer.v_option.vworld_base = "Base";
            OlSeesun.ol.viewer.v_option.vworld_base_img_format = ".png";
            break;
        case "VGRAY": /*회색맵*/
            OlSeesun.ol.viewer.v_option.vworld_base = "gray";
            OlSeesun.ol.viewer.v_option.vworld_base_img_format = ".png";
            break;
        case "VMIDNIGHT": /*밀리터리맵*/
            OlSeesun.ol.viewer.v_option.vworld_base = "midnight";
            OlSeesun.ol.viewer.v_option.vworld_base_img_format = ".png";
            break;
        case "VHYBRID": /*하이브리드*/
            OlSeesun.ol.viewer.v_option.vworld_base = "Hybrid";
            OlSeesun.ol.viewer.v_option.vworld_base_img_format = ".png";
            break;
        case "VSATELLITE": /*항공영상*/
            OlSeesun.ol.viewer.v_option.vworld_base = "Satellite";
            OlSeesun.ol.viewer.v_option.vworld_base_img_format = ".jpeg";
            break;
    }
/* 브이월드 키가지고 부를 때 사용*/
/*	return 'http://api.vworld.kr/req/wmts/1.0.0/'+OlSeesun.viewer.v_option.vworld_apikey+'/'+OlSeesun.viewer.v_option.vworld_base+'/{z}/{y}/{x}' + this.vworld_base_img_format; */
    return  xdWorldUrl + ':8080/2d/'+OlSeesun.ol.viewer.v_option.vworld_base+'/service/{z}/{x}/{y}' + OlSeesun.ol.viewer.v_option.vworld_base_img_format;

}

/**
 생성일 : 2021-05-13
 user : 백승재
 내용 : 다음타일맵 가져오기 -> ol3
 */
var getTileUrl_Daum = function( _tileCoord, _pixelRatio, _projection) {

    //var baseMap = OlSeesun.viewer.v_option.baseMap;
    var objBase = baseMap.getMap( "DAUM" );

    if (_tileCoord == null){
        return undefined;
    }
    var s = Math.floor(Math.random() * 4);  // 0 ~ 3
    var z = objBase.opt.numZoomLevels - _tileCoord[0];
    var x = _tileCoord[1];
    var y = _tileCoord[2];
    var url = 'http://map' + s + '.daumcdn.net/map_2d/1sta/L' + z + '/' + y + '/' + x + '.png';
    return url;
};

/**
 생성일 : 2021-05-13
 user : 백승재
 내용 : 항공타일맵 가져오기(epsg:3857) -> ol3
 */
var getTileUrl_AIR = function( _tileCoord, _pixelRatio, _projection) {
    if (_tileCoord == null){
        return undefined;
    }
    var z = _tileCoord[0];
    var x = _tileCoord[1];
    var y = _tileCoord[2];
    var url = 'http://seesunit.iptime.org:8093/AIR_PICTURE_2017/' + z + '/' + x + '/' + y + '.png';
    return url;
};