/*globals OpenLayers,google */
"use strict";
function init() {
  var map = new OpenLayers.Map('map'),
    gphy = new OpenLayers.Layer.Google(
      "Google Physical",
      {type: google.maps.MapTypeId.TERRAIN}
    ),
    gmap = new OpenLayers.Layer.Google(
      "Google Streets", // the default
      {numZoomLevels: 20}
    ),
    ghyb = new OpenLayers.Layer.Google(
      "Google Hybrid",
      {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
    ),
    gsat = new OpenLayers.Layer.Google(
      "Google Satellite",
      {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    ),
    palestineRememberedLayers = [{
      name: 'Destroyed villages',
      url: 'PalestineRemembered/DestroyedTown.json',
      styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
          graphicName: "circle",
          pointRadius: 3,
          fillOpacity: 0.25,
          fillColor: "blue",
          strokeColor: "blue",
          strokeWidth: 1
        })
      })
    }, {
      name: 'Gaza Strip',
      url: 'PalestineRemembered/GazaStripTown.json',
      styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
          graphicName: "circle",
          pointRadius: 3,
          fillOpacity: 0.25,
          fillColor: "red",
          strokeColor: "red",
          strokeWidth: 1
        })
      })
    }, {
      name: 'Israeli Town',
      url: 'PalestineRemembered/IsraeliTown.json',
      styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
          graphicName: "circle",
          pointRadius: 3,
          fillOpacity: 0.25,
          fillColor: "green",
          strokeColor: "green",
          strokeWidth: 1
        })
      })
    }, {
      name: 'Refugee Camp',
      url: 'PalestineRemembered/RefugeeCamp.json',
      styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
          graphicName: "circle",
          pointRadius: 3,
          fillOpacity: 0.25,
          fillColor: "orange",
          strokeColor: "orange",
          strokeWidth: 1
        })
      })
    }, {
      name: 'Neighboring County Town',
      url: 'PalestineRemembered/NeighboringCountyTown.json',
      styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
          graphicName: "circle",
          pointRadius: 3,
          fillOpacity: 0.25,
          fillColor: "yellow",
          strokeColor: "yellow",
          strokeWidth: 1
        })
      })
    }, {
      name: 'PaliIsraeliTown',
      url: 'PalestineRemembered/PaliIsraeliTown.json',
      styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
          graphicName: "circle",
          pointRadius: 3,
          fillOpacity: 0.25,
          fillColor: "purple",
          strokeColor: "purple",
          strokeWidth: 1
        })
      })
    }, {
      name: 'West Bank Town',
      url: 'PalestineRemembered/WestBankTown.json',
      styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
          graphicName: "circle",
          pointRadius: 3,
          fillOpacity: 0.25,
          fillColor: "red",
          strokeColor: "red",
          strokeWidth: 1
        })
      })
    }],
    peaceNowLayers = [{
      name: 'Area A',
      url: 'PeaceNow/Area_A-styled-a911d83810f02a3267aa842b7bb12aac.kml'
    }, {
      name: 'Area B',
      url: 'PeaceNow/Area_B-styled-84c5be2d0c6ec8954da28a3c2792440a.kml'
    }, {
      name: 'Area C',
      url: 'PeaceNow/Area_C-styled-e486659c059693d4fc1d7c9414625ae7.kml'
    }, {
      name: 'Barrier',
      url: 'PeaceNow/Barier-styled-e090b5fba51bfe5054d2a0258256682a.kml'
    }, {
      name: 'Green line',
      url: 'PeaceNow/Greenline-styled-17e16f4e5323a474abac3ecdc2bcdf94.kml'
    }, {
      name: 'Hebron',
      url: 'PeaceNow/HebronH1H2-styled-fd713c793090dc8aa535cb4bda021f1f.kml'
    }, {
      name: 'Hebron Settlements',
      url: 'PeaceNow/Hebron_Settlements-styled-c13bb0aaa6872ad19192a8c531a005ad.kml'
    }, {
      name: 'Jerusalem Municipal Boundary Line',
      url: 'PeaceNow/Jerusalem_Municipal_Boundary_Line-styled-f84d5dbead61344d25f08e74e9efd64f.kml'
    }, {
      name: 'Jewish neighborhoods in East Jerusalem',
      url: 'PeaceNow/Jewish_nieghborhoods_EJ-styled-2f853e8b8aa4158e5d85031bc524500b.kml'
    }, {
      name: 'Jlem OldCity Quartert',
      url: 'PeaceNow/Jlem_OldCity_Quartert-styled-1427470a8537962f3b4fa8c71b79ada2.kml'
    }, {
      name: 'Palestinian Built',
      url: 'PeaceNow/Palestinian_Built-styled-20370f27d8c2442164328f86da09d015.kml'
    }, {
      name: 'Settlements',
      url: 'PeaceNow/Settlements-styled-d5d20e8536ab155c60f58a9cb405f207.kml'
    }, {
      name: 'checkpoints',
      url: 'PeaceNow/checkpoints-styled-622dc1004e201bcb1b9c8063d99a9c55.kml'
    }, {
      name: 'old city annotation',
      url: 'PeaceNow/old_city_annotation-styled-8e120348dcfe39b64753601f5fe0ab34.kml'
    }, {
      name: 'outposts',
      url: 'PeaceNow/outposts-styled-92412e9d4483f1e2b32b0eaaf9379379.kml'
    }, {
      name: 'private lands',
      url: 'PeaceNow/private_lands-styled-3407b316d5a408adecf146e5d8bdc88f.kml'
    }, {
      name: 'settlement pins',
      url: 'PeaceNow/settlement_pins-styled-ee5ed7a4b60baf81bcc8010a758237e8.kml',
      styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
          graphicName: "circle",
          pointRadius: 3,
          fillOpacity: 0.25,
          fillColor: "green",
          strokeColor: "green",
          strokeWidth: 1
        })
      })
    }, {
      name: 'settlements_in_pal_nghbrhd',
      url: 'PeaceNow/settlements_in_pal_nghbrhd-styled-a03ed5d273b5f9a036df944b1c17fdc8.kml'
    }, {
      name: 'settlers_houses_jlem',
      url: 'PeaceNow/settlers_houses_jlem-styled-e822b75facde5850200d334b3034352b.kml'
    }];


  map.addLayers([gphy, gmap, ghyb, gsat]);
  map.setBaseLayer(gmap);

  OpenLayers.Array.filter(peaceNowLayers, function (options) {
    var polygonLayer = new OpenLayers.Layer.GML(options.name, options.url, {
        format: OpenLayers.Format.KML,
        formatOptions: {
          extractStyles: options.styleMap ? false : true,
          extractAttributes: true,
          maxDepth: 2
        },
        styleMap: options.styleMap ? options.styleMap : null,
        visibility: false
      }, {
        reproject: true
      }),
      selectControl = new OpenLayers.Control.SelectFeature(polygonLayer, {
        onSelect: function (feature) {
          console.log(feature);
          var content = popupContent(feature.attributes),
            selectedFeature = feature,
            popup = new OpenLayers.Popup.FramedCloud("chicken",
              feature.geometry.getBounds().getCenterLonLat(),
              null,
              feature.attributes.description,
              null, true, function (evt) {
                selectControl.unselect(selectedFeature);
              });
          feature.popup = popup;
          map.addPopup(popup);
        },
        onUnselect: function (feature) {
          map.removePopup(feature.popup);
          feature.popup.destroy();
          feature.popup = null;
        }
      });
    map.addControl(selectControl);
    selectControl.activate();

    map.addLayer(polygonLayer);
  });
  OpenLayers.Array.filter(palestineRememberedLayers, function (options) {
    var polygonLayer = new OpenLayers.Layer.Vector(options.name, {
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
          url: options.url,
          format: new OpenLayers.Format.GeoJSON()
        }),
        styleMap: options.styleMap,
        visibility: false
      }, {
        reproject: true
      }),
      selectControl = new OpenLayers.Control.SelectFeature(polygonLayer, {
        onSelect: function (feature) {
          var content = popupContent(feature.attributes),
            selectedFeature = feature,
            popup = new OpenLayers.Popup.FramedCloud("chicken",
              feature.geometry.getBounds().getCenterLonLat(),
              null,
              content,
              null, true, function (evt) {
                selectControl.unselect(selectedFeature);
              });
          feature.popup = popup;
          map.addPopup(popup);
        },
        onUnselect: function (feature) {
          map.removePopup(feature.popup);
          feature.popup.destroy();
          feature.popup = null;
        }
      });
    map.addControl(selectControl);
    selectControl.activate();
    map.addLayer(polygonLayer);
  });

  map.zoomToExtent(new OpenLayers.Bounds(34.283333, 29.516667, 35.666667, 33.286111).transform(
        new OpenLayers.Projection("EPSG:4326"),
        map.getProjectionObject()
    ));
  map.addControl(new OpenLayers.Control.LayerSwitcher());
}

function popupContent(data) {
  var content = '', image;
  if (data.name) {
    content += '<h2>' + data.name + '</h2>';
  }
  if (data.image_url) {
    image = new Image();
    image.src = data.image_url;
    if (data.image_width) {
      image.width = data.image_width;
    }
    if (data.image_height) {
      image.height = data.image_height;
    }
    content += image.outerHTML;
  }
  if (data.facts) {
    content += '<dl>';
    for (var term in data.facts) {
      content += '<dt>' + term + '</dt>';
      content += '<dd>' + data.facts[term] + '</dd>';
    }
    content += '</dl>';
  }
  return content;
}
