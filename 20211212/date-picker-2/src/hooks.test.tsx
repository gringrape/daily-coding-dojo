import { renderHook, act } from '@testing-library/react-hooks';

import { RecoilRoot } from 'recoil';

import { usePosts } from './hooks';

describe('usePosts', () => {
  const wrapper = ({ children }: { children: any}) => (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  );

  const render = () => renderHook(() => usePosts(), { wrapper });

  it('uses a list of post', () => {
    const { result } = render();

    expect(result.current.posts).toHaveLength(0);
  });

  it('appends a new post', () => {
    const { result } = render();

    act(() => {
      result.current.addPost();
    });

    expect(result.current.posts).toHaveLength(1);
  });

  describe('loadPosts', () => {
    it('fetches a list of post', async () => {
      const { result } = render();

      await act(async () => {
        await result.current.loadPosts();
      });

      expect(result.current.posts).not.toHaveLength(0);
    });
  });
});
