/**
 * 벨리데이션 관련 컨트롤러
 */
function validateClass(){
    /* 아이디와 패스워드가 적합한지 검사할 정규식 */
    this.checkIdPass = /^[a-zA-Z0-9]{4,12}$/
    // 이메일이 적합한지 검사할 정규식
    this.checkEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    /**
     * 아이디 페스워드 이메일 정규식 체크
     * @param _re 정규식 종류
     * @param _divId div아이디
     * @param _message 메시지
     */
    validateClass.prototype.checkRegularExpression = function ( _re, _divId, _message ){
        var div = $("#" + _divId);
        if(re.test(div.value)) {
            return true;
        }
        alert(message);
        div.value = "";
        div.focus();
    }

    /**
     * 텍스트 값 벨리데이션
     * @param _divId
     * @param _message
     */
    validateClass.prototype.checkTextValue = function ( _divId, _message ){
        var div = $("#" + _divId);
        if(div.value == ""){
            alert(_message);
            div.focus();
        }else{
            return true;
        }
    }

}
OlSeesun.publics.validate = new validateClass();