/*ol.proj.Projection 생성*/
function projectionClass(){
    /**
     * @memberof 1
     * @method
     * @description ol.proj.Projection 생성
     * @author
     * @param {Object} opt : 해당지도옵션
     * @result {Object} pro : ol.proj.Projection
     */
    projectionClass.prototype.rtProjection = function( _opt ){
        var pro = new ol.proj.Projection({
            code: _opt.code,
            extent: _opt.maxExtent,
            units:'m'
        });
        /*pro는 지도 옵션이 담긴 객체?*/
        return pro;
    }
}
/*클래스 정의 */
OlSeesun.ol.projection =  new projectionClass();