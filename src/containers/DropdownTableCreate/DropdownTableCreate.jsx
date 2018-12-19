import React, { Component } from 'react'
import axios from 'axios'

import TableElement from '../../components/TableElement/TableElement'
import DropDownElement from '../../components/DropDownElement/DropDownElement'
import { API, GET_USER_LOGGED, refreshReportsUser, GET_DATA_FROM_USER } from '../../helpers/strings'
import CreateElement from '../../components/CreateElement/CreateElement'
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

const getReports = () => {
  return new Promise((resolve, reject) => {
    const userEmail = GET_USER_LOGGED().email
    const url = `${API}${userEmail}`
    axios.get(url)
    .then(
      res => {
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

    if(dataKey && dataKey.length !== 0){
      const enoughElements = keyColumn === 'jobs' ? 3 : 4
      const keysData = Object.keys(dataKey[0])
      const definedKeys = keysData.length > enoughElements ? keysData.splice(0, enoughElements) : keysData

      return { dataSets: dataKey, keys: definedKeys }

    }

    return {}
  }
}
const analyzeResult = (resolve, keyColumn) => {

  if(keyColumn !== "" && resolve.data.length !== 0){
    const { addresses, names, social, jobs } = resolve.data
    const namesParts = getPartsEachNames(names)
    const ownUser = GET_USER_LOGGED().email
    const reports = { addresses, social, jobs, names: namesParts }
    const dataToStorage = { email: ownUser, reports }

    refreshReportsUser(ownUser, dataToStorage)
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
      keysTable: [],
      renderedData: 0,
    }
  }

  onDropdownSelection = ({ value, textContent }) => {
    this.setState({ dropdownSelection: textContent, idSelection: value })
  }

  onDropdownReportsSelection = ({ value, textContent }) => {
    const dataResult = generateDataSetsStorage(textContent)
    
    this.setState({ keysTable: dataResult.keys, dataSets: dataResult === {} ? [] : dataResult.dataSets, dropdownReportsSelection: textContent, idSelectionReports: value })
    
  }

  render(){
    const { dataSets, requestSuccess, keysTable } = this.state

    if(dataSets && dataSets.length === 0 && requestSuccess === 0){

      getReports().then(
        resolve => {

          analyzeResult(resolve, this.state.dropdownReportsSelection)
          const dataResult = generateDataSetsStorage(this.state.dropdownReportsSelection)
          
          if(dataResult === {}){
            this.setState({ requestSuccess: 1 })
          } else {
            const { keys, dataSets } = dataResult

            this.setState({ keysTable: keys, dataSets})

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
        {validation && dataSets.length !== 0 && <TableElement keys={keysTable} dataSets={dataSets} />}
        {!validation && <CreateElement />}
      </div>
    )
  }

}

export default DropDownTableCreate
