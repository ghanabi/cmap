function timerClass (){
	
	timerClass.prototype.setTimeout = function (_function, _ms){
		setTimeout(function() {
			_function();
			}, _ms); // 3000ms(3초)가 경과하면 이 함수가 실행됩니다.

	}
	
	timerClass.prototype.setTimeoutTwo = function (_function1, _function2, _ms){
		setTimeout(function() {
			_function1();
			_function2();
			
			}, _ms); // 3000ms(3초)가 경과하면 이 함수가 실행됩니다.

	}
	
}

OlSeesun.publics.timer = new timerClass();