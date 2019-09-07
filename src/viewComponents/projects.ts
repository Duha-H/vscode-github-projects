import * as vscode from 'vscode';
import * as path from 'path';


export class Project extends vscode.TreeItem {

	constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);
	}

	get tooltip(): string {
		return `${this.label}`;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'assets', 'right_arrow.svg'),
		dark: path.join(__filename, '..', '..', 'assets', 'right_arrow.svg')
	};

	contextValue = 'project';

}