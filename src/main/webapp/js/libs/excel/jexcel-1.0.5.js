/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jexcel.js
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var JExcel = function( defaultFont ) {

	this.styles = new JExcel.StyleSheet( defaultFont );	// Create Styles sheet
	this.sheets = new JExcel.Sheets();					// Create Excel sheets
	this.sheets.add( "Sheet 0" );						// At least we have a [Sheet 0]

	this.addSheet = function( name ) {

		if( ! name ) name = "Sheet " + this.sheets.length;
		return this.sheets.add( name );
	};

	this.addStyle = function( a ) {

		return this.styles.add( a );
	};

	this.set = function( s, column, row, value, style ) {

		if( JExcel.Util.isObject( s ) ) return this.set( s.sheet, s.column, s.row, s.value, s.style );// If using Object form, expand it

		if( ! s ) s = 0;// Use default sheet
		s = this.sheets.get( s );
	
		if( isNaN( column ) && isNaN( row ) ) return s.set( value, style );// If this is a sheet operation

		if( ! isNaN( column ) ) {															// If this is a column operation

			if( ! isNaN( row ) ) return setCell( s.getCell( column, row ), value, style );	// and also a ROW operation the this is a CELL operation

			setColumn( s.getColumn( column ), value, style );// if not we confirm than this is a COLUMN operation
		}

		return setRow( s.getRow( row ), value, style );										// If got here, thet this is a Row operation
	};

	this.setColumnWidth = function( s, column, value ) {

		if( ! s ) s = 0;// Use default sheet
		s = this.sheets.get( s );

		setColumn( s.getColumn( column ), value );
	};

	this.mergeCell = function( s, startCol, startRow, endCol, endRow ) {

		if( ! s ) s = 0;// Use default sheet
		s = this.sheets.get( s );

		var mCell = { sRow : startRow, sCol : startCol, eRow : endRow, eCol : endCol };
		s.mergeCells.push( mCell );
	};

	this.generate = function( filename, saveCallback, stepCallback ) {

		this.combineStyles( this.sheets.sheets, this.styles );

		var zip = new JSZip();																			// Create a ZIP file
		zip.file( '_rels/.rels', this.sheets.toRels() );												// Add WorkBook RELS   
		var xl = zip.folder( 'xl' );																	// Add a XL folder for sheets
		xl.file( 'workbook.xml', this.sheets.toWorkBook() );											// And a WorkBook
		xl.file( 'styles.xml', this.styles.toStyleSheet() );											// Add styles
		xl.file( '_rels/workbook.xml.rels', this.sheets.toWorkBookRels() );								// Add WorkBook RELs
		zip.file( '[Content_Types].xml', this.sheets.toContentType() );									// Add content types
		
		if( stepCallback ) {

			this.sheets.fileDataByCallback( xl, stepCallback, function() {								// Zip the rest

				zip.generateAsync( { type: "blob", compression: "DEFLATE" } ).then( function( content ) {	// And generate !!!

					saveAs( content, filename );
					if( saveCallback ) {
	
						saveCallback.call( this );
					}
				});
			});

		} else {

			this.sheets.fileData( xl );																	// Zip the rest
			zip.generateAsync( { type: "blob", compression: "DEFLATE" } ).then( function( content ) {	// And generate !!!

				saveAs( content, filename );
				if( saveCallback ) {

					saveCallback.call( this );
				}
			});
		}
	};

	//  Loops all rows & columns in sheets. 
	//  If a row has a style it tries to apply the style componenets to all cells in the row (provided that the cell has not defined is not own style component)
	this.combineStyles = function( sheets, styles ) {

		// First lets do the Rows
		for( var i = 0; i < sheets.length; i++ ) {

			// First let's do the rows
			for( var j = 0; j < sheets[i].rows.length; j++ ) {

				var row = sheets[ i ].rows[ j ];
				if( row && row.style ) {

					for( var k = 0; k < row.cells.length; k++ ) {

						if( row.cells[ k ] ) this.addStyleToCell( row.cells[ k ], styles, row.style );
					}
				}
			}

			// Second let's do the cols
			for( var c = 0; c < sheets[i].columns.length; c++ ) {

				if( sheets[ i ].columns[ c ] && sheets[ i ].columns[ c ].style ) {

					var cstyle = sheets[ i ].columns[ c ].style;
					for( var j = 0; j < sheets[i].rows.length; j++ ) {

						var row = sheets[ i ].rows[ j ];
						if( row ) {

							for( var k = 0; k < row.cells.length; k++ ) {

								if( row.cells[ k ] && k == c ) this.addStyleToCell( row.cells[ k ], styles, cstyle );
							}
						}
					}
				}
			}
		}
	};

	this.addStyleToCell = function( cell, styles, toAdd ) {

		if( ! cell ) return;// If no cell then return
		if( ! cell.s ) {// If cell has no style, use toAdd

			cell.s = toAdd;
			return;
		}

		var cs = styles.getStyle( cell.s - 1 );
		var os = styles.getStyle( toAdd - 1 );
		var ns = {}, b = false;

		for( var x in cs ) ns[ x ] = cs[ x ];// Clone cell style
		for( var x in os ) {

			if( ! ns[ x ] ) {

				ns[ x ] = os[ x ];
				b = true;
			}
		}
		if( ! b ) return;// If the toAdd style does NOT add anything new
		cell.s = 1 + styles.register( ns );
	};
};


