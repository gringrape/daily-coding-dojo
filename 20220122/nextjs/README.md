## 1. Routing
### Routing using file system
src/pages 폴더의 내부 구조를 이용해서 라우팅 한다.

### Client side navigation
Link 태그를 이용한다
```javascript
export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          back to main
        </Link>
      </h2>
    </>
	);
}
```
client side navigation 은 javascript 를 이용해서 이루어지는 navigation 을 말한다. 

### client side rendering 을 확인하는 방법
- html 태그의 색깔을 노란색으로 바꾼다.
- 페이지를 이동해본다
- 노란색이 유지되면, client side rendering 이다.

위와같은 확인이 가능한 이유는,
브라우저가 새로운 페이지 전체의 html 을 새로 렌더링 하지 않기 때문이다. JavaScript 를 사용해서 페이지의 특정 부분만을 렌더링 하기 때문에,매우 빠르다.

This is a starter template for [Learn Next.js](https://nextjs.org/learn).