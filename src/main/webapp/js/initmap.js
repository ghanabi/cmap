/*시작함수*/
window.onload = function(){
    ol.proj.setProj4 = proj4;
    baseMap.init();
    mapView = OlSeesun.ol.viewer.v_viewer.initMap("VBASE","map");
    /*다음지도를 베이스로 사용 할경우 사용*/
    /* OlSeesun.ol.eventhandler.setEventHandler.onChangeEventHandler(mapView,'baseMap','s_daum'); */

    /*지도 움직인후 이벤트 가져오는 함수*/
    OlSeesun.ol.eventhandler.setEventHandler.setMoveEvent( mapView, 'moveend' );

    /*축척바*/
    OlSeesun.ol.control.scale.initScaleLine( mapView );

    OlSeesun.ol.control.layerControl.initWmsLayers( mapView, 'SM01' );
}

