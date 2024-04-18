import { describe, expect, it } from 'bun:test';
import { resolve } from 'path';
import type { Failure, Ok } from '../Result';
import { create_source_file, read_source_file, type SourceFile } from '../SourceFile';

describe('SourceFile', () => {
	describe('create_source_file/2', () => {
		it('should return a valid SourceFile datastructure', () => {
			const result = create_source_file('repl://1', 'unit test');

			expect(result.file_path).toBe('repl://1');
			expect(result.file_contents).toBe('unit test');
		});
	});

	describe('read_source_file', () => {
		it('should return a Failure<string> when the file does not exists', () => {
			const non_existing_file_path = resolve('./non-existing-file.txt');
			const result = read_source_file(non_existing_file_path);

			expect(result.tag).toBe('failure');
			expect((result as Failure<string>).reason).toBe(`File "${non_existing_file_path}" does not exists`);
		});

		it('should return a Failure<string> when the file is a directory', () => {
			const directory_path = resolve('./');
			const result = read_source_file(directory_path);

			expect(result.tag).toBe('failure');
			expect((result as Failure<string>).reason).toBe(`The path "${directory_path}" does not point to a file`);
		});

		it('should return a Failure<string> when the file is not readable', () => {
			const non_readable_file_path = resolve(import.meta.dirname, './testdata/non_readable_file.txt');
			const result = read_source_file(non_readable_file_path);

			expect(result.tag).toBe('failure');
			expect((result as Failure<string>).reason).toBe(
				`File "${non_readable_file_path}" is not readable by the current user`,
			);
		});

		it('should return an Ok<SourceFile> when the file does exists and is readable', () => {
			const readable_file_path = resolve(import.meta.dir, './testdata/readable_file.txt');
			const result = read_source_file(readable_file_path);

			expect(result.tag).toBe('ok');
			expect((result as Ok<SourceFile>).value.file_path).toBe(readable_file_path);
			expect((result as Ok<SourceFile>).value.file_contents).toBe('');
		});
	});
});
