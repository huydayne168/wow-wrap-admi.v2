import React, { useEffect, useState, useCallback } from "react";
import styles from "./ProductForm.module.css";
import { Tag } from "../../../models/Tag";
import { useAppSelector } from "../../../hooks/store/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Input from "../../UI/Input/Input";

const ChoseTags: React.FC<{
    submitting: boolean;
    submitHandler: Function;
    existTags?: Tag[];
}> = ({ submitting, submitHandler, existTags }) => {
    const tagsSlice = useAppSelector((state) => state.tagsSlice);
    const [tagsList, setTagsList] = useState<Tag[]>([]);

    const [choseTags, setChoseTags] = useState<Tag[]>(
        existTags ? existTags : []
    );
    const [tagInputValue, setTagInputValue] = useState<string>("");

    useEffect(() => {
        submitHandler("tags", choseTags);
        setTagInputValue("");
    }, [submitting]);

    const tagInputHandler = useCallback((value: string) => {
        setTagInputValue(value);
    }, []);

    // handle filter tags:
    useEffect(() => {
        if (tagInputValue === "") {
            setTagsList(tagsSlice.allTags);
        } else {
            const filteredTags = tagsList.filter((tag: any) =>
                tag.name.toLowerCase().includes(tagInputValue.toLowerCase())
            );
            setTagsList(filteredTags);
        }
    }, [tagInputValue]);

    // function to set chose tags:
    const handleChooseTag = useCallback(
        (tag: Tag) => {
            console.log(tag);
            if (!choseTags.some((choseTag) => choseTag._id === tag._id)) {
                setChoseTags((pre: Tag[]) => {
                    return [...pre, tag];
                });
            }
        },
        [choseTags]
    );
    console.log(choseTags);

    // function to delete chose tag:
    const handleDeleteChoseTag = useCallback((tag: Tag) => {
        if (tag) {
            setChoseTags((prev: Tag[]) => {
                return prev.filter((_tag) => _tag._id !== tag._id);
            });
        }
    }, []);

    return (
        <>
            <div className={styles.controls}>
                <Input
                    type="text"
                    name="tags"
                    id="tags"
                    onChangeInputValue={tagInputHandler}
                    label="Tags"
                />
            </div>
            <div
                className={`${styles["choose-tags-action"]} ${styles["controls"]}`}
            >
                <ul className={styles["chose-tags-list"]}>
                    {choseTags &&
                        choseTags.map((tag: any) => {
                            return (
                                <li
                                    key={"chosetags" + tag._id}
                                    className={styles["tag"]}
                                >
                                    {tag.name}
                                    <div
                                        key={tag.name + "deleteIcon"}
                                        onClick={(e) => {
                                            handleDeleteChoseTag(tag);
                                        }}
                                        className={styles["tag-delete-icon"]}
                                    >
                                        <FontAwesomeIcon icon={faClose} />
                                    </div>
                                </li>
                            );
                        })}
                </ul>
                <ul className={styles["tags-list"]}>
                    {tagsList &&
                        tagsList.map((tag: Tag) => {
                            return (
                                <li
                                    key={tag._id}
                                    className={styles["tag"]}
                                    onClick={(e) => {
                                        handleChooseTag(tag);
                                    }}
                                >
                                    {tag.name}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </>
    );
};

export default ChoseTags;
