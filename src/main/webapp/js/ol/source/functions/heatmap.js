/**
 * 히트맵 기능
 */
function heatMapClass(){
    this.heatMapSource = null;
    this.heatmapLayer = null;
    /**
     * 샘플 데이터 경남김해 EPSG:5187좌표
     * @type {[{x: number, y: number}, {x: number, y: number}, {x: number, y: number}, {x: number, y: number}, {x: number, y: number}, null, null]}
     */
    this.sampleData = [
        { x:181846.71093293518, y:289840.07468661654 },
        { x:181940.6498577596, y:289996.5638634611 },
        { x:182712.74455283175, y:289251.1144790652 },
        { x:181877.67591753494, y:290245.8006956306 },
        { x:182125.5411871105, y:289604.89059584175},
        { x:182505.2470039063, y:289811.22004658746},
        { x:182722.6241804005, y:286601.65690384066}]
    this.sampleSrs = "EPSG:5187";
    
    /**
     * 히트맴 그리기
     * @param mapView
     * @param _data
     * @param _srs
     */
    heatMapClass.prototype.drawHeatMapLonLat = function( _mapView, _data , _srs){
        /* 레이어 지우기 */
        OlSeesun.ol.control.layerControl.deleteLayerId( _mapView,'headMapLayer');
        this.initHeatMapLayer( _mapView );
        /*히트맵 배열 돌려서 만들기*/
        for(var i =0 ; i < _data.length; i++){
            var item=_data[i];
            var transXY=ol.proj.transform([Number(item.x), Number(item.y)], _srs ,mapView.getView().getProjection());
            var feature = this.PointFeatureCreate(transXY[0], transXY[1]);

            this.heatMapSource.addFeature(feature);
        }
    }
    /**
     * 히트맴 백터 만들기
     * @param _mapView
     */
    heatMapClass.prototype.initHeatMapLayer = function( _mapView ){
        this.heatMapSource = new ol.source.Vector();
        this.heatmapLayer = new ol.layer.Heatmap({
            zIndex:9,
            source: this.heatMapSource,
            id:"headMapLayer",
            radius: 5, //반경
            shadow:1000,
            blur: 5 //선명도
        });
        _mapView.addLayer(this.heatmapLayer);
        /*백터 레이어 관리하는 부분에 추가*/
        OlSeesun.ol.control.layerControl.layers.vectorLayer.push("headMapLayer");

    }

    /**
     * poit feature 만들기
     * @param x
     * @param y
     * @returns {*}
     * @constructor
     */
    heatMapClass.prototype.PointFeatureCreate = function(x, y){
        var lonlat = [];
        lonlat.push(x);
        lonlat.push(y);
        var feature = OlSeesun.ol.control.feature.initGeometryToFeature(lonlat, 'Point' );
        return feature;
    }
}
OlSeesun.ol.function.heatMap = new heatMapClass();