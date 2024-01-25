import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";
import { Cross2Icon } from "@radix-ui/react-icons";

interface SearchPageProps {
  searchParams: { query: string };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (products.length === 0) {
    return (
      <div className="card md:w-4/5 md:m-auto items-center min-h-[250px] shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-destructive">
            <Cross2Icon className="h-5 w-5" />
            No matching products found!
          </h2>
          <p className="text-lg">
            Looks like it is unavailable at this moment. In the meantime, try
            searching for another product.
          </p>
          <div className="card-actions justify-end">
            <Link href={"/"} className="btn btn-primary">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
