import { connect } from 'react-redux'
import { openCell, flagCell } from '../actions'
import Cell from '../components/Cell'
import * as Utils from '../Utils'

const getNoAdjacentMines = (grid, ownProps) => {
  let mines = 0;
  const neighbours = Utils.getNeighbouringCells(ownProps.x, ownProps.y, Utils.getWidth(grid), Utils.getHeight(grid));
  neighbours.forEach(cell => {
    if (grid.get(cell.x).get(cell.y).mine) {
      mines++;
    }
  });
  return mines;
}

const mapStateToProps = (state, ownProps) => ({
  cellState: state.grid.get(ownProps.x).get(ownProps.y).cellState,
  adjacentMines: getNoAdjacentMines(state.grid, ownProps),
  isMine: state.grid.get(ownProps.x).get(ownProps.y).mine,
  gameStatus: state.status,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onOpen: () => dispatch(openCell(ownProps.x, ownProps.y)),
  onFlag: () => dispatch(flagCell(ownProps.x, ownProps.y)),
})

const CellContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell)

export default CellContainer;