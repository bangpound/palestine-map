/*globals OpenLayers,google */
"use strict";

function popupContent(data) {
  var content = '', image, term;
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
    for (term in data.facts) {
      if (data.facts.hasOwnProperty(term)) {
        content += '<dt>' + term + '</dt>';
        content += '<dd>' + data.facts[term] + '</dd>';
      }
    }
    content += '</dl>';
  }
  if (data.description) {
    content += '<p>' + data.description + '</p>';
  }
  return content;
}

function init() {
  var map = new OpenLayers.Map('map', {
        controls: [
          new OpenLayers.Control.Navigation(),
          new OpenLayers.Control.PanZoomBar(),
          new OpenLayers.Control.ArgParser(),
          new OpenLayers.Control.LayerSwitcher(),
          new OpenLayers.Control.Permalink()
        ]
      }),
    wms = new OpenLayers.Layer.WMS("OpenLayers WMS",
      "http://vmap0.tiles.osgeo.org/wms/vmap0", {
        layers: 'basic'
      }),
    layers = [{
      name: 'Destroyed villages',
      format: 'GeoJSON',
      url: 'PalestineRemembered/DestroyedTown.json',
      options: {
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
      }
    }, {
      name: 'Gaza Strip',
      format: 'GeoJSON',
      url: 'PalestineRemembered/GazaStripTown.json',
      options: {
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
      }
    }, {
      name: 'Israeli Town',
      format: 'GeoJSON',
      url: 'PalestineRemembered/IsraeliTown.json',
      options: {
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
      }
    }, {
      name: 'Refugee Camp',
      format: 'GeoJSON',
      url: 'PalestineRemembered/RefugeeCamp.json',
      options: {
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
      }
    }, {
      name: 'Neighboring County Town',
      format: 'GeoJSON',
      url: 'PalestineRemembered/NeighboringCountyTown.json',
      options: {
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
      }
    }, {
      name: 'PaliIsraeliTown',
      format: 'GeoJSON',
      url: 'PalestineRemembered/PaliIsraeliTown.json',
      options: {
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
      }
    }, {
      name: 'West Bank Town',
      format: 'GeoJSON',
      url: 'PalestineRemembered/WestBankTown.json',
      options: {
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
      }
    }, {
      name: 'Area A',
      format: 'KML',
      options: {},
      url: 'PeaceNow/Area_A-styled-a911d83810f02a3267aa842b7bb12aac.kml'
    }, {
      name: 'Area B',
      format: 'KML',
      options: {},
      url: 'PeaceNow/Area_B-styled-84c5be2d0c6ec8954da28a3c2792440a.kml'
    }, {
      name: 'Area C',
      format: 'KML',
      options: {},
      url: 'PeaceNow/Area_C-styled-e486659c059693d4fc1d7c9414625ae7.kml'
    }, {
      name: 'Barrier',
      format: 'KML',
      options: {},
      url: 'PeaceNow/Barier-styled-e090b5fba51bfe5054d2a0258256682a.kml'
    }, {
      name: 'Green line',
      format: 'KML',
      options: {},
      url: 'PeaceNow/Greenline-styled-17e16f4e5323a474abac3ecdc2bcdf94.kml'
    }, {
      name: 'Hebron',
      format: 'KML',
      options: {},
      url: 'PeaceNow/HebronH1H2-styled-fd713c793090dc8aa535cb4bda021f1f.kml'
    }, {
      name: 'Hebron Settlements',
      format: 'KML',
      options: {},
      url: 'PeaceNow/Hebron_Settlements-styled-c13bb0aaa6872ad19192a8c531a005ad.kml'
    }, {
      name: 'Jerusalem Municipal Boundary Line',
      format: 'KML',
      options: {},
      url: 'PeaceNow/Jerusalem_Municipal_Boundary_Line-styled-f84d5dbead61344d25f08e74e9efd64f.kml'
    }, {
      name: 'Jewish neighborhoods in East Jerusalem',
      format: 'KML',
      options: {},
      url: 'PeaceNow/Jewish_nieghborhoods_EJ-styled-2f853e8b8aa4158e5d85031bc524500b.kml'
    }, {
      name: 'Jlem OldCity Quartert',
      format: 'KML',
      options: {},
      url: 'PeaceNow/Jlem_OldCity_Quartert-styled-1427470a8537962f3b4fa8c71b79ada2.kml'
    }, {
      name: 'Palestinian Built',
      format: 'KML',
      options: {},
      url: 'PeaceNow/Palestinian_Built-styled-20370f27d8c2442164328f86da09d015.kml'
    }, {
      name: 'Settlements',
      format: 'KML',
      options: {},
      url: 'PeaceNow/Settlements-styled-d5d20e8536ab155c60f58a9cb405f207.kml'
    }, {
      name: 'checkpoints',
      format: 'KML',
      options: {},
      url: 'PeaceNow/checkpoints-styled-622dc1004e201bcb1b9c8063d99a9c55.kml'
    }, {
      name: 'old city annotation',
      format: 'KML',
      options: {},
      url: 'PeaceNow/old_city_annotation-styled-8e120348dcfe39b64753601f5fe0ab34.kml'
    }, {
      name: 'outposts',
      format: 'KML',
      options: {},
      url: 'PeaceNow/outposts-styled-92412e9d4483f1e2b32b0eaaf9379379.kml'
    }, {
      name: 'private lands',
      format: 'KML',
      options: {},
      url: 'PeaceNow/private_lands-styled-3407b316d5a408adecf146e5d8bdc88f.kml'
    }, {
      name: 'settlement pins',
      format: 'KML',
      url: 'PeaceNow/settlement_pins-styled-ee5ed7a4b60baf81bcc8010a758237e8.kml',
      options: {
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
      }
    }, {
      name: 'settlements_in_pal_nghbrhd',
      format: 'KML',
      options: {},
      url: 'PeaceNow/settlements_in_pal_nghbrhd-styled-a03ed5d273b5f9a036df944b1c17fdc8.kml'
    }, {
      name: 'settlers_houses_jlem',
      format: 'KML',
      options: {},
      url: 'PeaceNow/settlers_houses_jlem-styled-e822b75facde5850200d334b3034352b.kml'
    }];


  map.addLayers([wms]);
  map.setBaseLayer(wms);

  OpenLayers.Array.filter(layers, function (options) {
    var layer = new OpenLayers.Layer.Vector(options.name, OpenLayers.Util.extend({
        projection: new OpenLayers.Projection("EPSG:4326"),
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
          url: options.url,
          format: new OpenLayers.Format[options.format](),
          formatOptions: {
            extractStyles: options.options.styleMap ? false : true,
            extractAttributes: true,
            maxDepth: 2
          }
        }),
        visibility: false
      }, options.options)),
      selectControl = new OpenLayers.Control.SelectFeature(layer, {
        onSelect: function (feature) {
          if (feature.attributes.hasOwnProperty('description')) {
            var selectedFeature = feature,
              popup = new OpenLayers.Popup.FramedCloud("chicken",
                feature.geometry.getBounds().getCenterLonLat(),
                null,
                popupContent(feature.attributes),
                null, true, function (evt) {
                  selectControl.unselect(selectedFeature);
                });
            feature.popup = popup;
            map.addPopup(popup);
          }
        },
        onUnselect: function (feature) {
          if (feature.hasOwnProperty('popup')) {
            map.removePopup(feature.popup);
            feature.popup.destroy();
            feature.popup = null;
          }
        }
      });
    map.addControl(selectControl);
    selectControl.activate();
    map.addLayer(layer);
  });

  map.zoomToExtent(new OpenLayers.Bounds(31.2912038299, 29.4918327893, 37.2167015076, 36.2755556125).transform(
        new OpenLayers.Projection("EPSG:4326"),
        map.getProjectionObject()
    ));
  map.setOptions({
      restrictedExtent: new OpenLayers.Bounds(31.2912038299, 29.4918327893, 37.2167015076, 36.2755556125).transform(
        new OpenLayers.Projection("EPSG:4326"),
        map.getProjectionObject()
    )
    });
}
