/*
 * 최초작성자 :백승재
 * 최초작성일 :2020.10.05.
 * 최종변경일 :2020.10.05.
 * 목적 : 슬라이더 관련 클래스  
 * 개정이력 :2020.10.05 최초생성
 * 기능 추가 이력
 * 2020.10.05 슬라이더 관련 클래스   
 */
function sliderClass () {
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.10.05.
	 * 최종변경일 :2020.10.05.
	 * 목적 : 타임 슬라이더 세팅 부분
	 * 개정이력 :2020.10.05 최초생성
	 * 기능 추가 이력
	 * 2020.10.05 타임슬라이더 생성부분   
	 */
	sliderClass.prototype.setTimeSlider = function( _mapViews , _divId , _callBackFunction ){
		
		/*날짜 시간 가져오기*/
		var dateTime = 	OlSeesun.publics.Date.retriveDate();
		
		$( '#' + _divId ).slider({
			range : 'max',        /* 범위의 강조(색상이 표시되는 곳) : MAX(왼쪽라인) */
			min : 0,    		         /* 최소값 (= 0초) */
			max : 86400,         /* 최대값 (= 86400초[24시간] ) */
			value : ( dateTime["Hours"] * 1 )  * ( 60 * 60 )+  /* 시간을 초로 바꾸기 시간 * (60 *60)  */
					( dateTime["Minutes"] * 1 )  * 60 + ( dateTime["Seconds"] * 1), /* 분을 초로 바꾸기 시간 * 60 */
			step : 1,                /* 증가하는 값 */
			slide : function(event, time){      /* 슬라이더를 움직일때 실행할 내용 */
				//clearInterval( CesiumSeesun.Analysis.SunLight._INTERVAL );               /* 시계 중지 */
				var rangeValue = time.value;       /* 슬라이드바 값('초') */

				var minuteVal = 0;      /* '분' 값을 구하기 위한 변수 */
				var ranHours = 0;       /* 슬라이드 바 로 생성된 '시' 값 */
				
				/* 슬라이더바 값('초')을 이용하여 시간으로 변환하는 과정 */
				for( var i = 1; i <= rangeValue; i++ ) {
					if( i % 60 == 0 ) {
						minuteVal = minuteVal + 1;      /* 초 -> 분 변환 */
						if( minuteVal % 60 == 0 ) {
							ranHours = ranHours + 1;     /* 분 -> 시 변환 */
						}
					}
				}
				
				var ranMinutes = minuteVal - (ranHours * 60);         /* 슬라이드바로 만들어진 '분' 값 */
				var ranSecond = rangeValue - (minuteVal * 60);       /* 슬라이드바로 만들어진 '초' 값 */
				
				/* 슬라이드바 업데이트 */
				//fn_clockUpdate(ranHours, ranMinutes, ranSecond);     
				
				_callBackFunction ( _mapViews , ranHours, ranMinutes, ranSecond );
				
			}
		});
	}
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.09.
	 * 최종변경일 :2020.11.09.
	 * 목적 : 현제 슬라이더 값 조회
	 * 개정이력 :2020.11.09 최초생성
	 * 기능 추가 이력
	 * 2020.11.09 현제 슬라이더 값 조회 
	 */
	sliderClass.prototype.setTimeSliderValue =  function ( _id ){
		var sliderValue = $('#' + _id).slider("option", "value");
		
		var rangeValue = sliderValue;       /* 슬라이드바 값('초') */

		var minuteVal = 0;      /* '분' 값을 구하기 위한 변수 */
		var ranHours = 0;       /* 슬라이드 바 로 생성된 '시' 값 */
		
		/* 슬라이더바 값('초')을 이용하여 시간으로 변환하는 과정 */
		for( var i = 1; i <= rangeValue; i++ ) {
			if( i % 60 == 0 ) {
				minuteVal = minuteVal + 1;      /* 초 -> 분 변환 */
				if( minuteVal % 60 == 0 ) {
					ranHours = ranHours + 1;     /* 분 -> 시 변환 */
				}
			}
		}
		var ranMinutes = minuteVal - (ranHours * 60);         /* 슬라이드바로 만들어진 '분' 값 */
		var ranSecond = rangeValue - (minuteVal * 60);       /* 슬라이드바로 만들어진 '초' 값 */
		
		/* inputHours('시') 값 변경(계산을 통해 0~24를 벗어나는 시간을 바꿔주기 위한 작업) */
		var hoursCul = ranHours - 9;       /* 세슘기준과 대한민국 기준의 시간 차(9시간) */
		if(hoursCul < 0) {       /* 0보다 작으면(=음수) */
			ranHours = 24 + hoursCul;      /* 24시간에서 음수값만큼 빼주면 현재 대한민국 시간 */
		} else {     /* 0보다 크거나 같으면 */
			ranHours = hoursCul;              /* 그대로 값 입력 */
		}
		
		/*배령ㄹ에 값저장 시켜 두기 */
		var dateTime ={
				"Hours" : OlSeesun.publics.Date.zeroAdd( ranHours ),
				"Minutes" : OlSeesun.publics.Date.zeroAdd( ranMinutes ),
				"Seconds" : OlSeesun.publics.Date.zeroAdd( ranSecond ),
		}
		
		return dateTime;
	}
	
}
OlSeesun.publics.Slider = new sliderClass();

