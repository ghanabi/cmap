/**
 * 통계 지도 만들기
 */
function statsMapClass(){
    this.statsMapSource = null;
    this.statsMapLayer = "";
    this.myChart = null;
    this.UNIT = null;
    this.colorNumber = 1;
    this.value_grade = []; /*통계 값*/
    this.color_grade = []; /*zjffj rmfnq*/
    this.statsData = [];
    this.sampleData = [
        { cnt : 100, code : '11', nm :'서울특별시' }, { cnt : 200, code : '26', nm :'부산광역시' }, { cnt : 300, code : '27', nm :'대구광역시' },
        { cnt : 400, code : '28', nm :'인천광역시' }, { cnt : 500, code : '29', nm :'광주광역시' }, { cnt : 600, code : '30', nm :'대전광역시' },
        { cnt : 700, code : '31', nm :'울산광역시' }, { cnt : 800, code : '36', nm :'세종특별자치시' }, { cnt : 900, code : '41', nm :'경기도' },
        { cnt : 1000, code : '42', nm :'강원도' },{ cnt : 1100, code : '43', nm :'충청북도' }, { cnt : 1200, code : '44', nm :'충청남도' },
        { cnt : 1300, code : '45', nm :'전라북도' },{ cnt : 1400, code : '46', nm :'전라남도' }, { cnt : 1500, code : '47', nm :'경상북도' },
        { cnt : 1600, code : '48', nm :'경상남도'},{ cnt : 1700, code : '50', nm :'제주특별자치도' }
    ];
    this.column = null;
    this.type = null;
    this.geoJson = "TL_SCCO_CTPRVN.geojson"; /*geojson 파일 정의*/
    this.table = "SAMPLE_STSTSMAP"; /* 테이블명 파일 정의 */

    /**
     * 통계지도 세팅
     * @param _mapView
     * @param _data
     * @param _unit
     * @param _type
     */
    statsMapClass.prototype.setStatsMap = function( _mapView, _data, _unit, _type ){
        if( _unit != null  ){
            this.UNIT = _unit;
        }else{
            this.UNIT = "개소";
        }
        this.statsData = _data;

        /*초기화*/
        this.resetStatMap( _mapView );
        this.setMapStatsValue( _mapView, _data, _type);
        this.setMapStatsChart( _data );
    }
    /**
     * 통계지도 초기화
     * @param _mapView
     */
    statsMapClass.prototype.resetStatMap = function ( _mapView ){
        OlSeesun.ol.control.layerControl.deleteLayerId( _mapView ,'statsLayer');
    }
    /**
     * 통계지도 값 세팅
     * @param _mapView
     * @param _data
     */
    statsMapClass.prototype.setMapStatsValue = function ( _mapView, _data, _type){
        if(_type != null){
            this.type = _type;
        }

        OlSeesun.ol.function.statsMap.getStatsColor( this.colorNumber, _data ); /*컬러값 구하기*/
        switch (  this.type ){
            case "DBData" : /*디비 쿼리로 조정 PostGIs - ST_Simplify 사용*/
                this.setStatsMapDBData( _mapView, _data );
                break;
            case "GeoJson" :
                this.setStatsMapGeoJsonData( _mapView, _data );
                break;
        }
    }

    /**
     * Gejson 파일 로딩
     * @param _mapView
     * @param _data
     */
    statsMapClass.prototype.setStatsMapGeoJsonData = function ( _mapView, _data ){
        var path = geojsonPath + OlSeesun.ol.function.statsMap.geoJson;
        var feature = OlSeesun.ol.function.geoJson.retriveGeoJsonLoing( _mapView, path );
        this.column = "CTPRVN_CD";
        OlSeesun.ol.function.statsMap.drawStatsMap(  _mapView, feature, _data );
    }
    /**
     * 데이터 처리
     * @param _mapView
     * @param _data
     */
    statsMapClass.prototype.setStatsMapDBData = function ( _mapView, _data ){
        var _this = this;
        var srs = engineProjNm.split(":");
        var param = {
            "tableNm" : this.table,
            "column" :  this.column,
            "srs" : srs[1]
        };
        param.dbtype = gisdbType; /* 데이터 베이스 설정 타입 */
        var sqlId = "statsMap.searchStatsGIS";
        var rtParm = OlSeesun.publics.ajax.paramAjaxObject( sqlId, param);
        OlSeesun.publics.ajax.retriveAjaxObjectParam(rtParm, function (_dbData, _mapView){
            var features =  OlSeesun.ol.control.feature.addFeaturesGeoMater( _mapView, _dbData );
            OlSeesun.ol.function.statsMap.drawStatsMap( _mapView , features , _data );
        }, _mapView)
    }

    /**
     * 데이터 처리
     * @param _data
     * @param _wfsData
     */
    statsMapClass.prototype.drawStatsMap = function ( _mapView , _gisData , _data){
        OlSeesun.ol.control.layerControl.deleteLayerId( _mapView,'statsMapLayer');
        /*단계별 데이터 넣는 부분*/
        if(_gisData.length > 0  && _data.length > 0) {
            var array_data = [];
            var dataIsEmpty = false;

            $(_data).each(function(index, item) {
                var chk_color = false;
                if(item.cnt != 0){
                    for(var j=5; j>0 ; j--){
                        if((OlSeesun.ol.function.statsMap.value_grade[j] * 1)  <= item.cnt && (OlSeesun.ol.function.statsMap.value_grade[j-1] * 1 ) > item.cnt){
                            item.color = OlSeesun.ol.function.statsMap.color_grade[j-1];
                            chk_color = true;
                        }
                    }
                }else{
                    item.color = "#ffffff";
                    chk_color = true;
                    dataIsEmpty = true;
                }

                if(chk_color == false){
                    item.color = OlSeesun.ol.function.statsMap.color_grade[4];
                }
                array_data.push(item);
            });
            /*소스 생성*/
            OlSeesun.ol.function.statsMap.statsMapSource = new ol.source.Vector();
            /*백터 생성*/
            OlSeesun.ol.function.statsMap.statsMapLayer = new ol.layer.Vector({
                source: OlSeesun.ol.function.statsMap.statsMapSource,
                id:"statsMapLayer",
                style:new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 0, 0, 1)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(255, 0, 0, 1)',
                        width: 2
                    }),
                })
            });
            /*인덱스 설정*/
            OlSeesun.ol.function.statsMap.statsMapLayer.setZIndex( 99 );
            /*레이어 등록*/
            _mapView.addLayer( OlSeesun.ol.function.statsMap.statsMapLayer );
            /*백터 레이어 관리하는 부분에 추가*/
            OlSeesun.ol.control.layerControl.layers.vectorLayer.push("statsMapLayer");
            for( var i = 0; i < _gisData.length; i++){
                for(var j=0; j < array_data.length; j++){
                    if( _gisData[i].resultValue[0][OlSeesun.ol.function.statsMap.column] ==  array_data[j].code ){
                        _gisData[i].setStyle(
                            new ol.style.Style({
                                fill: new ol.style.Fill({
                                    color: OlSeesun.ol.control.feature.edit.hexToRgb( array_data[j].color, 80 ),
                                }),
                                stroke: new ol.style.Stroke({
                                    color: OlSeesun.ol.control.feature.edit.hexToRgb( "#000000", 80 ),
                                    width: 2
                                }),
                                text : new ol.style.Text({
                                    text : array_data[j].nm + ":" + OlSeesun.publics.textValue.caculateCipher(array_data[j].cnt),
                                    font: '10px Verdana',
                                    scale : 1.5,
                                    fill : new ol.style.Fill({
                                        color : OlSeesun.ol.control.feature.edit.hexToRgb( "#000000", 80 )
                                    }),
                                })

                            })
                        );
                        OlSeesun.ol.function.statsMap.statsMapSource.addFeature(_gisData[i]);
                    }
                }
            }
        }
    }



    /**
     * 색상 및 값 세팅
     * @param _num  색상번호
     * @param _data 통계데이터
     */
    statsMapClass.prototype.getStatsColor = function( _num , _data ){
        var _this = this;
        var value_min = 0;
        var value_max = 100;

        var chartName=[]; //차트용
        var chartData=[]; //차트용


        /*데이터가 있는경우 처리*/
        if(_data.length > 0){
            /* 이름순으로 정렬 통계 값은 cnt로 정의 한다 */
            _data.sort(function(a, b) { // 오름차순
                return a.cnt > b.cnt ? -1 : a.cnt > b.cnt ? 1 : 0;
            });
            /*데이터 처리*/
            $(_data).each(function(index, item) {
                /*최대값 구해오기*/
                if(index == 0){
                    value_max = Number(item.cnt)+1;
                }
                /*최소값 구하기*/
                if(index == _data.length){
                    value_min = Number(item.cnt);
                }
                chartName.push(item.code);
                chartData.push(Number(item.cnt));
            });
            /*값의 범위를 만들기*/
            var value_gap = (value_max - value_min)/5;
            this.value_grade = [];
            this.color_grade = [];

            var input_color = $("#colorattr_static")[0].value;

            if( _num == 1){
                var randomcolor = new Array('#FF1212', '#FFBB00', '#98C138', '#6D6AB7', '#FF00DD');
                var ran_color = _this.randomItem(randomcolor);
                input_color = ran_color;
                /*팝업내 색상에 추가*/
                $("#colorattr_static")[0].value = ran_color;
                $('#colorattr_static').css("background-color", input_color);
            }
            input_color = "0x"+input_color.substr(1,6);

            /*5단계 분포의 색상 만들기 및 값 만들기*/
            for(var i = 0; i < 5; i++ ) {
                var start_value = value_max-( value_gap * i );
                OlSeesun.ol.function.statsMap.value_grade.push(start_value);

                /*색상만들기*/
                var color = OlSeesun.ol.function.statsMap.adjustBrightness(Number(input_color), (i*40));
                color = "#"+color.toString(16);
                OlSeesun.ol.function.statsMap.color_grade.push(color);
                $("#static_color_toc"+i).css("background",color);
            }
            this.value_grade.push(value_min);
            for(var j=0;j<this.value_grade.length-1;j++){
                //$("#static_value_start"+j)[0].textContent = OlSeesun.publics.textValue.caculateCipher(String(Math.round(this.value_grade[j])));
                if(OlSeesun.publics.textValue.caculateCipher(String(Math.round(this.value_grade[j+1]))) == 0){
                    this.value_grade[j+1] = 1;
                }
                $("#static_value_start_end"+j)[0].textContent = OlSeesun.publics.textValue.caculateCipher(String(Math.round(this.value_grade[j+1])))+" ~ "+OlSeesun.publics.textValue.caculateCipher(String(Math.round(this.value_grade[j])));
            }
            this.initJpicker();
            OlSeesun.ol.function.statsMap.colorNumber = 1;
            OlSeesun.publics.textValue.show('static_toc');
        }
    }
    /**
     * 랜덤 색상 가져오기
     * @param _a
     * @returns {*}
     */
    statsMapClass.prototype.randomItem = function ( _a ) {
        return _a[Math.floor(Math.random() * _a.length)];
    }

    /**
     * 색상 명도 조절
     * @param _rgb
     * @param _brite
     * @returns {number}
     */
    statsMapClass.prototype.adjustBrightness = function ( _rgb, _brite ){
        var r = Math.max(Math.min(((_rgb >> 16) & 0xFF) + _brite, 255), 0);
        var g = Math.max(Math.min(((_rgb >> 8) & 0xFF) + _brite, 255), 0);
        var b = Math.max(Math.min((_rgb & 0xFF) + _brite, 255), 0);
        return (r << 16) | (g << 8) | b;
    }

    /**
     * jpicker 세팅
     */
    statsMapClass.prototype.initJpicker = function (){
        $('.jPicker').remove();
        /* 박스면색상 3*/
        $('#colorattr_static').jPicker(
            {window:{ expandable: true }},
            /*확인버튼*/
            function(color, context){
                var all = color.val('all');
                $('#colorattr_static').val('#' + all.hex);
            },
            function(color, context){
            },
            /*취소버튼*/
            function(color, context)
            {
                var all = color.val('all');
                $('#colorattr_static').val('#' + all.hex);
            }
        );
        $('#colorattr_static').css('display','none');
    }

    /**
     * 컬러변경
     */
    statsMapClass.prototype.changeMapColor = function ( _mapView ){
        this.resetStatMap( _mapView );
        OlSeesun.ol.function.statsMap.colorNumber = 0; /*컬러값 랜덤 아닌걸로 변경*/
        this.setMapStatsValue(  _mapView,  this.statsData );
    }

    /**
     * 차트 데이터 열기
     */
    statsMapClass.prototype.showChart = function (){
        var chk_ov = $(".attribute_chart").css("display");
        if (chk_ov.indexOf("block") != -1){
            $(".attribute_chart").css({'display' : 'none'});
            $(".attribute_chart_box").css({'display' : 'none'});
            $("#chart_show_id").attr("src","img/static/bt_chats.png");
        }else{
            $(".attribute_chart").css({'display' : 'block'});
            $(".attribute_chart_box").css({'display' : 'block'});
            $("#chart_show_id").attr("src","img/static/bt_chats_close.gif");
        }
    }

    /**
     * 차트 데이터 올리기
     * @param _data
     */
    statsMapClass.prototype.setMapStatsChart = function  ( _data ) {
        var lables = [];
        var datas = [];
        for( var i = 0; i < _data.length; i++ ){
            if(_data[i].cnt != 0){
                lables.push(_data[i].nm);
                datas.push(Number(_data[i].cnt));
            }
        }
        var ctx = document.getElementById('mychart').getContext('2d');
        if(this.myChart != null){
            this.myChart.destroy();
        }
        this.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels:lables,
                datasets: [{
                    label: '시군구 통계',
                    data: datas,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(152, 0, 0, 0.2)',
                        'rgba(153, 138, 0, 0.2)',
                        'rgba(107, 153, 0, 0.2)',
                        'rgba(0, 130, 153, 0.2)',
                        'rgba(5, 0, 153, 0.2)',
                        'rgba(153, 0, 133, 0.2)',
                        'rgba(204, 144, 61, 0.2)',
                        'rgba(196, 183, 59, 0.2)',
                        'rgba(71, 200, 62, 0.2)',
                        'rgba(70, 65, 217, 0.2)',
                        'rgba(217, 65, 140, 0.2)',
                        'rgba(241, 95, 95, 0.2)',
                        'rgba(242, 150, 97, 0.2)',
                        'rgba(229, 216, 92, 0.2)',
                        'rgba(134, 229, 127, 0.2)',
                        'rgba(103, 153, 225, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(152, 0, 0, 1)',
                        'rgba(153, 138, 0, 1)',
                        'rgba(107, 153, 0, 1)',
                        'rgba(0, 130, 153, 1)',
                        'rgba(5, 0, 153, 1)',
                        'rgba(153, 0, 133, 1)',
                        'rgba(204, 144, 61, 1)',
                        'rgba(196, 183, 59, 1)',
                        'rgba(71, 200, 62, 1)',
                        'rgba(70, 65, 217, 1)',
                        'rgba(217, 65, 140, 1)',
                        'rgba(241, 95, 95, 1)',
                        'rgba(242, 150, 97, 1)',
                        'rgba(229, 216, 92, 1)',
                        'rgba(134, 229, 127, 1)',
                        'rgba(103, 153, 225, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}


OlSeesun.ol.function.statsMap = new statsMapClass();