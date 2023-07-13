export default class codeSnippet {
  code: string;
  prefix: string;
  color: string;

  constructor(code: string, prefix: string, color: string) {
    this.code = code;
    this.prefix = prefix;
    this.color = color;
  }
}
