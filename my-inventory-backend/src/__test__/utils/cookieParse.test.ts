import { cookieParser } from './cookieParser';

test('CookieParser', async () => {
  const cookie = [
    'cookieName=cookieValue; Path=/',
    'connect.sid=s%3ADfWtCBpeOLwzAzPVAKVQ-kgjRwx7p-Fw.r8a9a8D9Wwmg7uU1Jo0Z4I0WrP9jIkJ0V3G1gUlZVF4; Path=/; Expires=Sat, 26 Mar 2022 00:03:32 GMT'
  ];
  expect(cookieParser(cookie)).toEqual({
    'connect.sid': {
      name: 'connect.sid',
      value: 's%3ADfWtCBpeOLwzAzPVAKVQ-kgjRwx7p-Fw.r8a9a8D9Wwmg7uU1Jo0Z4I0WrP9jIkJ0V3G1gUlZVF4',
      path: '/',
      expires: 'Sat, 26 Mar 2022 00:03:32 GMT'
    },
    cookieName: { name: 'cookieName', value: 'cookieValue', path: '/' }
  });
});
