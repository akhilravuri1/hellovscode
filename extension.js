// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hellovscode" is now active!');

	vscode.workspace.onDidCloseTextDocument(function (document) {
		console.log("close call")
		if (document.getText()) {
			const pickListItems = [];
			const option1 = {
				label: "Yes",
				description: "To submit the changes",
			};
			const option2 = {
				label: "No",
				description: "Delete the changes",
			};
			pickListItems.push(option1, option2)
			vscode.window.showQuickPick(pickListItems, {
				ignoreFocusOut: true,
				placeHolder: "Choose one of the action below",
			}).then(selected => {
				if (selected) {
					if (selected == option1) {
						vscode.window.showInformationMessage(document.getText())
					} else {
						console.log("No")
					}
				}
			});
		}
	})

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		var extPath = path.resolve(context.extensionPath);
		var path_file = path.resolve(extPath, "ddl.txt")
		vscode.workspace.openTextDocument(vscode.Uri.file(path_file)).
			then(value => {
				vscode.window.showTextDocument(value);
			})
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

//This is for testing the onDidClosetextDocument()
function Test() {

}

module.exports = {
	activate,
	deactivate
}
