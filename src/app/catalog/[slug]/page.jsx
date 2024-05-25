import { ProductService } from "@/utils/data";
import { notFound } from "next/navigation";

import ListItem from "@/components/ui/listItem/ListItem";

export default async function ProductPage({ params }) {
  const { slug } = params;
  const product = await ProductService.getById(slug);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <ListItem product={product} />
    </div>
  );
}
