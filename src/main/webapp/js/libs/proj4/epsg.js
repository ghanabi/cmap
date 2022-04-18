	/* WGS84 경위도 EPSG:4326, EPSG:4166 (Korean 1995) */
	proj4.defs("EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");
	proj4.defs("EPSG:4166", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");
	/* Bessel 1841 경위도 EPSG:4004, EPSG:4162 (Korean 1985) */
	proj4.defs("EPSG:4004", "+proj=longlat +ellps=bessel +no_defs");
	proj4.defs("EPSG:4162", "+proj=longlat +ellps=bessel +no_defs");
	/* GRS80 경위도 EPSG:4019, EPSG:4737 (Korean 2000)*/
	proj4.defs("EPSG:4019", "+proj=longlat +ellps=bessel +no_defs");
	proj4.defs("EPSG:4737", "+proj=longlat +ellps=GRS80 +no_defs");
	/* Google Mercator EPSG:900913(통칭), EPSG:3857(공식) */
	proj4.defs("EPSG:900913", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
	proj4.defs("EPSG:3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
	/* UTM52N (WGS84) EPSG:32652 */
	proj4.defs("EPSG:32652", "+proj=utm +zone=52 +ellps=WGS84 +datum=WGS84 +units=m +no_defs");
	/* UTM51N (WGS84) EPSG:32651 */
	proj4.defs("EPSG:32651", "+proj=utm +zone=51 +ellps=WGS84 +datum=WGS84 +units=m +no_defs");
	/* 동부원점(Bessel) EPSG:2096 */
	proj4.defs("EPSG:2096", "+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs");
	/* 중부원점(Bessel) EPSG:2097 */
	proj4.defs("EPSG:2097", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs");
	/* 서부원점(Bessel) EPSG:2098 */
	proj4.defs("EPSG:2098", "+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs");
	/* 보정된 서부원점(Bessel) EPSG:5173 */
	proj4.defs("EPSG:5173", "+proj=tmerc +lat_0=38 +lon_0=125.00289 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-145.907,505.034,685.756,-1.162,2.347,1.592,6.342");
	/* 보정된 중부원점(Bessel) EPSG:5174 */
	proj4.defs("EPSG:5174", "+proj=tmerc +lat_0=38 +lon_0=127.00289 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-145.907,505.034,685.756,-1.162,2.347,1.592,6.342");
	/* 보정된 제주원점(Bessel) EPSG:5175 */
	proj4.defs("EPSG:5175", "+proj=tmerc +lat_0=38 +lon_0=127.00289 +k=1 +x_0=200000 +y_0=550000 +ellps=bessel +units=m +no_defs +towgs84=-145.907,505.034,685.756,-1.162,2.347,1.592,6.342");
	/* 보정된 동부원점(Bessel) EPSG:5176 */
	proj4.defs("EPSG:5176", "+proj=tmerc +lat_0=38 +lon_0=129.00289 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-145.907,505.034,685.756,-1.162,2.347,1.592,6.342");
	/* 보정된 동해(울릉)원점(Bessel) EPSG:5177 */
	proj4.defs("EPSG:5177", "+proj=tmerc +lat_0=38 +lon_0=131.00289 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs  +towgs84=-146.43,507.89,681.46");
	/* UTM-K (Bessel) EPSG:5178 */
	proj4.defs("EPSG:5178", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=bessel +units=m +no_defs");
	/* UTM-K (GRS80) EPSG:5179 NAVER */
	proj4.defs("EPSG:5179", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs");  
	proj4.defs("SR-ORG:7165", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs");                       
	/* 이전 국토지리원 표준 동부원점(GRS80) EPSG:5180 */
	proj4.defs("EPSG:5180", "+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs");
	/* 이전 국토지리원 표준 중부원점(GRS80)DAUM좌표 EPSG:5181*/
	proj4.defs("EPSG:5181", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs");
	/* 이전 국토지리원 표준 제주(GRS80) EPSG:5182 */
	proj4.defs("EPSG:5182", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=550000 +ellps=GRS80 +units=m +no_defs");
	/* 이전 국토지리원 표준 동부(GRS80) EPSG:5183 */
	proj4.defs("EPSG:5183", "+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs");
	/* 이전 국토지리원 표준 동해(울릉)(GRS80) EPSG:5184 */
	proj4.defs("EPSG:5184", "+proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs");
	/* 현재 국토지리원 표준 서부원점(GRS80) EPSG:5185,EPSG:102081 */
	proj4.defs("EPSG:5185", "+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
	proj4.defs("EPSG:102081", "+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
	/* 현재 국토지리원 표준 중부원점(GRS80) EPSG:5186,EPSG:102082 */
	proj4.defs("EPSG:5186", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
	proj4.defs("EPSG:102082", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
	/* 현재 국토지리원 표준 동부원점(GRS80) EPSG:5187, EPSG:102083 */
	proj4.defs("EPSG:5187", "+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
	proj4.defs("EPSG:102083", "+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
	/* 현재 국토지리원 표준 동해(울릉)원점(GRS80) EPSG:5188 */
	proj4.defs("EPSG:5188", "+proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
