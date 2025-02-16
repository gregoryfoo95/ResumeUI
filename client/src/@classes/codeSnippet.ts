export default class codeSnippet {
  code: string;
  prefix: string;
  color: string;
  shouldType: boolean;

  constructor(
    code: string,
    prefix: string,
    color: string,
    shouldType: boolean,
  ) {
    this.code = code;
    this.prefix = prefix;
    this.color = color;
    this.shouldType = shouldType;
  }
}
