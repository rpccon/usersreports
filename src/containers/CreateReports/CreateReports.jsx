import React, { Component } from 'react'

import Form from '../../components/Form/Form'
import {
  CREATE_REGISTRY,
  CREATE_NEW_REPORT,
  EMPTY_STRING,
  USER_PASS_EMPTY,
  GET_DATA_FROM_USER,
  GET_USER_LOGGED,
  GET_DATA_LOCALSTORAGE,
  updateDataLocalStorage
} from '../../helpers/helpers'

const textFields = (props) => {
  const {
    stateParams: { blankAValue, blankBValue, blankCValue, blankDValue },
    onClickBlankA,
    onClickBlankB,
    onClickBlankC,
    onClickBlankD,
    keys,
  } = props

  const formDatasets = [
    { key: '1', type: 'text', value: blankAValue, placeHolder: keys[0], onChange: onClickBlankA },
    { key: '2', type: 'text', value: blankBValue, placeHolder: keys[1], onChange: onClickBlankB },
    { key: '3', type: 'text', value: blankCValue, placeHolder: keys[2], onChange: onClickBlankC }
  ]

  if(keys.length !== 3){
    formDatasets.push(
      { key: '4', type: 'text', value: blankDValue, placeHolder: keys[3], onChange: onClickBlankD }
    )
  }

  return formDatasets
}

class CreateComponent extends Component {
  constructor(props){
    super(props)

    this.state = {
      blankAValue: EMPTY_STRING,
      blankBValue: EMPTY_STRING,
      blankCValue: EMPTY_STRING,
      blankDValue: EMPTY_STRING,
    }
  }

  blankAValueHandleChange = (context) => {
    this.setState({ blankAValue: context.target.value })
  }

  blankBValueHandleChange = (context) => {
    this.setState({ blankBValue: context.target.value })
  }
  
  blankCValueHandleChange = (context) => {
    this.setState({ blankCValue: context.target.value })
  }
  
  blankDValueHandleChange = (context) => {
    this.setState({ blankDValue: context.target.value })
  }

  componentWillReceiveProps(){
    this.cleanBlanks()
  }

  cleanBlanks(){
    const cleanVariables = {
      blankAValue: EMPTY_STRING,
      blankBValue: EMPTY_STRING,
      blankCValue: EMPTY_STRING,
      blankDValue: EMPTY_STRING,
      errorMessage: EMPTY_STRING,
      rigthMessage: 0      
    }
  
    this.setState(cleanVariables)
  }  

  updateErrorMessage(msj, kindMsj) {
    this.setState({ errorMessage: msj, rigthMessage: kindMsj })
  }

  onClickAction = () => {
    const { blankAValue, blankBValue, blankCValue, blankDValue } = this.state
    const dataWrote = [blankAValue, blankBValue, blankCValue]

    if(this.props.keys.length !== 3){
      dataWrote.push(blankDValue)
    }

    const { keys, category } = this.props

    if(dataWrote.includes(EMPTY_STRING)){
      this.setState({ errorMessage: USER_PASS_EMPTY })
    } else {
      const userEmail = GET_USER_LOGGED().email
      const userData = GET_DATA_FROM_USER(userEmail)
      const values = [blankAValue, blankBValue, blankCValue, blankDValue]

      const newReport = keys.reduce((acc, elem, index) => {
        acc[elem] = values[index]

        return acc
      }, {})
      
      const allData = GET_DATA_LOCALSTORAGE()
      const { users, reports: reportsStorage } = allData

      if(userData){
        const { email, reports } = userData
        const oldReports = reports[category]
        
        oldReports.push(newReport)

        const newUserStorage = { email, reports: oldReports }
        const filterReportsStorage = reportsStorage.filter((elem) => elem.email !== email)

        filterReportsStorage.push(newUserStorage)

        const newDataStorage = { users, reports: filterReportsStorage }

        updateDataLocalStorage(newDataStorage)

      } else {
        const newUserData = { email: userEmail, reports: newReport}
        const finalData = { users, reports: { ...reportsStorage, newUserData }}

        updateDataLocalStorage(finalData)
      }

      this.setState({ errorMessage: 'Adition succeful' })
    }
  }

  render(){
    const params = {
      stateParams: this.state,
      onClickBlankA: this.blankAValueHandleChange,
      onClickBlankB: this.blankBValueHandleChange,
      onClickBlankC: this.blankCValueHandleChange,
      onClickBlankD: this.blankDValueHandleChange,
      keys: this.props.keys
    }

    const textFieldsResult = textFields(params)

    return (
      <Form
        labelText={CREATE_NEW_REPORT}
        onClickAction={this.onClickAction}
        buttonText={CREATE_REGISTRY}
        textFields={textFieldsResult}
        errorMessage={this.state.errorMessage}
        rigthMessage={this.state.rigthMessage}
      />
    )
  }
}

export default CreateComponent