// Pending runText formatting http://officeopenxml.com/SSstyles.php
JExcel.borderKind = ["left", "right", "top", "bottom"];// Not implementing diagonal borders, as they require an additonal attributes: diagonalUp diagonalDown
JExcel.horAlign = ["LEFT", "CENTER", "RIGHT", "NONE"];
JExcel.vertAlign = ["TOP", "CENTER", "BOTTOM", "NONE"];

JExcel.align = { L: "left", C: "center", R: "right", T: "top", B: "bottom" };


// For styles see page 2127-2143 of the standard at
// http://www.ecma-international.org/news/TC45_current_work/Office%20Open%20XML%20Part%204%20-%20Markup%20Language%20Reference.pdf
JExcel.BuiltInFormats = [];
JExcel.BuiltInFormats[0] = 'General';
JExcel.BuiltInFormats[1] = '0';
JExcel.BuiltInFormats[2] = '0.00';
JExcel.BuiltInFormats[3] = '#,##0';
JExcel.BuiltInFormats[4] = '#,##0.00';

JExcel.BuiltInFormats[9] = '0%';
JExcel.BuiltInFormats[10] = '0.00%';
JExcel.BuiltInFormats[11] = '0.00E+00';
JExcel.BuiltInFormats[12] = '# ?/?';
JExcel.BuiltInFormats[13] = '# ??/??';
JExcel.BuiltInFormats[14] = 'mm-dd-yy';
JExcel.BuiltInFormats[15] = 'd-mmm-yy';
JExcel.BuiltInFormats[16] = 'd-mmm';
JExcel.BuiltInFormats[17] = 'mmm-yy';
JExcel.BuiltInFormats[18] = 'h:mm AM/PM';
JExcel.BuiltInFormats[19] = 'h:mm:ss AM/PM';
JExcel.BuiltInFormats[20] = 'h:mm';
JExcel.BuiltInFormats[21] = 'h:mm:ss';
JExcel.BuiltInFormats[22] = 'm/d/yy h:mm';

JExcel.BuiltInFormats[27] = '[$-404]e/m/d';
JExcel.BuiltInFormats[30] = 'm/d/yy';
JExcel.BuiltInFormats[36] = '[$-404]e/m/d';

JExcel.BuiltInFormats[37] = '#,##0 ;(#,##0)';
JExcel.BuiltInFormats[38] = '#,##0 ;[Red](#,##0)';
JExcel.BuiltInFormats[39] = '#,##0.00;(#,##0.00)';
JExcel.BuiltInFormats[40] = '#,##0.00;[Red](#,##0.00)';

