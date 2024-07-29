
//Import modules:

	import 'ol/ol.css';
	import modmap from 'ol/Map';
	import modview from 'ol/View';
	import {click, pointerMove, altKeyOnly} from 'ol/events/condition';
	import GeoJSON from 'ol/format/GeoJSON';
	import Select from 'ol/interaction/Select';
	import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
	import modsourceosm, {modsourceattribution} from 'ol/source/OSM';

	import modsourcevector from 'ol/source/Vector';
	import modformatgpx from 'ol/format/GPX';
	import modlayertile from 'ol/layer/Tile';
	import modlayervector from 'ol/layer/Vector';
	import modstylecircle from 'ol/style/Circle';
	import modstylefill from 'ol/style/Fill';
	import modstylestroke from 'ol/style/Stroke';
	import modstylestyle from 'ol/style/Style';
	import modstyleicon from 'ol/style/Icon';
	import modstyletext from 'ol/style/Text';
	import modfeature from 'ol/Feature';
	import modgeomcircle from 'ol/geom/Circle';
	import modgeompoint from 'ol/geom/Point';
	import {fromLonLat as modfromlonglat} from 'ol/proj';

	//import modprojtransform from 'ol/proj/transform';
	import{toLonLat as modprojtolonlat} from 'ol/proj';
	//https://wangchujiang.com/hotkeys/
	import hotkeys from 'hotkeys-js';




//Simple Variable declarations:
	const oHttps = require('https');
	var oJsonConfig;
	var oJsonImages;
	//var oLonLatCentreInitial = [-1.386749, 50.917406];			//Initial map centre location
	//var sLongitudeAircraftIcon = '-1.424260';					//initial circle highlight longitude
	//var sLatitudeAircraftIcon = '51.130907';						//initial circle highlight latitude
	var sLongitudeAircraftIcon = '0.1';					//initial circle highlight longitude
	var sLatitudeAircraftIcon = '0.1';						//initial circle highlight latitude
	var ostyleAircraftIcon;

	var iImageSequenceNumber = 1;
	var sMoveDirectionForwardsBackwards = 'SetDataTypeAsString';
		sMoveDirectionForwardsBackwards = '';
	var sDateTimeUTC = 'SetDataTypeAsString';
		sDateTimeUTC = '';
	var sDateTimeFromImageNameUTC = 'SetDataTypeAsString';
		sDateTimeFromImageNameUTC = '';
	var sDisplayTimeYesNo = 'No';
	var sImageToggleStateLargeSmall = 'Small';
	var sApplicationRootPath = 'SetDataTypeAsString';
	var sInitialImagePath = 'SetDataTypeAsString';
	var sAircraftIconImagePath = 'SetDataTypeAsString';
	var sImageFullPath = 'SetDataTypeAsString';
	var sImageFullPathDisplayOnly = 'SetDataTypeAsString';
	var sImageRoot = 'SetDataTypeAsString';
	var sImageInfo = 'SetDataTypeAsString';
	var sFlightId = 'SetDataTypeAsString';
		sFlightId = "";
	var sImageFrameNum = 'SetDataTypeAsString';
		sImageFrameNum = "";
	var sHeading = 'SetDataTypeAsString';
	var sSpeed = 'SetDataTypeAsString';
	var sImageFlightAndNameLarge = 'SetDataTypeAsString';
	var sImagePath = 'SetDataTypeAsString';
	var oTimeFromGpxFile = [];
	var oViewer;
	var sImageClass = '';
	var sAltitudeMeters = '';
	var sAltitudeFeetQNH = '';
	var sRateOfAscentFeetPerMinute = '';
	var sLatitude = '';
	var sLongitude = '';
	var sLatitudeNorS = '';
	var sLongitudeEorW = '';
	var sLatitudeDMS = '';
	var sLongitudeDMS = '';
	var sGoogleMapsURL = '';
	var sSjc = '';
	//var iPanoHorizonRoll = 0;
	//var iPanoPitch = 0;
	//var iPanoYaw = 0;
	//var iPanoHorizonPitch = 0;
	var sUserAgent;
	var sDevicePCOrMobile;
	var iDisplayModeNumber = 2; //0 for not set. 1 for hDivImage, 2 for hDivMap, 3 for hDivInfo. Initial value = 2, for Map.
	var iDisplayModeNumberLocal = 0;
	var iStylePointImageRadius = 1;
	var fLongitudeAircraftIcon = 0.0; //float
	var fLatitudeAircraftIcon = 0.0; //float
	var fLatitudeTemp = 0.0; //float
	var fLongitudeTemp = 0.0; //float
	var fHeading = 0.0; //float
	var oUrlParameters;
	var sUrlPara1 = 'SetDataTypeAsString';
	var sUrlFlightId = 'SetDataTypeAsString';
	var sUrlImageFrameNum = 'SetDataTypeAsString';
	var sUrlImageSequenceNum = 'SetDataTypeAsString';

	var sUrlImagePitch = 'SetDataTypeAsString';
	var sUrlImageYaw = 'SetDataTypeAsString';
	var sUrlImageZoom = 'SetDataTypeAsString';
	var sUrlImageHorizonRoll = 'SetDataTypeAsString';
	var sUrlImageHorizonPitch = 'SetDataTypeAsString';

	//var fMapZoom = 0;
	var sLogMessage = 'SetDataTypeAsString';
	var sOutputMessage = 'SetDataTypeAsString';
	var oOrigin = window.location.origin;     //https://millersql.com                                         or https://wingvista.org
	var oHref = window.location.href;         //https://millersql.com/Pages/WingVista/index.html?para1=admin  or https://wingvista.org
	var sHref = 'SetDataTypeAsString'; //
	//var sOrigin = 'SetDataTypeAsString';
	var oJsonImagesB;
	var sFlightAndFrameNum = "SetDataTypeAsString";
	var sImageSequenceNumFromFlightAndFrame = "SetDataTypeAsString";
	var sImageSequenceNumber = "SetDataTypeAsString";
	var sDirectLinkURL = "SetDataTypeAsString";
	var sReadRawImagePitch = "SetDataTypeAsString";
	var sReadRawImageYaw = "SetDataTypeAsString";
	var sReadRawImageZoom = "SetDataTypeAsString";
	var sReadRawImageHorizonRoll  = "SetDataTypeAsString";
	var sReadRawImageHorizonPitch = "SetDataTypeAsString";
	var iImageZoom = 0;
	var iImageYaw = 0;
	var iImagePitch = 0;
	var iImageHorizonRoll = 0;
	var iImageHorizonPitch = 0;
	var iResetSphericalVariables = 0;
	var fMapZoom = 0.1;
	var sUrlView = "SetDataTypeAsString";
	//var iView = 0;
	var iToStandardFormat = -997;
	var sAxis = "SetDataTypeAsString";
	var iInput = -996;
	var sURLMapLatitude = "SetDataTypeAsString";
	var sURLMapLongitude = "SetDataTypeAsString";
	var sReadMapLatitude = "SetDataTypeAsString";
	var sReadMapLongitude = "SetDataTypeAsString";
	var fMapLatitude = 0.1;
	var fMapLongitude = 0.1;
	var sURLMapZoom = "SetDataTypeAsString";
	var oLonLatCentre = [0,0];
	var sView = 'SetDataTypeAsString';
	var sViewNew = 'SetDataTypeAsString';
	var sViewLocal = 'SetDataTypeAsString';
	var iPushUrl = 0;
	var fCompassNorthOffset = 0.001;

	oJsonConfig = require('./config/config_json.json');
	oJsonImages = require('./JsonData/JsonImages.json');

	sApplicationRootPath = oJsonConfig.JsonConfig[0].applicationrootpath;

	sInitialImagePath = 'InitialNullImageDoNotDelete.jpg';
	sAircraftIconImagePath = 'AircraftIcon.png';
	sImageRoot = 'WingVistaImages'
	oUrlParameters = new URLSearchParams(window.location.search); // read the parameters supplied in the URL




