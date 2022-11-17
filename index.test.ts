import Grid, { GridError } from ".";

describe("The Grid object", () => {
	it("should throw an error with invalid arguments to constructor", () => {
		try {
			new Grid([], 0);
			new Grid([], 1, 0);
			new Grid([], 0, 0);
		} catch (error) {
			expect(error).toThrow(GridError.DIMENSION_OUT_OF_BOUNDS);
		}
	});
	it("should instanciate with default values", () => {
		const testGrid = new Grid();
		expect(testGrid.entries).toEqual([]);
		expect(testGrid.rowCount).toBe(1);
		expect(testGrid.columnCount).toBe(1);
	});
	it("should initialize properties from arguments to constructor", () => {
		const entriesArg = ["test"];
		const rowCountArg = 2;
		const columnCountArg = 3;
		const testGrid = new Grid(entriesArg, rowCountArg, columnCountArg);
		expect(testGrid.entries).toBe(entriesArg);
		expect(testGrid.rowCount).toBe(rowCountArg);
		expect(testGrid.columnCount).toBe(columnCountArg);
	});
});
