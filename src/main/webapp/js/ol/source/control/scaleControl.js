/**
 * 스케일 컨트롤러
 */
function scaleControlClass (){
    /**
     * 축척바
     * @param _mapView
     */

    scaleControlClass.prototype.initScaleLine = function ( _mapView ){
        var scaleLineControl = new ol.control.ScaleLine();
        _mapView.addControl(scaleLineControl);
    }
    /**
     * 스케일값
     * @param _mapView
     */
    scaleControlClass.prototype.initScale = function ( _mapView ){
        var INCHES_PER_UNIT = {
            'm': 39.37,
            'dd': 4374754
        };
        var units = _mapView.getView().getProjection().getUnits();
        var dpi = 25.4 / 0.28;
        var resolution = OlSeesun.ol.function.getView.getResolution( _mapView );
        var scale = INCHES_PER_UNIT[units] * dpi * resolution;
        scale = Math.round(scale);
        var resultValue = "1 : " + scale;
        /*결과값 처리 하는곳*/
        OlSeesun.publics.textValue.html('dscale', resultValue);

    }

}
OlSeesun.ol.control.scale = new scaleControlClass();