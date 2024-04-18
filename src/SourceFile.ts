import { accessSync, constants, existsSync, readFileSync, statSync } from 'fs';
import { resolve } from 'path';
import { Failure, Ok, type Result } from './Result';

/**
 * Defines a basic source file which contains a path and the contents of the file.
 */
export type SourceFile = Readonly<{
	file_path: string;
	file_contents: string;
}>;

/**
 * Creates a new SourceFile data structure based on the given file path and file contents.
 *
 * @export
 * @param {string} file_path The path to the file
 * @param {string} file_contents The contents of the file
 * @return {SourceFile} Returns the SourceFile datastructure based on the given arguments.
 */
export function create_source_file(file_path: string, file_contents: string): SourceFile {
	return {
		file_path,
		file_contents,
	};
}

/**
 * Reads the file at the given file path and returns a new SourceFile datastructure.
 *
 * @export
 * @param {string} file_path The path to the file which should be read
 * @return {SourceFile} Returns the SourceFile datastructure with the read file contents.
 */
export function read_source_file(file_path: string): Result<SourceFile, string> {
	const resolved_file_path = resolve(file_path);

	if (existsSync(resolved_file_path) === false) {
		return Failure(`File "${resolved_file_path}" does not exists`);
	}

	const stat_result = statSync(resolved_file_path);

	if (stat_result.isFile() === false) {
		return Failure(`The path "${resolved_file_path}" does not point to a file`);
	}

	if ((stat_result.mode & constants.R_OK) === 0) {
		return Failure(`File "${resolved_file_path}" is not readable by the current user`);
	}

	try {
		accessSync(resolved_file_path, constants.R_OK | constants.W_OK);
	} catch (error) {
		return Failure(`File "${resolved_file_path}" is not readable by the current user`);
	}

	const file_contents = readFileSync(resolved_file_path, {
		encoding: 'utf-8',
	});

	return Ok(create_source_file(resolved_file_path, file_contents));
}
