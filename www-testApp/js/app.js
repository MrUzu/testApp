/*
    * Copyright (c) 2012, Intel Corporation
     * File revision: 04 October 2012
     * Please see http://software.intel.com/html5/license/samples 
     * and the included README.md file for license terms and conditions.
*/
function byId(id)
{
    return document.getElementById(id);
}


var geolocation_options_constant = { maximumAge: 3000, timeout: Infinity, enableHighAccuracy: true };
var user_icon_width_constant  = 32;
var user_icon_height_constant = 32;
var car_icon_width_constant = 32;
var car_icon_height_constant = 32;

var end_finding = null;

/*
   UTILITY ROUTINES
*/

function log()
{
    if(console){ console.log.apply(console, arguments); } 
}



function toPixel(num)
{
    return num + "px";
}

function get_error_callback(msg)
{
    return function(er)
           {
               log("error: " + msg + " " + er);
               var error_p = byId("error");
               var err_string = (typeof er.message !== "undefined") ? er.message : "" +
                                (typeof er.code !== "undefined") ? er.code : "" +
                                er.toString();
               error_p.textContent =  msg + " " + err_string;
           };
}

function clear_error()
{
    var error_p = byId("error");
    error_p.textContent = "";
}

function coordinate_string(coords)
{
    return  "Latitude: " + coords.latitude + 
         "  Longitude: " + coords.longitude +
           " accuracy: " + coords.accuracy + " meters";
}

