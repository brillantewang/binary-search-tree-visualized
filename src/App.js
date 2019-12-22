import React from 'react';
import styled from 'styled-components/macro';
import BinarySearchTree from './BinarySearchTree';

const Root = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 1.5vmin);
  color: white;
  overflow: scroll;
`;

const App = () => {
  return (
    <Root>
      <BinarySearchTree />
    </Root>
  )
};

export default App;
