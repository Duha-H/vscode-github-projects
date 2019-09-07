import * as vscode from 'vscode';
import { ProjectsProvider } from './viewComponents/projectsProvider';

export function activate(context: vscode.ExtensionContext) {

	console.log('GithubProjects is now active.');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('soup');
	});

	const projects = new ProjectsProvider();
	vscode.window.registerTreeDataProvider('github-projects', projects); // register a data provider to a view

	context.subscriptions.push(disposable);
}

export function deactivate() {}
