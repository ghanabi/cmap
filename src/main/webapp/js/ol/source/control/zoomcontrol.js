/**
 * 확대축소 컨트롤
 */
function zoomcontrolClass(){

    /**
     * 확대 이벤트
     * @param _mapView 맵객체
     * @param _value   확대시킬 범위 값
     */
    zoomcontrolClass.prototype.zoomIn = function ( _mapView, _value ){
        var now_level = _mapView.getView().getZoom();
        now_level += _value;
        _mapView.getView().setZoom( now_level );
    }

    /**
     *  축소 이벤트
     * @param _mapView
     * @param _value
     */
    zoomcontrolClass.prototype.zoomOut = function ( _mapView, _value ){
        if(mapView.getView().getZoom() > 6){
            var now_level = _mapView.getView().getZoom();
            now_level -= _value;
            _mapView.getView().setZoom( now_level );
        }else{
            alert("지도레벨이 6레벨 이하는 사용 할수 없습니다.");
            _mapView.getView().setZoom( 6 );
            OlSeesun.ol.eventhandler.btnEventHandler.setPanMove( _mapView );
        }
    }

    /**
     * 클릭 지점으로 확대
     * @param _mapView 맵객체
     * @param _value 확대시 범위 값
     * wn
     */
    zoomcontrolClass.prototype.zoomInClick = function ( _mapView, _value ){
        /*편의를 위해서 singleclick 클릭 이벤트를 여기다 달아둠 */
        _mapView.on( 'singleclick' ,  function(e) {
            var now_level = _mapView.getView().getZoom();
            now_level += _value;
            _mapView.getView().setCenter(e.coordinate); /*센터로 위치이동*/
            _mapView.getView().setZoom(now_level);  /*해당 레벨 만큼 확대*/
        })
    }
    /**
     * 클릭 지점으로 축소
     * @param _mapView
     * @param _value
     */
    zoomcontrolClass.prototype.zoomOutClick = function ( _mapView, _value ){
       /*편의를 위해서 singleclick 클릭 이벤트를 여기다 달아둠 */
        _mapView.on( 'singleclick' ,  function(e) {

            if(mapView.getView().getZoom() > 6){
                var now_level = _mapView.getView().getZoom();
                now_level -= _value;
                _mapView.getView().setCenter(e.coordinate); /*센터로 위치이동*/
                _mapView.getView().setZoom(now_level);  /*해당 레벨 만큼 확대*/
            }else{
                alert("지도레벨이 6레벨 이하는 사용 할수 없습니다.");
                _mapView.getView().setZoom( 6 );
                OlSeesun.ol.eventhandler.btnEventHandler.setPanMove( _mapView );
            }
        })
    }

    this.drawZIn = null; /* 드래그 확대 이벤트 저장 공간 */
    this.drawZOut = null; /* 드래그 축소 이벤트 저장 공간 */
    /**
     * 영역 확대 컨트롤
     * @param _mapView
     */
    zoomcontrolClass.prototype.drawZoomIn = function ( _mapView ){
        /*펜기능 기능 줒ㅇ지 시키기*/
        var interaction = _mapView.getInteractions().getArray();
        /*펜 이벤트 비활성화*/
        for(var i = 0; i < _mapView.getInteractions().length; i++){
            if(interaction[i] instanceof ol.interaction.DragPan) {
                interaction[i].setActive(false);
            }
        }

        /*축소 이벤트 있는경우 이벤트 죽이기*/
        _mapView.removeInteraction(this.drawZOut);
        /*소스 정의*/
        var sourceZIn = new ol.source.Vector({wrapX: false});
        /*벡터 정의*/
        var vectorZIn = new ol.layer.Vector({
            source: sourceZIn,
        });

        /*맵에 백터 추가*/
        _mapView.addLayer(vectorZIn);

        /*드로우 기능*/
        this.drawZIn = new ol.interaction.Draw({
            source: sourceZIn,
            type: 'Circle',
            freehand : true,
            geometryFunction : ol.interaction.Draw.createBox()
        });

        /*맵에 드로우 추가*/
        _mapView.addInteraction(this.drawZIn);

        /*사각형의 extent값을 담을 배열 정의*/
        var zoomInCoord = [];
        /*그리고 난후*/
        this.drawZIn.on('drawend',function(e){
            /*드로우의 외곽값을 입력*/
            zoomInCoord = e.feature.getGeometry().getExtent();
            /*드로우 외곽값을 좌표로 맵 설정 수정*/
            _mapView.getView().fit(zoomInCoord);
            /*벡터 레이어 제거*/
            _mapView.removeLayer(vectorZIn);
        });
    }
    /**
     * 드래그 영역 축소
     * @param _mapView
     */
    zoomcontrolClass.prototype.drawZoomOut = function ( _mapView ){
        /*드로우 기능중 드래그 이동이 적용되지 않게 설정*/
        var interaction = _mapView.getInteractions().getArray();

        for(var i = 0; i < _mapView.getInteractions().length; i++){
            if(interaction[i] instanceof ol.interaction.DragPan) {
                interaction[i].setActive(false);
            }
        }
        /*드로우in 인터렉트 제거*/
        _mapView.removeInteraction(this.drawZIn);
        /*소스 정의*/
        var sourceZOut = new ol.source.Vector({wrapX: false});
        /*벡터 정의*/
        var vectorZOut = new ol.layer.Vector({
            source: sourceZOut,
        });
        /*벡터 맵에 추가*/
        _mapView.addLayer(vectorZOut);

        /*드로우 설정*/
        this.drawZOut = new ol.interaction.Draw({
            source: sourceZOut,
            type: 'Circle',
            freehand : true,
            geometryFunction : ol.interaction.Draw.createBox()
        });
        /*맵에 드로우 추가*/
        _mapView.addInteraction(this.drawZOut);
        /*사각형의 extent값을 담을 배열 정의*/
        var zoomOutCoord = [];
        /*맵 뷰 정의*/
        var view = _mapView.getView();
        /*그리고 난 후*/
        this.drawZOut.on('drawend',function(e){
            if(mapView.getView().getZoom() > 6){
                /*맵 기본 줌 레벨 호출*/
                var zoomOri = view.getZoom();
                /*드로우 외곽 좌표 입력*/
                zoomOutCoord = e.feature.getGeometry().getExtent();
                /*드로우 외곽 좌표로 해상도 입력*/
                var zoomOutRes = view.getResolutionForExtent (zoomOutCoord);
                /*해상도에 맞는 줌 레벨 입력*/
                var zoomOutZoomlev = Math.round(view.getZoomForResolution(zoomOutRes));
                /*변경되야할 줌 레벨 입력*/
                var zoomOutFi = zoomOri-(zoomOutZoomlev-zoomOri);
                /*맵 뷰의 줌 레벨 변경*/
                _mapView.getView().setZoom(zoomOutFi);
                /*벡터 레이어 제거*/
                _mapView.removeLayer(vectorZOut);
            }else{
                alert("지도레벨이 6레벨 이하는 사용 할수 없습니다.");
                _mapView.getView().setZoom( 6 );
                OlSeesun.ol.eventhandler.btnEventHandler.setPanMove( _mapView );
            }
        });
    }

}
OlSeesun.ol.control.zoomControl = new zoomcontrolClass();