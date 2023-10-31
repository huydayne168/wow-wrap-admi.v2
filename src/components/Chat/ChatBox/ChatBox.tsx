import React, { useCallback, useState } from "react";
import styles from "./ChatBox.module.css";
import ChatArea from "./ChatArea";
import ChatSideBar from "./ChatSideBar";
import { User } from "../../../models/User";
import { RoomChat } from "../../../models/RoomChat";
import useGetRoomChat from "../../../hooks/api/Chat/useGetRoomChat";
const ChatBox: React.FC<{ users: User[] }> = ({ users }) => {
    const [user, setUser] = useState<User>();
    const room = useGetRoomChat(user?._id);

    const chooseUserHandler = useCallback((user: User) => {
        console.log(user);

        setUser(user);
    }, []);

    return (
        <div className={styles["chat-box"]}>
            <div className={styles["chat-box__heading"]}>Customer Support</div>

            <div className={styles["chat"]}>
                <ChatSideBar
                    users={users}
                    chooseUserHandler={chooseUserHandler}
                />
                {user ? (
                    <ChatArea room={room} />
                ) : (
                    <div className={styles["announce-box"]}>
                        Select customer to chat!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBox;
