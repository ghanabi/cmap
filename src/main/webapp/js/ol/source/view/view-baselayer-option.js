/* 바로이맵 년도 가져오기 */
var emapAerial = "";

/*
User: 백승재
Date: 2021-05-13
Time: 오후 3:47
베이스 레이어 옵션 설정
*/
function baseLayerOptionClass(){
    /*
    User: 백승재
    Date: 2021-05-13
    Time: 오후 3:47
    베이스 레이어에따른 setSource 설정
    */
    baseLayerOptionClass.prototype.initBaseLayer = function( _baseLayerNm ){
        var objBase = baseMap.getMap( _baseLayerNm ); /*베이스맵 정보 가져오기*/
        var pro = OlSeesun.ol.projection.rtProjection( objBase.opt ); /* 좌표계 가져오기 */
        var resolutions = OlSeesun.ol.resolution.rtResolution( objBase.opt.maxResolution , objBase.opt.numZoomLevels ); /*레졸류션 가져오기*/
        var baseLayer = new ol.layer.Tile({ title:_baseLayerNm, visible:true, type:'base' }); /* 타일 만들길 */

        switch ( _baseLayerNm ) {
            case "VBASE":           /* 브이월드 인경우 해당부분 의 setSource 생성 */
            case "VMIDNIGHT":
            case "VHYBRID":
            case "VSATELLITE":
            case "VGRAY" :
                baseLayer.setSource(new ol.source.XYZ({
                    crossOrigin: 'anonymous',
                    url : objBase.geturl
                }));
                break;
            case "DAUM":  /* 다음인경우 해당 부분의 setSource 생성 */
                baseLayer.setSource(new ol.source.XYZ({
                    //crossOrigin: 'anonymous',
                    projection : pro, /*좌표계*/
                    tileSize : 256, /*타일싸이즈*/
                    minZoom : 0, /*최소 줌 */
                    maxZoom : objBase.opt.numZoomLevels, /*최대줌*/
                    tileGrid : new ol.tilegrid.TileGrid({
                        origin : [ objBase.opt.maxExtent[0] , objBase.opt.maxExtent[1] ],
                        resolutions : resolutions
                    }),/*타일 그리드 생성*/
                    tileUrlFunction: objBase.geturl
                }));
                break;
            case "Emap" : /*바로이맵 추가*/
                baseLayer.setSource(new ol.source.WMTS({
                    crossOrigin: 'anonymous',
                    projection:"EPSG:5179",
                    tileGrid:new ol.tilegrid.WMTS({
                        extent:[-200000.0, -3015.4524155292, 3803015.45241553, 4000000.0],
                        origin:[-200000.0,4000000.0],
                        tileSize:256,
                        matrixIds:["5","6","7","8","9","10","11","12","13","14","15","16","16","17","18"],
                        resolutions:[2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64,
                            16.32, 8.16, 4.08, 2.04, 1.02],

                    }),
                    //url:"http://map.ngii.go.kr/openapi/Gettile.do?apikey={apikey}",
                    //url:"http://210.117.198.120:8081/o2map/services?service=WMTS&request=GetTile&version=1.0.0&layer="+emapAerial+"&style=_null&format=image/jpg&tilematrixset=NGIS_AIR&apiKey=A60320BA17E8E49E4B4A20478E7D0890",
                    url:"/o2map/services?service=WMTS&request=GetTile&version=1.0.0&layer="+emapAerial+"&style=_null&format=image/jpg&tilematrixset=NGIS_AIR&apiKey="+ngiiKey,
                    tileLoadFunction:function(imageTile,src){
                        src = src.replace("tileMatrix","tilematrix");
                        src = src.replace("tileRow","tilerow");
                        src = src.replace("tileCol","tilecol");
                        imageTile.getImage().src = src;
                    }
                }));
                break;
        }
        return baseLayer;
    }
}
OlSeesun.ol.viewer.v_baseLayer = new baseLayerOptionClass();