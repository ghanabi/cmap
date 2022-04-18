/**
****************************************************
TouchEnNx_config.js
****************************************************
| Version     작성자        수정일        변경사항 
 ---------  -------  -----------  ----------
 | v1.0.0.9    강남준    2021.08.14
 | v1.0.0.8    강남준    2021.01.29
 | v1.0.0.7    강남준    2020.02.17
 | v1.0.0.6    강남준    2019.07.05
 | v1.0.0.5    강남준    2018.12.14
 | v1.0.0.4    백서린    2018.11.12
 | v1.0.0.3    강남준    2018.05.14
 | v1.0.0.2    허혜림    2018.01.31
 | v1.0.0.1    허혜림    2017.12.20          

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
****************************************************
**/

var nxKeyConfig ={};
nxKeyConfig.version = {
	
	extension :   {
		exChromeExtVer		:	"1.0.0.0",
		exFirefoxExtVer		:	"1.0.2.5",
		exFirefoxJpmExtVer	:	"1.0.1.12",
		exOperaExtVer		:	"1.0.1.14"
	},
		
	/** 키보드보안 설정 */
		tkappiver			:	"1.0.0.69",
		tkappmver			:	"1.0.0.59",
		exWinVer			:	"1.0.0.75",
		exWin64Ver			:	"1.0.0.75",
		exWinProtocolVer	:	"1.0.1.1243",
		daemonVer			:   "1.0.2.8",
		macDaemonVer		:   "1.0.1.7",
		linuxDaemonVer		:   "1.0.0.1",
		exMacVer			:	"1.0.0.13",
		exMacProtocolVer	:	"1.0.1.1392"
};

nxKeyConfig.module = {
	
	extension	:{
		//exChromeExtDownURL	: "https://chrome.google.com/webstore/detail/dncepekefegjiljlfbihljgogephdhph",
		exChromeExtDownURL	: "https://download.raonsecure.com/extension/chrome/chrome.html",
		exFirefoxExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_firefox.xpi",
		exFirefoxJpmExtDownURL	: TouchEnNxConfig.path.base + "/extension/jpm_touchenex_firefox.xpi",
		exOperaExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_opera.nex"
	},
	
		exWinClient		            :	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_32bit.exe",
		exWin64Client            	:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_64bit.exe",
		daemonDownURL				:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_32bit.exe",
		macDaemonDownURL			:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_Installer.pkg",
	//	ubuntu32DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxKey/module/CrossEXService_32bit.deb",
	//	ubuntu64DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxKey/module/CrossEXService_64bit.deb",
	//	fedora32DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxKey/module/CrossEXService_32bit.rpm",
	//	fedora64DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxKey/module/CrossEXService_64bit.rpm",
		exMacClient					:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_Installer.pkg",
		exMacProtocolDownURL		: 	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_Installer.pkg"
};

/** 키보드보안 E2E 사용 : 주석처리 / E2E 사용X : 주석해제 */
var TNK_SR = "";

/**	클라이언트 솔루션별 동작 설정*/
TouchEnNxConfig.solution={
		nxkey : {
				tekOption : {
					"pki": "TouchEnkeyEx",
				    "keyboardonly": "false",
				    "defaultenc": "false",
				    "verify": "0",
				    "defaultpaste": "true",
				    "iframename": "",
				    "usegetenc": "false",
				    "clearbufferonempty": "true",
				    "refreshsession": "true",
				    "improve": "true",
					"bstart": 0,
				    "setcallback": "false",
				    "usebspress": "false",
				    "ignoreprogress": "true",
				    "ignoreprogress2": "true",
				    "exformname": "",
				    "idbase": "false",
				    "allcrypt": "false",
					"browserinfo" : "",
					"cert" : "-----BEGIN CERTIFICATE-----MIIDIzCCAgugAwIBAgIJAO4t+//wr+bcMA0GCSqGSIb3DQEBCwUAMGcxCzAJBgNVBAYTAktSMR0wGwYDVQQKExRSYW9uU2VjdXJlIENvLiwgTHRkLjEaMBgGA1UECxMRUXVhbGl0eSBBc3N1cmFuY2UxHTAbBgNVBAMTFFJhb25TZWN1cmUgQ28uLCBMdGQuMB4XDTIxMDIyNTAwNTQyOFoXDTQxMDIyMDAwNTQyOFowHzELMAkGA1UEBhMCS1IxEDAOBgNVBAoMB1NCSWJhbmswggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDZwS3gzkGIq5J2J2hjVE5twiyALVEA8Lz2Xnk8Ez2AqsQQDchKTATetzWHHltj+pbr8UuaZ+/ziBiC0eIWw/hEZmcdCK/Xv/9IdhYV5NIPuzGU4PREvqSaIuBoLg9WM8z91dU9lfJPBUYM60iFzlekuFLi6jK4MyBonHJNFpG8gu8Cf33kr4EW3ejQO3kz1NWYwvSdeRhXono0XkbIroSBcb3s8C6cFdsF+LPxEpU8RuLBMaUr1xAmACYMy2vxdmVSz3uNsLam11aDlb74v0vw2Tki4cXBTLDZBQ+JIIf/9tFQNJg7leMEEjVgrEszZRMRufKauRsc1dgv8KDBwQcrAgMBAAGjGjAYMAkGA1UdEwQCMAAwCwYDVR0PBAQDAgXgMA0GCSqGSIb3DQEBCwUAA4IBAQCcgPzXZJMKKiox5xa5yYqac/lBMyZ/hztNtuNMOxHUZJwZmHMGSu/DLXiQXVbq+qp4MT+6pD/H1ZxzkpEcR1XPUuC1XZZhoFDnL9sJTNaDE7kT3BgAYbNFtz9JzLfMR6iuj/B6CQCh01PN+ziv49EYrIvcPASOi9igDkcmAip7WK9NfNN+TeO/2NOaq5syfy27hmRAnY4hbBK9N7RDKKMC7a6V8KMfTxWWjWuYRAiZOMSbsrqufnNW/RPgk4N8HRcInwdxHqPcJIJbHrObBGctirB56DuJC/ndNQnb2S18zNeT02UqZTgyZxYjrjJ/ajkLHZqWTBDs6tFTJhG8qpaO-----END CERTIFICATE-----",
					"srdk": TNK_SR,
					"generate_event": "false",
					"driverexcept": "0",
					"delayedck": "false",
					"shiftbypass": "true",
					"allowdup": "false",
					"enc2": "false",
				    "searchformname":"",
					"runtype": TouchEnNxConfig.runtype,
					"tk_isRunningSecurity" : "false", 
					"isAllowIdOverlap" : "true", //히든필드 중복오류 수정시 false설정 및 서버버전 v2.0.3.3 적용필요
					"defaultsecurityid" : "true",
					"newModule" : "true"
				}
		}
};