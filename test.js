#!/usr/bin/env node

'use strict';
 
/**
 * Module dependencies.
 */
var fotology = require('fotology');
var program = require('commander');
var search = require('image-search');
var _ = require('underscore');
var wget = require('wget-improved');

/*To parse the input query
*/
function list(val) {
  return val.split(',');
}

/* 
*/
var imageMap = [];
var _addImages = function(images) {
	_.each(images, function(image) {
		imageMap.push(image);
	})
}
 
program
  .version('0.0.1')
  .option('-i, --image [url]', 'Image URL', 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg')    
  .option('-q, --query <words>', 'Words list', list)  
  .option('-t, --timeout', 'Timeout', 3)
  .option('-o, --output [file]', 'Output Filename', 'out.jpg')
  .parse(process.argv); 

//fetch image url
// var options = {
// };
// var download = wget.download(program.image, program.output, options);
// download.on('error', function(err) {
//     console.log(err);
// });
// download.on('start', function(fileSize) {
//     console.log(fileSize);
// });
// download.on('end', function(output) {
//     console.log(output);
// });

//fetch all images from query list
// _.each(program.query, function(word) {
// 	console.log(word);
// 	search.google(word, function(err, images) {
// 		console.log(images);
// 	});
// });


// var search = require('image-search');
let options = {
    size: "large", // large images only
    language: "fr", // French
    safe: true, // force safe search on
    color: "white" // white cats only please
};
var images = [];
fotology("cats", options, function(imageUrls) {
	images.push(imageUrls);
});

console.log(images);


