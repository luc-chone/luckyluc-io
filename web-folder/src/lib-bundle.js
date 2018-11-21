/**
 * This is where the 3rd party get imported and put in the global scope. 
 * 
 * This will be processed individually by Rollup to `web/js/lib-bundle.js`
 * 
 * Keep it .js to make it simple (no need to have type checking on this file)
 * 
 */


import mvdom from 'mvdom';
window.mvdom = mvdom;

import * as p5 from 'p5';
window.p5 = p5.default;

// Note: At some point, we might want to three shake this one, and have it local to app-bundle
// import * as d3 from "d3";
// window.d3 = d3;

// import * as Gtx from "gtx";
// window.Gtx = Gtx;