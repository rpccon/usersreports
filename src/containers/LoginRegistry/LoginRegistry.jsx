import React, { Component } from "react"
import Form from '../../components/Form/Form'
import {
  LOGIN_LABEL,
  BUTTON_LOGIN_TEXT,
  GET_DATA_LOCALSTORAGE,
  USER_PASS_ERROR,
  USER_PASS_EMPTY,
  updateDataLocalStorage,
  CREATE_REGISTRY,
  REGISTRY_MSJ,
  DIFFERENT_PASSWORDS,
  EXIST_USER,
  SUCCESS_NEW_USER,
  setUserLogged
} from '../../helpers/strings.js'



const textFields = ({ usernameValue, passwordValue, repeatPasswordValue }, usernameHandleChange, passwordHandleChange, repeatPasswordHandleChange, isRegistry) => {
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

const validateIfUsersExists = (email) => {
  const { users } = GET_DATA_LOCALSTORAGE()
  const result = users.find((elem) => elem.email === email )

  return result  
}

function createUserLocalStorage(usernameValue, passwordValue) {
  const newUser = { email: usernameValue, password: passwordValue }
  const oldData = GET_DATA_LOCALSTORAGE()
  const users = [...oldData.users, newUser]
  const reports = oldData.reports
  const newData = { users, reports }

  updateDataLocalStorage(newData)
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

  componentWillReceiveProps(){
    this.cleanBlanks()
  }

  visitMaterPageCreateUser(usernameValue, passwordValue) {
   const { isRegistry, openMasterPageMenu } = this.props

   if(isRegistry){
      const existUser = validateIfUsersExists(usernameValue)

      if(existUser){
        this.updateErrorMessage(EXIST_USER)
      } else {
        
        createUserLocalStorage(usernameValue, passwordValue)
        this.cleanBlanks()
        this.updateErrorMessage(SUCCESS_NEW_USER, 1)
      }
   } else {
      setUserLogged(usernameValue, passwordValue)
      openMasterPageMenu()
   }
  }
  
  cleanBlanks(){
    const cleanVariables = {
      usernameValue: "",
      passwordValue: "",
      repeatPasswordValue: "",
      errorMessage: "",
      rigthMessage: 0
    }
  
    this.setState(cleanVariables)
  }
  validateRegistryCredentials(params) {
    const { usernameValue, passwordValue, repeatPasswordValue } = params
    const verifyRegistry = this.props.isRegistry ? passwordValue === repeatPasswordValue : passwordValue
    
    if(verifyRegistry){
      const validate = this.props.isRegistry ? 1 : validateUserPassword(usernameValue, passwordValue)
      
      if(validate){
        this.visitMaterPageCreateUser(usernameValue, passwordValue)
      } else {
        this.updateErrorMessage(USER_PASS_ERROR)
      }
    }
    else {
      this.updateErrorMessage(DIFFERENT_PASSWORDS)
    }
  }

  updateErrorMessage(msj, kindMsj) {
    this.setState({ errorMessage: msj, rigthMessage: kindMsj })
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
      this.validateRegistryCredentials(this.state)
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
        rigthMessage={this.state.rigthMessage}
      />
    )
  }
}

export default LoginRegistry