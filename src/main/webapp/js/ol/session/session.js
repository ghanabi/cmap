/**
 * 세션 컨트롤로
 */
function sessionClass (){

    /**
     * 세션 생성이후 페이지 호출 부분
     * @param _paramObj
     */
    sessionClass.prototype.createSession = function( _paramObj, _url ){
        /*세션 체킹 */
        _paramObj.sessionCheck = "create";
        /* 세션 생성 */
        OlSeesun.publics.ajax.retriveAjaxSession( _paramObj, function( _data ){
            if( _data.check ){
                location.replace( _url );
            }
        });
    }
    /**
     * 세션 초기화
     * @param _paramObj
     * @param _url
     */
    sessionClass.prototype.invalidateSession = function( _paramObj, _url ){
        /*세션 체킹 */
        _paramObj.sessionCheck = "invalidate";
        /* 세션 생성 */
        OlSeesun.publics.ajax.retriveAjaxSessionInvaliDate( _paramObj, function( _data ){
            console.log( _data );
            if( _data.check ){
                location.replace( _url );
            }
        });
    }
}
OlSeesun.session = new sessionClass();