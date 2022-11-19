import Grid, { Direction, GridError, isDefaultGrid } from '.';

describe('The Grid object', () => {
  it('throws an error on invalid arguments passed to constructor', () => {
    //	_rowCount and _columnCount args must be at least 1
    expect(() => {
      new Grid([], 0);
    }).toThrow(GridError.DIMENSION_OUT_OF_BOUNDS);
    expect(() => {
      new Grid([], 1, 0);
    }).toThrow(GridError.DIMENSION_OUT_OF_BOUNDS);
    expect(() => {
      new Grid([], 0, 0);
    }).toThrow(GridError.DIMENSION_OUT_OF_BOUNDS);
  });
  it('instanciates with default values', () => {
    const testGrid1 = new Grid();
    expect(isDefaultGrid(testGrid1)).toBe(true);
    const testGrid2 = new Grid([]);
    expect(isDefaultGrid(testGrid2)).toBe(true);
    const testGrid3 = new Grid([], 1);
    expect(isDefaultGrid(testGrid3)).toBe(true);
    const testGrid4 = new Grid([], 1, 1);
    expect(isDefaultGrid(testGrid4)).toBe(true);
  });
  it('initializes properties from arguments passed to constructor', () => {
    const entriesArg = ['test'];
    const rowCountArg = 2;
    const columnCountArg = 3;
    const testGrid = new Grid(entriesArg, rowCountArg, columnCountArg);
    expect(testGrid.entries).toBe(entriesArg);
    expect(testGrid.rowCount).toBe(rowCountArg);
    expect(testGrid.columnCount).toBe(columnCountArg);
  });
  it('requires valid dimensions', () => {
    const testGrid = new Grid();
    //	dimensions must be greater than zero
    expect(() => {
      testGrid.rowCount = 0;
    }).toThrow(GridError.DIMENSION_OUT_OF_BOUNDS);
    expect(() => {
      testGrid.rowCount = -1;
    }).toThrow(GridError.DIMENSION_OUT_OF_BOUNDS);
    expect(() => {
      testGrid.columnCount = 0;
    }).toThrow(GridError.DIMENSION_OUT_OF_BOUNDS);
    expect(() => {
      testGrid.columnCount = -1;
    }).toThrow(GridError.DIMENSION_OUT_OF_BOUNDS);
  });
  it('allows access to members by index', () => {
    const entriesArg = ['a1', 'a2', 'b1', 'b2'];
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
  it('allows access to members by coordinates', () => {
    const entriesArg = ['a1', 'a2', 'b1', 'b2'];
    const testGrid = new Grid(entriesArg, 2, 2);
    /*
				A1 | A2
				———————
				B1 | B2
		*/
    const testCell = testGrid.getCellByCoordinates(1, 1); //	second column, second row - e.g. B2
    expect(testCell).toBe(entriesArg[3]);
  });
  it('errors out on invalid coordinates', () => {
    const entriesArg = ['a1', 'a2', 'b1', 'b2'];
    const testGrid = new Grid(entriesArg, 2, 2);
    /*
				A1 | A2
				———————
				B1 | B2
		*/
    expect(() => testGrid.getCellByCoordinates(99, 0)).toThrow(
      GridError.COORDINATE_OUT_OF_BOUNDS
    );
    expect(() => testGrid.getCellByCoordinates(0, -99)).toThrow(
      GridError.COORDINATE_OUT_OF_BOUNDS
    );
  });
});

describe('the Grid.grow method', () => {
  it('inserts empty rows on top', () => {
    const entriesArg = ['a1', 'a2', 'b1', 'b2'];
    const testGrid = new Grid(entriesArg, 2, 2);
    /*  BEFORE:
				A1 | A2
				———————
				B1 | B2
		*/
    testGrid.grow(1, Direction.TOP); //  add one empty row to the top
    /*  AFTER:
				-- | --
        ———————
        A1 | A2
				———————
				B1 | B2
		*/
    expect(testGrid.rowCount).toBe(3);
    expect(testGrid.entries).toMatchInlineSnapshot(`
[
  undefined,
  undefined,
  "a1",
  "a2",
  "b1",
  "b2",
]
`);
  });
  it('inserts empty rows on bottom', () => {
    const entriesArg = ['a1', 'a2', 'b1', 'b2'];
    const testGrid = new Grid(entriesArg, 2, 2);
    /*  BEFORE:
				A1 | A2
				———————
				B1 | B2
		*/
    testGrid.grow(1, Direction.BOTTOM); //  add one empty row to the bottom
    /*  AFTER:
        A1 | A2
				———————
				B1 | B2
        ———————
        -- | --
		*/
    expect(testGrid.rowCount).toBe(3);
    expect(testGrid.entries).toMatchInlineSnapshot(`
[
  "a1",
  "a2",
  "b1",
  "b2",
  undefined,
  undefined,
]
`);
  });
  it('inserts empty columns on the left', () => {
    const entriesArg = ['a1', 'a2', 'b1', 'b2'];
    const testGrid = new Grid(entriesArg, 2, 2);
    /*  BEFORE:
				A1 | A2
				———————
				B1 | B2
		*/
    testGrid.grow(1, Direction.LEFT); //  add one empty row to the left
    /*  AFTER:
        -- | A1 | A2
				————————————
				-- | B1 | B2
		*/
    expect(testGrid.columnCount).toBe(3);
    expect(testGrid.entries).toMatchInlineSnapshot(`
[
  undefined,
  "a1",
  "a2",
  undefined,
  "b1",
  "b2",
]
`);
  });
  it('inserts empty columns on the right', () => {
    const entriesArg = ['a1', 'a2', 'b1', 'b2'];
    const testGrid = new Grid(entriesArg, 2, 2);
    /*  BEFORE:
				A1 | A2
				———————
				B1 | B2
		*/
    testGrid.grow(1, Direction.RIGHT); //  add one empty row to the right
    /*  AFTER:
        A1 | A2 | --
				————————————
				B1 | B2 | --
		*/
    expect(testGrid.columnCount).toBe(3);
    expect(testGrid.entries).toMatchInlineSnapshot(`
[
  "a1",
  "a2",
  undefined,
  "b1",
  "b2",
  undefined,
]
`);
  });
});
