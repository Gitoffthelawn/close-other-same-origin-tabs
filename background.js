//const temporary = browser.runtime.id.endsWith('@temporary-addon'); // debugging?
const manifest = browser.runtime.getManifest();
const extname = manifest.name;
const extdesc = manifest.description

async function close_other_same_origin_tabs(tab){
			const url = new URL(tab.url);
			// close other visible tabs with same origin
			const tabIds = (await browser.tabs.query({
				url: url.origin + "/*",
				hidden: false
			})).filter(t => t.id !== tab.id).map(t => t.id);
			browser.tabs.remove(tabIds);
}

browser.browserAction.onClicked.addListener( function(tab, clickData) {
    close_other_same_origin_tabs(tab);
});

browser.menus.create({
	id: extname,
	title: extdesc,
	contexts: ["tab","page"],
    onclick: function(info, tab) {
        close_other_same_origin_tabs(tab);
    }
});
