function checkboxClass (){
	checkboxClass.prototype.retriveChangeCheck = function ( _checkId ){
		var returnCheck = false;
		if($("#"+ _checkId ).is(":checked")){
			returnCheck = true;
		}else{
			returnCheck = false;
		}
		return returnCheck;
	}
	/*체크값 바꾸기*/
	checkboxClass.prototype.changeCheck = function ( _id ,_checkId ) {
		if( _checkId ){
			 document.getElementById( _id ).checked = true;
		}else{
			document.getElementById( _id ).checked = false;
		}
	}

	/* 체크박스 체크,언체크 */
	checkboxClass.prototype.inputChecked = function ( _id ,_checked ) {
		document.getElementById( _id ).checked = _checked;
	}
	
	/*체크값 바꾸기*/
	checkboxClass.prototype.allUnchecked = function ( _id ) {
		$('#' + _id +' input').prop('checked',false);
	}
	
	/* 체크 상태 가져오기 */
	checkboxClass.prototype.retriveVal = function( _id ){
		return document.getElementById( _id ).checked;
	}
}
OlSeesun.publics.checkBox = new checkboxClass();