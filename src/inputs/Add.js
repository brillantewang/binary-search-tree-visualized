import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Node from '../Node';

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

  const handleClickAdd = () => {
    addNode(parseInt(value));
    setValue('');
    setRoot(root);
  }

  console.log(root, 'root');

  return (
    <div>
      <input value={value} onChange={handleChange} />
      <button onClick={handleClickAdd}>add node</button>
    </div>
  )
};

export default Add;
