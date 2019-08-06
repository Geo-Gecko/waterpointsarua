//jquery function for setting the css of the position of the map
			$.fn.center = function () {
				this.css("position","absolute");
				this.css("bottom", "-5em"
						);
				this.css("right", "0px"
						);
				return this;
			};

			var storkmap = {};

			/*    function formatBBox() {
                var map = storkmap.map,
                    mapLatLngBounds = map.getBounds(),
                    bbString = "(" + mapLatLngBounds.getSouth() + "," + mapLatLngBounds.getWest() + "," + mapLatLngBounds.getNorth() + "," + mapLatLngBounds.getEast() + ")";
                return bbString;
            }
        */

// function to formate the marker information 

			function formatMarkerInfo(node) {

				var link = '<a href="http://www.openstreetmap.org/edit?editor=id&node=' + node.id +
					'">Edit this entry in iD</a><br>';
				//var user = '<b>Added by: </b>' + '<a href="http://www.openstreetmap.org/user/' + node.user + '">' + node.user + '</a><br>';
				var timestamp = '<b>Timestamp: </b>' + node.timestamp;

				var r = $('<table>');

				for (var i in node.tags)
					r.append($('<tr>').append($('<th>').text(i)).append($('<td>').text(node.tags[i])));

				var tags = $('<div>').append(r).html();


				var img = '<b>Foto: </b>' + '<a href="' + node.tags.image + '">' + "foto link" + '</a><br>';
				if (node.tags.image == null) img = '';


				return link + '<br>' /*+ user + timestamp + '<br>' + '<br>' */+ '<b>Tags:</b>' + '<br>' + tags + '<br>' +
					img;
			}
//function to make the markers on the map and holding the markers

			function makeMarkers() {
				var markerCG = storkmap.markerClusterGroup;
				var markerCG1 = storkmap.markerClusterGroup1;
				var markerCG2 = storkmap.markerClusterGroup2;
				var markerCG3 = storkmap.markerClusterGroup3;
				var markerCG5 = storkmap.markerClusterGroup5;
				var markerCG6 = storkmap.markerClusterGroup6;
				var markerCG11 = storkmap.markerClusterGroup11;
				markerCG.clearLayers();
				storkmap.osmJson.forEach( node => {
					var marker;
					if (node.tags.man_made === "borehole" || node.tags.man_made === "handpump" || node.tags.man_made === "motorized_borehole") {
						var storkIcon = new L.icon({
							iconUrl: "data/stork.svg",
							iconSize: [25, 40],
							iconAnchor: [12, 12],
							popupAnchor: new L.Point(0, -12)
						});
						marker = L.marker(new L.LatLng(node.lat, node.lon), {
							icon:storkIcon
						});
						marker.bindPopup(formatMarkerInfo(node));
						markerCG.addLayer(marker);
					} else if 
						(node.tags.man_made === "water_tap") {
							var storkIcon = new L.icon({
								iconUrl: "data/stork1.svg",
								iconSize: [25, 40],
								iconAnchor: [12, 12],
								popupAnchor: new L.Point(0, -12)
							});
							marker = L.marker(new L.LatLng(node.lat, node.lon), {
								icon:storkIcon
							});
							marker.bindPopup(formatMarkerInfo(node));
							markerCG1.addLayer(marker);
						} else if 
							(node.tags.man_made === "water_tank") {
								var storkIcon = new L.icon({
									iconUrl: "data/stork2.svg",
									iconSize: [25, 40],
									iconAnchor: [12, 12],
									popupAnchor: new L.Point(0, -12)
								});
								marker = L.marker(new L.LatLng(node.lat, node.lon), {
									icon:storkIcon
								});
								marker.bindPopup(formatMarkerInfo(node));
								markerCG2.addLayer(marker);
							} else if 
								(node.tags.man_made === "protected_spring") {
									var storkIcon = new L.icon({
										iconUrl: "data/stork3.svg",
										iconSize: [25, 40],
										iconAnchor: [12, 12],
										popupAnchor: new L.Point(0, -12)
									});
									marker = L.marker(new L.LatLng(node.lat, node.lon), {
										icon:storkIcon
									});
									marker.bindPopup(formatMarkerInfo(node));
									markerCG3.addLayer(marker);
								} else if 
									(node.tags.man_made === "rainwater") {
										var storkIcon = new L.icon({
											iconUrl: "data/stork5.svg",
											iconSize: [25, 40],
											iconAnchor: [12, 12],
											popupAnchor: new L.Point(0, -12)
										});
										marker = L.marker(new L.LatLng(node.lat, node.lon), {
											icon:storkIcon
										});
										marker.bindPopup(formatMarkerInfo(node));
										markerCG5.addLayer(marker);
									} else if 
										(node.tags.man_made === "unprotected_well" || node.tags.man_made === "protected_well" || node.tags.man_made === "water_well") {
											var storkIcon = new L.icon({
												iconUrl: "data/stork6.svg",
												iconSize: [25, 40],
												iconAnchor: [12, 12],
												popupAnchor: new L.Point(0, -12)
											});
											marker = L.marker(new L.LatLng(node.lat, node.lon), {
												icon:storkIcon
											});
											marker.bindPopup(formatMarkerInfo(node));
											markerCG6.addLayer(marker);
										} else {
											var storkIcon = new L.icon({
												iconUrl: "data/stork11.svg",
												iconSize: [25, 40],
												iconAnchor: [12, 12],
												popupAnchor: new L.Point(0, -12)
											});
											marker = L.marker(new L.LatLng(node.lat, node.lon), {
												icon:storkIcon
											});
											marker.bindPopup(formatMarkerInfo(node));
											markerCG11.addLayer(marker);
										}

				});

			}
