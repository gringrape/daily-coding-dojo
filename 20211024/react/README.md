# Custom checkbox
## styled component
installation
```bash
npm install styled-components
npm install --save-dev @types/styled-components
```

## check icon
```html
<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	aria-hidden="true"
	focusable="false"
>
	<path
		fill="none"
		stroke="currentColor"
		stroke-width="3"
		d="M1.73 12.91l6.37 6.37L22.79 4.59"
	/>
</svg>
``` 

## mark up
체크박스 label, input, icon

### eslint, input 과 label 연결
`.eslintrc.js` 파일:
```javascript
module.exports = {
	//...(전략)...
	rules: {
		'jsx-a11y/label-has-associated-control':  ['error', {
			required: {
				some: ['nesting', 'id'],
			},
		}],
		'jsx-a11y/label-has-for': ['error', {
			required: {
				some: ['nesting', 'id'],
			},
		}],
	},
	//...(후략)...
}
```