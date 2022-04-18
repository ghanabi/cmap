/**
 * wms 컨트롤
 */
function wmscontrolClass(){

    /**
     * wms 레이어 등록
     * @param _mapView
     * @param _layerId 레이어 아이디
     * @param _layerNm 레이어 네임
     * @param _wmsType WMS 타임
     * @param _engineurl 엔진URL
     */
    wmscontrolClass.prototype.addWmsLayerTile =  function ( _mapView, _layerId, _layerNm, _wmsType, _engineurl ){
        var param = ""; /*파라미터 초기화*/
        var wmsLayer = null; /*wms 레이어 초기화*/
        switch ( _wmsType ) {
            case "vwolrd":
                param = this.vworldWmsParam(_layerNm);
                wmsLayer = this.wmsType("Tile", param, _layerId, _mapView);
                break;
            case "vwolrd_hybrid" :
                param = this.vworldWnsHybridParam(_layerId);
                wmsLayer = param;
                break;
            case "nsdi":
                param = this.nsdiWmsParam(_layerNm);
                wmsLayer = this.wmsType("Tile", param, _layerId, _mapView);
                break;
            case "its":
                param = this.itsWmsParam(_layerId);
                wmsLayer = param;
                break;
            case "engine_geoserver":
            case "engine_geoserverStyleNone":
            case "engine__geoserverTif" :
                param = this.engineWmsParam(_layerNm , _engineurl);
                wmsLayer = this.wmsType(_wmsType, param, _layerId, _mapView);
                break;
            case "superMap" :
                param = this.engineSuerMapWmsParam(_layerNm , _engineurl);
                wmsLayer = this.wmsType("superMap", param, _layerId, _mapView);
                break;
        }
        this.WmsService(_mapView, wmsLayer);

        /* 엔진부부만 SLD 업데이트 */
        if (_wmsType == "engine_geoserver") {
            this.wmsSldBodyService(_mapView, _layerId, _layerNm);
        }
    }

    /**
     *  브이월드 하이브리드
     */
    wmscontrolClass.prototype.vworldWnsHybridParam = function (_layerId){
        var param = new ol.layer.Tile({
            id : _layerId,
            source: new ol.source.XYZ({
                url :  xdWorldUrl + ':8080/2d/Hybrid/service/{z}/{x}/{y}.png'
            })
        });
        return param;
    }
    /* WMS 올리는 함수 */
    wmscontrolClass.prototype.WmsService = function(_mapView, _olTile) {
        // _olTile.setZIndex(5);
        _mapView.addLayer(_olTile);
    }

    /**
     * WorldParm
     * @param _layerNm
     */
    wmscontrolClass.prototype.vworldWmsParam = function(_layerNm) {
        var extent = OlSeesun.ol.function.getView.rtExtent();
        var param = new ol.source.TileWMS({
            url : "http://api.vworld.kr/req/wms?",
            params : {
                LAYERS : _layerNm,
                STYLES : _layerNm,
                CRS : "EPSG:3857",
                apikey : vworld_apikey,// "FCCAA7DB-AA6E-3EB6-942F-80DFD2B7684E",
                FORMAT : "image/png",
                DOMAIN : vWorld_domain, // 도메인키
                BBOX : extent[0] + "," + extent[1] + "," + extent[2] + ","
                    + extent[3],
                WIDTH : 256,
                HEIGHT : 256,
                EXCEPTIONS : "text/xml",
            },
            tileLoadFunction: function (image, src) {
                var img = image.getImage();
                src = "proxyGet.do?url=" + encodeURIComponent(src);
                img.src = src;
            }
        });
        return param;
    }
    /**
     * nsdiWmsParam 연계 파라미터
     * @param _layerNm
     * @returns {*}
     */
    wmscontrolClass.prototype.nsdiWmsParam = function(_layerNm) {
        var param = new ol.source.TileWMS(
            {
                url : nsdiUrl + "/nsdi/GisBuildingService/wms/getGisGnrlBuildingWMS?",
                params : {
                    layers : _layerNm,
                    crs : "EPSG:3857",
                    authkey : nsdiKey,// "dc6ce00f5b39240ea023de"
                },
                crossOrigin : "Anonymous"
            });
        return param;
    }
    /**
     * 교통량 센터
     * @param _layerId
     * @returns {*}
     */
    wmscontrolClass.prototype.itsWmsParam = function ( _layerId ){
        var param = new ol.layer.Tile({
            id : _layerId,
            source: new ol.source.XYZ({
//		        url:'http://openapi.its.go.kr/api/wmtsTile?key=1423184720937&zoom={z}&row={y}&col={x}'
                url:'https://its.go.kr:9443/geoserver/gwc/service/wmts/rest/ntic:N_LEVEL_{z}/ntic:REALTIME/EPSG:3857/EPSG:3857:{z}/{y}/{x}?format=image/png8'

            })
        });
        return param;
    }
    /**
     * 지오서버 WMS 파라미터
     * @param _layerNm
     * @param _engineurl
     * @returns {*}
     */
    wmscontrolClass.prototype.engineWmsParam = function( _layerNm, _engineurl ) {
        var param = new ol.source.ImageWMS({
            url : "wmsProxy.do?url=" + _engineurl,
            ratio : 1,
            params : {
                layers : _layerNm,
                VERSION : '1.3.0',
                transparent : "true",
                format : "image/png",
                TILED : 'true',

            }
        });
        return param;
    }
    /*엔진*/
    wmscontrolClass.prototype.engineSuerMapWmsParam = function( _layerNm, _engineurl ) {
        var param = new ol.source.ImageWMS({
            url : "wmsProxy.do?url=" + _engineurl,
            ratio : 1,
            params : {
                layers : _layerNm,
                VERSION : '1.1.1',
                transparent : "true",
                format : "image/png",
                TILED : 'true',
                CRS : "EPSG:3857",
            }
        })
        return param;
    }


    /* wms별로 레이어 생성 */
    wmscontrolClass.prototype.wmsType = function(_type, _param, _layerId, _mapView) {
        var wmstype = null;
        switch (_type) {
            case "Tile":
                /* 타일 세팅 */
                wmstype = new ol.layer.Tile({
                    id : _layerId,
                    projection : "EPSG:3857",
                    extent : _mapView.getView().getProjection().getExtent(),
                    source : _param
                });
                break;
            case "superMap":
                /* 타일 세팅 */
                wmstype = new ol.layer.Image({
                    id : _layerId,
                    source : _param
                });
                break;
                break;
            case "engine_geoserver":
            case "engine__geoserverTif" :
            case "engine_geoserverStyleNone":
                wmstype = new ol.layer.Image({
                    id : _layerId,
                    source : _param
                });
                break;
        }
        return wmstype;
    }

    /**
     * SLD_BODY 서비스 등옭
     * @param _mapView
     * @param _layerId
     * @param _layerNm
     */
    wmscontrolClass.prototype.wmsSldBodyService = function(_mapView, _layerId, _layerNm) {
        var layer = OlSeesun.ol.control.layerControl.retriveLayerInfo( _layerNm );
        var sldboy = this.wmsSldBodyParam(layer);
        var olLayer = OlSeesun.ol.control.layerControl.retriveOlLayer(_layerId, _mapView);

        olLayer.getSource().updateParams({
            SLD_BODY : sldboy
        });
    }
    /**
     * SLD_BODY 문법만들기
     * @param _layer
     * @returns {string}
     */
    wmscontrolClass.prototype.wmsSldBodyParam = function(_layer) {
        /* 라인인경우 SLD버전 */
        if (_layer.l_type == "Line") {
            version_sld = "1.1.0";
            se = "se:";
        } else {
            version_sld = "1.1.0";
            se = "";
        }

        var version_sld = "1.0.0";
        var se = "";
        var sldBody = "";
        sldBody += "<?xml version='1.0' encoding='UTF-8'?>";
        sldBody += "<StyledLayerDescriptor xmlns='http://www.opengis.net/sld' ";
        sldBody += "  xmlns:ogc='http://www.opengis.net/ogc' xmlns:se='http://www.opengis.net/se' ";
        sldBody += " xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' ";
        sldBody += " xmlns:gml='http://www.opengis.net/gml/3.2' ";
        sldBody += " version='" + version_sld + "' xsi:schemaLocation=''>";
        sldBody += "<NamedLayer>";

        sldBody += "<" + se + "Name>ssp:" + _layer.l_en + "</" + se + "Name>";

        sldBody += "<UserStyle>";
        sldBody += "<" + se + "FeatureTypeStyle>";
        var sldParm = this.wmsSldBodyStyle(_layer, se);
        sldBody += sldParm;
        sldBody += "</" + se + "FeatureTypeStyle>";
        sldBody += "</UserStyle>";
        sldBody += "</NamedLayer>";
        sldBody += "</StyledLayerDescriptor>";

        return sldBody;

    }
    /**
     * SLD 스타일 생성
     * @param _layer
     * @param _se
     * @returns {string}
     */
    wmscontrolClass.prototype.wmsSldBodyStyle = function(_layer, _se) {
        var style_sld = "";
        for (var i = 0; i < _layer.style.length; i++) {
            style_sld += "<" + _se + "Rule>";
            style_sld += "<" + _se + "MaxScaleDenominator>" + _layer.tm_scale
                + "</" + _se + "MaxScaleDenominator>";

            /* 필터값 있으면 처리 구분 */
            if (_layer.style[i].tms_attr_cd != null
                && _layer.style[i].tms_attr_cd != "") {
                style_sld += this.wmsSldFilter(_layer.style[i], _layer.l_type);
            }
            /* 스타일 */
            style_sld += this.wmsSldStyle(_layer.style[i], _layer.l_type);

            /* 폰트 */
            if (_layer.style[i].tms_s_type == "FONT") {
                style_sld += this.wmsSldTextSymbolizer(_layer.style[i],
                    _layer.l_type, _se);
                //fn_make_sld_rule_TextSymbolizer(layer.LY_TYPE, font_obj, se); // font
            }

            style_sld += "</" + _se + "Rule>";
        }
        return style_sld;

    }

    /* 필터 */
    wmscontrolClass.prototype.wmsSldFilter = function(_layerStyle, _layerType) {
        var style_sld = "";
        if (_layerStyle.tms_attr_tp == "LIKE") {
            style_sld += "<ogc:Filter>";
            style_sld += "<ogc:PropertyIsLike wildCard='_' singleChar='!' escapeChar='?'>";
            style_sld += "<ogc:PropertyName>" + _layerStyle.tms_attr_cd
                + "</ogc:PropertyName>";
            style_sld += "<ogc:Literal>" + _layerStyle.tms_attr_val
                + "</ogc:Literal>";
            style_sld += "</ogc:PropertyIsLike>";
            style_sld += "</ogc:Filter>";
        } else if (_layerStyle.tms_attr_tp == "EQUAL") {
            style_sld += "<ogc:Filter>";
            style_sld += "<ogc:PropertyIsEqualTo>";
            style_sld += "<ogc:PropertyName>" + _layerStyle.tms_attr_cd
                + "</ogc:PropertyName>";
            style_sld += "<ogc:Literal>" + _layerStyle.tms_attr_val
                + "</ogc:Literal>";
            style_sld += "</ogc:PropertyIsEqualTo>";
            style_sld += "</ogc:Filter>";
        } else if (_layerStyle.tms_attr_tp == "BETWEEN") {
            var ary_val = _layerStyle.tms_attr_val.split(',');
            style_sld += "<ogc:Filter>";
            style_sld += "<ogc:PropertyIsBetween>";
            style_sld += "<ogc:PropertyName>" + _layerStyle.tms_attr_cd
                + "</ogc:PropertyName>";
            style_sld += "<ogc:LowerBoundary>";
            style_sld += "<ogc:Literal>" + _layerStyle.tms_ary_val[0]
                + "</ogc:Literal>";
            style_sld += "</ogc:LowerBoundary>";
            style_sld += "<ogc:UpperBoundary>";
            style_sld += "<ogc:Literal>" + _layerStyle.tms_ary_val[1]
                + "</ogc:Literal>";
            style_sld += "</ogc:UpperBoundary>";
            style_sld += "</ogc:PropertyIsBetween>";
            style_sld += "</ogc:Filter>";
        } else if (_layerStyle.tms_attr_tp == "AND") {
            var ary_val = _layerStyle.tms_attr_val.split(',');
            var ary_cd = _layerStyle.tms_attr_cd.split(',');
            style_sld += "<ogc:Filter>";
            style_sld += "<ogc:And>";
            style_sld += "<ogc:PropertyIsEqualTo>";
            style_sld += "<ogc:PropertyName>" + _layerStyle.tms_ary_cd[0]
                + "</ogc:PropertyName>";
            style_sld += "<ogc:Literal>" + _layerStyle.tms_ary_val[0]
                + "</ogc:Literal>";
            style_sld += "</ogc:PropertyIsEqualTo>";
            style_sld += "<ogc:PropertyIsEqualTo>";
            style_sld += "<ogc:PropertyName>" + _layerStyle.tms_ary_cd[1]
                + "</ogc:PropertyName>";
            style_sld += "<ogc:Literal>" + _layerStyle.tms_ary_val[1]
                + "</ogc:Literal>";
            style_sld += "</ogc:PropertyIsEqualTo>";
            style_sld += "</ogc:And>";
            style_sld += "</ogc:Filter>";
        }
        return style_sld;

    }

    /* wmsSldTextSymbolizer */
    wmscontrolClass.prototype.wmsSldTextSymbolizer = function(_layerStyle, _layerType, _se) {

        var version_text = "";

        if (_layerType == "Line") {
            version_text = "version='1.1.0'";
        }

        var style_sld = "";
        style_sld += "<" + _se + "TextSymbolizer " + version_text + ">";
        style_sld += "<" + _se + "Label>";
        style_sld += "<ogc:PropertyName>" + _layerStyle.tms_attr_cd
            + "</ogc:PropertyName>";
        style_sld += "</" + _se + "Label>";

        style_sld += "<" + _se + "Font>";
        if (_layerType == "Line") {
            style_sld += "<se:SvgParameter name='font-family'>"
                + _layerStyle.tms_f_fam + "</se:SvgParameter>";
            style_sld += "<se:SvgParameter name='font-style'>normal</se:SvgParameter>";
            style_sld += "<se:SvgParameter name='font-weight'>normal</se:SvgParameter>";
            style_sld += "<se:SvgParameter name='font-size'>"
                + _layerStyle.tms_p_size + "</se:SvgParameter>";
            style_sld += "</" + _se + "Font>";
            style_sld += "<se:LabelPlacement>";
            style_sld += "<se:LinePlacement>";
            style_sld += "<se:VendorOption name='text_arrange_pos'>CENTER</se:VendorOption>";
            style_sld += "<se:VendorOption name='text_arrange_line'>ABOVE</se:VendorOption>";
            style_sld += "<se:VendorOption name='text_arrange_gap'>NORMAL</se:VendorOption>";
            style_sld += "<se:VendorOption name='text_arrange_gap_value'>50.0</se:VendorOption>";
            style_sld += "</se:LinePlacement>";
            style_sld += "</se:LabelPlacement>";
            style_sld += "<se:Fill>";
            style_sld += "<se:SvgParameter name='fill'>"
                + _layerStyle.tms_f_color + "</se:SvgParameter>";
            style_sld += "</se:Fill>";
        } else {
            style_sld += this.makeSldCssParameter("font-family",
                _layerStyle.tms_f_fam);
            style_sld += this.makeSldCssParameter("font-style", "normal");
            style_sld += this.makeSldCssParameter("font-weight", "bold");
            style_sld += this.makeSldCssParameter("font-size",
                _layerStyle.tms_p_size);
            style_sld += "</Font>";
            if (_layerType == "Point" || _layerType == "Graphic") {
                style_sld += "<LabelPlacement>";
                style_sld += "<PointPlacement>";
                style_sld += "<Displacement>";
                style_sld += "<DisplacementX>0.0</DisplacementX>";
                style_sld += "<DisplacementY>10.0</DisplacementY>";
                style_sld += "</Displacement>";
                style_sld += "</PointPlacement>";
                style_sld += "</LabelPlacement>";
            }
            style_sld += "<Fill>";
            style_sld += this.makeSldCssParameter("fill",
                _layerStyle.tms_f_color);
            style_sld += "</Fill>";
        }

        if (_layerStyle.tms_boxtype != "none") {
            style_sld += "<VendorOption name='background_type'>"
                + _layerStyle.tms_boxtype.FONT_BOXTYPE + "</VendorOption>";
            style_sld += "<VendorOption name='background_fill'>"
                + _layerStyle.tms_boxfc + "</VendorOption>";
            style_sld += "<VendorOption name='background_line'>"
                + _layerStyle.tms_boxsc + "</VendorOption>";
            style_sld += "<VendorOption name='background_offset'>"
                + _layerStyle.tms_boxsize + "</VendorOption>";
            style_sld += "<VendorOption name='background_align'>CENTER</VendorOption>";
        }
        style_sld += "<Halo>";
        style_sld += "<Radius>";
        style_sld += "<ogc:Literal>2</ogc:Literal>";
        style_sld += "</Radius>";
        style_sld += "<Fill>";
        style_sld += "<CssParameter name='fill'>#ffffff</CssParameter>";
        style_sld += "<CssParameter name='fill-opacity'>0.85</CssParameter>";
        style_sld += "</Fill>";
        style_sld += "</Halo>";
        style_sld += "</" + _se + "TextSymbolizer>";
        return style_sld;
    }

    /* sld 파라미터 */
    wmscontrolClass.prototype.makeSldCssParameter = function(_name, _value) {
        return "<CssParameter name='" + _name + "'>" + _value
            + "</CssParameter>";
    }

    /* 스타일 */
    wmscontrolClass.prototype.wmsSldStyle = function(_layerStyle, _layerType) {
        var style_sld = "";

        if (_layerType == "Polygon") {
            style_sld += "<PolygonSymbolizer>";
            style_sld += "<Fill>";
            style_sld += this.makeSldCssParameter("fill",
                _layerStyle.tms_f_color);
            style_sld += this.makeSldCssParameter("fill-opacity",
                _layerStyle.tms_f_op);
            style_sld += "</Fill>";
            style_sld += "<Stroke>";
            style_sld += this.makeSldCssParameter("stroke",
                _layerStyle.tms_s_color);
            style_sld += this.makeSldCssParameter("stroke-width",
                _layerStyle.tms_s_width);
            style_sld += this.makeSldCssParameter("stroke-opacity",
                _layerStyle.tms_s_op);

            if (_layerStyle.tms_s_dash != "1") {
                style_sld += this.makeSldCssParameter("stroke-dasharray",
                    _layerStyle.tms_s_dash);
            }
            style_sld += "</Stroke>";
        }

        // type = line
        if (_layerType == "Line") {
            if (_layerStyle.tms_c_s_style == "FLAT"
                && _layerStyle.tms_c_e_style == "FLAT") {

            } else {
                style_sld += "<se:LineSymbolizer version='1.1.0'>";
                style_sld += "<se:Name>CompositeLineCap</se:Name>";
                style_sld += "<se:Stroke/>";
                style_sld += "<se:VendorOption name='cap_direction'>PARALLEL</se:VendorOption>";
                style_sld += "<se:VendorOption name='start_cap'>STYLE</se:VendorOption>";
                style_sld += "<se:VendorOption name='cap_style'>"
                    + _layerStyle.tms_c_s_style + "</se:VendorOption>";
                style_sld += "<se:VendorOption name='cap_size'>"
                    + _layerStyle.tms_c_s_size + "</se:VendorOption>";
                style_sld += "<se:VendorOption name='cap_color'>#FF"
                    + _layerStyle.tms_s_color.substring(1)
                    + "</se:VendorOption>";
                style_sld += "<se:VendorOption name='cap_fill'>true</se:VendorOption>";
                style_sld += "<se:VendorOption name='cap_position'>CENTER</se:VendorOption>";
                style_sld += "<se:VendorOption name='end_cap'>STYLE</se:VendorOption>";
                style_sld += "<se:VendorOption name='cap_style'>"
                    + _layerStyle.tms_c_e_style + "</se:VendorOption>";
                style_sld += "<se:VendorOption name='cap_size'>"
                    + _layerStyle.tms_c_e_size + "</se:VendorOption>";
                style_sld += "<se:VendorOption name='cap_color'>#FF"
                    + _layerStyle.tms_s_color.substring(1)
                    + "</se:VendorOption>";
                style_sld += "<se:VendorOption name='cap_fill'>true</se:VendorOption>";
                style_sld += "<se:VendorOption name='cap_position'>CENTER</se:VendorOption>";
                style_sld += "</se:LineSymbolizer>";
            }

            style_sld += "<se:LineSymbolizer version='1.1.0'>";
            style_sld += "<se:Stroke>";
            style_sld += "<se:SvgParameter name='stroke'>"
                + _layerStyle.tms_s_color + "</se:SvgParameter>";
            style_sld += "<se:SvgParameter name='stroke-opacity'>"
                + _layerStyle.tms_s_op + "</se:SvgParameter>";
            style_sld += "<se:SvgParameter name='stroke-width'>"
                + _layerStyle.tms_s_width + "</se:SvgParameter>";
            if (arry_this_style.S_DASH != "1") {
                style_sld += "<se:SvgParameter name='stroke-dasharray'>"
                    + _layerStyle.tms_s_dash + "</se:SvgParameter>";
            }
            style_sld += "</se:Stroke>";
            style_sld += "</se:LineSymbolizer>";
        }

        // type = graphic <PointSymbolizer>
        if (_layerType == "Graphic") {
            style_sld += "<PointSymbolizer>";
            style_sld += "<Graphic>"; // ///wms_style
            style_sld += "<ExternalGraphic>";
            style_sld += "<OnlineResource xlink:type='simple' xlink:href='"
                + img_url + _layerStyle.tms_f_color + "' />";
            style_sld += "<Format>image/png</Format>";
            style_sld += "</ExternalGraphic>";
            style_sld += "<Size>" + _layerStyle.tms_p_size + "</Size>";
            style_sld += "</Graphic>";
        }
        // type = point <PointSymbolizer>
        else if (_layerType == "Point") {
            style_sld += "<PointSymbolizer>";
            style_sld += "<Graphic>";
            style_sld += "<Mark>";
            style_sld += "<WellKnownName>circle</WellKnownName>";
            style_sld += "<Fill>";
            style_sld += this.makeSldCssParameter("fill",
                _layerStyle.tms_f_color);
            style_sld += this.makeSldCssParameter("fill-opacity",
                _layerStyle.tms_f_op);
            style_sld += "</Fill>";
            style_sld += "<Stroke>";
            style_sld += this.makeSldCssParameter("stroke",
                _layerStyle.tms_s_color);
            style_sld += this.makeSldCssParameter("stroke-width",
                _layerStyle.tms_s_width);
            style_sld += this.makeSldCssParameter("stroke-opacity",
                _layerStyle.tms_s_op);
            style_sld += "</Stroke>";
            style_sld += "</Mark>";
            style_sld += "<Size>" + _layerStyle.tms_p_size + "</Size>";
            style_sld += "</Graphic>";
        }

        if (_layerType == "Polygon") {
            style_sld += "</PolygonSymbolizer>";
        }
        if (_layerType == "Graphic") {
            style_sld += "</PointSymbolizer>";
        }
        if (_layerType == "Point") {
            style_sld += "</PointSymbolizer>";
        }

        if (_layerType == "Polygon" && _layerStyle.tms_pt_yn == "Y") {
            style_sld += "<PolygonSymbolizer>";
            style_sld += "<Fill>";
            style_sld += "<GraphicFill>";
            style_sld += "<Graphic>";
            style_sld += "<ExternalGraphic>";
            style_sld += "<OnlineResource xmlns:xlink='http://www.w3.org/1999/xlink' xlink:type='simple' xlink:href='"
                + img_url + "mappattern/" + _layerStyle.tms_pt_file + "'/>";

            style_sld += "<Format>image/png</Format>";
            style_sld += "</ExternalGraphic>";
            style_sld += "</Graphic>";
            style_sld += "</GraphicFill>";
            style_sld += "</Fill>";
            style_sld += "</PolygonSymbolizer>";
        }
        return style_sld;

    }
}
OlSeesun.ol.control.wms = new wmscontrolClass();