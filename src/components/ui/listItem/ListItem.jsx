"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import { Button, Row, Col, Typography, Space, message } from "antd";

const { Title, Text, Paragraph } = Typography;

const ListItem = ({ product }) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const handleAddToCart = () => {
    if (!token) {
      message.error("Please log in to add items to the cart.");
      return;
    }

    dispatch(addToCart({ productId: product.id, quantity: 1 }))
      .then(() => {
        message.success("Item added to cart successfully.");
      })
      .catch((error) => {
        message.error(error, "Failed to add item to cart.");
      });
  };

  return (
    <Space style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} sm={12}>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            style={{ objectFit: "contain" }}
            sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 300px"
            priority
          />
        </Col>
        <Col xs={24} sm={12} align="left">
          <Title level={2}>{product.title}</Title>
          <Text>{product.category}</Text>
          <Paragraph>{product.description}</Paragraph>
          <Title level={3}>${product.price}</Title>
          <Button type="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Space>
  );
};

export default ListItem;
