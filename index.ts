console.faked();

export enum GridError {
	DIMENSION_OUT_OF_BOUNDS = "DIMENSION_OUT_OF_BOUNDS",
}

export class Grid {
	entries?: unknown[];

	#rowCount?: number | undefined;
	public get rowCount(): number | undefined {
		return this.#rowCount;
	}
	public set rowCount(value: number | undefined) {
		if (value && value <= 0) {
			console.error("rowCount may not be set to 0 or less");
			throw new Error(GridError.DIMENSION_OUT_OF_BOUNDS);
		}
		this.#rowCount = value;
	}

	#columnCount?: number | undefined;
	public get columnCount(): number | undefined {
		return this.#columnCount;
	}
	public set columnCount(value: number | undefined) {
		if (value && value <= 0) {
			console.error("columnCount may not be set to 0 or less");
			throw new Error(GridError.DIMENSION_OUT_OF_BOUNDS);
		}
		this.#columnCount = value;
	}
	constructor(_entries: unknown[] = [], _rowCount = 1, _columnCount = 1) {
		this.entries = _entries;
		this.rowCount = _rowCount;
		this.columnCount = _columnCount;
	}
}
export default Grid;
