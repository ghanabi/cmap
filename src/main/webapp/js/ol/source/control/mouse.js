/**
 * 마우스 컨트롤 이벤트
 */
function mouseClass(){
    /**
     * 마우스 아웃 이벤트
     * @param _mapView : 맵객체
     */
    mouseClass.prototype.mouseout = function ( _mapView ){
        _mapView.getViewport().addEventListener('mouseout', function(evt){
            console.info('out');
        }, false);
    }
}
OlSeesun.ol.control.mouse = new mouseClass();