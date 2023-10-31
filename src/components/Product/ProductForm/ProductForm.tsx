import React, { useCallback, useEffect, useState } from "react";
import styles from "./ProductForm.module.css";
import { Product } from "../../../models/Product";
import Input from "../../UI/Input/Input";
import Dropdown from "../../UI/Dropdown/Dropdown";
import ImagePreview from "../../UI/ImagePreview/ImagePreview";
import { Category } from "../../../models/Category";
import { Tag } from "../../../models/Tag";
import Textarea from "../../UI/Textarea/Textarea";
import ChoseTags from "./ChoseTags";
import { useAppSelector } from "../../../hooks/store/useStore";
import Selection from "../../UI/Selection/Selection";

export type ProductFormData = {
    [key: string]: any;
    name: string;
    category: Category;
    amount: string;
    price: string;
    shortDescription: string;
    longDescription: string;
    tags: Tag[];
    image: string;
};

const ProductForm: React.FC<{ product?: Product; submitHandler: Function }> = ({
    product,
    submitHandler,
}) => {
    const [submitting, setSubmitting] = useState(false);
    const categories = useAppSelector((state) => state.categoriesSlice);

    const [formData, setFormData] = useState<ProductFormData>({
        name: product?.name || "",
        category: product?.category || {
            _id: "",
            name: "",
        },
        amount: product?.amount.toString() || "",
        price: product?.price.toString() || "",
        shortDescription: product?.shortDescription || "",
        longDescription: product?.longDescription || "",
        tags: product?.tags || [],
        image: product?.image || "",
    });

    const submitStateHandler = useCallback(() => {
        setSubmitting((pre) => !pre);
    }, []);

    const handleFormData = useCallback(
        (key: string, value: string) => {
            setFormData((pre: ProductFormData) => {
                const newFormData = { ...pre };
                newFormData[key] = value;
                return newFormData;
            });
        },
        [submitting]
    );

    useEffect(() => {
        console.log(formData);
        submitHandler(formData);
    }, [formData]);

    return (
        <div className={styles.productFormContainer}>
            <div className={styles["product-form"]}>
                <form action="#">
                    <div className={styles.controls}>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={product?.name}
                            submitting={submitting}
                            onChangeInputValue={handleFormData}
                            label="Name"
                        />
                    </div>
                    <div className={styles.controls}>
                        <Selection
                            name="category"
                            id="category"
                            label="Category"
                            submitting={submitting}
                            onChangeSelectHandler={handleFormData}
                            selectOptions={categories}
                            defaultValue={product?.category}
                        />
                    </div>
                    <div className={styles.controls}>
                        <Input
                            type="number"
                            name="amount"
                            id="amount"
                            defaultValue={product?.amount.toString()}
                            submitting={submitting}
                            onChangeInputValue={handleFormData}
                            label="Amount"
                        />
                    </div>
                    <div className={styles.controls}>
                        <Input
                            type="number"
                            name="price"
                            id="price"
                            defaultValue={product?.price.toString()}
                            submitting={submitting}
                            onChangeInputValue={handleFormData}
                            label="Price($)"
                        />
                    </div>
                    <div className={styles.controls}>
                        <Textarea
                            label="Short Description"
                            name="shortDescription"
                            id="shortDescription"
                            defaultValue={product?.shortDescription}
                            submitting={submitting}
                            onChangeInputValue={handleFormData}
                            cols={30}
                            rows={3}
                        />
                    </div>

                    <div className={styles.controls}>
                        <Textarea
                            label="Long Description"
                            name="longDescription"
                            id="longDescription"
                            defaultValue={product?.longDescription}
                            submitting={submitting}
                            onChangeInputValue={handleFormData}
                            cols={30}
                            rows={3}
                        />
                    </div>

                    <ChoseTags
                        submitting={submitting}
                        submitHandler={handleFormData}
                        existTags={product?.tags}
                    />

                    <div
                        className={`${styles.controls} ${styles["image-control"]}`}
                    >
                        <Input
                            type="file"
                            name="image"
                            id="image"
                            defaultValue={product?.image}
                            submitting={submitting}
                            onChangeInputValue={handleFormData}
                            label="Images"
                        />
                    </div>
                    {product?.image || formData.image ? (
                        <ImagePreview
                            image={
                                formData.image ? formData.image : product?.image
                            }
                        />
                    ) : (
                        <ImagePreview />
                    )}

                    <button
                        className="button"
                        onClick={(e) => {
                            e.preventDefault();
                            submitStateHandler();
                        }}
                    >
                        {product ? "Edit" : "Add"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
