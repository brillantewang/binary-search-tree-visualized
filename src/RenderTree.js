import React, { useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import LineTo from './LineTo';

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

const RenderTree = ({ nodes, level, treeHeight, parentPos }) => {
  const [leftNodePos, setLeftNodePos] = useState(null);
  const [rightNodePos, setRightNodePos] = useState(null);

  const areNodesSamePosition = (node1Pos, node2Pos) => {
    if (!node1Pos || !node2Pos) return false;

    return node1Pos.x === node2Pos.x && node1Pos.y === node2Pos.y;
  };

  const setNodePos = useCallback(element => {
    if (element) {
      const isLeftNode = element.getAttribute('data-pos') === 'left';
      const posObj = element.getBoundingClientRect();

      if (isLeftNode) {
        if (!areNodesSamePosition(leftNodePos, posObj)) setLeftNodePos(posObj);
      } else {
        if (!areNodesSamePosition(rightNodePos, posObj)) setRightNodePos(posObj);
      }
    }
  });

  console.log(leftNodePos, 'left')
  console.log(rightNodePos, 'right')

  if (level === 0) return null;

  return (
    <Root>
      {nodes.map((node, idx) => {
        const children = node ? [node.left, node.right] : [null, null];
        const currentPos = idx === 0 ? leftNodePos : rightNodePos;

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
            <RenderTree parentPos={currentPos} nodes={children} level={level - 1} treeHeight={treeHeight} />
            {parentPos && currentPos && <LineTo fromPos={parentPos} toPos={currentPos} />}
          </Cluster>
        );
      })}
    </Root>
  );
}

export default RenderTree;