// Complex variable declarations:
	var oLonLatAircraftIcon = [fLongitudeAircraftIcon, fLatitudeAircraftIcon];


	var oGeometryAircraftIcon = new modgeompoint(modfromlonglat(oLonLatAircraftIcon)
	);


	var oFeatureAircraftIcon = new modfeature({
		geometry: new modgeompoint(
			modfromlonglat(oLonLatAircraftIcon)
		),
	});
	

	var oSourceVectorAircraftIcon = new modsourcevector({
	  features: [oFeatureAircraftIcon]
	});


	var oLayerVectorAircraftIcon = new modlayervector({
	  source: oSourceVectorAircraftIcon,
	  style: function(feature) {
		return ostyleAircraftIcon[feature.getGeometry().getType()];
	  }
	});


	var oLayerBackgroundMap = new modlayertile({
			  source: new modsourceosm({
				attributions: [
					//'All maps copyright <a href="https://www.thunderforest.com/">www.thunderforest.com</a>'
					'&#64; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					//'All maps copyright <a href="https://www.opentopomap.com/">www.opentopomap.com</a>'
					]
				//opaque: false,
				//, url: 'MapTiles/{z}/{x}/{y}.png'  //use this
					//, url: 'https://millersql.com/Pages/WingVista/MapTiles/{z}/{x}/{y}.png'
				//, url: 'https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=2544cf962e584ed88558243d90cb03b2'
				//, url: 'https://tile.opentopomap.org/{z}/{x}/{y}.png'
				//, url: 'https://millersql.com/Pages/WingVista/OpenStreetMapTiles/{z}/{x}/{y}.png'
				, url: 'OpenStreetMapTiles/{z}/{x}/{y}.png'
			  }),
		})


	var ostyleGpxPoints; //The value of this style variable is assigned further down the script


	var oLayerVectorGpx = new modlayervector({
			source: new modsourcevector({
				url: 'data/gpx/Departures.gpx.txt',
				format: new modformatgpx()
			}),
			style: function(feature) {
				//ostyleGpxPoints.getText().setText(feature.get('text'));
				//ostyleGpxPoints.setText("john");
				var oStyleLocal;
				oStyleLocal = ostyleGpxPoints[feature.getGeometry().getType()];
				//oStyleLocal = ostyleGpxPoints.getText().setText(feature.get('text'));
				//return ostyleGpxPoints[feature.getGeometry().getType()];
				return oStyleLocal;
			}
	});




