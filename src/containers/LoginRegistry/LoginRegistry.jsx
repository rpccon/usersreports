import React, { Component } from "react"
import Form from '../../components/Form/Form'
import {
  LOGIN_LABEL,
  BUTTON_LOGIN_TEXT,
  GET_DATA_LOCALSTORAGE,
  USER_PASS_ERROR,
  USER_PASS_EMPTY,
  CREATE_REGISTRY,
  REGISTRY_MSJ,
  DIFFERENT_PASSWORDS
} from '../../helpers/strings.js'

const textFields = ({ usernameValue, passwordValue, repeatPasswordValue }, usernameHandleChange, passwordHandleChange, repeatPasswordHandleChange, isRegistry) => {
  const formDatasets =
    [{ key: '1', type: 'text', value: usernameValue, placeHolder: 'Username', onChange: usernameHandleChange },
    { key: '2', type: 'password', value: passwordValue, placeHolder: 'Password', onChange: passwordHandleChange }]

  if(isRegistry){
    const newDataset = {key: '3', type: 'password', value: repeatPasswordValue, placeHolder: 'Repeat password', onChange: repeatPasswordHandleChange }
    
    formDatasets.push(newDataset)
  }
  console.log('ddd', isRegistry)
  console.log(formDatasets)
  return formDatasets
}

const validateUserPassword = (user, password) => {
  const { users } = GET_DATA_LOCALSTORAGE()

  const result = users.find((elem) => elem.email === user && elem.password === password )

  return result
}

class LoginRegistry extends Component {

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

  repeatPasswordHandleChange = (context) => {
    this.setState({ repeatPasswordValue: context.target.value })
  }

  passwordHandleChange = (context) => {
    this.setState({ passwordValue: context.target.value })
  }

  validateRegistryCredentials(params) {
    const { usernameValue, passwordValue, repeatPasswordValue } = params
    const verifyRegistry = this.props.isRegistry ? passwordValue === repeatPasswordValue : passwordValue
    
    if(verifyRegistry){
      const validate = validateUserPassword(usernameValue, passwordValue)
      
      if(validate){
        return 'Todo bien'
      } else {
        return USER_PASS_ERROR
      }
    } else {
      return DIFFERENT_PASSWORDS
    }
  }

  

  updateErrorMessage(msj) {
    this.setState({ errorMessage: msj })
  }

  onClickAction = () => {
    const { usernameValue, passwordValue, repeatPasswordValue } = this.state
    
    const credentials = [usernameValue, passwordValue]

    if(this.props.isRegistry){
      credentials.push(repeatPasswordValue)
    }
    if(credentials.includes('')){
      this.setState({ errorMessage: USER_PASS_EMPTY })
    }
    else {
      const resultValidation = this.validateRegistryCredentials(this.state)
      
      this.updateErrorMessage(resultValidation)
    }
    
  }

  validateButtonLabelMsj = () => (
    this.props.isRegistry ? [CREATE_REGISTRY, REGISTRY_MSJ] : [LOGIN_LABEL, BUTTON_LOGIN_TEXT]
  )
  

  render(){
    const textFieldsResult = textFields(this.state, this.usernameHandleChange, this.passwordHandleChange, this.repeatPasswordHandleChange, this.props.isRegistry)
    const labels = this.validateButtonLabelMsj()

    return (
      <Form
        labelText={labels[0]}
        onClickAction={this.onClickAction}
        buttonText={labels[1]}
        textFields={textFieldsResult}
        errorMessage={this.state.errorMessage}
      />
    )
  }
}

export default LoginRegistry