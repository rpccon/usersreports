import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import './style.sass'

import { LOGIN_LABEL } from '../../helpers/helpers'
import LoginRegistry from '../../containers/LoginRegistry/LoginRegistry'
import DropDownTableCreate from '../../containers/DropdownTableCreate/DropdownTableCreate'

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this)
    this.state = {
      isInRegistry: 0,
      isUserViewOpen: false,
      isOpen: false
    }
  }

  onRegistryClick = () => {
    this.setState({ isInRegistry: !this.state.isInRegistry })
  }

  logOut = () => {
    this.setState({ isUserViewOpen: false })
  }

  openMasterPageMenu = () => {
    this.setState({ isUserViewOpen: !this.isUserViewOpen })
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { isInRegistry, isUserViewOpen } = this.state
    
    return (
      <div>
        <Navbar to="/"className="navColor" color="red" light expand="md">
          <NavbarBrand to="/"className="hghg" href="/">{ LOGIN_LABEL }</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem onClick={this.onRegistryClick}>
                <NavLink >
                  {isInRegistry ? 'Log in' : 'Sign in'}
                </NavLink>
              </NavItem>
              {isUserViewOpen
              && <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logOut}>Go out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>}
            </Nav>
          </Collapse>
        </Navbar>
        <div className="navGeneral">
          {isUserViewOpen ? <DropDownTableCreate /> : <LoginRegistry
            openMasterPageMenu={this.openMasterPageMenu} 
            isRegistry={isInRegistry} 
          />}
        </div>
      </div>
    )
  }
}

export default NavigationBar