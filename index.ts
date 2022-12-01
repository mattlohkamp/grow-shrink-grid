export enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  LEFTRIGHT = 'LEFTRIGHT',
  RIGHTLEFT = 'RIGHTLEFT',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  TOPBOTTOM = 'TOPBOTTOM',
  BOTTOMTOP = 'BOTTOMTOP',
}

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

  grow(count: number, direction: Direction): void {
    switch (direction) {
      case Direction.TOP:
        Array.prototype.unshift.apply(
          this.entries,
          Array(count * this.#columnCount)
        );
        this.rowCount += count;
        break;
      case Direction.BOTTOM:
        Array.prototype.push.apply(
          this.entries,
          Array(count * this.#columnCount)
        );
        this.rowCount += count;
        break;
      //  counting down for left/right so new entries don't throw off the indexing
      case Direction.LEFT:
        for (
          let i = this.entries.length - this.columnCount;
          i >= 0;
          i -= this.columnCount
        ) {
          Array.prototype.splice.apply(this.entries, [i, 0, ...Array(count)]);
        }
        this.columnCount += count;
        break;
      case Direction.RIGHT:
        for (let i = this.entries.length; i > 0; i -= this.columnCount) {
          Array.prototype.splice.apply(this.entries, [i, 0, ...Array(count)]);
        }
        this.columnCount += count;
        break;
      //  split insertions between two directions, preference given to first listed in keyword
      case Direction.TOPBOTTOM:
        this.grow(Math.ceil(count / 2), Direction.TOP);
        this.grow(Math.floor(count / 2), Direction.BOTTOM);
        break;
      case Direction.BOTTOMTOP:
        this.grow(Math.floor(count / 2), Direction.TOP);
        this.grow(Math.ceil(count / 2), Direction.BOTTOM);
        break;
      case Direction.LEFTRIGHT:
        this.grow(Math.ceil(count / 2), Direction.LEFT);
        this.grow(Math.floor(count / 2), Direction.RIGHT);
        break;
      case Direction.RIGHTLEFT:
        this.grow(Math.floor(count / 2), Direction.LEFT);
        this.grow(Math.ceil(count / 2), Direction.RIGHT);
        break;
      default:
        console.warn(`invalid direction "${direction}"`);
    }
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
