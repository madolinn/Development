var s = document.createElement("script");
s.setAttribute("type", "text/javascript");
s.setAttribute("src", "http://10.0.0.2/jquery/jquery.min.js");
s.onload = function () {
    var d = "scripts";
    var m = "main";
    $("script").each(function () {
        if ($(this).attr("src").substr(-8) == "/core.js") {
            d = $(this).attr("dir") || d;
            m = $(this).attr("main") || m;
        }
    });
    _moduLoad = {
        dir: d,
        main: m
    };
	_moduLoad.info = function(e) {
		var f = [];
		var p = [];
		for (key in window[e]) {
			if (typeof window[e][key] === "function") {
				f.push(key);
			} else {
				p.push(key);
			}
		}
		return ("moduLoad : Info of "+e+"\n   Function List : " + f.join(", ") +"\n   Property List : " + p.join(", "));
	}
    moduLoad = function (e) {
        if (typeof e === "string") {
			var a = document.createElement("script");
			a.setAttribute("type", "text/javascript");
			a.setAttribute("src", "./" + _moduLoad.dir + "/" + e + ".js");
			a.onload = function () { if(window.hasOwnProperty(e)) { window[e].info = function () { console.info(_moduLoad.info(e)); }}}
			document.head.insertBefore(a, document.head.lastChild);
        } else if (Array.isArray(e)) {
            for (var i = 0; i < e.length; i++) {
                if (typeof e[i] === "string") {
						var a = document.createElement("script");
						a.setAttribute("type", "text/javascript");
						a.setAttribute("src", "./" + _moduLoad.dir + "/" + e[i] + ".js");
						a.onload = function () { if(window.hasOwnProperty(e)) { window[e[i]].info = function () { console.info(_moduLoad.info(e[i])); }}}
						document.head.insertBefore(a, document.head.lastChild);
                } else {
                    console.group("moduLoad");
                    console.warn(" Index [" + i + "] of array was not a string.");
                    console.trace();
                    console.groupEnd();
                }
            }
        } else {
            console.group("moduLoad");
            console.warn(" Argument was not a string or an array of strings.");
            console.trace();
            console.groupEnd();
        }
    };
	moduLoad.info = function () { console.log(_moduLoad.info("moduLoad")); }
    moduLoad(_moduLoad.main);
};
document.head.insertBefore(s, document.head.firstChild);