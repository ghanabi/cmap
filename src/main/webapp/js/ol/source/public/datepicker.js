/*
 * 최초작성자 :백승재
 * 최초작성일 :2020.09.24.
 * 최종변경일 :2020.09.24.
 * 목적 : 달력 생성 및 관리 컨트롤
 * 개정이력 :2020.09.24 최초생성
 * 기능 추가 이력
 * 2020.09.24 달력 생성 및 관리 컨트롤
*/
function DatePickerClass(){
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.09.24.
	 * 최종변경일 :2020.09.24.
	 * 목적 : 달력 생성
	 * 개정이력 :2020.09.24 최초생성
	 * 기능 추가 이력
	 * 2020.09.24 달력 생성
	*/
	DatePickerClass.prototype.initDatepicker = function ( _datePickerId ) {
		/*달력이벤트 정의*/
		$( "#" + _datePickerId ).datepicker({
			dateFormat: 'yy-mm-dd', /*데이터 포멧*/
        	prevText: '이전 달',
        	nextText: '다음 달',
        	monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        	monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        	dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        	dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        	dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        	showMonthAfterYear: true,
        	yearSuffix: '년',
		}); 
		
		$( "#" + _datePickerId ).datepicker('setDate', new Date()); /* 생성된 뒤 날짜 값을 설정(현재시간) */
		
		
	}
	/*
	 * 최초작성자 :이세조
	 * 최초작성일 :2021.03.11.
	 * 최종변경일 :2020.03.11.
	 * 목적 : 달력 생성 , 초기값 설정
	 * 개정이력 :2020.03.11 최초생성
	 * 기능 추가 이력 
	 * 2020.03.11 달력 생성
	*/
	DatePickerClass.prototype.setDatepicker = function ( _datePickerId , date ) {
		/*달력이벤트 정의*/
		$( "#" + _datePickerId ).datepicker({
			dateFormat: 'yy-mm-dd', /*데이터 포멧*/
        	prevText: '이전 달',
        	nextText: '다음 달',
        	monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        	monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        	dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        	dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        	dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        	showMonthAfterYear: true,
        	yearSuffix: '년',
		}); 
		
		$( "#" + _datePickerId ).datepicker('setDate', date); /* 생성된 뒤 날짜 값을 설정(현재시간) */
		
		
	}
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.09.24.
	 * 최종변경일 :2020.09.24.
	 * 목적 : 달력 선택했을때 값 가져오기
	 * 개정이력 :2020.09.24 최초생성
	 * 기능 추가 이력
	 * 2020.09.24 달력 선택했을때 값 가져오기
	*/
	DatePickerClass.prototype.retriveDatePicker = function ( _mapViews , _datePickerId , _callBackFunction ) {
		var week = ['일', '월', '화', '수', '목', '금', '토'];         /* 'Week'(달력) */
		var dateTime = [];
		$( "#" + _datePickerId ).change( function datePick(){
			
			var pickerDate = $( "#" + _datePickerId ).datepicker( "getDate" );      /* 달력에서 date값 가져오기 */
			dateTime = {
				'Year' :    pickerDate.getFullYear(),   /* '년'(로컬) */
				'Month' :   OlSeesun.publics.Date.zeroAdd( pickerDate.getMonth() + 1 ), /* '월'(로컬) */
				'Date' :    OlSeesun.publics.Date.zeroAdd( pickerDate.getDate() ),       /* '일'(로컬) */
				'Day' :     OlSeesun.publics.Date.zeroAdd( pickerDate.getDay() ),         /* '요일[숫자]'(로컬) */
				'week' :         week[pickerDate.getDay()],       /*  요일 */  
				'Hours' :   OlSeesun.publics.Date.zeroAdd( OlSeesun.publics.Date._DATE.getHours() ),     /* '시'(로컬) */
				'Minutes' : OlSeesun.publics.Date.zeroAdd( OlSeesun.publics.Date._DATE.getMinutes() ), /* '분'(로컬) */
				'Seconds' : OlSeesun.publics.Date.zeroAdd( OlSeesun.publics.Date._DATE.getSeconds() )  /* '초'(로컬) */
			} 
			
			_callBackFunction( _mapViews , dateTime );
			
		});
		
		//return dateTime;
	}
	
	/*
	 * 최초작성자 :최귀리
	 * 최초작성일 :2021.03.19.
	 * 최종변경일 :2021.03.19.
	 * 목적 : 1년전부터 시작하는 달력 생성
	 * 개정이력 :2021.03.19. 최초생성
	 * 기능 추가 이력
	 * 2021.03.19. 달력 생성
	*/
	DatePickerClass.prototype.initBeforeYearDatepicker = function ( _datePickerId ) {
		/*달력이벤트 정의*/
		$( "#" + _datePickerId ).datepicker({
			dateFormat: 'yy-mm-dd', /*데이터 포멧*/
        	prevText: '이전 달',
        	nextText: '다음 달',
        	monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        	monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        	dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        	dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        	dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        	showMonthAfterYear: true,
        	yearSuffix: '년',
		}); 
		
		//1년전날짜구하기
		var nowDate = new Date();
		var yearDate = nowDate.getTime() - (365*24*60*60*1000);
		nowDate.setTime(yearDate);
				
		$( "#" + _datePickerId ).datepicker('setDate', nowDate); /* 생성된 뒤 날짜 값을 설정(현재시간) */
		
		
	}
	
}
/*클래스 정의*/
OlSeesun.publics.DatePicker = new DatePickerClass();