//function to query and get data from a json file using overpass

			function queryOverpass() {
				//var bbString = formatBBox(),
				//overpassQuery = encodeURIComponent("node" + '[birds_nest=stork]' + bbString + ";out body;"),
				overpassURL = './json/interpreter.json';


				$.ajax({
					url: overpassURL,
					type: 'GET',
					crossDomain: true,
					success: function (data) {
						console.log(data);
						storkmap.osmJson = data.elements;
						makeMarkers();						
					},
				});
			}
// function to map the views and reset them

			function onMapViewReset(e) {
				queryOverpass();
			}

			function onMapMoveEnd(e) {
				queryOverpass();
			}

			function makeMap() {

				var map = storkmap.map;

				storkmap.map.addLayer(storkmap.markerClusterGroup);

				queryOverpass();


				var buttons = {
					Borehole: L.easyButton({
						position: 'topright',
						states: [{
							icon: '<img alt="do this" src="data/stork.svg" height="30" width="15" align="left"/><span id="text" class="btn--text"><font color="black"><b>Borehole</b></font></span>',
							stateName: 'remove-markers',
							onClick: (control) => {
								map.removeLayer(storkmap.markerClusterGroup);
								control.state('add-markers');
							},
							title: 'remove markers'
						},
								 {
									 stateName: 'add-markers',
									 icon: '<img alt="do this" src="data/stork.svg" height="30" width="15" align="left" style="opacity:0.2 "/><span id="text" class="btn--text"><font color="black"><b>Borehole</b></font></span>',
									 title: 'add random markers',
									 onClick:(control) => {
										 map.addLayer(storkmap.markerClusterGroup);
										 control.state('remove-markers');
									 }
								 }]
                    }),
                    //water tap button to turn on and off that marker clutter
					Water_Tap: L.easyButton({
						position: 'topright',
						states: [{
							stateName: 'add-markers',
							icon: '<img alt="do this" src="data/stork1.svg" height="30" width="15" align="left" style="opacity:0.2 "/><span id="text" class="btn--text"><font color="black"><b>Water Tap</b></font></span>',
							title: 'add random markers',
							onClick: (control) => {
								map.addLayer(storkmap.markerClusterGroup1);
								control.state('remove-markers');
							}
						}, {
							icon: '<img alt="do this" src="data/stork1.svg" height="30" width="15" align="left" /><span id="text" class="btn--text"><font color="black"><b>Water Tap</b></font></span>',
							stateName: 'remove-markers',
							onClick: (control) => {
								map.removeLayer(storkmap.markerClusterGroup1);
								control.state('add-markers');
							},
							title: 'remove markers'
						}]
                    }),
                    //water tank button 
					Water_Tank: L.easyButton({
						position: 'topright',
						states: [{
							stateName: 'add-markers',
							icon: '<img alt="do this" src="data/stork2.svg" height="30" width="15" align="left" style="opacity:0.2 "/><span id="text" class="btn--text"><font color="black"><b>Water Tank</b></font></span>',
							title: 'add random markers',
							onClick: (control) => {
								map.addLayer(storkmap.markerClusterGroup2);
								control.state('remove-markers');
							}
						}, {
							icon: '<img alt="do this" src="data/stork2.svg" height="30" width="15" align="left" /><span id="text" class="btn--text"><font color="black"><b>Water Tank</b></font></span>',
							stateName: 'remove-markers',
							onClick: (control) => {
								map.removeLayer(storkmap.markerClusterGroup2);
								control.state('add-markers');
							},
							title: 'remove markers'
						}]
					}),
					Protected_Spring: L.easyButton({
						position: 'topright',
						states: [{
							stateName: 'add-markers',
							icon: '<img alt="do this" src="data/stork3.svg" height="30" width="15" align="left" style="opacity:0.2 "/><span id="text" class="btn--text"><font color="black"><b>Protected Spring</b></font></span>',
							title: 'add random markers',
							onClick: (control) => {
								map.addLayer(storkmap.markerClusterGroup3);
								control.state('remove-markers');
							}
						}, {
							icon: '<img alt="do this" src="data/stork3.svg" height="30" width="15" align="left" /><span id="text" class="btn--text"><font color="black"><b>Protected Spring</b></font></span>',
							stateName: 'remove-markers',
							onClick: (control) => {
								map.removeLayer(storkmap.markerClusterGroup3);
								control.state('add-markers');
							},
							title: 'remove markers'
						}]
                    }),
                    //Rain water button 
					Rain_Water: L.easyButton({
						position: 'topright',
						states: [{
							stateName: 'add-markers',
							icon: '<img alt="do this" src="data/stork5.svg" height="30" width="15" align="left" style="opacity:0.2 "/><span id="text" class="btn--text"><font color="black"><b>Rain Water</b></font></span>',
							title: 'add random markers',
							onClick: function(control) {
								map.addLayer(storkmap.markerClusterGroup5);
								control.state('remove-markers');
							}
						}, {
							icon: '<img alt="do this" src="data/stork5.svg" height="30" width="15" align="left" /><span id="text" class="btn--text"><font color="black"><b>Rain Water</b></font></span>',
							stateName: 'remove-markers',
							onClick: function(control) {
								map.removeLayer(storkmap.markerClusterGroup5);
								control.state('add-markers');
							},
							title: 'remove markers'
						}]
                    }),
                    //Well layer button 
					Well: L.easyButton({
						position: 'topright',
						states: [{
							stateName: 'add-markers',
							icon: '<img alt="do this" src="data/stork6.svg" height="30" width="15" align="left" style="opacity:0.2 "/><span id="text" class="btn--text"><font color="black"><b>Well</b></font></span>',
							title: 'add random markers',
							onClick: function(control) {
								map.addLayer(storkmap.markerClusterGroup6);
								control.state('remove-markers');
							}
						}, {
							icon: '<img alt="do this" src="data/stork6.svg" height="30" width="15" align="left" /><span id="text" class="btn--text"><font color="black"><b>Well</b></font></span>',
							stateName: 'remove-markers',
							onClick: function(control) {
								map.removeLayer(storkmap.markerClusterGroup6);
								control.state('add-markers');
							},
							title: 'remove markers'
						}]
                    }),

                    //other layer Button 
				     Other: L.easyButton({
						position: 'topright',
						states: [{
							stateName: 'add-markers',
							icon: '<img alt="do this" src="data/stork11.svg" height="30" width="15" align="left" style="opacity:0.2 "/><span id="text" class="btn--text"><font color="black"><b>Other</b></font></span>',
							title: 'add random markers',
							onClick: function(control) {
								map.addLayer(storkmap.markerClusterGroup11);
								control.state('remove-markers');
							}
						}, {
							icon: '<img alt="do this" src="data/stork11.svg" height="30" width="15" align="left" /><span id="text" class="btn--text"><font color="black"><b>Other</b></font></span>',
							stateName: 'remove-markers',
							onClick: function(control) {
								map.removeLayer(storkmap.markerClusterGroup11);
								control.state('add-markers');
							},
							title: 'remove markers'
						}],
						tagName: 'other'
					})
				};

				// add the buttons. iterates over the buttons objects
				for (var key in buttons) {
					if (buttons.hasOwnProperty(key)) {
						buttons[key].addTo(map);
						// Call the getContainer routine.
						var htmlObject = buttons[key].getContainer();
						// Get the desired parent node.
						var a = document.querySelector("#sidebar-right");

						// Finally append that node to the new parent, recursively searching out and re-parenting nodes.
						function setParent(el, newParent)
						{
							newParent.appendChild(el);
						}
						setParent(htmlObject, a);
					}
				}
				var other = d3.select('other');
				var otherEnd = other.select(function() {
					return this.parentNode;
                });
                //Appending the image in the Div element 
				var imageDiv = otherEnd.append('div')
				.attr("padding-top", "2px");
				imageDiv.append('img').attr("src", "data/hot-attribution.png")
				.attr("align", "center")
				.attr("width", "200px");

				map.setView([2.955, 31.122], 10);

				var rightSidebar = L.control.sidebar('sidebar-right', {
					position: 'right'
				});
				map.addControl(rightSidebar);

				rightSidebar.toggle();

			}
