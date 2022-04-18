/*
 * 최초작성자 :백승재
 * 최초작성일 :2020.09.24.
 * 최종변경일 :2020.09.24.
 * 목적 : 현재 시간을 설정 하기 위한 함수
 * 개정이력 :2020.09.24 최초생성
 * 기능 추가 이력
 * 2020.09.24 현제 시간을 설정 하기 위한 함수
*/
function DateClass(){
	
	this._DATE = null;  /* 시간 데이터 */ 
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.09.24.
	 * 최종변경일 :2020.09.24.
	 * 목적 : 날짜를 가져 오기 위한 함수 
	 * 개정이력 :2020.09.24 최초생성
	 * 기능 추가 이력
	 * 2020.09.24 날짜를 가져오기위한 함수
	*/
	DateClass.prototype.retriveDate = function (){
		this._DATE = new Date(); /*시간 데이터 변수 생성*/
		
		var week = ['일', '월', '화', '수', '목', '금', '토'];     /* 'Week'(로컬) */
		var dateTime = {
			'Year' :    this._DATE.getFullYear(),   /* '년'(로컬) */
			'Month' :   this.zeroAdd( this._DATE.getMonth() + 1 ), /* '월'(로컬) */
			'Date' :    this.zeroAdd( this._DATE.getDate() ),       /* '일'(로컬) */
		    'Day' :     this._DATE.getDay(),         /* '요일[숫자]'(로컬) */
		    'week' :         week[this._DATE.getDay()],       /*  요일 */  
			'Hours' :   this.zeroAdd( this._DATE.getHours() ),     /* '시'(로컬) */
		    'Minutes' : this.zeroAdd( this._DATE.getMinutes() ), /* '분'(로컬) */
		    'Seconds' : this.zeroAdd( this._DATE.getSeconds() )  /* '초'(로컬) */
		}
		
		return dateTime;
	}
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.09.24.
	 * 최종변경일 :2020.09.24.
	 * 목적 : 날짜를 가져 오기 위한 함수 
	 * 개정이력 :2020.09.24 최초생성
	 * 기능 추가 이력
	 * 2020.09.24 날짜를 가져오기위한 함수
	*/
	DateClass.prototype.retriveCalDate = function ( _date ){
		/*_date : 현재 시간 나타냄*/
		this._DATE = _date; /*시간 데이터 변수 생성*/
		
		var week = ['일', '월', '화', '수', '목', '금', '토'];     /* 'Week'(로컬) */
		var dateTime = {
			'Year' :    this._DATE.getFullYear(),   /* '년'(로컬) */
			'Month' :   this.zeroAdd( this._DATE.getMonth() + 1 ), /* '월'(로컬) */
			'Date' :    this.zeroAdd( this._DATE.getDate() ),       /* '일'(로컬) */
		    'Day' :     this._DATE.getDay(),         /* '요일[숫자]'(로컬) */
		    'week' :         week[this._DATE.getDay()],       /*  요일 */  
			'Hours' :   this.zeroAdd( this._DATE.getHours() ),     /* '시'(로컬) */
		    'Minutes' : this.zeroAdd( this._DATE.getMinutes() ), /* '분'(로컬) */
		    'Seconds' : this.zeroAdd( this._DATE.getSeconds() )  /* '초'(로컬) */
		}
		
		return dateTime;
	}
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.09.24.
	 * 최종변경일 :2020.09.24.
	 * 목적 : 시간 변경 시 인식하는 형태에 맞게 숫자 앞에 '0'을 붙여주는 함수
	 * 개정이력 :2020.09.24 최초생성
	 * 기능 추가 이력
	 * 2020.09.24 시간 변경 시 인식하는 형태에 맞게 숫자 앞에 '0'을 붙여주는 함수
	*/
	DateClass.prototype.zeroAdd =  function ( _timeNum ){
		if(_timeNum < 10) {           /* 10보 작으면 실행 */
			_timeNum = "0" +	_timeNum;      /* 앞에 '0'을 붙인다 */
		} 
		return _timeNum;       /* 되돌리기 */
	}

	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.09.24.
	 * 최종변경일 :2020.09.24.
	 * 목적 : 시간 변경 시 인식하는 형태에 맞게 숫자 앞에 '0'을 붙여주는 함수
	 * 개정이력 :2020.09.24 최초생성
	 * 기능 추가 이력
	 * 2020.09.24 시간 변경 시 인식하는 형태에 맞게 숫자 앞에 '0'을 붙여주는 함수
	*/
	DateClass.prototype.nowDateString =  function (){
		return this.retriveDate().Year + "-" + this.retriveDate().Month + "-" +   this.retriveDate().Date;
	}
	

	/*
	 * 최초작성자 :이세조
	 * 최초작성일 :2021.03.23
	 * 최종변경일 :2021.03.23
	 * 목적 : 날짜 유형을 포맷에 맞게 변환
	 * 개정이력 :2020.09.24 최초생성
	 * 기능 추가 이력
	 * 2020.09.24 시간 변경 시 인식하는 형태에 맞게 숫자 앞에 '0'을 붙여주는 함수
	*/
	DateClass.prototype.DateString =  function (_date){
		return _date.getFullYear() + "-" + this.zeroAdd( _date.getMonth() + 1 ) + "-" + this.zeroAdd( _date.getDate() );
	}
	
	
	
}
/* 클래스 정의 */
OlSeesun.publics.Date = new DateClass();