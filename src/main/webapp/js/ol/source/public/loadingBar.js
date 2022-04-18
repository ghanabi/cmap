function LoadingBarClass(){
	/**
	 * <pre>
	 * 1. 메소드명 : start_progress
	 * 2. 작성일 : 2020. 3. 24. 오후 4:49:16`
	 * 3. 작성자 : hyunwoo
	 * 4. 설명 : 로딩바 시작
	 * </pre>
	 * @param ids
	 * @returns
	 * 작성자         수정일                수정자        vesion     수정자
	 *--------------------------------------------------------------
	 *hyunwoo   2020. 3. 24. 오후 4:49:16         hyunwoo
	 */

	LoadingBarClass.prototype.startProgress = function(msgStr){
		if (msgStr == undefined) {
			msgStr = "지도 로딩중입니다. 잠시만 기다려 주세요.";
		}
		startProgressProc(msgStr);
	}

	function startProgressProc(msgStr){
		$('.wrapperClass').block({
			message: '<h2 id="progress" style="font-size:15px;"><img src="img/map/progress.gif" /><span>'+msgStr+'</span></h2>',
			css: { border: '2px solid #a00' }
		});
	}

	/**
	 * <pre>
	 * 1. 메소드명 : end_progress
	 * 2. 작성일 : 2020. 3. 24. 오후 4:49:16`
	 * 3. 작성자 : hyunwoo
	 * 4. 설명 : 로딩바 끝
	 * </pre>
	 * @param ids
	 * @returns
	 * 작성자         수정일                수정자        vesion     수정자
	 *--------------------------------------------------------------
	 *hyunwoo   2020. 3. 24. 오후 4:49:16         hyunwoo
	 */

	LoadingBarClass.prototype.endProgress = function(){
		$('.wrapperClass').unblock();
	}
}

OlSeesun.publics.LoadingBar = new LoadingBarClass();
