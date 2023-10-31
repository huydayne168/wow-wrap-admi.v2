import React, { useCallback, useState } from "react";
import { useAppSelector } from "../../hooks/store/useStore";
import Input from "../UI/Input/Input";
import { Tag } from "../../models/Tag";
import List from "./List";

const TagList = () => {
    const tagsSlice = useAppSelector((state) => state.tagsSlice);
    const [tags, setTags] = useState<Tag[]>(tagsSlice.allTags);

    const onChangeInputValue = useCallback((value: string) => {
        if (value === "") {
            setTags((pre) => tagsSlice.allTags);
        } else {
            setTags((pre) => {
                return pre.filter((tag) => {
                    return tag.name.toLowerCase().includes(value.toLowerCase());
                });
            });
        }
    }, []);

    return (
        <div>
            <Input
                type="text"
                name="tags"
                id="tags"
                onChangeInputValue={onChangeInputValue}
            />
            <button style={{ marginTop: "2.4rem" }} className="button">
                Add
            </button>
            <List items={tags} />
        </div>
    );
};

export default TagList;
