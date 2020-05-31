declare module '*.vue' {}

declare module 'validator' {}

declare module 'validator/es/lib/isEmpty' {
  function isEmpty(value: string): boolean
  export default isEmpty
}

declare module 'validator/es/lib/isEmail' {
  function isEmail(value: string): boolean
  export default isEmail
}