//Function definitions:
	var functionRenderImage = function(iImageSequenceNumberLocal) {
			sImageInfo = oJsonImages.JsonImages[iImageSequenceNumberLocal].i;

			sImageFrameNum = sImageInfo.substring(1+sImageInfo.indexOf("/"),sImageInfo.indexOf("_"));
			sFlightId = sImageInfo.substring(1+sImageInfo.indexOf("_"),sImageInfo.indexOf("_CLA_"));
			sImageClass = sImageInfo.substring(5+sImageInfo.indexOf("_CLA_"),sImageInfo.indexOf("_UTC_"));
			sAltitudeMeters = sImageInfo.substring(5+sImageInfo.indexOf("_ELE_"),sImageInfo.indexOf("_ASC_"));
			sRateOfAscentFeetPerMinute = sImageInfo.substring(5+sImageInfo.indexOf("_ASC_"),sImageInfo.indexOf("_LAT_"));

			if (sAltitudeMeters == '-50000')
			{
				sAltitudeFeetQNH = 'Unavailable'
			}
			else
			{
				sAltitudeFeetQNH = Math.round(3.28084*parseFloat(sAltitudeMeters))
			}

			if (sRateOfAscentFeetPerMinute == '-60000')
			{
				sRateOfAscentFeetPerMinute = 'Unavailable'
			}

			sLatitude = sImageInfo.substring(5+sImageInfo.indexOf("_LAT_"),sImageInfo.indexOf("_LON_"));
			sLongitude = sImageInfo.substring(5+sImageInfo.indexOf("_LON_"),sImageInfo.indexOf("_HDG_"));
			sHeading = sImageInfo.substring(5+sImageInfo.indexOf("_HDG_"),sImageInfo.indexOf("_KNO_"));
			sSpeed = sImageInfo.substring(5+sImageInfo.indexOf("_KNO_"),sImageInfo.indexOf("_SJC_"));
			sSjc = sImageInfo.substring(5+sImageInfo.indexOf("_SJC_"),sImageInfo.length);

			//if (sImageClass == 'W')
			//{
			//	//iPanoHorizonRoll = 180;
			//	//iPanoPitch = -30;
			//	//iPanoHorizonPitch = 0;
			//	//iPanoYaw = 180;
			//}
			//
			//if (sImageClass == 'U')
			//{
			//	//iPanoHorizonRoll = 180;
			//	//iPanoPitch = -30;
			//	//iPanoHorizonPitch = 0;
			//	//iPanoYaw = 0;
			//}
			//
			//if (sImageClass == 'S')
			//{
			//	//iPanoHorizonRoll = 0;
			//	//iPanoPitch = -20;
			//	//iPanoHorizonPitch = -35;
			//	//iPanoYaw = 0;
			//}

			var sLatLonLocal = oJsonImages.JsonImages[iImageSequenceNumberLocal].p;
			sLatitudeAircraftIcon = sLatLonLocal.substring(0,sLatLonLocal.indexOf("_"));
			sLongitudeAircraftIcon = sLatLonLocal.substring(1+sLatLonLocal.indexOf("_"),sLatLonLocal.length);

			sImagePath = oJsonImages.JsonImages[iImageSequenceNumberLocal].k;

			sImageFullPath = sImageRoot + '/P/' + sImagePath + '/' + '%l/%s%y_%x';
			sImageFullPathDisplayOnly = sImageRoot.substring(0,sImageRoot.indexOf(".com")) + ' ... /' + sImagePath + '/' + '%l/%s%y_%x';

			fLatitudeTemp = sLatitude;
			if (fLatitudeTemp >= 0) {sLatitudeNorS='N';} else {sLatitudeNorS='N';}
			fLatitudeTemp = Math.abs(fLatitudeTemp)
			sLatitudeDMS = Math.floor(fLatitudeTemp) + '%C2%B0'; //degrees
			fLatitudeTemp = 60.0 * (fLatitudeTemp - Math.floor(fLatitudeTemp))
			sLatitudeDMS = sLatitudeDMS + Math.floor(fLatitudeTemp) + '%27'
			fLatitudeTemp = 60.0 * (fLatitudeTemp - Math.floor(fLatitudeTemp))
			sLatitudeDMS = sLatitudeDMS + Math.floor(fLatitudeTemp) + '%22'
			sLatitudeDMS = sLatitudeDMS + sLatitudeNorS

			fLongitudeTemp = sLongitude;
			if (fLongitudeTemp >= 0) {sLongitudeEorW='E';} else {sLongitudeEorW='W';}
			fLongitudeTemp = Math.abs(fLongitudeTemp)
			sLongitudeDMS = Math.floor(fLongitudeTemp) + '%C2%B0'; //degrees
			fLongitudeTemp = 60.0 * (fLongitudeTemp - Math.floor(fLongitudeTemp))
			sLongitudeDMS = sLongitudeDMS + Math.floor(fLongitudeTemp) + '%27'
			fLongitudeTemp = 60.0 * (fLongitudeTemp - Math.floor(fLongitudeTemp))
			sLongitudeDMS = sLongitudeDMS + Math.floor(fLongitudeTemp) + '%22'
			sLongitudeDMS = sLongitudeDMS + sLongitudeEorW

			//fMapZoom = Math.round(oMap.getView().getZoom());
			fMapZoom = oMap.getView().getZoom();

			sGoogleMapsURL = 'https://www.google.com/maps/place/@' + sLatitude + ',' + sLongitude + ',' + fMapZoom + 'z'

			if (sDisplayTimeYesNo == 'No')
			{
				sDateTimeUTC = '';
			}

			if (iResetSphericalVariables == 1)
			{
				iImageZoom = 120;
				iImageYaw = 0;
				iImagePitch = 999;
				iImageHorizonRoll = 0; //iPanoHorizonRoll;
				iImageHorizonPitch = 999;
			}

			if (iImageHorizonRoll == 999)
			{
				iImageHorizonRoll = 0; //iPanoHorizonRoll;
			}

			if (iImageYaw == 999)
			{
				iImageYaw = 0;
			}

			if ((iImagePitch == 999) && (sImageClass == 'U' || sImageClass == 'W'))
			{
				iImagePitch = -30;
			}

			if ((iImagePitch == 999) && (sImageClass == 'S'))
			{
				iImagePitch = -20;
			}

			if ((iImageHorizonPitch == 999) && (sImageClass == 'U' || sImageClass == 'W'))
			{
				iImageHorizonPitch = 0;
			}

			if ((iImageHorizonPitch == 999) && (sImageClass == 'S'))
			{
				iImageHorizonPitch = -35;
			}

			functionPushUrl();

			sOutputMessage = ''
				+ '<br>Direct link: ' + '<a href=' + sDirectLinkURL + '>' + sDirectLinkURL + '</a>'
				+ '<br>sImagePath: ' + sImageFullPathDisplayOnly
				+ '<br>Image Info: ' + sImageInfo
				+ '<br>sImageClass: ' + sImageClass
				+ '<br>iFlightId: <b>' + sFlightId
				+ '</b><br>iImageFrameNum: <b>' + sImageFrameNum + '</b>'
				+ '<br>iImageSequenceNumber: ............. ' + iImageSequenceNumberLocal.toString()
				+ '<br>sDateTimeUTC: ............. ' + sDateTimeUTC
				+ '<br>sLatitude: ' + sLatitude
				+ '<br>sLongitude: ' + sLongitude
				+ '<br>sAltitudeFeetQNH: <b>' + sAltitudeFeetQNH + '</b>'
				+ '<br>sRateOfAscentFeetPerMinute: <b>' + sRateOfAscentFeetPerMinute + '</b>'
				+ '<br>sHeading: <b>' + sHeading + '</b>'
				+ '<br>sSpeed (groundspeed in Knots): <b>' + sSpeed + '</b>'
				+ '<div style="color:' + sSjc + '">' + 'sSjc: ' + sSjc + '</div>'
				+ '<br>sDevicePCOrMobile: ' + sDevicePCOrMobile
				+ '<br>fMapZoom: ' + fMapZoom
				+ '<br>'
				+ '<br>Icons made by <a href="https://www.freepik.com" title="Freepik"><b>Freepik</b></a> from <a href="https://www.flaticon.com/" title="Flaticon"><b>www.flaticon.com</b></a>'
				+ '<br>360 panoramic image viewer by <a href="https://pannellum.org/" title="Pannellum"><b>Pannellum.org</b></a>'
				+ '<br>Map by <a href="https://www.openstreetmap.org/" title="openstreetmap"><b>openstreetmap.org</b></a> '
				+ '. Data is available under the <a href="https://www.openstreetmap.org/copyright"><b>Openstreetmap Open Database License</b></a>'
				+ '<br>Images and associated data copyright <b>WingVista owner</b>. Website and service strictly not for profit.'
				+ '<br>'
				+ '<br>Contact: <a href="mailto:wingvista.org@gmail.com"><b>wingvista.org@gmail.com</b></a>'
				+ '';


			functionSetAircraftIcon(sLongitudeAircraftIcon, sLatitudeAircraftIcon, sHeading);
			document.getElementById('hDivOutput').innerHTML = sOutputMessage;
			//document.getElementById("hDivImage").style.display = 'block';	//"block" means show the div. "none" means hide the div.
			//iDisplayModeNumber = 1;  //0 for not set. 1 for hDivImage, 2 for hDivMap, 3 for hDivInfo
			//functionSetDisplayMode(1); //need to set the display mode to 1 for image initially, then display the image, and only then change the display mode to something else in around 40 lines time.
			functionSetView("image", 0); //Set to image but don't push to the URL

			functionLogNow();

			if (sImageClass == 'W')
			{
				fCompassNorthOffset = 180.0;
			}
			
			fCompassNorthOffset = fCompassNorthOffset + parseFloat(sHeading);

			if (fCompassNorthOffset > 360.0)
			{
				fCompassNorthOffset = fCompassNorthOffset - 360.0;
			}
			
			if (sImageClass == 'S' || sImageClass == 'U' || sImageClass == 'W')
			{
				oViewer.destroy;
				oViewer = pannellum.viewer('hDivImage', {
					  "type": "multires"
					, "autoLoad": true
					, "pitch": iImagePitch //0, iPanoPitch
					, "yaw": functionConvertPanoValues(-1, sImageClass, "imageYaw", iImageYaw) //iPanoYaw
					, "hfov": iImageZoom //120
					, "friction": 1.0
				 	, "horizonRoll": functionConvertPanoValues(-1, sImageClass, "horizonRoll", iImageHorizonRoll) //iImageHorizonRoll//iPanoHorizonRoll //0 //180
				 	, "horizonPitch": iImageHorizonPitch //iPanoHorizonPitch //-45
					, "compass": true
					, "northOffset": fCompassNorthOffset //1.0
					, "multiRes": {
						  "path": sImageFullPath
						, "fallbackPath": "/fallback/%s"
						, "extension": "jpg"
						, "tileResolution": 512
						, "maxLevel": 4
						, "cubeResolution": 2288
					}
				});
			}

			sDisplayTimeYesNo = 'No';
			sMoveDirectionForwardsBackwards = '';


			if (sView != "image")
			{
				functionSetView(sView, 1);
			}


	};	//End of functionRenderImage


	var functionSetAircraftIcon = function(sLongitudeAircraftIcon, sLatitudeAircraftIcon, sHeading) {
			fLongitudeAircraftIcon = parseFloat(sLongitudeAircraftIcon);
			fLatitudeAircraftIcon = parseFloat(sLatitudeAircraftIcon);
			fHeading = parseFloat(sHeading);
			oLonLatAircraftIcon = [fLongitudeAircraftIcon, fLatitudeAircraftIcon];
			oGeometryAircraftIcon = new modgeompoint(modfromlonglat(oLonLatAircraftIcon));
			ostyleAircraftIcon = {
					'Point': new modstylestyle({
						image: new modstyleicon({
							  anchor: [0.5, 0.5]
							, anchorXUnits: 'fraction'
							, anchorYUnits: 'pixels'
							, src: [sAircraftIconImagePath] //'https://millersql.com/Pages/WingVista/aircraft_icon_2.png'
							, rotation: fHeading * 0.0174533 //degrees to radians
						  })
					})
				};
			oFeatureAircraftIcon.setGeometry (oGeometryAircraftIcon);
	};


	var functionDotClick = function(pixel) {
		iResetSphericalVariables = 1;
		//iView = 1;

		var oPixelFeatures = [];
		oMap.forEachFeatureAtPixel(pixel, function(feature) {
			  oPixelFeatures.push(feature);
			});

		var oImageSequenceNumber = [];
		oTimeFromGpxFile = [];
		var i, ii;
		for (i = 0, ii = oPixelFeatures.length; i < ii; ++i) {
			oImageSequenceNumber.push(oPixelFeatures[i].get('desc'));
			oTimeFromGpxFile.push(oPixelFeatures[i].get('cmt'));
		}
		sImageSequenceNumber = oImageSequenceNumber[0] || '(unknown)';
		if (parseInt(sImageSequenceNumber) >= 1) {
			iImageSequenceNumber = parseInt(sImageSequenceNumber);
		};
		if (sImageSequenceNumber != '(unknown)') {
			sDateTimeUTC = oTimeFromGpxFile[0] || '(unknown)';
			sDisplayTimeYesNo = 'Yes';
			sView = "image";
			functionRenderImage(iImageSequenceNumber); 
		};
	};


	var functionMoveForwardsBackwards = function(sMoveDirectionForwardsBackwardsLocal) {
			sMoveDirectionForwardsBackwards = sMoveDirectionForwardsBackwardsLocal;
			if (sMoveDirectionForwardsBackwardsLocal == 'forwards') {
				iImageSequenceNumber = iImageSequenceNumber + 1;
				}
			if (sMoveDirectionForwardsBackwardsLocal == 'backwards') {
				iImageSequenceNumber = iImageSequenceNumber - 1;
				}
			
			iResetSphericalVariables = 1;
			sView = "image";

			functionRenderImage(iImageSequenceNumber);
	};


	// This function, when called, toggles between map, photo, and information display screens.
	var functionSetView = function(sViewLocal, iPushUrl) {
		//iDisplayModeNumberLocal - this function's argument. Values: 0 for toggle (increasing), 1 for hDivImage, 2 for hDivMap, 3 for hDivInfo

		sViewNew = "";

		if ((sViewLocal == "toggle") && (sView == "map")) {
			sViewNew = "image";
			}

		if ((sViewLocal == "toggle") && (sView == "image")) {
			sViewNew = "info";
			}

		if ((sViewLocal == "toggle") && (sView == "info")) {
			sViewNew = "map";
			}

		if (sViewLocal != "toggle") {
			sViewNew = sViewLocal;
			}

		if (sViewNew == "image") {
			oMap.setTarget(null)
			document.getElementById('hDivMap').style.display = "none";
			document.getElementById('hDivInfo').style.display = "none";
			document.getElementById('hDivImage').style.display = "block";
			}
		if (sViewNew == "map") {
			document.getElementById('hDivImage').style.display = "none";
			document.getElementById('hDivInfo').style.display = "none";
			document.getElementById('hDivMap').style.display = "block";
			oMap.setTarget('hDivMap') 
			oMap.updateSize()
			}
		if (sViewNew == "info") {
			document.getElementById('hDivImage').style.display = "none";
			document.getElementById('hDivMap').style.display = "none";
			document.getElementById('hDivInfo').style.display = "block";
			}

		if (iPushUrl == 1)
		{
			sView = sViewNew;
			functionPushUrl();
		}

	};


	var functionOpenGoogleMapsHere = function() {
		//fMapZoom = Math.round(oMap.getView().getZoom());
		fMapZoom = oMap.getView().getZoom();
		//sGoogleMapsURL = 'https://www.google.com/maps/place/@' + sLatitude + ',' + sLongitude + ',' + fMapZoom + 'z'
		sGoogleMapsURL = 'https://maps.google.com/?q=' + sLatitude + ',' + sLongitude + '&ll=' + + sLatitude + ',' + sLongitude + '&z=' + fMapZoom
		window.open(sGoogleMapsURL);
	};


	var functionToggleImage = function() {
			oViewer.toggleFullscreen();
	};


	var functionSequenceNumFromFlightAndFrame=function(oJsonImagesB, sFlightAndFrameNum){
		for(var j = 0; j < oJsonImagesB.length; j++) {
			if (oJsonImagesB[j]['i'].substring(0, oJsonImagesB[j]['i'].indexOf("_"))==sFlightAndFrameNum){
				return j;
			}
		}
		return ""; //This means no match found
	}


	var functionConvertPanoValues=function(iToStandardFormat, sImageClass, sAxis, iInput){
		var iOutput = 995;
		//functionConvertPanoValues=function(-1, sImageClass, "horizonRoll", iImageHorizonRoll)
		if ((sAxis == "horizonRoll") && (sImageClass == 'U' || sImageClass == 'W'))
		{
			iOutput = iInput + (-1*iToStandardFormat*180); //180
			if (iOutput > 360) {iOutput = iOutput - 360;}
			if (iOutput < 0) {iOutput = iOutput + 360;}
		}

		if ((sAxis == "horizonRoll") && (sImageClass == 'S'))
		{
			iOutput = iInput;
			if (iOutput > 360) {iOutput = iOutput - 360;}
			if (iOutput < 0) {iOutput = iOutput + 360;}
		}
		
		if ((sAxis == "imageYaw") && (sImageClass == 'U' || sImageClass == 'S'))
		{
			iOutput = iInput;
			if (iOutput > 180) {iOutput = iOutput - 360;}
			if (iOutput < -180) {iOutput = iOutput + 360;}
		}

		if ((sAxis == "imageYaw") && (sImageClass == 'W'))
		{
			iOutput = iInput + (-1*iToStandardFormat*180); //180
			if (iOutput > 180) {iOutput = iOutput - 360;}
			if (iOutput < -180) {iOutput = iOutput + 360;}
		}

		return iOutput;
	}


	var functionGetImageAxisAndMapValues=function(){

		sReadRawImagePitch = oViewer.getPitch();
		sReadRawImageYaw = oViewer.getYaw();
		sReadRawImageZoom = oViewer.getHfov();
		sReadRawImageHorizonRoll = oViewer.getHorizonRoll();
		sReadRawImageHorizonPitch = oViewer.getHorizonPitch();
		iImagePitch = parseInt(sReadRawImagePitch);
		//iImageYaw = parseInt(sReadRawImageYaw);
		iImageYaw = functionConvertPanoValues(1, sImageClass, "imageYaw", parseInt(sReadRawImageYaw));
		iImageZoom = parseInt(sReadRawImageZoom);
		//iImageHorizonRoll = parseInt(sReadRawImageHorizonRoll);
		iImageHorizonRoll = functionConvertPanoValues(1, sImageClass, "horizonRoll", parseInt(sReadRawImageHorizonRoll));
		iImageHorizonPitch = parseInt(sReadRawImageHorizonPitch);
		//alert("sReadRawImagePitch: " + sReadRawImagePitch
		//	+ " sReadRawImageYaw: " + sReadRawImageYaw
		//	+ " sReadRawImageZoom: " + sReadRawImageZoom
		//	+ " sReadRawImageHorizonRoll: " + sReadRawImageHorizonRoll
		//	+ " sReadRawImageHorizonPitch: " + sReadRawImageHorizonPitch
		//);

		//fMapZoom = Math.round(oMap.getView().getZoom());
		fMapZoom = oMap.getView().getZoom();

		//alert(modprojtolonlat(oMap.getView().getCenter()));

		fMapLongitude = modprojtolonlat(oMap.getView().getCenter())[0];
		fMapLatitude = modprojtolonlat(oMap.getView().getCenter())[1];

		functionPushUrl();

		functionLogNow();

		return null;
	}


	var functionPushUrl=function(){
		sDirectLinkURL = sHref 
			+ '&view=' + sView
			+ '&flight=' + sFlightId 
			+ '&frame=' + sImageFrameNum
			+ '&imageyaw=' + iImageYaw.toString()
			+ '&imagepitch=' + iImagePitch.toString()
			+ '&imagezoom=' + iImageZoom.toString()
			+ '&maplatitude=' + fMapLatitude.toString()
			+ '&maplongitude=' + fMapLongitude.toString()
			+ '&mapzoom=' + fMapZoom.toString()
			+ '&imagehorizonroll=' + iImageHorizonRoll.toString()
			+ '&imagehorizonpitch=' + iImageHorizonPitch.toString()
			+ '&para1=' + sUrlPara1
			;
		history.pushState({}, null, sDirectLinkURL);
		return null;
	}


	var functionLogNow=function(){

		sLogMessage = '';

		sLogMessage = 
			  sDirectLinkURL.replace(/&/g, '%26')
			+ ' sUrlPara1: ' + sUrlPara1
			+ ' sHref: ' + sHref 
			+ ' sImageInfo: ' + sImageInfo 
			+ ' sDevicePCOrMobile: ' + sDevicePCOrMobile //sDevicePCOrMobile
			+ ' fMapZoom: ' + fMapZoom //fMapZoom
			//+ ' URL: ' //+ sDirectLinkURL.replace(/&/g, '%26')
			;

		try {
		  oHttps.get('https://millersql.com/Pages/WingVista/logging.asp?sLogText=' + sLogMessage, (resp) => {});
		} catch (error) {
		}

		return null;
	}





