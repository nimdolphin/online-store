import Image from "next/image";
import { Card, Rate, Typography } from "antd";

const { Meta } = Card;
const { Text, Paragraph } = Typography;

const ProductItem = (props) => {
  const { title, category, description, price, image, rating } = props;

  return (
    <Card
      hoverable
      cover={
        <div style={{ position: "relative", width: "100%", height: 300 }}>
          <Image alt={title} src={image} layout="fill" objectFit="contain" />
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
