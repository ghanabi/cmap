/*
 * 최초작성자 :백승재
 * 최초작성일 :2020.10.14.
 * 최종변경일 :2020.10.14.
 * 목적 : ajax 제어 컨트롤
 * 개정이력 :2020.10.14 최초생성
 * 기능 추가 이력
 * 2020.10.14 광고 계시판 제어 컨트롤러
*/
function ajaxClass (){
    this._ASYNC =  false;
    this._KEY = "";
    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.14.
     * 최종변경일 :2020.10.14.
     * 목적 : ajax Object 배열을 통한 파라미터 전용 (object 배열은 json 형태로 만들어서 전송) 데이터 조회
     * 개정이력 :2020.10.14 최초생성
     * 기능 추가 이력
     * 2020.10.14 ajax Object 배열을 통한 파라미터 전용 ( object 배열을 json형태로 전송) 데이터 조회
     *
     * ex)
     * var param = { txt : _context, gubun : _gubun, key : _key };
     * paramObj = OlSeesun.publics.ajax.paramAjaxObject( "bsbudgetMapper.selectBsBgMetry", paramObj);
     * OlSeesun.publics.ajax.retriveAjaxObjectParam(paramObj, fnBsBgSetMetryInfo, null);
    */
    ajaxClass.prototype.retriveAjaxObjectParam = function ( _jsonDate , _callBackFunction , _mapViews){
        /*
         * ex)  { 파라미터명 : 파라미터 값 }
         * 		{ text : 'text' , text1 : 'text1' }
         * */

        var async = this._ASYNC;
        /* ajax 구문 작성 */
        $.ajax({
            type : "POST",
            url : "moduleRetriveMapper.do",
            data : _jsonDate ,
            dataType : "json",
            async : async ,
            success : function( _data ){
                /*콜백 함수에 데이터 넘기기*/
                _callBackFunction( _data , _mapViews);
            }
        });
    }
    /**
     * 세션 만드는 셈플
     * @param _jsonDate
     * @param _callBackFunction
     * @param _mapViews
     */
    ajaxClass.prototype.retriveAjaxSession = function ( _jsonDate , _callBackFunction ){
        /*
         * ex)  { 파라미터명 : 파라미터 값 }
         * 		{ text : 'text' , text1 : 'text1' }
         * */

        var async = this._ASYNC;
        /* ajax 구문 작성 */
        $.ajax({
            type : "POST",
            url : "SessionCreate.do",
            data : _jsonDate ,
            dataType : "json",
            async : async ,
            success : function( _data ){
                /*콜백 함수에 데이터 넘기기*/
                _callBackFunction( _data );
            }
        });
    }
    /**
     * 세션 만드는 셈플
     * @param _jsonDate
     * @param _callBackFunction
     * @param _mapViews
     */
    ajaxClass.prototype.retriveAjaxSessionInvaliDate = function ( _jsonDate , _callBackFunction ){
        /*
         * ex)  { 파라미터명 : 파라미터 값 }
         * 		{ text : 'text' , text1 : 'text1' }
         * */

        var async = this._ASYNC;
        /* ajax 구문 작성 */
        $.ajax({
            type : "POST",
            url : "SessionInvalidate.do",
            data : _jsonDate ,
            dataType : "json",
            async : async ,
            success : function( _data ){
                /*콜백 함수에 데이터 넘기기*/
                _callBackFunction( _data );
            }
        });
    }

    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.19.
     * 최종변경일 :2020.10.19.
     * 목적 : ajax Object 배열을 통한 파라미터 전용 (object 배열은 json 형태로 만들어서 전송) 데이터 조회 페이징 들어가는 경우 사용
     * 개정이력 :2020.10.19 최초생성
     * 기능 추가 이력
     * 2020.10.19 ajax Object 배열을 통한 파라미터 전용 ( object 배열을 json형태로 전송) 데이터 조회 페이징 들어가는 경우 사용
     *
    */

    ajaxClass.prototype.retrivePagingAjaxObjectParam = function ( _id, _jsonDate , _successCallback, _callBackFunction ,_mapViews){
        /*
         * ex)  { 파라미터명 : 파라미터 값 }
         * 		{ text : 'text' , text1 : 'text1' }
         * */
        var async = this._ASYNC;

        /* ajax 구문 작성 */
        $.ajax({
            type : "POST",
            url : "moduleRetrivePagingMapper.do",
            data : _jsonDate ,
            dataType : "json",
            async : async ,
            success : function( _data ){
                /*콜백 함수에 데이터 넘기기*/
                _successCallback( _id , _data , _callBackFunction ,_mapViews);
            }
        });
    }
    /**
     *  카운터와 list 구해오는 곳
     * @param _id
     * @param _jsonDate
     * @param _successCallback
     * @param _callBackFunction
     * @param _mapViews
     */
    ajaxClass.prototype.retriveCntListAjaxObjectParam = function ( _id, _jsonDate , _successCallback, _callBackFunction ,_mapViews){
        /*
         * ex)  { 파라미터명 : 파라미터 값 }
         * 		{ text : 'text' , text1 : 'text1' }
         * */
        var async = this._ASYNC;

        /* ajax 구문 작성 */
        $.ajax({
            type : "POST",
            url : "moduleRetriveCntListMapper.do",
            data : _jsonDate ,
            dataType : "json",
            async : async ,
            success : function( _data ){
                /*콜백 함수에 데이터 넘기기*/
                _successCallback( _id , _data , _callBackFunction ,_mapViews);
            }
        });
    }



    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.14.
     * 최종변경일 :2020.10.14.
     * 목적 : ajax Object 배열을 통한 파라미터 전용 (object 배열은 json 형태로 만들어서 전송)  데이터 삽입
     * 개정이력 :2020.10.14 최초생성
     * 기능 추가 이력
     * 2020.10.14 ajax Object 배열을 통한 파라미터 전용 ( object 배열을 json형태로 전송)  데이터 삽입
     *
     * ex)
     * var param = { txt : _context, gubun : _gubun, key : _key };
     * param = CesiumSeesun.publics.ajax.paramAjaxObject( "bsbudgetMapper.insertBsBgPictureExplane", param);
     * CesiumSeesun.publics.ajax.insertAjaxObjectParam(param, fnBsBgGetAttFileInfo, null);
    */
    ajaxClass.prototype.insertAjaxObjectParam = function ( _jsonDate , _callBackFunction , _mapViews){
        /*
         * ex)  { 파라미터명 : 파라미터 값 }
         * 		{ text : 'text' , text1 : 'text1' }
         * */
        var async = this._ASYNC;

        /* ajax 구문 작성 */
        $.ajax({
            type : "POST",
            url : "moduleInsertMapper.do",
            data : _jsonDate ,
            dataType : "json",
            async : async ,
            success : function( _data ){
                /*콜백 함수에 데이터 넘기기*/
                _callBackFunction( _data , _mapViews);
            }
        });
    }

    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.14.
     * 최종변경일 :2020.10.14.
     * 목적 : ajax Object 배열을 통한 파라미터 전용 (object 배열은 json 형태로 만들어서 전송)  데이터 삽입
     * 개정이력 :2020.10.14 최초생성
     * 기능 추가 이력
     * 2020.10.14 ajax Object 배열을 통한 파라미터 전용 ( object 배열을 json형태로 전송)  데이터 삽입
     *
     * 사용법 쿼리 작성시 insert 하기전 쿼리 작업시 사용 하시요
     * <insert id="insertBoard" parameterType="Board">
           ---  중요 부분---
            <selectKey resultType="string" keyProperty="boardID" order="BEFORE">
                SELECT MAX(boardID)+1 FROM board
            </selectKey>
            ---- 설명 ---
            <selectKey resultType="리턴 벨류" keyProperty="키에서 사용하는 아이디값" order="쿼리 실행 순서 : BEFORE: 실행정 , AFTER: 실행후">
                키값을 구해오는 쿼리문 사용
            </selectKey>

            ---- 중요 부분 ---
            INSERT INTO board(boardID, title, content)
            VALUES(#{boardID}, #{title}, #{content})
        </insert>
     *
    */
    ajaxClass.prototype.insertKeyAjaxObjectParam = function ( _jsonDate , _callBackFunction , _mapViews){
        /*
         * ex)  { 파라미터명 : 파라미터 값 }
         * 		{ text : 'text' , text1 : 'text1' }
         * */
        var async = this._ASYNC;

        /* ajax 구문 작성 */
        $.ajax({
            type : "POST",
            url : "moduleInsertKeyMapper.do",
            data : _jsonDate ,
            dataType : "json",
            async : async ,
            success : function( _data ){
                /*콜백 함수에 데이터 넘기기*/
                _callBackFunction( _data , _mapViews);
            }
        });
    }

    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.14.
     * 최종변경일 :2020.10.14.
     * 목적 : ajax Object 배열을 통한 파라미터 전용 (object 배열은 json 형태로 만들어서 전송)  데이터 삽입
     * 개정이력 :2020.10.14 최초생성
     * 기능 추가 이력
     * 2020.10.14 ajax Object 배열을 통한 파라미터 전용 ( object 배열을 json형태로 전송)  데이터 삽입
    */
    ajaxClass.prototype.insertAjaxObjectParamArray = function ( _jsonDate , _callBackFunction , _mapViews){
        /*
         * ex)  { 파라미터명 : 파라미터 값 }
         * 		{ text : 'text' , text1 : 'text1' }
         * */
        var async = this._ASYNC;

        /* ajax 구문 작성 */
        $.ajax({
            type : "POST",
            url : "moduleInsertArrayMapper.do",
            data : _jsonDate ,
            dataType : "json",
            async : async ,
            success : function( _data ){
                /*콜백 함수에 데이터 넘기기*/
                _callBackFunction( _data , _mapViews);
            }
        });
    }

    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.14.
     * 최종변경일 :2020.10.14.
     * 목적 : ajax Object 배열을 통한 파라미터 전용 (object 배열은 json 형태로 만들어서 전송) 데이터 업데이트
     * 개정이력 :2020.10.14 최초생성
     * 기능 추가 이력
     * 2020.10.14 ajax Object 배열을 통한 파라미터 전용 ( object 배열을 json형태로 전송) 데이터 업데이트
    */
    ajaxClass.prototype.updateAjaxObjectParam = function ( _jsonDate , _callBackFunction , _mapViews){
        /*
         * ex)  { 파라미터명 : 파라미터 값 }
         * 		{ text : 'text' , text1 : 'text1' }
         * */
        var async = this._ASYNC;

        /* ajax 구문 작성 */
        $.ajax({
            type : "POST",
            url : "moduleUpdateMapper.do",
            data : _jsonDate ,
            dataType : "json",
            async : async ,
            success : function( _data ){
                /*콜백 함수에 데이터 넘기기*/
                _callBackFunction( _data , _mapViews);
            }
        });
    }

    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.14.
     * 최종변경일 :2020.10.14.
     * 목적 : ajax Object 배열을 통한 파라미터 전용 (object 배열은 json 형태로 만들어서 전송) 데이터 삭제
     * 개정이력 :2020.10.14 최초생성
     * 기능 추가 이력
     * 2020.10.14 ajax Object 배열을 통한 파라미터 전용 ( object 배열을 json형태로 전송) 데이터 삭제
    */
    ajaxClass.prototype.deleteAjaxObjectParam = function ( _jsonDate , _callBackFunction , _mapViews){
        /*
         * ex)  { 파라미터명 : 파라미터 값 }
         * 		{ text : 'text' , text1 : 'text1' }
         * */
        var async = this._ASYNC;

        /* ajax 구문 작성 */
        $.ajax({
            type : "POST",
            url : "moduleDeleteMapper.do",
            data : _jsonDate ,
            dataType : "json",
            async : async ,
            success : function( _data ){
                /*콜백 함수에 데이터 넘기기*/
                _callBackFunction( _data , _mapViews);
            }
        });
    }

    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.19.
     * 최종변경일 :2020.10.19.
     * 목적 : 오므젝트 배열
     * 개정이력 :2020.10.19 최초생성
     * 기능 추가 이력
     * 2020.10.19 오브젝트 배열
    */
    ajaxClass.prototype.paramAjaxObject =  function ( _sqlId, _Object ){
        /* _Object = { text : "1", text1 : "2" }; */
        _Object.sqlId = _sqlId;
        return _Object;
    }

    /*
     * 최초작성자 :백승재
     * 최초작성일 :2021.06.04.
     * 최종변경일 :2021.06.04.
     * 목적 : 오므젝트 배열 (key 값 포함해서 만들기)
     * 개정이력 :2020.10.19 최초생성
     * 기능 추가 이력
     * 2020.10.19 오브젝트 배열
    */
    ajaxClass.prototype.paramAjaxObjectKey =  function ( _sqlId, _key , _Object ){
        /* _Object = { sqlId : "1", key : "2" }; */
        _Object.sqlId = _sqlId;
        _Object.key = _key;
        return _Object;
    }

    /*
     * 최초작성자 :이세조
     * 최초작성일 :2020.03.12
     * 최종변경일 :2020.03.12.
     * 목적 : insert 를 사용하기 위한 쿼리의 파라메터 생성
     * 개정이력 :2020.03.12 최초생성
     * 기능 추가 이력
     * 2020.10.19 오브젝트 배열
     * paramAjaxObject 에 추가하여 사용
    */
    ajaxClass.prototype.paramInsertAjaxObject =  function ( _sqlId,_findKeySqlId, _Object ){
        /* _Object = { text : "1", text1 : "2" }; */
        _Object.sqlId = _sqlId;
        _Object.findKeySqlId = _findKeySqlId;
        return _Object;
    }

    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.19.
     * 최종변경일 :2020.10.19.
     * 목적 : 페이징 사용시 사용 하는 오브젝트 배열
     * 개정이력 :2020.10.19 최초생성
     * 기능 추가 이력
     * 2020.10.19 페이징 사용시 사용 하는 오브젝트 배열
    */
    ajaxClass.prototype.paramPagingAjaxObject =  function ( _sqlId, _sqlIdListCnt ,_Object,  _pageIndex, _pageunit  ){
        /*_Object = { text : "1", text1 : "2" };*/
        _Object.sqlId = _sqlId;
        _Object.sqlIdListCnt = _sqlIdListCnt;
        _Object.pageIndex = _pageIndex;
        _Object.pageunit = _pageunit;
        return _Object;
    }



    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.19.
     * 최종변경일 :2020.10.19.
     * 목적 : 폼테이터 사용시 (Serializ) 파라미터 생성
     * 개정이력 :2020.10.19 최초생성
     * 기능 추가 이력
     * 2020.10.19 폼테이터 사용시 (Serializ) 파라미터 생성
     */
    ajaxClass.prototype.paramSerializeAjaxObject =  function ( _sqlId, _Object , _formId ){
        /*sql문법 만들기*/
        _Object.sqlId = _sqlId;
        /*폼에서 가져와서 처리 할 구문 */
        var temp = $( "#" + _formId ).serializeArray();
        /*form 데이터 가져와서 object화 시키기 */
        for(var i = 0 ; i  < temp.length; i++){
            _Object[temp[i].name] = temp[i].value;
        }
        return _Object;
    }


    /*
 * 최초작성자 :백승재
 * 최초작성일 :2020.10.19.
 * 최종변경일 :2020.10.19.
 * 목적 : 폼테이터 사용시 (Serializ) 파라미터 생성
 * 개정이력 :2020.10.19 최초생성
 * 기능 추가 이력
 * 2020.10.19 폼테이터 사용시 (Serializ) 파라미터 생성
 */
    ajaxClass.prototype.paramSerializeKeyAjaxObject =  function ( _sqlId, _Object , _formId, _key ){
        /*sql문법 만들기*/
        _Object.sqlId = _sqlId;
        _Object.key = _key; /*조회키값*/
        /*폼에서 가져와서 처리 할 구문 */
        var temp = $( "#" + _formId ).serializeArray();
        /*form 데이터 가져와서 object화 시키기 */
        for(var i = 0 ; i  < temp.length; i++){
            _Object[temp[i].name] = temp[i].value;
        }
        return _Object;
    }
    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.19.
     * 최종변경일 :2020.10.19.
     * 목적 : 폼테이터 사용시 (Serializ) 파라미터 생성
     * 개정이력 :2020.10.19 최초생성
     * 기능 추가 이력
     * 2020.10.19 폼테이터 사용시 (Serializ) 파라미터 생성
     */
    ajaxClass.prototype.paramPagingSerializeAjaxObject =  function ( _sqlId, _sqlIdListCnt ,_Object, _formId, _pageIndex, _pageunit ){
        /*sql문법 만들기*/
        _Object.sqlId = _sqlId;
        _Object.sqlIdListCnt = _sqlIdListCnt;
        _Object.pageIndex = _pageIndex;
        _Object.pageunit = _pageunit;
        /*폼에서 가져와서 처리 할 구문 */
        var temp = $( "#" + _formId ).serializeArray();
        /*form 데이터 가져와서 object화 시키기 */
        for(var i = 0 ; i  < temp.length; i++){
            _Object[temp[i].name] = temp[i].value;
        }
        return _Object;
    }


    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.20.
     * 최종변경일 :2020.10.20.
     * 목적 : Ajax url 데이터 조회
     * 개정이력 :2020.10.20 최초생성
     * 기능 추가 이력
     * 2020.10.20 ajax url Data 조회
     */
    ajaxClass.prototype.retriveUrlAjaxDate = function ( _id, _param, _successPagingDate ,_callBackFunction ,_mapViews ){
        var async = this._ASYNC;
        $.ajax({
            type : "POST",                 /* POST 방식 */
            url : "proxyPost.do",        /* LibProxyController.java 에 존재하는 post형식의 프록시 */
            data :{
                url : _param,       /* 데이터는 url + param 형태로 보낸다. */
            },
            dataType : "text",
            async : async ,
            outputFormat : "application/json",
            /* 성공 시 */
            success : function( _data ) {
                _successPagingDate ( _id, _data, _callBackFunction, _mapViews );
            }
        });
    }
    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.20.
     * 최종변경일 :2020.10.20.
     * 목적 : Ajax url 형태로 조회시 파라미터 만들기 (일반 데이터)
     * 개정이력 :2020.10.20 최초생성
     * 기능 추가 이력
     * 2020.10.20 Ajax url 형태로 조회시 파라미터 만들기 (일반 데이터)
     */
    ajaxClass.prototype.paramPagingUrlAjax = function ( _url, _formId) {

        var param = null;
        if(_formId != null){
            /* from 데이터 조회*/
            var temp  = $( "#" + _formId ).serialize();
            param = _url + "?" + temp;
        }else{
            param = _url;
        }
        /*리턴*/
        return param;
    }



    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.20.
     * 최종변경일 :2020.10.20.
     * 목적 : 엔진 WFS(get) 방식 조회
     * 개정이력 :2020.10.20 최초생성
     * 기능 추가 이력
     * 2020.10.20 최초생성
     */
    ajaxClass.prototype.retriveGetWfs = function ( _param, _successgDate,  _moveWfs , _mapViews ){
        var async = this._ASYNC;
        $.ajax({
            type : "POST",                 /* POST 방식 */
            url : "proxyGet3.do",        /* LibProxyController.java 에 존재하는 post형식의 프록시 */
            data :{
                url : _param.url,       /* 데이터는 url + param 형태로 보낸다. */
                param : _param.param
            },
            dataType : "text",
            async : async ,
            outputFormat : "json",
            /* 성공 시 */
            success : function( _data ) {
                _successgDate ( _data, _moveWfs ,_mapViews );
            }
        });
    }


    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.20.
     * 최종변경일 :2020.10.20.
     * 목적 : 엔진 WFS(get) 방식 조회
     * 개정이력 :2020.10.20 최초생성
     * 기능 추가 이력
     * 2020.10.20 최초생성
     */
    ajaxClass.prototype.retrivePostWfs = function ( _param, _successgDate,  _moveWfs , _mapViews ){
        var async = this._ASYNC;
        $.ajax({
            type : "POST",                 /* POST 방식 */
            url : "map/wfs/proxyPost.do",        /* LibProxyController.java 에 존재하는 post형식의 프록시 */
            data :{
                url : _param.url,       /* 데이터는 url + param 형태로 보낸다. */
                param : _param.param
            },
            dataType : "text",
            async : async ,
            outputFormat : "json",
            /* 성공 시 */
            success : function( _data ) {
                _successgDate ( _data, _moveWfs ,_mapViews );
            }
        });
    }


    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.20.
     * 최종변경일 :2020.10.20.
     * 목적 : 엔진 WFS(get) 방식 조회
     * 개정이력 :2020.10.20 최초생성
     * 기능 추가 이력
     * 2020.10.20 최초생성
     */
    ajaxClass.prototype.retrivePostWfsUrl = function ( _param, _successgDate,  _moveWfs , _mapViews ){

        var async = this._ASYNC;
        $.ajax({
            type : "POST",                 /* POST 방식 */
            url : _param.url,        /* LibProxyController.java 에 존재하는 post형식의 프록시 */
            data : _param.param,
            dataType : "text",
            async : async ,
            outputFormat : "json",
            headers: {
                "Content-Type": "text/xml;charset=utf-8"
            },
            /* 성공 시 */
            success : function( _data ) {
                _successgDate ( _data, _moveWfs ,_mapViews );
            }
        });
    }


    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.20.
     * 최종변경일 :2020.10.20.
     * 목적 : 엔진 WFS(get) 방식 파라미터 생성
     * 개정이력 :2020.10.20 최초생성
     * 기능 추가 이력
     * 2020.10.20 ajax url Data 조회
     */
    ajaxClass.prototype.retriveGetWfsParam = function ( _url , _param ){
        var tempValue = {
            url : _url,
            param : _param
        }
        return tempValue;
    }

    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.14.
     * 최종변경일 :2020.10.14.
     * 목적 : 이미지 저장전 세팅 하는 부분
     * 개정이력 :2020.10.14 최초생성
     * 기능 추가 이력
     * 2020.10.14 이미지 저장전 세팅 하는 부분
     */
    ajaxClass.prototype.registerFileAdd = function( _formId, _param, _callBackFunction, _id ,_mapViews ){
        this.SetAjaxFileParameter( _formId, _param, _id);

        var formData = new FormData($('#' + _formId)[0]);
        this.SetAjaxFileUpLoading( _formId, formData, _callBackFunction, _mapViews);
    }

    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.14.
     * 최종변경일 :2020.10.14.
     * 목적 : 사용자 파라미터 생성후 넘겨주는부분
     * 개정이력 :2020.10.14 최초생성
     * 기능 추가 이력
     * 2020.10.14 사용자 파라미터 생성후 넘겨주는부분
     */
    ajaxClass.prototype.SetAjaxFileParameter = function( _formId, _param, _id ){
        var strParam = "";
        /*키값 가져오기 확인 */
        var keys =  Object.keys(_param);
        for(var i =0; i < keys.length; i++){
            strParam += "<input type='hidden' id='"+keys[i]+"' name='"+keys[i]+"' value= '"+_param[keys[i]]+"'>";
        }
        $("#" + _id).html(strParam);
    }

    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.14.
     * 최종변경일 :2020.10.14.
     * 목적 : ajaxSubmit 파일 전송 및 ajax Submit 형태로 사용할때 사용
     * 개정이력 :2020.10.14 최초생성
     * 기능 추가 이력
     * 2020.10.14 이미지 저장전 세팅 하는 부분
     */
    ajaxClass.prototype.SetAjaxFileUpLoading = function(id, formData, callBackFunction, _mapViews){
        $.ajax({
            url: "moduleInsertMapperWithFile.do",
            data:formData,
            dataType: 'text',
            async : false,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (response) {
                /* 프로그레스바 삭제 */
                //end_progress();
                callBackFunction(response, _mapViews);
            }, error: function (jqXHR) {
            }
        });
    }

    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.12.21.
     * 최종변경일 :2020.12.21.
     * 목적 : 페이지 변경을 위한 파라미터 정의
     * 개정이력 :2020.12.21 최초생성
     * 기능 추가 이력
     * 2020.12.21 최초생성
     */
    ajaxClass.prototype.ajaxDoneParam = function ( _url ){
        var ajaxDoneParam = {
            url : _url,
            async : true,
            type : "POST",
            dataType : "html",
            cache : false
        };
        return ajaxDoneParam;
    }

    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.12.21.
     * 최종변경일 :2020.12.21.
     * 목적 : ajax이용한 페이지 변경
     * 개정이력 :2020.12.21 최초생성
     * 기능 추가 이력
     * 2020.12.21 최초생성
     */
    ajaxClass.prototype.ajaxDone = function ( _ajaxDoneParam, _changeDiv ){
        $.ajax( _ajaxDoneParam ).done(function(data){
            // Contents 영역 삭제
            $('#' + _changeDiv).children().remove();
            // Contents 영역 교체
            $('#' + _changeDiv).html(data);
        });
    }
    /*
     * 최초작성자 :백승재
     * 최초작성일 :2020.10.14.
     * 최종변경일 :2020.10.14.
     * 목적 : ajaxEroor 코드 세팅
     * 개정이력 :2020.10.14 최초생성
     * 기능 추가 이력
     * 2020.10.14 ajaxEroor 코드 세팅
     */
    ajaxClass.prototype.ajaxSetupError = function (){
        $.ajaxSetup({
            error: function(jqXHR, exception) {
                if (jqXHR.status === 0) {
                    console.log('Not connect.\n Verify Network.');
                }
                else if (jqXHR.status == 400) {
                    console.log('Server understood the request, but request content was invalid. [400]');
                }
                else if (jqXHR.status == 401) {
                    console.log('Unauthorized access. [401]');
                }
                else if (jqXHR.status == 403) {
                    console.log('Forbidden resource can not be accessed. [403]');
                }
                else if (jqXHR.status == 404) {
                    console.log('Requested page not found. [404]');
                }
                else if (jqXHR.status == 500) {
                    console.log('Internal server error. [500]');
                }
                else if (jqXHR.status == 503) {
                    console.log('Service unavailable. [503]');
                }
                else if (exception === 'parsererror') {
                    console.log('Requested JSON parse failed. [Failed]');
                }
                else if (exception === 'timeout') {
                    console.log('Time out error. [Timeout]');
                }
                else if (exception === 'abort') {
                    console.log('Ajax request aborted. [Aborted]');
                }
                else {
                    console.log('Uncaught Error.n' + jqXHR.responseText);
                }
            }
        });
    }

    /*
    * 최초작성자 :백승재
    * 최초작성일 :2020.10.20.
    * 최종변경일 :2020.10.20.
    * 목적 : Ajax url 데이터 조회
    * 개정이력 :2020.10.20 최초생성
    * 기능 추가 이력
    * 2020.10.20 ajax url Data 조회
    */
    ajaxClass.prototype.retriveUrlAjaxNoneParm = function ( _param, _successPagingDate , _key, _type ){
        var async = this._ASYNC;
        $.ajax({
            type : "POST", /* POST 방식 */
            url : "proxyGet.do?", /* LibProxyController.java 에 존재하는 post형식의 프록시 */
            data :{
                url : _param, /* 데이터는 url + param 형태로 보낸다. */
            },
            dataType : "text",
            async : async ,
            outputFormat : "json",
            /* 성공 시 */
            success : function( _data ) {
                _successPagingDate ( _data , _type );
            }
        });
    }
}

OlSeesun.publics.ajax = new ajaxClass();