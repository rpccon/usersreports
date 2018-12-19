import React, { Component } from 'react'
import TableElement from '../../components/TableElement/TableElement'
import DropDownElement from '../../components/DropDownElement/DropDownElement'
import './style.sass'

const dropdownItems = [
  { value: 1, name: 'My reports' },
  { value: 2, name: 'Create reports' }
]

const dropdownReportsItems = [
  { value: 3, name: 'Adresses'},
  { value: 4, name: 'Names' },
  { value: 5, name: 'Social'},
  { value: 6, name: 'Jobs' }
]

class DropDownTableCreate extends Component {

  constructor(props){
    super(props)

    this.state = {
      dropdownSelection: dropdownItems[0].name,
      dropdownReportsSelection: dropdownReportsItems[0].name,
      idSelection: "1",
      idSelectionReports: "3"
    }
  }

  onDropdownSelection = ({ value, textContent }) => {
    this.setState({ dropdownSelection: textContent, idSelection: value })
  }

  onDropdownReportsSelection = ({ value, textContent }) => {
    console.log(value)
  }

  render(){
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
