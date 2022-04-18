/**
 * 도형 이벤트
 */
function featureControlClass(){
    /**
     * 도형의 지오메트리 값 가져오기
     * @param _feature
     * @returns {*}
     */
    featureControlClass.prototype.getCoordinates = function ( _feature ){
        var retriveFeature = null
        /**
         * 원형인 경우
         */
        if( _feature.drawType == "Circle" ){
            /*원형인경우*/
            var circleGeometery =  OlSeesun.ol.control.feature.getFeatureCircleOl2( _feature );
            var length = circleGeometery.components[0].components.length;
            var geometery = circleGeometery.components[0].components;
            var tempGeometery = [];
            var circlePoint = [];
            var allcirclePoint = [];
            for(var i =0; i < length; i++ ){
                var tempGeometery = [];
                tempGeometery.push(geometery[i].x);
                tempGeometery.push(geometery[i].y);
                circlePoint.push(tempGeometery);
            }
            allcirclePoint.push(circlePoint);
            retriveFeature = allcirclePoint;
        }else{
            retriveFeature = _feature.getGeometry().getCoordinates();
        }
        return retriveFeature;
    }
    
    /**
     * 도형의 지오메트리 가져오기
     * @param _feature
     * @returns {*}
     */
    featureControlClass.prototype.getGeometry = function ( _feature ){
        return _feature.getGeometry();
    }

    /**
     * 레이어 지오구
     * @param _source
     * @param _feature
     */
    featureControlClass.prototype.removeFeature = function ( _source ,_feature ){
        var style = new ol.style.Style({});
        _feature.setStyle(style);
        _source.removeFeature( _feature );
    }

    /**
     * 선택된 도형있는경우 초기화
     * @param _mapView
     */
    featureControlClass.prototype.setStyle = function ( _feature, _style ){
       _feature.setStyle(_style);
    }

    /**
     * oL2를 통해 원형 지오매트리 구해오기
     * @param _feature
     */
    featureControlClass.prototype.getFeatureCircleOl2 = function ( _feature ){
        var circle =  _feature.getGeometry();
        var center  = circle.getCenter();
        var radius = circle.getRadius();
        var lonLat = new OpenLayers.LonLat(center[0], center[1])
        var pCenter = new OpenLayers.Geometry.Point(lonLat.lon, lonLat.lat);
        var olCircle = OpenLayers.Geometry.Polygon.createRegularPolygon(pCenter, radius, 50, 0);

        return olCircle;
    }
    /**
     * 지오메트리 도형만들기
     * @param _geometry
     */
    featureControlClass.prototype.initGeometryToFeature = function ( _geometry , _type ){
        var geom = null;
        switch ( _type ){
            case "Point" :
                geom = new ol.geom.Point( _geometry );
                break
            case "Polygon":
            case "Rectangle" :
            case "Circle" :
                geom = new ol.geom.Polygon( _geometry );
                break;
            case "Line" :
            case "LineString" :
                geom = new ol.geom.LineString( _geometry );
                break;
        }
        return new ol.Feature( geom );
    }

    /**
     * 도형을 다른 도형으로 만들기
     * @param _geometry
     */
    featureControlClass.prototype.initFeatureToFeature = function (  _feature ){
        var geom = null;
        switch ( _feature.drawType ){
            case "Point" :
                geom = new ol.geom.Point( OlSeesun.ol.control.feature.getCoordinates( _feature ) );
                break;
            case "Polygon":
            case "Rectangle" :
            case "Circle" :
                geom = new ol.geom.Polygon( OlSeesun.ol.control.feature.getCoordinates( _feature ) );
                break;
            case "Line" :
            case "LineString" :
                geom = new ol.geom.LineString( OlSeesun.ol.control.feature.getCoordinates( _feature ) );
                break;
        }
        return new ol.Feature( geom );
    }
    
    /**
     * 교차점 도형 만들기
     * @param _feature1
     * @param _feature2
     */
    featureControlClass.prototype.setIntersection = function ( _feature1 ,_feature2  ){
        /*사서 설정*/
        var jstsGeom1 = OlSeesun.ol.control.feature.retriveReader(_feature1);
        var jstsGeom2 = OlSeesun.ol.control.feature.retriveReader(_feature2);
        var geom = jstsGeom1.intersection(jstsGeom2);
        var retriveWriter =  OlSeesun.ol.control.feature.retriveWriter(geom);
        return retriveWriter;
    }
    /**
     * 합집합
     * @param _feature1
     * @param _feature2
     * @returns {*}
     */
    featureControlClass.prototype.setUnion = function ( _feature1 ,_feature2  ){
        /*사서 설정*/
        var jstsGeom1 = OlSeesun.ol.control.feature.retriveReader(_feature1);
        var jstsGeom2 = OlSeesun.ol.control.feature.retriveReader(_feature2);
        var geom = jstsGeom1.union(jstsGeom2);
        var retriveWriter =  OlSeesun.ol.control.feature.retriveWriter(geom);
        return retriveWriter;
    }

    /**
     * 차집합
     * @param _feature1
     * @param _feature2
     * @returns {*}
     */
    featureControlClass.prototype.setDifference = function ( _feature1 ,_feature2  ){
        /*사서 설정*/
        var jstsGeom1 = OlSeesun.ol.control.feature.retriveReader(_feature1);
        var jstsGeom2 = OlSeesun.ol.control.feature.retriveReader(_feature2);
        var geom = jstsGeom1.difference(jstsGeom2);
        var retriveWriter =  OlSeesun.ol.control.feature.retriveWriter(geom);
        return retriveWriter;
    }
    /**
     * 도형 빵구 뚤기
     * @param _feature1
     * @param _feature2
     * @returns {*}
     */
    featureControlClass.prototype.setSymDifference = function  (  _feature1 ,_feature2   ){
        /*사서 설정*/
        var jstsGeom1 = OlSeesun.ol.control.feature.retriveReader(_feature1);
        var jstsGeom2 = OlSeesun.ol.control.feature.retriveReader(_feature2);
        var geom = jstsGeom1.symDifference(jstsGeom2);
        var retriveWriter =  OlSeesun.ol.control.feature.retriveWriter(geom);
        return retriveWriter;
    }

    /**
     * 도형분활
     * @param _feature1
     * @param _lineString
     */
    featureControlClass.prototype.setPolygonizer = function  (  _feature, _lineString ){
        var jstsGeom1 = OlSeesun.ol.control.feature.retriveReader(_feature);
        var jstsGeom2 = OlSeesun.ol.control.feature.retriveReader(_lineString);
        var union = jstsGeom1.getExteriorRing().union (jstsGeom2);
        var polygonizer = new jsts.operation.polygonize.Polygonizer ();

        polygonizer.add (union);
        //var parser = new jsts.io.OpenLayersParser ();
        var polygons = polygonizer.getPolygons ();
        return polygons;
    }

    /**
     * 버퍼주기
     * @param _feature
     * @param _bufferOpt 버퍼 값 M 단위
     * @returns {*}
     */
    featureControlClass.prototype.setBuffer = function  (  _feature, _bufferOpt ){

        var jstsGeom1 = OlSeesun.ol.control.feature.retriveReader(_feature);
        var geom = jstsGeom1.buffer( _bufferOpt );
        var retriveWriter =  OlSeesun.ol.control.feature.retriveWriter(geom);
        return retriveWriter;
    }



    /**
     * 도형읽어 들이기
     * @param _feature
     * @returns {*}
     */
    featureControlClass.prototype.retriveReader = function ( _feature ){
        var reader = new jsts.io.WKTReader()
        /*교차에 있는지 없는지 확인*/
        var format = new ol.format.WKT();
        var wkt = format.writeFeature( _feature );
        var jstsGeom = reader.read(wkt);
        return jstsGeom;
    }

    /**
     * 처리된 도형 읽어 드리는 부분
     * @param _value
     * @returns {*}
     */
    featureControlClass.prototype.retriveWriter = function ( _value ){
        var format = new ol.format.WKT();
        var writer = new jsts.io.WKTWriter();
        var writerOl = writer.write(_value);
        var writerFeature = format.readFeature(writerOl);

        return writerFeature;
    }
    /**
     * 도형 좌표 변환
     * @param _feature
     * @param _nowPrj  변환 좌표계
     * @param afterPrj  이전 좌표계
     */
    featureControlClass.prototype.transform = function ( _feature , _nowPrj, afterPrj ){
        _feature.getGeometry().transform(  afterPrj, _nowPrj )
    }

    /**
     * 도형의 Extemt 가져오기
     * @param _feature
     */
    featureControlClass.prototype.getExtemt = function ( _feature ){
        return _feature.getGeometry().getExtent();
    }

    /**
     * 백터위치이동
     * @param _mapView
     * @param extent
     */
    featureControlClass.prototype.setFit = function ( _mapView, extent ){
        _mapView.getView().fit( extent, _mapView.getSize()+1 );
    }

    /**
     * 백터 만들기
     * @param _mapView
     * @param _feature
     */
    featureControlClass.prototype.addFeatures =  function ( _mapView, _feature ){
        var layer = OlSeesun.ol.control.layerControl.retriveOlLayer('Vector', _mapView );
        if( layer != null){
            OlSeesun.ol.control.layerControl.removeLayer( _mapView, layer );
        }
        /*wfsSource 만들기*/
        var wfsSource = new ol.source.Vector();
        _feature.forEach(function(feature){
            wfsSource.addFeature(feature);
        });
        /* Vector 만들기 */
        var wfs_layer = new ol.layer.Vector({
            id : "Vector",
            source: wfsSource,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 228, 0, 0.0)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 0, 0, 1)',
                    width: 5
                }),
                image: new ol.style.Circle({
                    radius: 12,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 135, 255, 1)',
                        width: 7
                    })/*,
	                fill: new ol.style.Fill({
	                  color: 'rgba(255, 255, 255, 0.5)'
	                })*/
                })
            }),
            zIndex : 9999
        });
        OlSeesun.ol.control.layerControl.addLayer( _mapView, wfs_layer );
        /*백터 레이어 관리하는 부분에 추가*/
        OlSeesun.ol.control.layerControl.layers.vectorLayer.push("Vector");

    }

    /**
     * Ol2버전으로 도형 추출
     * @param _type
     * @param _feature
     * @param  _bufferOpt
     */
    featureControlClass.prototype.retriveOl2Feature =  function ( _type, _feature,_bufferOpt, _mapView  ){
       var feature = null;
        switch ( _type ){
            case "Point" : /*점그리기*/
            case "Line": /* 선그리기 */
                /*버퍼 형태의 공간검색*/
                var feature1 = OlSeesun.ol.control.feature.initFeatureToFeature( _feature );
                var resultFeature =  OlSeesun.ol.control.feature.setBuffer( feature1 , _bufferOpt);
                resultFeature.drawType = "buffer";
                if (resultFeature.getGeometry().getCoordinates().length > 0) {
                    resultFeature.setStyle(OlSeesun.ol.control.drawTool.drawingStyle);
                    OlSeesun.ol.control.drawTool.drawSource.addFeature(resultFeature);
                }
                feature = OlSeesun.ol.control.feature.retriveOl2Polygon( resultFeature , _mapView );
                break;
            case "Circle" : /*원형*/
                feature = OlSeesun.ol.control.feature.retriveOl2Circle( _feature , _mapView  );
                break;
            case "Rectangle" : /*사각형*/
            case "Polygon": /*다각형*/
                feature = OlSeesun.ol.control.feature.retriveOl2Polygon( _feature , _mapView );
                break;
        }
        return feature;
    }

    /**
     * 원형 지오메트리 검색(공간검색용)
     * @param _feature
     * @param _mapView
     */
    featureControlClass.prototype.retriveOl2Circle = function ( _feature , _mapView  ){
        var circle =  _feature.getGeometry();
        var center  = circle.getCenter();
        var transform = ol.proj.transform(center , _mapView.getView().getProjection().getCode(), engineProj );
        var radius = circle.getRadius();
        var lonLat = new OpenLayers.LonLat(transform[0], transform[1])
        var pCenter = new OpenLayers.Geometry.Point(lonLat.lon, lonLat.lat);
        var olCircle = OpenLayers.Geometry.Polygon.createRegularPolygon(pCenter, radius, 50, 0);
        return olCircle;
    }

    /**
     * 폴리건 가져오기
     * @param _feature
     */
    featureControlClass.prototype.retriveOl2Polygon = function ( _feature, _mapView ){
        var feature = null;
        var geometry = _feature.getGeometry().getCoordinates()[0];
        var geometryConvert = [];
        for(var i = 0 ; i < geometry.length; i++){
            geometryConvert.push(ol.proj.transform( geometry[i] ,_mapView.getView().getProjection().getCode(), engineProj));
        }
        /*폴리건 만들기 시작*/
        var polyList = [];
        $.each(geometryConvert, function(index, data) {
            var points = new OpenLayers.Geometry.Point(data[0], data[1]);
            polyList.push(points);
        });
        var linearRing = new OpenLayers.Geometry.LinearRing(polyList);
        var polygon = new OpenLayers.Geometry.Polygon([ linearRing ]);

        return polygon;
    }

    /**
     * 데이터 그리기 (DB로 조회된 데이터)
     */
    featureControlClass.prototype.addFeaturesGeoMater = function ( _mapView ,_data ){
        var arrayFeature = [];
        if( _data.length > 0){
            for( var i =0; i < _data.length; i++){
                var reader = new jsts.io.WKTReader()
                var jstsGeom = reader.read( _data[i].feature  );
                var feature  = OlSeesun.ol.control.feature.retriveWriter( jstsGeom );
                feature.drawType = _data[i].featureType;
                feature.getGeometry().transform( engineProjNm, OlSeesun.ol.function.getView.getProjection( _mapView ) )
                feature.resultValue = [];
                feature.resultValue.push(_data[i]);
                arrayFeature.push(feature);
            }
           return arrayFeature;
        }
    }



    /**
     * 데이터 그리기 (DB로 조회된 데이터)
     */
    featureControlClass.prototype.addFeaturesGeoMaterText = function ( _mapView ,_data ){
        var arrayFeature = [];
        var reader = new jsts.io.WKTReader()
        var jstsGeom = reader.read( _data );
        var feature  = OlSeesun.ol.control.feature.retriveWriter( jstsGeom );
        feature.drawType = _data[i].featureType;
        arrayFeature.push(feature);
        return arrayFeature;
    }
}
OlSeesun.ol.control.feature = new featureControlClass();