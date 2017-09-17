import { connect } from 'react-redux'
import GameForm from '../components/GameForm'
import { newGame } from '../actions'


const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => ({
  onClick: (options) => {
    dispatch(newGame(options.noMines, options.width, options.height));
  },
})

const GameFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameForm)

export default GameFormContainer;