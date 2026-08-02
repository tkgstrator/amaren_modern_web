declare module '*.yaml' {
  // biome-ignore lint/suspicious/noExplicitAny: 任意の値を受け取るため
  const content: any
  export default content
}
