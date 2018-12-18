import React, { Component } from "react"
import Form from '../../components/Form/Form'
import {
  LOGIN_LABEL,
  BUTTON_LOGIN_TEXT,
  GET_DATA_LOCALSTORAGE,
  USER_PASS_ERROR,
  USER_PASS_EMPTY
} from '../../helpers/strings.js'

const textFields = ({ usernameValue, passwordValue }, usernameHandleChange, passwordHandleChange, repeatPasswordValue, repeatPasswordHandleChange, isRegistry) => {
  const formDatasets =
    [{ key: '1', type: 'text', value: usernameValue, placeHolder: 'Username', onChange: usernameHandleChange },
    { key: '2', type: 'password', value: passwordValue, placeHolder: 'Password', onChange: passwordHandleChange }]

  if(isRegistry){
    const newDataset = {key: '3', type: 'password', value: repeatPasswordValue, placeHolder: 'Repeat password', onChange: repeatPasswordHandleChange }
    
    formDatasets.push(newDataset)
  }

  return formDatasets
}

const validateUserPassword = (user, password) => {
  const { users } = GET_DATA_LOCALSTORAGE()

  const result = users.find((elem) => elem.email === user && elem.password === password )

  return result
}

class Login extends Component {

  constructor(props){
    super(props)

    this.state = {
      usernameValue: "",
      passwordValue: "",
      repeatPasswordValue: "",
      errorMessage: "",
    }
  }

  usernameHandleChange = (context) => {
    this.setState({ usernameValue: context.target.value })
  }

  passwordHandleChange = (context) => {
    this.setState({ passwordValue: context.target.value })
  }

  onClickAction = () => {
    const { usernameValue, passwordValue } = this.state
    const validate = validateUserPassword(usernameValue, passwordValue)
    const credentials = [usernameValue, passwordValue]

    if(credentials.includes('')){
      this.setState({ errorMessage: USER_PASS_EMPTY })
    }
    else if(validate){
      this.setState({ errorMessage: '' })
    }
    else {
      this.setState({ errorMessage: USER_PASS_ERROR })
    }
    
  }

  render(){
    console.log(LOGIN_LABEL)
    const textFieldsResult = textFields(this.state, this.usernameHandleChange, this.passwordHandleChange)
    console.log(textFieldsResult)
    return (
      <Form
        labelText={LOGIN_LABEL}
        onClickAction={this.onClickAction}
        buttonText={BUTTON_LOGIN_TEXT}
        textFields={textFieldsResult}
        errorMessage={this.state.errorMessage}
      />
    )
  }
}

export default Login