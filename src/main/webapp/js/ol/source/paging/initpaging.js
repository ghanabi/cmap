/*
 * 2015 최초 조완제
 * paging_tool 1.0
 * 2018.11.2 수정 배예은  - 총갯수가 0 일때 초기화가 안되는점(이전결과남음) 수정
*/ 

/*  샘플 사용법 및 선언
 paging_tool.setPaging("Vworld","Vworld_search","page_search",Vworld_search); //브이월드 검색 페이징
 paging_tool.getPaging("Vworld").search_pageindex =1; //현재페이지
 paging_tool.getPaging("Vworld").page_len = 1; //페이지 갯수
 paging_tool.getPaging("Vworld").page_gap = 10; //한번에 나오는 페이지 갯수
 paging_tool.getPaging("Vworld").pageunit_ = 10; //페이지당 유닛
 paging_tool.getPaging("Vworld").page_stat = 1;//페이지스탯  
 */

paging_tool = {	        
	arr_paging : [],
	getPaging:function(id){
		var obj_paging;
		for(var i=0;i<this.arr_paging.length;i++)
		{
			if(this.arr_paging[i].p_id == id){
				obj_paging = this.arr_paging[i];
			}
		}
		return obj_paging;
	},		
	//setPaging:function(id,fnc_nm,divnm,fnc,chk_fnc_name){
	setPaging:function(id,fnc_nm,divnm,fnc, menu_id , jsonDate, callBackFunction, mapViews){
		//id : 페이징아이디, fnc_nm : 페이징fnc이름, divnm : 페이징div아이디, fnc : 페이징fnc, chk_fnc_name : 페이징체크fnc이름. div id 값 추가
		
		var obj_paging = {
	    	p_id : id,
	    	search_pageindex : 1,
	    	page_len: 1,
	    	page_gap: 5,
	    	pageunit_: 10,
	    	page_stat: 1,
	    	total_cnt: 0,
	        fnc_name : fnc_nm,
	        page_divNm: divnm,	        
	        fnc :fnc,
	        mapViews : mapViews,
	        menu_id : menu_id,
	        first_page: "class='first'",
	        first_page_icon:'<i class="fas fa-angle-double-left"></i>',
//	        first_page_icon:'<i class="fas fa-angle-left"></i>',
	        pre_page: "class='prev'",
	        pre_page_icon:'<i class="fas fa-angle-left"></i>',
//	        pre_page_icon:"<<",
	        next_page: "class='next'",
	        next_page_icon:'<i class="fas fa-angle-right"></i>',
//	        next_page_icon:">>",
	        end_page: "class = 'last'",
	        end_page_icon:'<i class="fas fa-angle-double-right"></i>',
//	        end_page_icon:'<i class="fas fa-angle-right"></i>',
	        page_style: "class='on'",
	        jsonDate : jsonDate, /* 검색시 필요한 데이터*/
	        callBackFunction : callBackFunction, /*검색시 최종 처리 되는 함수*/
	        
	        
	        
	        //page_style: "style='color:red;'", 
	        Set_total_cnt: function(tot) {
	        	this.total_cnt = tot;
	        },
			//Set_paging: function(fnc_nm,divnm,fnc,chk_fnc_name){
//			Set_paging: function(fnc_nm,divnm,fnc){
//			   	this.fnc_name = fnc_nm;
//			   	this.page_divNm = divnm;
//			   	this.fnc = fnc;
//			   	//this.chk_fnc_name = chk_fnc_name;
//			},      
	        PageTool: function() {
	        	if(this.total_cnt == 0){
	        		$(document.getElementById(this.page_divNm)).html("");
	        	}else{
	        		this.Make_PageTool();
	        	}
	        },
			Make_PageTool: function() {
			   	var start_len = 1;
			   	var start_for = 1;
			   	if(this.search_pageindex == 0 ) {
			   		this.search_pageindex = 1;
			   	}
			   	
			   	
			   	this.page_len = Number(this.total_cnt)/this.pageunit_;
			   	var mod_page = Number(this.total_cnt)%this.pageunit_;
			        	
			   	if(mod_page != 0)
			   	{
			   		this.page_len = parseInt(this.page_len) +1;
			   	}	
				        	
			   	if(this.page_gap > this.page_len)
				{
	        		start_len = this.page_len;
				}
				else
				{
					start_len = this.page_gap;
				}
			   	for(var j=1;j<this.page_stat;j++)
			   	{
	        		start_for += this.page_gap;
	        		start_len += this.page_gap;		
	        	}
			   	
			   	
	        	if(this.page_len < start_len)
	        	{
	        		start_len = this.page_len;
	        	}
	        	var page_search = "";	        	
	        	page_search += "<a onclick='paging_tool.getPaging(\""+this.p_id+"\").chk_page(\"first\");' style='cursor:pointer'";
	        	page_search += this.first_page+  ">";
	        	if(this.first_page_icon != null){
	        		page_search += this.first_page_icon;
	        	}
	        	page_search += "</a>";
	        	page_search += "<a onclick='paging_tool.getPaging(\""+this.p_id+"\").chk_page(\"prev\");'  style='cursor:pointer' ";
	        	page_search += this.pre_page+ ">";
	        	if(this.pre_page_icon != null){
	        		page_search += this.pre_page_icon;
	        	}
	        	page_search += "</a>";
	        	for(var i = start_for;i<=start_len;i++){
	        		if(i == this.search_pageindex)
	        		{
	        			page_search += "<a onclick='paging_tool.getPaging(\""+this.p_id+"\").pageGo("+ i +")'"+ this.page_style +" style='cursor:pointer'>"+ i +"</a>";
	        		}
	        		else
	        		{
	        			page_search += "<a onclick='paging_tool.getPaging(\""+this.p_id+"\").pageGo("+ i +")'style='cursor:pointer'>"+i+"</a>";
	        		}		
	        	}	        	
	        	page_search += "<a onclick='paging_tool.getPaging(\""+this.p_id+"\").chk_page(\"next\");'  style='border-right:1px solid #ccc;cursor:pointer;' ";
	        	page_search += this.next_page+ ">";
	        	if(this.next_page_icon != null) page_search += this.next_page_icon;
	        	page_search += "</a>";
	        	page_search += "<a onclick='paging_tool.getPaging(\""+this.p_id+"\").chk_page(\"end\");' style='border-right:1px solid #ccc;cursor:pointer;'";
	        	page_search += this.end_page+ ">";
	        	if(this.end_page_icon != null) page_search += this.end_page_icon;
	        	page_search += "</a>";        	
	        	$(document.getElementById(this.page_divNm)).html(page_search);
			},
			pageGo : function ( i ){
				this.fnc( i, this.p_id, this.jsonDate ,this.callBackFunction, this.mapViews);
			},
			chk_page : function(type)
	        {
	        	//alert(page_len);	
	        	var page1 = parseInt(this.page_len/this.page_gap);
	        	var mod_page1 = this.page_len%this.page_gap;
	        	
	        	if(mod_page1 != 0)
	        	{
	        		page1 = page1 +1;
	        	}	
	
	        	switch(type)
	        	{
	        		case "first" :
	        			this.page_stat =1;
	        			this.fnc(1, this.p_id, this.jsonDate, this.callBackFunction, this.mapViews);		        			
	        			break;
	        		case "prev" :
	        			if(this.page_stat != 1)
	        			{
	        				this.page_stat -=1;
	        				this.fnc((this.page_stat)*this.page_gap, this.p_id, this.jsonDate, this.callBackFunction, this.mapViews);	        				
	        			}
	        			else
	        			{
	        				alert("이전 페이지가 없습니다.");
	        			}
	        			break;
	        		case "next" :		
	        			if(this.page_stat != page1)
	        			{
	        				this.page_stat +=1;
	        				this.fnc(((this.page_stat-1)*this.page_gap)+1, this.p_id , this.jsonDate, this.callBackFunction , this.mapViews);	        				
	        			}
	        			else
	        			{
	        				alert("다음 페이지가 없습니다.");
	        			}
	        			break;
	        		case "end" :			
	        			this.page_stat = page1;
	        			this.fnc(this.page_len, this.p_id , this.jsonDate, this.callBackFunction, this.mapViews);	
	        			break;
	        		default :
	        			this.page_stat =1;
	        			this.fnc(1,  this.p_id , this.jsonDate, this.callBackFunction, this.mapViews);	        			
	        			break;			
	        	}	
	        }
	    };
		this.arr_paging.push(obj_paging);				    
	}
};	