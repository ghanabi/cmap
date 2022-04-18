/**
 * 그리기도구
 */
function drawToolControlClass(){
    this.fillColor = 'rgba(255, 255, 255, 1)'; /* 초기 fillColor 값 */
    this.strokeColor = 'rgba(0, 0, 0, 1)';/* 초기 strokeColor 값 */
    this.drawInteraction = null; /*그리기 핸들러 이벤트*/
    this.geoMetryFunc = null;
    this.sketch = null; /* 그려진 도형 가지고 있는 함수 */
    this.drawSource = null;
    this.drawStyle = null; /* 그리기 스타일*/
    this.drawingStyle = null; /* 그려진 이후  */
    this.drawLayer = null; /* 그리기 레이어 */
    this.imgStyle = null; /*img 스타일*/
    this.featureSelectInteraction = null; /* 도형 선택 이벤트 */
    this.selectFeature =  null; /*선택한 백터*/
    this.oldSelectFeature = null; /*이전 선택한 백터*/
    this.selectFeatureStyle = null; /*선택된 도형의 스타일*/
    this.modifyInteraction = null; /*도형 편집 이벤트*/
    this.translationInteraction = null; /* 도형 이동 */
    this.drawingFeature = null; /*나누어진 도형 자를때 사용하는 함수*/
    this.oldPolygonize = null; /*나누어진 도형 자를때 사용하는 함수*/
    this.modifySplit = null; /*라인 분할*/


    /**
     * 초기 생성값
     * @param _mapView
     */
    drawToolControlClass.prototype.initDrawSetting = function ( _mapView ){
        this.drawStyle  = this.initDrawStyle( _mapView );
        this.drawingStyle = this.initDrawingStyle( _mapView );
        this.drawSource = this.initDrawSourceVector( _mapView );
        this.selectFeatureStyle = this.initDrawingSelectStyle( _mapView );
    }

    /**
     * 그리기 툴 정의
     * @param _mapView
     * @param _type   그리기 타입
     * @param _selectType select 되었을때 실행되는 타입
     * @param _analysisType   공간분석 타입인지 확인
     * @param _bufferOpt 버퍼검색 옵션
     * @param _cllBackFunction 공간검색 콜백 함수
     */
    drawToolControlClass.prototype.initDrawTool = function ( _mapView, _type, _selectType, _analysisType, _bufferOpt ,_cllBackFunction ){
        this.clearDrawTool( _mapView ); /*그리기툴 초기화*/

        this.geoMetryFunc = null;

        /*그리기 레이어가 있는지 없는지 확인*/
        var drawLayer =  OlSeesun.ol.control.layerControl.retriveOlLayerName( _mapView, 'drawLayer' );
        if(drawLayer == null) {
            this.initDrawLayer( _mapView );
        }
        switch ( _type ){
            case "Point" : /*점그리기*/
                this.drawing( _mapView, _type, "Point" , _analysisType, _bufferOpt ,_cllBackFunction);
                break;
            case "LineString": /* 선그리기 */
                this.drawing( _mapView, _type, "Line" , _analysisType, _bufferOpt ,_cllBackFunction);
                break;
            case "Rectangle" : /*사각형*/
                this.geoMetryFunc = ol.interaction.Draw.createBox();
                this.drawing( _mapView, "Circle", "Rectangle", _analysisType, _bufferOpt,_cllBackFunction);
                break;
            case "Circle" : /*원형*/
                this.drawing( _mapView, _type, "Circle" , _analysisType, _bufferOpt, _cllBackFunction);
                break;
            case "Polygon": /*다각형*/
                this.drawing( _mapView, _type, "Polygon" , _analysisType, _bufferOpt, _cllBackFunction);
                break;
            case "Clear" : /*도형 삭제*/
                this.clearDrawFeature( _mapView );
                break;
        }
    }

    /**
     * 그리기
     * @param _mapView
     * @param _type      그리기타입
     * @param _drawType  도형타입
     * @param _analysisType  공간분석인경우
     * @param _bufferOpt 버퍼검색옵션
     * @param _cllBackFunction  콜백함수
     * 
     */

    drawToolControlClass.prototype.drawing = function ( _mapView, _type, _drawType, _analysisType, _bufferOpt, _cllBackFunction ){
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
            source : OlSeesun.ol.control.drawTool.drawSource,
            type : type,
            style : this.drawStyle,
            geometryFunction: OlSeesun.ol.control.drawTool.geoMetryFunc
        });
        /* 핸들러 등록 */
        _mapView.addInteraction( this.drawInteraction );

        /* 핸들러 시작이벤트 */
        OlSeesun.ol.control.drawTool.drawInteraction.on('drawstart',function(evt){
            if(OlSeesun.ol.control.drawTool.oldPolygonize != null){
                OlSeesun.ol.control.feature.removeFeature(OlSeesun.ol.control.drawTool.drawSource, OlSeesun.ol.control.drawTool.oldPolygonize);
            }
            OlSeesun.ol.control.drawTool.sketch = evt.feature;
            OlSeesun.ol.control.drawTool.sketch.setStyle( OlSeesun.ol.control.drawTool.drawStyle );
        }, this);

        /*핸들러 끝나는 시점*/
        OlSeesun.ol.control.drawTool.drawInteraction.on('drawend',function(evt){
            var ske = evt.feature;

            if(ske){
                ske.setStyle(OlSeesun.ol.control.drawTool.drawingStyle);
                ske.drawType = _drawType;
                switch ( _type ){
                    case "LinePolygonizer" : /* 도형분활 */
                        break;
                    default : /*공간검색시 사용 할 함수*/
                        if( _analysisType != null ){
                            OlSeesun.ol.control.drawTool.drawingFeature = ske;
                            OlSeesun.publics.LoadingBar.startProgress("지도분석중입니다.")
                            console.log(_analysisType);
                            setTimeout(function() {
                                switch (  _analysisType ){
                                    case "oneDraw" :
                                        /*도형으로 공간검색*/
                                        OlSeesun.ol.function.analysis.getFeaturePostTypeMap( _mapView, _drawType ,ske, _bufferOpt ,_cllBackFunction );
                                        break;
                                    case "db" :
                                        OlSeesun.ol.function.analysisPostgres.retriveAnalysisPostgres( _mapView, _drawType ,ske, _bufferOpt ,_cllBackFunction );
                                        break;
                                }
                                if( _analysisType == "oneDraw" || _analysisType == "db"){
                                    OlSeesun.ol.control.drawTool.clearDrawingFeature( _mapView, 1000 );
                                }
                            }, 500); // 5000ms(5초)가 경과하면 이 함수가 실행합니다.
                        }
                        break;
                }
            }
            _this.sketch = null;
        }, this);
    }

    /**
     * 드로우 레이어 생성
     * @param _mapView
     */
    drawToolControlClass.prototype.initDrawLayer = function ( _mapView ){
        var _this = this;
        var drawLayer =  OlSeesun.ol.control.layerControl.retriveOlLayer("drawLayer", _mapView);

        if( drawLayer != null ){
            return;
        }
        this.initDrawSetting( _mapView );
        /**
         * 그리기 백터 생성
         */
        this.drawLayer = new ol.layer.Vector({
            source: _this.drawSource,
            id:"drawLayer",
            style:new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 0, 0, 1)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 0, 0, 1)',
                    width: 2
                }),
            }),
            style: function(feature, resolution) {
                OlSeesun.ol.control.drawTool.imgStyle.getImage().setScale(1/Math.pow(resolution, 1/3));
                return iconStyle;
            }
        });
        this.drawLayer.setZIndex( 100 );
        _mapView.addLayer( this.drawLayer );
        /*백터 레이어 관리하는 부분에 추가*/
        OlSeesun.ol.control.layerControl.layers.vectorLayer.push("drawLayer");

        var retriveLayer =   OlSeesun.ol.control.layerControl.retriveOlLayer("drawLayer", _mapView);
        retriveLayer.set('selectable', true);
    }
    /**
     * 이미지 스타일
     * @param _url
     * @returns {*}
     */
    drawToolControlClass.prototype.imgStyles = function ( _url ){
        var imgStyle = new ol.style.Style({
            image: new ol.style.Icon({
                src: _url,
                scale : 0.5,
            })
        });
        return imgStyle;
    }

    /**
     * 그리기 이후 스타일
     * @param _mapView
     */
    drawToolControlClass.prototype.initDrawStyle = function ( _mapView ){
        var drawStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.3)',
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(255, 0, 0, 1)',
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
        return drawStyle;
    }
    /**
     * 그리는 도중  스타일 정의
     * @param _mapView
     */
    drawToolControlClass.prototype.initDrawingStyle = function ( _mapView ){
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
     * 도형선택시 스타일 정의
     * @param _mapView
     */
    drawToolControlClass.prototype.initDrawingSelectStyle = function ( _mapView ){
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
    drawToolControlClass.prototype.clearDrawFeature = function ( _mapView ){
        this.drawSource.clear();
    }

    /**
     * 그리기툴 백터 Source 생성
     * @param _mapView
     */
    drawToolControlClass.prototype.initDrawSourceVector = function ( _mapView ){
        return new ol.source.Vector();
    }

    /**
     * 그리기툴 초기화
     * @param _mapView
     */
    drawToolControlClass.prototype.clearDrawTool = function ( _mapView ){
        _mapView.removeInteraction(this.drawInteraction);  /*그리기 초기화*/
    }

    /**
     *   도형그리기 이벤트 삭제
     * @param _mapView
     */
    drawToolControlClass.prototype.clearDrawingFeature = function ( _mapView, _timeOut ){
        _mapView.removeInteraction(this.drawInteraction);  /*그리기 초기화*/
        setTimeout(function() {
            OlSeesun.ol.control.feature.removeFeature(OlSeesun.ol.control.drawTool.drawSource, OlSeesun.ol.control.drawTool.drawingFeature);
        },_timeOut); // 500ms(0.5초)가 경과하면 이 함수가 실행됩니다.
    }


    /**
     * 선택된 도형있는경우 초기화
     * @param _mapView
     */
    drawToolControlClass.prototype.clearSelectFeature = function ( _mapView ){
        if( this.oldSelectFeature != null ){
            this.oldSelectFeature.setStyle(this.drawingStyle);
        }
        this.oldSelectFeature =  null;
    }

}
OlSeesun.ol.control.drawTool = new drawToolControlClass();