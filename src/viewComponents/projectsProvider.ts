import * as vscode from 'vscode';
import * as cp from 'child_process';
import {Project} from './projects';

export class ProjectsProvider implements vscode.TreeDataProvider<Project> {

	private _onDidChangeTreeData: vscode.EventEmitter<Project | undefined> = new vscode.EventEmitter<Project | undefined>();
	readonly onDidChangeTreeData: vscode.Event<Project | undefined> = this._onDidChangeTreeData.event;

	constructor(private workspaceRoot: string) {	}

	/*
	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
	*/

	getTreeItem(element: Project): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Project): Thenable<Project[]> {
		if (!this.workspaceRoot) {
			vscode.window.showErrorMessage('No git reposityory found: workspace is empty.');
			console.log('Workspace empty');
			return Promise.resolve([]);
		}
		
		let gitUrl = this.getGitUrl();
		if (gitUrl.length === 0) {
			return Promise.resolve([]);			
		} else {
			let len = gitUrl.split('/').length;
			let projectName = gitUrl.split('/')[len - 1];
			let project = new Project(projectName, vscode.TreeItemCollapsibleState.Collapsed);
			//console.log(projectName);
			return Promise.resolve([project]);
		}
	}

	getGitUrl(): string {
		let url = '';
		let gitConfig : string[] = [];

		/*
		cp.exec('git config --list', {
			cwd: this.workspaceRoot
		}, (err, content) => {
			if (err) {
				vscode.window.showErrorMessage('Error obtaining git repository configuration.');
				console.log('No git url obtained: ', err);
				return url;
			}
			//console.log(content);
			gitConfig = content.split('\n');
			gitConfig.forEach((entry) => {
				if (entry.includes('remote.origin.url')) {
					url = entry.split('=')[1];
					//console.log(url);
					return url;
				}
			});
		});
		*/
		gitConfig = cp.execSync('git config --list', {
				cwd: this.workspaceRoot
			})
			.toString()
			.split('\n');
		gitConfig.forEach((entry) => {
			if (entry.includes('remote.origin.url')) {
				url = entry.split('=')[1];
				console.log('Obtained url: ', url);
			}
		});
		if (url.length === 0) {
			vscode.window.showErrorMessage('No url obtained.');
			console.log('something\'s up');
		}

		return url;
	}

}