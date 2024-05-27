import Image from "next/image";
import { Card, Rate, Typography } from "antd";

const { Meta } = Card;
const { Text, Paragraph } = Typography;

const ProductItem = ({ product }) => {
  const { title, category, description, price, image, rating } = product;

  return (
    <Card
      hoverable
      cover={
        <div style={{ position: "relative", width: "100%", height: 300 }}>
          <Image
            alt={title}
            src={image}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 300px"
            priority
          />
        </div>
      }
    >
      <Meta title={title} description={`${description.slice(0, 100)}...`} />
      <Paragraph type="secondary">{category}</Paragraph>
      <Paragraph strong>${price}</Paragraph>
      <Rate disabled defaultValue={rating.rate} />
      <Text type="secondary">({rating.count} reviews)</Text>
    </Card>
  );
};

export default ProductItem;
