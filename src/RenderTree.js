import React, { useState, useCallback } from 'react';
import styled from 'styled-components/macro';

const Root = styled.div`
  display: flex;
  width: fit-content;
`;

const Circle = styled.div`
  box-sizing: border-box;
  border: ${props => `${5 - (props.height / 2)}px solid white`};
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${props => `${4 - (props.height / 2)}vh`};
  width: ${props => `${10 - props.height}vh`};
  height: ${props => `${10 - props.height}vh`};
  min-width: 7vh;
  min-height: 7vh;
`;

const NullPlaceholder = styled.div`
  width: 1vh;
  height: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cluster = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RenderTree = ({ nodes, level, treeHeight }) => {
  const [leftNodePos, setLeftNodePos] = useState(null);
  const [rightNodePos, setRightNodePos] = useState(null);

  const setNodePos = useCallback(element => {
    if (element !== null) {
      const isLeftNode = element.getAttribute('data-pos') === 'left';
      const posObj = element.getBoundingClientRect();
      isLeftNode ? setLeftNodePos(posObj) : setRightNodePos(posObj);
    }
  }, []);

  if (level === 0) return null;

  console.log(leftNodePos, 'left node pos');
  console.log(rightNodePos, 'right node pos');

  return (
    <Root>
      {nodes.map((node, idx) => {
        const children = node ? [node.left, node.right] : [null, null];

        return (
          <Cluster key={`${level}${idx}`}>
            {node ?
              <Circle
                data-pos={idx === 0 ? 'left' : 'right'}
                height={treeHeight}
                ref={setNodePos}
              >
                {node.data}
              </Circle> :
              <NullPlaceholder />
            }
            <RenderTree nodes={children} level={level - 1} treeHeight={treeHeight} />
          </Cluster>
        );
      })}
    </Root>
  );
}

export default RenderTree;
