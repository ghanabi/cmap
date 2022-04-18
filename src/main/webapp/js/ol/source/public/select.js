/*
 * 최초작성자 :백승재
 * 최초작성일 :2020.12.01.
 * 최종변경일 :2020.12.01.
 * 목적 : select box 컨트롤   
 * 개정이력 :2020.12.01 최초생성
 * 2020.12.01 최초생성
*/
function selectClass(){
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.12.01.
	 * 최종변경일 :2020.12.01.
	 * 목적 : select 옵션 데이터 체우기  
	 * 개정이력 :2020.12.01 최초생성
	 * 2020.12.01 최초생성
	*/
	selectClass.prototype.initSelect = function ( _divId, _data ){
		var conDiv = "";
		conDiv += "<option value='none'>전체</option>";

		if(_data != undefined){
			$( _data ).each(function(index, item) {
				if(_divId=="doro_sig"||_divId=="jibun_sig"){
					if(item.NAME!="창원시 전체"){
						conDiv += "<option value='"+item.CODE+"'>"+item.NAME+"</option>";
					}
				}else{
					if(item.CODE == "DI01"){	//대민일경우 행정재산 표출 금지 추가
						if($('#out_line_daemin').val() != "Y"){
							conDiv += "<option value='"+item.CODE+"'>"+item.NAME+"</option>";
						}
					}else{	//기존 처리
						conDiv += "<option value='"+item.CODE+"'>"+item.NAME+"</option>";
					}	
				}
			});
		}
		$(document.getElementById( _divId )).html(conDiv);
	}

	/*
	 * 최초작성자 :이세조
	 * 최초작성일 :2021.03.13.
	 * 최종변경일 :2021.03.13.
	 * 목적 : select 옵션 데이터 체우기  
	 * 개정이력 :2021.03.13 최초생성
	 * 2021.03.13 최초생성
	*/
	selectClass.prototype.initSelectUseEditCtrl = function ( _divId, _data ){
		var conDiv = "";
		conDiv += "<option value=''>선택</option>";

		if(_data != undefined){
			$( _data ).each(function(index, item) {
				conDiv += "<option value='"+item.CODE+"'>"+item.NAME+"</option>";
			});
		}
		$(document.getElementById( _divId )).html(conDiv);
	}
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.12.01.
	 * 최종변경일 :2020.12.01.
	 * 목적 : select 옵션 데이터 체우기  
	 * 개정이력 :2020.12.01 최초생성
	 * 2020.12.01 최초생성
	*/
	selectClass.prototype.initSelectTypeOnTotal = function ( _divId, _data ){
		var conDiv = "";
		conDiv += "<option value=''>선택</option>";
		if(_data != undefined){
			$( _data ).each(function(index, item) {
				conDiv += "<option value='"+item.code+"'>"+item.name+"</option>";
			});
		}
		$(document.getElementById( _divId )).html(conDiv);
	}

	
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.12.01.
	 * 최종변경일 :2020.12.01.
	 * 목적 : selectBox 값 가져오기  
	 * 개정이력 :2020.12.01 최초생성
	 * 2020.12.01 최초생성
	*/
	selectClass.prototype.retriveValue = function ( _divId ){
		return $("#" + _divId + " option:selected").val();
	}
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2021.01.07.
	 * 최종변경일 :2021.01.07.
	 * 목적 : selectBox 텍스트 가져오기  
	 * 개정이력 :2021.01.07. 최초생성
	 * 2021.01.07. 최초생성
	*/
	selectClass.prototype.retriveText = function ( _divId ){
		return $("#" + _divId + " option:selected").text();
	}
	
	/*
	 * 최초작성자 :양준일
	 * 최초작성일 :2021.01.14.
	 * 최종변경일 :2021.01.14.
	 * 목적 : selectBox 지정한 값으로 셀렉트하기 (예시. 초기화시 selectValue(id, 'none'))
	 * 개정이력 :2021.01.14. 최초생성
	 * 2021.01.14. 최초생성
	*/
	selectClass.prototype.selectValue = function ( _divId, _valueText ){
		$('#' + _divId ).val(_valueText).prop('selected',true);
	}
	
	/*
	 * 최초작성자 :양준일
	 * 최초작성일 :2020.12.21.
	 * 최종변경일 :2020.12.21.
	 * 목적 : PNU에서 시 가져오기    (리턴 컬럼: CODE, NAME)
	 * 개정이력 :2020.12.21 최초생성
	 * 2020.12.01 최초생성
	*/
	selectClass.prototype.selectSIGValue = function ( _callbackFunction ){
		/*파라미터로 생성*/
		var paramObj = {};
		/*Ajax로 DB 조회를 위한 파라미터 생성*/
		paramObj = OlSeesun.publics.ajax.paramAjaxObject("common.selectSIG", paramObj);
		/*Ajax로 DB 조회*/
		OlSeesun.publics.ajax.retriveAjaxObjectParam(paramObj, _callbackFunction, mapView);
	}
	
	/*
	 * 최초작성자 :양준일
	 * 최초작성일 :2020.12.21.
	 * 최종변경일 :2020.12.21.
	 * 목적 : PNU에서 시 조건으로 동 가져오기  (리턴 컬럼: CODE, NAME)
	 * 개정이력 :2020.12.21 최초생성
	 * 2020.12.01 최초생성
	*/
	selectClass.prototype.selectEMDValue = function ( _sig, _callbackFunction ) {
		/*재산구분 그룹코드 파라미터로 생성*/
		var paramObj = { sigCd : _sig };
		/*Ajax로 DB 조회를 위한 파라미터 생성*/
		paramObj = OlSeesun.publics.ajax.paramAjaxObject("common.selectEMD", paramObj);
		/*Ajax로 DB 조회*/
		OlSeesun.publics.ajax.retriveAjaxObjectParam(paramObj, _callbackFunction, mapView);
	}
	
	/*
	 * 최초작성자 :양준일
	 * 최초작성일 :2020.12.21.
	 * 최종변경일 :2020.12.21.
	 * 목적 : 코드 테이블에서 그룹코드로 코드 호출  (리턴 컬럼: CODE, NAME)
	 * 개정이력 :2020.12.21 최초생성
	 * 2020.12.01 최초생성
	*/
	selectClass.prototype.selectCodeValue = function ( _groupCode, _callbackFunction ) {
		/*재산구분 그룹코드 파라미터로 생성*/
		var paramObj = { groupCd : _groupCode };
		/*Ajax로 DB 조회를 위한 파라미터 생성*/
		paramObj = OlSeesun.publics.ajax.paramAjaxObject("common.selectCodeCt", paramObj);
		/*Ajax로 DB 조회*/
		OlSeesun.publics.ajax.retriveAjaxObjectParam(paramObj, _callbackFunction, mapView);
	}

	/*
	 * 최초작성자 :최귀리
	 * 최초작성일 :2021.03.08.
	 * 최종변경일 :2021.03.08.
	 * 목적 : 지역 선택 시 검색 건수가 1건 이상인 공유재산 셀렉트박스 조회
	 * 개정이력 :2021.03.08 최초생성
	 * 기능 추가 이력
	 * 2021.03.08 최초생성 
	*/
	selectClass.prototype.selectUseCodeValue = function ( _groupCode,_param, _callbackFunction ) {
		/*재산구분 그룹코드 파라미터로 생성*/
		var paramObj = jQuery.extend( { groupCd : _groupCode } , _param);
		/*Ajax로 DB 조회를 위한 파라미터 생성*/
		paramObj = OlSeesun.publics.ajax.paramAjaxObject('common.selectCodeSSP002' , paramObj);
		/*Ajax로 DB 조회*/
		OlSeesun.publics.ajax.retriveAjaxObjectParam(paramObj, _callbackFunction, mapView);
	}
	/*
	 * 최초작성자 :최귀리
	 * 최초작성일 :2021.03.08.
	 * 최종변경일 :2021.03.08.
	 * 목적 : 지역 선택 시 검색 건수가 1건 이상인 병원 셀렉트박스 조회
	 * 개정이력 :2021.03.08 최초생성
	 * 기능 추가 이력
	 * 2021.03.08 최초생성 
	*/
	selectClass.prototype.selectUseHospital = function (sql_id, _param, _callbackFunction ) {
		/*Ajax로 DB 조회를 위한 파라미터 생성*/
		var paramObj = OlSeesun.publics.ajax.paramAjaxObject(sql_id , _param);
		/*Ajax로 DB 조회*/
		OlSeesun.publics.ajax.retriveAjaxObjectParam(paramObj, _callbackFunction, mapView);
	}
	
	/*
	 * 최초작성자 :최대영
	 * 최초작성일 :2021.04.20.
	 * 최종변경일 :2021.04.20.
	 * 목적 : 행정동 가져오기  (리턴 컬럼: CODE, NAME)
	 * 개정이력 :2021.04.20 최초생성
	 * 2021.04.20 최초생성
	*/
	selectClass.prototype.selectHJDValue = function ( _sig, _callbackFunction ) {
		/*재산구분 그룹코드 파라미터로 생성*/
		var paramObj = { sigCd : _sig };
		/*Ajax로 DB 조회를 위한 파라미터 생성*/
		paramObj = OlSeesun.publics.ajax.paramAjaxObject("common.selectHJD", paramObj);
		/*Ajax로 DB 조회*/
		OlSeesun.publics.ajax.retriveAjaxObjectParam(paramObj, _callbackFunction, mapView);
	}
}
OlSeesun.publics.select = new selectClass();
