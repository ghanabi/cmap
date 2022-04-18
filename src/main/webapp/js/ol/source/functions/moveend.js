/**
 * 무브 앤드 함수
 */
function moveendClass(){
    moveendClass.prototype.setMoveEndCenter = function (evt){
        /*센터 좌표 구해오기*/
        var center =  OlSeesun.ol.function.getView.getCenter( mapView, 'EPSG:4326' );
        /* 값 채워넣기 */
        OlSeesun.publics.textValue.html('centerX', 'X='+ center[0]);
        OlSeesun.publics.textValue.html('centerY', 'Y='+ center[1]);

        /*주소처리*/
        OlSeesun.sync.vworldJuso.getLonLatJuso( center, OlSeesun.ol.function.jusoSearch.successRetriveJusoData);

        /* 이전다음컨트롤을 사용 하기 위한 함수 호출 */
        OlSeesun.ol.control.historyControl.initMouseHistory( mapView );

        /* 축척바 */
        OlSeesun.ol.control.scale.initScale( mapView );

    }
}
OlSeesun.ol.function.movened =  new moveendClass();