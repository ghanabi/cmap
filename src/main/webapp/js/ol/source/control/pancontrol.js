/**
 * 펜컨트롤
 */
function panControlClass(){
    /**
     * 이동 이벤트
     * @param _mapView
     */
    panControlClass.prototype.panMove = function ( _mapView ){
        var interaction = _mapView.getInteractions().getArray();
        /* interaction 정의된 이벤트  */
        for(var i = 0; i < interaction.length; i++){
            /*그리기 이벤트 비활성화*/
            if(interaction[i] instanceof ol.interaction.Draw) {
                interaction[i].setActive(false);
            }
            /* 드로우 기능 활성화 */
            if(interaction[i] instanceof ol.interaction.DragPan) {
                interaction[i].setActive(true);
            }
        }
    }
}
OlSeesun.ol.control.panControl = new panControlClass();