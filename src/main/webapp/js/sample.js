/**
 * wfs 처리 결과 데이터
 * @param _mapView
 * @param _feature
 */
function sampleResultWfsData( _mapView, _wfsData ){
    console.log("wfs처리결과 데이터");
    console.log(_wfsData);
    /*로딩바 삭제*/
    OlSeesun.publics.LoadingBar.endProgress();
}


/**
 * 디비조회후 데이터 처리 결과 데이터
 * @param _mapView
 * @param _feature
 */
function sampleRetriveDBData( _data, _mapView  ){
    /*DB로 조회된 데이터를 화면상에 그리는 샘플*/
    var features =  OlSeesun.ol.control.feature.addFeaturesGeoMater( _mapView, _data );
    OlSeesun.ol.control.feature.addFeatures( _mapView, features );

    /*로딩바 삭제*/
    OlSeesun.publics.LoadingBar.endProgress();
}

/**
 *
 * 데이터 조회 페이징
 * @param _data
 * @param _mapView
 */
function sampleSearchDiv( _data, _mapView ){
    OlSeesun.publics.textValue.qureyEmpty( "sampleDiv" );
    var context = '<colgroup><col width="90%"><col width="10%"></colgroup>';
    OlSeesun.publics.textValue.append("sampleDiv", context);
    for( i = 0 ; i < _data.list.length; i++ ) {
        context += "<tr>";
        context += "<td onclick='sampleMoveGis(\"" + _data.list[i].feature+ "\")'>";
        context += _data.list[i].emd_cd;
        context += "</td>";
        context += "<td>";
        context += _data.list[i].emd_kor_nm;
        context += "</td>";
        context += "</tr>";
    }
    OlSeesun.publics.textValue.append("sampleDiv", context);
}

/**
 * 검색 이동 샘플
 * @param _mapView
 * @param _feature
 */
function sampleMoveGis ( _feature ){
    var features =  OlSeesun.ol.control.feature.addFeaturesGeoMaterText( mapView, _feature );
    OlSeesun.ol.function.mapMoveing.moveing( mapView, features );
}

/**
 * 포인트 (lon, lat 값을 가지고 위치이동 및 하이라이팅)
 * @param _data
 * @param _mapView
 */
function samplePointSearchDiv( _data, _mapView ){
    OlSeesun.publics.textValue.qureyEmpty( "sampleDiv" );
    var context = '<colgroup><col width="90%"><col width="10%"></colgroup>';
    OlSeesun.publics.textValue.append("samplePointDiv", context);
    for( i = 0 ; i < _data.list.length; i++ ) {
        context += "<tr>";
        context += "<td onclick='sampleLonLatMoveGis(\"" + _data.list[i].wgs84lon+ "\",\""+ _data.list[i].wgs84lat +"\" ,\"" + "EPSG:4326" + "\")'>";
        context += _data.list[i].buildaddre;
        context += "</td>";
        context += "<td>";
        context += _data.list[i].buildplace;
        context += "</td>";
        context += "</tr>";
    }
    OlSeesun.publics.textValue.append("samplePointDiv", context);
}

/**
 * 위치이동 포인트 값으로 (loa, lat)
 * @param lon
 * @param lat
 * @param srs
 */
function sampleLonLatMoveGis( lon, lat, srs){
    OlSeesun.ol.function.mapMoveing.moveLonLat( mapView,lon, lat, srs);
}

/**
 * DB 죄회용 샘플
 * @param _data
 * @param _mapView
 */
function retriveSampleHeatDBLonLat( _data, _mapView){
    var srs = "EPSG:4326"; /*좌표계 선언*/
    OlSeesun.ol.function.heatMap.drawHeatMapLonLat(_mapView,_data,srs);
}