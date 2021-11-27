import { fireEvent, render } from '@testing-library/react';

import PostForm from './PostForm';

const addPost = jest.fn();

jest.mock('../hooks', () => ({
  usePosts: () => ({
    posts: [],
    addPost,
  }),
}));

describe('PostForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('listens to "add" button click event', () => {
    const { getByText } = render(<PostForm />);

    fireEvent.click(getByText('Add post!'));

    expect(addPost).toBeCalled();
  });
});
