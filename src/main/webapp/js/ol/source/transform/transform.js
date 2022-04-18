/*
 * 최초작성자 :백승재
 * 최초작성일 :2021.01.06.
 * 최종변경일 :2021.01.06.
 * 목적 : 좌표변환 클래스
 * 개정이력 :2021.01.06. 최초생성
 * 기능 추가 이력
 * 2021.01.06. 최초생성
 *
*/
function transformClass (){
    /**
     * prj를 통한 좌표계 변환
     * 파라미터
     * _value : 좌표가 들어 잇는 배열
     * _nowPrj : 현제 좌표계
     * _afterPrj : 변환 할 좌표계
     */
    transformClass.prototype.transform = function ( _value, _nowPrj, _afterPrj  ){
        return ol.proj.transform( _value , _nowPrj , _afterPrj  );
    }
}
OlSeesun.ol.transforms = new transformClass();