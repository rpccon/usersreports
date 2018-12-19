import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './style.sass'

class DropDownElement extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle(event) {
    const { currentTarget: { value, textContent }  } = event
    
    if(value !== ''){
      this.props.onDropdownSelection({ value, textContent })
    }
    
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
        <ButtonDropdown to="/"className="dropDownComp" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {this.props.selection}
          </DropdownToggle>
          <DropdownMenu>
            {this.props.items.map((elem) => (
              <DropdownItem key={elem.value} value={elem.value}>{elem.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </ButtonDropdown>     
    );
  }
}

export default DropDownElement