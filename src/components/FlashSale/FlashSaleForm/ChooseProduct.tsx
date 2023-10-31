import React, { useCallback, useEffect, useState } from "react";
import styles from "./ChooseProducts.module.css";
import { Form, Space, Checkbox, List, Avatar } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useAppSelector } from "../../../hooks/store/useStore";
import { Product } from "../../../models/Product";
const ChooseProduct: React.FC<{
    submitting?: boolean;
    onChangeChooseProducts: Function;
    name: string;
}> = ({ submitting, onChangeChooseProducts, name }) => {
    const products = useAppSelector((state) => state.products);
    const [checkAll, setCheckAll] = useState(false);
    const [checkedProducts, setCheckedProducts] = useState<string[]>([]);

    const checkProductHandler = useCallback(
        (e: CheckboxChangeEvent, productId: string) => {
            if (
                (e.target.checked && checkedProducts.length === 0) ||
                !checkedProducts.some((item) => item === productId)
            ) {
                setCheckedProducts((pre) => {
                    return [...pre, productId];
                });
            } else if (
                !e.target.checked &&
                checkedProducts.some((item) => item === productId)
            ) {
                setCheckedProducts((pre: any) => {
                    return pre.filter((p: string) => {
                        return p !== productId;
                    });
                });
            }
        },
        []
    );

    useEffect(() => {
        if (checkAll) {
            setCheckedProducts(products.map((product) => product._id));
        } else {
            setCheckedProducts([]);
        }
    }, [checkAll]);
    console.log(checkedProducts);

    useEffect(() => {
        if (typeof submitting !== "undefined") {
            onChangeChooseProducts(name, checkedProducts);
        }
    }, [submitting]);

    return (
        <Form.Item>
            <label className={styles["big-text"]}>Choose Products</label>
            <Space>
                <div className={styles["big-text"]}>All</div>
                <Checkbox
                    checked={checkAll}
                    onChange={(e) => {
                        setCheckAll(!checkAll);
                    }}
                />
            </Space>
            <List
                dataSource={products}
                style={{
                    width: "100%",
                    marginTop: "32px",
                }}
                renderItem={(item, index) => (
                    <Space>
                        <List.Item
                            style={{
                                margin: "0 4px",
                                width: "200px",
                                padding: "12px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                marginBottom: "8px",
                                backgroundColor: "#eee",
                            }}
                            className={styles["products-list-item"]}
                        >
                            <List.Item.Meta
                                style={{
                                    width: "100%",
                                }}
                                avatar={<Avatar src={item.image} />}
                                title={
                                    <span className={styles["product-name"]}>
                                        {item.name}
                                    </span>
                                }
                            />
                            <Checkbox
                                indeterminate={checkAll}
                                onChange={(e) => {
                                    checkProductHandler(e, item._id);
                                }}
                            />
                        </List.Item>
                    </Space>
                )}
            />
        </Form.Item>
    );
};

export default ChooseProduct;
