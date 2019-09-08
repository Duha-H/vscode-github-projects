import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as cp from 'child_process';
import { ProjectsProvider } from './viewComponents/projectsProvider';

export function activate(context: vscode.ExtensionContext) {

	console.log('GithubProjects is now active.');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('soup');
	});

	const workspaceFolders = vscode.workspace.workspaceFolders;
	const workspaceRoot = workspaceFolders
		? workspaceFolders[0].uri.fsPath
		: '';
	const projectsProvider = new ProjectsProvider(workspaceRoot);
	vscode.window.registerTreeDataProvider('github-projects', projectsProvider); // register a data provider to a view

	context.subscriptions.push(disposable);
	//const wsFolders = vscode.workspace.workspaceFolders;
	//const rootPath = wsFolders ? wsFolders[0].uri.fsPath : '';
	//const configPath = path.join(rootPath, '.git', 'config');
	//let contents = fs.readFileSync(configPath, 'utf-8');
	//console.log(contents);
}

export function deactivate() {}
