export type ReleaseNoteTocIssueCode =
	| 'anchor'
	| 'label'
	| 'missing-heading'
	| 'missing-toc'
	| 'order'
	| 'toc-format'
	| 'unexpected-entry';

export interface ReleaseNoteTocIssue {
	code: ReleaseNoteTocIssueCode;
	line: number;
	startCharacter: number;
	endCharacter: number;
	message: string;
}

export function headingToAnchor(heading: string): string;
export function validateReleaseNoteToc(content: string): ReleaseNoteTocIssue[];
