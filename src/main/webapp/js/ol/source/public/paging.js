/*
 * 최초작성자 :백승재
 * 최초작성일 :2020.10.19.
 * 최종변경일 :2020.10.19.
 * 목적 :페이징 함수 
 * 개정이력 :2020.10.19 최초생성
 * 기능 추가 이력
 * 2020.10.19 최초생성 
*/
function pagingClass(){
	
	this._PAGEUNIT = 10; /*유닛당 페이지 겟수*/
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.10.19.
	 * 최종변경일 :2020.10.19.
	 * 목적 : 페이징 세팅 
	 * 개정이력 :2020.10.19 최초생성
	 * 기능 추가 이력
	 * 2020.10.19 최초생성 
	*/	
	/* id : 페이징아이디 
	 * fnc_nm : 페이징fnc이름, 
	 * divnm : 페이징div아이디, 
	 * fnc : 페이징fnc, 
	 * chk_fnc_name : 페이징체크fnc이름. div id 값 추가
	 * _pageunit : 페이지당 유닛 설정
	 * _mapViews : mpa 이동 함수 
	 * _jsonDate :  파라미터 데이터
	 * _callBackFunction : 콜백 함수
	*/
	pagingClass.prototype.initPaging = function ( _id ,  _divNm, _pageunit , _jsonDate, _callBackFunction, _mapViews ){
		/* 페이지 유닛 설정 */
		if( _pageunit != null){
			OlSeesun.publics.paging._PAGEUNIT = _pageunit;
		}
		/*페이징 설정*/
		paging_tool.setPaging( _id , "retrivePagingDate" , _divNm, OlSeesun.publics.paging.retrivePagingDate , _mapViews, _jsonDate, _callBackFunction, _mapViews);
		/*페이지당 유닛 설정*/
		paging_tool.getPaging( _id ).pageunit_ = OlSeesun.publics.paging._PAGEUNIT; //페이지당 유닛\
		
		OlSeesun.publics.paging.retrivePagingDate(0, _id, _jsonDate, _callBackFunction, _mapViews);
	}
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.10.19.
	 * 최종변경일 :2020.10.19.
	 * 목적 : 페이징 데이터 조회  
	 * 개정이력 :2020.10.19 최초생성
	 * 기능 추가 이력
	 * 2020.10.19 최초생성 
	*/	
	pagingClass.prototype.retrivePagingDate = function (_pageindex, _id, _jsonDate, _callBackFunction, _mapViews){
		/*페이지 번호 세팅*/
		if(_pageindex == 0){
			paging_tool.getPaging( _id ).page_stat = 1;
		}
		/*페이지 인덱스 및 체이지 유닛 설정*/
		paging_tool.getPaging( _id ).search_pageindex = _pageindex;
		paging_tool.getPaging( _id ).pageunit_ = OlSeesun.publics.paging._PAGEUNIT;
		
		/*데이터값 교체*/
		_jsonDate.pageIndex = paging_tool.getPaging( _id ).search_pageindex;
		_jsonDate.pageunit = paging_tool.getPaging( _id ).pageunit_;
		/*검색*/
		OlSeesun.publics.ajax.retrivePagingAjaxObjectParam( _id, _jsonDate, OlSeesun.publics.paging.successPagingDate, _callBackFunction, _mapViews );
	}
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.10.19.
	 * 최종변경일 :2020.10.19.
	 * 목적 : 페이징 데이터 처리 
	 * 개정이력 :2020.10.19 최초생성
	 * 기능 추가 이력
	 * 2020.10.19 최초생성 
	*/
	pagingClass.prototype.successPagingDate = function ( _id, _data , _callBackViewFunction , _mapViews ){
		
		if( _data.cnt.length > 0  && _id != ""){
			paging_tool.getPaging( _id ).total_cnt = _data.cnt;
		}
		if( _id != ""){
			/*page에 토탈 함수 넣기*/
			paging_tool.getPaging( _id ).PageTool();	
		}
		/*콜백 함수 */
		_callBackViewFunction( _data, _mapViews );
	}
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.10.19.
	 * 최종변경일 :2020.10.19.
	 * 목적 : 페이징 세팅 
	 * 개정이력 :2020.10.19 최초생성
	 * 기능 추가 이력
	 * 2020.10.19 최초생성 
	*/	
	/* id : 페이징아이디 
	 * divnm : 페이징div아이디, 
	 * chk_fnc_name : 페이징체크fnc이름. div id 값 추가
	 * _pageunit : 페이지당 유닛 설정
	 * _mapViews : mpa 이동 함수 
	 * _jsonDate :  파라미터 데이터
	 * _callBackFunction : 콜백 함수
	*/
	pagingClass.prototype.initUrlPaging = function ( _id ,  _divNm, _pageunit , _jsonDate, _callBackFunction, _mapViews ){
		/* 페이지 유닛 설정 */
		if( _pageunit != null){
			OlSeesun.publics.paging._PAGEUNIT = _pageunit;
		}
			paging_tool.setPaging( _id , "retriveUrlPagingDate" , _divNm,  this.retriveUrlPagingDate , _mapViews, _jsonDate, _callBackFunction, _mapViews);	
			/*페이지당 유닛 설정*/
			paging_tool.getPaging( _id ).pageunit_ = OlSeesun.publics.paging._PAGEUNIT; //페이지당 유닛\
			OlSeesun.publics.paging.retriveUrlPagingDate(0, _id, _jsonDate, _callBackFunction, _mapViews);
	}
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.10.19.
	 * 최종변경일 :2020.10.19.
	 * 목적 : 페이징 세팅 (브이월드)
	 * 개정이력 :2020.10.19 최초생성
	 * 기능 추가 이력
	 * 2020.10.19 최초생성 
	*/	
	/* id : 페이징아이디 
	 * divnm : 페이징div아이디, 
	 * chk_fnc_name : 페이징체크fnc이름. div id 값 추가
	 * _pageunit : 페이지당 유닛 설정
	 * _mapViews : mpa 이동 함수 
	 * _jsonDate :  파라미터 데이터
	 * _callBackFunction : 콜백 함수
	*/
	pagingClass.prototype.initUrlPaging_vWorld = function ( _id ,  _divNm, _pageunit , _jsonDate, _callBackFunction, _mapViews ){
		/* 페이지 유닛 설정 */
		if( _pageunit != null){
			OlSeesun.publics.paging._PAGEUNIT = _pageunit;
		}
		
			paging_tool.setPaging( _id , "retriveUrlPagingDate_vWorld" , _divNm,  this.retriveUrlPagingDate_vWorld , _mapViews, _jsonDate, _callBackFunction, _mapViews);
			/*페이지당 유닛 설정*/
			paging_tool.getPaging( _id ).pageunit_ = OlSeesun.publics.paging._PAGEUNIT; //페이지당 유닛\
			OlSeesun.publics.paging.retriveUrlPagingDate_vWorld(0, _id, _jsonDate, _callBackFunction, _mapViews);
	}
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.10.19.
	 * 최종변경일 :2020.10.19.
	 * 목적 : 페이징 데이터 조회  
	 * 개정이력 :2020.10.19 최초생성
	 * 기능 추가 이력
	 * 2020.10.19 최초생성 
	*/	
	pagingClass.prototype.retriveUrlPagingDate = function (_pageindex, _id, _jsonDate, _callBackFunction, _mapViews){
		/*페이지 번호 세팅*/
		if(_pageindex == 0){
			paging_tool.getPaging( _id ).page_stat = 1;
			_pageindex=1;
		}
		/*페이지 인덱스 및 체이지 유닛 설정*/
		paging_tool.getPaging( _id ).search_pageindex = _pageindex;
		paging_tool.getPaging( _id ).pageunit_ = OlSeesun.publics.paging._PAGEUNIT;
		
		/*페이징 데이터 조회*/
		_jsonDate += "&pageIndex=" + _pageindex + "&pageunit=" + OlSeesun.publics.paging._PAGEUNIT;
		/*검색*/
		OlSeesun.publics.ajax.retriveUrlAjaxDate( _id, _jsonDate, OlSeesun.publics.paging.successUrlPagingDate, _callBackFunction, _mapViews );
	}
	
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.10.19.
	 * 최종변경일 :2020.10.19.
	 * 목적 : 페이징 데이터 처리 (데이터 조회)
	 * 개정이력 :2020.10.19 최초생성
	 * 기능 추가 이력
	 * 2020.10.19 최초생성 
	*/
	pagingClass.prototype.successUrlPagingDate = function ( _id, _data , _callBackViewFunction , _mapViews ){
		var cnt = ($("#" + _id + "Cnt").text() * 1);
		/*페이징 토탈 갯수 가제와서 넣기*/
		paging_tool.getPaging( _id ).total_cnt = cnt;
		/*page에 토탈 함수 넣기*/
		paging_tool.getPaging( _id ).PageTool();
		/*콜백 함수 */
		_callBackViewFunction( _data, _mapViews );
	}
	
	/*
	 * 최초작성자 :김정주
	 * 최초작성일 :2020.10.19.
	 * 최종변경일 :2020.10.19.
	 * 목적 : 페이징 데이터 조회  브이월드
	 * 개정이력 :2020.10.19 최초생성
	 * 기능 추가 이력
	 * 2020.10.19 최초생성 
	*/	
	pagingClass.prototype.retriveUrlPagingDate_vWorld = function (_pageindex, _id, _jsonDate, _callBackFunction, _mapViews){
		/*페이지 번호 세팅*/
		if(_pageindex == 0){
			paging_tool.getPaging( _id ).page_stat = 1;
			_pageindex=1;
		}
		/*페이지 인덱스 및 체이지 유닛 설정*/
		paging_tool.getPaging( _id ).search_pageindex = _pageindex;
		paging_tool.getPaging( _id ).pageunit_ = OlSeesun.publics.paging._PAGEUNIT;
		
		/*페이징 데이터 조회*/
		_jsonDate += "&pageIndex=" + _pageindex + "&pageUnit=" + OlSeesun.publics.paging._PAGEUNIT;
		
		/*검색*/
		OlSeesun.publics.ajax.retriveUrlAjaxDate( _id, _jsonDate, OlSeesun.publics.paging.successUrlPagingDate_vWorld, _callBackFunction, _mapViews );
	}
	
	/*
	 * 최초작성자 :김정주
	 * 최초작성일 :2020.10.19.
	 * 최종변경일 :2020.10.19.
	 * 목적 : 페이징 데이터 처리 (데이터 조회) 브이월드
	 * 개정이력 :2020.10.19 최초생성
	 * 기능 추가 이력
	 * 2020.10.19 최초생성 
	*/
	pagingClass.prototype.successUrlPagingDate_vWorld = function ( _id, _data , _callBackViewFunction , _mapViews ){
		var temp = JSON.parse(_data);
		var total = temp.paginationInfo.totalRecordCount;
//		var cnt = ($("#" + _id + "Cnt").text() * 1);
		/*페이징 토탈 갯수 가제와서 넣기*/
		paging_tool.getPaging( _id ).total_cnt = total;
		/*page에 토탈 함수 넣기*/
		paging_tool.getPaging( _id ).PageTool();
		/*콜백 함수 */
		_callBackViewFunction( _data, _mapViews );
	}
	
}

OlSeesun.publics.paging = new pagingClass();
