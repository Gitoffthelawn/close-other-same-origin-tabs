//const temporary = browser.runtime.id.endsWith('@temporary-addon'); // debugging?
const manifest = browser.runtime.getManifest();
const extname = manifest.name;
const extdesc = manifest.description

browser.menus.create({
	id: extname,
	title: extdesc,
	contexts: ["tab"],
	onclick: async function(info, tab) {
		if(info.menuItemId.startsWith(extname)){
			const url = new URL(tab.url);
			// close other visible tabs with same origin
			const tabIds = (await browser.tabs.query({ 
				url: url.origin + "/*",
				hidden: false 
			})).filter(t => t.id !== tab.id).map(t => t.id);
			browser.tabs.remove(tabIds);
		}
	}
});

