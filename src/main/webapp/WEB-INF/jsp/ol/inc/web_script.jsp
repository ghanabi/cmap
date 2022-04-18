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

<!-- jquery 등록 -->
<script type="text/javascript" src="${ctx}/js/ol/jquery/jquery-3.4.1.min.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/jquery/jquery-ui-1.11.4.min.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/jquery/Blob.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/jquery/FileSaver.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/jquery/chart.min.js?version=${nowDate}"></script>
<script type="text/javascript" src="${ctx}/js/ol/jquery/jquery.blockUI.js?version=${nowDate}"></script>
<!-- jpicker   -->
<script type="text/javascript" src="${ctx}/js/ol/jpicker/jpicker-1.1.6.js?version=${nowDate}"></script>
<link type="text/css" href="${ctx}/js/ol/jpicker/jpicker-1.css?version=${nowDate}" rel="stylesheet"></link>
<link type="text/css" href="${ctx}/js/ol/jpicker/jpicker-6.css?version=${nowDate}" rel="stylesheet"></link>
<link type="text/css" href="${ctx}/js/ol/jpicker/jpicker-min.css?version=${nowDate}" rel="stylesheet"></link>
<!-- 설정 파일 -->
<script type="text/javascript" src="${ctx}/js/ol/global/globals.properties.js?version=${nowDate}"></script>
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
<!-- 세션 관련 -->
<script type="text/javascript" src="${ctx}/js/ol/session/session.js?version=${nowDate}"></script>


