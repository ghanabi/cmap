/* wfs  컨트롤
 **/
function wfsControlClass (){
	/**
	 * wfs 필터 만들기
	 * @param _param
	 * @param _queryType
	 * @returns {string}
	 */
	wfsControlClass.prototype.wfsGetFilter = function ( _param, _queryType ){
		var filter = "";
		switch (_queryType){
			case "And" :
				filter += "<And>";
				filter += this.getOgcFilter(_param);
				filter += "</And>";
				break;
			default:
				filter = this.getOgcFilter(_param);
				break;
		}
		return filter;
	}
	/**
	 * ogcFiler 만들기
	 * @param _param 필터
	 */
	wfsControlClass.prototype.getOgcFilter = function ( _param ){
		var filter = "";

		for(var i =0; i < _param.length; i++){
			switch ( _param[i].columnQueryType ) {
				case "EqualTo":
					filter += "<PropertyIsEqualTo>";
					filter += 	"<PropertyName>"+ _param[i].tableColumn +"</PropertyName>";
					filter += 	"<Literal>"+ _param[i].tableValue +"</Literal>";
					filter += "</PropertyIsEqualTo>";
					break;
				case "Like":
					filter += '<PropertyIsLike wildCard="%" singleChar="#" escapeChar="!">';
					filter += 	"<PropertyName>"+ _param[i].tableColumn +"</PropertyName>";
					filter += 	"<Literal>"+ _param[i].tableValue +"%</Literal>";
					filter += "</PropertyIsLike>";
					break;
			}
		}
		return filter;
	}
	
	
	
	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.02.
	 * 최종변경일 :2020.11.02.
	 * 목적 : wfs 파라미터 만들기
	 * 개정이력 :2020.11.02 최초생성
	 * 기능 추가 이력
	 * 2020.11.02 최초 생성
	*/
	wfsControlClass.prototype.wfsGetUrlParam = function ( _mapViews, _param, _proj, _callBackFunction ){
		var getParamInit = this.getParam( _param, _proj );
		/*파라미터*/
		var param = "TYPENAME="+ getParamInit.tableName +"&VERSION=1.0.0&SERVICE=WFS&REQUEST=GetFeature&FILTER=";
		/*필터*/
		var filter = this.wfsGetFilter( getParamInit.parameter , getParamInit.queryType);
		/*파라미터 만들기 */
		var setParam = OlSeesun.publics.ajax.retriveGetWfsParam( getParamInit.engineUrl + param, filter );

		/*데이터 조회*/
		OlSeesun.publics.ajax.retriveGetWfs( setParam, this.successWfsData, _callBackFunction, _mapViews);
	}


	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.02.
	 * 최종변경일 :2020.11.02.
	 * 목적 : wfs 파라미터 먼들기
	 * 개정이력 :2020.11.02 최초생성
	 * 기능 추가 이력
	 * 2020.11.02 최초 생성
	*/
	wfsControlClass.prototype.getParam = function ( _param, _proj ){
		var proj = "";
		/*좌표계 설정*/
		if( _proj !== null){
			proj = _proj;
		}else{
			proj = this.PROJ;
		}
		/*파라미터 값 만들기*/
		var tempValue = {
			engineUrl : _param.engineUrl,
			tableName : _param.tableName,
			queryType : _param.queryType,
			proj : proj,
			parameter : []
		}
		/*파라미터 만들기 반복문*/
		for( var i= 0; i < _param.parameter.length; i++){
			tempValue.parameter.push(_param.parameter[i]);
		}
		/*값넘기기*/
		return tempValue;
	}

	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.02.
	 * 최종변경일 :2020.11.02.
	 * 목적 : wfs 데이터 처리
	 * 개정이력 :2020.11.02 최초생성
	 * 기능 추가 이력
	 * 2020.11.02 최초 생성
	*/
	wfsControlClass.prototype.successWfsData = function ( _data, _callBackFunction, _mapViews  ){
		var gmlParser = new ol.format.GML2();
		gmlParser.extractAttributes = true;
		var features = gmlParser.readFeatures(_data);
		if(features.length > 0){
			_callBackFunction( _mapViews, features );
		}else{
			/*로딩바 필요시 헤지*/
			//OlSeesun.publics.LoadingBar.endProgress();
		}
	}


	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.06.
	 * 최종변경일 :2020.11.06.
	 * 목적 : wfs 포트 방식 만들기
	 * 개정이력 :2020.11.06 최초생성
	 * 기능 추가 이력
	 * 2020.11.06 최초 생성
	*/
	wfsControlClass.prototype.wfsPost = function ( _mapViews, _datas, _option,_callBackFunction ){
		/* 파라미터 구해오기 */
		var filter = this.wfsFilter( _mapViews, _datas, _option );
		/* ajax 파라미터 구하기 */
		var url  = geoServer_poxy_url + wfs_FDMS_BML_UTMK_EngineUrl;
		var params =  OlSeesun.publics.ajax.retriveGetWfsParam( url , filter );

		/* ajax 엔진 wfs 구해오기 */
		OlSeesun.publics.ajax.retrivePostWfsUrl( params,  this.successWfsData, _callBackFunction, _mapViews );
	}


	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.06.
	 * 최종변경일 :2020.11.06.
	 * 목적 : wfs 목록에따른 필터 구하기
	 * 개정이력 :2020.11.06 최초생성
	 * 기능 추가 이력
	 * 2020.11.06 최초 생성
	*/
	wfsControlClass.prototype.wfsFilter = function ( _mapViews, _data, _option ){
		var filter = ""; /*결과값 저장 하는 공간*/
		switch ( _option ) {
			case "retrive": /*조회를 하는경우 사용*/
				filter = this.retriveWfsPostFilter( _mapViews , _data );
				break;
		}
		/*리턴 값*/
		return filter;
	}

	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.06.
	 * 최종변경일 :2020.11.06.
	 * 목적 : wfs 조회 필터 구하기 ( INTERSECTS )
	 * 개정이력 :2020.11.06 최초생성
	 * 기능 추가 이력
	 * 2020.11.06 최초 생성
	*/
	wfsControlClass.prototype.retriveWfsPostFilter = function (  _mapViews, _data ){
		/*조회할수 있는 쵝대 갯수 구해오기*/
		if( _data.maxFeatures !== null && _data.maxFeatures !== undefined){
			maxFeature = _data.maxFeatures;
		}
		/*테이블 조회 만들기 */
		var typeName = dataHouse +":"+ layerNm;

		var filter = "";
		filter += '<?xml version="1.0" encoding="UTF-8"?>';
		filter += '<wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" maxFeatures="' + maxFeature ;
		filter += '" xmlns:wfs="http://www.opengis.net/wfs"';
		filter += ' xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"';
		filter += ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
		filter += ' xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd">';
		/*필터값 만들기 */
		filter += this.retriveFilter( _mapViews, _data );
		filter +='</wfs:GetFeature>';
		return filter;
	}


	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.06.
	 * 최종변경일 :2020.11.06.
	 * 목적 : wfs POST 필터 만들기 ( INTERSECTS )
	 * 개정이력 :2020.11.06 최초생성
	 * 기능 추가 이력
	 * 2020.11.06 최초 생성
	*/
	wfsControlClass.prototype.retriveFilter = function ( _mapViews,  _data ){
		/* 파라미터를 저장시킬 Obj 만들기 */
		var params = {
			nameSpace : "",
			type : OpenLayers.Filter.Spatial.INTERSECTS,
			tables : [],
			distance : 1000,
			values : []
		};
		//대상 객체의 소스 객체의 모든 속성을 복사 하는 함수 실행
		this.extendParams( params , _data );

		//필터를 정의할 변수 선언
		var filterStr = '';
		/* 정의한 params의 테이블의 수만큼 반복문 돌림
		 * 여기서 params의 테이블은 정의한 레이어의 이름
		 * */
		for(var i = 0, len = params.tables.length; i< len; i ++ ){
			for(var j = 0; j< params.values.length; j ++ ){

				if(dataHouse != null){
					/* wfs 필터 생성*/
					filterStr += '<wfs:Query typeName="' + dataHouse + ':' + params.tables[i] + '"  srsName="'+engineProjNm+'">';
				}else{
					/* wfs 필터 생성*/
					filterStr += '<wfs:Query typeName="' + params.nameSpace + ':' + params.tables[i] + '" srsName="'+engineProjNm+'">';
				}
				//alert(params.type + "," + params.values[0] + "," + params.distance);

				/* 클래스의 공간 필터를 나타냄
				 * type : 공간필터의 문자열 입력 이중 하나여야 한다.
				 *        OpenLayers.Filter.Spatial.BBOX
						  OpenLayers.Filter.Spatial.INTERSECTS
			              OpenLayers.Filter.Spatial.DWITHIN
				 * property : 컨텍스트 속성의 이름 비교??
				 * value : {OpenLayers.Bounds || OpenLayers.Geometry}  범위 또는  geometry 필터사용.
				 * distance :{Number}거리는 Dwithin 공간 필터에 사용???.
				 * distanceUnits : {String} 단위 및 거리 지정.
				 */
				var filter = new OpenLayers.Filter.Spatial({
					type : params.type,
					property : geoType,
					value : params.values[j]//[0]
				});
				/*filert로 변환시킨 내용을 filterAsxml으로 저장
				 * filert 화시킨 내용은 object 형으로 저장되어 있다.
				 * 콘솔로그로 찍었을경우 object 형으로 되어있는것을 확인 할수 있는제 엔진으로 넘어가게 되는경우 정상적으로 처리된다.
				 * */
				var filterVesion = new OpenLayers.Format.Filter({version : "1.0.0"});

				var filterAsXml = filterVesion.write(filter);
				/*openlayers xml  포멧 만들기 위해서 정의*/
				var xml = new OpenLayers.Format.XML();
				/*xml 포멧 만들기 */
				var filterAsString =  xml.write(filterAsXml);
				/* 필터 최종 정리 */
				filterStr += filterAsString;

				filterStr += '</wfs:Query>';
			}
			/* 여기까지 wfs Query 만들기! */
		}
		return filterStr;
	}

	/*파라미터 만들기*/
	wfsControlClass.prototype.extendParams = function ( _params, _parameters ){
		/* 대상 객체의 소스 객체의 모든 속성을 복사
		 * OpenLayers.Util.extend(대상, 출처);
		 */
		OpenLayers.Util.extend(_params, _parameters);

		/* instanceof는 비교 연산자료  > , < , = 와 같이 두개의 인자를 받은 연산자로 앞의 비교 연산자를 이용 하여 사용한다.
		 *  instanceof는 prototpe의 chain 을 두번째 인자와 쭉비교 해서 true/false값을 리턴한다.
		 *  정의된 형식이 같은 형식일경우 true 아닌경우 false 반환
		 *  다음 정의된 if문은 비교 대상자의 값이 false 경우 params에 각각 대입 하는 부분이다.
		 *  */
		if( _parameters.tables && !( _parameters.tables instanceof Array )){
			_params.tables = [ _parameters.tables ];
		}
		if( _parameters.fields && !(_parameters.fields instanceof Array ) ){
			_params.fields = [ _parameters.fields ];
		}
		if( _parameters.values && !(_parameters.values instanceof Array) ){
			_params.values = [ _parameters.values ];
		}
	}

	/*파라미터 만들기*/
	wfsControlClass.prototype.retriveAnalysis = function ( _mapView,  _geometry, _callBackFunction ){
		var datas = {
			nameSpace : dataHouse, /*데이터 하우스 명*/
			tables:  layerNm,  /*조회할 테이블 명*/
			values : [ _geometry ] /*지오메트리*/
		}
		OlSeesun.ol.control.wfs.wfsPost( _mapView, datas , "retrive" , _callBackFunction);
	}


	/*
	 * 최초작성자 :백승재
	 * 최초작성일 :2020.11.02.
	 * 최종변경일 :2020.11.02.
	 * 목적 : wfs 데이터 처리
	 * 개정이력 :2020.11.02 최초생성
	 * 기능 추가 이력
	 * 2020.11.02 최초 생성
	*/
	wfsControlClass.prototype.successWfsDt = function ( _data, _callBackFunction, _mapViews  ){
		/*XML파싱용*/
		var parser = new DOMParser();
		/*데이터 포멧 파싱*/
		var res =parser.parseFromString(_data,"text/xml");
		// 특정 테그를 기준으로 변수에 담는다
		//var xml = res.getElementsByTagName('rss');
		var arr =[];
		var success = true;
		/*브라우저 확인을 위한 바디 스타일 확인*/
		var bStyle = document.body.style;
		/*xml FeatureCollection 저장 변수*/
		var featureCollection;
		/*브라우저 판단을 위한 변수*/
		var agent = navigator.userAgent.toLowerCase();
		/*크롬이 아닌경우*/

		if(agent.indexOf("chrome") != -1){
			//크롬인 경우 xml 파싱
			featureCollection = res.getElementsByTagName("wfs:FeatureCollection");

		}
		/*그외버전 확인*/
		else if( !('msTransition' in bStyle) && !('transition' in bStyle )){
			var xmlString = res.xml;
			/*9버전인경우  xmlString null 값 출력됩.*/
			if(xmlString != null){
				if (window.DOMParser)
				{
					var parser=new DOMParser();
					xmlDoc=parser.parseFromString(xmlString ,"text/xml");

				}else // Internet Explorer 인경우
				{
					xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.async=false;
					xmlDoc.loadXML(xmlString);
				}
				featureCollection = xmlDoc.getElementsByTagName("wfs:FeatureCollection");
			}else{

				/*크롬 같은 경우 인지 확인*/
				featureCollection = res.getElementsByTagName("wfs:FeatureCollection");
			}
		}else{
			/*그외버전 확인*/
			featureCollection = res.getElementsByTagName("wfs:FeatureCollection");
		}
		//첫번째 노드 를 찾는다.
		//var featureCollection = res.getElementsByTagName("wfs:FeatureCollection");
		if(featureCollection && featureCollection[0]){
			//속성값중 결과 값이 0 이 아닌 경우 실행
			if(featureCollection[0].getAttribute("numberOfFeatures") != 0 ){
				//featureCollection에 노드가 있는경우 그안의 속성 gml:featureMember노드를 변수에 저장
				var featureMembers = null;
				featureMembers = featureCollection[0].getElementsByTagName("gml:featureMember");
				/*featureMembers의 길이 많큼 for 문을 돌린다. 돌려서 값을 저장하는 역활을 한다.*/
				for(var i = 0, len = featureMembers.length; i< len ; i++){
					// featureMembers[i] 번째의 자식노드중 if가 있으면 . 을 기준으로 자른다.
					var tmpArr = featureMembers[i].firstChild.getAttribute("fid").split(".");
					//같은 테이블인지 체크후 데이블 아래로 여러 레코드들이 들어가게 함?
					var tempTable =  tmpArr[0];
					var index = null;
					/*  같은 테이블인경우 indext 값을 늘린다.
						for in 문은 소스 코드를 입력한 배열 혹은 객체의 속성에 맞게 반복하여 실행하는 역활을 합니다.
					*/
					for(var j in arr){
						if(arr[j].table == tempTable){
							index = j;
							break;
						}
					}

					//index가 null 이 아닌경우
					if(!index) {
						var obj = {
							talbe: tempTable, // 테이블 명
							results : []   // 레코드 들
						};
						// arr에 obj 값을 넣는다.
						arr.push(obj);
					}else{
						// obj 에 arr[index]의 값을 넣는다
						obj = arr[index];
					}

					//한개의 레코드 에 입력 되는 값들 정의
					var result ={
						g2id : tmpArr[1], //G2_ID (pk값)
						feature: null,  // 도형
						tlte: tmpArr[1], // 제목
						fields : {}      // 필드들
					};

					/*featureMembers[i].firstChild.firstChild 노드 안에 값을 filed에 정의
					 * 두번째 자식노드에 접근
					 * */
					var field = featureMembers[i].firstChild.firstChild;
					//alert(field);
					//filed 숫자 많큼 반복문 돌림
					while(field){
						// 도형 의 값을 저장
						//첫번째 노드 값이  g2_sptial 일경우 사용 하게 됨
						if(field.tagName.replace(field.prefix + ":" , "").toLowerCase() ==  "g2_spatial"){
//							result["feature"] = CesiumSeesun.Engine.GML.parseFeature(field);
							result["feature"] = gml.parseFeature(field);
						}
						field = field.nextSibling;
					}
					obj.results.push(result);
				}
			}
		}else{
			success = false;
		}
		_callBackFunction( _mapViews, arr );
	}


}

OlSeesun.ol.control.wfs =  new wfsControlClass();
