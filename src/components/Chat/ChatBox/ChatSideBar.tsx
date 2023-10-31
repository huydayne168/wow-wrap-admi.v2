import React from "react";
import styles from "./ChatSideBar.module.css";
import { User } from "../../../models/User";
const ChatSideBar: React.FC<{ users: User[]; chooseUserHandler: Function }> = ({
    users,
    chooseUserHandler,
}) => {
    return (
        <div className={styles["chat-sidebar"]}>
            <ul>
                {users.map((user) => {
                    return (
                        <li
                            key={user._id}
                            onClick={() => {
                                chooseUserHandler(user);
                            }}
                        >
                            {user.userName}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ChatSideBar;
