<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2021-06-04
  Time: 오전 10:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/taglib/taglib.jsp"%>
<html>
    <head>
        <title>페이지</title>
        <c:import url='/WEB-INF/jsp/ol/inc/web_script.jsp' />
        <script type="text/javascript" src="${ctx}/js/web_sample.js?version=${nowDate}"></script>

    </head>
    <body>
        <div>웹페이지 샘플코드 페이지</div>
        <div>데이터 넣기 샘플(파일없는경우)</div>
        <input type="button" onclick="setCssDisplys('d_insert');" value="등록창 활성화" />
        <div id="d_insert" style="display: none">
            <form id="f_nonFileInser" name="f_nonFileInser" method="post" onsubmit="return false;" >
                <div>제목</div>
                <div><input type="text" id="title" name="title" /></div>
                <div>내용</div>
                <div><input type="text" id="content" name="content" /></div>
                <button value="등록" onclick="setInsertNonFile('f_nonFileInser')" >등록</button>
            </form>
        </div>

        <div>데이터 넣기 샘플(파일 있는경우)</div>
        <input type="button" onclick="setCssDisplys('d_insertFile');" value="등록창 활성화" />
        <%@ include file="/WEB-INF/jsp/ol/inc/filePage.jsp"%>
        <div id="d_insertFile" style="display: none">
            <form id="f_fileInser" name="f_fileInser" method="post" onsubmit="return false;" >
                <table border="1">
                    <colgroup>
                        <col width="20%">
                        <col width="30%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <tbody>
                        <tr id="tempinfoDate" name="tempinfoDate" style="display: none">
                            <td>등록자</td>
                            <td><input type="text" id="fU_Name" name="fU_Name" /></td>
                            <td>등록일</td>
                            <td><input type="text" id="fPDt" name="fPDt" /></td>
                        </tr>
                        <tr>
                            <td>제목</td>
                            <td colspan="3"><input type="text" id="fTitle" name="fTitle" /></td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td colspan="3"><textarea id="fContent" name="fContent" rows='2'  cols="20" wrap="hard"></textarea></td>
                        </tr>
                        <tr>
                            <!-- 첨부파일 선언시 해당 부분은 그대로 사용 할것 -->
                            <td>첨부파일</td>
                            <td colspan="3"><input type="text" id="attachmentsNm" name="attachmentsNm" readonly="readonly"></input><label for="inp_f_fileName" id="file">파일</label></td>
                        </tr>
                    </tbody>
                </table>
                <div id="btnInsert" name="btnInsert">
                    <button value="등록" onclick="sampleFileDataInsert('f_fileInser')" >등록</button>
                </div>
                <div id="btnUDdate" name="btnUDdate" style="display: none">
                    <button value="수정" onclick="sampleFileDataUpdate('f_fileInser')" >수정</button>
                    <button value="삭제" onclick="sampleFileDataDelete()" >삭제</button>
                </div>
            </form>

        </div>
        <div>페이징 검색 샘플</div>
        <div>
            <input type="button" onclick="getPaging_SearchRequirement()" value="검색샘플-조건 없는경우" />
            <div id="sampleDiv"></div>
            <div id="sampleDivPg"></div>
        </div>
        <div>프로시져 샘플</div>
        <button value="프로시져샘플" onclick="sampleProsi()"> 프로시져 조회샘플 </button>

        <div>세션 삭제</div>
        <button value="프로시져샘플" onclick="setSessionInvalidate()"> 프로시져 조회샘플 </button>
    </body>
</html>
