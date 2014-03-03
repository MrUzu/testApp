/*
 * Copyright (c) 2012, Intel Corporation
 * File revision: 04 October 2012
 * Please see http://software.intel.com/html5/license/samples 
 * and the included README.md file for license terms and conditions.
 */

 /* 
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at
    
    http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/ 
 
 
/* 
    This is a dummy stub replacement for phonegap.js or cordova.js
    
    It fulfills _all_ of the PhoneGap API with dummy data so that you can 
    debug the Javascript of your PhoneGap applications directly in the browser.
    
    
    !!! WARNING !!!!
    
    Fauxgap.js is for testing only.  Do _not_ link to it or include it with your
    final phonegap project. 
    
    Be sure to replace its inclusion with one to phonegap.js or cordova.js
    
    !!!!!!!!!!!!!!!
    
    
    A NOTE ABOUT EVENTS
    the deviceready event will be fired after the DOM loads.  But there is no automatic mechanism
    for firing the other events.  If you need to test these, there is a fireEvent script you can use. 
    Example:    fireEvent(window, "batterycritical")
*/

/*
    fauxgap_ini
    Optionally configure the way fauxgap works with this Javascript map. 
    
    Each of the API areas (accelerometer, geolocation, et al) can be configured 
    to use stub values only when that API is missing (the default), or never, 
    or always. Some (but not all) of the APIs may exist if your web app is 
    being viewed on a mobile phone. Others exist in all modern browsers.
    
    NOTES: the various image callbacks ( Camera API, Media, etc)
           always call the success callback with a URI. Never with base64 image data. Regardless of options.
           
    NOTES: Many of the error constants and other enumerations do not match the values in the iOS or Android SDK. 
           they are simply dummy values. 

*/

