/**
 * 레이어 컨트롤 함수
 */
function layercontrolClass (){
    /**
     * 참고 : 주제도 시스템의 경우 WMS 레이어 정보를 데이터 베이스에 넣어서 관리
     * @type {{sysGroup: *[], wmsLayersGroup: *[], serviceWmsLayer: *[]}}
     */
    this.layers = {
        sysGroup : [],  /*시스템 그릅을 관리하는 그룹*/
        layersGroup : [], /*Wms 레이어 그룹을 관리하는 그룹*/
        serviceLayer : [], /* 시스템에 올린 데이터를 관리하는 배열 */
        vectorLayer : [] /*시스템에 등록된 백터 레이어*/
    };

    /**
     * 레이어 초기화
     * @param _mapView
     */
    layercontrolClass.prototype.resetWmsLyaers = function ( _mapView ){
        /*레이어 지우기 */
        this.deleteLayerAll( _mapView );
        this.layers = {
            sysGroup : [],
            layersGroup : [],
            serviceLayer : [],
            vectorLayer : []
        }; /*레이어 정보를 담아 두는 배열*/
    }

    /**
     * 
     * @param _mapView
     * @param _s_cn 시스템 번호
     */
    layercontrolClass.prototype.initWmsLayers = function ( _mapView, _s_cn ){
        this.resetWmsLyaers( _mapView );
        setTimeout(function() {
            OlSeesun.ol.control.layerControl.retriveSystemGroup( _s_cn ); /*시스템 목록 구해오기*/
            OlSeesun.ol.control.layerControl.retriveLayerGorup( _s_cn ); /*레이어 스타일 가져오기*/
            OlSeesun.ol.control.layerControl.retriveLayerStyle( _s_cn ); /*레이어 스타일 가져오기*/
            OlSeesun.ol.control.layerControl.retriveLayerEngineInfo( _s_cn ); /*레이어 스타일 가져오기*/

        },500);

    }
    /**
     * 시스템 정보 구해오기
     * @param _s_cn
     */
    layercontrolClass.prototype.retriveSystemGroup = function ( _s_cn ){
        var param  = { "s_cn" : _s_cn };
        param.dbtype = gisdbType; /* 데이터 베이스 설정 타입 */
        var sqlId = "layer.retriveSystemGroup";
        var rtParm = OlSeesun.publics.ajax.paramAjaxObject( sqlId, param );
        OlSeesun.publics.ajax.retriveAjaxObjectParam( rtParm, this.retriveSuccessSystemGroup, null );
    }

    /**
     * 레이어 시스템 목록 처리
     * @param _data
     */
    layercontrolClass.prototype.retriveSuccessSystemGroup = function ( _data ){
        var layers = OlSeesun.ol.control.layerControl.layers; /*레이어 저장싯킬 변수 선언*/
        for( var i=0; i < _data.length; i++ ){
            layers.sysGroup.push( _data[i] ); /*시스템 그룹 배열만들기*/
        }
    }

    /**
     * 실제 WMS 목록 구해오는 부분
     * @param _s_cn
     */
    layercontrolClass.prototype.retriveLayerGorup = function ( _s_cn ){
        var param  = { "s_cn" : _s_cn };
        param.dbtype = gisdbType; /* 데이터 베이스 설정 타입 */
        var sqlId = "layer.retriveLayerGorup";
        var rtParm = OlSeesun.publics.ajax.paramAjaxObject( sqlId, param );
        OlSeesun.publics.ajax.retriveAjaxObjectParam( rtParm, this.retriveSuccessLayerGorup, null );
    }
    /**
     * 시스템 wms 목록 구해오기
     * @param _data
     */
    layercontrolClass.prototype.retriveSuccessLayerGorup = function ( _data ){
        var layersGroup = OlSeesun.ol.control.layerControl.layers.layersGroup;
        var layerSysGroup = OlSeesun.ol.control.layerControl.layers.sysGroup; /*레이어 저장싯킬 변수 선언*/
        for( var i = 0; i< layerSysGroup.length; i++ ){ /*시스템 그룹 있는만큼 돌리기*/
            var tempArray = JSON.parse(JSON.stringify(layerSysGroup[i])); /* object 복제*/
            tempArray.group = [];
            for( var j = 0; j < _data.length; j++ ){ /*데이터 있는 만큼 반복문*/
                if( layerSysGroup[i].jg_code == _data[j].jg_code ){ /* 시스템 코드가 같은경우*/
                    _data[j].ly_turn = j + 1;  /*레이어 등록 순번*/
                    tempArray.group.push(_data[j]); /*탬프 배열에 저장시키기*/
                }
            }
            layersGroup.push(tempArray); /*레이어 그룹을 가지고 있는 배열에 저장*/
        }
    }
    /**
     * 레이어 엔진 정보 삽입
     * @param _s_cn
     */
    layercontrolClass.prototype.retriveLayerEngineInfo = function ( _s_cn ){
        var param  = { "s_cn" : _s_cn };
        param.dbtype = gisdbType; /* 데이터 베이스 설정 타입 */
        var sqlId = "layer.retriveLayerEngineInfo";
        var rtParm = OlSeesun.publics.ajax.paramAjaxObject( sqlId, param );
        OlSeesun.publics.ajax.retriveAjaxObjectParam( rtParm, this.retriveSuccessLayerEngineInfo, null );
    }

    /**
     * 레이어 엔진 정보 처리
     * @param _data
     */
    layercontrolClass.prototype.retriveSuccessLayerEngineInfo = function ( _data ){
        var layersGroup = OlSeesun.ol.control.layerControl.layers.layersGroup;
        /*전체 그룹 박복문*/
        for(var i = 0; i < layersGroup.length; i++){
            var group = layersGroup[i].group;
            /*그룹안에 잇는 데이터 조회*/
            for( var j = 0;  j < group.length; j++ ){
                //tempArray.styple = [];
                /*스타일 탭 돌려서 스타일 밀어 넣기*/
                for( var z = 0; z < _data.length; z++ ){
                    if( group[j].tm_cn == _data[z].tm_cn ){
                        if(group[j].engine == null){
                            group[j].engine = [];
                        }
                        group[j].engine.push( _data[z] );
                    }
                }
            }
        }
    }

    /**
     * 레이어 등록 및 삭제
     * @param _mapView
     * @param _layerNm 레이어명
     * @param _check 상태유무 true, false
     */
    layercontrolClass.prototype.deleteRegistrationLayer = function ( _mapView, _layerNm, _check ){
        var layer = this.retriveLayerInfo( _layerNm ); /* 레이어 정보 찾기 (이름으로)*/

        if( _check ){
            /*등록*/
            this.registration( _mapView, layer );
        }else{
            /*삭제*/
            this.deleteLayer( _mapView , layer );
        }
    }


    /**
     * 레이어 정보 찾기
     * @param _layerNm
     */
    layercontrolClass.prototype.retriveLayerInfo = function ( _layerNm ){
        var layersGroup = OlSeesun.ol.control.layerControl.layers.layersGroup;
        for( var i = 0 ; i < layersGroup.length; i++){
            for( var j = 0; j < layersGroup[i].group.length; j++ ){
                if(layersGroup[i].group[j].tm_en == _layerNm ){
                    return layersGroup[i].group[j];
                }
            }
        }
    }


    /**
     * wms 스타일 가져오기
     * @param _s_cn
     */
    layercontrolClass.prototype.retriveLayerStyle =  function ( _s_cn ){
        var param  = { "s_cn" : _s_cn };
        param.dbtype = gisdbType; /* 데이터 베이스 설정 타입 */
        var sqlId = "layer.retriveLayerStyle";
        var rtParm = OlSeesun.publics.ajax.paramAjaxObject( sqlId, param );
        OlSeesun.publics.ajax.retriveAjaxObjectParam( rtParm, this.retriveSuccessLayerStyle, null );
    }

    /**
     * wms 스타일 데이터 처리
     * @param _data
     */
    layercontrolClass.prototype.retriveSuccessLayerStyle = function ( _data ){
        var wmsLayersGroup = OlSeesun.ol.control.layerControl.layers.layersGroup;
        /*전체 그룹 박복문*/
        for(var i = 0; i < wmsLayersGroup.length; i++){
            var group = wmsLayersGroup[i].group;
            /*그룹안에 잇는 데이터 조회*/
            for( var j = 0;  j < group.length; j++ ){
                //tempArray.styple = [];
                /*스타일 탭 돌려서 스타일 밀어 넣기*/
                for( var z = 0; z < _data.length; z++ ){
                    if( group[j].tm_cn == _data[z].tm_cn ){
                        if(group[j].style == null){
                            group[j].style = [];
                        }
                        group[j].style.push( _data[z] );
                    }
                }
            }
        }
    }

    /**
     * 레이어 등록
     * @param _mapView
     * @param _layer
     */
    layercontrolClass.prototype.registration = function ( _mapView, _layer ){
        this.layers.serviceLayer.push( _layer ); /*서비스 레이어 등록*/
        /* WMS 등록 */
        OlSeesun.ol.control.wms.addWmsLayerTile( _mapView, _layer.tm_en, _layer.l_en, _layer.engine[0].e_en , _layer.engine[0].e_wms_url);
        /*순번 바꾸기*/
        this.changeLayerIndex( _mapView ) ;

    }
    /**
     * 레이어 등록 순서 바꾸기
     * @param _mapView
     */
    layercontrolClass.prototype.changeLayerIndex = function ( _mapView ){
        var serviceLayer = this.layers.serviceLayer;
        for(var i = 0; i < serviceLayer.length; i++){
            var layer =	this.retriveOlLayer( serviceLayer[i].tm_en, _mapView ); /*실제 시스템에 저정된 레어이 조회*/
            layer.setZIndex(serviceLayer[i].ly_turn); /*레이어 순서 바꾸기*/
        }
    }

    /**
     * 레이어 전체 지우기
     * @param _mpaView
     */
    layercontrolClass.prototype.deleteLayerAll = function ( _mapView ){
        /*레이어 전체 삭제.*/
        var layerArray, len, layer; /*변수 선언*/
        layerArray = _mapView.getLayers().getArray(), /*시스템에 등록되어 표출되는 레이어 전체 찾아서 변수에 저장*/
            len = layerArray.length; /* 총겟수 */
        while (len > 2){ /*레이어 2번째 부터 삭제*/
            layer = layerArray[len-1];
            /*base 가 아닌 레이어 삭제*/
            if(  layer.values_.type != "base" ){
                _mapView.removeLayer(layer); /* 레이어 삭제 */
            }
            len = layerArray.length;
        }
    }
    /**
     * 레이어 지우기
     * @param _mapView
     * @param _layer
     */
    layercontrolClass.prototype.deleteLayer = function ( _mapView, _layer ){
        if( _layer == null){
            return;
        }
        var serviceLayer = this.layers.serviceLayer; /*서비스 레이어 정의*/
        /*배열에서 내용삭제*/
        for( var i = 0; i < serviceLayer.length; i++ ){
            if(serviceLayer[i].tm_en == _layer.tm_en){
                serviceLayer.splice(i, 1);
            }
        }
        var layer = this.retriveOlLayer( _layer.tm_en, _mapView); /*실제 등록된 맵 객체 찾기*/
        _mapView.removeLayer( layer ); /*레이어 지우기*/
    }

    /**
     * 레이어 지우기
     * @param _mapView
     * @param _layer
     */
    layercontrolClass.prototype.deleteLayerId = function ( _mapView, _layerId ){
        if( _layerId == null){
            return;
        }
        var serviceLayer = this.layers.serviceLayer; /*서비스 레이어 정의*/
        /*배열에서 내용삭제*/
        for( var i = 0; i < serviceLayer.length; i++ ){
            if(serviceLayer[i].tm_en == _layerId){
                serviceLayer.splice(i, 1);
            }
        }
        /*백터지우기*/
        var vectorLayer = this.layers.vectorLayer;
        for( var j = 0; j < vectorLayer.length; j++ ){
            if(vectorLayer[j] == _layerId){
                vectorLayer.splice(i, 1);
            }
        }

        var layer = this.retriveOlLayer( _layerId, _mapView); /*실제 등록된 맵 객체 찾기*/
        _mapView.removeLayer( layer ); /*레이어 지우기*/
    }


    /**
     * 등록된 레이어 찾기
     * @param _layerId  레이어 아이디 ( 아이디 )
     * @param _mapView 맴객체체
     * @returns {*} 리턴 결과값
     */
    layercontrolClass.prototype.retriveOlLayer = function ( _layerId, _mapView ){
        var layers = _mapView.getLayers().getArray();
        /*레이어 반복문*/
        for( var i=0; i < layers.length; i++ ){
            if(layers[i].values_.id == _layerId){
                return layers[i];
            }
        }
    }
    /**
     * 등록된 레이어 찾기 ( 이름 )
     * @param _mpaView
     * @param _name
     */
    layercontrolClass.prototype.retriveOlLayerName = function ( _mapView, _name ){
        var layers = _mapView.getLayers().getArray();
        var foundLayer = null;
        for( var i = 0 ; i < layers.length ; i++ ){
            if( layers[i].get('title') == _name ){
                foundLayer = layers[i];
            }
        }
        return foundLayer;
    }

    /**
     * 레이어 등록
     * @param _mapView 맵객체
     * @param _layer 레이어
     */
    layercontrolClass.prototype.addLayer = function ( _mapView, _layer ){
        _mapView.addLayer( _layer );
    }

    /**
     * 레이어 인텍스 값 처리
     * @param _mapView
     * @param _layer  레이어
     * @param _value  index 값
     */
    layercontrolClass.prototype.setIndex = function ( _mapView, _layer, _value ){
        _layer.setZIndex( _value );
    }
    /**
     * 레이어 삭제
     * @param _mapView
     * @param _layer 레이어 객체
     */
    layercontrolClass.prototype.removeLayer = function ( _mapView, _layer ){
        _mapView.removeLayer( _layer );
    }
}

OlSeesun.ol.control.layerControl = new layercontrolClass();