//Start of Program;
	sUserAgent = navigator.userAgent;
		//Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36
		//Mozilla/5.0 (Linux; Android 10; SM-A405FN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36
		//if (sUserAgent == 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36')


	if (sUserAgent.includes('Android'))
		{
			sDevicePCOrMobile = 'Device Type: Mobile';
			document.getElementById('hDivMap').style.height = "230px";
			document.getElementById('hDivImage').style.height = "230px";
			iStylePointImageRadius = 18;
		}
		else
		{
			sDevicePCOrMobile = 'Device Type: PC';
			document.getElementById('hDivMap').style.height = "850px";
			document.getElementById('hDivImage').style.height = "850px";
			iStylePointImageRadius = 6;
		};




//	ostyleGpxPoints: (function() {
//		var style = new modstylestyle({
//			image: new modstylecircle({
//				fill: new modstylefill({
//					  color: 'rgba(0,0,255,0.4)'
//					})
//				, radius: iStylePointImageRadius  //18  48
//				, stroke: new modstylestroke({
//					  color: '#ff0'
//					, width: 1
//					})
//			})
//
//			,stroke: new modstylestroke({
//				color: '#f00',
//				width: 1
//			})
//
//			,text: new modstyletext({
//				text: 'Hello',
//				scale: 1.3,
//				fill: new modstylefill({
//				  color: '#000000'
//				}),
//				stroke: new modstylestroke({
//				  color: '#FFFF99',
//				  width: 3.5
//			})
//		  })
//		});
//		var styles = [style];
//		return function(feature, resolution) {
//		  style.getText().setText(feature.get("text"));
//			return ostyleGpxPoints[feature.getGeometry().getType()];
//		  return styles;
//		};
//	  })()




	ostyleGpxPoints = {
		'Point': new modstylestyle({
			image: new modstylecircle({
				fill: new modstylefill({
					  color: 'rgba(0,0,255,0.4)'
					})
				, radius: iStylePointImageRadius  //18  48
				, stroke: new modstylestroke({
					  color: '#ff0'
					, width: 1
					})
			})
		})

		,'LineString': new modstylestyle({
			stroke: new modstylestroke({
				color: '#f00',
				width: 1
			})
		})

		,'text': new modstylestyle({
			text: new modstyletext({
				font: '12px Calibri,sans-serif',
				fill: new modstylefill({
				  color: '#000',
				}),
				stroke: new modstylestroke({
				  color: '#fff',
				  width: 3,
				})
			})
		})

	};


	oViewer = pannellum.viewer('hDivImage', {
		  "type": "equirectangular"
		, "panorama": sInitialImagePath
		, "autoLoad": true
		, "pitch": 0//iPanoPitch
		, "yaw": 0
		, "hfov": 120
		, "friction": 1.0
		, "horizonRoll": 0 //iPanoHorizonRoll
		, "horizonPitch": 0 //iPanoHorizonPitch
	});


	sUrlPara1 = oUrlParameters.get('para1');
	sUrlFlightId = oUrlParameters.get('flight');
	sUrlImageFrameNum = oUrlParameters.get('frame');

	sURLMapLatitude = oUrlParameters.get('maplatitude');
	sURLMapLongitude = oUrlParameters.get('maplongitude');
	sURLMapZoom = oUrlParameters.get('mapzoom');

	sUrlImageSequenceNum = oUrlParameters.get('imageseqno');
	sUrlView = oUrlParameters.get('view');

	sUrlImagePitch = oUrlParameters.get('imagepitch');
	sUrlImageYaw = oUrlParameters.get('imageyaw');
	sUrlImageZoom = oUrlParameters.get('imagezoom');
	sUrlImageHorizonRoll = oUrlParameters.get('imagehorizonroll');
	sUrlImageHorizonPitch = oUrlParameters.get('imagehorizonpitch');

	//if (sUrlView == "image")
	//{
	//	iView = 1;
	//}
	//
	//if (sUrlView == "map")
	//{
	//	iView = 2;
	//}
	//
	//if (sUrlView == "info")
	//{
	//	iView = 3;
	//}


	sHref = oHref.toString();
	sHref = sHref + "?";
	sHref = sHref.substring(0, sHref.indexOf("?")) + "?";

	if (sUrlPara1 == null){
		sUrlPara1 = "wingvista";
	}
	//else
	//{
	//	sHref = sHref + "para1=" + sUrlPara1;
	//}

	if (sUrlView == null)
	{
		sView = "map";
	}
	else
	{
		//fMapZoom = parseInt(sURLMapZoom);
		sView = sUrlView;
	}


	if (sURLMapZoom == null)
	{
		fMapZoom = 9.0;
	}
	else
	{
		//fMapZoom = parseInt(sURLMapZoom);
		fMapZoom = sURLMapZoom;
	}

	if (sUrlImageHorizonRoll == null)
	{
		iImageHorizonRoll = 999; //will be set to 180 etc
	}
	else
	{
		iImageHorizonRoll = parseInt(sUrlImageHorizonRoll);
	}

	if (sUrlImageHorizonPitch == null)
	{
		iImageHorizonPitch = 999; //will be set to 180 etc
	}
	else
	{
		iImageHorizonPitch = parseInt(sUrlImageHorizonPitch);
	}