JExcel.BuiltInFormats[44] = '_("$"* #,##0.00_);_("$"* \(#,##0.00\);_("$"* "-"??_);_(@_)';
JExcel.BuiltInFormats[45] = 'mm:ss';
JExcel.BuiltInFormats[46] = '[h]:mm:ss';
JExcel.BuiltInFormats[47] = 'mmss.0';
JExcel.BuiltInFormats[48] = '##0.0E+0';
JExcel.BuiltInFormats[49] = '@';

JExcel.BuiltInFormats[50] = '[$-404]e/m/d';
JExcel.BuiltInFormats[57] = '[$-404]e/m/d';
JExcel.BuiltInFormats[59] = 't0';
JExcel.BuiltInFormats[60] = 't0.00';
JExcel.BuiltInFormats[61] = 't#,##0';
JExcel.BuiltInFormats[62] = 't#,##0.00';
JExcel.BuiltInFormats[67] = 't0%';
JExcel.BuiltInFormats[68] = 't0.00%';
JExcel.BuiltInFormats[69] = 't# ?/?';
JExcel.BuiltInFormats[70] = 't# ??/??';
JExcel.BuiltInFormats[165] = '*********';// Here we start with non hardcoded formats

JExcel.baseFormats = 166;// Formats below this one are builtInt
JExcel.formats = JExcel.BuiltInFormats;


JExcel.borderStyles = [
	"none", "thin", "medium", "dashed", "dotted", "thick", "double", "hair", "mediumDashed",
	"dashDot", "mediumDashDot", "dashDotDot", "mediumDashDotDot", "slantDashDot"
];

JExcel.borderStylesUpper = [];
for( var i = 0; i < JExcel.borderStyles.length; i++ ) {

	JExcel.borderStylesUpper.push( JExcel.borderStyles[ i ].toUpperCase() );
}


