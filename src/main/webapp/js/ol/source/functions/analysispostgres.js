/**
 * post가지고 공간검색
 */
function analysisPostgresClass(){
    this.TABLENM = "";
    /**
     * 디비로 공간검색
     * @param mapView
     * @param _type
     * @param _bufferOpt
     * @param selectType
     * @param _callBackFunction
     */
    analysisPostgresClass.prototype.initAnalysisPostgres = function ( mapView,  _type, _bufferOpt, selectType, _callBackFunction ){
        OlSeesun.ol.control.drawTool.initDrawTool( _mapView, _type, selectType, "db", _bufferOpt , _callBackFunction );
    }
    /**
     * DB를 통한 공간 검색
     * @param _mapView
     * @param _drawType
     * @param ske
     * @param _bufferOpt
     * @param _cllBackFunction
     */
    analysisPostgresClass.prototype.retriveAnalysisPostgres = function ( _mapView, _type ,_feature, _bufferOpt ,_cllBackFunction ){
        var ol2Polygon = OlSeesun.ol.control.feature.retriveOl2Feature( _type, _feature , _bufferOpt ,_mapView );
        var src = engineProjNm.split(":");
        /*데이터 조회용 만들기*/
        var param  = {
            "tableNm" : OlSeesun.ol.function.analysisPostgres.TABLENM,
            "geomater" : ol2Polygon.toString(),
            "src" :  src[1]

        };
        param.dbtype = gisdbType; /* 데이터 베이스 설정 타입 */
        var sqlId = "analysis.intersects";
        var rtParm = OlSeesun.publics.ajax.paramAjaxObject( sqlId, param );
        OlSeesun.publics.ajax.retriveAjaxObjectParam( rtParm, _cllBackFunction, _mapView );
    }
}
OlSeesun.ol.function.analysisPostgres = new analysisPostgresClass();