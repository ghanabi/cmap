
/*
 * 최초작성자 :이세조
 * 최초작성일 :2021.03.08.
 * 최종변경일 :2021.03.08.
 * 목적 : url에 대한 처리
 * 개정이력 :2021.03.08 최초생성
 * 기능 추가 이력
 * 2021.03.08 최초생성 
*/
function urlClass( ) {
	
	
	/*
	 * 최초작성자 :이세조
	 * 최초작성일 :2021.03.08.
	 * 최종변경일 :2021.03.08.
	 * 목적 : 파라메터 전체 반환
	 * 개정이력 :2021.03.08 최초생성
	 * 기능 추가 이력
	 * 2021.03.08 최초생성 
	*/
	urlClass.prototype.getUrlParams = function (){
		var params = {};
	    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
	    return params;
	}
	

	/*
	 * 최초작성자 :이세조
	 * 최초작성일 :2021.03.08.
	 * 최종변경일 :2021.03.08.
	 * 목적 : 파라메터 명에 맞는 값을 반환 (매핑되는 값이 없을 경우 undefined 를 반환)
	 * 개정이력 :2021.03.08 최초생성
	 * 기능 추가 이력
	 * 2021.03.08 최초생성 
	*/
	urlClass.prototype.getParams = function (paramName){
		var params = OlSeesun.publics.Url.getUrlParams();
		if(params == null || params == undefined){
			return undefined;
		}
	    return params[paramName];
	}
}

OlSeesun.publics.Url = new urlClass();