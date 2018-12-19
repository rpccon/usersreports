import React from 'react';
import { Table } from 'reactstrap'
import './style.sass'

const mapElementsTable = (keys, dataSets) => (
  dataSets.map((elem, index) => (
    <tr key={index}>
      {keys.map((item, pos) => (
      <td key={`${pos}id`}>{elem[item]}</td>))}
    </tr>
  ))
)

const TableElement = ({ keys, dataSets }) => {

  return (
    <Table className="table-wrapper-scroll-y">
      <thead>
        <tr>
          {keys.map((elem, index) => (
            <th key={index}>{elem}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {mapElementsTable(keys, dataSets)}                                       
      </tbody>
    </Table>
  )
}

export default TableElement