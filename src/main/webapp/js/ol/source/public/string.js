
/*
 * 최초작성자 :백승재
 * 최초작성일 :2020.11.03.
 * 최종변경일 :2020.11.03.
 * 목적 : 스트링 문자열 가
 * 개정이력 :2020.11.03 최초생성
 * 기능 추가 이력
 * 2020.11.03 최초생성 
*/
function stringClass( ) {
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.03.
	 * 최종변경일 :2020.11.03.
	 * 목적 : 문자열 자르기
	 * 개정이력 :2020.11.03 최초생성
	 * 기능 추가 이력
	 * 2020.11.03 최초생성 
	*/
	stringClass.prototype.split = function ( _value , _splitValue ){
		/*문자열 자르기*/
		return _value.split(_splitValue);
	}
}

OlSeesun.publics.String = new stringClass();