//getting data from openstreetmap and set it to a variable and using that data to manipulate a map
			var attr_osm = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
			var attr_nests = 'data via <a href="http://www.overpass-api.de/" target=”_blank”>Overpass API</a>';
			var attr_dev = 'web map funded by <a href="https://www.giz.de/en/worldwide/310.html" target=”_blank”>GIZ-Uganda</a> and created by <a href="http://geogecko.com" target=”_blank”>GeoGecko</a>';

			var layerOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				attribution: [attr_osm, attr_nests, attr_dev].join(', ')
			});

			storkmap.map = L.map('map', {
				attributionControl: false,
				layers: [layerOSM],
				minZoom: 6
			});
			L.control.attribution({position: 'bottomleft'}).addTo(storkmap.map);
			storkmap.currentTag = "water_point";

			storkmap.markerClusterGroup = L.markerClusterGroup({
				iconCreateFunction: function(cluster) {
					var childCount = cluster.getChildCount();
					return L.divIcon({className: 'Borehole clusterIcons', html: '<div><span>' + childCount + '</span></div>'});
				},
				polygonOptions: {
					opacity: 0,
					fillOpacity: 0
				}
			});
			storkmap.markerClusterGroup1 = L.markerClusterGroup({
				iconCreateFunction: function(cluster) {
					var childCount = cluster.getChildCount();
					return L.divIcon({className: 'Water_Tap clusterIcons', html: '<div><span>' + childCount + '</span></div>'});
				},
				polygonOptions: {
					opacity: 0,
					fillOpacity: 0
				}
			});
			storkmap.markerClusterGroup2 = L.markerClusterGroup({
				iconCreateFunction: function(cluster) {
					var childCount = cluster.getChildCount();
					return L.divIcon({className: 'Water_Tank clusterIcons', html: '<div><span>' + childCount + '</span></div>'});
				},
				polygonOptions: {
					opacity: 0,
					fillOpacity: 0
				}
			});
			storkmap.markerClusterGroup3 = L.markerClusterGroup({
				iconCreateFunction: function(cluster) {
					var childCount = cluster.getChildCount();
					return L.divIcon({className: 'Protected_Spring clusterIcons', html: '<div><span>' + childCount + '</span></div>'});
				},
				polygonOptions: {
					opacity: 0,
					fillOpacity: 0
				}
			});
			storkmap.markerClusterGroup5 = L.markerClusterGroup({
				iconCreateFunction: function(cluster) {
					var childCount = cluster.getChildCount();
					return L.divIcon({className: 'Rain_Water clusterIcons', html: '<div><span>' + childCount + '</span></div>'});
				},
				polygonOptions: {
					opacity: 0,
					fillOpacity: 0
				}
			});
			storkmap.markerClusterGroup6 = L.markerClusterGroup({
				iconCreateFunction: function(cluster) {
					var childCount = cluster.getChildCount();
					return L.divIcon({className: 'Well clusterIcons', html: '<div><span>' + childCount + '</span></div>'});
				},
				polygonOptions: {
					opacity: 0,
					fillOpacity: 0
				}
			});
			storkmap.markerClusterGroup11 = L.markerClusterGroup({
				iconCreateFunction: function(cluster) {
					var childCount = cluster.getChildCount();
					return L.divIcon({className: 'Other clusterIcons', html: '<div><span>' + childCount + '</span></div>'});
				},
				polygonOptions: {
					opacity: 0,
					fillOpacity: 0
				}
			});
			storkmap.osmJson = {};
			makeMap();