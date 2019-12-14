import React, { useRef } from 'react';
import styled from 'styled-components/macro';

const Root = styled.div`
  display: flex;
`;

const Circle = styled.div`
  box-sizing: border-box;
  border: 5px solid white;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${props => `${4 - (0.4 * props.height)}vh`};
  width: ${props => `${10 - props.height}vh`};
  height: ${props => `${10 - props.height}vh`};
`;

const NullPlaceholder = styled.div`
  /* margin: 2vh; */
  width: 2vh;
  height: 2vh;
  /* width: 4px;
  height: 4px; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cluster = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
`;

const RenderTree = ({ nodes, level, height }) => {
  if (level === 0) return null;

  return (
    <Root>
      {nodes.map(node => {
        const children = node ? [node.left, node.right] : [null, null];

        return (
          <Cluster>
            {node ? <Circle height={height}>{node.data}</Circle> : <NullPlaceholder />}
            <RenderTree nodes={children} level={level - 1} height={height} />
          </Cluster>
        );
      })}
    </Root>
  );
}

export default RenderTree;
