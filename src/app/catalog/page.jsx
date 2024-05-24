import Catalog from "@/components/ui/catalog/Catalog";
import { ProductService } from "@/utils/data";

async function getProducts() {
  const data = await ProductService.getAll();

  return data;
}
export default async function CatalogPage() {
  const data = await getProducts();

  return (
    <div>
      <Catalog products={data} />
    </div>
  );
}
