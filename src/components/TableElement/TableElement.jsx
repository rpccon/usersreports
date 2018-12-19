import React, { Component } from 'react';
import { Table } from 'reactstrap'
import './style.sass'

class TableElement extends Component {
  render() {
    return (
      <Table className="table-wrapper-scroll-y">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Machito</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <th>Machito</th>
          </tr>
          <tr>

            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <th>Machito</th>
          </tr>
          <tr>

            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <th>Machito</th>
          </tr>
          <tr>

            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <th>Machito</th>
          </tr>
          <tr>

            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <th>Machito</th>
          </tr>
          <tr>

            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <th>Machito</th>
          </tr>                                       
        </tbody>
      </Table>
    );
  }
}

export default TableElement