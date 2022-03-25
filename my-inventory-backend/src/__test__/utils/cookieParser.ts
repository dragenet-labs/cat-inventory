interface CookieCandidate {
  name: string;
  value: string;
  path?: string;
  expires?: string;
}
type Cookie = Exclude<CookieCandidate, 'name'>;
interface CookieParser {
  [key: string]: Cookie;
}
export const cookieParser = (cookies: string[]): CookieParser =>
  cookies
    .map((cookie) => cookie.split(';'))
    .reduce((prevCookies, cookieArr) => {
      const cookieCandidate: CookieCandidate = cookieArr
        .map((cookieArrItem) => cookieArrItem.split('=').map((item) => item.trim()))
        .reduce<CookieCandidate>((prev, current) => {
          const [name, value] = current;
          return { ...prev, ...matchCookieParam(name, value) };
        }, {} as CookieCandidate);
      return { [cookieCandidate.name]: cookieCandidate, ...prevCookies };
    }, {});

const matchCookieParam = (name: string, value: string) => {
  switch (name) {
    case 'Path':
      return { path: value };
    case 'Expires':
      return { expires: value };
    default:
      return { name, value };
  }
};
