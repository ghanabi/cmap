<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2021-05-13
  Time: 오후 3:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/taglib/taglib.jsp"%>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" pattern="yyyyMMddHHmmss" var="nowDate"/>
<!-- 스타일 -->
<link type="text/css" href="${ctx}/js/libs/openlayers/ol-v5.30/ol.css?version=${nowDate}" rel="stylesheet">
<link type="text/css" href="${ctx}/js/libs/openlayers/ol-ext/ol-ext.min.css?version=${nowDate}" rel="stylesheet">
<link type="text/css" href="${ctx}/css/gis/measuring.css?version=${nowDate}" rel="stylesheet">
<link type="text/css" href="${ctx}/css/gis/static.css?version=${nowDate}" rel="stylesheet">
<!-- underscore -->
<%--<script type="text/javascript" src="${ctx}/js/libs/underscoreJs/underscore-umd.js?version=${nowDate}"></script>--%>

<!-- jquery 등록 -->
<script type="text/javascript" src="${ctx}/js/libs/jquery/jquery-3.4.1.min.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/libs/jquery/jquery-ui-1.11.4.min.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/libs/jquery/Blob.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/libs/jquery/FileSaver.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/libs/jquery/chart.min.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/libs/jquery/jquery.blockUI.js?version=${nowDate}"></script>
<!-- jpicker   -->
<script type="text/javascript" src="${ctx}/js/libs/jpicker/jpicker-1.1.6.js?version=${nowDate}"></script>
<link type="text/css" href="${ctx}/js/libs/jpicker/jpicker-1.css?version=${nowDate}" rel="stylesheet"></link>
<link type="text/css" href="${ctx}/js/libs/jpicker/jpicker-6.css?version=${nowDate}" rel="stylesheet"></link>
<link type="text/css" href="${ctx}/js/libs/jpicker/jpicker-min.css?version=${nowDate}" rel="stylesheet"></link>
<!-- 편집기능 JS -->
<script type="text/javascript" src="${ctx}/js/libs/turf/turf.min.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/libs/jsts/jsts.min.js?version=${nowDate}"></script>
<!-- 좌표계 파일 등록 -->
<script type="text/javascript" src="${ctx}/js/libs/proj4/proj4.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/libs/proj4/epsg.js?version=${nowDate}"></script>
<!-- Openlayers 등록 -->
<script type="text/javascript" src="${ctx}/js/libs/openlayers/ol-v5.30/ol.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/libs/openlayers/v2/OpenLayers.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/libs/openlayers/ol-ext/ol-ext.min.js?version=${nowDate}"></script>
<!-- 지도 설정 파일 -->
<script type="text/javascript" src="${ctx}/js/ol/global/globals.properties.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/global/engine.properties.js?version=${nowDate}"></script>
<!-- 공용함수 -->
<script type="text/javascript" src="${ctx}/js/ol/source/public/ajax.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/array.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/checkbox.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/css.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/date.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/datepicker.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/loadingBar.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/paging.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/select.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/slider.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/string.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/textvalue.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/timer.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/url.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/validate.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/public/file.js?version=${nowDate}"></script>

<!--페이징 함수 -->
<script type="text/javascript" src="${ctx}/js/ol/source/paging/initpaging.js?version=${nowDate}"></script>
<!-- 좌표계 관련 -->
<script type="text/javascript" src="${ctx}/js/ol/source/projection/projection.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/transform/transform.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/resolution/resolution.js?version=${nowDate}"></script>
<!-- View 관련 -->
<script type="text/javascript" src="${ctx}/js/ol/source/view/view-option.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/view/view-baselayer-option.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/source/view/view.js?version=${nowDate}"></script>
<!-- event부분 --->
<script type="text/javascript" src="${ctx}/js/ol/source/event/eventhandler.js?version=${nowDate}"></script> <!-- 이벤트 헨틀러 -->
<script type="text/javascript" src="${ctx}/js/ol/source/event/eventhandler-button.js?version=${nowDate}"></script> <!-- 이벤트 헨틀러 -->
<!-- function 부분 -->
<script type="text/javascript" src="${ctx}/js/ol/source/functions/getview.js?version=${nowDate}"></script> <!-- getView 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/functions/moveend.js?version=${nowDate}"></script> <!-- moveend 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/functions/jusosearch.js?version=${nowDate}"></script> <!-- 주소검색 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/functions/analysis.js?version=${nowDate}"></script> <!-- 공간검색 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/functions/analysispostgres.js?version=${nowDate}"></script> <!-- 공간검색 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/functions/mapmoveing.js?version=${nowDate}"></script> <!-- 맴이동 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/functions/mapSave.js?version=${nowDate}"></script> <!-- mapSave.js 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/functions/mapPrint.js?version=${nowDate}"></script> <!-- mapSave.js 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/functions/heatmap.js?version=${nowDate}"></script> <!-- heatmap.js 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/functions/statsmap.js?version=${nowDate}"></script> <!-- statsmap.js 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/functions/geojson.js?version=${nowDate}"></script> <!-- geojson.js 이벤트 -->
<!-- conter 부분 -->
<script type="text/javascript" src="${ctx}/js/ol/source/control/mouse.js?version=${nowDate}"></script> <!-- 마우스 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/control/addeventlistener.js?version=${nowDate}"></script> <!-- addeventlistener 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/control/zoomcontrol.js?version=${nowDate}"></script> <!-- zoomcontrol 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/control/pancontrol.js?version=${nowDate}"></script> <!-- pancontrol 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/control/historycontrol.js?version=${nowDate}"></script> <!-- pancontrol 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/control/measuringcontrol.js?version=${nowDate}"></script> <!-- measuringcontrol 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/control/layercontrol.js?version=${nowDate}"></script> <!-- layercontrol 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/control/drawtoolcontrol.js?version=${nowDate}"></script> <!-- drawtoolcontrol 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/control/featurecontrol.js?version=${nowDate}"></script> <!-- featurecontrol 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/control/featureeditcontrol.js?version=${nowDate}"></script> <!-- featureeditcontrol 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/control/scaleControl.js?version=${nowDate}"></script> <!-- scaleControl 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/control/wmscontrol.js?version=${nowDate}"></script> <!-- wms 이벤트 -->
<script type="text/javascript" src="${ctx}/js/ol/source/control/wfscontrol.js?version=${nowDate}"></script> <!-- wms 이벤트 -->
<!-- SYNC -->
<script type="text/javascript" src="${ctx}/js/ol/source/sync/vworld_juso.js?version=${nowDate}"></script> <!-- vworld_juso 이벤트 -->
<!--  처음 시작하는 스크립트 -->
<script type="text/javascript" src="${ctx}/js/initmap.js?version=${nowDate}"></script>
<!-- 샘플용 처리결과 모음 -->
<script type="text/javascript" src="${ctx}/js/sample.js?version=${nowDate}"></script>

