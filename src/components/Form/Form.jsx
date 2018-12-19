import React, { Component } from 'react'
import {
  FormControl,
  Label,
  Button
} from 'react-bootstrap'

import './style.sass'

class Form extends Component{

  render() {
    const { labelText, onClickAction, buttonText, textFields, errorMessage, rigthMessage } = this.props
  
    return (
      <div className="loginDiv">
        <Label to="/"className="labelLog">{labelText}</Label>
        {textFields.map(({ key, type, value, onChange, placeHolder }) => (
          <FormControl
            key={key}
            type={type}
            value={value}
            placeholder={placeHolder}
            onChange={(context) => onChange(context)}
          />        
        ))}
        <br></br>
        <Button bsStyle="primary" onClick={onClickAction} >{buttonText}</Button>
        {errorMessage !== 0 && <Label to="/"className={`${rigthMessage ? 'rigthMessage': 'errorMessage'}`}>{errorMessage}</Label>}
      </div>
    )
  }
}

export default Form