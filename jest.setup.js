const $ = require('jquery');
global.jQuery = $;
global.$ = $;

// Load the UMD build so $.fn.offCanvasMenu is registered
require('./dist/offcanvas-multilevel.umd.js');
