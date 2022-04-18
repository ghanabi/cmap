/**
 * 지도출력
 */
function mapPrintClass(){
    /* 출력 팝업*/
    mapPrintClass.prototype.showPrintPopup = function( _mapView ){
        _mapView.once('postcompose', function(event) {
            var cnvs = event.context.canvas;

            var mapImage = cnvs.toDataURL('image/png');

            var popupWindow = window.open("","","width=800px,height=640px");

            popupWindow.document.write("<head>")
            popupWindow.document.write('<link type="text/css" href="/default.css" rel="stylesheet">');
            popupWindow.document.write('<link type="text/css" href="/fwall.css" rel="stylesheet" >');
            popupWindow.document.write('<link type="text/css" href="/printPopStyle.css" rel="stylesheet" >');
            popupWindow.document.write("<script>")
            popupWindow.document.write("function fn_print(){")
            popupWindow.document.write("document.getElementById('printBtn').style.display = 'none';")
            popupWindow.document.write("if(document.getElementById('memo').value.length == 0)")
            popupWindow.document.write("document.getElementById('memo').style.display = 'none';")
            popupWindow.document.write("window.print();")
            popupWindow.document.write("window.close();")
            popupWindow.document.write("};")
            popupWindow.document.write("</script>")
            popupWindow.document.write("</head>")

            popupWindow.document.write("<body>")
            popupWindow.document.write("<div id=mapPopup>")

            popupWindow.document.write("<div id='header'>")
            popupWindow.document.write("<i class='fas fa-print'></i><b>인쇄하기</b> <span id='printBtn' onclick='fn_print()'>프린트</span>")
            popupWindow.document.write("</div>")

            popupWindow.document.write("</div>")

            popupWindow.document.write("<div id='mapContainer'>")
            popupWindow.document.write("<div id='map'>")
            popupWindow.document.write("<img src='"+mapImage+"' width='100%'/>");
            popupWindow.document.write("</div>")

            popupWindow.document.write("<div id='memoBox'>")
            popupWindow.document.write("<textarea id='memo' placeholder='메모를 입력하세요.'></textarea>");
            popupWindow.document.write("</div>")
            popupWindow.document.write("</div>")

            popupWindow.document.write("</div>")

            popupWindow.document.write("</body>")

            popupWindow.document.close();
            popupWindow.focus();

        });
        _mapView.renderSync();
    }
}

OlSeesun.ol.function.mapPrint = new mapPrintClass();