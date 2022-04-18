/**
 * 파일 관련 클래스
 */
function fileClass (){
    this.fileExtension = ["zip", "png", "jpg", "jpeg"];
    this.fileForm = "f_file";
    this.fileParamertId = "file_param";
    this.fileSql = "file.insertFile";
    this.fileDeleteSql = "file.DeleteFile";
    this.fileKey = "";
    /**
     * 파일체크
     * @param _fileObj 파일 객체
     * @param _divId 파일이름을 담을 객체
     * @param _fileExtension 확장자 판단을 위한 배열
     */
    fileClass.prototype.fileCheck = function ( _fileObj, _divId, _expressionFileDivId,_fileExtension ){
        /*파일 확장자 체크를 위한 값들*/
        if( _fileExtension != null ){
            this.fileExtension = _fileExtension;
        }
        var file = _fileObj.files;
        var fileName = file[0].name;
        var fileValue = fileName.slice( fileName.indexOf(".") +1).toLowerCase();
        var checkFile = false;
        for( var i = 0;  i < this.fileExtension.length; i++){
            if( fileValue ==  this.fileExtension[i] ){
                $("#"+_divId).val( fileName );
                $("#"+_expressionFileDivId).val( fileName );
                checkFile = true;
            }
        }
        return checkFile;
    }

    /**
     * 파일 업로드 파라 미터 생성
     * @param _key     사용되는 테이블의 키값
     * @param _fileKey 파일 수정시 사용되는 업로드 키값
     * @param _path    파일 업로드 경로
     * @param _gubun   파일 업로드시 사용되는 그룹 아이디
     * @param _type    업로드 타입 ( 수정 / 생성 ) - 삭제는 현황을 남기기 위해서 사용
     * @param _sqlId   sqlId,
     * @param _Object  리턴으로 넘어갈 _Object 파일,
     */
    fileClass.prototype.fileParameter = function ( _key, _fileKey, _path,  _gubun, _type, _sqlId, _Object ){
        /* 파라미터 생성 */
        _Object.key = _key;
        _Object.fkey = _fileKey;
        _Object.path = _path;
        _Object.gubun = _gubun;
        _Object.type = _type;
        _Object.sqlId = _sqlId;
        return _Object;
    }
}

OlSeesun.publics.file = new fileClass();