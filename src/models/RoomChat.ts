import { User } from "./User";

export type RoomChat = {
    [key: string]: any;
    _id: string;
    users: User[];
};
