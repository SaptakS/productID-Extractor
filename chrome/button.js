var func = {
	dispURL: function() {
		alert(window.content.location.href);
	},

	showPanel: function() {
		var button = document.getElementById("custom-button-1");
		var panel = document.getElementById("thepanel");
        var url = window.content.location.href;
        if (!validUrl(url)) {
            document.getElementById("desc").setAttribute("value", "Not a Product Page");
        } else {
            var pid = extractUrl(url);
            document.getElementById("desc").setAttribute("value", pid);
        }
		panel.openPopup(button, 'after_start', 0, 0, false, false);
	}
}

function extractUrl(url) {
    var extracting_regex = /\/dp\/\w+\/|\/product\/\w+(\/|\?)/g;        //product code extracting regex
    var match = url.match(extracting_regex);                    //match extracts the string which matches the regex from the url.
    match = ""+match;
    var pCode = "";

    /*if the extracted string has "product" then the beginning index of the product code in the string match is 9.
    else if it contains "dp" then the beginning index of the product code in the string match is 2.*/
    if(match.match(/product/g)) {
        pCode = match.slice(9, match.length-1);     
    } else if(match.match(/dp/g)) {
        pCode = match.slice(4, match.length-1);     
    }
    return pCode;
}

function validUrl(url) {
    var regex_valid = /www.amazon.+\/gp\/product\/\w+(\/|\?)|www.amazon.+\/*\/dp\/\w+(\/|\?)/g;    //regex to check whether the url is valid or not
    var n = url.search(regex_valid);
    if(n == -1){
        return false;
    } else {
        return true;
    }    
}

/**
 * Installs the toolbar button with the given ID into the given
 * toolbar, if it is not already present in the document.
 *
 * @param {string} toolbarId The ID of the toolbar to install to.
 * @param {string} id The ID of the button to install.
 * @param {string} afterId The ID of the element to insert after. @optional
 */
function installButton(toolbarId, id, afterId) {
    if (!document.getElementById(id)) {
        var toolbar = document.getElementById(toolbarId);

        // If no afterId is given, then append the item to the toolbar
        var before = null;
        if (afterId) {
            let elem = document.getElementById(afterId);
            if (elem && elem.parentNode == toolbar)
                before = elem.nextElementSibling;
        }

        toolbar.insertItem(id, before);
        toolbar.setAttribute("currentset", toolbar.currentSet);
        document.persist(toolbar.id, "currentset");

        if (toolbarId == "addon-bar")
            toolbar.collapsed = false;
    }
}

if (firstRun) {
    installButton("nav-bar", "my-extension-navbar-button");
    // The "addon-bar" is available since Firefox 4
    installButton("addon-bar", "my-extension-addon-bar-button");
}