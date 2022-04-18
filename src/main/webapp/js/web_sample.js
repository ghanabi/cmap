/**
 * 검색조건 없는 페이징 샘플
 */
function getPaging_SearchRequirement(){
    /*등록하는 창 닫을려고 사용 필요시 사용*/
    OlSeesun.publics.Css.setStyleDisplay("d_insertFile", "display", "none" );
    OlSeesun.publics.Css.setStyleDisplay("sampleDiv", "display", "block" );
    /* 파라미터 */
    var paramObj = {};
    paramObj.dbtype = "0";
    /* 파라미터 생성 */
    paramObj = OlSeesun.publics.ajax.paramPagingAjaxObject("sample.search.sampleList","sample.search.sampleCnt",paramObj,1,7);
    /* 데이터 조회 */
    OlSeesun.publics.paging.initPaging("sampleDivPg","sampleDivPg", 7, paramObj,  successSampleSearchData);
}

/**
 * 데이터 처리
 * @param _data 처리된 데이터
 */
function successSampleSearchData( _data ){
    /*결과갑 부분 지우기*/
    OlSeesun.publics.textValue.qureyEmpty( "sampleDiv" );
    var context = '<colgroup><col width="20%"><col width="20%"><col width="20%"><col width="20%"><col width="20%"></colgroup>';
    /*div에 값넣기*/
    OlSeesun.publics.textValue.append("sampleDiv", context);
    for( i = 0 ; i < _data.list.length; i++ ) {
        context += "<tr>";
        context += "<td>";
        context += _data.list[i].bno;
        context += "</td>";
        context += "<td>";
        context += _data.list[i].title;
        context += "</td>";
        context += "<td>";
        context += _data.list[i].writer;
        context += "</td>";
        context += "<td>";
        context += _data.list[i].viewcnt;
        context += "</td>";
        context += "<td>";
        context += "<input type='button' onclick='getMoreInforMation(\"" + _data.list[i].bno + "\")' value='상세정보조회(키값)'/>";
        context += "</td>";
        context += "</tr>";
    }
    /*처리결과 DIV에 넣기*/
    OlSeesun.publics.textValue.append("sampleDiv", context);
}

/**
 * 상세 정보 조회
 * @param _key 테이블 키값(단일)
 */
function getMoreInforMation( _key ){
    /* 파라미터 */
    var paramObj = {};
    paramObj.dbtype = "0";
    var sqlId = "sample.search.retriveMoreInforMation";
    /* 파라미터 생성 */
    paramObj = OlSeesun.publics.ajax.paramAjaxObjectKey(sqlId, _key, paramObj);
    OlSeesun.publics.ajax.retriveAjaxObjectParam(paramObj, function ( _data ){
        retivetinfoPopup( _data );
        setUpdateSamleCnt( _key ); /* 상세정보 조회시 카운트 올리는 샘플 */
    });   
}

/**
 *상세정보 클릭시 카운터 올리는 샘플
 * @param _key
 */
function setUpdateSamleCnt( _key ){
    OlSeesun.publics.ajax._KEY = _key; /* 나중에 삭제나 업데이트 사용 할때 사용할 키값 저장*/
    var paramObj = {};
    paramObj.dbtype = "0";
    var sqlId = "sample.update.sampleUpdateCnt";
    paramObj = OlSeesun.publics.ajax.paramAjaxObjectKey(sqlId, _key, paramObj);
    OlSeesun.publics.ajax.updateAjaxObjectParam( paramObj, function ( _data ){
        /*처리결과*/
        if( _data[0].resultCheckBoolean){
            console.log("정상처리되어짐");
            /* 상세정보창이 Open 되는 형태 검색리스트 닫기 */
            OlSeesun.publics.Css.setStyleDisplay("sampleDiv", "display", "none" );
        }
    });
}

/**
 * 상세정보 팝업에 대입시키기
 * @param _data 조회된 데이터
 */
function retivetinfoPopup( _data ){

    if(_data[0].f_no != undefined){
        OlSeesun.publics.file.fileKey = _data[0].f_no; /*파일 키값 넣기*/
        OlSeesun.publics.textValue.inputValIsNotNullId( "attachmentsNm",_data[0].f_o_name );
    }
    /*값채워넣는 부분들*/
    OlSeesun.publics.textValue.inputValIsNotNullId( "fU_Name",_data[0].writer );
    OlSeesun.publics.textValue.inputTextHyphenId( "fPDt",_data[0].regdate );
    OlSeesun.publics.textValue.inputValIsNotNullId( "fTitle",_data[0].title );
    OlSeesun.publics.textValue.inputValIsNotNullId( "fContent",_data[0].content );

    OlSeesun.publics.Css.setStyleDisplay("btnInsert", "display", "none" );
    OlSeesun.publics.Css.setStyleDisplay("btnUDdate", "display", "block" );
    OlSeesun.publics.Css.setStyleDisplay("tempinfoDate", "display", "" );
    OlSeesun.publics.Css.setStyleDisplay("d_insertFile", "display", "block" );
}



