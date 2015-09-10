/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@ INFO	: Dynamically loads jQuery and adds moduLoad	@@
@@ FUNCS: moduLoad ( [script src] );					@@
@@ VARS	: <script dir = "[dir]" main = "[main js]" />	@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
var s=document.createElement("script");s.setAttribute("type","text/javascript");s.setAttribute("src","http://10.0.0.2/jquery/jquery.min.js");s.onload=function(){var d="scripts";var m="main";$("script").each(function(){if($(this).attr("src").substr(-8)=="/core.js"){d=$(this).attr("dir")||d;m=$(this).attr("main")||m;}});_moduLoad={dir:d,main:m};moduLoad=function(e){if(typeof e==="string"){$.ajaxSetup({async:false});$.getScript("./"+_moduLoad.dir+"/"+e+".js").fail(function(j,s,ex){console.group("moduLoad");console.warn(" Failed to load module ["+e+"] : ./"+_moduLoad.dir+"/"+e+".js");console.error(ex);console.groupEnd()});$.ajaxSetup({async:true})}else if(Array.isArray(e)){$.ajaxSetup({async:false});for(var i=0;i<e.length;i++){if(typeof e[i]==="string"){$.getScript("./"+_moduLoad.dir+"/"+e[i]+".js").fail(function(j,s,ex){console.group("moduLoad");console.warn(" Failed to load module ["+e[i]+"] : ./"+_moduLoad.dir+"/"+e[i]+".js");console.error(ex);console.groupEnd()});}else{console.group("moduLoad");console.warn(" Index ["+i+"] of array was not a string.");console.trace();console.groupEnd()}}$.ajaxSetup({async:true})}else{console.group("moduLoad");console.warn(" Argument was not a string or an array of strings.");console.trace();console.groupEnd()}};moduLoad(_moduLoad.main)};document.head.insertBefore(s,document.head.firstChild)