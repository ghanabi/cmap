
/*
 * 최초작성자 :백승재
 * 최초작성일 :2020.11.02.
 * 최종변경일 :2020.11.02.
 * 목적 : 자주 사용하는 함수 모음 클래스
 * 개정이력 :2020.11.02. 최초생성
 * 기능 추가 이력
 * 2020.11.02. 최초 생성 
*/
function textValueClass(){
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.02.
	 * 최종변경일 :2020.11.02.
	 * 목적 : 아이디와 요소를 받으면 append하는 함수
	 * 개정이력 :2020.11.02. 최초생성
	 * 기능 추가 이력
	 * 2020.11.02. 최초 생성 
	*/
	textValueClass.prototype.append = function ( _id, _context ){
		$( "#" + _id ).append( _context );
	}
	/*
	 * 최초작성자 :양준일
	 * 최초작성일 :2021.01.07
	 * 최종변경일 :2021.01.07
	 * 목적 : 값(value) 넣기
	 * 개정이력 :2021.01.07 최초생성
	 * 기능 추가 이력
	 * 2021.01.07 최초 생성
	*/
	textValueClass.prototype.inputVal = function ( _id, _value ){
		$( "#" + _id ).val( _value );
	}
	/**
	 * 값넣을때 문자인지 숫자인지 널인지 확인 후 값넣기 (jquery ID로 처리)
	 * @param _id
	 * @param _value
	 */
	textValueClass.prototype.inputValIsNotNullId = function ( _id, _value ){
		$( "#" + _id ).val( this.valuesIsNotNull(_value) );
	}
	/**
	 * 값넣을때 문자인지 숫자인지 널인지 확인 후 값넣기 (jquery CSSID로 처리)
	 * @param _id
	 * @param _value
	 */
	textValueClass.prototype.inputValIsNotNullCSS = function ( _id, _value ){
		$( "." + _id ).val( this.valuesIsNotNull(_value) );
	}
	/**
	 * 하이폰이 들어가는 경우
	 * @param _id
	 * @param _value
	 */
	textValueClass.prototype.inputTextHyphenId = function ( _id, _value ){
		console.log( _value );
		$( "#" + _id ).val( this.textHyphen( _value, 'YYYYMMDD') );
	}
	/**
	 * 값 널인지 숫자인지에 따른 문자열 처리
	 * @param _value
	 */
	textValueClass.prototype.valuesIsNotNull = function ( _value ){
		var result = "";
		var check =  this.isNumber(_value);// 숫자 문자 체크 ( 숫자면 true, 문자면 false );

		if(check == true){
			//숫자
			if(_value != null) {
				result = this.numberWithCommas(_value);//콤마처리
			}else{
				//null값 = 0
				result = 0;
			}
		}else{
			//문자
			if(_value != null) {
				result = _value;
			}else{
				//null값 = ""
				result = "";
			}
		}
		return result;
	}

	/**
	 * 숫자인지 문자인지 체크
	 * @param _value
	 */
	textValueClass.prototype.isNumber = function ( _value ){
		_value += ''; // 문자열로 변환
		_value = _value.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
		if (_value == '' || isNaN(_value)){
			return false;
		}
		return true;
	}
	/**
	 * 천단위 콤마 달아지는 정규식
	 * @param _value
	 */
	textValueClass.prototype.numberWithCommas = function ( _value ){
		_value = String(value);
		return _value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	}

	/*
	 * 최초작성자 :양준일
	 * 최초작성일 :2021.01.07
	 * 최종변경일 :2021.01.07
	 * 목적 : 값 비우기
	 * 개정이력 :2021.01.07 최초생성
	 * 기능 추가 이력
	 * 2021.01.07 최초 생성 
	*/
	textValueClass.prototype.removeVal = function ( _id ){
		$( "#" + _id ).val("");
	}
	
	/*
	 * 최초작성자 :양준일
	 * 최초작성일 :2021.01.07
	 * 최종변경일 :2021.01.07
	 * 목적 : 값 비우기
	 * 개정이력 :2021.01.07 최초생성
	 * 기능 추가 이력
	 * 2021.01.07 최초 생성 
	*/
	textValueClass.prototype.removeValues = function ( _array ){
		for( var i = 0; i < _array.length; i++ ){
			this.removeVal( _array[i] );/*아이디 값 비우기*/
		}
	}
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.02.
	 * 최종변경일 :2020.11.02.
	 * 목적 : 값가져오기
	 * 개정이력 :2020.11.02. 최초생성
	 * 기능 추가 이력
	 * 2020.11.02. 최초 생성 
	*/
	textValueClass.prototype.retriveVal = function ( _id ){
		return $( "#" + _id ).val();
	}
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.02.
	 * 최종변경일 :2020.11.02.
	 * 목적 : 아이디 받으면 그 아이디에 대한 요소 비우는 함수
	 * 개정이력 :2020.11.02. 최초생성
	 * 기능 추가 이력
	 * 2020.11.02. 최초 생성 
	*/
	textValueClass.prototype.qureyEmpty =  function ( _id ){
		$("#" + _id ).empty(); 
	}

	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.02.
	 * 최종변경일 :2020.11.02.
	 * 목적 : 배열을 받으면 받은 배열 아이디에 대한 요소 비우는 클래스
	 * 개정이력 :2020.11.02. 최초생성
	 * 기능 추가 이력
	 * 2020.11.02. 최초 생성 
	*/
	textValueClass.prototype.emptyIds = function ( _array ){
		for( var i = 0; i < _array.length; i++ ){
			this.qureyEmpty( _array[i] );/*아이디 값 비우기*/
		}
	}
	
	/*
	 * 최초작성자 :김정주
	 * 최초작성일 :2020.11.02.
	 * 최종변경일 :2020.11.02.
	 * 목적 : 문자 입력시 자동 공백 변환
	 * 개정이력 :2020.11.02. 최초생성
	 * 기능 추가 이력
	 * 2020.11.02. 최초 생성 
	*/
	textValueClass.prototype.numValidation = function (_id){
		var id = "#"+_id;/*input text의 아이디*/
		
		/*숫자 이외에 다른 문자들은 공백으로 만들어준다*/
		$(document).on("keyup", id , function() {$(this).val( $(this).val().replace(/[^0-9]/gi,"") );});
	}
	

	/*
	 * 최초작성자 :이세조
	 * 최초작성일 :2020.03.12
	 * 최종변경일 :2020.03.12
	 * 목적 : 문자 입력시 자동 공백 변환
	 * 개정이력 :2020.03.12. 최초생성
	 * 기능 추가 이력
	 * 2020.03.12. 최초 생성 
	*/
	textValueClass.prototype.doubleValidation = function (_id){
		var id = "#"+_id;/*input text의 아이디*/
		
		$(document).on("keydown", id , function(evt) {
			var charCode = (evt.which)?evt.which:evt.keyCode;
			var _value = (evt.srcElement)?evt.srcElement.value:evt.target.value;
			
			if(evt.keyCode < 48 || evt.keyCode >57){
				if(evt.keyCode >95 && evt.keyCode <106 ){
					// 오른쪽 숫자 패트
				}else if(evt.keyCode != 8 && evt.keyCode != 46 && evt.keyCode != 110 && evt.keyCode != 190){
					// 백스페이스, del , 점이 아닐때.
					return false;
				}
			}
			
			// 점 두번 입력 방지
			var _pattern = /^\d*[.]\d*$/;
			if(_pattern.test(_value)){
				if(charCode == 46  || evt.keyCode == 110 || evt.keyCode == 190){
					return false;
				}
			}
		});
	}
	
	/*
	 * 최초작성자 :김정주
	 * 최초작성일 :2020.11.02.
	 * 최종변경일 :2020.11.02.
	 * 목적 : 숫자 입력시 자동 공백 변환
	 * 개정이력 :2020.11.02. 최초생성
	 * 기능 추가 이력
	 * 2020.11.02. 최초 생성 
	*/
	textValueClass.prototype.textValidation = function (_id){
		var id = "#"+_id;/*input text의 아이디*/
		/*숫자를 입력하는 즉시 공백으로 만든다*/
		$(document).on("keyup", id , function() {$(this).val( $(this).val().replace(/[0-9]/gi,"") );});
	}
	
	/*
	 * 최초작성자 :김정주
	 * 최초작성일 :2020.11.02.
	 * 최종변경일 :2020.11.02.
	 * 목적 : 아이디 받으면 요소 숨기기
	 * 개정이력 :2020.11.02. 최초생성
	 * 기능 추가 이력
	 * 2020.11.02. 최초 생성 
	*/
	textValueClass.prototype.hide = function( _id ){
		$( "#" +_id ).hide();/*아이디에 대한 요소 숨기기*/
	}

	/*
	 * 최초작성자 :김정주
	 * 최초작성일 :2020.11.02.
	 * 최종변경일 :2020.11.02.
	 * 목적 : 배열로 받으면 배열에 대한 아이디 요소 숨기기
	 * 개정이력 :2020.11.02. 최초생성
	 * 기능 추가 이력
	 * 2020.11.02. 최초 생성 
	*/
	textValueClass.prototype.arrayHide = function( _array ){
		for( i = 0; i < _array.length; i++ ){
			this.hide( _array[i] );
		}
	}
	/*
	 * 최초작성자 :김정주
	 * 최초작성일 :2020.11.02.
	 * 최종변경일 :2020.11.02.
	 * 목적 : 아이디 받으면 요소 나타남
	 * 개정이력 :2020.11.02. 최초생성
	 * 기능 추가 이력
	 * 2020.11.02. 최초 생성 
	*/
	textValueClass.prototype.show = function( _id ){
		$( "#" + _id ).show(); /*아이디에 대한 요소 나타내기*/
	}
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.11.
	 * 최종변경일 :2020.11.11.
	 * 목적 : div에 텍스트 값넣기
	 * 개정이력 :2020.11.11. 최초생성
	 * 기능 추가 이력
	 * 2020.11.02. 최초 생성 
	*/
	textValueClass.prototype.html = function( _id, _context ){
		$(document.getElementById( _id )).html( _context );		
	}
	
	/*
	 * 최초작성자 :김정주
	 * 최초작성일 :2020.11.25.
	 * 최종변경일 :2020.11.25.
	 * 목적 : 아이디 받으면 요소 나타남
	 * 개정이력 :2020.11.25. 최초생성
	 * 기능 추가 이력
	 * 2020.11.25. 최초 생성 
	*/
	textValueClass.prototype.makeSelectBox = function ( _id , _data , _evnetFn , _dataId , _dataName){
		var id = _dataId;
		var name = _dataName
		var context = "<select id='' onChange='"+_evnetFn+"'>"; // 아이디와 이벤트 함수 어떻게 추가할지 기억할 것
		for( i = 0; i < _data.length ; i++ ){
			context +="<option value='"+_data[ i ].id+"'>"+ _data[ i ].name +"</option>";
		}
		context += "</select>";
		this.append( _id , context);
	}
	
	/*
	 * 최초작성자 :김정주
	 * 최초작성일 :2020.11.26.
	 * 최종변경일 :2020.11.26.
	 * 목적 : 특수문자 제거
	 * 개정이력 :2020.11.25. 최초생성
	 * 기능 추가 이력
	 * 2020.11.25. 최초 생성 
	*/
	textValueClass.prototype.regExp = function ( _string ){
		
		/*데이터형태 : (a,b,c),(a,b,c),(a,b,c),(a,b,c)*/
		/*특수문자 생략해주는 함수 (  ,  기호 생략*/
		var reg = /[\{\}\[\]\/?;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi ;
		//특수문자 검증
		if( reg.test( _string ) ){
			//특수문자 제거후 리턴
			return _string.replace( reg , "" );    
		} else {
			//특수문자가 없으므로 본래 문자 리턴
			return _string;
		}  
	}


	/*
	 * 최초작성자 :양준일
	 * 최초작성일 :2020.12.01.
	 * 최종변경일 :2020.12.01.
	 * 목적 : 셀렉트박스 객체id, 데이터(배열), 기본값옵션명
	 * 개정이력 :2020.12.01. 최초생성
	 * 기능 추가 이력
	 * 2020.12.01. 최초 생성 
	*/
	
	textValueClass.prototype.crSelectBoxOption = function( _id, _data, _topOption) {
		/* _id : selectBox 객체 id,
		 * _data : 옵션 생성을 위한 데이터(배열),
		 * _topOption : 상단 기본값 옵션 ex)전체, 선택 (null 입력시 기본값 옵션 생성안함)
		 * 데이터가 NAME, CODE로 만들어져있어야 실행 가능
		 */

		/*셀렉트박스 객체 호출*/
		var el = document.getElementById(_id);
		/*셀렉트 박스 클리어*/
		while(el.hasChildNodes()){
			el.removeChild(el.firstChild);
		}
		/*셀렉트박스 option 태그 생성*/
		node = document.createElement("OPTION");
		if(_topOption != null){
			/*전체 옵션 텍스트 입력*/
			node.text = _topOption;
			/*전체 옵션 value 지정*/
			node.value = "";
			/* 셀렉트 박스에 생성한 기본값 option 추가*/
			document.getElementById(_id).appendChild(node);
		}
		/*데이터(배열)길이만큼 for문으로 option 생성*/
		for(var i =0; i < _data.length; i++){
			/*OPTION 엘리먼트 생성*/
			node = document.createElement("OPTION");
			/*OPTION 텍스트 불러온 데이터 중 NAME 입력*/
			node.text = _data[i].NAME;
			/*OPTION 값 불러온 데이터 중 CODE 입력*/
			node.value = _data[i].CODE;
			/*생성한 OPTION 셀렉트박스에 추가*/
			document.getElementById(_id).appendChild(node);
		}
			
	}
	
	/*
	 * 최초작성자 :양준일
	 * 최초작성일 :2020.12.01.
	 * 최종변경일 :2020.12.01.
	 * 목적 : 텍스트 하이폰 (-) 처리  자릿수 10자리 11자리 처리
	 * 개정이력 :2020.12.02. 최초생성
	 * 기능 추가 이력
	 * 2020.12.02. 최초 생성 
	*/
	textValueClass.prototype.textHyphen = function ( _value, _option ){
		var val = "";
		switch ( _option ) {
		/*년도*/
		case "YYYYMMDD":
			if( _value.length == 8 ){
				val = this.textSubString(_value, 0,4) +"-"+  this.textSubString(_value,4,6)+"-"+  this.textSubString(_value,6,8); 
			}
			break;
		/*핸드폰, 전화번호*/
		case "PHONE":
		case "TEL" :
			/*10자리*/
			if( _value.length == 10 ){
				val = this.textSubString(_value,0,3) +"-"+  this.textSubString(_value,3,6) +"-"+ this.textSubString(_value,6,10); 
			}
			/*11자리*/
			else if ( _value.length === 11 ) {
				val = this.textSubString(_value,0,3) +"-"+  this.textSubString(_value,3,7) +"-"+ this.textSubString(_value,7,11); 
			}
			break;
		}
		return val;
	}
	
	/*
	 * 최초작성자 :양준일
	 * 최초작성일 :2020.12.01.
	 * 최종변경일 :2020.12.01.
	 * 목적 : 문자열 Substring 
	 * 개정이력 :2020.12.02. 최초생성
	 * 기능 추가 이력
	 * 2020.12.02. 최초 생성 
	*/
	textValueClass.prototype.textSubString = function ( _value , _sIndex, _eIndex ){
		return _value.substring( _sIndex, _eIndex );
	}
	
	/*
	 *  undefined 건을 공백으로 치환
	 */
	textValueClass.prototype.nullToEmpty = function(value){
		if(value == undefined){
			value = '';
		}
		
		return value;
	}
	
	
	/*최초작성자: 양준일
	 * 최초작성일: 2021.01.12
	 * 최종변경일 :2021.01.12
	 * 목적 : 숫자 자릿수마다 콤마
	 * 개정이력 :2021.01.12 최초생성
	 * 기능 추가 이력
	 * 2021.01.12 숫자 자릿수마다 콤마
	 */
	textValueClass.prototype.caculateCipher = function( _value , _kinds ){
		if( _value !=null && _value != ""){
			if(_kinds=="man_won"){
				var man_text= _value + "0000";
				var replace_text=man_text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				return replace_text;
			}else if(_kinds=="man_won2"){
				var man_text=Math.floor(_value)+"0000";
				var replace_text=man_text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				return replace_text;
			}else{
				if(String(_value).indexOf(".")!= -1){
					var text_2=String(_value).split(".");
					_value=text_2[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					_value+='.'+text_2[1];
					return _value;
				}else{
					return _value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
			}
		}else{
			return _value;
		}
	}
	
	/**
	 * 널체크
	 */
	textValueClass.prototype.valueNullCheck =  function ( _value ){
		var returnValue = "";
		if(_value == "NULL" || _value == "null"){
			returnValue = "";
		}else if(_value == undefined ){
			returnValue = "";
		}else{
			returnValue = _value;
		}
		return returnValue;
	}

	/**
	 * 콤마제거
	 * @param _value
	 * @returns {*}
	 */
	textValueClass.prototype.valueNotComma = function ( _value ){
		var number = _value.replace(/,/g, "");
		return number;
	}
	
}
OlSeesun.publics.textValue = new textValueClass();
