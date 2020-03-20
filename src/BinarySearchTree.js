import React from 'react';
import styled from 'styled-components/macro';
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
  z-index: 1;
`;

class BinarySearchTree extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  state = { root: null }

  setRoot = root => {
    this.setState({ root: { ...root }}); // replaces root insteads of mutates it
  }

  getTreeHeight(node = this.state.root) {
    if (node === null) return 0;

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
          {this.state.root === null && <div>Start by adding a node (enter a number).</div>}
          <RenderTree nodes={[this.state.root]} level={treeHeight} treeHeight={treeHeight} />
        </TreeContainer>
      </>
    )
  }
}

export default BinarySearchTree;