JExcel.Sheets = function() {

	this.sheets = [];

	this.templateSheet = '<?xml version="1.0" ?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ' +
		'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:mv="urn:schemas-microsoft-com:mac:vml" ' +
		'xmlns:mx="http://schemas.microsoft.com/office/mac/excel/2008/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ' +
		'xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" ' +
		'xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main">' +
		'{columns}' +
		'<sheetData>{rows}</sheetData>{mergeCells}</worksheet>';


	this.add = function( name ) {

		var sheet = {
			id: this.sheets.length + 1,
			rId: "rId" + (3 + this.sheets.length),
			name: name,
			rows: [],
			columns: [],
			mergeCells : [],// 추가부분
			getColumn: getColumn,
			set: setSheet,
			getRow: getRow,
			getCell: getCell
		};

		return JExcel.Util.pushI( this.sheets, sheet );
	};

	this.get = function( index ) {

		var sheet = this.sheets[index];
		if( ! sheet ) throw "Bad sheet " + index;
		return sheet;
	};

	this.rows = function( i ) {

		if( i < 0 || i >= this.sheets.length ) throw "Bad sheet number must be [0.." + ( this.sheets.length - 1 ) + "] and is: " + i;
		return this.sheets[i].rows;
	};

	this.setWidth = function( sheet, column, value, style ) {

		// See 3.3.1.12 col (Column Width & Formatting
		if( value ) this.sheets[sheet].colWidths[column] = isNaN(value) ? value.toString().toLowerCase() : value;
		if( style ) this.sheets[sheet].colStyles[column] = style;
	};

	this.toWorkBook = function() {

		var s = '<?xml version="1.0" standalone="yes"?>' +
			'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
			'<sheets>';

		for( var i = 0; i < this.sheets.length; i++ ) {
			
			s = s + this.toWorkBookSheet( this.sheets[ i ] );
		}

		return s + '</sheets><calcPr/></workbook>';
	};

	this.toWorkBookSheet = function( sheet ) {

		return '<sheet state="visible" name="' + sheet.name + '" sheetId="' + sheet.id + '" r:id="' + sheet.rId + '"/>';
	};

	this.toWorkBookRels = function() {

		var s = '<?xml version="1.0" ?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
		s = s + '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>';// rId2 is hardcoded and reserved for STYLES

		for( var i = 0; i < this.sheets.length; i++ ) {

			s = s + this.toWorkBookRel( this.sheets[ i ], i + 1 );
		}

		return s + '</Relationships>';
	};

	this.toWorkBookRel = function( sheet, i ) {

		return '<Relationship Id="' + sheet.rId + '" Target="worksheets/sheet' + i + '.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"/>';
	};
	
	this.toRels = function() {

		var s = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
		s = s + '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>';         // rId1 is reserverd for WorkBook
		return s + '</Relationships>';
	};

	this.toContentType = function() {

		var s = '<?xml version="1.0" standalone="yes" ?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default ContentType="application/xml" Extension="xml"/>';
		s = s + '<Default ContentType="application/vnd.openxmlformats-package.relationships+xml" Extension="rels"/>';
		s = s + '<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" PartName="/xl/workbook.xml"/>';
		s = s + '<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" PartName="/xl/styles.xml" />';

		for (var i = 1; i <= this.sheets.length; i++) {

			s = s + '<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" PartName="/xl/worksheets/sheet' + i + '.xml"/>';
		}

		return s + '</Types>';
	};

	this.fileData = function( xl ) {

		for (var i = 0; i < this.sheets.length; i++) {

			xl.file( 'worksheets/sheet' + ( i + 1 ) + '.xml', this.getAsXml( this.sheets[ i ] ) );
		}
	};

	this.fileDataByCallback = function( xl, stepCallback, fileDataCallback ) {

		var doneCnt = 0;
		for (var i = 0; i < this.sheets.length; i++) {

			var thisObj = this;
			( function() {

				var idx = i;
				thisObj.getAsXmlByCallback( thisObj.sheets[ idx ], stepCallback, function( xml ) {

					doneCnt++;
					xl.file( 'worksheets/sheet' + ( idx + 1 ) + '.xml', xml );
	
					if( doneCnt == thisObj.sheets.length ) {
	
						if( fileDataCallback ) {
	
							fileDataCallback.call( thisObj );
						}
					}
				});
			})();
		}
	};

	this.getAsXml = function( sheet ) {

		var xml = this.templateSheet.replace( '{columns}', this.generateColums( sheet.columns ) );
		xml = xml.replace( "{rows}", this.generateRows( sheet.rows ) );
		xml = xml.replace( "{mergeCells}", this.generateMergeCells( sheet.mergeCells ) );
		return xml;
	};

	this.getAsXmlByCallback = function( sheet, stepCallback, getAsXmlCallback ) {

		var xml = this.templateSheet.replace( '{columns}', this.generateColums( sheet.columns ) );

		this.generateRowsByCallback( sheet.rows, stepCallback, function( str ) {

			xml = xml.replace( "{rows}", str );
			xml = xml.replace( "{mergeCells}", this.generateMergeCells( sheet.mergeCells ) );

			if( getAsXmlCallback ) {

				getAsXmlCallback.call( this, xml);
			}
		});
	};

	this.generateColums = function( columns ) {

		if( columns.length == 0 ) return;
	
		var s = '<cols>';
		for( var i = 0; i < columns.length; i++ ) {

			var c = columns[ i ];
			if( c ) {

				s = s + '<col min="' + ( i + 1 ) + '" max="' + ( i + 1 ) + '" ';

				if( c.wt == "auto" ) {

					s = s + ' width="18" bestFit="1" customWidth="1" ';

				} else if( c.wt ) {

					s = s + ' width="' + c.wt + '" customWidth="1" ';
				}

				if( c.style ) s = s + ' style="' + c.style + '"';

				s = s + "/>";
			}
		}

		return s + "</cols>";
	};

	this.generateRows = function( rows ) {

		var str = '';

		for( var index = 0; index < rows.length; index++ ) {

			if( rows[ index ] ) {

				str += this.generateRow( rows[ index ], index );
			}
		}

		return str;
	};

	this.generateRowsByCallback = function( rows, stepCallback, generateRowsCallback ) {

		var strArr = [];
		var doneCnt = 0;

		this.generateRowsProcessByCallback( rows, 0, strArr, function( doneIdxCnt ) {

			doneCnt += doneIdxCnt;

			stepCallback.call( this, doneCnt );

			if( doneCnt >= rows.length ) {

				var retStr = strArr.join( '' );
				generateRowsCallback.call( this, retStr );
			}
		});
	};

	this.generateRowsProcessByCallback = function( rows, index, strArr, generateRowsProcessCallback ) {

		setTimeout( function() {

			// row 전체에 대해 timeout 설정하면 속도가 현저히 저하되는 현상으로 인하여 100 단위 볼륨으로 진행 처리
			var vol = 100;
			var maxLen = index + vol;
			if( maxLen > rows.length ) maxLen = rows.length;

			var doneIdxCnt = 0;
			var lastIdx = index;
			for( var v = index; v < maxLen; v++ ) {

				doneIdxCnt++;
				lastIdx = v;

				var str = '';

				if( rows[ v ] ) {
	
					str += this.generateRow( rows[ v ], v );
				}
	
				strArr[ v ] = str;
			}

			generateRowsProcessCallback.call( this, doneIdxCnt );

			if( ( lastIdx + 1 ) < rows.length ) {

				this.generateRowsProcessByCallback( rows, lastIdx + 1, strArr, generateRowsProcessCallback );
			}

		}.bind( this ), 0);
	};

	this.generateRow = function( row, index ) {

		var rowIndex = index + 1;
		var oCells = [];

		for( var i = 0; i < row.cells.length; i++ ) {

			if( row.cells[ i ] ) oCells.push( this.generateCell( row.cells[ i ], i, rowIndex ) );
		}

		var s = '<row r="' + rowIndex + '" ';
		if( row.ht ) s = s + ' ht="' + row.ht + '" customHeight="1" ';
		if( row.style ) s = s + 's="' + row.style + '" customFormat="1"';

		return s + ' >' + oCells.join( '' ) + '</row>';
	};

	this.generateCell = function( cell, column, row ) {

		var s = '<c r="' + this.cellName( column, row ) + '"';
		if( cell.s ) s = s + ' s="' + cell.s + '" ';

		if( "string" == typeof cell.v ) {

			if( "" == cell.v ) {

				return s + ' t="inlineStr" ></c>';// 다운로드 이후 편집에서 공백 부분을 ISBLANK 엑셀 함수등으로 진행하는 경우 TRUE값으로 설정되도록
			}

			return s + ' t="inlineStr" ><is><t>' + escape( cell.v ) + '</t></is></c>';

		} else {

			if( isNaN( cell.v ) ) return s + ' t="inlineStr" ><is><t>' + escape( cell.v ) + '</t></is></c>';
		}

		return s + '><v>' + cell.v + '</v></c>';
	};

	this.cellName = function( colIndex, rowIndex ) {

		return this.cellNameH( colIndex ) + rowIndex;
	};

	this.cellNameH = function( i ) {

		var rest = Math.floor( i / 26 ) - 1;
		var s = ( rest > -1 ? this.cellNameH( rest ) : '' );

		return s+ "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt( i % 26 );
	};

	this.generateMergeCells = function( mergeCells ) {

		if( ! mergeCells ) return '';
		if( 0 == mergeCells.length ) return '';
/*
		var oMergeCells = [];
		for( var i = 0; i < mergeCells.length; i++ ) {

			oMergeCells.push( this.generateMergeCell( mergeCells[ i ] ) );
		}

		//ex) <mergeCells count="2"><mergeCell ref="B1:D1"/><mergeCell ref="B2:D2"/></mergeCells>
		var s = '<mergeCells count="' + mergeCells.length + '">';
		return s + oMergeCells.join( '' ) + '</mergeCells>';
*/

		var str = '';
		for( var i = 0; i < mergeCells.length; i++ ) {

			str += this.generateMergeCell( mergeCells[ i ] );
		}

		//ex) <mergeCells count="2"><mergeCell ref="B1:D1"/><mergeCell ref="B2:D2"/></mergeCells>
		return '<mergeCells count="' + mergeCells.length + '">' + str + '</mergeCells>';
	};

	this.generateMergeCell = function( mergeCell ) {

		if( ! mergeCell ) return '';

		return '<mergeCell ref="' + this.cellName( mergeCell.sCol, mergeCell.sRow + 1 ) + ':' + this.cellName( mergeCell.eCol, mergeCell.eRow + 1 ) + '"/>';
	};
};

