import { is_null_or_undefined, type Tagable } from './utils';

/**
 * Defines a successful operation result.
 */
export type Ok<T> = Tagable<'ok'> &
	Readonly<{
		value: T;
	}>;

/**
 * Creates a new successful operation result.
 *
 * @export
 * @template T The datatype of the result
 * @param {T} value The actual result
 * @return {Ok<T>} Returns a new successful operation result.
 */
export function Ok<T>(value: T): Ok<T> {
	return {
		tag: 'ok',
		value,
	};
}

/**
 * Checks if the given value is a successful operation result.
 *
 * This function can be used as a type guard.
 *
 * @export
 * @template T The datatype of the eventual operation result
 * @param {unknown} value The value to check
 * @return {boolean} Returns true when the given value is an Ok<T>. False otherwise.
 */
export function is_ok<T>(value: unknown): value is Ok<T> {
	if (is_null_or_undefined(value)) {
		return false;
	}

	if (typeof value !== 'object') {
		return false;
	}

	if (Array.isArray(value)) {
		return false;
	}

	const casted_value = value as Record<string, unknown>;

	if (casted_value.tag !== 'ok') {
		return false;
	}

	return true;
}

/**
 * Defines a failed operation result.
 */
export type Failure<ErrorType> = Tagable<'failure'> &
	Readonly<{
		reason: ErrorType;
	}>;

/**
 * Creates a new failed operation result.
 *
 * @export
 * @template ErrorType The datatype of the reason why the operation has failed
 * @param {ErrorType} reason The actual reason value
 * @return {Failure<ErrorType>} Returns a new failed operation result.
 */
export function Failure<ErrorType>(reason: ErrorType): Failure<ErrorType> {
	return {
		tag: 'failure',
		reason,
	};
}

/**
 * Checks if the given value is a failed operation result.
 *
 * This function can be used as a type guard.
 *
 * @export
 * @template T The datatype of the eventual operation result
 * @param {unknown} value The value to check
 * @return {boolean} Returns true when the given value is an Failure<T>. False otherwise.
 */
export function is_failure<T>(value: unknown): value is Failure<T> {
	if (is_null_or_undefined(value)) {
		return false;
	}

	if (typeof value !== 'object') {
		return false;
	}

	if (Array.isArray(value)) {
		return false;
	}

	const casted_value = value as Record<string, unknown>;

	if (casted_value.tag !== 'failure') {
		return false;
	}

	return true;
}

/**
 * The union type of Ok<T> and Failure<T> which should be used for return types.
 */
export type Result<SuccessType, ErrorType> = Ok<SuccessType> | Failure<ErrorType>;

/**
 * Checks if the given value is an operation result.
 *
 * @export
 * @template SuccessType The datatype of the eventual successful operation
 * @template ErrorType The datatype of the eventual failed operation
 * @param {unknown} value The value to check
 * @return {boolean} Returns true when the given value is either a Ok<T> or Failure<T>. False otherwise.
 */
export function is_result<SuccessType, ErrorType>(value: unknown): value is Result<SuccessType, ErrorType> {
	if (is_ok(value)) {
		return true;
	}

	if (is_failure(value)) {
		return true;
	}

	return false;
}
