import React, { useCallback, useState } from "react";
import styles from "./Chat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import ChatBox from "./ChatBox/ChatBox";
import useGetUser from "../../hooks/api/User/useGetUser";
const Chat = () => {
    const { users } = useGetUser({}, []);
    const [openChatBox, setOpenChatBox] = useState(false);

    const onOpenChatBox = useCallback(() => {
        setOpenChatBox((pre) => !pre);
    }, []);

    return (
        <div className={styles["chat"]}>
            <div className={styles["icon"]} onClick={onOpenChatBox}>
                <FontAwesomeIcon icon={faMessage} />
            </div>
            {openChatBox && <ChatBox users={users} />}
        </div>
    );
};

export default Chat;
