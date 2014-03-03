/*
 * Copyright (c) 2012, Intel Corporation
 * File revision: 04 October 2012
 * Please see http://software.intel.com/html5/license/samples 
 * and the included README.md file for license terms and conditions.
 */
 
 
/* 
    PhoneGap Event Assist
    
    
    The purpose of this file is to make the deviceready event available to
    PhoneGap apps, as well as web applications.
    So an app that might be a web app or a mobile PhoneGap app can always 
    register for the deviceready event and know that it will be called regardless of context. 
    
*/



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
    //for testing only. 
    //var fail = document.getElementById("fail"); if(fail){ fail.textContent = "WEB CONTEXT"; }
}

function fireDeviceReadyInBrowser()
{   /* if (and only if) we are in a browser then fire the deviceready event
       otherwise let Cordova/PhoneGap handle that */
    if(typeof(window.device) === "undefined")
    { 
        if(typeof(window.cordova) !== "undefined")
        {
            window.cordova.fireDocumentEvent("deviceready", null, false);
        }
        else
        {
            fireEvent(document, "deviceready"); 
        }
    }
}



if(document.readyState !== "complete")
{
    if(typeof(window.cordova) !== "undefined")
    {
        window.cordova.getOriginalHandlers().document.addEventListener.call(document, "DOMContentLoaded", fireDeviceReadyInBrowser, false);
    }
    else
    {
        document.addEventListener("DOMContentLoaded", fireDeviceReadyInBrowser, false);
    }
}
else
{
    fireDeviceReadyInBrowser();
}