//alert(iImageHorizonRoll);

	if (sUrlImageYaw == null)
	{
		iImageYaw = 999; //will be set to 180 etc
	}
	else
	{
		iImageYaw = parseInt(sUrlImageYaw);
	}


	if (sUrlImagePitch == null)
	{
		iImagePitch = 999; //will be set to 180 etc
	}
	else
	{
		iImagePitch = parseInt(sUrlImagePitch);
	}


	if (sUrlImageZoom == null)
	{
		iImageZoom = 120;
	}
	else
	{
		iImageZoom = parseInt(sUrlImageZoom);
	}


	if (sURLMapLatitude == null)
	{
		fMapLatitude = 50.917406;  //[-1.386749, 50.917406]
	}
	else
	{
		fMapLatitude = sURLMapLatitude;
	}

	if (sURLMapLongitude == null)
	{
		fMapLongitude = -1.386749;
	}
	else
	{
		fMapLongitude = sURLMapLongitude;
	}


	oLonLatCentre = [fMapLongitude, fMapLatitude];

	var oMap = new modmap({
		target: 'hDivMap',
		layers: [
			 oLayerBackgroundMap
			,oLayerVectorGpx
		],
		view: new modview({
		center: modfromlonglat(oLonLatCentre),
		//center: modfromlonglat([0,0]),
		zoom: fMapZoom
		})
	});


	//oMap.getView().setLatitude(fMapLatitude);
	//oMap.getView().setLongitude(fMapLongitude);

	//oMap.centre = modfromlonglat(oLonLatCentreInitial);

	oMap.getView().setZoom(fMapZoom);

	oMap.addLayer(oLayerVectorAircraftIcon);

	sFlightAndFrameNum = sUrlFlightId + "/" + sUrlImageFrameNum;

	oJsonImagesB = oJsonImages.JsonImages;

	sImageSequenceNumFromFlightAndFrame = functionSequenceNumFromFlightAndFrame(oJsonImagesB, sFlightAndFrameNum);

	if (sUrlImageSequenceNum == null)
	{
		sUrlImageSequenceNum = "";
	}

	if (sUrlImageSequenceNum=="")
	{
		sImageSequenceNumber = sImageSequenceNumFromFlightAndFrame;
	}
	else
	{
		sImageSequenceNumber = sUrlImageSequenceNum;
	}

	if (sImageSequenceNumber != "")	//if we are going to a particular image
	{
		iImageSequenceNumber = parseInt(sImageSequenceNumber);
		functionRenderImage(iImageSequenceNumber);
	}
	else //if we are not going to a particular image - then we will only ever go to map view, regardless of the value of initialview
	{
		//functionSetDisplayMode(2);
		functionSetView("map", 1);
	}
	

