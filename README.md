# grow-shrink-grid

- GRID data structure, lays out data 'cells' on a 2D grid
- grow or shrink grid area in any direction
- access data by cell id, or by cell x/y coords
- cells can contain any data type (even another `Grid`)
- cells are stored as a collection, mapped from top left to bottom right

```typescript
grid.growRight(1); //	add a new column to the right
grid.growLeftRight(2); //	add two new rows, left and right
grid.growUpDown(3); //	add three new rows, two to the top and one to the bottom
grid.get(10); //	get value of cell #10
grid.get(5, 4); //	get value of cell at intersection of row #5, column #4
```
