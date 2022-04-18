/**
 * 맵이동 함수
 */
function mapMoveingClass (){
    /**
     * 맴이동함수
     * @param _mapView
     * @param _feature
     */
    mapMoveingClass.prototype.moveing = function ( _mapView, _features, _srs){
        if ( _features ) {
            var arrFeature = new Array();
            var extent = {}; /* 도형의  바운더리 찾기 */
            for (var i = 0; i < _features.length; i++) {
                var feature = _features[i];
                var project = OlSeesun.ol.function.getView.getProjection( _mapView );
               if (project != engineProjNm) {
                    if(_srs !=null){
                        if (project != _srs){
                            OlSeesun.ol.control.feature.transform( feature, project, _srs);
                        }
                    }else{
                        /*좌표변환*/
                        OlSeesun.ol.control.feature.transform( feature, project, engineProjNm);
                    }
                }
                /*Extend 가져오기*/
                var nExtend = OlSeesun.ol.control.feature.getExtemt( feature );
                /*Extend 값 구해오기*/
                if(extent.xmin == undefined){
                    extent.xmin = nExtend[0];
                    extent.ymin = nExtend[1];
                    extent.xmax = nExtend[2];
                    extent.ymax = nExtend[3];
                }else{
                    extent.xmin = (extent.xmin > nExtend[0])?nExtend[0] : extent.xmin;
                    extent.ymin = (extent.ymin > nExtend[1])?nExtend[1] : extent.ymin;
                    extent.xmax = (extent.xmin < nExtend[2])?nExtend[2] : extent.xmax;
                    extent.ymax = (extent.ymax < nExtend[3])?nExtend[3] : extent.ymax;
                }
                arrFeature.push(feature);
            }
            var new_extent ;
            if(extent.xmin == extent.xmax && extent.ymin == extent.ymax){
                new_extent = [extent.xmin - 100 ,extent.ymin - 100 ,extent.xmax + 100 ,extent.ymax + 100];
            }else{
                new_extent = [extent.xmin ,extent.ymin ,extent.xmax ,extent.ymax ];
            }

            /*위치이동*/
            OlSeesun.ol.control.feature.setFit(_mapView, new_extent);
            /* 백터등록 */
            OlSeesun.ol.control.feature.addFeatures( _mapView,  arrFeature );
            if( _mapView.getView().getZoom() > 20){
                _mapView.getView().setZoom(19)
            }

        }else{
            alert("검색된 결과가 없습니다.");
        }
    }
    /**
     * 데이터 위치 조회
     * @param _lon
     * @param _lat
     * @param _srs
     */
    mapMoveingClass.prototype.moveLonLat = function ( _mapView,_lon, _lat, _srs){
        var lonlat = [];
        lonlat.push((_lon * 1));
        lonlat.push((_lat * 1));
        var feature =  OlSeesun.ol.control.feature.initGeometryToFeature( lonlat, "Point" );
        var tempFeature = [];
        tempFeature.push(feature);
        OlSeesun.ol.function.mapMoveing.moveing( _mapView, tempFeature , _srs );
    }
}
OlSeesun.ol.function.mapMoveing = new mapMoveingClass();