#!/usr/bin/env node

'use strict';
 
/**
 * Module dependencies.
 */
var program = require('commander');
var request = require('request');
var search = require('image-search');
var secrets = require("./secrets.js");
var _ = require('underscore');
var wget = require('wget-improved');


/*To parse the input query
*/
function list(val) {
  return val.split(',');
}
 
program
  .version('0.0.1')
  .option('-i, --image [url]', 'Image URL', 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg')    
  .option('-q, --query <words>', 'Words list', list)  
  .option('-t, --timeout', 'Timeout', 3)
  .option('-o, --output [file]', 'Output Filename', 'out.jpg')
  .parse(process.argv); 


// console.log(secrets);
var Flickr = require("flickrapi"),
  flickrOptions = {
    api_key: secrets.FLICKR_API_KEY,
    secret: secrets.FLICKR_SECRET
  };
 
Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
  flickr.photos.search({
    text: "blue+fish"
  }, function(err, result) {
    if(err) { 
      throw new Error(err); 
    }
    // do something with result
    _.each(result.photos.photo, function(photo) {      
      //LINK TO IMAGE SOURCE
      var img_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "s.jpg";      
      console.log(img_src);      
      var pallette_src = 'http://rainbowbot.herokuapp.com/?url=' + img_src;
      request(pallette_src, function(err, response, body) {
        if (!error && response.statusCode == 200) {
          var data = JSON.parse(body);
          console.log(data.hex);
        } else {
          console.log('?' + err + response + body + pallette_src);
        }
      });
    });
  });
});

