import React from 'react';
import styled from 'styled-components/macro';
import Node from './Node';
import RenderTree from './RenderTree';
import Add from './inputs/Add';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class BinarySearchTree extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  state = { root: new Node(10), valueToAdd: '' }

  setRoot = root => {
    this.setState({ root: { ...root }}); // replaces root insteads of mutates it
  }

  getTreeHeight(node = this.state.root) {
    let childHeight;
    if (node.left && node.right) {
      const leftHeight = this.getTreeHeight(node.left);
      const rightHeight = this.getTreeHeight(node.right);
      childHeight = leftHeight > rightHeight ? leftHeight : rightHeight;
    } else if (node.left) {
      childHeight = this.getTreeHeight(node.left);
    } else if (node.right) {
      childHeight = this.getTreeHeight(node.right);
    } else {
      childHeight = 0;
    }

    return childHeight + 1;
  }

  render = () => {
    const treeHeight = this.getTreeHeight();
    console.log(treeHeight, 'treeHeight');
    if (this.ref.current) console.log(this.ref.current.offsetWidth);

    return (
      <Root ref={this.ref}>
        <Add root={this.state.root} setRoot={this.setRoot} />
        <RenderTree nodes={[this.state.root]} level={treeHeight} treeHeight={treeHeight} />
      </Root>
    )
  }
}

export default BinarySearchTree;
