<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2021-06-09
  Time: 오전 9:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!-- 파일 업로드 폼 -->
<form method="post" name="f_file" id="f_file" enctype="multipart/form-data" style="display: none">
    <input type="text" id="fName" name="fName" class="fileName" readonly="readonly" style="width:178px;"/>
    <label for="fName"></label>
    <label for="inp_f_fileName" id="file">파일</label>
    <input style="display:none;" type="file" id="inp_f_fileName" name="inp_f_fileName" class="uploadBtn" onchange="sampleFileCheck(this, 'fName','attachmentsNm');"/>
    <div id="file_param"></div>
</form>
