// actions to do when window opened
window.onload = function () {
    if (isRunningInTabMode()) {
        addEventHandlers();
    } else {
        openTabWindow();
    }
}


function isRunningInTabMode() {
    // if query string supplied, we're running in Tab mode.
    let search = window.location.search;
    return !((search == null) || !(/\S/.test(search)));
}

function openTabWindow() {
    // open new tab window, passing ID of open tab with content to convert to epub as query parameter.
    getActiveTab().then(function (tabId) {
        let url = chrome.runtime.getURL("popup.html") + "?id=";
        url += tabId;
        try {
            chrome.tabs.create({ url: url, openerTabId: tabId });
        }
        catch(err) {
            //firefox android catch
            chrome.tabs.create({ url: url});
        }
        window.close();
    });
}

function getActiveTab() {
    return new Promise(function (resolve, reject) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            if ((tabs != null) && (0 < tabs.length)) {
                resolve(tabs[0].id);
            } else {
                reject();
            };
        });
    });
}


