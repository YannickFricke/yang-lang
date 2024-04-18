import { describe, expect, it } from 'bun:test';
import { advance_text_location, create_text_location, handle_newline_for_text_location } from '../TextLocation';

describe('TextLocation', () => {
	describe('create_text_location/2', () => {
		it('should return a new TextLocation when no arguments are passed', () => {
			const result = create_text_location();

			expect(result.column).toBe(0);
			expect(result.line_number).toBe(1);
		});

		it('should return a new TextLocation when one argument is passed', () => {
			const result = create_text_location(42);

			expect(result.column).toBe(42);
			expect(result.line_number).toBe(1);
		});

		it('should return a new TextLocation when two arguments are passed', () => {
			const result = create_text_location(13, 37);

			expect(result.column).toBe(13);
			expect(result.line_number).toBe(37);
		});
	});

	describe('advance_text_location/2', () => {
		it('should return a new TextLocation with the advanced column', () => {
			const start_location = create_text_location();
			const result = advance_text_location(start_location, 42);

			expect(result.column).toBe(42);
			expect(result.line_number).toBe(1);
		});
	});

	describe('handle_newline_for_text_location/1', () => {
		it('should reset the column', () => {
			const start_location = create_text_location(42);
			const result = handle_newline_for_text_location(start_location);

			expect(result.column).toBe(0);
		});

		it('should increment the line number', () => {
			const start_location = create_text_location();
			const result = handle_newline_for_text_location(start_location);

			expect(result.line_number).toBe(2);
		});
	});
});
