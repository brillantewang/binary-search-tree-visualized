import React from 'react';
import styled from 'styled-components/macro';

const Root = styled.div`
  display: flex;
`;

const Circle = styled.div`
  box-sizing: border-box;
  border: 5px solid white;
  border-radius: 50%;
  padding: 10px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const NullPlaceholder = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cluster = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RenderTree = ({ nodes, level }) => {
  if (level === 0) return null;

  return (
    <Root>
      {nodes.map(node => {
        const children = node ? [node.left, node.right] : [null, null];

        return (
          <Cluster>
            {node ? <Circle>{node.data}</Circle> : <NullPlaceholder />}
            <RenderTree nodes={children} level={level - 1} />
          </Cluster>
        );
      })}
    </Root>
  );
}

export default RenderTree;
