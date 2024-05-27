"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Button, List, Space, Typography, message } from "antd";
import Image from "next/image";
import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
} from "@/store/cartSlice";
import Cookies from "js-cookie";

const { Title, Text } = Typography;

export default function CartPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items);
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token || !user) {
      message.warning("Please log in to view your cart.");
      return;
    }
    const userId = Cookies.get("userId");
    if (userId) {
      dispatch(fetchCart());
    }
  }, [dispatch, token, user]);

  const handleRemove = (productId) => {
    if (!token) {
      message.warning("Please log in to remove items from the cart.");
      return;
    }
    dispatch(removeFromCart(productId));
  };
  if (!token || !user) {
    return (
      <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
        <Title level={2}>Your Cart</Title>
        <Text>Please log in to view your cart.</Text>
      </div>
    );
  }

  const handleIncrement = (productId, currentQuantity) => {
    dispatch(updateCartQuantity({ productId, quantity: currentQuantity + 1 }));
  };

  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(
        updateCartQuantity({ productId, quantity: currentQuantity - 1 })
      );
    } else {
      handleRemove(productId);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={2}>Your Cart</Title>
      {!cartItems.length ? (
        <Text>Your cart is empty</Text>
      ) : (
        <List
          itemLayout="vertical"
          size="large"
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item
              key={item.productId}
              actions={[
                <Space key={item.productId}>
                  <Button
                    onClick={() =>
                      handleDecrement(item.productId, item.quantity)
                    }
                  >
                    -1
                  </Button>
                  <Button
                    onClick={() =>
                      handleIncrement(item.productId, item.quantity)
                    }
                  >
                    +1
                  </Button>
                  <Button onClick={() => handleRemove(item.productId)}>
                    Remove
                  </Button>
                </Space>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  item.product ? (
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div>No image available</div>
                  )
                }
                title={item.product ? item.product.title : "No title available"}
                description={
                  item.product
                    ? item.product.description
                    : "No description available"
                }
              />
              <Text>Quantity: {item.quantity}</Text>
              <br />
              {item.product && <Text strong>Price: ${item.product.price}</Text>}
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
