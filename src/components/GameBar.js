import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GameStatus } from '../Constants'
import * as Utils from '../Utils'
import angry from '../icons/angry.svg'
import happy from '../icons/happy.svg'
import smiling from '../icons/smiling.svg'

class GameBar extends Component {

  constructor(props) {
      super(props);
      this.state = { time: 0 };
    }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentWillReceiveProps(nextProps) {
    if (Utils.gameComplete(nextProps.gameStatus)) {
      clearInterval(this.timer);
    } else if (nextProps.gameStatus === GameStatus.NOT_STARTED) {
      this.setState({time:0});
      clearInterval(this.timer);
    } else if (this.props.gameStatus === GameStatus.NOT_STARTED
        && nextProps.gameStatus !== GameStatus.NOT_STARTED) {
      this.tick();
      this.timer = setInterval(this.tick.bind(this), 1000);
    }
  }

  tick() {
    this.setState({time: this.state.time + 1});
  }

  render() {
   let face = <img src={smiling} className="face" alt="smiling" />;
   if (this.props.gameStatus === GameStatus.WON) {
     face = <img src={happy} className="face" alt="happy" />;
   } else if (this.props.gameStatus === GameStatus.LOST) {
     face = <img src={angry} className="face" alt="angry" />;;
   }

   return (
       <div className="game-bar">
         {this.props.noFlags}
         <span className="face" onClick={() => this.props.onFaceClick()}>{face}</span>
         {this.state.time}
       </div>
    );
  }

}

GameBar.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  noFlags: PropTypes.number.isRequired,
  onFaceClick: PropTypes.func.isRequired,
}

export default GameBar;