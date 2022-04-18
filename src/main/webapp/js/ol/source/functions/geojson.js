/**
 * 지오제이슨 기능
 */
function geoJsonClass (){
    /**
     * geojson 파일 로딩
     * @param _mapView
     * @param _path
     * @returns {null}
     */
    geoJsonClass.prototype.retriveGeoJsonLoing = function ( _mapView, _path ){
        var resultData = null;
        $.ajax({
            url : _path,
            type : "GET",
            async : false,
            success : function( _data ){
                /*읽어드린 Geojson 가져오기*/
                var features = new ol.format.GeoJSON().readFeatures(_data);
                for( var i = 0; i < features.length; i++){
                    features[i].getGeometry().transform( geojsonProjNm, OlSeesun.ol.function.getView.getProjection( _mapView ) )
                    features[i].resultValue = [];
                    features[i].resultValue.push(features[i].values_);
                }
                resultData = features;
            }
        });
        return resultData;
    }
}
OlSeesun.ol.function.geoJson = new geoJsonClass();