import { usePosts } from '../hooks';

export default function PostForm() {
  const { addPost } = usePosts();

  return (
    <div>
      <button type="button" onClick={addPost}>
        Add post!
      </button>
    </div>
  );
}
