import React from 'react';
import styled from 'styled-components/macro';

const FixedContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;

const StyledSvg = styled.svg`
  height: 100%;
  width: 100%;
`;

const LineTo = ({ fromPos, toPos }) => {
  const x1 = fromPos.x + (fromPos.width / 2);
  const y1 = fromPos.y + (fromPos.height / 2);
  const x2 = toPos.x + (toPos.width / 2);
  const y2 = toPos.y + (toPos.height / 2);

  const yDelta = Math.abs(y2 - y1);
  const xDelta = Math.abs(x2 - x1);

  const angle = Math.atan(yDelta / xDelta);
  const radius = fromPos.height / 2;

  const offsetY = radius * Math.sin(angle);
  const offsetX = radius * Math.cos(angle);

  const newX1 = x1 < x2 ? x1 + offsetX : x1 - offsetX;
  const newY1 = y1 + offsetY;

  const newX2 = x2 < x1 ? x2 + offsetX : x2 - offsetX;
  const newY2 = y2 - offsetY;

  return (
    <FixedContainer>
      <StyledSvg>
        <line strokeWidth="2px" stroke="white" x1={newX1} y1={newY1} x2={newX2} y2={newY2} />
      </StyledSvg>
    </FixedContainer>
  )
};

export default LineTo;
