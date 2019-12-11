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

  getHeight(node = this.root) {
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
    this.add(10);
    this.add(14);
    this.add(12);
    this.add(15);
    // this.add(13);

    return (
      <Root>
        <RenderTree nodes={[this.root]} level={6} />
      </Root>
    )
  }
}

export default BinarySearchTree;