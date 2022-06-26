export type MessageEntity = {
  id: string;
  text: string;
  author: UserProfile;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};

export type ChannelPrivacy = 'private' | 'public';

export type UserProfile = { uid: string; photoURL: string; displayName: string; email: string };

export type ChannelEntity = {
  id?: string;
  name: string;
  admin: UserProfile;
  privacy: ChannelPrivacy;
  members: UserProfile[];
  banned: UserProfile[];
  messages: MessageEntity[];
  admissionRequests: UserProfile[];
};

export type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};
