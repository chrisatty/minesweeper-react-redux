import { connect } from 'react-redux'
import Grid from '../components/Grid'
import * as Utils from '../Utils'

const mapStateToProps = (state) => ({
  width: Utils.getWidth(state.grid),
  height: Utils.getHeight(state.grid),
})

const GridContainer = connect(
  mapStateToProps,
)(Grid)

export default GridContainer;