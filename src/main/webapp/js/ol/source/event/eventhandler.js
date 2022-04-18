function eventhandlerClass(){

    /*select 박스 체인지 이벤트 */
    eventhandlerClass.prototype.onChangeEventHandler = function ( _mapView, _type, _sId ){
        switch (_type) {
            /*베이스맵 교체 이벤트*/
            case "baseMap":
                OlSeesun.ol.viewer.v_viewer.changBaseMap( _mapView, _sId );
                break;
            /*바로이맵*/
            case "emap" :
                OlSeesun.ol.viewer.v_viewer.changBaseMap( _mapView, "s_base" );
                break;
        }
    }
    /**
     * 선터 좌표 가져오는 이벤트 핸들러
     * @param _mapView  맵저장 객체
     * @param _projection 변환시킬 좌표계  ex) EPSG:4326
     */
    eventhandlerClass.prototype.getCenter = function ( _mapView, _projection ){
      return OlSeesun.ol.function.getView.getCenter( _mapView, _projection );
    }

    /**
     * 마우스 이벤트 세팅
     * @param _mapView 맵객체
     * @param _type 맵타입세팅
     */
    eventhandlerClass.prototype.setMouseEvent = function ( _mapView, _type  ){
        switch ( _type ){
            case "mouseOut":
                OlSeesun.control.mouse.mouseout( _mapView );
                break;
        }
    }
    /**
     *  무브 이벤트
     * @param _mapView 맵객체
     * @param _option 옵션명
     */
    eventhandlerClass.prototype.setMoveEvent = function( _mapView, _option ){
        OlSeesun.ol.control.addEventListener.addEventListener( _mapView, OlSeesun.ol.function.movened.setMoveEndCenter, _option );
    }

    /**
     * 센터값으로 주소 검색
     * @param _mapView
     */
    eventhandlerClass.prototype.setCenterVorldLonLatSearch = function ( _mapView ){
        OlSeesun.ol.function.jusoSearch.getCenterVworldLonLatSearch( _mapView );
    }

}
OlSeesun.ol.eventhandler.setEventHandler = new eventhandlerClass();