// End of Program






//Event Listeners:
	var oButtonToggleDisplay = document.getElementById('hButtonToggleDisplay');
			oButtonToggleDisplay.addEventListener('click', function(e) {
				//functionSetDisplayMode(0);
				functionSetView("toggle", 1);
	});


	var oLinkOpenGoogleMapsHere = document.getElementById('hLinkOpenGoogleMapsHere');
			oLinkOpenGoogleMapsHere.addEventListener('click', function(e) {
				//alert("blogs")
				functionOpenGoogleMapsHere();
	});

	var oButtonMoveForwards = document.getElementById('hButtonMoveForwards');
			oButtonMoveForwards.addEventListener('click', function(e) {
			  functionMoveForwardsBackwards('forwards');
	});


	var oButtonMoveBackwards = document.getElementById('hButtonMoveBackwards');
			oButtonMoveBackwards.addEventListener('click', function(e) {
			  functionMoveForwardsBackwards('backwards');
	});


	var oImageClick = document.getElementById('hDivImage');
			oImageClick.addEventListener('click', function(e) {
				functionGetImageAxisAndMapValues()
	});


	var oImageDblClick = document.getElementById('hDivImage');
			oImageDblClick.addEventListener('dblclick', function(e) {
				functionGetImageAxisAndMapValues()
	});


	var oImageWheel = document.getElementById('hDivImage');
			oImageWheel.addEventListener('wheel', function(e) {
				functionGetImageAxisAndMapValues()
	});


	//oMap.on('pointermove', function(evt) {
	//	if (evt.dragging) {
	//	  return;
	//	}
	//});


	oMap.on('singleclick', function(evt) {
		functionGetImageAxisAndMapValues();
		functionDotClick(evt.pixel);
	});


//	oMap.on('wheel', function(evt) {
//		functionGetImageAxisAndMapValues();
//	});



//Input methods:
	//https://wangchujiang.com/hotkeys/
	//Along with the include statement at the top of the page, this function intercepts the up and down arrows to move the image forwards and backwards.
	hotkeys('Up, Down, Esc, Enter', function(event,handler) {
		event.preventDefault()
		switch(handler.key){
			case "Up":functionMoveForwardsBackwards('forwards');break;
			case "Down":functionMoveForwardsBackwards('backwards');break;
			//case "Esc":functionSetDisplayMode(0);break;  	//was functionToggleImage
			//case "Enter":functionSetDisplayMode(0);break;	//was functionToggleImage
			case "Esc":functionSetView("toggle", 1);break;  	//was functionToggleImage
			case "Enter":functionSetView("toggle", 1);break;	//was functionToggleImage
		}
	});


