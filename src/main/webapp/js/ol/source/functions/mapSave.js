/**
 * 지도저장
 */
function mapSaveClass (){
    /**
     * 지도저장 함수
     * @param _mapView
     */
    mapSaveClass.prototype.mapSave = function( _mapView ){
        _mapView.once('postcompose', function(event) {
            var canvas = event.context.canvas;
            canvas.crossOrigin = "anonymous";
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
            } else {
                canvas.toBlob(function(blob) {
                    saveAs(blob, 'map.png');
                });
            }
        });
        _mapView.renderSync();
    }
}
OlSeesun.ol.function.mapSave = new mapSaveClass();
