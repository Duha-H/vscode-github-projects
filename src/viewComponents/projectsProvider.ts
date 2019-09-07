import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import {Project} from './projects';

export class ProjectsProvider implements vscode.TreeDataProvider<Project> {

	private _onDidChangeTreeData: vscode.EventEmitter<Project | undefined> = new vscode.EventEmitter<Project | undefined>();
	readonly onDidChangeTreeData: vscode.Event<Project | undefined> = this._onDidChangeTreeData.event;

	constructor(private workspaceRoot?: string) {
	}

    /*
	refresh(): void {
		this._onDidChangeTreeData.fire();
    }
    */

	getTreeItem(element: Project): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Project): vscode.ProviderResult<Project[]> {
        let dep = new Project('moduleName', vscode.TreeItemCollapsibleState.Collapsed);
		return [dep];
	}

}