import React from 'react';
import styled from 'styled-components';

const Task = ({ task }) => {
  return <Container>{task.content}</Container>;
};

const Container = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
`;

export default Task;
