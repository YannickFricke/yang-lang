/**
 * Defines a tagable datastructure which should be an object.
 *
 * Tags should be used to distinguish between different "type variants".
 */
export type Tagable<Tag extends string> = Readonly<{
	tag: Tag;
}>;

/**
 * Checks if the given value is null or undefined
 *
 * @export
 * @param {unknown} value The value to check
 * @return {boolean} Returns true when the value is either null or undefined. False otherwise.
 */
export function is_null_or_undefined(value: unknown): value is undefined | null {
	if (value === undefined) {
		return true;
	}

	if (value === null) {
		return true;
	}

	return false;
}
