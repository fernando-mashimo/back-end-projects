export default interface ITokenGenerator {
  decode(token: string): string;
  generate(login: string): string;
  verify(token: string): boolean;
}
