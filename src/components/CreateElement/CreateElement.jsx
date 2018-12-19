import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

const prueba = (context) => {
  console.log(context.currentTarget.value)
}
const CreateElement = () => (
  <div>
    <InputGroup onChange={(context) => prueba(context)}>
      <InputGroupAddon addonType="prepend"></InputGroupAddon>
      <Input placeholder="username" />
    </InputGroup>
    <br />
  </div>
)

export default CreateElement