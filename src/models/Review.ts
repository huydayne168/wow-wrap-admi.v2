import { type } from "os";
import { User } from "./User";

export type Review = {
    _id: string;
    date: string;
    comment: string;
    ratePoint: number;
    user: User;
};
