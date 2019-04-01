(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
"use strict";

var tabularmaps = require('./tabularmaps');

global.tabularmaps = tabularmaps;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./tabularmaps":2}],2:[function(require,module,exports){
"use strict";

var tile02long = function tile02long(x) {
  return x * 360 - 180;
};

var tile02lat = function tile02lat(y) {
  var n = Math.PI - 2 * Math.PI * y;
  return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
};

module.exports = {
  // the default board
  board: [[null, null, 31, 17, 15, 2, 1], [35, 32, 33, 18, 16, 5, 3], [42, 40, 34, 25, 20, 6, 4], [41, 44, 28, 26, 19, 10, 7], [43, 45, 27, 29, 21, 11, 9], [46, 38, 37, 30, 22, 13, 8], [47, 39, 36, 24, 23, 14, 12]],
  // default names
  names: {
    1: '北海道',
    2: '青森',
    3: '岩手',
    4: '宮城',
    5: '秋田',
    6: '山形',
    7: '福島',
    8: '茨城',
    9: '栃木',
    10: '群馬',
    11: '埼玉',
    12: '千葉',
    13: '東京',
    14: '神奈川',
    15: '新潟',
    16: '富山',
    17: '石川',
    18: '福井',
    19: '山梨',
    20: '長野',
    21: '岐阜',
    22: '静岡',
    23: '愛知',
    24: '三重',
    25: '滋賀',
    26: '京都',
    27: '大阪',
    28: '兵庫',
    29: '奈良',
    30: '和歌山',
    31: '鳥取',
    32: '島根',
    33: '岡山',
    34: '広島',
    35: '山口',
    36: '徳島',
    37: '香川',
    38: '愛媛',
    39: '高知',
    40: '福岡',
    41: '佐賀',
    42: '長崎',
    43: '熊本',
    44: '大分',
    45: '宮崎',
    46: '鹿児島',
    47: '沖縄'
  },
  // default thematic data table
  table: [[13, 14, 12, 11, 8, 9, 10, 19], 1],
  // default title
  title: '首都圏整備法にいう首都圏',
  // default coloring function
  color: function color(v) {
    if (v === 1) {
      return ['rgb', 0, 157, 220];
    } else {
      return ['rgb', 189, 188, 188];
    }
  },
  // default map div id
  map: 'map',
  // default spacing
  spacing: 0.005,
  // default margin
  margin: 0.2,
  // default attribution
  attribution: 'your attribution text here',
  createGeoJSON: function createGeoJSON() {
    var maxy = module.exports.board.length;
    var maxx = module.exports.board[0].length;
    var max = maxy > maxx ? maxy : maxx;
    var margin = module.exports.margin;
    var span = (1.0 - 2 * margin) / max;
    var paddingx = (1.0 - 2 * margin - maxx * span) / 2;
    var paddingy = (1.0 - 2 * margin - maxy * span) / 2;
    var spacing = module.exports.spacing;
    var geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [tile02long(margin + span), tile02lat(margin + span * 0.5)]
        },
        properties: {
          code: 'title',
          name: module.exports.title
        }
      }]
    };

    for (var y = 0; y < maxy; y++) {
      for (var x = 0; x < maxx; x++) {
        var code = module.exports.board[y][x];
        var name = module.exports.names[code];
        if (!code) continue;
        var left = margin + paddingx + x * span;
        var top = margin + paddingy + y * span;
        var geometry = {
          type: 'Polygon',
          coordinates: [[[tile02long(left + spacing), tile02lat(top + spacing)], [tile02long(left + spacing), tile02lat(top + span - spacing)], [tile02long(left + span - spacing), tile02lat(top + span - spacing)], [tile02long(left + span - spacing), tile02lat(top + spacing)], [tile02long(left + spacing), tile02lat(top + spacing)]]]
        };
        geojson.features.push({
          type: 'Feature',
          geometry: geometry,
          properties: {
            code: code,
            name: name
          }
        });
      }
    }

    return geojson;
  },
  createMap: function createMap() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (options.map) module.exports.map = options.map;
    if (options.board) module.exports.board = options.board;
    if (options.names) module.exports.names = options.names;
    if (options.table) module.exports.table = options.table;
    if (options.title) module.exports.title = options.title;
    if (options.color) module.exports.color = options.color;
    if (options.attribution) module.exports.attribution = options.attribution;
    var geojson = module.exports.createGeoJSON();
    var fillColorExpression = ['match', ['get', 'code']];

    for (var i = 0; i < module.exports.table.length; i = i + 2) {
      fillColorExpression.push(module.exports.table[i]);
      fillColorExpression.push(module.exports.color(module.exports.table[i + 1]));
    }

    fillColorExpression.push(['rgb', 189, 199, 188]);
    var style = {
      version: 8,
      glyphs: 'https://vectortiles.xyz/fonts/{fontstack}/{range}.pbf',
      sources: {
        v: {
          type: 'geojson',
          data: geojson,
          attribution: module.exports.attribution
        }
      },
      layers: [{
        id: 'background',
        type: 'background',
        paint: {
          'background-color': ['rgb', 255, 255, 255]
        }
      }, {
        id: 'fill',
        type: 'fill',
        source: 'v',
        layout: {},
        paint: {
          'fill-color': fillColorExpression
        }
      }, {
        id: 'symbol',
        type: 'symbol',
        source: 'v',
        layout: {
          'text-font': ['sans'],
          'text-field': ['get', 'name'],
          'text-size': ['interpolate', ['exponential', 2], ['zoom'], 0, 6, 7, 900],
          'text-max-width': 120
        },
        paint: {
          'text-color': ['match', ['get', 'code'], ['title'], ['rgb', 0, 0, 0], ['rgb', 255, 255, 255]]
        }
      }]
    };
    var map = new mapboxgl.Map({
      container: module.exports.map,
      style: style,
      attributionControl: true,
      bounds: [[tile02long(module.exports.margin), tile02lat(1 - module.exports.margin)], [tile02long(1 - module.exports.margin), tile02lat(module.exports.margin)]],
      hash: true,
      localIdengraphFontFamily: 'sans',
      maxZoom: 3.99,
      renderWorldCopies: false
    });
    map.on('load', function () {// map.addControl(new mapboxgl.NavigationControl())
    });
  }
};

},{}]},{},[1]);
