import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Glyphicon } from 'react-bootstrap'
import { CellState, GameStatus } from '../Constants'
import * as Utils from '../Utils'

class Cell extends Component {

  onRightClick(e) {
    e.preventDefault();
    this.props.onFlag();
    return false;
  }

  render() {
    let content = '-';
    let icon = 'cell';
    if (this.props.isMine && Utils.gameComplete(this.props.gameStatus)) {
      if (this.props.gameStatus === GameStatus.LOST) {
        content = <Glyphicon glyph="remove" />;
        icon += ' mine';
      } else {
        content = <Glyphicon glyph="flag" />;
        icon += ' mine';
      }
    } else if (this.props.cellState === CellState.OPENED) {
      icon += ' number-' + this.props.adjacentMines;
      content = this.props.adjacentMines;
    } else if (this.props.cellState === CellState.FLAGGED) {
      icon += ' flag'
      content = <Glyphicon glyph="flag" />;
    } else {
      icon += ' unknown'
    }
    return <span className={icon} onContextMenu={(e) => this.onRightClick(e)} onClick={() => this.props.onOpen()}>{content}</span>
  }
}

Cell.propTypes = {
  cellState: PropTypes.string.isRequired,
  adjacentMines: PropTypes.number.isRequired,
  isMine: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onFlag: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  gameStatus: PropTypes.string.isRequired,
}

export default Cell;