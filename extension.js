const vscode = require('vscode');
const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');


/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	const res = await axios.get("https://blog.webdevsimplified.com/rss.xml")
	const parser = new XMLParser();
	const articles = parser.parse(res.data).rss.channel.item.map(
		article => ({
			label: article.title,
			detail: article.description,
			link: article.link
		})
	)
	console.log(articles)

	const disposable = vscode.commands.registerCommand('nd-search-blog.NDSearchBlog', async function () {
		const article = await vscode.window.showQuickPick(articles, {
			matchOnDetail: true
		})
		
		if (article == null) return
		vscode.env.openExternal(article.link);
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