JExcel.StyleSheet = function( defaultFont ) {

	var styles = [], fonts = [], formats = JExcel.BuiltInFormats.slice( 0 ), borders = [], fills = [];

	this.add = function( a ) {

		var style = {};

		// If there is a fill color add it, with a gap of 2, because of the TWO DEFAULT HARDCODED fills
		if( a.fill && a.fill.charAt( 0 ) == "#" ) style.fill = 2 + this.findOrAdd( fills, a.fill.toString().substring( 1 ).toUpperCase() );
		if( a.font ) style.font = this.findOrAdd( fonts, this.normalizeFont( a.font.toString().trim() ) );
		if( a.format ) style.format = this.findOrAdd( formats, a.format );
		if( a.align ) style.align = this.normalizeAlign( a.align );
		if( a.border ) style.border = 1 + this.findOrAdd( borders, this.normalizeBorders( a.border.toString().trim() ) );// There is a HARDCODED border

		return 1 + JExcel.Util.pushI( styles, style );// Add the style and return INDEX+1 because of the DEFAULT HARDCODED style
	};

	this.register = function( thisOne ) {

		for( var i = 0; i < styles.length; i++ ) {

			if( styles[ i ].font == thisOne.font && styles[ i ].format == thisOne.format && styles[ i ].fill == thisOne.fill
				&& styles[ i ].border == thisOne.border && styles[ i ].align == thisOne.align ) return i;
		}

		return JExcel.Util.pushI( styles, thisOne );
	};

	this.getStyle = function( a ) {

		return styles[ a ];
	};

	this.findOrAdd = function( list, value ) {

		var i = list.indexOf( value );
		if( i != -1 ) return i;

		list.push( value );
		return list.length - 1;
	};

	//"Arial", 14, "#0000EE","UBI"
	this.normalizeFont = function( fontDescription ) {

		fontDescription = JExcel.Util.replaceAllMultiple( fontDescription, "  ", " " );
		var fNormalized = [ "_", "_", "_", "_" ];//  Name - Size - Color - Style (use NONE as placeholder)
		var list = fontDescription.split( " " );//  Split by " "
		var name = [];
		while( list[ 0 ] && ( list[ 0 ] != "none" ) && ( isNaN( list[ 0 ] ) ) && ( list[ 0 ].charAt( 0 ) != "#" ) ) {

			name.push( list[ 0 ].charAt( 0 ).toUpperCase() + list[ 0 ].substring( 1 ).toLowerCase() );
			list.splice( 0, 1 );
		}
	
		fNormalized[ 0 ] = name.join( " " );
		while( list[ 0 ] == "none" ) list.splice( 0, 1 );// Delete any "none" that we might have
		if( ! isNaN( list[ 0 ] ) ) {// IF we have a number then this is the font size    

			fNormalized[ 1 ] = list[ 0 ];
			list.splice( 0, 1 );
		}

		while( list[ 0 ] == "none" ) list.splice( 0, 1 );// Delete any "none" that we might have
		if( list[ 0 ] && list[ 0 ].length == 7 && list[ 0 ].charAt( 0 ) == "#" ) {// IF we have a 6 digits value it must be the color

			fNormalized[ 2 ] = list[ 0 ].substring( 1 ).toUpperCase();
			list.splice( 0, 1 );
		}

		while( list[ 0 ] == "none" ) list.splice( 0, 1 );// Delete any "none" that we might have
		if( list[ 0 ] && list[ 0 ].length < 4 ) fNormalized[ 3 ] = list[ 0 ].toUpperCase();// Finally get the STYLE
		return fNormalized.join( ";" );
	};

	this.normalizeAlign = function( a ) {

		if( ! a ) return "--";

		var a = JExcel.Util.replaceAllMultiple( a.toString(), "  ", " ").trim().toUpperCase().split( " " );
		if( a.length == 0 ) return "--";
		if( a.length == 1 ) a[ 1 ] = "-";

		return a[ 0 ].charAt( 0 ) + a[ 1 ].charAt( 0 ) + "--";
	};

	this.normalizeBorders = function( b ) {

		b = JExcel.Util.replaceAllMultiple( b, "  ", " " ).trim();
		var l = ( b + ",NONE,NONE,NONE,NONE" ).split( "," );
		var p = "";
		for( var i = 0; i < 4; i++ ) {

			l[ i ] = l[ i ].trim().toUpperCase();
			l[ i ] = ( ( l[ i ].substring(0, 4) == "NONE" ? "NONE" : l[ i ] ).trim() + " NONE NONE NONE" ).trim();
			var st = l[ i ].split( " " );
			if( st[ 0 ].charAt( 0 ) == "#" ) {

				st[ 2 ] = st[ 0 ];
				st[ 0 ] = st[ 1 ];
				st[ 1 ] = st[ 2 ];
			}
			p = p + st[ 0 ] + " " + st[ 1 ] + ",";
		}

		return p;
	};
	
	this.toStyleSheet = function () {

		var s = '<?xml version="1.0" encoding="utf-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ' +
				'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">';

		s = s + '<numFmts count="' + ( formats.length - JExcel.baseFormats ) + '">';
		for( var i = JExcel.baseFormats; i < formats.length; i++ ) {

			s = s + '<numFmt numFmtId="' + ( i ) + '" formatCode="' + formats[ i ] + '"/>';
		}
		s = s + '</numFmts>';

		s = s + '<fonts count="' + ( fonts.length ) + '" x14ac:knownFonts="1" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">';
		for( var i = 0; i < fonts.length; i++ ) {
			
			s = s + this.toFontXml( fonts[ i ] );
		}
		s = s + '</fonts>';

		s = s + '<fills count="' + ( 2 + fills.length ) + '"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>';
		for( var i = 0; i < fills.length; i++ ) {
			
			s = s + this.toFillXml( fills[ i ] );
		}
		s = s + '</fills>';

		s = s + '<borders count="' + ( 1 + borders.length ) + '"><border><left /><right /><top /><bottom /><diagonal /></border>';
		for( var i = 0; i < borders.length; i++ ) {

			s = s + this.toBorderXml( borders[ i ] );
		}
		s = s + '</borders>';

		s = s + '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';

		s = s + '<cellXfs count="' + ( 1 + styles.length ) + '"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" />';
		for( var i = 0; i < styles.length; i++ ) {

			s = s + this.toStyleXml( styles[ i ] );
		}
		s = s + '</cellXfs>';

		s = s + '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>';
		s = s + '<dxfs count="0"/>';
		s = s + '</styleSheet>';

		return s;
	};

	this.toFontXml = function( f ) {

		var f = f.split( ";" );
		return '<font>' +
			( f[ 3 ].indexOf( "B" ) > -1 ? '<b />' : '' ) +
			( f[ 3 ].indexOf( "I" ) > -1 ? '<i />' : '' ) +
			( f[ 3 ].indexOf( "U" ) > -1 ? '<u />' : '' ) +
			( f[ 1 ] != "_" ? '<sz val="' + f[ 1 ] + '" />' : '' ) +
			( f[ 2 ] != "_" ? '<color rgb="FF' + f[ 2 ] + '" />' : '' ) +
			( f[ 0 ] ? '<name val="' + f[ 0 ] + '" />' : '' ) +
			'</font>';// <family val="2" /><scheme val="minor" />
	};

	this.toFillXml = function( f ) {

		return '<fill><patternFill patternType="solid"><fgColor rgb="FF' + f + '" /><bgColor indexed="64" /></patternFill ></fill>';
	};

	this.toBorderXml = function( b ) {

		var s = "<border>";
		b = b.split(",");
		for( var i = 0; i < 4; i++ ) {

			var vals = b[ i ].split(" ");
			s = s + "<" + JExcel.borderKind[ i ];
			if( vals[ 0 ] == "NONE" ) {

				s = s + "/>";

			} else {

				var border = JExcel.borderStyles[ JExcel.borderStylesUpper.indexOf( vals[ 0 ] ) ];
				if( border ) {

					s = s + ' style="' + border + '" >' + (vals[1] != "NONE" ? '<color rgb="FF' + vals[1].substring(1) + '"/>' : '');

				} else {

					s = s + ">";
				}
				s = s + "</" + JExcel.borderKind[i] + ">";
			}
		}

		return s + "<diagonal/></border>";
	};

	this.toStyleXml = function( style ) {

		var alignXml = "";

		if( style.align ) {

			var h = JExcel.align[ style.align.charAt( 0 ) ];
			var v = JExcel.align[ style.align.charAt( 1 ) ];
			if( h || v ) {

				alignXml = "<alignment ";

				if( h ) alignXml = alignXml + ' horizontal="' + h + '" ';
				if( v ) alignXml = alignXml + ' vertical="' + v + '" ';

				alignXml = alignXml + " />";
			}
		}

		var s = '<xf numFmtId="' + style.format + '" fontId="' + style.font + '" fillId="' + style.fill + '" borderId="' + style.border + '" xfId="0" ';
	
		if( style.border != 0 ) s = s + ' applyBorder="1" ';
		if( style.format >= JExcel.baseFormats ) s = s + ' applyNumberFormat="1" ';
		if( style.fill != 0 ) s = s + ' applyFill="1" ';
		if( alignXml != "" ) s = s + ' applyAlignment="1" ';
	
		s = s + '>';
		s = s + alignXml;
	
		return s + "</xf>";
	};


	if( ! defaultFont ) defaultFont = "Calibri Light 12 0000EE";
	this.add( { font: defaultFont } );
};

