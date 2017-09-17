import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

class GameForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        noMines:50,
        width:20,
        height:20,
    };
  }

  handleInputChange(event) {
      const target = event.target;
      let value = parseInt(target.value, 10);
      if (isNaN(value)) {
        value = '';
      }
      this.setState({
        [target.name]: value
      });
   }

  handleSubmit() {
   if (this.getDimensionsValidation("width") === "error" || this.getDimensionsValidation("height") === "error"
        || this.getMineValidation() === "error") {
     alert("Invalid input");
   } else {
     this.props.onClick(this.state);
   }
  }


  getDimensionsValidation(type) {
    const value = this.state[type];
    if (value === '') {
      return "error";
    }
    return (value >= 10 && value <= 100) ? "success" : "error";
  }

  getMineValidation() {
    if (this.state.noMines === '') {
      return "error";
    }
    if (this.state.height === '' || this.state.width === '') {
      return "success";
    }

    return (this.state.noMines < this.state.height * this.state.width) ? "success" : "error";
  }

  render() {
    return (
       <div className="game-form">
         <FormGroup
           controlId="formBasicText"
           validationState={this.getDimensionsValidation("width")}
         >
           <ControlLabel>Width</ControlLabel>
           <FormControl
             type="text"
             value={this.state.width}
             placeholder="Width must be between 10 and 100"
             onChange={(event) => this.handleInputChange(event)}
             name="width"
           />
           <FormControl.Feedback />
         </FormGroup>

         <FormGroup
           controlId="formBasicText"
           validationState={this.getDimensionsValidation("height")}
         >
           <ControlLabel>Height</ControlLabel>
           <FormControl
             type="text"
             value={this.state.height}
             placeholder="Height must be between 10 and 100"
             onChange={(event) => this.handleInputChange(event)}
             name="height"
           />
           <FormControl.Feedback />
         </FormGroup>
         <FormGroup
            controlId="formBasicText"
            validationState={this.getMineValidation()}
          >
            <ControlLabel>Mines</ControlLabel>
            <FormControl
              type="text"
              value={this.state.noMines}
              onChange={(event) => this.handleInputChange(event)}
              name="noMines"
            />
            <FormControl.Feedback />
          </FormGroup>
        <Button onClick={() => this.handleSubmit()}>Update Board</Button>
       </div>
    );
  }

}

GameForm.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default GameForm;