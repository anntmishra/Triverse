export interface Social {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface Member {
  id: string;
  name: string;
  position: string;
  avatar?: string;
  bio?: string;
  social?: Social;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  heads: Member[];
  members: Member[];
}

export default Member;
