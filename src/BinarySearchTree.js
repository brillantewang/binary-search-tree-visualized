import React from 'react';
import styled from 'styled-components/macro';
import Node from './Node';
import RenderTree from './RenderTree';
import Add from './inputs/Add';

const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  flex-grow: 1;
  min-width: 100vw;
  width: fit-content;
`;

const ControlPanel = styled.div`
  position: fixed;
  color: white;
  padding: 8px;
`;

class BinarySearchTree extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  state = { root: new Node(40) }

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

    return (
      <>
        <ControlPanel>
          <Add root={this.state.root} setRoot={this.setRoot} />
        </ControlPanel>
        <TreeContainer ref={this.ref}>
          <RenderTree nodes={[this.state.root]} level={treeHeight} treeHeight={treeHeight} />
        </TreeContainer>
      </>
    )
  }
}

export default BinarySearchTree;
