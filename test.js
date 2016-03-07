#!/usr/bin/env node

'use strict';
 
/**
 * Module dependencies.
 */
var cheerio = require('cheerio');
var ColorThief = require('color-thief');
var fs = require('fs');
var program = require('commander');
var request = require('request');
var requestPromise = require('request-promise');
var Search = require('image-search');
var secrets = require("./secrets.js");
var _ = require('underscore');
var wget = require('wget-improved');
var flickr = require("flickrapi"),
  flickrOptions = {
    api_key: secrets.FLICKR_API_KEY,
    secret: secrets.FLICKR_SECRET
  };

/*To parse the input query
*/
function list(val) {
  return val.split(',');
}
 
program
  .version('0.0.1')
  .option('-i, --image [url]', 'Image URL', 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg')    
  .option('-q, --query <words>', 'Words list', list)  
  .option('-t, --timeout', 'Timeout', 1)
  .option('-o, --output [file]', 'Output Filename', 'out.jpg')
  .parse(process.argv); 


var getPallette = function(photo) {
  var options = {
    uri: photo.imgSrc
  };
  console.log(photo);
  var tmpFile = 'tmp/' + photo.id + "_" + photo.secret + "_" + "s.jpg"; 
  requestPromise(options)
    .then(function (data) {           
      fs.writeFileSync(tmpFile, data);      
      var colorThief = new ColorThief();
      photo.pallette = colorThief.getPalette(tmpFile, 8);      
    }).catch(function (err) {
      console.log(err);
    }); 
};

flickr.tokenOnly(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
  flickr.photos.search({
    //pass command line parameter 
    text: program.query,
    per_page: 1
  }, function(err, result) {
    if(err) { 
      throw new Error(err); 
    }
    // do something with result
    _.each(result.photos.photo, function(photo) {      
      //LINK TO IMAGE SOURCE
      var imgSrc = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "s.jpg";                  
      photo.imgSrc = imgSrc;      
      getPallette(photo);
    });
    console.log(result.photos.photo);    
  });
});

