import { describe, expect, it } from 'bun:test';
import { Failure, Ok, is_result } from '../Result';

describe('Result<T, U>', () => {
	describe('Ok<T>', () => {
		describe('Ok/1', () => {
			const result = Ok(13.37);

			it('it should return an object', () => {
				expect(typeof result).toBe('object');
			});

			it('should have the "ok" tag', () => {
				expect(result.tag).toBe('ok');
			});

			it('should have a successful value of undefiend', () => {
				expect(result.value).toBe(13.37);
			});
		});
	});

	describe('Failure<T>', () => {
		describe('Failure/1', () => {
			const result = Failure('Unit test error');

			it('it should return an object', () => {
				expect(typeof result).toBe('object');
			});

			it('should have the "ok" tag', () => {
				expect(result.tag).toBe('failure');
			});

			it('should have a successful value of undefiend', () => {
				expect(result.reason).toBe('Unit test error');
			});
		});
	});

	describe('Result<T, U>', () => {
		describe('is_result/1', () => {
			it('should return true when the value is an Ok<string>', () => {
				expect(is_result(Ok('unit testing'))).toBeTrue();
			});

			it('should return true when the value is an Failure<string>', () => {
				expect(is_result(Failure('unit testing'))).toBeTrue();
			});

			it('should return false when the value is null', () => {
				expect(is_result(null)).toBeFalse();
			});

			it('should return false when the value is undefined', () => {
				expect(is_result(undefined)).toBeFalse();
			});

			it('should return false when the value is a string', () => {
				expect(is_result('unit test')).toBeFalse();
			});

			it('should return false when the value is an array', () => {
				expect(is_result([])).toBeFalse();
			});

			it('should return false when the given value is an integer', () => {
				expect(is_result(42)).toBeFalse();
			});

			it('should return false when the given value is a float', () => {
				expect(is_result(13.37)).toBeFalse();
			});

			it('should return false when the given value is a boolean', () => {
				expect(is_result(true)).toBeFalse();
				expect(is_result(false)).toBeFalse();
			});

			it('should return false when the given value is a symbol', () => {
				expect(is_result(Symbol.for('unit-test'))).toBeFalse();
			});

			it('should return false when the given value is a BigInt', () => {
				expect(is_result(BigInt('1234'))).toBeFalse();
			});

			it('should return false when the given value is a function', () => {
				expect(is_result(() => {})).toBeFalse();
			});

			it('should return false when the given value is an object', () => {
				expect(is_result({})).toBeFalse();
			});
		});
	});
});
