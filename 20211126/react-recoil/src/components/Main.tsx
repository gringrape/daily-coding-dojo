import styled from 'styled-components';

import PostForm from './PostForm';
import Posts from './Posts';

const Greeting = styled.div`
  font-size: 2em;
  text-align: center;
  i {
    font-size: 5em;
  }
`;

export default function Main() {
  return (
    <Greeting>
      Hello, world
      <i>!</i>
      <PostForm />
      <Posts />
    </Greeting>
  );
}
