/**
 * 버튼 이벤트 컨트롤
 */
function eventhandlerButtonClass(){

    /**
     * 마우스 이동 이벤트
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setPanMove = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.panControl.panMove( _mapView );
    }

    /**
     * 맵 확대 컨트롤
     * @param _mapView 맵캑체
     */
    eventhandlerButtonClass.prototype.setZoomIn = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.zoomControl.zoomIn( _mapView, 1 );
    }

    /**
     * 맵 축소 컨트롤
     * @param _mapView 맵캑체
     */
    eventhandlerButtonClass.prototype.setZoomOut = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.zoomControl.zoomOut( _mapView, 1 );
    }

    /**
     * 맵 클릭 위치 확대 컨트롤
     * @param _mapView 맵캑체
     */
    eventhandlerButtonClass.prototype.setZoomInClick = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.zoomControl.zoomInClick( _mapView, 1 );
    }

    /**
     * 맵 클릭 위치 확대 컨트롤
     * @param _mapView 맵캑체
     */
    eventhandlerButtonClass.prototype.setZoomOutClick = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.zoomControl.zoomOutClick( _mapView, 1 );
    }

    /**
     * 영역 확대
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setZoomInDraw = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.zoomControl.drawZoomIn( _mapView );
    }

    /**
     * 영역 축소
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setZoomOutDraw = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.zoomControl.drawZoomOut( _mapView );
    }
    /**
     * 이전 버튼 컨트롤
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setPreView= function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.historyControl.preView( _mapView );
    }

    /**
     * 다음 버튼 컨트롤
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setNextView= function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.historyControl.nextView( _mapView );
    }

    /**
     * 거리재기
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDistanceMeasurement= function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.measuringTool.initMeasuringTool( _mapView, 'DistanceMeasurement' );
    }

    /**
     * 면적측정
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setAreaMeasurement= function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.measuringTool.initMeasuringTool( _mapView, 'AreaMeasurement' );
    }

    /**
     * 반경측정
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setCircleMeasurement= function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.measuringTool.initMeasuringTool( _mapView, 'CircleMeasurement' );
    }

    /**
     * 포인트 그리기
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingPoint = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.drawTool.initDrawTool( _mapView, 'Point' );
    }
    
    /**
     * 라인그리기
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingLine = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.drawTool.initDrawTool( _mapView, 'LineString' );
    }
    /**
     * 사각형 그리기
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingRectangle = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.drawTool.initDrawTool( _mapView, 'Rectangle' );
    }
    /**
     * 원 그리기
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingCircle = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.drawTool.initDrawTool( _mapView, 'Circle' );
    }

    /**
     * 폴리건 그리기
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingPolygon = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.drawTool.initDrawTool( _mapView, 'Polygon' );
    }
    /**
     * 도형 선택
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingSelect = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        //OlSeesun.ol.control.drawTool.initDrawTool( _mapView, 'Select', 'Select' );
        OlSeesun.ol.control.feature.edit.initEditeTool( _mapView, 'drawLayer' ,'Select', 'Select' );
    }

    /**
     * 도형 이동
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingFeatureMove = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.feature.edit.initEditeTool( _mapView, 'drawLayer' ,'Select', 'Move' );
    }
    /**
     * 수정
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingFeatureModify = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.feature.edit.initEditeTool( _mapView, 'drawLayer' ,'Select', 'Modify' );
    }

    /**
     * 도형 삭제
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingDelete = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.feature.edit.initEditeTool( _mapView, 'drawLayer' , 'Select', 'Delete' );
    }
    /**
     * 그리기도 형 전체 삭제
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingFeatureClear = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.drawTool.initDrawTool( _mapView, 'Clear' );
    }

    /**
     *  벡터 복제
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingFeatureClone = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.feature.edit.initEditeTool( _mapView, 'drawLayer', 'Select','Clone' );
    }
    /**
     * 교집합
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingFeatureIntersection = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.feature.edit.initEditeTool( _mapView, 'drawLayer', 'Select','Intersection' );
    }

    /**
     * 합집합
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingFeatureUnion = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.feature.edit.initEditeTool( _mapView, 'drawLayer', 'Select','Union' );
    }

    /**
     * 차집합
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingFeatureDifference = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.feature.edit.initEditeTool( _mapView, 'drawLayer', 'Select','Difference' );
    }

    /**
     * 도형뚫기
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingFeatureSymDifference = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.feature.edit.initEditeTool( _mapView, 'drawLayer', 'Select','SymDifference' );
    }
    /**
     * 도형 분할
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingFeaturePolygonizer = function ( _mapView ){
        alert("분활할 도형을 선택 하여 주십시오");
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.feature.edit.initEditeTool( _mapView, 'drawLayer','Select','Polygonizer' );
    }

    /**
     * 도형 도형 홀
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.setDrawingFeatureHole = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.feature.edit.initEditeTool( _mapView, 'drawLayer', 'Select','Hole' );
    }

    /**
     * WMS레이어 등록
     * @param _mapView
     * @param _layerId 레이어 아이디
     * @param _layerNm 레이어 네임
     * @param _wmsType WMS 타임
     */
    eventhandlerButtonClass.prototype.setWmsLayer = function ( _mapView, _layerId, _layerNm, _wmsType ){
        this.cleanBtnEvent( _mapView );
        var engineurl = wms_geoserver;
        OlSeesun.ol.control.wms.addWmsLayerTile( _mapView, _layerId, _layerNm, _wmsType, engineurl );
    }

    eventhandlerButtonClass.prototype.setWmsLayerDB = function ( _mapView, _layerId, _check ){
        this.cleanBtnEvent( _mapView );
        OlSeesun.ol.control.layerControl.deleteRegistrationLayer(  _mapView, _layerId, _check);
    }

    /**
     * 공간분석 get샘플
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.retriveGetWfs = function ( _mapView ){
        this.cleanBtnEvent( _mapView );
        var paramTemp = {};
        /*파라미터는 배열로 넘겨서 사용*/
        var param = [];
        paramTemp.tableColumn = "sig_cd";
        paramTemp.tableValue = "48890";
        paramTemp.columnQueryType = "EqualTo";

        param.push(paramTemp);
        //
        // paramTemp = {};
        // paramTemp.tableColumn = "SGNG_CD";
        // paramTemp.tableValue = "171";
        // paramTemp.columnQueryType = "EqualTo";
        // param.push(paramTemp);

        var enginUrl = wms_geoserver;

        /* 슈퍼맵샘플 */
        // OlSeesun.ol.function.analysis.getFeatureGetType( _mapView, enginUrl,
        //     "FDMS_INDEX:TB_FDMS_C5000" , null, param,
        //     "Move", null
        // );

        /**
         *  지오서버 샘플
         */
        OlSeesun.ol.function.analysis.getFeatureGetType( _mapView, enginUrl,
            "ssp:TL_SCCO_SIG" , null, param,
             "Move", null
         );

    }
    /**
     * 공간검색
     * @param _mapView
     * @param _type
     * @param _bufferOpt
     * @param selectType
     */
    eventhandlerButtonClass.prototype.retrivePostWfsIntersects = function ( _mapView, _type, _bufferOpt, selectType) {
        /*데이터 하우스 재정의 */
        // dataHouse = "FDMS_BML";
        // layerNm = "TB_FGDI_LP_SGG_ST";
        // wfs_FDMS_BML_UTMK_EngineUrl = "http://10.137.1.187:9090/iserver/services/data-FDMS_BML_UTMK/wfs100/utf-8?";

        /*geoserver 샘플*/
        dataHouse = "ssp";
        layerNm = "TL_SCCO_SIG";
        wfs_FDMS_BML_UTMK_EngineUrl = wms_geoserver;
        geoType = "geom";
        this.cleanBtnEvent(_mapView);
        /**
         * _callBackFunction 처리에 필요한 함수로
         */
        if (_type == "Select") {
            OlSeesun.ol.control.feature.edit.initEditeTool(_mapView, 'drawLayer', _type, selectType, "oneDraw", _bufferOpt, sampleResultWfsData);
        } else {
            OlSeesun.ol.control.drawTool.initDrawTool(_mapView, _type, selectType, "oneDraw", _bufferOpt, sampleResultWfsData);
        }
    }


    /**
     * 공간검색 postgres를 통해서
     * @param _mapView
     * @param _type
     * @param _bufferOpt
     * @param selectType
     */
    eventhandlerButtonClass.prototype.retriveAnalysisPostgres = function ( _mapView, _type, _bufferOpt, selectType) {
        /*조회할 테이블 이름 정해주기*/
        OlSeesun.ol.function.analysisPostgres.TABLENM = "SAMPLE_POLYGON";
        this.cleanBtnEvent( _mapView );
        /**
         * _callBackFunction 처리에 필요한 함수로
         */
        if (_type == "Select") {
            OlSeesun.ol.control.feature.edit.initEditeTool(_mapView, 'drawLayer', _type, selectType, "oneDraw", _bufferOpt, sampleResultWfsData);
        } else {
            OlSeesun.ol.control.drawTool.initDrawTool(_mapView, _type, selectType, "db", _bufferOpt, sampleResultWfsData);
        }
    }


        /**
     * 지도저장
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.retriveMpaSave = function ( _mapView ){
        OlSeesun.ol.function.mapSave.mapSave( _mapView );
    }
    /**
     * 지두출력
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.retriveMpaPrint = function ( _mapView ){
        OlSeesun.ol.function.mapPrint.showPrintPopup( _mapView );
    }

    /**
     * 버튼 이벤트 시작전 컨트롤 죽이기
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.cleanBtnEvent = function ( _mapView ){
        OlSeesun.ol.eventhandler.btnEventHandler.cleanMapEventOverlay(_mapView); /*마우스오버레이지우기*/
        /*싱글 클릭 이벤트 죽이기*/
        _mapView.removeEventListener('singleclick');
        _mapView.removeInteraction(OlSeesun.ol.control.zoomControl.drawZIn); /*영역 확대 이벤트 죽이기*/
        _mapView.removeInteraction(OlSeesun.ol.control.zoomControl.drawZOut); /*영역 축소 이벤트 죽이기*/
        _mapView.removeInteraction(OlSeesun.ol.control.measuringTool.measuringToolInteraction); /*측정도구 초기화*/
        OlSeesun.ol.control.drawTool.clearDrawTool( _mapView );/* 그리기툴 초기화 */
    }


    /**
     * 맵에 정의된 map 오버레이 지우기
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.cleanMapEventOverlay = function ( _mapView ){
        if(_mapView.getOverlayById('measureOverlay') != null){
            _mapView.removeOverlay(_mapView.getOverlayById('measureOverlay'));
        }
        if(OlSeesun.ol.control.measuringTool.tpOverLayArr != null && OlSeesun.ol.control.measuringTool.tpOverLayArr.length > 0){
            for(var i = 0 ; i < OlSeesun.ol.control.measuringTool.tpOverLayArr.length; i++){
                _mapView.removeOverlay(OlSeesun.ol.control.measuringTool.tpOverLayArr[i]);
            }
        }
    }

    /**
     * 데이터 조회 샘플
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.retriveSampleSearchData = function ( _mapView ){
        var paramObj = {};
        paramObj = OlSeesun.publics.ajax.paramPagingAjaxObject("search.sampleGeomaterList","search.sampleGeomaterCnt",paramObj,1,7);
        OlSeesun.publics.paging.initPaging("sampleDivPg","sampleDivPg", 7, paramObj, sampleSearchDiv, _mapView);
    }

    /**
     * 데이터 조회 샘플
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.retriveSamplePointSearchData = function ( _mapView ){
        var paramObj = {};
        paramObj.dbtype = gisdbType; /* 데이터 베이스 설정 타입 */
        paramObj = OlSeesun.publics.ajax.paramPagingAjaxObject("search.samplePointGeomaterList","search.samplePointGeomaterCnt",paramObj,1,7);
        OlSeesun.publics.paging.initPaging("samplePointDivPg","samplePointDivPg", 7, paramObj, samplePointSearchDiv, _mapView);
    }

    /**
     * 히트맵 샘플
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.retriveSampleHeatMap = function ( _mapView ) {
        var data = OlSeesun.ol.function.heatMap.sampleData; /*데이터  [{x,y}] 형태의 데이터 */
        var srs =  OlSeesun.ol.function.heatMap.sampleSrs; /*좌표계 원본 좌표*/
        /*히트맴 만들기*/
        OlSeesun.ol.function.heatMap.drawHeatMapLonLat(_mapView, data, srs);
    }
    /**
     * 데이터 배이스에서 데이터 조회
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.retriveSampleHeatMapDBLonLat = function ( _mapView ){
        var paramObj = {};
        var sqlId = "heatMap.retriveSampleHeatDBLonLat";
        paramObj.dbtype = gisdbType; /* 데이터 베이스 설정 타입 */
        paramObj = OlSeesun.publics.ajax.paramAjaxObject( sqlId, paramObj );
        OlSeesun.publics.ajax.retriveAjaxObjectParam(  paramObj, retriveSampleHeatDBLonLat, _mapView );
    }

    /**
     * 디비에서 지오메트리로 처리하는 샘플(postgis전용)
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.retriveSampleHeatMapDBPostGis = function ( _mapView ){
        var paramObj = {};
        paramObj.dbtype = gisdbType; /* 데이터 베이스 설정 타입 */
        var sqlId = "heatMap.retriveSampleHeatDBPostGis";
        paramObj = OlSeesun.publics.ajax.paramAjaxObject( sqlId, paramObj );
        OlSeesun.publics.ajax.retriveAjaxObjectParam(  paramObj, retriveSampleHeatDBLonLat, _mapView );
    }

    /**
     * 통계지도 샘플
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.retriveSampleStatsMap = function (_mapView){
        var data = OlSeesun.ol.function.statsMap.sampleData;
        var unit = "개";
        var type = 'DBData';
        /*조회테이블 정의 컬럼명정의*/
        OlSeesun.ol.function.statsMap.table = "SAMPLE_STSTSMAP";
        OlSeesun.ol.function.statsMap.column = "ctprvn_cd";
        OlSeesun.ol.function.statsMap.setStatsMap( _mapView, data, unit, type);
    }

    /**
     * 통계지도 샘플 Geojson
     * @param _mapView
     */
    eventhandlerButtonClass.prototype.retriveSampleStatsMaGeojson = function (_mapView){
        var data = OlSeesun.ol.function.statsMap.sampleData;
        var unit = "개";
        var type = 'GeoJson';
        /*조회테이블 정의 컬럼명정의*/
        OlSeesun.ol.function.statsMap.geoJson = "TL_SCCO_CTPRVN.geojson";
        OlSeesun.ol.function.statsMap.column = "CTPRVN_CD";
        OlSeesun.ol.function.statsMap.setStatsMap( _mapView, data, unit, type);
    }
}
OlSeesun.ol.eventhandler.btnEventHandler = new eventhandlerButtonClass();