/**
 * 데이터 삽입 샘플(파일 없음)
 *
 *
 *
 * @param _formId 폼값
 */
function setInsertNonFile( _formId ){
    /* 파라미터 */
    var paramObj = {};
    paramObj.dbtype = "0";
    var sqlId = "sample.insert.sampleInsertNonFile"; /*처리할 SQLID*/
    /*파라미터 생성*/
    paramObj = OlSeesun.publics.ajax.paramSerializeAjaxObject(sqlId, paramObj, _formId);
    //console.log( paramObj );
    OlSeesun.publics.ajax.insertAjaxObjectParam(paramObj, successInsertNonFile);
}

/**
 * 인설트시 처리결과
 * @param _data
 */
function successInsertNonFile( _data ){
    console.log( _data );
    if( _data[0].resultCheckBoolean ){
        alert("정상처리 되었습니다.");
    }else{
        alert("실패 하였습니다.");
    }
}

/**
 * 상태값에 따른 Display on/off
 * @param _divId
 */
function setCssDisplys( _divId ){
    /*등록하는 창 닫을려고 사용 필요시 사용*/
    OlSeesun.publics.Css.setStyleDisplay("sampleDiv", "display", "none" );
    OlSeesun.publics.Css.setStyleDisplay("btnUDdate", "display", "none" );
    OlSeesun.publics.Css.setStyleDisplay("tempinfoDate", "display", "none" );
    OlSeesun.publics.Css.setStyleDisplay("btnInsert", "display", "block" );
    /*창활성화 비활성화 유무*/
    OlSeesun.publics.Css.setDivOnOff( _divId );
}

/**
 * 파일 체크 샘플 파일
 * @param _fileObj
 * @param _divId
 */
function sampleFileCheck( _fileObj, _divId, _expressionFileDivId ){
    var checkFileExtension = ["zip", "png", "jpg", "jpeg"];
    var fileCheck = OlSeesun.publics.file.fileCheck( _fileObj, _divId, _expressionFileDivId,checkFileExtension );
    if( !fileCheck ){
        alert("확장자를 확인 하여 주십시오");
    }
}

/**
 * 파일이 있는경우 업로드 하는 방법
 * @param _formId
 */
function sampleFileDataInsert( _formId ){
    var confirmFlag = confirm("저장하시겠습니까?");
     if( confirmFlag ){
         /*일반데이터 저장*/
         var paramObj = {};
         paramObj.dbtype = "0";
         var sqlId = "sample.insert.sampleInsertFile"; /*처리할 SQLID*/
         /*파라미터 생성*/
         paramObj = OlSeesun.publics.ajax.paramSerializeAjaxObject(sqlId, paramObj, _formId);
         OlSeesun.publics.ajax.insertKeyAjaxObjectParam(paramObj, successInsertFile);
     }
}

/**
 * 파일업로드
 * @param _data
 */
function successInsertFile( _data ){
    /*파일 저장*/
    var fileName = $("#fName").val();
    console.log(fileName);
    if( fileName == null || fileName  == "" ){
        alert("저장이 완료 되었습니다.");
    }else{
        /*데이터 생성이후 파일 업로드*/
        var path = "file/boder"; /*파일페스 정의*/
        var key = _data.key; /*키값*/
        var fKey = ""; /*파일키값*/
        var gubun = "ATF001"; /*파일 그룹형태*/
        var type = "insert"; /* 타입 */
        var sqlId = OlSeesun.publics.file.fileSql;
        var formId = OlSeesun.publics.file.fileForm;
        var parmatId = OlSeesun.publics.file.fileParamertId;
        var parmat = {}; /* 넘겨온 결과를 받는 파라미터 */
        paramObj.dbtype = "0";
        parmat = OlSeesun.publics.file.fileParameter(key, fKey, path,gubun, type, sqlId, parmat);
        OlSeesun.publics.ajax.registerFileAdd( formId, parmat, fnFileSuccess, parmatId );
    }
}
/**
 * 업로드 정상처리 결과
 * @param _data
 */
function fnFileSuccess( _data ){
    var data = JSON.parse(_data);
    if(data.length > 0){
        alert("정상처리 되었습니다.");
    }
}

