/**
 * 공간분석 하는 공간
 */
function analysisClass (){
    this.processingResult = null; /*처리결과 함수*/
    /**
     * 공간분석 Get 방식 (주로 주소이동또는 필터 값을 알고 있는경우 사용 )
     * @param _mapView
     * @param _engineUrl 엔진주소
     * @param _layerNm  레이어명
     * @param _queryType  쿼리 타입
     * @param _param   파라미터
     * @param _actionType  액션타입 (move, loalat : 이동 및 하이라이팅, retrive : 데이터 조회시 사용)
     * @param _callBackFunction  콜백 함수가 필요한경우 사용 넘김후 processingResult 사용
     */
    analysisClass.prototype.getFeatureGetType = function ( _mapView, _engineUrl ,_layerNm, _queryType, _param, _actionType, _callBackFunction ) {
        var _this = this;
        var param = {
            tableName: _layerNm,
            queryType :_queryType,
            engineUrl: _engineUrl,
            tableValue : _param
        }

        switch (_actionType) {
            case "Move" :  /* 이동  및 하이라이팅*/
            case "loalat" : /* 주소이동시에만 사용 */
                this.processingResult = OlSeesun.ol.function.mapMoveing.moveing; /*콜백 처리 함수*/
                this.actionGetFeatureGet(_mapView, param, _actionType);
                break;
        }
    }
    /**
     * 주소이동
     * @param _mapView
     * @param param
     * @param _actionType
     * @param _callBackFunction
     */
     analysisClass.prototype.actionGetFeatureGet = function ( _mapView , param , _actionType ,_callBackFunction ){
        if(_actionType == "loalat"){
        }else{
            var parameter =	this.setParamr( param );
            var proj = "EPSG:900913";
            OlSeesun.ol.control.wfs.wfsGetUrlParam( _mapView, parameter, proj, this.retriveWfsDate );
        }
     }
     /**
     * 데이터 처리 결과
     * @param _mapView
     * @param _features
     */
     analysisClass.prototype.retriveWfsDate = function ( _mapView, _features ){
         OlSeesun.ol.function.analysis.processingResult( _mapView, _features );
     }
     /**
     * 필터만들기
     * @param _filter
     */
     analysisClass.prototype.setParamr = function ( _filter ){
        /*파라미터 컬럼 만들기*/
        var param = {
            engineUrl : _filter.engineUrl,
            tableName : _filter.tableName,
            queryType : _filter.queryType,
            parameter : []
        };
        /*필터 값 배열 만들기*/
        for( var i = 0; i < _filter.tableValue.length; i ++ ){
            /*데이터 값 컬럼 만들기*/
            var tempVlaue = {
                tableColumn : _filter.tableValue[i].tableColumn,
                tableValue : _filter.tableValue[i].tableValue,
                columnQueryType : _filter.tableValue[i].columnQueryType
            }
            /*파라미터 배열에 넣기*/
            param.parameter.push( tempVlaue );
        }
        return param;
     }
    /**
     * 도형으로 공간 검색
     * @param _mapView
     * @param _type 도형타입
     * @param _feature
     * @param _bufferOpt 버퍼 옵션
     * @param _c_cllBackFunction
     */
    analysisClass.prototype.getFeaturePostTypeMap = function ( _mapView, _type, _feature, _bufferOpt ,_cllBackFunction ){
        /*도형 Ol2버전으로 만들어서 매트리가져오기*/
        var ol2Polygon = OlSeesun.ol.control.feature.retriveOl2Feature( _type, _feature , _bufferOpt ,_mapView );
        OlSeesun.ol.control.wfs.retriveAnalysis( _mapView, ol2Polygon, _cllBackFunction );
    }


}
OlSeesun.ol.function.analysis = new analysisClass();