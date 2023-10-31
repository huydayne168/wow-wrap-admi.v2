import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ChatArea.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import Input from "../../UI/Input/Input";
import useGetMessage from "../../../hooks/api/Chat/useGetMessage";
import { RoomChat } from "../../../models/RoomChat";
import useSendMessage from "../../../hooks/api/Chat/useSendMessage";
import { useAppSelector } from "../../../hooks/store/useStore";
import { Message } from "../../../models/Message";
import openSocket from "socket.io-client";

const socket = openSocket("https://wow-wraps-backend.onrender.com");
const ChatArea: React.FC<{ room: RoomChat | undefined }> = ({ room }) => {
    const currentUser = useAppSelector((state) => state.authentication);
    const [inputValue, setInputValue] = useState("");
    const roomMessages = useGetMessage(room?._id);
    console.log(roomMessages);
    const [messages, setMessages] = useState<Message[]>(roomMessages);
    const sendMessage = useSendMessage();
    const chatAreaBodyRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        setMessages(roomMessages);
    }, [roomMessages]);

    useEffect(() => {
        socket.once("receiveMess", (data) => {
            setMessages((pre) => [...pre, data.message]);
        });
        if (chatAreaBodyRef.current) {
            chatAreaBodyRef.current.scrollIntoView({ behavior: "smooth" });
        }

        return () => {
            socket.removeAllListeners();
        };
    }, [messages]);

    const handleInputValue = useCallback((value: string) => {
        console.log(value);
        setInputValue(value);
    }, []);
    console.log(inputValue);

    const submitHandler = useCallback(async () => {
        if (room && inputValue !== "") {
            const messageData = await sendMessage(
                currentUser._id,
                inputValue,
                room?._id
            );
            setMessages((pre) => [
                ...pre,
                {
                    content: inputValue,
                    user: currentUser._id,
                },
            ]);
            socket.emit("sendMess", {
                message: {
                    user: currentUser._id,
                    content: inputValue,
                },
            });
        }
    }, [inputValue]);

    return (
        <div className={styles["chat-area"]}>
            <div className={styles["chat-box__body"]}>
                <ul>
                    {messages &&
                        messages.map((m, index) => {
                            return (
                                <li
                                    key={m.content + index}
                                    className={`${
                                        m.user === currentUser._id
                                            ? styles["my-mess"]
                                            : styles["other-mess"]
                                    }`}
                                >
                                    {m.content}
                                </li>
                            );
                        })}
                    <li ref={chatAreaBodyRef}></li>
                </ul>
            </div>

            <div className={styles["chat-box__bottom"]}>
                <Input
                    type="text"
                    name="chat"
                    id="chat"
                    onChangeInputValue={handleInputValue}
                />
                <FontAwesomeIcon icon={faPaperclip} />
                <FontAwesomeIcon icon={faFaceSmile} />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        submitHandler();
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatArea;