/**
 * 계시판 수정하는 부분
 * @param _formId
 */
function sampleFileDataUpdate( _formId ){
    var confirmFlag = confirm("수정하시겠습니까?");
    if( confirmFlag ){
        var paramObj = {};
        var sqlId = "sample.update.sampleUpdateFile"; /*처리할 SQLID*/
        var key =  OlSeesun.publics.ajax._KEY; /*키값은 ajax에 들어 있음.*/
        paramObj.dbtype = "0";
        /*파라미터 생성*/
        paramObj = OlSeesun.publics.ajax.paramSerializeKeyAjaxObject(sqlId, paramObj, _formId, key);
        OlSeesun.publics.ajax.updateAjaxObjectParam( paramObj, function( _data ){
            /*처리된 데이터 */
            sampleFileUpdate( _data );
        });
    }
}

/**
 * 파일 업로드 처리
 * @param _data
 */
function sampleFileUpdate( _data ){
    var fileName = $("#fName").val();
    if( fileName != null || fileName  != "" ) {
        var path = "file/boder"; /*파일페스 정의*/
        var key = OlSeesun.publics.ajax._KEY; /*키값*/
        var fKey = OlSeesun.publics.file.fileKey /*파일키값*/
        var gubun = "ATF001"; /*파일 그룹형태*/
        var type = "insert"; /* 타입 */
        var sqlId = OlSeesun.publics.file.fileDeleteSql;
        var formId = OlSeesun.publics.file.fileForm;
        var parmatId = OlSeesun.publics.file.fileParamertId;
        var parmat = {}; /* 넘겨온 결과를 받는 파라미터 */
        parmat.dbtype = "0";
        parmat = OlSeesun.publics.file.fileParameter(key, fKey, path,gubun, type, sqlId, parmat);
        /*업로드시 기존 파일 부분 삭제 로그성을 위해서 삭제는 안시키고. 업데이트만*/
        OlSeesun.publics.ajax.updateAjaxObjectParam( parmat, function ( _data ){
            parmat.sqlId = OlSeesun.publics.file.fileSql;
            OlSeesun.publics.ajax.registerFileAdd( formId, parmat, function( data ){
                var jdata = JSON.parse(data);
                if(jdata.length > 0){
                    alert("수정완료 되었습니다.");
                }
            }, parmatId );
        });
    }else{
        alert("수정이 완료 되었습니다.");
    }
}

/**
 * 삭제샘플
 */
function sampleFileDataDelete(){
    var confirmFlag = confirm("삭제하시겠습니까?");
    if( confirmFlag ){
        var key = OlSeesun.publics.ajax._KEY; /*키값*/
        var fKey = OlSeesun.publics.file.fileKey /*파일키값*/
        var sqlId = OlSeesun.publics.file.fileDeleteSql;
        var parmat = {};
        parmat.dbtype = "0";
        parmat = OlSeesun.publics.file.fileParameter(key, fKey, null ,null, null, sqlId, parmat);
        OlSeesun.publics.ajax.updateAjaxObjectParam( parmat, function ( _data ) {
            parmat.sqlId = "sample.update.sampleDeleteFileboard";
            OlSeesun.publics.ajax.updateAjaxObjectParam(parmat, function ( _datas ) {
                /*테이블 삭제*/
                console.log( _datas );
                if(_datas[0].resultCheckBoolean){
                    alert("정상처리되었습니다.");
                    getPaging_SearchRequirement();
                }else{
                    alert("삭제처리 실패");
                }
            });
        });
    }
}


/**
 * 프로시져 샘플
 */
function sampleProsi(){
    var paramObj = {
        temp1 : 1,
        temp2 : 30
    };
    // var sqlid = "sample.search.prosi";
    var sqlid = "sample.mssql.textsample";
    paramObj.dbtype = "1";
    paramObj = OlSeesun.publics.ajax.paramAjaxObject(sqlid, paramObj);
    OlSeesun.publics.ajax.retriveAjaxObjectParam( paramObj, function ( _data ){
        console.log(_data);
    });
}

/*세션만드는 셈플*/
function setSession(){
    var paramObj = {};
    var url = "indexWebPage.do";
    OlSeesun.session.createSession(paramObj, url);
}

/**
 * gis 샘플 페이지
 */
function setSessionGis(){
    var paramObj = {};
    var url = "indexGisPage.do";
    OlSeesun.session.createSession(paramObj, url);
}

/**
 * 세션초기화
 */
function setSessionInvalidate(){
    var paramObj = {};
    var url = "SessionPage.do";
    OlSeesun.session.invalidateSession(paramObj, url);
}