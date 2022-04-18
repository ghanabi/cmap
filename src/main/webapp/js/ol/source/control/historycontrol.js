/**
 * 지도 이전 다음 컨트롤
 */
function historyControlClass (){
    this.history = null;
    this.historyNow  = null;
    this.click  = null;
    this.delay  = null;
    this.state = false;
    /**
     * 히스토리 생성 컨트롤롤     * @param _mapView
     */
    historyControlClass.prototype.initHistory = function ( _mapView ){
        /*최초실행시 값 초기화 */
        if(this.state == false){
            this.history = []; /*히스토리 초기화*/
            this.historyNow = -1;
            this.click = false;
            this.delay = 350;
            this.state = true;
        }
    }
    /**
     * 마우스 이동시 작동 되는 이벤트
     * @param _mapView
     */
    historyControlClass.prototype.initMouseHistory = function ( _mapView ){
        /* 초기화 */
        this.initHistory( _mapView );

        if(this.click){
            return;
        }
        /* 상태값 저장 시키기  */
        this.history.push({
            center : OlSeesun.ol.function.getView.getCenter( _mapView, 'EPSG:3857' ), /*센터값 가져오기*/
            resolution: OlSeesun.ol.function.getView.getResolution( _mapView ) /* 레졸류션 가져오기 */
        });

        this.historyNow++; /*레졸류션 값 증가 하기*/
    }
    /**
     * 이전버튼 클릭시 실행
     * @param _mapView
     */
    historyControlClass.prototype.preView = function ( _mapView ){
        if (this.historyNow > 0) {
            this.click = true;
            this.historyNow--;
            /* 센터값세팅 */
            OlSeesun.ol.function.getView.setCenter( _mapView, this.history[ this.historyNow ].center );
            /* 레졸류션값 세팅 */
            OlSeesun.ol.function.getView.setResolution( _mapView, this.history[ this.historyNow ].resolution );
            setTimeout(function () {
                this.click = false;
            }, this.delay);
        }else{
            alert("저장된 화면이 없습니다.");
        }
    }
    /**
     * 다음버튼 클릭시 실행
     * @param _mapView
     */
    historyControlClass.prototype.nextView = function ( _mapView ) {
        if (this.historyNow < this.history.length - 1) {
            this.click = true;
            this.historyNow++;
            /* 센터값세팅 */
            OlSeesun.ol.function.getView.setCenter( mapView, this.history[ this.historyNow ].center );
            /* 레졸류션값 세팅 */
            OlSeesun.ol.function.getView.setResolution( mapView, this.history[ this.historyNow ].resolution );

            setTimeout(function () {
                this.click = false;
            }, this.delay);
        }else{
            alert("마지막 화면입니다.")
        }
    }
}
OlSeesun.ol.control.historyControl = new historyControlClass();
