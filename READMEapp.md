Lessons in this build

Hardhat

1. Tasks in Hardhat are super versatile
2. Still to learn:
3. hardhat network config
4. specific return meanings

NextJS

1. path definitions in tsconfig are really cool! https://refine.dev/blog/next-js-with-typescript/#how-to-configure-absolute-imports-and-module-path-aliases-in-tsconfigjson

2.

Typescript:

1. Children for Components https://blog.logrocket.com/using-react-children-prop-with-typescript/#supported-children-types

2. You don't need to specify the return type with components. https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement

3. ReactElement vs ReactNode

- A ReactElement is an object with a type and props.
- A ReactNode is a ReactElement, a ReactFragment, a string, a number or an array of ReactNodes, or null, or undefined, or a boolean:
- the render methods of class components return ReactNode, but function components return ReactElement

Javascript things

1. async await with timeout's are still a bit of a mystery - but i don't think you can use timeout in a chain and so need to write the request differently
2.

app bugslist

- text is non-responsive
- needs re-engineering for modularity
- typescript not enforced
- no error checking on wallet
- minting takes forever... make a loading component on a timer that says different things (takes an array and cycles through)
