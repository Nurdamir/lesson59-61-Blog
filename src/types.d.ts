export interface BlogPost {
  id: number;
  title: string;
  author: string;
}

export interface ApiPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
}