var fauxgap_ini =  { 
                    faux_device: "when-missing",
                    device_properties: {name:"faux device", cordova:"2.1.0", phonegap:"2.1.0", platform:"iPhone", uuid:"fauxgap-simulated-uuid", version:"6.0"}, 

                    faux_accelerometer: "when-missing",    // values: "never", "when-missing", "always"
                    getCurrentAcceleration_succeeds: true, //change to false to have error handler called.
                    accelerometer_at_rest: false,
                    
                    faux_camera: "when-missing",
                    getPicture_succeeds: true,
                    picture_uri: "http://www.intel.com/content/dam/www/global/homepage/dragon.jpg/_jcr_content/renditions/small.jpg",
                    
                    faux_capture: "when-missing",
                    capture_succeeds: true,                //used for captureAudio, captureImage & captureVideo
                    
                    "captureImage":["http://www.intel.com/content/dam/www/global/homepage/dragon.jpg/_jcr_content/renditions/small.jpg",
                                    "http://www.intel.com/content/dam/www/global/homepage/smartphone.jpg/_jcr_content/renditions/small.jpg",
                                    "http://www.intel.com/content/dam/www/global/homepage/Xeon.jpg/_jcr_content/renditions/small.jpg",
                                    "http://www.intel.com/content/dam/www/global/homepage/shewill.jpg/_jcr_content/renditions/small.jpg"],
                    "captureAudio":["http://www.drodd.com/napoleon-dynamite/gonnadotoday.wav",
                                    "http://www.drodd.com/napoleon-dynamite/lakelochness.wav",
                                    "http://www.drodd.com/napoleon-dynamite/wolverines.wav",
                                    "http://www.drodd.com/napoleon-dynamite/feelverygood.wav"],
                    "captureVideo":["http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                                     "http://ia700409.us.archive.org/33/items/Gumbasia/Gumbasia_512kb.mp4"],
                                     
                     
                     faux_compass: "when-missing",
                     compass_succeeds: true,
                     heading_accuracy:4,
                     heading_delta: 2.7,
                     
                     faux_connection: "when-missing",
                     connection_type: 2,   //WIFI
                     
                     faux_contacts: "when-missing",
                     contact_find_succeeds: true,
                     contact_remove_succeeds: true,
                     contact_save_succeeds:true,
                     found_contacts: [{id:"001", displayName:"Big Bird", name:{formatted:"Mr.Big Bird", familyName:"Bird", givenName:"Big", middleName:"", honorificPrefix:"Mr.", honorificSuffix:""} }, 
                                      {id:"002", displayName: "Ernie", name:{formatted:"Ernie", familyName:"", givenName:"Ernie", middleName:"", honorificPrefix:"", honorificSuffix:""}},
                                      {id:"003", displayName: "Bert", name:{formatted:"Bert, esq.", familyName:"", givenName:"Bert", middleName:"", honorificPrefix:"", honorificSuffix:"esq."}}],
                                      
                     faux_filesystem: "when-missing",
                     filesystem_succeeds:true,
                     fileoperations_succeed: true,
                     filetransfer_succeed: true,
                     metadata: {modificationTime: new Date().getTime(), size:10000},
                     url: "http://www.intel.com",
                     upload_result: {bytesSent: 96000, responseCode:200, response:"OK"},
                     
                     faux_geolocation: "when-missing",
                     geolocation_succeed: true,
                     position: {timestamp: new Date().getTime(), coords: { latitude: 45.545498713662, longitude: 122.96071581588, altitude:0, accuracy:90, altitudeAccuracy:90, heading:0, speed:0}},
                     
                     faux_media: "when-missing",
                     media_succeed: true,
                     media_operation_succeed: true,
                     seconds: 5,
                     duration: 300,
                     
                     faux_notification: "when-missing",
                     notification_succeed: true,
                     
                     faux_storage: "when-missing",
                     db_succeed: true
                   };


/* -----------------------------------------------------------------------------
   UTILITY ROUTINES
----------------------------------------------------------------------------- */



function log()
{
    if(console){ console.log.apply(console, arguments); } 
}

function mapcar()
{
    /* argument list: this, function, Array-1, Array-2, .... Array-n
       where function takes N arguments .
       "this" argument can be null 
       Example:  mapcar(null, function(x, y){ return x+y; }, [1,2,3], [10,20,30])
                =>  [11,22,33] 
                
        sadly, JS won't let you do mapcar(null, +, [1,2,3], [10,20,30]);
    */
    
    var this_arg = arguments[0];
    var f = arguments[1];
    var args = Array.prototype.slice.call(arguments, 2);
    var result = [];
    var first_args = args[0];
    for(var i=0; i < first_args.length; i++)
    {
        result.push( f.apply(this_arg, args.map(function(sub_array){ return sub_array[i]; })));
    }
    return result;
}

/* -----------------------------------------------------------------------------
     DEVICE
----------------------------------------------------------------------------- */
if(fauxgap_ini.faux_device === "always" ||
   (fauxgap_ini.faux_device === "when-missing" &&
    typeof(navigator.device) === "undefined" ))
{
    navigator.device = fauxgap_ini.device_properties; 
    window.device = navigator.device;
}

/* -----------------------------------------------------------------------------
     ACCELEROMETER
----------------------------------------------------------------------------- */
if(fauxgap_ini.faux_accelerometer === "always" ||
   (fauxgap_ini.faux_accelerometer === "when-missing" &&
    typeof(navigator.accelerometer) === "undefined"))
{
    navigator.accelerometer = 
    {   
        getCurrentAcceleration: 
        function(successf, errorf)
        {
           if(fauxgap_ini.getCurrentAcceleration_succeeds)
           {
               successf(make_accelerometer(fauxgap_ini.accelerometer_at_rest));
           }else{ errorf(make_error("accelerometer")); }
        },
        
        watchAcceleration: 
        function(successf, errorf, options)
        {
          var frequency = 10000;
          if(options && typeof(options.frequency) === "number")
          {
              frequency = options.frequency;
          }
          var timer = setInterval(function(){ navigator.accelerometer.getCurrentAcceleration(successf, errorf); },
                                  frequency);
          return(timer);
        },
        
        clearWatch: 
        function(timer){ clearInterval(timer); }
    };
}

function make_accelerometer(at_rest)
{
    var accel = function(){ return(20 * (Math.random() - 0.5)); };
    var obj = { x: at_rest ? 0    : accel(),
                y: at_rest ? 0    : accel(),
                z: at_rest ? 9.81 : accel(),
                timestamp: new Date().getTime() };
    return(obj);
}


/* -----------------------------------------------------------------------------
    CAMERA SUPPORT
----------------------------------------------------------------------------- */
if(fauxgap_ini.faux_camera === "always" ||
   (fauxgap_ini.faux_camera === "when-missing" &&
    typeof(window.Camera) === "undefined"))
{
    window.Camera = { DestinationType  : {DATA_URL: "DATA_URL", FILE_URI: "FILE_URI" },
                      PictureSourceType: {CAMERA:"CAMERA", PHOTOLIBRARY: "PHOTOLIBRARY" , SAVEDPHOTOALBUM:"SAVEDPHOTOALBUM"},
                      EncodingType     : {JPEG:"JPEG", PNG:"PNG"},
                      PopoverArrowDirection : {ARROW_UP : 1, ARROW_DOWN : 2, ARROW_LEFT : 4, ARROW_RIGHT : 8, ARROW_ANY : 15}
                    };
}

if(fauxgap_ini.faux_camera === "always" ||
   (fauxgap_ini.faux_camera === "when-missing" &&
    typeof(navigator.camera) === "undefined"))
{
    navigator.camera = 
    {
        getPicture: 
        function(successf, errorf, options)
        {
            if(fauxgap_ini.getPicture_succeeds)
            {
               successf(fauxgap_ini.picture_uri);
            }else{ errorf("camera getPicture simulated failure"); }
        },
        
        cleanup: 
        function(successf, errorf)
        {
            if(fauxgap_ini.getPicture_succeeds)
            {
               successf();
            }else{ errorf("camera cleanup simulated failure"); }
        }
    };
}


/* -----------------------------------------------------------------------------
     CAPTURE
----------------------------------------------------------------------------- */
if(fauxgap_ini.faux_camera === "always" ||
   (fauxgap_ini.faux_camera === "when-missing" &&
    typeof(window.CaptureError) === "undefined"))
{
    window.CaptureError = { CAPTURE_INTERNAL_ERR: 0, 
                            CAPTURE_APPLICATION_BUSY:1,
                            CAPTURE_INVALID_ARGUMENT:2,
                            CAPTURE_NO_MEDIA_FILES:3,
                            CAPTURE_NOT_SUPPORTED:4 };
}
        
if(fauxgap_ini.faux_capture === "always" ||
   (fauxgap_ini.faux_capture === "when-missing" &&
    (typeof(navigator.device) === "undefined" || typeof(navigator.device.capture) === "undefined")))
{
    if(typeof(navigator.device) === "undefined"){ navigator.device = {}; }
    
    navigator.device.capture = 
    {
        captureAudio: make_capture_function("captureAudio"),
        
        captureImage: make_capture_function("captureImage"),
        
        captureVideo: make_capture_function("captureVideo")
    };
    
    window.capture = navigator.device.capture;
}

function make_capture_function(function_name)
{
    return( function(successf, errorf, options)
            {
                if(fauxgap_ini.capture_succeeds)
                {
                    var media_files = make_media_files(function_name)
                    if(media_files){ successf(media_files); }else{ errorf( {code:window.CaptureError.CAPTURE_NO_MEDIA_FILES}); }
                }else{ errorf(make_an_error(function_name, window.CaptureError)); }
            } );
}


function  make_media_files(function_name)
{
    var uri_array = fauxgap_ini[function_name];
    if(uri_array)
    {
        var count = Math.round(uri_array.length * Math.random());
        return(uri_array.slice(0, count));
    }
    return(null);
}


/* -----------------------------------------------------------------------------
     COMPASS
----------------------------------------------------------------------------- */
if(fauxgap_ini.faux_compass === "always" ||
   (fauxgap_ini.faux_compass === "when-missing" &&
    typeof(window.CompasError) === "undefined"))
{
    window.CompasError = { COMPASS_INTERNAL_ERR: 0, 
                            COMPASS_NOT_SUPPORTED:1 };
}

if(fauxgap_ini.faux_compass === "always" ||
   (fauxgap_ini.faux_compass === "when-missing" &&
    typeof(navigator.compass) === "undefined"))
{
    /* the heading rotates continuously */
    var last_heading = make_heading(fauxgap_ini.heading_accuracy);
    navigator.compass = 
    {   
        getCurrentHeading: 
        function(successf, errorf, options)
        {
           if(fauxgap_ini.compass_succeeds)
           {
               last_heading = get_heading(last_heading, fauxgap_ini.heading_delta);
               successf(last_heading);
           }else{ errorf(make_an_error("getCurrentHeading", window.CompassError)); }
        },
        
        watchHeading: 
        function(successf, errorf, options)
        {
          var frequency = 10000;
          if(options && typeof(options.frequency) === "number")
          {
              frequency = options.frequency;
          }
          var timer = setInterval(function(){ navigator.compass.getCurrentHeading(successf, errorf, options); },
                                  frequency);
          return(timer);
        },
        
        clearWatch: 
        function(timer){ clearInterval(timer); }
    };
}

function make_heading(){ return({magneticHeading:0, trueHeading:0, accuracy:4 }); }

function get_heading(last_heading, heading_delta)
{
    var h = last_heading.magneticHeading;
    h += heading_delta; h %= 360; h = (h < 0) ? h+360 : h;
    return({magneticHeading:h, trueHeading:h, accuracy:last_heading.accuracy});
}
  



/* -----------------------------------------------------------------------------
     CONNECTION
----------------------------------------------------------------------------- */
if(fauxgap_ini.faux_connection === "always" ||
   (fauxgap_ini.faux_connection === "when-missing" &&
    typeof(window.Connection) === "undefined"))
{
    window.Connection = { UNKNOWN:0,
                          ETHERNET:1,
                          WIFI:2,
                          CELL_2G:3,
                          CELL_3G:4,
                          CELL_4G:5,
                          NONE:6 };
}
if(fauxgap_ini.faux_connection === "always" ||
   (fauxgap_ini.faux_connection === "when-missing" &&
    (typeof(navigator.connection) === "undefined" || typeof(navigator.connection.type) === "undefined")))
{
    if(typeof(navigator.connection) === "undefined"){ navigator.connection = {}; }
    
    navigator.connection.type = fauxgap_ini.connection_type;
}


/* -----------------------------------------------------------------------------
     CONTACTS
----------------------------------------------------------------------------- */
if(fauxgap_ini.faux_contacts === "always" ||
   (fauxgap_ini.faux_contacts === "when-missing" &&
    typeof(window.ContactFindOptions) === "undefined"))
{
    window.ContactFindOptions = function(){ this.filter = ""; this.multiple = true;  };
}
if(fauxgap_ini.faux_contacts === "always" ||
   (fauxgap_ini.faux_contacts === "when-missing" &&
    typeof(navigator.contacts) === "undefined"))
{
    navigator.contacts = 
    {   
        create: 
        function(ci)
        {
            var contact = make_contact(ci, 
                ["id", "displayName", "name", 
                 "nickname", "phoneNumbers", "emails", 
                 "addresses", 
                 "ims", 
                 "organizations",
                 "birthday", "note", 
                 "photos", "categories", "urls"],
                 ["001", "", ["formatted", "familyName", "givenName", "middleName", "honorificPrefix", "honorificSuffix"],
                  "", ["type", "value", "pref"], ["type", "value", "pref"], 
                  ["type", "formatted", "streetAddress", "locality", "region", "postalCode", "country", "pref"],
                  ["type", "value", "pref"], 
                  ["type", "name", "deparment", "title", "pref"],
                  0, "",
                  ["type", "value", "pref"],["type", "value", "pref"],["type", "value", "pref"]]);
            
            contact.clone = function(){ log("contact.clone execution simulated"); return( navigator.contacts.create({id:null}));};
            contact.remove = function(successf, errorf){if(fauxgap_ini.contact_remove_succeeds){ successf(); }else{ errorf(make_error("contact.remove")); }};
            contact.save = function(successf, errorf){if(fauxgap_ini.contact_save_succeeds){ successf(this); }else{ errorf(make_error("contact.save")); }};
            return(contact); 
        },
        
        find: 
        function(contactFields, successf, errorf, contactFindOptions)
        {
            if(fauxgap_ini.contact_find_succeeds)
            {
                //successf(navigator.contacts.create.apply(navigator.contacts, fauxgap_ini.found_contacts));
                successf(fauxgap_ini.found_contacts.map(navigator.contacts.create));
            }
            else if(errorf){ errorf(make_error("contacts.find")); }
        }
    };
}

/*
   make_contact is not performant O(n^2). But short and easy to read. 
*/
function make_contact(default_contact_info, key_list, type_list)
{
    //make an empty contact
    var contact = make_object_from_keys_and_types(key_list, type_list);
    //initialize it with defaults in ci
    var def_keys = Object.keys(default_contact_info);
    def_keys.forEach(function(k){ contact[k] = default_contact_info[k]; }); 
    
    return(contact);
}

function make_object_from_keys_and_types(key_list, type_list)
{
    var obj = make_object_from_keys(key_list);
    mapcar(null, function(key, type_d)
                 {
                     if(type_d instanceof Array) //sub-object
                     {
                         obj[key] = make_object_from_keys(type_d);
                     }else if(type_d instanceof Number){ obj[key]  = new Date().getTime(); }
                 },
                 key_list,
                 type_list);
    return(obj);
}
function make_object_from_keys(key_list)
{
    var obj = {};
    key_list.forEach(function(k){ obj[k] = "" });
    return(obj);
}


/*
["001", "Big Bird", {formatted: "Mr. Big Bird", familyName: "Bird", givenName: "Big", middleName: "", honorificPrefix: "Mr.", honorificSuffix: ""},
  "Stretch", [{type:"mobile", value:"212-555-1212", pref:true}],
  [{type:"work", value:"bigbird72@geocities.com", pref:true}],
  [{pref:true, type:"work", formatted:"44 Sesame Street  Apt. D, New York City NY 20211", streetAddress:"44 Sesame Street Apt. D", locality: "New York City", region:"NY", postalCode:"20211", country: "USA"}],
  [],
  [{pref:false, type:"work", name:"Public Broadcasting Corp", department:"Childrens Entertainment", title:"Executive Entertainer (exempt)"}],

*/



/* -----------------------------------------------------------------------------
     FILESYSTEM
----------------------------------------------------------------------------- */
if(fauxgap_ini.faux_filesystem === "always" ||
   (fauxgap_ini.faux_filesystem === "when-missing" &&
    typeof(window.FileError) === "undefined"))
{
    var FileError = {};
    FileError.NOT_FOUND_ERR                     = 1;
    FileError.SECURITY_ERR                      = 2;
    FileError.ABORT_ERR                         = 3;
    FileError.NOT_READABLE_ERR                  = 4;
    FileError.ENCODING_ERR                      = 5;
    FileError.NO_MODIFICATION_ALLOWED_ERR       = 6;
    FileError.INVALID_STATE_ERR                 = 7;
    FileError.SYNTAX_ERR                        = 8;
    FileError.INVALID_MODIFICATION_ERR          = 9;
    FileError.QUOTA_EXCEEDED_ERR                = 10;
    FileError.TYPE_MISMATCH_ERR                 = 11;
    FileError.PATH_EXISTS_ERR                   = 12;
    window.FileError = FileError;
}

if(fauxgap_ini.faux_filesystem === "always" ||
   (fauxgap_ini.faux_filesystem === "when-missing" &&
    typeof(window.FileError) === "undefined"))
{
    var FileTransferError = {};
    FileTransferError.FILE_NOT_FOUND_ERR    = 1;
    FileTransferError.INVALID_URL_ERR       = 2;
    FileTransferError.CONNECTION_ERR        = 3;
    window.FileTransferError = FileTransferError;
}

if(fauxgap_ini.faux_filesystem === "always" ||
   (fauxgap_ini.faux_filesystem === "when-missing" &&
    typeof(window.LocalFileSystem) === "undefined"))
{
    window.LocalFileSystem = 
    {
        requestFileSystem: 
        function(access_type, size, successf, errorf)
        {
            if(fauxgap_ini.filesystem_succeeds)
            {
                successf(make_filesystem());
            }
            else if(errorf){ errorf(make_an_error("requestFileSystem", window.FileError)); }
        },
        
        resolveLocalFileSystemURI: 
        function(path, successf, errorf)
        {
            if(fauxgap_ini.filesystem_succeeds)
            {
                successf(make_filesystem());
            }
            else if(errorf){ errorf(make_an_error("resolveLocalFileSystemURI", window.FileError)); }
        },
        
        PERSISTENT: 0,
        TEMPORARY: 1
    };
    window.requestFileSystem = window.LocalFileSystem.requestFileSystem;
    window.resolveLocalFileSystemURI = window.LocalFileSystem.resolveLocalFileSystemURI;
    
    
    window.DirectoryEntry = function(name, fullpath)
    {
        this.isFile = false;
        this.isDirectory = true;
        this.name = name;
        this.fullpath = fullpath;
        this.getMetadata = function(successf, errorf)
                           {    if(fauxgap_ini.fileoperations_succeed)
                                { successf(fauxgap_ini.metadata); }
                                else{ errorf(make_an_error("getMetadata", window.FileError)); }
                           };
        this.setMetadata =  function(successf, errorf, metadata)
                            {
                                if(fauxgap_ini.fileoperations_succeed)
                                {
                                    successf(metadata);
                                }else{ errorf(make_an_error("setMetadata", window.FileError)); }
                            };
        this.moveTo = function(parent, newName, successf, errorf)
        {
            if(fauxgap_ini.fileoperations_succeed)
            {
                successf(make_random_directory());
            }else{ errorf(make_an_error("moveTo", window.FileError)); }
        };
        this.copyTo = function(parent, newName, successf, errorf)
        {
            if(fauxgap_ini.fileoperations_succeed)
            {
                successf(make_random_directory());
            }else{ errorf(make_an_error("copyTo", window.FileError)); }
        };
        this.toURL = function(){ return(fauxgap_ini.url); };
        this.remove    = function(successf, errorf)
        {
            if(fauxgap_ini.fileoperations_succeed)
            {
                successf();
            }else{ errorf(make_an_error("remove", window.FileError)); }
        };
        this.getParent = function(successf, errorf)
        {
            if(fauxgap_ini.fileoperations_succeed)
            {
                successf(make_random_directory());
            }else{ errorf(make_an_error("getParent", window.FileError)); }
        };
        this.createReader = function()
        {
            var theReader = {};
            theReader.readEntries = function(successf, errorf)
            {
                if(fauxgap_ini.fileoperations_succeed)
                {
                    successf(make_random_entries());
                }else{ errorf(make_an_error("readEntries", window.FileError)); }
            };
            return(theReader);
        };
        this.getDirectory = function(path, options, successf, errorf)
        {
            if(fauxgap_ini.fileoperations_succeed)
            {
                successf(make_random_directory());
            }else{ errorf(make_an_error("getDirectory", window.FileError)); }
        };
        this.getFile = function(path, options, successf, errorf)
        {
            if(fauxgap_ini.fileoperations_succeed)
            {
                successf(make_random_file());
            }else{ errorf(make_an_error("getFile", window.FileError)); }
        };
        this.removeRecursively  = function(successf, errorf)
        {
            if(fauxgap_ini.fileoperations_succeed)
            {
                successf();
            }else{ errorf(make_an_error("removeRecursively", window.FileError)); }
        };                                
    };
    
    window.FileTransfer = function()
    {
        this.upload = function(filePath, server, successf, errorf, options)
        {
            if(fauxgap_ini.filetransfer_succeed)
            {
                successf(fauxgap_ini.upload_result);
            }else{ errorf(make_an_error("upload", window.FileTransferError)); }
        };
        this.download = function(source, target, successf, errorf)
        {
            if(fauxgap_ini.filetransfer_succeed)
            {
                successf(make_random_file());
            }else{ errorf(make_an_error("download", window.FileTransferError)); }
        };
    };
}

function make_filesystem()
{
    return( {name: "name of file system", 
             root: new DirectoryEntry("root", "/root") });
}



function make_file_writer(file_name)
{
    var filewriter = {readyState:"DONE", fileName:file_name, length:14000, position:100, error:null};
    //  onwritestart:null, onwrite:null, onabort:null, onerror:null, onwriteend:nul
    filewriter.abort     = function(){ log("filewriter.abort called"); if(filewriter.onabort){ filewriter.onabort(); } }; 
    filewriter.seek      = function(x){ log("filewriter.seek(" + x + ") called"); };
    filewriter.truncate  = function(x){ log("filewriter.truncate(" + x + ") called"); };
    filewriter.write     = function(x){ 
                            if(filewriter.onwritestart){ filewriter.onwritestart(); } 
                            if(filewriter.onwrite){ filewriter.onwrite(); }
                            log("filewriter.write( " + x + " ) called"); 
                            if(filewriter.onwriteend){ filewriter.onwriteend(); }   };
    return(filewriter);
}

function make_random_directory()
{
    var directory_name = "directory_" + (1000 * Math.random()); 
    var fullpath = "/root/" + directory_name;
    return( new DirectoryEntry(directory_name, fullpath) );
}

/* 
    in a traditional OO hierarchy it would make more sense for 
    a directory class to inherit from file and extend it. 
    But javascript doesn't have inheritance, and, in this situation, 
    the API specifies that the DirectoryEntry() function may be directly called
    by JS code, but there is no matching FileEntry() call, files are always 
    gotten from a DirectoryEntry or FileSystem 
*/
function make_random_file()
{
    var file_name = "file_" + (1000 * Math.random());
    var fullpath = "/root/" + file_name;
    var entry = new DirectoryEntry(file_name, fullpath);
    //now override
    entry.isFile = true;
    entry.isDirectory = false;
    delete entry.createReader;
    delete entry.getDirectory;
    delete entry.getFile;
    delete entry.removeRecursively;
    
    entry.createWriter = function(successf, errorf)
    {
        if(fauxgap_ini.fileoperations_succeed)
        {
            successf( make_file_writer(file_name) );
        }else{ errorf(make_an_error("createWriter", window.FileError)); }
    };
    
    entry.file = function(successf, errorf)
    {
        if(fauxgap_ini.fileoperations_succeed)
        {
            successf( {name: file_name, fullPath: fullpath,  type: "text/html", size:12000, lastModifiedDate: new Date().getTime()} );
        }else{ errorf(make_an_error("FileEntry.file", window.FileError)); }
    };
    return(entry);
}

function make_random_entries()
{
    var numEntries = Math.round(20 * Math.random());
    var result = [];
    for(var i=0; i<numEntries; i++)
    {
        var make_dir = Math.random() > 0.5;
        result.push( make_dir ? make_random_directory() : make_random_file() );
    }
    return(result);
}
    
    
/* -----------------------------------------------------------------------------
     GEOLOCATION
----------------------------------------------------------------------------- */
if(fauxgap_ini.faux_geolocation === "always" ||
   (fauxgap_ini.faux_geolocation === "when-missing" &&
    typeof(navigator.geolocation) === "undefined"))
{
    navigator.geolocation = 
    {
        getCurrentPosition: 
        function(successf, errorf, options)
        {
            if(fauxgap_ini.geolocation_succeed)
            {
                successf(fauxgap_ini.position);
            }else if(errorf){ errorf(make_error("geolocation.getCurrentPosition")); }
        },
        
        watchPosition:
        function(successf, errorf, options)
        {
          var frequency = 10000;
          if(options && typeof(options.frequency) === "number")
          {
              frequency = options.frequency;
          }
          var timer = setInterval(function(){ navigator.geolocation.getCurrentPosition(successf, errorf, options); },
                                  frequency);
          return(timer);
        },
        
        clearWatch: 
        function(timer){ clearInterval(timer); }
    };
}

/* -----------------------------------------------------------------------------
     MEDIA
----------------------------------------------------------------------------- */
if(fauxgap_ini.faux_media === "always" ||
   (fauxgap_ini.faux_media === "when-missing" &&
    typeof(window.MediaError) === "undefined"))
{
    var MediaError = {};
    MediaError.MEDIA_ERR_ABORTED            = 1;
    MediaError.MEDIA_ERR_NETWORK            = 2;
    MediaError.MEDIA_ERR_DECODE             = 3;
    MediaError.MEDIA_ERR_NONE_SUPPORTED     = 4;
    window.MediaError = MediaError;
}
if(fauxgap_ini.faux_media === "always" ||
   (fauxgap_ini.faux_media === "when-missing" &&
    typeof(window.Media) === "undefined"))
{
    window.Media = function(src, successf, errorf, status)
    {
        this.MEDIA_NONE     = 0;
        this.MEDIA_STARTING = 1;
        this.MEDIA_RUNNING  = 2;
        this.MEDIA_PAUSED   = 3;
        this.MEDIA_STOPPED  = 4;
        
        this.getCurrentPosition = function(successf, errorf)
        {
            if(fauxgap_ini.media_operation_succeed)
            {
                successf(fauxgap_ini.seconds);
            }else if(errorf){ errorf(make_an_error("media.getCurrentPosition", window.MediaError)); }
        };
        
        this.getDuration = function(){ return(fauxgap_ini.duration); };
        
        this.play           = function(){ log("media.play simulated"); };
        this.release        = function(){ log("media.release simulated"); };
        this.seekTo         = function(){ log("media.seekTo simulated"); };
        this.startRecord    = function(){ log("media.startRecord simulated"); };
        this.stop           = function(){ log("media.stop simulated"); };
        this.stopRecord     = function(){ log("media.stopRecord simulated"); };
        
        if(fauxgap_ini.media_succeed)
        {
            successf();
        }else if(errorf){ errorf(make_an_error("Media constructor", window.MediaError)); }
    };
}


/* -----------------------------------------------------------------------------
     NOTIFICATION
----------------------------------------------------------------------------- */
if(fauxgap_ini.faux_notification === "always" ||
   (fauxgap_ini.faux_notification === "when-missing" &&
    typeof(navigator.notification) === "undefined"))
{
    navigator.notification = 
    {
        alert:
        function(message, callbackf, title, buttonName)
        {
            alert(message);
            callbackf();
        },
        
        confirm:
        function(message, callbackf, title, buttonLabels)
        {
            var ok = confirm(message);
            callbackf(ok ? 1 : 2); //i guess we could parse buttonLabels and pick a random number
        },
        
        
        beep:
        function(times){ log("notification.beep simulated " + times + " times"); },
        
        vibrate:
        function(milliseconds){ log("notification.vibrate simulated for " + milliseconds + " milliseconds"); }
                
    };
}


/* -----------------------------------------------------------------------------
     STORAGE
----------------------------------------------------------------------------- */
if(fauxgap_ini.faux_storage === "always" ||
   (fauxgap_ini.faux_storage === "when-missing" &&
    typeof(window.SQLError) === "undefined"))
{
    var SQLError = {};
    
    SQLError.UNKNOWN_ERR            = 1;
    SQLError.DATABASE_ERR           = 2;
    SQLError.VERSION_ERR            = 3;
    SQLError.TOO_LARGE_ERR          = 4;
    SQLError.QUOTA_ERR              = 5;
    SQLError.SYNTAX_ERR             = 6;
    SQLError.CONSTRAINT_ERR         = 7;
    SQLError.TIMEOUT_ERR            = 8;
    
    window.SQLError = SQLError;
}
if(fauxgap_ini.faux_storage === "always" ||
   (fauxgap_ini.faux_storage === "when-missing" &&
    typeof(window.openDatabase) === "undefined"))
{
    window.openDatabase = function(database_name, database_version, database_displayname, database_size)
    {
        var db = {};
        
        db.transaction = function(transactionf, errorf, successf)
        {
            var tx = make_transaction();
            transactionf(tx);
            if(fauxgap_ini.db_succeed){ successf(); }else{ errorf(); }
        };
        
        db.changeVersion = function(){};
        
        return(db);
    };
}

function make_transaction()
{
    var tx = {};
    tx.executeSql = function(msg, arr, successf, errorf)
    {
        log("simulated sql execution: " + msg);
        if(fauxgap_ini.db_succeed){ if(successf){ successf(tx, {insertId:0, rowsAffected:0, rows:null}); }}
        else if(errorf){ errorf(make_an_error("executeSql", window.SQLError)); }
    };
    return(tx);
}
        
        
/* -----------------------------------------------------------------------------
    fauxgap support 
----------------------------------------------------------------------------- */
function make_error(str)
{
    return( { message: "simulated error accessing " + str, 
                 code: Math.round(1000 * Math.random()) }); 
}

function make_an_error(str, error_obj)
{
    // returns a random error value selected from the error obj
     var error_keys = Object.keys(error_obj);
    var code_index = Math.round(error_keys.length * Math.random());
    return( { code: error_obj[error_keys[code_index]],
              message: "simulated error performing " + str });
}



  

/* -----------------------------------------------------------------------------
    DEVICE READY
----------------------------------------------------------------------------- */

function fireEvent(obj,evt)
{

    var fireOnThis = obj;
    var evObj;
    if( document.createEvent ) {
      evObj = document.createEvent('CustomEvent');
      evObj.initEvent( evt, true, false );
      fireOnThis.dispatchEvent( evObj );

    } else if( document.createEventObject ) {
      evObj = document.createEventObject();
      fireOnThis.fireEvent( 'on' + evt, evObj );
    }
}
 
if(document.readyState !== "complete")
{
    document.addEventListener("DOMContentLoaded", 
                              function(){ fireEvent(document, "deviceready"); }, 
                              false);
}else{ fireEvent(document, "deviceready"); }