import React from 'react';
import styled from 'styled-components/macro';

const Root = styled.div`
  display: flex;
`;

const Circle = styled.div`
  border: 5px solid white;
  border-radius: 50%;
  padding: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cluster = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RenderTree = ({ nodes }) => {
  return (
    <Root>
      {nodes.map(node => {
        if (node === null) return <Circle>null</Circle>

        const children = [node.left, node.right];
        return (
          <Cluster>
            <Circle>{node.data}</Circle>
            <RenderTree nodes={children} />
          </Cluster>
        );
      })}
    </Root>
  );
}

export default RenderTree;
