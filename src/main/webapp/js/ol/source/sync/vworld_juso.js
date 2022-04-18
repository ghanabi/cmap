/**
 * 주소검색관련 js
 */
function vworldJusoClass (){
    /**
     * 브이월드 좌표를 통한 주소검색
     * @param _lonlat 좌표(경위도)
     * @param _callBackFunction 처리결과 함수
     */
    vworldJusoClass.prototype.getLonLatJuso = function ( _lonlat , _callBackFunction ){
        var vworldLonLatUrl = "http://api.vworld.kr/req/address?" +
            "service=address&request=getAddress&version=2.0&crs=epsg:4326&" +
            "point="+ _lonlat[0] +","+ _lonlat[1] +"&format=json&type=both&zipcode=true&" +
            "simple=false&key=" + vworld_apikey;
        OlSeesun.publics.ajax.retriveUrlAjaxDate( "vwolrdJuso", vworldLonLatUrl, this.successLonLatJuso, _callBackFunction );
    }
    /**
     * 처리 되는거
     * @param _data
     */
    vworldJusoClass.prototype.successLonLatJuso = function ( _id, _data ,  _callBackFunction, _mapViews ){
        _callBackFunction( _data );
    }
}

OlSeesun.sync.vworldJuso = new vworldJusoClass();