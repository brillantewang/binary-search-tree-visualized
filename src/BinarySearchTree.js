import React, { useState, useEffect } from 'react';
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

const NotMobileOrTabletOptimizedMessage = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100vw;
  text-align: center;
  font-size: calc(5px + 2vmin);
`;

const BinarySearchTree = () => {
  const [root, setRoot] = useState(null);
  const [windowDimensions, setWindowDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const handleSetRoot = newRoot => setRoot({ ...newRoot }); // replaces root instead of mutates it

  const handleResize = () => setWindowDimensions({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => window.addEventListener('resize', handleResize), []);

  const getTreeHeight = (node = root) => {
    if (node === null) return 0;

    let childHeight;
    if (node.left && node.right) {
      const leftHeight = getTreeHeight(node.left);
      const rightHeight = getTreeHeight(node.right);
      childHeight = leftHeight > rightHeight ? leftHeight : rightHeight;
    } else if (node.left) {
      childHeight = getTreeHeight(node.left);
    } else if (node.right) {
      childHeight = getTreeHeight(node.right);
    } else {
      childHeight = 0;
    }

    return childHeight + 1;
  }

  const treeHeight = getTreeHeight();

  return (
    <>
      <ControlPanel>
        <Add root={root} setRoot={handleSetRoot} />
      </ControlPanel>
      <TreeContainer>
        {root === null && <div>Start by adding a node (enter a number).</div>}
        <RenderTree nodes={[root]} level={treeHeight} treeHeight={treeHeight} />
      </TreeContainer>
      {windowDimensions.width < 800 &&
        <NotMobileOrTabletOptimizedMessage>
          This app is not yet optimized for mobile or tablet
        </NotMobileOrTabletOptimizedMessage>
      }
    </>
  );
};

export default BinarySearchTree;
