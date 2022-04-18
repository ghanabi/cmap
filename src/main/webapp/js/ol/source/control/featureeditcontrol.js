/**
 * 편집 컨트롤
 */
function featureEditControlClass(){
    this.featureSelectInteraction = null; /*select 컨트롤*/
    this.selectFeature = null;
    this.selectFeatureStyle = null;
    this.oldSelectFeat = null;
    this.translationInteraction = null; /*이동 컨트롤*/
    this.modifyInteraction = null; /*편집 컨트롤*/
    this.drawingStyle = null;
    this.drawInteraction = null;
    this.drawStyle = null;
    this.oldPolygonize = null; /*나누어진 도형 자를때 사용하는 함수*/
    this.sketch = null;
    this.drawingFeature  = null;
    /**
     * 도형 편집 컨트롤 정의
     * @param _mapView
     * @param _layerId
     * @param _type
     * @param _selectType
     * @param _analysisType
     * @param _bufferOpt
     * @param _cllBackFunction
     */
    featureEditControlClass.prototype.initEditeTool = function ( _mapView, _layerId ,_type, _selectType, _analysisType, _bufferOpt ,_cllBackFunction ){
        this.clearDrawTool( _mapView );
        this.selectFeatureStyle =this.initDrawingSelectStyle( _mapView );
        this.drawingStyle = this.initDrawingStyle( _mapView );
        this.drawStyle  = this.initDrawStyle( _mapView );

        switch ( _type ){
            case "Select": /*도형 선택*/
                this.featureSelect( _mapView, _layerId ,_selectType , _analysisType, _cllBackFunction);
                break;
        }
    }

    /**
     * 도형 선택
     * @param _mapView
     */
    featureEditControlClass.prototype.featureSelect = function ( _mapView, _layerId ,_selectType, _analysisType, _cllBackFunction ){
        var _this = this;
        this.featureSelectInteraction = new ol.interaction.Select({
            layers : function ( _layers ){
                return _layers.get('selectable') == true;
            }
        });

        ol.interaction.Transform.prototype.Cursors['rotate'] = 'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXAgMAAACdRDwzAAAAAXNSR0IArs4c6QAAAAlQTFRF////////AAAAjvTD7AAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2wwSEgUFmXJDjQAAAEZJREFUCNdjYMAOuCCk6goQpbp0GpRSAFKcqdNmQKgIILUoNAxIMUWFhoKosNDQBKDgVAilCqcaQBogFFNoGNjsqSgUTgAAM3ES8k912EAAAAAASUVORK5CYII=\') 5 5, auto';
        ol.interaction.Transform.prototype.Cursors['rotate0'] = 'url(\'data:image/png;base64,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\') 5 5, auto';

        /*이벤트 등록*/
        _mapView.addInteraction(this.featureSelectInteraction);
        /*선택되었을때 이벤트*/
        this.featureSelectInteraction.on ( 'select', function(evt){
            var layer  = OlSeesun.ol.control.layerControl.retriveOlLayer( _layerId, _mapView );
            var layerSource = layer.getSource();

            if(evt.selected.length > 0) {
                //ske.setStyle(_this.drawingStyle);
                /*선택된 도형*/
                _this.selectFeature = evt.selected[0];
                _this.selectFeature.setStyle(_this.selectFeatureStyle);

                switch ( _selectType ) {
                    case "Select": /*도령 선택 이벤트*/
                        /*이전 선택된 도형은 올래 색갈로 변경*/
                        _this.clearSelectFeature(_mapView);
                        _this.oldSelectFeature = evt.selected[0];
                        break;
                    case "Move" : /*도형이동*/
                        _this.translationInteraction = new ol.interaction.Translate({
                            features: OlSeesun.ol.control.feature.edit.featureSelectInteraction.getFeatures()
                        });
                        _mapView.addInteraction(_this.translationInteraction);

                        /*이전 색깔 돌리기*/
                        _this.clearSelectFeature(_mapView);
                        _this.oldSelectFeature = evt.selected[0];
                        break;
                    case "Modify" : /*도형 편집*/
                        _this.modifyInteraction = new ol.interaction.Modify({
                            features: OlSeesun.ol.control.feature.edit.featureSelectInteraction.getFeatures()
                        });
                        _mapView.addInteraction(_this.modifyInteraction);
                        /*이전 색깔 돌리기*/
                        _this.clearSelectFeature(_mapView);
                        _this.oldSelectFeature = evt.selected[0];
                        break;
                    case "Delete" :  /*도형 삭제*/
                        OlSeesun.ol.control.feature.removeFeature( layerSource, evt.selected[0] );
                        break;
                    case "Clone" :
                        var cloneFeature = evt.selected[0].clone();
                        layerSource.addFeature(cloneFeature);
                        /*이전 색깔 돌리기*/
                        _this.clearSelectFeature(_mapView);
                        _this.oldSelectFeature = evt.selected[0];
                        break;
                    case "Intersection" : /*교집합*/
                    case "Union" : /*합집합*/
                    case "Difference": /*차집합*/
                    case "SymDifference" : /*교집합 영역 절단*/
                        /* 이전레이에 값이 있는지 없는지 확인 */
                        if (_this.oldSelectFeature == null) {
                            _this.oldSelectFeature = evt.selected[0];
                        } else {
                            var feature1 = OlSeesun.ol.control.feature.initFeatureToFeature(_this.oldSelectFeature);
                            var feature2 = OlSeesun.ol.control.feature.initFeatureToFeature(_this.selectFeature);
                            var resultFeature = null;

                            switch ( _selectType ){
                                case "Intersection" : /*교집합*/
                                    resultFeature =  OlSeesun.ol.control.feature.setIntersection(feature1, feature2);
                                    resultFeature.drawType = "Polygon";
                                    break;
                                case "Union" : /*합집합*/
                                    resultFeature =  OlSeesun.ol.control.feature.setUnion(feature1, feature2);
                                    resultFeature.drawType = "Polygon";
                                    break;
                                case "Difference" :
                                    resultFeature = OlSeesun.ol.control.feature.setDifference(feature1, feature2);
                                    resultFeature.drawType = "Polygon";
                                    break;
                                case "SymDifference": /*교차되는지점 빵구 뚫기*/
                                    resultFeature = OlSeesun.ol.control.feature.setSymDifference(feature1, feature2);
                                    resultFeature.drawType = "symDifference";
                                    break;
                                // case "Hole": /*교차되는지점 빵구 뚫기*/
                                //     var intersection =  OlSeesun.ol.control.feature.setIntersection(feature1, feature2);
                                //     resultFeature = OlSeesun.ol.control.feature.setSymDifference(feature1, intersection);
                                //     resultFeature.drawType = "hole";
                                //     break;
                            }
                            if (resultFeature.getGeometry().getCoordinates().length > 0) {
                                resultFeature.setStyle(_this.drawingStyle);
                                layerSource.addFeature(resultFeature);
                                /*교차 이전지점 레이어 삭제*/
                                OlSeesun.ol.control.feature.removeFeature(layerSource, _this.oldSelectFeature);
                                OlSeesun.ol.control.feature.removeFeature(layerSource, _this.selectFeature);
                                _this.oldSelectFeature = null;
                                _this.selectFeature = null;
                                /*공간검색 기능이 있는경우 해당 함수 실행*/
                                if( _analysisType != null ){
                                    OlSeesun.publics.LoadingBar.startProgress("지도분석중입니다.")

                                    setTimeout(function() {
                                        /*도형으로 공간검색*/
                                        switch (  _analysisType ){
                                            case "oneDraw" :
                                                /*도형으로 공간검색*/
                                                OlSeesun.ol.function.analysis.getFeaturePostTypeMap( _mapView, "Polygon" ,resultFeature, null ,_cllBackFunction );
                                                break;
                                            case "db" :
                                                OlSeesun.ol.function.analysisPostgres.retriveAnalysisPostgres( _mapView, "Polygon" ,resultFeature, null ,_cllBackFunction );
                                                break;
                                        }
                                    },500);
                                }
                                _mapView.removeInteraction(OlSeesun.ol.control.feature.edit.featureSelectInteraction); /*선택 해제*/
                            } else {
                                alert("교차하는 도형이 없습니다. 다시 선택 하여 주십시오오");
                                /* 색상 초기화 */
                                OlSeesun.ol.control.feature.setStyle(_this.oldSelectFeature, _this.drawingStyle);
                                OlSeesun.ol.control.feature.setStyle(_this.selectFeature, _this.drawingStyle);
                                _this.oldSelectFeature = null;
                                _this.selectFeature = null;
                            }
                        }
                        break;
                    case "Polygonizer" : /*도형분할*/
                        /*이전 선택된 도형은 올래 색갈로 변경*/
                        _this.clearSelectFeature(_mapView);
                        _this.oldSelectFeature = evt.selected[0];
                        _mapView.removeInteraction(this.featureSelectInteraction); /*선택 해제*/
                        _this.drawing( _mapView, "LinePolygonizer", "Line" , layer);
                        break;
                    case "Hole" :
                        _this.clearSelectFeature(_mapView);
                        _this.oldSelectFeature = evt.selected[0];
                        _mapView.removeInteraction(this.featureSelectInteraction); /*선택 해제*/
                        _this.drawing( _mapView, "Polygon", "Polygon" , layer);
                        break;
                }
            }
        });
    }
    /**
     *
     * @param _mapView
     * @param _type
     * @param _drawType
     * @param _soruce
     */
    featureEditControlClass.prototype.drawing = function ( _mapView, _type, _drawType , _layer ){
        var _soruce = _layer.getSource();

        if( _type == "Polygon" ){
            this.drawInteraction = new ol.interaction.DrawHole ({
                layers: [ _layer ]
            });
            _mapView.addInteraction(this.drawInteraction);
            /* 핸들러 시작이벤트 */
            OlSeesun.ol.control.feature.edit.drawInteraction.on('drawstart',function(evt){
                OlSeesun.ol.control.feature.edit.sketch = evt.feature;
                OlSeesun.ol.control.feature.edit.sketch.setStyle( OlSeesun.ol.control.feature.edit.drawStyle );
            },this);

            /*핸들러 끝나는 시점*/
            OlSeesun.ol.control.feature.edit.drawInteraction.on('drawend',function(evt){
                OlSeesun.ol.control.feature.edit.sketch = null;
                var ske = evt.feature;
                if(ske) {
                    ske.setStyle(OlSeesun.ol.control.feature.edit.drawingStyle);
                    ske.drawType = _drawType;
                    _mapView.removeInteraction(OlSeesun.ol.control.feature.edit.drawInteraction); /*선택 해제*/

                }
            },this);
            //this.drawInteraction.setActive(true);
        }else{
            var _this = this;
            var type = null;

            if( _type =="LinePolygonizer" ){
                type =  "LineString";
            }else{
                type = _type;
            }
            /*그리기 이벤트 등록*/
            this.drawInteraction =  new ol.interaction.Draw({
                id : 'drawInteraction',
                source : _soruce,
                type : type,
                style : OlSeesun.ol.control.feature.edit.drawStyle
            });
            /* 핸들러 등록 */
            _mapView.addInteraction( this.drawInteraction );

            /* 핸들러 시작이벤트 */
            OlSeesun.ol.control.feature.edit.drawInteraction.on('drawstart',function(evt){
                if(OlSeesun.ol.control.feature.edit.oldPolygonize != null){
                    OlSeesun.ol.control.feature.edit.removeFeature( _soruce , OlSeesun.ol.control.feature.edit.oldPolygonize);
                }
                OlSeesun.ol.control.feature.edit.sketch = evt.feature;
                OlSeesun.ol.control.feature.edit.sketch.setStyle( OlSeesun.ol.control.feature.edit.drawStyle );
            }, this);

            /*핸들러 끝나는 시점*/
            OlSeesun.ol.control.feature.edit.drawInteraction.on('drawend',function(evt){
                var ske = evt.feature;
                if(ske){
                    ske.setStyle( OlSeesun.ol.control.feature.edit.drawingStyle);
                    ske.drawType = _drawType;
                    switch ( _type ){
                        case "LinePolygonizer" : /* 도형분활 */
                            var lineString = OlSeesun.ol.control.feature.initFeatureToFeature( ske);
                            var feature = OlSeesun.ol.control.feature.initFeatureToFeature( OlSeesun.ol.control.feature.edit.selectFeature);
                            var resultFeature = null;
                            resultFeature = OlSeesun.ol.control.feature.setPolygonizer(feature, lineString);
                            //resultFeature.drawType = "symDifference";
                            if(resultFeature.size() > 1){
                                /*분활된 도형처리*/
                                for (var i = resultFeature.iterator(); i.hasNext();) {
                                    var polygon = i.next();
                                    var resultFeature =  OlSeesun.ol.control.feature.retriveWriter(polygon);
                                    resultFeature.setStyle( OlSeesun.ol.control.feature.edit.drawingStyle);
                                    _soruce.addFeature(resultFeature);
                                }
                                /*교차 이전지점 레이어 삭제*/
                                OlSeesun.ol.control.feature.removeFeature(_soruce, OlSeesun.ol.control.feature.edit.selectFeature);
                                OlSeesun.ol.control.feature.edit.drawingFeature = ske;
                                OlSeesun.ol.control.feature.edit.oldSelectFeature = null;
                                OlSeesun.ol.control.feature.edit.selectFeature = null;
                                OlSeesun.ol.control.feature.edit.clearDrawingFeature( _mapView, _soruce ,500 );
                            }else{
                                alert("잘못 그려진 영역입니다.");
                                OlSeesun.ol.control.feature.edit.oldPolygonize = ske;
                            }
                            break;
                    }
                }
                _this.sketch = null;
            }, this);
        }

    }
    /**
     *   도형그리기 이벤트 삭제
     * @param _mapView
     */
    featureEditControlClass.prototype.clearDrawingFeature = function ( _mapView, _soruce, _timeOut ){
        _mapView.removeInteraction(this.drawInteraction);  /*그리기 초기화*/
        setTimeout(function() {
            OlSeesun.ol.control.feature.removeFeature(_soruce, OlSeesun.ol.control.feature.edit.drawingFeature);
        },_timeOut); // 500ms(0.5초)가 경과하면 이 함수가 실행됩니다.
    }
    /**
     * 선택된 도형있는경우 초기화
     * @param _mapView
     */
    featureEditControlClass.prototype.clearSelectFeature = function ( _mapView ){
        if( this.oldSelectFeature != null ){
            this.oldSelectFeature.setStyle( OlSeesun.ol.control.feature.edit.initDrawingStyle());
        }
        this.oldSelectFeature =  null;
    }

    /**
     * 그리는 도중  스타일 정의
     * @param _mapView
     */
    featureEditControlClass.prototype.initDrawingStyle = function ( _mapView ){
        var drawingStyle  = new ol.style.Style({
            fill: new ol.style.Fill({
                color:  OlSeesun.ol.control.drawTool.fillColor,
            }),
            stroke: new ol.style.Stroke({
                color: OlSeesun.ol.control.drawTool.strokeColor,
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 3,
                fill: new ol.style.Fill({
                    color: 'rgba(0, 153, 255, 0.8)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 0, 0, 0.8)'
                })
            })
        });

        return drawingStyle;
    }
    /**
        * 그리기 이후 스타일
    * @param _mapView
    */
    featureEditControlClass.prototype.initDrawStyle = function ( _mapView ){
        var circle = new ol.style.RegularShape({
            fill: new ol.style.Fill({color:[255,255,255,0.01]}),
            stroke: new ol.style.Stroke({width:1, color:[0,0,0,0.01]}),
            radius: 8,
            points: 10
        });

        var drawStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.3)',
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(255, 0, 0, 1)',
                width: 2
            }),
            text: new ol.style.Text ({
                text:'\uf0e2',
                font:"16px Fontawesome",
                textAlign: "left",
                fill:new ol.style.Fill({color:'red'})
            }),
            image: circle
        });
        return drawStyle;
    }

    /**
     * 도형선택시 스타일 정의
     * @param _mapView
     */
    featureEditControlClass.prototype.initDrawingSelectStyle = function ( _mapView ){
        var drawingSelectStyle  = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(231,114,0,0.8)',
            }),
            stroke: new ol.style.Stroke({
                color: 'rgb(0,255,55,0.8)',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 3,
                fill: new ol.style.Fill({
                    color: 'rgba(52,153,65,0.8)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(133,155,206,0.8)'
                })
            })
        });
        return drawingSelectStyle;
    }


    /**
     * 그리기툴 초기화
     * @param _mapView
     */
    featureEditControlClass.prototype.clearDrawTool = function ( _mapView ){
        _mapView.removeInteraction(this.drawInteraction);  /*그리기 초기화*/
        _mapView.removeInteraction(this.featureSelectInteraction); /*선택 해제*/
        _mapView.removeInteraction(this.translationInteraction); /*이동기능 삭제*/
        _mapView.removeInteraction(this.modifyInteraction); /*도형 수정 기능 삭제*/

        /*그리기 선택시 도형초기화*/
        this.clearSelectFeature( _mapView );
    }
    /**
     * 색상 RGB 값으로 교체
     * @param hex
     * @param opacity
     * @returns {string}
     */
    featureEditControlClass.prototype.hexToRgb = function(hex, opacity) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);

        var result = 'rgba(' + r + ',' + g + ',' + b + ',' + (opacity / 100) + ')';
        return result;
    }
}
OlSeesun.ol.control.feature.edit =  new featureEditControlClass();


