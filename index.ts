// TODO: unify terminology for cols and x and rows and y

export enum GridError {
  DIMENSION_OUT_OF_BOUNDS = 'OUT_OF_BOUNDS',
  COORDINATE_OUT_OF_BOUNDS = 'COORDINATE_OUT_OF_BOUNDS',
  EMPTY_ENTRIES = 'EMPTY_ENTRIES',
}

const ErrorMessages = {
  [GridError.DIMENSION_OUT_OF_BOUNDS]: (name: string) =>
    `${name} may not be set to 0 or less`,
  [GridError.COORDINATE_OUT_OF_BOUNDS]: (
    name: string,
    value: number,
    max: number
  ) =>
    `${name} value "${value}" out of bounds, expected a value between 0 and ${max}`,
  [GridError.EMPTY_ENTRIES]: (index: number) =>
    `failed to access entry at index "${index}", because entries collection is empty!`,
};

export const DEFAULT_ROW_COUNT = 1;
export const DEFAULT_COLUMN_COUNT = 1;

export const isDefaultGrid = (grid: Grid<unknown>): boolean =>
  grid.entries.length === 0 &&
  grid.rowCount === DEFAULT_ROW_COUNT &&
  grid.columnCount === DEFAULT_COLUMN_COUNT;

export class Grid<CellDataType = void> {
  entries: CellDataType[];

  #rowCount: number;
  get rowCount(): number {
    return this.#rowCount;
  }
  set rowCount(value: number) {
    if (value <= 0) {
      console.error(
        ErrorMessages[GridError.DIMENSION_OUT_OF_BOUNDS]('rowCount')
      );
      throw new Error(GridError.DIMENSION_OUT_OF_BOUNDS);
    }
    this.#rowCount = value;
  }

  #columnCount: number;
  get columnCount(): number {
    return this.#columnCount;
  }
  set columnCount(value: number) {
    if (value <= 0) {
      console.error(
        ErrorMessages[GridError.DIMENSION_OUT_OF_BOUNDS]('columnCount')
      );
      throw new Error(GridError.DIMENSION_OUT_OF_BOUNDS);
    }
    this.#columnCount = value;
  }

  static getIndexFromXYCoordinates = (x: number, y: number, xMax: number) =>
    // prettier-ignore
    (y * xMax) + x;

  constructor(
    _entries: CellDataType[] = [],
    _rowCount = DEFAULT_ROW_COUNT,
    _columnCount = DEFAULT_COLUMN_COUNT
  ) {
    this.entries = _entries;
    this.rowCount = _rowCount;
    this.columnCount = _columnCount;
  }
  getCellByIndex(index: number): CellDataType | undefined {
    if (this.entries.length === 0) {
      console.warn(ErrorMessages[GridError.EMPTY_ENTRIES]);
      //	throw new Error(GridError.EMPTY_ENTRIES);
    }
    return this.entries?.[index];
  }
  getCellByCoordinates(x: number, y: number): CellDataType | undefined {
    if (x < 0 || x >= this.#rowCount) {
      console.error(
        ErrorMessages[GridError.COORDINATE_OUT_OF_BOUNDS](
          'x',
          x,
          this.#rowCount
        )
      );
      throw new Error(GridError.COORDINATE_OUT_OF_BOUNDS);
    } else if (y < 0 || y >= this.#columnCount) {
      console.error(
        ErrorMessages[GridError.COORDINATE_OUT_OF_BOUNDS](
          'y',
          y,
          this.#columnCount
        )
      );
      throw new Error(GridError.COORDINATE_OUT_OF_BOUNDS);
    }
    const index = Grid.getIndexFromXYCoordinates(x, y, this.#rowCount);
    return this.entries[index];
  }
}
export default Grid;
