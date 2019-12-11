import React from 'react';
import styled from 'styled-components/macro';
import Node from './Node';
import RenderTree from './RenderTree';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class BinarySearchTree extends React.Component {
  constructor(props) {
    super(props);

    this.root = null;
  }

  add(data, node = this.root) {
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    if (data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.add(data, node.left);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.add(data, node.right);
      }
    }
  }

  render() {
    // console.log(this.root, 'a');
    this.add(5);
    // console.log(this.root, 'b');
    this.add(2);
    // console.log(this.root, 'c');
    this.add(8);
    // console.log(this.root, 'c');
    this.add(18);
    this.add(1);
    this.add(7);
    this.add(4);
    this.add(11);
    this.add(9);

    return (
      <Root>
        <RenderTree nodes={[this.root]} level={0} />
      </Root>
    )
  }
}

export default BinarySearchTree;
