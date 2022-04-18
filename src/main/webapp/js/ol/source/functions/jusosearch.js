/**
 * 주소검색 관련 js
 */
function jusoSearchClass(){

    /**
     * 지도 센터 좌표를 통한 브이월드 좌료 주소검색
     * @param _mapView
     */
    jusoSearchClass.prototype.getCenterVworldLonLatSearch = function ( _mapView ){
        /*센터 좌표 구해오기*/
        var center =  OlSeesun.ol.function.getView.getCenter( mapView, 'EPSG:4326' );
        OlSeesun.sync.vworldJuso.getLonLatJuso( center, this.successRetriveJusoData);
    }
    /**
     * 처리된결과값
     * @param _data
     */
    jusoSearchClass.prototype.successRetriveJusoData = function ( _data ){
        var jsonData = JSON.parse( _data );
        var str = "";
        /* 결과과 성공적인경우 */
        if(jsonData.response.status == "OK"){
            str = jsonData.response.result[0].text;
        }else{
            str = "-";
        }
        /*결과값 처리 하는곳*/
        OlSeesun.publics.textValue.html('centerJuso', '주소='+ str);
    }
}
OlSeesun.ol.function.jusoSearch =  new jusoSearchClass();