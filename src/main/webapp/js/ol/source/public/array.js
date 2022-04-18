/*
 * 최초작성자 :백승재
 * 최초작성일 :2020.09.03.
 * 최종변경일 :2020.09.03.
 * 목적 : 배열 관련 공용 함수
 * 개정이력 :2020.09.03 최초생성
 * 기능 추가 이력
 * 2020.09.03 최초생성 
 * 2020.09.03 배열 마지막 요소 제거
*/
function arrayClass(){
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.09.03.
	 * 최종변경일 :2020.09.03.
	 * 목적 : 중복 제거후 내림 차수 함수 
	 * 개정이력 :2020.09.03 최초생성
	 * 기능 추가 이력
	 * 2020.09.03 최초생성 
	*/
	arrayClass.prototype.slices = function ( _array ){
		return  _array.slice().sort(function(a,b){return a - b}).reduce(function(a,b){if (a.slice(-1)[0] !== b) a.push(b);return a;},[]);
	}
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.10.23.
	 * 최종변경일 :2020.10.23.
	 * 목적 : 배열의 마지막 요소 제거 
	 * 개정이력 :2020.10.23 최초생성
	 * 기능 추가 이력
	 * 2020.10.23 최초생성 
	*/
	arrayClass.prototype.arrayPop = function ( _array ) {
		return _array.pop();
	}
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.10.23.
	 * 최종변경일 :2020.10.23.
	 * 목적 : 배열 값 추가
	 * 개정이력 :2020.10.23 최초생성
	 * 기능 추가 이력
	 * 2020.10.23 배열 값 추가
	*/
	arrayClass.prototype.arrayPush = function ( _array, _value ) {
		return _array.push(_value);
	}
	
}
OlSeesun.publics.array = new arrayClass();

