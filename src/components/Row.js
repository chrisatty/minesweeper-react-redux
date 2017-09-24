import React, { Component } from 'react'
import CellContainer from '../containers/CellContainer'
import PropTypes from 'prop-types'

class Row extends Component {

  render() {
   return (
       <div className="row">
        {[...Array(this.props.noCells).keys()].map(index => (
           <CellContainer x={index} y={this.props.rowIndex} key={index} />
        ))}
       </div>
    );
  }

}

Row.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  noCells: PropTypes.number.isRequired,
}

export default Row;