import Grid, { GridError, isDefaultGrid } from ".";

describe("The Grid object", () => {
	it("throws an error on invalid arguments passed to constructor", () => {
		try {
			new Grid([], 0);
			new Grid([], 1, 0);
			new Grid([], 0, 0);
		} catch (error) {
			expect(error).toThrow(GridError.DIMENSION_OUT_OF_BOUNDS);
		}
	});
	it("instanciates with default values", () => {
		const testGrid1 = new Grid();
		expect(isDefaultGrid(testGrid1)).toBe(true);
		const testGrid2 = new Grid([]);
		expect(isDefaultGrid(testGrid2)).toBe(true);
		const testGrid3 = new Grid([], 1);
		expect(isDefaultGrid(testGrid3)).toBe(true);
		const testGrid4 = new Grid([], 1, 1);
		expect(isDefaultGrid(testGrid4)).toBe(true);
	});
	it("initializes properties from arguments passed to constructor", () => {
		const entriesArg = ["test"];
		const rowCountArg = 2;
		const columnCountArg = 3;
		const testGrid = new Grid(entriesArg, rowCountArg, columnCountArg);
		expect(testGrid.entries).toBe(entriesArg);
		expect(testGrid.rowCount).toBe(rowCountArg);
		expect(testGrid.columnCount).toBe(columnCountArg);
	});
	it("allows access to members by index", () => {
		const entriesArg = ["a1", "a2", "b1", "b2"];
		/*
				A1 | A2
				———————
				B2 | B2
		*/
		const testGrid = new Grid(entriesArg, 2, 2);
		const testIndex = 2; //	third entry - e.g. B2
		expect(testGrid.entries?.[testIndex]).toBe(entriesArg[testIndex]);
		expect(testGrid.getCellByIndex(testIndex)).toBe(entriesArg[testIndex]);
	});
	it("allows access to members by coordinates", () => {
		const entriesArg = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
		/*
				A1 | A2 | A3
				————————————
				B1 | B2 | B3
				————————————
				C1 | C2 | C3
		*/
		const testGrid = new Grid(entriesArg, 3, 3);
		const [testCoordsX, testCoordsY] = [1, 2]; //	second column, third row - e.g. C2
		//	TODO: add tests for invalid coords
		expect(testGrid.getCellByCoordinates(testCoordsX, testCoordsY)).toBe(
			entriesArg[7]
		);
	});
});
