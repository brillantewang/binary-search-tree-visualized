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

  return (
    <FixedContainer>
      <StyledSvg>
        <line strokeWidth="2px" stroke="red" x1={x1} y1={y1} x2={x2} y2={y2} />
      </StyledSvg>
    </FixedContainer>
  )
};

export default LineTo;
