const passwordRegex: RegExp =
  /^(?=.*[a-z\u00f1\u00d1])(?=.*[A-Z\u00f1\u00d1])(?=.*[_\W]).{8,}$/gm;

const mailRegex: RegExp =
  /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(mowa.com.pe|mowacorp.com)$/g;
export { passwordRegex, mailRegex };
