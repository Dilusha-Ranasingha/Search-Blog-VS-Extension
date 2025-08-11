const vscode = require('vscode');
const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');


/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	const res = await axios.get("https://blog.webdevsimplified.com/rss.xml")
	const parser = new XMLParser();
	console.log(parser.parse(res.data))

	const disposable = vscode.commands.registerCommand('nd-search-blog.NDSearchBlog', function () {
		vscode.window.showInformationMessage('Hello World from ND Search Blogs!');
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
