export interface User {
  username: string;
  roles: ('admin' | 'user')[];
}
