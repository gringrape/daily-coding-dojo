## 참고 자료
https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html

## 프로젝트 시작
```bash
cargo init
```

## 실행
```bash
cargo run
```

## 첫번째 요구사항 
- 사용자는 숫자를 입력할 수 있다

### Prelude
> The prelude is the list of things that Rust automatically imports into every Rust program. It’s kept as small as possible, and is focused on things, particularly traits, which are used in almost every single Rust program.

prelude 로 지정되지 않은 모듈은 다음과 같이 별도의 import 를 필요로 한다.

```rust
use std::io;
```

### let mut guess = String::new();

rust 의 변수는 기본적으로 불변이다.
변수값을 변경해주기 위해서는 mut 키워드를 사용해야 한다.

```rust
let apples = 5; // immutable
let mut apples = 5; // mutable
```

> The :: syntax in the ::new line indicates that new is an associated function of the String type. An associated function is a function that’s implemented on a type, in this case String. This new function creates a new, empty string. 

특정 타입과 연관된 함수를 사용하기 위해서는 이렇게 한다. 

```rust
String::new()
```

### 참조
다음코드는 사용자로부터 입력받은 값을 guess 변수에 저장하는 코드다.

```rust
io::stdin()
	.read_line(&mut guess)
```

rust 에서는 참조 또한 기본적으로는 불변이다. 따라서, 변경가능한 참조를 위해,
&mut guess 와 같이 표현한다. 불변참조는 &guess 와 같을 것이다. 

### Result

io::Result 의 형식은 enumeration 으로 제한 된 종류의 variant 를 가지고 있다.
Ok 와 Err type 은 각각에 정의된 메서드가 있다. 

위의 read_line 는 오류가 발생할 경우 Err 타입을 반환하고, Err 타입에는
expect 메서드가 있다.

### println! placeholder

println 함수에서는 다음과 같이 변수값을 받기 위한 placeholder 를 제공한다.

```rust
let x = 5;
let y = 10;

println!("x = {} and y = {}", x, y);
```

