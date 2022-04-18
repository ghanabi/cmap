/*
User: 백승재
Date: 2021-05-13
Time: 오후 3:47
레벨에 따른 해상도 계산후 리턴
*/
function resolutionClass (){
    /**
     * @memberof
     * @method
     * @description 레벨별 해상도 계산 후 리턴
     * @author
     * @param {Number} _nMaxResolution : 지도서비스 최대해상도
     * @param {Number} _nZoomLevels : 지도서비스 레벨 수
     */
    resolutionClass.prototype.rtResolution = function ( _nMaxResolution, _nZoomLevels ){
        var aRtnRes = [];
        var i, nRes;
        for(i = 0 ; i < _nZoomLevels; i++){
            nRes = _nMaxResolution / Math.pow(2,i);
            aRtnRes.push(nRes);
        }
        return aRtnRes;
    }

    /**
     * @memberof
     * @method
     * @description TMS서비스. 해당 영상 레벨에 맞는 serverResolutions 리턴.
     * @param {String} sLev : 시작 영상레벨
     * @param {String} eLev : 끝 영상레벨
     */
    resolutionClass.prototype.rtTmsServerResolution = function (sLev, eLev){
        var defaultRes = [156543.03390625, 78271.516953125, 39135.7584765625,
            19567.87923828125, 9783.939619140625,
            4891.9698095703125, 2445.9849047851562,
            1222.9924523925781, 611.4962261962891,
            305.74811309814453, 152.87405654907226,
            76.43702827453613, 38.218514137268066,
            19.109257068634033, 9.554628534317017,
            4.777314267158508, 2.388657133579254,
            1.194328566789627, 0.5971642833948135, 0.29858214169740675,0.14929107084274]; // 0~ 20단계;
        var result_Res = [];
        for(var i = Number(sLev); i < Number(eLev)+1; i++){
            resultRes.push( default_res[i] );
        }
        return result_res;
    }
}
/*클래스 정의 */
OlSeesun.ol.resolution =  new resolutionClass();
