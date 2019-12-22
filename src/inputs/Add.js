import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Node from '../Node';

const Root = styled.form`
  display: flex;
`;

const Input = styled.input`
`;

const Button = styled.input`
  color: white;
  cursor: pointer;
  padding-left: 4px;
`;

const Add = ({ root, setRoot }) => {
  const [value, setValue] = useState('');

  const addNode = (data, node = root) => {
    const newNode = new Node(data);

    if (data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        addNode(data, node.left);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        addNode(data, node.right);
      }
    }
  }

  const handleChange = e => setValue(e.target.value);

  const handleClickAdd = e => {
    e.preventDefault();
    addNode(parseInt(value));
    setValue('');
    setRoot(root);
  }

  console.log(root, 'root');

  return (
    <Root>
      <Input value={value} onChange={handleChange} />
      <Button type='submit' onClick={handleClickAdd} value='add node' />
    </Root>
  )
};

export default Add;
