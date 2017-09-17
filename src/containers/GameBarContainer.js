import { connect } from 'react-redux'
import GameBar from '../components/GameBar'
import { resetGame } from '../actions'
import { CellState, GameStatus } from '../Constants'

const getNoFlags = (grid) => {
  let flags = 0;
  grid.filter(row =>
    (row.filter(cell => cell.cellState === CellState.FLAGGED).forEach(() => flags++))
  );
  return flags;
}

const mapStateToProps = (state) => ({
  gameStatus: state.status,
  noFlags: (state.status !== GameStatus.WON) ? getNoFlags(state.grid) : 0,
})

const mapDispatchToProps = (dispatch) => ({
  onFaceClick: () => dispatch(resetGame()),
})

const GameBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameBar)

export default GameBarContainer;