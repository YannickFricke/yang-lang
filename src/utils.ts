/**
 * Defines a tagable datastructure which should be an object.
 *
 * Tags should be used to distinguish between different "type variants".
 */
export type Tagable<Tag extends string> = Readonly<{
	tag: Tag;
}>;
