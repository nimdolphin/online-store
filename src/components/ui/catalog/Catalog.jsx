"use client";

import { Row, Col, Typography, Space } from "antd";
import Link from "next/link";
import ProductItem from "./product.item/ProductItem";

const { Title } = Typography;

const Catalog = ({ products }) => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Title level={2}>Our products</Title>
      <Row gutter={[32, 32]} style={{ margin: "0 16px" }}>
        {products?.map(
          ({ id, title, category, description, image, price, rating }) => (
            <Col key={id} xs={24} sm={12} md={8} lg={6}>
              <Link href={`/catalog/${id}`}>
                <ProductItem
                  title={title}
                  category={category}
                  description={description}
                  image={image}
                  price={price}
                  rating={rating}
                />
              </Link>
            </Col>
          )
        )}
      </Row>
    </Space>
  );
};

export default Catalog;
