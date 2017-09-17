import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from './Row'

class Grid extends Component {

  render() {
    return (
       <div className="grid">
        {[...Array(this.props.height).keys()].map(index => (
           <Row key={index} rowIndex={index} noCells={this.props.width} />
        ))}
       </div>
    );
  }

}

Grid.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default Grid;