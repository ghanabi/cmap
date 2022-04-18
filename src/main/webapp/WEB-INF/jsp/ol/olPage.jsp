<%--
  Created by IntelliJ IDEA.
  User: 백승재
  Date: 2021-05-13
  Time: 오후 3:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<title>Title</title>
</head>
<c:import url='/WEB-INF/jsp/ol/inc/ol_script.jsp' />

<body>
    <div>GIS 테스트 페이지</div>
    <div class="wrapperClass">
        <div id="map" style="width: 500px; height: 500px;"></div>
    </div>

    <div>배경지도 변경</div>
    <select id="s_base"  name="s_base" onchange="OlSeesun.ol.eventhandler.setEventHandler.onChangeEventHandler(mapView,'baseMap','s_base')">
        <option value="VBASE">일반지도</option>
        <option value="VSATELLITE">영상지도</option>
        <option value="DAUM">다음지도</option>
    </select>
    <!-- 다음지도를 베이스를 올리는 경우 사용 -->
    <select id ="s_daum" name="s_daum" style="display: none">
        <option value="DAUM">다음지도</option>
    </select>

    <div>센터 중심점 좌표</div>
    <!-- 바꾸는 부분 moveend.js -> setMoveEndCenter 함수 참조 -->
    <div id="centerX"></div>
    <div id="centerY"></div>
    <div>센터 중심 주소</div>
    <div id="centerJuso"></div>

    <div>축척바</div>
    <div id="dscale"></div>
    <div onclick=""> <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setPanMove( mapView )" value="이동" /></div>
    <div>확대기능</div>
    <div> <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setZoomIn( mapView )" value="확대 클릭 확대" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setZoomOut( mapView )" value="축소 클릭 축소" /></div>

    <div> <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setZoomInClick( mapView )" value="지점 클릭 확대" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setZoomOutClick( mapView )" value="지점 클릭 축소" /></div>

    <div> <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setZoomInDraw( mapView )" value="드래그 확대" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setZoomOutDraw( mapView )" value="드래그 축소" /></div>

    <div> <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setPreView( mapView )" value="이전" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setNextView( mapView )" value="다음" /></div>

    <!-- 측정도구 -->
    <div> <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDistanceMeasurement( mapView )" value="거리측정" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setAreaMeasurement( mapView )" value="면적측정" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setCircleMeasurement( mapView )" value="반경측정" />
    </div>

    <!-- 그리기도구 -->
    <div>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingPoint( mapView )" value="포인트 그리기" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingLine( mapView )" value="선 그리기" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingRectangle( mapView )" value="사각형 그리기" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingCircle( mapView )" value="원 그리기" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingPolygon( mapView )" value="다각형 그리기" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingSelect( mapView )" value="도형 선택" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingFeatureMove( mapView )" value="도형 이동" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingFeatureModify( mapView )" value="도형 수정" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingFeatureClone( mapView )" value="도형 복제" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingDelete( mapView )" value="도형 삭제" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingFeatureClear( mapView )" value="그리기초기화 삭제" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingFeatureIntersection( mapView )" value="교집합" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingFeatureUnion( mapView )" value="합집합" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingFeatureDifference( mapView )" value="차집합" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingFeatureSymDifference( mapView )" value="선택도형뚤기" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingFeaturePolygonizer( mapView )" value="도형분할" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setDrawingFeatureHole( mapView )" value="도형뚤기" />
    </div>
    <!-- WMS 레이어 -->
    <div>WMS 샘플</div>
    <div>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayer( mapView, 'lp_pa_cbnd_bonbun', 'lp_pa_cbnd_bonbun', 'vwolrd'  )" value="브이월드_본번" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayer( mapView, 'lp_pa_cbnd_bubun', 'lp_pa_cbnd_bubun', 'vwolrd'  )" value="브이월드_부번" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayer( mapView, 'vwolrd_hybrid', 'vwolrd_hybrid', 'vwolrd_hybrid'  )" value="브이월드 하이브리드" />
        <%--        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayer( mapView, 'TB_FGDI_CM100_ST', 'TB_FGDI_CM100_ST', 'superMap'  )" value="슈퍼맵" />--%>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayer( mapView, 'TL_SCCO_SIG', 'TL_SCCO_SIG', 'engine_geoserverStyleNone'  )" value="지오서버" />
    </div>
    <!-- DB 조회용 레이어 -->
    <div>WMS DB조회용 샘플</div>
    <div>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayerDB( mapView, 'lp_pa_cbnd_bonbun', true  )" value="브이월드_본번 켜기" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayerDB( mapView, 'lp_pa_cbnd_bubun', true  )" value="브이월드_부번 켜기" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayerDB( mapView, 'vwolrd_hybrid', true  )" value="브이월드 하이브리드 켜기" />


        <%--        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayer( mapView, 'TB_FGDI_CM100_ST', 'TB_FGDI_CM100_ST', 'superMap'  )" value="슈퍼맵" />--%>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayerDB( mapView, 'TL_SCCO_SIG', true )" value="지오서버 켜기" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayerDB( mapView, 'TL_KODIS_BAS', true )" value="지오서버(SldBody) 켜기" />

        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayerDB( mapView, 'lp_pa_cbnd_bonbun', false  )" value="브이월드_본번 끄기" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayerDB( mapView, 'lp_pa_cbnd_bubun', false  )" value="브이월드_부번 끄기" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayerDB( mapView, 'vwolrd_hybrid',false  )" value="브이월드 하이브리드 끄기" />
        <%--        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayer( mapView, 'TB_FGDI_CM100_ST', 'TB_FGDI_CM100_ST', 'superMap'  )" value="슈퍼맵" />--%>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayerDB( mapView, 'TL_SCCO_SIG', false )" value="지오서버 끄기" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.setWmsLayerDB( mapView, 'TL_KODIS_BAS', false )" value="지오서버(SldBody) 끄기" />

    </div>

    <div> WFS 샘플 </div>
    <div>
        <div> 일반그리기 옵션 </div>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveGetWfs( mapView )" value="데이터조회(필드값) 주소이동 " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retrivePostWfsIntersects( mapView, 'Rectangle' )" value="데이터조회(공간)_사각형 " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retrivePostWfsIntersects( mapView, 'Polygon' )" value="데이터조회(공간)_다각형 " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retrivePostWfsIntersects( mapView, 'Circle' )" value="데이터조회(공간)_원 " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retrivePostWfsIntersects( mapView, 'Point' , 40 )" value="데이터조회(공간)_포인트(버퍼) " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retrivePostWfsIntersects( mapView, 'LineString' , 40 )" value="데이터조회(공간)_라인(버퍼) " />
        <div> 교집합, 합집합, 차집합 분석 </div>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retrivePostWfsIntersects( mapView, 'Select' , null, 'Intersection' )" value="데이터조회(공간)_교집합 " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retrivePostWfsIntersects( mapView, 'Select' , null, 'Union' )" value="데이터조회(공간)_합집합 " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retrivePostWfsIntersects( mapView, 'Select' , null, 'Difference' )" value="데이터조회(공간)_차집합 " />
    </div>

    <div> DB 샘플 </div>
    <div>
        <div> 일반그리기 옵션 </div>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveAnalysisPostgres( mapView, 'Rectangle' )" value="데이터조회(공간)_사각형 " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveAnalysisPostgres( mapView, 'Polygon' )" value="데이터조회(공간)_다각형 " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveAnalysisPostgres( mapView, 'Circle' )" value="데이터조회(공간)_원 " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveAnalysisPostgres( mapView, 'Point' , 40 )" value="데이터조회(공간)_포인트(버퍼) " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveAnalysisPostgres( mapView, 'LineString' , 40 )" value="데이터조회(공간)_라인(버퍼) " />
        <div> 교집합, 합집합, 차집합 분석 </div>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveAnalysisPostgres( mapView, 'Select' , null, 'Intersection' )" value="데이터조회(공간)_교집합 " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveAnalysisPostgres( mapView, 'Select' , null, 'Union' )" value="데이터조회(공간)_합집합 " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveAnalysisPostgres( mapView, 'Select' , null, 'Difference' )" value="데이터조회(공간)_차집합 " />
    </div>

    <div>지도저장</div>
    <div>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveMpaSave(mapView)" value="지도저장 " />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveMpaPrint(mapView)" value="지도출력 " />
    </div>

    <div>검색샘플</div>
    <div>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveSampleSearchData( mapView )" value="검색샘플 지오메트리" />
        <div id="sampleDiv"></div>
        <div id="sampleDivPg"></div>
    </div>
    <div>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveSamplePointSearchData( mapView )" value="검색샘플(포인트)" />
        <div id="samplePointDiv"></div>
        <div id="samplePointDivPg"></div>
    </div>
    <div>히트맵</div>
    <div>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveSampleHeatMap( mapView )" value="히트맵샘플" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveSampleHeatMapDBLonLat( mapView )" value="히트맵샘플(lonlat)" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveSampleHeatMapDBPostGis( mapView )" value="히트맵샘플(geomeater)" />
        <input type="button" onclick="OlSeesun.ol.control.layerControl.deleteLayerId( mapView,'headMapLayer');" value="레이어지우기" />
    </div>
    <div>통계지도(폴리건)</div>
    <div>
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveSampleStatsMap( mapView )" value="통계지도 샘플 (시도)" />
        <input type="button" onclick="OlSeesun.ol.eventhandler.btnEventHandler.retriveSampleStatsMaGeojson( mapView )" value="통계지도 샘플 GeoJson (시도)" />
        <input type="button" onclick="OlSeesun.ol.control.layerControl.deleteLayerId( mapView,'statsMapLayer');" value="통계지도 지우기" />
    </div>

    <!--통계지도 올라가는 영역 샘플  -->
    <!-- 통계 -->
    <div class="popup attribute" id="static_toc" style="left:370px;top:60px;display:none;">
        <div class="bar">
            <div class="title">
                <span id=""><i class="fas fa-globe" style="padding-left:5px;"></i>통계지도별</span>
            </div>
            <button class="closePop" id="close_static_toc_btn" onclick="">닫기</button>
        </div>

        <div class="con">
            <div class="bt">
                <div class="hidden" style="display:none;">
                    <!-- <label for="colorattr_static">색상표</label> -->
                </div>

                <input class="jscolor" id="colorattr_static" value="#FF1212" title=""
                       style="width:30px;height:20px;border:1px solid #000;margin-right:3px;float:left;cursor: pointer;font-size: 0pt;display:none;"/>
                <img src="${ctx}/img/static/bt_colora.png" alt="컬러적용" onclick="OlSeesun.ol.function.statsMap.changeMapColor( mapView );" style="margin: 0 0 -10px 0"/>
                <img src="${ctx}/img/static/bt_chats.png" alt="차트보기" onclick="OlSeesun.ol.function.statsMap.showChart()" style="float:right;" id="chart_show_id"/>
            </div>
            <div class="table">
                <table id="tbStaticDt">
                    <colgroup>
                        <col width="20%"/>
                        <col width="40%"/>
                        <col width="40%"/>
                    </colgroup>
                    <tr>
                        <th>색상</th>
                        <th>급간</th>
                    </tr>
                    <tr>
                        <td id="static_color_toc0" style="background:#d7fec9;"></td>
                        <td id="static_value_start_end0">-</td>
                    </tr>
                    <tr>
                        <td id="static_color_toc1" style="background:#d7fec9;"></td>
                        <td id="static_value_start_end1">-</td>
                    </tr>
                    <tr>
                        <td id="static_color_toc2" style="background:#d7fec9;"></td>
                        <td id="static_value_start_end2">-</td>
                    </tr>
                    <tr>
                        <td id="static_color_toc3" style="background:#d7fec9;"></td>
                        <td id="static_value_start_end3">-</td>
                    </tr>
                    <tr>
                        <td id="static_color_toc4" style="background:#d7fec9;"></td>
                        <td id="static_value_start_end4">-</td>
                    </tr>
                    <tr id="tbl_static_color5" style="display:none;">
                        <td id="static_color_toc5" style="background:#ffffff;"></td>
                        <td id="static_value_start_end5">0</td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- 통계 차트 -->
        <div class="attribute_chart_box" >
            <div class="attribute_chart" id="static_chart">
                <canvas id="mychart" width="400px" height="300px" style="position:relative;z-index:99;"></canvas>
            </div>
            <span style="" onclick="OlSeesun.ol.functions.mapStats.showChart();"><i class="fas fa-times"></i></span>
        </div>
        <!-- <canvas id="static_chart" width="540" height="300" style="width: 540px;height: 300px"></canvas> -->
        <!-- //통계 차트 -->
    </div><!-- //attribute -->
</body>
</html>
