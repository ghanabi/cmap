<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2021-06-11
  Time: 오후 2:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/taglib/taglib.jsp"%>
<html>
<head>
  <title>세션 테이스트 페이스</title>
  <c:import url='/WEB-INF/jsp/ol/inc/web_script.jsp' />
  <script type="text/javascript" src="${ctx}/js/web_sample.js?version=${nowDate}"></script>

</head>
<body>
  <div>세션이 생성이 안되있는경우 페이지</div>
  <div>세션생성 샘플</div>
  <button value="세션샘플" onclick="setSession()" >새션만들기샘플(웹페이지샘플)</button>
  <button value="세션샘플" onclick="setSessionGis()" >새션만들기샘플(지도페이지)</button>
</body>
</html>
