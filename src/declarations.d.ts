declare module '*.yaml' {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const content: any
  export default content
}
