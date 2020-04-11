import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Node from '../Node';

const Root = styled.form`
  display: flex;
`;

const Input = styled.input`
`;

const InputContainer = styled.div`
  display: flex;
  height: fit-content;
`;

const Button = styled.input`
  color: ${props => props.disabled ? `grey` : `white`};
  cursor: ${props => props.disabled ? `default` : `pointer`};
  padding-left: 7px;
  background: none;
  border: none;
  font-size: 14px;
`;

const Error = styled.div`
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 1px;
`;

const Add = ({ root, setRoot }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  let newNodeHeight = 1;

  const addNode = (data, node = root) => {
    newNodeHeight += 1;

    if (newNodeHeight > 7) {
      setError('Tree is getting too tall. Try entering a different value.');
      return;
    }

    const newNode = new Node(data);

    if (node === null) {
      setRoot(newNode);
    } else if (data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        addNode(data, node.left);
      }
    } else if (data > node.data) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        addNode(data, node.right);
      }
    } else {
      setError('Duplicate values not allowed');
    }
  }

  const handleChange = e => {
    const valueInt = parseInt(e.target.value);
    if (valueInt > 999 || valueInt < -999) {
      setError('Please enter a value between -999 and 999');
    } else {
      setError('');
    }

    setValue(e.target.value);
  };

  const handleClickAdd = e => {
    e.preventDefault();

    setError('');
    addNode(parseInt(value));
    newNodeHeight = 1;
    setValue('');
    if (root) setRoot(root);
  }

  return (
    <Root>
      <InputContainer>
        <Input type='number' value={value} onChange={handleChange} />
        <Button type='submit' onClick={handleClickAdd} value='add node' disabled={!value || error} />
      </InputContainer>
      <Error>{error}</Error>
    </Root>
  )
};

export default Add;
