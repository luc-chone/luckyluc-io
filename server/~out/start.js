"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log(`server/start.ts`);
const express = require("express");
var fs = require('fs');
var app = express();
// Adding the static middleware at the beginning means it wins out over any routes present
// (but only interferes if the file exists)
app.use(express.static(__dirname + '/static'));
if (!fs.existsSync('./static')) {
    fs.mkdirSync('./static');
}
fs.writeFileSync('./static/cats.txt', 'Cats Static');
app.get('/', function (req, res) {
    res.send('Main Home');
});
// If this statement is called way up top before any routes are added,
// /cats/cats.txt works as expected
app.use('/cats', express.static(__dirname + '/static'));
// If this wildcard route is removed, /cats/cats.txt works as expected
app.get('/*', function (req, res) {
    res.send('Main Wildcard');
});
app.listen(3000);
//# sourceMappingURL=start.js.map