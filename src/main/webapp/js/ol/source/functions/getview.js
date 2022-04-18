/**
 *  0l getView 함수 모음
 */
function getviewClass(){

    /**
     * 현제 화면 축척 가쳐오기
     *  _mapView : 맵정의함수
     *  _projection :  변환시킬 좌표계 EX) EPSG:4326
      */
    getviewClass.prototype.getCenter = function ( _mapView, _projection ){
        var projection = this.getProjection( _mapView ); /*좌표계 확인*/

        /*좌표계 값이 있는지 없는 지 확인*/
        if( _projection == null && _projection.length > 0){
            _projection = "EPSG:4326";
        }
        var center = _mapView.getView().getCenter(); /*센터 좌표*/

        /**
         * 파라미터
         * center : 센터 좌표
         * _projection : 바꿀 좌표계 명칭
         * projection : 현제 맵의 좌표계
         */
        return OlSeesun.ol.transforms.transform( center , projection, _projection);
    }

    /**
     * 현제 Map 좌표계 가져오기
     */
    getviewClass.prototype.getProjection = function ( _mapView ){
        return _mapView.getView().getProjection().getCode();
    }


    /*현제 화면의 축척값 가져오기
	 * _mapView : 맵객체
	 * _level : 레벨값
	 * */
    getviewClass.prototype.getResolution = function ( _mapView ){
        return  _mapView.getView().getResolution();
    }

    /**
     * 현제 센터값 넣기
     * _value : 센터값
     */
    getviewClass.prototype.setCenter = function ( _mapView, _value ){
        _mapView.getView().setCenter( _value );
    }

    /**
     * 레졸류션 세팅
     * _value: 레졸류션 값
     */
    getviewClass.prototype.setResolution = function ( _mapView, _value ){
        _mapView.getView().setResolution( _value );
    }

    /**
     * 맴 유닛트 가져오기
     * @param _mapView
     * @param _value
     */
    getviewClass.prototype.getUnits = function ( _mapView ){
       return _mapView.getView().getProjection().getUnits();
    }
    
    this.minExent = [127.56536701441311,34.49731019092691]; /* Min좌표 */
    this.maxExent = [129.22046197588418,35.91514442802562]; /* Max 좌표 */

    /**
     * 맵 바운더리구해오기
     * @param _mapView
     * @returns {*[]}
     */
    getviewClass.prototype.rtExtent = function ( _mapView ){
        var project = null; /*좌표계*/
        if(_mapView != null){
            /*map함수가 있는경우 좌표계 가져오기*/
            project = _mapView.getView().getProjection().getCode();
        }else{
            /*기본 좌표계 설정*/
            project = "EPSG:900913";
        }
        /*min 영역 좌표 변환후 영역 구학기*/
        var extentMin  = OlSeesun.ol.transforms.transform( OlSeesun.ol.function.getView.minExent , "EPSG:4326" , project  );
        /*max 영역 좌표 변환후 영역 구학기*/
        var extentMax  = OlSeesun.ol.transforms.transform( OlSeesun.ol.function.getView.maxExent , "EPSG:4326" , project  );
        /*영역 만들기 함수*/
        var extent = [  extentMin[0], extentMin[1], extentMax[0], extentMax[1] ] ;
        /*리턴값*/
        return extent;
    }


}
OlSeesun.ol.function.getView =  new getviewClass();