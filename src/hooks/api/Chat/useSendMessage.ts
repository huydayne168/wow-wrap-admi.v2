import React, { useEffect, useState } from "react";
import usePrivateHttp from "../../authentication/usePrivateHttp";
import { Message } from "../../../models/Message";

const useSendMessage = () => {
    const privateHttp = usePrivateHttp();

    const sendMessage = async (
        userId: string,
        content: string,
        roomId: string
    ) => {
        try {
            const res = await privateHttp.post("/api/chat/sendMessage", {
                userId,
                roomId,
                content,
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return sendMessage;
};

export default useSendMessage;
