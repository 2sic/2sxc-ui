
/**
 * This marks a list of things - buttons or button-groups
 * which have an insert-cursor.
 * So any insert-operation should place additional things there.
 * @internal
 */
export interface ListWithCursor {
    _insertCursor?: 0;
}
