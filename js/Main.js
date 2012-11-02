function init(){
	var map = new L.Map("map");
	
	/* Tilestream Layer example: */
	var historicUrl = "/tiles/v2/azHistoric1880/{z}/{x}/{y}.png",
		historicLayer = new L.TileLayer(historicUrl, {maxZoom: 10}); 
	
	/* ESRI tiled service example: */
	//var natGeoLayer = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer");
	
	// Cloudmade / OpenStreetMap tiled layer
	var cmUrl = 'http://{s}.tile.cloudmade.com/f7d28795be6846849741b30c3e4db9a9/997/256/{z}/{x}/{y}.png',
		cmAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		cmOptions = { maxZoom: 18, attribution: cmAttribution };
	
	var cloudmade = new L.TileLayer(cmUrl, cmOptions);//, {styleId: 999});
	
	/* Bing maps example: 
	var bingLayer = new L.TileLayer.Bing(<<Bing Maps API Key>>, "Road"); */
	
	/* WMS layer example: */
	var wmsUrl = "/geoserver/wms",
		wmsLayer = new L.TileLayer.WMS(wmsUrl, { 
			maxZoom: 10, 
			layers: "vae:azhistoricmines", 
			format: "image/png", 
			transparent: true 
		}); 
	
	var styleDescription = { 
		propName: "name",
		styles: {
			"Uinkaret": {
				fillColor: "#0000FF"
			}, "Springerville": {
				fillColor: "#B700C4"
			}, "Sentinel": {
				fillColor: "#FF0088"
			}, "San Francisco": {
				fillColor: "#FF0051"
			}, "Pinacate": {
				fillColor: "#FFC800"
			}, "San Bernardino": {
				fillColor: "#FF8C00"
			}
		},
		"default": {
			stroke: false,
			fill: true,
			fillOpacity: 0.6 
		}
	};
	
	/* WFS GeoJSON layer example: */
	var wfsLayer = new L.GeoJSON.WFS("/geoserver/wfs", "vae:azvolcanics", {		
		popupObj: new JadeContent("templates/volcanics.jade"),
		popupOptions: { maxWidth: 530, centered: true },
		hoverFld: "name",
		hoverColor: "#FFFF00",
		wfsVersion: "1.0.0",
		filteredStyles: styleDescription
	}); 
	
	var center = new L.LatLng(34.1618, -111.53332);
	map.setView(center, 7).addLayer(cloudmade).addLayer(wfsLayer);
}