JExcel.Util = {

	isObject : function( v ) {

		return (v !== null && typeof v === 'object');
	}

,	replaceAll : function( where, search, replacement ) {

		return where.split( search ).join( replacement );
	}

,	replaceAllMultiple : function( where, search, replacement ) {

		while( where.indexOf( search ) != -1 ) {

			where = this.replaceAll( where, search, replacement );
		}

		return where;
	}

,	pushI : function( list, value ) {

		list.push( value );
		return list.length - 1;
	}

,	setV : function( list, index, value ) {

		list[ index ] = value;
		return value;
	}
};

var reUnescapedHtml = /[&<>"']/g;
var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
var htmlEscapes = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;'
};

function basePropertyOf( object ) {

	return function( key ) {

		return object == null ? undefined : object[ key ];
	};
}

var escapeHtmlChar = basePropertyOf( htmlEscapes );

function escape( string ) {

	if( typeof string != 'string' ) string = null ? '' : ( string + '' );

	return ( string && reHasUnescapedHtml.test( string ) )
		? string.replace( reUnescapedHtml, escapeHtmlChar )
		: string;
}

//function getArray(v) {
//	if (!v) return undefined;
//	return (v.constructor === Array) ? v.slice() : undefined;
//}

//function pushV(list, value) {
//	list.push(value);
//	return value;
//}

function setSheet(value, style, size) {
	this.name = value;// The only think that we can set in a sheet Is the name
}

function getRow(y) {
	return ( this.rows[ y ] ? this.rows[ y ] : JExcel.Util.setV( this.rows, y, { cells: [] } ) );// If there is a row return it, otherwise create it and return it
}

function setRow(row, value, style) {
	if (value && !isNaN(value)) row.ht = value;
	if (style) row.style = style;
}

function getColumn( x ) {
	return ( this.columns[ x ] ? this.columns[ x ] : JExcel.Util.setV( this.columns, x, {} ) );// If there is a column return it, otherwise create it and return it
}

function setColumn( column, value, style ) {
	if( value != undefined ) column.wt = value;
	if( style ) column.style = style;
}

function getCell(x, y) {
	var row = this.getRow(y).cells;// Get the row a,d its DATA component
	return (row[x] ? row[x] : JExcel.Util.setV(row, x, {}));
}

function setCell(cell, value, style) {
	if( value != undefined ) cell.v = value;
	if( style ) cell.s = style;
}
