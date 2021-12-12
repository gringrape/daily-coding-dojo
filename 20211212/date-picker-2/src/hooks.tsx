import axios from 'axios';

import { useSetRecoilState, useRecoilValue } from 'recoil';

import { postsState } from './state';

export function usePosts() {
  const posts = useRecoilValue(postsState);
  const setPosts = useSetRecoilState(postsState);

  const loadPosts = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const { data } = await axios.get(url);
    setPosts(data);
  };

  const addPost = () => {
    setPosts([
      {
        id: new Date().getTime(),
        title: 'What time is it?',
        body: `It's ${new Date()}`,
      },
      ...posts,
    ]);
  };

  return {
    posts,
    addPost,
    loadPosts,
  };
}

export default {};
