import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Glyphicon } from 'react-bootstrap'
import { CellState, GameStatus } from '../Constants'
import * as Utils from '../Utils'
import classNames from 'classnames'

class Cell extends Component {

  onRightClick(e) {
    e.preventDefault();
    this.props.onFlag();
    return false;
  }

  render() {
    let content = '-';
    const classes = { cell: true };
    if (this.props.isMine && Utils.gameComplete(this.props.gameStatus)) {
      classes.mine = true;
      if (this.props.gameStatus === GameStatus.LOST) {
        content = <Glyphicon glyph="remove" />;
      } else {
        content = <Glyphicon glyph="flag" />;
      }
    } else if (this.props.cellState === CellState.OPENED) {
      classes[' number-' + this.props.adjacentMines] = true;
      content = this.props.adjacentMines;
    } else if (this.props.cellState === CellState.FLAGGED) {
      classes.flag = true;
      content = <Glyphicon glyph="flag" />;
    } else {
      classes.unknown = true;
    }
    return <span className={classNames(classes)} onContextMenu={(e) => this.onRightClick(e)} onClick={() => this.props.onOpen()}>{content}</span>
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