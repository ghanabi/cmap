/*
User: 백승재
Date: 2021-05-13
Time: 오후 3:47
뷰 세팅 클래스
*/
function viewerClas(){
    this.minExent = [124.942951,32.503933]; /* Min좌표 */
    this.maxExent = [132.043331,38.828272]; /* Max 좌표 */

    /*베이스맵 설정 하는 함수*/
    viewerClas.prototype.initMap = function ( _baseLayerNm, _divNm ){
        /*베이스 레이어 찾아오기*/
        var baseLayer = OlSeesun.ol.viewer.v_baseLayer.initBaseLayer( _baseLayerNm );
        /*생성된 뷰값 가져오기*/
        var view = OlSeesun.ol.viewer.v_viewer.rtView( _baseLayerNm );

        /*맵 영역 만들기*/
        var _mapView = new ol.Map({
            layers : [baseLayer], /*레이어 등록*/
            target : _divNm, 	  /*타겟팅 이름*/
            /*인터 페이스 설정 디폴트*/
            interactions : ol.interaction.defaults({
                dragPan: true,		/*펜컨트롤*/
                mouseWheelZoom: true, /*마우스 이동 컨트롤*/
                doubleClickZoom :false,    /*더블클릭*/
                altShiftDragRotate:false, /*회전 관련*/
                pinchRotate:false  /*회전 영역 관련*/
            }),
            controls: [
                new ol.control.Attribution({
                    collapsible: true
                }),
                new ol.control.Zoom(),
                new ol.control.FullScreen()
            ],
            view : view /*뷰영역*/
        });

        return _mapView;
    }

    /*View 생성 함수*/
    viewerClas.prototype.rtView= function ( _baseLayerNm ){

        /*베이스맵 가죠오기*/
        var objBase = baseMap.getMap( _baseLayerNm );
        /*좌표계 가지고 오기*/
        var pro = OlSeesun.ol.projection.rtProjection( objBase.opt );
        /*레종류션 가지고오기*/
        var resolutions = OlSeesun.ol.resolution.rtResolution( objBase.opt.maxResolution , objBase.opt.numZoomLevels );
        /*맵 위치 가져오기*/
        var extent = this.rtExtent();
        /*View 생성 함수*/
        var view = new ol.View({
            projection : pro, /*좌표계*/
            resolutions: resolutions, /*맵 레졸류션*/
            maxResolution : objBase.opt.maxResolution, /*맥스 레졸류션*/
            center : OlSeesun.ol.transforms.transform([128.2403,35.3116], 'EPSG:4326', objBase.opt.code), /* 센터 좌표 */
            zoom : objBase.zoom, /*줌화면 영역*/
            minZoom : objBase.minZoom, /*최대 축소 영역*/
            maxZoom : objBase.maxZoom, /*최대 확대 영역*/
            extent : extent /**맴 역역 */
        });
        return view;

    }

    /*맵 위치 가져오기*/
    viewerClas.prototype.rtExtent = function ( _mapView ){
        var project = null; /*좌표계*/
        if(_mapView != null){
            /*map함수가 있는경우 좌표계 가져오기*/
            project = _mapView.getView().getProjection().getCode();
        }else{
            /*기본 좌표계 설정*/
            project = "EPSG:900913";
        }
        /*min 영역 좌표 변환후 영역 구학기*/
        var extentMin  = OlSeesun.ol.transforms.transform( OlSeesun.ol.viewer.v_viewer.minExent , "EPSG:4326" , project  );
        /*max 영역 좌표 변환후 영역 구학기*/
        var extentMax  = OlSeesun.ol.transforms.transform( OlSeesun.ol.viewer.v_viewer.maxExent , "EPSG:4326" , project  );
        /*영역 만들기 함수*/
        var extent = [  extentMin[0], extentMin[1], extentMax[0], extentMax[1] ] ;
        /*리턴값*/
        return extent;
    }

    /* 베이스레이어 교체 */
    viewerClas.prototype.changBaseMap = function ( _mapViews, _sId ){
        /*바로이맵 처리*/
        /*select 값 조회*/
        var sValue = OlSeesun.publics.select.retriveValue( _sId );
        //브이월드 야간지도, 회색지도의 경우 18레벨까지만 호출 가능
        //19레벨일시 18레벨로 zoom out
        if( sValue == "VGRAY" || "VMIDNIGHT" ){
            if( _mapViews.getView().getZoom() == "19" ){
                _mapViews.getView().setZoom(18);
            }
        }
        if( sValue == "VBASE" ){
            OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayerDB( mapView, 'vwolrd_hybrid',false  );
        }else if(  sValue == "VSATELLITE" ){
            OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayerDB( mapView, 'vwolrd_hybrid',true  );
        }


        if( sValue == "EMAPLIST" ){
            OlSeesun.publics.Css.setStyleDisplay("s_emaplist","display","inline-block");
            //OlSeesun.viewer.v_viewer.changBaseMap(_mapViews, "s_emaplist");
            var sValue2 = OlSeesun.publics.select.retriveValue( "s_emaplist" );
            sValue = "Emap";
            emapAerial = sValue2;
        }else{
            OlSeesun.publics.Css.setStyleDisplay("s_emaplist","display","none");
        }
        /*Base Layer 값 가져오기*/
        var baseLayer = OlSeesun.ol.viewer.v_baseLayer.initBaseLayer( sValue );
        baseLayer.setOpacity(1); /*투명도 조절*/
        this.renderEdgesOnLayer( baseLayer );
        _mapViews.getLayers().setAt(0, baseLayer);
    }
    /*타일 변경*/
    viewerClas.prototype.renderEdgesOnLayer = function  ( _baseLayer ){
        if( _baseLayer instanceof ol.layer.Tile ){
            var source = _baseLayer.getSource();
        }
    }


}
OlSeesun.ol.viewer.v_viewer = new viewerClas();
