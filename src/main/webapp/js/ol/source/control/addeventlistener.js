/**
 * 이벤트 등록 리스너
 */
function addeventlistenerClasa(){
    /**
     * 이벤트 등록 리스너
     * @param _mapView
     * @param _callBackFunction
     * @param _eventType
     */
    addeventlistenerClasa.prototype.addEventListener = function ( _mapView , _callBackFunction, _eventType ){
        _mapView.on( _eventType, _callBackFunction );
    }
}
OlSeesun.ol.control.addEventListener = new addeventlistenerClasa();
