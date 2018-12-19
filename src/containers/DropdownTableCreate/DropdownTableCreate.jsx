import React, { Component } from 'react'
import axios from 'axios'

import TableElement from '../../components/TableElement/TableElement'
import DropDownElement from '../../components/DropDownElement/DropDownElement'
import { API, GET_USER_LOGGED, refreshReportsUser, GET_DATA_FROM_USER } from '../../helpers/strings'

import './style.sass'


const dropdownItems = [
  { value: 1, name: 'My reports' },
  { value: 2, name: 'Create reports' }
]

const dropdownReportsItems = [
  { value: 3, name: 'addresses'},
  { value: 4, name: 'names' },
  { value: 5, name: 'social'},
  { value: 6, name: 'jobs' }
]

/*

  { value: 3, name: 'addresses'},
  { value: 4, name: 'names' },
  { value: 5, name: 'social'},
  { value: 6, name: 'jobs' }


*/
const getReports = () => {
  return new Promise((resolve, reject) => {
    const userEmail = GET_USER_LOGGED().email
    const url = `${API}${userEmail}`
    axios.get(url)
    .then(
      res => {
        //const dataSetsJson = buildDataAsJson(res.data)
        console.log('response')
        console.log(res)
        resolve(res)
      },
      error => {reject(error)}
    )
  })
}
const getPartsEachNames = (names) => (
  names.map((elem) => elem.parts)
)
const generateDataSetsStorage = (keyColumn) => {
  const userLogged = GET_USER_LOGGED().email
  const data = GET_DATA_FROM_USER(userLogged)

  if(data){
    const { reports } = data
    const dataKey = reports[keyColumn]

    if(dataKey.length !== 0){
      const keysData = Object.keys(dataKey[0])
      const definedKeys = keysData.length > 4 ? keysData.splice(0, 4) : keysData // *
      const valuesData = Object.values(dataKey[0]) // *

      console.log('sdfsdf')
      console.log(definedKeys)
      console.log(valuesData)
      console.log(dataKey)
      return { dataSets: dataKey, keys: definedKeys }

    }

    return {}
  }
  /*const dataKey = keyColumn === 'names' ? test : data[keyColumn]

  if(dataKey.length != 0){
    const keysData = Object.keys(dataKey[0])
    const definedKeys = keysData.length > 4 ? keysData.splice(0, 4) : keysData // *
    const valuesData = Object.values(dataKey[0]) // *
  } else {
    console.log('vacío')
  }*/

  //const newData = data.map(({  }) => ({ addresses, parts, jobs, social }))
}
const analyzeResult = (resolve, keyColumn) => {

  if(keyColumn !== "" && resolve.data.length !== 0){
    const { addresses, names, social, jobs } = resolve.data
    const namesParts = getPartsEachNames(names)
    const ownUser = GET_USER_LOGGED().email
    const reports = { addresses, social, jobs, names: namesParts }
    const dataToStorage = { email: ownUser, reports }

    refreshReportsUser(ownUser, dataToStorage)



    /*const dataKey = keyColumn === 'names' ? test : data[keyColumn]

    if(dataKey.length != 0){
      const keysData = Object.keys(dataKey[0])
      const definedKeys = keysData.length > 4 ? keysData.splice(0, 4) : keysData // *
      const valuesData = Object.values(dataKey[0]) // *
    } else {
      console.log('vacío')
    }*/

    //const newData = data.map(({  }) => ({ addresses, parts, jobs, social }))
  }

}
class DropDownTableCreate extends Component {

  constructor(props){
    super(props)

    this.state = {
      dropdownSelection: dropdownItems[0].name,
      dropdownReportsSelection: dropdownReportsItems[0].name,
      dataSets: [],
      idSelection: "1",
      idSelectionReports: "3",
      requestSuccess: 0,
      keysTable: []
    }
  }

  onDropdownSelection = ({ value, textContent }) => {
    this.setState({ dropdownSelection: textContent, idSelection: value })
  }

  onDropdownReportsSelection = ({ value, textContent }) => {
    this.setState({ dropdownReportsSelection: textContent, idSelectionReports: value })
    console.log(value)
  }

  render(){
    const { dataSets, requestSuccess } = this.state
 
    if(dataSets.length === 0 && requestSuccess === 0){
      getReports().then(
        resolve => {
          console.log('lo hizo')
          analyzeResult(resolve, this.state.dropdownReportsSelection)
          const dataResult = generateDataSetsStorage(this.state.dropdownReportsSelection)
          
          if(dataResult == {}){
            this.setState({ requestSuccess: 1 })
          } else {
            const { keys, dataSets } = dataResult
            console.log('dataSets actualizados')
            this.setState({ keysTable: keys, dataSets })
            console.log(this.state)
          }

        }
      )    

    }
  
    const validation = this.state.idSelection === "1" || this.state.idSelection === ""
    
    return (
      <div>
        <div className="dropsContainer">
          <DropDownElement onDropdownSelection={this.onDropdownSelection} selection={this.state.dropdownSelection} items={dropdownItems} />
          <DropDownElement onDropdownSelection={this.onDropdownReportsSelection} selection={this.state.dropdownReportsSelection} items={dropdownReportsItems} />
        </div>
        {validation && <TableElement />}
      </div>
    )
  }

}

export default DropDownTableCreate
