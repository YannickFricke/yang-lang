/**
 * The TextLocation represents a position inside a text file.
 */
export type TextLocation = Readonly<{
	line_number: number;
	column: number;
}>;

/**
 * Creates a new TextLocation based on the given column and line number.
 *
 * @export
 * @param {number} [column=0] The column of the new TextLocation
 * @param {number} [line_number=1] The line number of the new TextLocation
 * @return {TextLocation} The newly created TextLocation
 */
export function create_text_location(column: number = 0, line_number: number = 1): TextLocation {
	return {
		column,
		line_number,
	};
}

/**
 * Returns a new TextLocation where the column is incremented by the given amount.
 *
 * @export
 * @param {TextLocation} text_location The TextLocation to increment
 * @param {number} amount The amount to increment the column
 * @return {TextLocation} The new TextLocation with the increment column
 */
export function advance_text_location(text_location: TextLocation, amount: number): TextLocation {
	return create_text_location(text_location.column + amount, text_location.line_number);
}

/**
 * Returns a new TextLocation where the column is set to 0 and the line number is incremented by one (1).
 *
 * @export
 * @param {TextLocation} text_location The TextLocation where the column should be reset and the line number incremented
 * @return {TextLocation} The new TextLocation where the column is reset and the line number incremented
 */
export function handle_newline_for_text_location(text_location: TextLocation): TextLocation {
	return create_text_location(0, text_location.line_number + 1);
}
