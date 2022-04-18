/**
 * 측정도구
 */
function measuringControlClass (){

    this.style = null; /* 측정도구 스타일 */
    this.source = null /* source(백터 안에 들어가게 객체) */
    this.measuringTool = null; /* 백터 레이어 */
    this.wgs84Sphere = null;   /*거리나 면적 측정시 거리계산을 위한 좌표*/
    this.middleCoords_length = null;
    this.sketch = null;
    this.tpOverLayArr = [];

    this.measuringToolInteraction = null; /*측정도구 컨트롤 이벤트*/
    this.measureTooltipMiddleElement = null; /*그리기툴 결과값을 저장 하기 위한 함수*/
    this.measureTooltipMiddle = null; /*결과값을 담고 있는 Overlayer 값*/
    this.measureType = null; /*그리기 타입*/

    /**
     * 측정도구 초기화
     * @param _mapView 맴객체
     * @param _option  측정도구 옵션
     */
    measuringControlClass.prototype.initMeasuringTool = function ( _mapView, _option ){
        this.initStyle( _mapView ); /*스타일 초기화*/
        this.initLayer( _mapView ); /*레이어 초기화*/

        /*거리나 면적 측정시 거리계산을 위한 좌표*/
        //this.wgs84Sphere = new ol.Sphere(6378137);
        this.middleCoords_length = 0;
        this.sketch = null;

        switch( _option ){
            /* 거리재기 초기화 */
            case "DistanceMeasurement":
                OlSeesun.ol.control.measuringTool.tpOverLayArr = [];
                this.InitInteraction( _mapView ,"LineString");
                this.DistanceHandler( _mapView );
                this.measureInitMeasurePopup( _mapView );
                this.measurePopupMoveEvent( _mapView );
                break;
            /* 면적재기 초기화 */
            case "AreaMeasurement":
                this.InitInteraction( _mapView,"Polygon");
                this.AreaHandler( _mapView );
                this.measureInitMeasurePopup( _mapView );
                this.measurePopupMoveEvent( _mapView );
                 break;
            /* 반경재기 초기화 */
            case "CircleMeasurement":
                 this.InitInteraction( _mapView, "Circle");
                 this.RadiusHandler( _mapView );
                 this.measureInitMeasurePopup( _mapView );
                 this.measurePopupMoveEvent( _mapView );
                 break;
        }
    }

    /**
     * 그리기툴 컨트롤 이벤트
     * @param _mapView
     * @param _type
     * @constructor
     */
    measuringControlClass.prototype.InitInteraction = function ( _mapView, _type ){
        var _this = this;
        /*그리기 컨트롤 죽이기*/
        if(OlSeesun.ol.control.measuringTool.measuringToolInteraction != null){
            _mapView.removeInteraction( OlSeesun.ol.control.measuringTool.measuringToolInteraction );
        }
        /*측정도구에따른 이벤트 분기*/
        switch ( _type ){
            case "LineString":
                /*측정도구 컨트롤 등록*/
                OlSeesun.ol.control.measuringTool.measuringToolInteraction = new ol.interaction.Draw({
                    source : this.source,
                    type : _type, /* 그리기 타입 */
                    style : this.style, /* 스타일 */
                    /* 지오메트리 함수 */
                    geometryFunction : function( _coords, _geom ){
                        /*_geom 값이 없는 경우 라인스트링에 NULL 값을 삽입*/
                        if (!_geom) {
                            _geom = new ol.geom.LineString([0,0]);
                        }
                        _geom.setCoordinates(_coords); /* 지오메트리의 좌표를 설정 */
                        if (_coords.length > _this.middleCoords_length) {
                            /*넣어진 좌표값의 총 길이를 middleCoords_length 넣는다.*/
                            _this.middleCoords_length = _coords.length;
                            /*점 좌표가 2개 이상인경우 라인 측정을 시작*/
                            if (_this.middleCoords_length > 2) {
                                var length = 0;
                                /*좌표계 설정*/
                                var sourceProj = _mapView.getView().getProjection();

                                /*길이 측정*/
                                for (var i = 0, ii = _this.middleCoords_length - 2; i < ii; i++) {
                                    var c1 = OlSeesun.ol.transforms.transform(_coords[i], sourceProj, 'EPSG:4326');
                                    var c2 = OlSeesun.ol.transforms.transform(_coords[i + 1], sourceProj, 'EPSG:4326');
                                    /*길이를 측정한 결과값 을 가지고 있는 함수 */
                                    length += ol.sphere.getDistance(c1, c2);
                                     //this.wgs84Sphere.haversineDistance(c1, c2);


                                }
                                var middleLength = length;
                                middleLength = $('#lengthValue').text() + " " + $('#valuelengthType').text();
                                OlSeesun.ol.control.measuringTool.createMeasureTooltipMiddle( _mapView, middleLength, _coords[ _this.middleCoords_length - 2]);
                            }
                        }
                        return _geom;
                    }
                });
                break;
            case "Polygon":
            case "Circle" :
                OlSeesun.ol.control.measuringTool.measuringToolInteraction = new ol.interaction.Draw({
                    source : this.source,
                    type : _type,
                    style : this.style,
                });
                break;
        }
        this.measureType = _type;
        /*컨트롤 등록*/
        mapView.addInteraction(OlSeesun.ol.control.measuringTool.measuringToolInteraction);
    }

    /**
     * 측정도구 측정결과 표출 팝업 만드는 함수
     * @param _mapView 맵객체
     * @param _output  결과값
     * @param _coordinate 결과값 좌표
     */
    measuringControlClass.prototype.createMeasureTooltipMiddle = function ( _mapView, _output, _coordinate ){
        this.measureTooltipMiddleElement = document.createElement('div'); /*Div 객체 만들기*/
        this.measureTooltipMiddleElement.className = 'tooltip-static'; /*스타일 클래스명 */
        this.measureTooltipMiddleElement.innerHTML = _output; /*결과값*/
        /*결과를 팝업으로 올리기 위한 함수*/
        this.measureTooltipMiddle = new ol.Overlay({
            element : this.measureTooltipMiddleElement,
            offset : [ 0, -18 ],
            positioning : 'bottom-center'
        });
        /*좌표값 설정*/
        this.measureTooltipMiddle.setPosition(_coordinate);
        /*팝업창 좌표를 설정*/
        OlSeesun.ol.control.measuringTool.tpOverLayArr.push(this.measureTooltipMiddle);
        _mapView.addOverlay(this.measureTooltipMiddle);
    }

    /**
     * 거리재기 핸들러
     * @param _mapView
     * @constructor 맴객체
     */
    measuringControlClass.prototype.DistanceHandler = function( _mapView ){
        /*this 함수 정의*/
        var _this = this;
        this.createMeasureTooltip( _mapView );
        /* 지도위에 폴리곤입력 시작할 때 이벤트 선언 */
        OlSeesun.ol.control.measuringTool.measuringToolInteraction.on('drawstart', function(event) {
            $('.MeasureInfo').html("더블클릭하면 현재지점<br>에서 종료합니다.");
            _this.sketch = event.feature;
        }, this);
        
        /* 지도위에 폴리곤입력 종료할 때 이벤트 선언 */
        OlSeesun.ol.control.measuringTool.measuringToolInteraction.on('drawend', function(evt) {
            var ske = evt.feature;
            if (ske) {
                var output = '';
                /* 지오메트리갑 */
                var geom = (ske.getGeometry());
                /*결과값*/
                output = "총거리: " + $('#lengthValue').text() + " " + $('#valuelengthType').text();
                var tooltipCoord = geom.getLastCoordinate();
                _this.measureTooltipElement.innerHTML = output;
                _this.measureTooltip.setPosition(tooltipCoord);
                _this.measureTooltipElement.className = 'tooltip tooltip-static';
                _this.measureTooltip.setOffset([ 0, -7 ]);
            }
            _this.sketch = null;
            _this.measureTooltipElement = null;
            mapView.removeOverlay( _this.measureTooltipMiddle );
            _this.measureTooltipMiddleElement = null;
            _this.middleCoords_length = 0;
            _this.createMeasureTooltip( _mapView );
            $('.MeasureInfo').html("마우스 왼쪽 클릭하면<br>측정 시작합니다.");
            $('.MeasureColor').html(0);
            _this.tpOverLayArr = [];
        }, this);
    }

    /**
     * 면적측정 컨트롤
     * @param mapView
     */
    measuringControlClass.prototype.AreaHandler = function( _mapView ){
        var _this = this;
        this.createMeasureTooltip( _mapView );
        /* 지도위에 폴리곤입력 시작할 때 이벤트 선언 */
        OlSeesun.ol.control.measuringTool.measuringToolInteraction.on('drawstart', function(event) {
            $('.MeasureInfo').html("더블클릭하면 현재지점<br>에서 종료합니다.");
            _this.sketch = event.feature;
        }, this);

        /* 지도위에 폴리곤입력 종료할 때 이벤트 선언 */
        OlSeesun.ol.control.measuringTool.measuringToolInteraction.on('drawend', function(evt) {
            var ske = evt.feature;
            if (ske) {
                var geom = (ske.getGeometry());
                output = '면적 : ' + Number($('#areaValue').text()).toFixed(2) + $('#valueAreaType').text() + '<sup>2</sup>';
                var tooltipCoord = geom.getInteriorPoint().getCoordinates();
                _this.measureTooltipElement.innerHTML = output;
                _this.measureTooltip.setPosition(tooltipCoord);
                _this.measureTooltipElement.className = 'tooltip tooltip-static';
                _this.measureTooltip.setOffset([ 0, -7 ]);
            }
            _this.sketch = null;
            _this.measureTooltipElement = null;
            _this.createMeasureTooltip( _mapView );
            $('.MeasureInfo').html("마우스 왼쪽 클릭하면<br>측정 시작합니다.");
            $('.MeasureColor').html(0);
        }, this);
    }

    /**
     * 반경측정
     * @param _mapView
     * @constructor
     */
    measuringControlClass.prototype.RadiusHandler = function( _mapView ){
        var _this = this;
        this.createMeasureTooltip( _mapView );
        // 지도위에 폴리곤입력 시작할 때 이벤트 선언
        OlSeesun.ol.control.measuringTool.measuringToolInteraction.on('drawstart', function(event) {
            $('.MeasureInfo').html("클릭하면 현재지점<br>에서 종료합니다.");
            _this.sketch = event.feature;
        }, this);

        // 지도위에 폴리곤입력 종료할 때 이벤트 선언
        OlSeesun.ol.control.measuringTool.measuringToolInteraction.on('drawend', function(evt) {
            var ske = evt.feature;
            if (ske) {
                var output = '';
                var geom = (ske.getGeometry());
                output = '반경 : ' + Number($('#radiusValue').text()) + $('#valueradiusType').text() + '<sup>2</sup>';
                var tooltipCoord = geom.getCenter();
                _this.measureTooltipElement.innerHTML = output;
                _this.measureTooltip.setPosition(tooltipCoord);
                _this.measureTooltipElement.className = 'tooltip tooltip-static';
                _this.measureTooltip.setOffset([ 0, -7 ]);
            }

            _this.sketch = null;
            _this.measureTooltipElement = null;
            _this.createMeasureTooltip( _mapView );
            $('.MeasureInfo').html("마우스 왼쪽 클릭하면<br>측정 시작합니다.");
            $('.MeasureColor').html(0);
        }, this);
    }

    /**
     * 마우스 툴팀 생성
     * @param _mapView
     */
    measuringControlClass.prototype.createMeasureTooltip = function( _mapView ){
        this.measureTooltipElement = document.createElement('div'); /*거리측정할 DIV 생성*/
        this.measureTooltipElement.className = 'tooltip tooltip-measure'; /*글래스 설정*/
        /*Overlay 등록*/
        this.measureTooltip = new ol.Overlay({ 
            element : this.measureTooltipElement,
            offset : [ 0, -25 ],
            positioning : 'bottom-center'
        });

        /*Overlay 등록*/
        _mapView.addOverlay(this.measureTooltip);
    }

    /**
     * 측정도구 스타일
     * @param _mapView
     */
    measuringControlClass.prototype.initStyle = function ( _mapView ){
        /* 스타일이 있는경우 실행 안함 */
        if(this.style != null){
            return;
        }
        /*스타일 정의*/
        this.style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.3)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(255,0, 0, 0.8)',
                width: 2
            }),
        });
    }

    /**
     * 측정도구 레이어 추가
     * @param _mapView
     */
    measuringControlClass.prototype.initLayer = function ( _mapView ){
        var tpLayer = OlSeesun.ol.control.layerControl.retriveOlLayer("measuringTool", _mapView); /*측정도구 레이어 찾기*/
        /* 레이어가 있는경우 실행안함 */
        if(tpLayer != null && this.source != null){
            return;
        }
        this.source = new ol.source.Vector(); /*백터 안에 들어가는 객체*/
        /*백터 생성*/
        this.measuringTool = new ol.layer.Vector({
            id: "measuringTool",
            source: this.source, /*백터값*/
            style: this.style /*스타일*/
        });
        this.measuringTool.setZIndex(100); /*레이어 인텍스*/
        /*레이어 등록*/
        OlSeesun.ol.control.layerControl.addLayer( _mapView, this.measuringTool );
        /*백터 레이어 관리하는 부분에 추가*/
        OlSeesun.ol.control.layerControl.layers.vectorLayer.push("measuringTool");

    }

    /**
     * 측정도구 팝업 정의
     */
    measuringControlClass.prototype.measureInitMeasurePopup = function( _mapView ){
        var container = document.createElement('div');
        container.setAttribute("class", "measure_info");
        var content1 = document.createElement('div');
        content1.setAttribute("class", "MeasureLen");
        var content2 = document.createElement('div');
        content2.setAttribute("class", "MeasureInfo");
        var content1Context = "";
        var context2Context = "";

        if(this.measureType == "Polygon"){
            container.appendChild(content1);
            container.appendChild(content2);
            document.body.appendChild(container);
            content1Context += "총면적 : <span class='MeasureColor'>0</span>m";
            context2Context += "마우스 왼쪽 클릭하면<br>측정 시작 합니다.";
            content1.innerHTML = content1Context;
            content2.innerHTML = context2Context;
        }else if(this.measureType == "Circle"){
            container.appendChild(content1);
            container.appendChild(content2);
            document.body.appendChild(container);
            content1Context += "반경거리 : <span class='MeasureColor'>0</span>m";
            context2Context += "마우스 왼쪽 클릭하면<br>측정 시작 합니다.";
            content1.innerHTML = content1Context;
            content2.innerHTML = context2Context;
        }else if(this.measureType == "LineString"){
            container.appendChild(content1);
            container.appendChild(content2);
            document.body.appendChild(container);
            content1Context += "총거리 : <span class='MeasureColor'>0</span>m<sup>2</sup>";
            context2Context += "마우스 왼쪽 클릭하면<br>측정 시작 합니다.";
            content1.innerHTML = content1Context;
            content2.innerHTML = context2Context;
        }

        this.measurePopup = new ol.Overlay({
            element: container,
            offset : [15,5],
            id : "measureOverlay"
        });
        _mapView.addOverlay( this.measurePopup );
    }

    /**
     * 마우스 포인트 이동시 발생되는 이벤트
     * @param _mapView
     */
    measuringControlClass.prototype.measurePopupMoveEvent = function( _mapView ){
        var _this = this;
        var output = 0;
        /* 좌표가 이동될때 처리되는 함수 */
        _mapView.on('pointermove',function(event){
            var coordinate = event.coordinate; // 클릭한 지도 좌표
            _this.measurePopup.setPosition(coordinate);
            if(_this.sketch != null){
                if(_this.measureType == "Polygon"){
                    var area = _this.formatArea(_mapView , (_this.sketch.getGeometry()));
                    if (area > 1000000) {
                        area = (Math.round(area) / 1000000);
                        output = "총면적 : <span class='MeasureColor' id='areaValue'>" + area + "</span><span id='valueAreaType'>km</span><sup>2</sup>";
                    } else {
                        area = (Math.round(area * 100) / 100);
                        output = "총면적 : <span class='MeasureColor' id='areaValue'>" + area + "</span><span id='valueAreaType'>m</span><sup>2</sup>";
                    }
                }else if(_this.measureType == "Circle"){
                    //var radiusLength = _this.formatCircle( _mapView, coordinate);
                    var radiusLength = _this.formatCircle( _mapView, (_this.sketch.getGeometry()));
                    if (radiusLength > 1000) {
                        radiusLength = (Math.round(radiusLength * 100) / 100000);
                        output = "반경거리 : <span class='MeasureColor' id='radiusValue'>" + radiusLength + "</span><span id='valueradiusType'>km</span><sup>2</sup>";
                    } else {
                        radiusLength = (Math.round(radiusLength * 100) / 100);
                        output = "반경거리 : <span class='MeasureColor' id='radiusValue'>" + radiusLength + "</span><span id='valueradiusType'>m</span><sup>2</sup>";
                    }

                }else if(_this.measureType == "LineString"){
                    var length = _this.formatLength( _mapView, (_this.sketch.getGeometry()));
                    if (length > 1000) {
                        length = (Math.round(length * 100) / 100000);
                        output = "총거리 : <span class='MeasureColor' id='lengthValue'>" + length + "</span><span id='valuelengthType'>km</span>";
                    } else {
                        length = (Math.round(length * 100) / 100);
                        output = "총거리 : <span class='MeasureColor' id='lengthValue'>" + length + "</span><span id='valuelengthType'>m</span>";
                    }
                }
                $('.MeasureLen').html(output);
            }
        });
    }
    /**
     * 자동으로 거리 산정 (라인)
     * @param _mapView
     * @param _line
     * @returns {number}
     */
    measuringControlClass.prototype.formatLength = function( _mapView, _line ){
        var length;
        var coordinates = _line.getCoordinates();
        length = 0;
        var sourceProj = _mapView.getView().getProjection();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
            var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
            length +=  ol.sphere.getDistance(c1, c2); /*거리측정*/
        }
        return length;
    }
    /**
     * 자동으로 면적 산정(폴리건)
     * @param _mapView
     * @param _polygon
     * @returns {number|string}
     */
    measuringControlClass.prototype.formatArea = function( _mapView,  _polygon){
        var area;
        if(_polygon.getLinearRing(0).getCoordinates().length > 3){
            var sourceProj = _mapView.getView().getProjection();
            var geom = (_polygon.clone().transform(sourceProj, 'EPSG:4326'));
            var coordinates = geom.getLinearRing(0).getCoordinates();
            //area = Math.abs(this.wgs84Sphere.geodesicArea(coordinates));
            var polygon = turf.polygon(  [ coordinates ]  );
            area = turf.area( polygon ).toFixed( 1 );
        }else{
            area = 0;
        }
        return area;
    }
    /**
     * 자동으로 반경 산출(원)
     * @param _mapView 맴객체
     * @param _circle 원의 반지름
     * @returns {*}
     */
    measuringControlClass.prototype.formatCircle = function( _mapView ,_circle ){
        var radiusLength;
        var startPoint = _circle.getFirstCoordinate();
        var endPoint = _circle.getLastCoordinate();
        var sourceProj = _mapView.getView().getProjection();
        var c1 = ol.proj.transform(startPoint, sourceProj, 'EPSG:4326');
        var c2 = ol.proj.transform(endPoint, sourceProj, 'EPSG:4326');
        //radiusLength = this.wgs84Sphere.haversineDistance(c1, c2);
        radiusLength =  ol.sphere.getDistance(c1, c2); /*거리측정*/
        return radiusLength;
    }
}
OlSeesun.ol.control.measuringTool = new measuringControlClass();