function coordinate_string_abbrev(coords)
{
    return         coords.latitude + 
           " / " + coords.longitude +
       "  acc: " + Math.round(coords.accuracy) + " meters";
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
    


/*
    INITIALIZATION 
*/



function setup_button_events()
{
    //set up the remember, find, and back buttons
    
    var rememberBtn = byId("remember-btn");
    if(rememberBtn){ rememberBtn.addEventListener("click", rememberf); }
    var findBtn = byId("find-btn");
    if(findBtn){ findBtn.addEventListener("click", findf); }
    var backBtn = byId("back-btn");
    if(backBtn){ backBtn.addEventListener("click", backf); }
}

/* 
    REMEMBER THIS LOCATION
*/

function rememberf()
{
    log("remember button clicked");
    var nav = navigator.geolocation.getCurrentPosition(remember_this/*, 
             get_error_callback("error when retrieving position"), 
             geolocation_options_constant*/); 
    log("position launched");
    log( nav );
}
var remember_this =  function(position)
{
    log("OK position passed");
	log(position);
    store_last_location(position);
    //display
    display_last_location(get_last_location());
    clear_error();
}

function display_last_location(coords)
{
    if(coords)
    {
        var last_location = byId("last-stored-location");
        last_location.textContent = coordinate_string(coords);
        last_location = byId("last-location");
        last_location.textContent = coordinate_string_abbrev(coords);
        var findBtn = byId("find-btn");
        findBtn.style.display = "block";
    }
}
function display_current_location(position)
{
    var str = coordinate_string_abbrev(position.coords);
    //if(position.coords.heading){ str += " Heading: " + position.coords.heading; }
    var current_location = byId("current-location");
    current_location.textContent = str;
}

function store_last_location(position)
{
    window.localStorage.setItem("com.intel.latitude", position.coords.latitude);
    window.localStorage.setItem("com.intel.longitude", position.coords.longitude);
    window.localStorage.setItem("com.intel.accuracy", position.coords.accuracy);
}



function get_last_location()
{
    var item_array = ["latitude", "longitude", "accuracy"];
    var coord_array = item_array.map(function(identifier)
                                    { 
                                        var item = window.localStorage.getItem("com.intel." + identifier);
                                        return item ? parseFloat(item) : null;
                                    });
                                    
    if(coord_array[0] === null){ return null; }
    
    var map = {};
    mapcar(null, function(key, val){ map[key] = val; }, item_array, coord_array); 
    return map;
}

/*
    TOGGLING TWO PAGES
*/
function findf()
{
    log("find-btn clicked");
    toggle_panes(true);
    
    var car_loc_f = setup_visualizer();
    start_finding(car_loc_f);
}

function backf()
{
    log("back-btn clicked");
    toggle_panes(false);
    end_finding();
}
function toggle_panes(show_find)
{
    var page = byId("startpage");
    page.style.display = show_find ? "none" : "block";
    page = byId("findpage");
    page.style.display = show_find ? "block" : "none";
}

function setup_visualizer()
{
    var vis = byId("visualizer");
    var vis_height = window.innerHeight - vis.offsetTop
    vis.style.height = toPixel(vis_height);
    
    position_user(vis.offsetWidth, vis_height);
    
    /* now adjust the car function */
    return( get_update_car_location_f(vis.offsetWidth, vis_height) );
    
}

function position_user(parentW, parentH)
{
    var user = byId("user");
    user.style.left = toPixel((parentW / 2) - (user_icon_width_constant / 2));
    user.style.top =  toPixel((parentH / 2) - (user_icon_height_constant / 2));
}

/*
  update car location
*/
 function get_update_car_location_f(parentW, parentH)
 { 
     return function(last_location, current_location)
            {
                var car = byId("car");
                var radius = (Math.min(parentW, parentH) / 2) - Math.max(car_icon_width_constant, car_icon_height_constant);
                var distance = calc_distance(last_location, current_location);
                var bearing = calc_bearing(current_location, last_location);
                //if(current_location.heading)
                //{
                //    bearing -= degrees_to_radians(current_location.heading);
                //}
                var xloc = (distance === 0) ? 0 : radius * Math.sin(bearing);
                var yloc = (distance === 0) ? 0 : radius * Math.cos(bearing) * -1;
                car.style.left = toPixel((parentW / 2) + xloc + (car_icon_width_constant / -2));
                car.style.top  = toPixel((parentH / 2) + yloc + (car_icon_height_constant / -2));
            };
 }

/*
    FIND LAST LOCATION 
*/

function start_finding(car_loc_f)
{
    var update_position_f = get_update_positionf(car_loc_f);
    
    var watchId = navigator.geolocation.watchPosition(update_position_f,
                                get_error_callback("error when retrieving position"),
                                geolocation_options_constant);
    end_finding =   function()
                    {
                        navigator.geolocation.clearWatch(watchId);                     
                    };
}

function get_update_positionf(car_loc_f)
{
    
    return( function(position)
            {
                log("new position received " +  position); 
                //log(update_car_location);
                //log(this.update_car_location);
                //log(w_c);
                //log("logging");
                display_current_location(position);
                var last_location = get_last_location();
                display_distance(calc_distance(last_location, position.coords));
                car_loc_f(last_location, position.coords);
                clear_error();
            });
}

function display_distance(d)
{
    var distance_span = byId("distance");
    distance_span.textContent = d + " meters";
}

/*
    DISTANCE CALULCATION ROUTINES
*/
function calc_distance(coords1, coords2)
{
    log("calc_distance", coords1, coords2);
    /* we calculate the haversine distance between two coordinates.
       basic pythagoran won't work because longituded lines converge at the poles, 
       so the distance between them is dependent upon the latitude. */
    var earth_radius = 6371000; // in meters
    var deltaLatitude  = degrees_to_radians(coords2.latitude-coords1.latitude);
    var deltaLongitude = degrees_to_radians(coords2.longitude-coords1.longitude);
    var lat1Radians = degrees_to_radians(coords1.latitude);
    var lat2Radians = degrees_to_radians(coords2.latitude);
    
    //haversine form
    var a = Math.sin(deltaLatitude/2) * Math.sin(deltaLatitude/2) +
            Math.sin(deltaLongitude/2) * Math.sin(deltaLongitude/2) * Math.cos(lat1Radians) * Math.cos(lat2Radians); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var distance = earth_radius * c;
    return(distance);
}

function calc_bearing(coords1, coords2)
{
    var deltaLongitude = degrees_to_radians(coords2.longitude-coords1.longitude);
    var lat1Radians = degrees_to_radians(coords1.latitude);
    var lat2Radians = degrees_to_radians(coords2.latitude);
    var y = Math.sin(deltaLongitude) * Math.cos(lat2Radians);
    var x = Math.cos(lat1Radians)*Math.sin(lat2Radians) -
            Math.sin(lat1Radians)*Math.cos(lat2Radians)*Math.cos(deltaLongitude);
    var bearing = Math.atan2(y, x);  //bearing is in radians
    return(bearing);
}

function degrees_to_radians(deg) 
{
    return deg * Math.PI / 180;
}
    
    

 

