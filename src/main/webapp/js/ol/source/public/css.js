/*
 * 최초작성자 :백승재
 * 최초작성일 :2020.11.11.
 * 최종변경일 :2020.11.11.
 * 목적 : 클래스 컨트롤 함수
 * 개정이력 :2020.11.11 최초생성
 * 기능 추가 이력
 * 2020.11.11 클래스 컨트롤 함수
*/
function cssClass (){
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.11.
	 * 최종변경일 :2020.11.11.
	 * 목적 : div display 상태 가져오기
	 * 개정이력 :2020.11.11 최초생성
	 * 기능 추가 이력
	 * 2020.11.11 클래스 컨트롤 함수
	*/
	cssClass.prototype.getDisplayOption = function ( _divId ){
		var check  = false;
		if( document.getElementById( _divId ).style.display == "block" ){
			check =  true; 
		}else{
			check =  false;
		}
		return check;
	}

	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.11.
	 * 최종변경일 :2020.11.11.
	 * 목적 : div display 상태 적용
	 * 개정이력 :2020.11.11 최초생성
	 * 기능 추가 이력
	 * 2020.11.11 div display 상태 적용
	*/
	cssClass.prototype.setStyleDisplay = function ( _divId , _cssOption, _cssValue ){
		$( "#" + _divId ).css( _cssOption, _cssValue );
	}
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.12.21.
	 * 최종변경일 :2020.12.21.
	 * 목적 : div display 상태 적용( 클래스용)
	 * 개정이력 :2020.12.21 최초생성
	 * 기능 추가 이력
	 * 2020.12.21 div display 상태 적용( 클래스용)
	*/
	cssClass.prototype.setStyleDisplayClass = function ( _classId , _cssOption, _cssValue ){
		$( "." + _classId ).css( _cssOption, _cssValue );
	}
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.11.
	 * 최종변경일 :2020.11.11.
	 * 목적 : div display none / block 이벤트 
	 * 개정이력 :2020.11.11 최초생성
	 * 기능 추가 이력
	 * 2020.11.11 div display none / block 이벤트
	*/
	cssClass.prototype.setDivOnOff = function ( _divId ){
		if( this.getDisplayOption( _divId )){ 
			//true : 현재 block상태
			this.setStyleDisplay(_divId, "display", "none"); // div 끄기
		} else { 
			// false : 현재 none 상태
			this.setStyleDisplay(_divId, "display", "block"); //div 켜기
		}
	}
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.12.01.
	 * 최종변경일 :2020.12.01.
	 * 목적 : 클래스 제거 
	 * 개정이력 :2020.12.01 최초생성
	 * 기능 추가 이력
	 * 2020.12.01 최초생성
	*/
	cssClass.prototype.removeClass = function ( _divId ){
		var chk = false;
		try{
			$( "#" + _divId ).removeClass();/*테이블 클래스 초기화*/	
			chk = true;
		}catch (e) {
			chk = false;
		}
		return chk;
	}
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.12.01.
	 * 최종변경일 :2020.12.01.
	 * 목적 : 클래스 삽입 
	 * 개정이력 :2020.12.01 최초생성
	 * 기능 추가 이력
	 * 2020.12.01 최초생성
	*/
	cssClass.prototype.addClass = function ( _divId, _classId ){
		var chk = false;
		try{
			$( "#" + _divId ).addClass( _classId );/*결과 테이블에 클래스 추가*/
			chk = true;
		}catch (e) {
			chk = false;
		}
		return chk;
	}
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2021.01.06.
	 * 최종변경일 :2021.01.06.
	 * 목적 : 클랙스 있는지 없는 확인 유무 
	 * 개정이력 :2021.01.06 최초생성
	 * 기능 추가 이력
	 * 2021.01.06 최초생성
	*/
	cssClass.prototype.getCheckHasClass = function ( _divId, _classId ){
		return $('#' + _divId ).hasClass( _classId );
	}
	
	
	
}
OlSeesun.publics.Css = new cssClass();