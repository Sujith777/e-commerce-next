import { auth } from "@/auth";
import SubmitButton from "@/components/SubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Product - Flowmazon",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields!!!");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default async function AddProduct() {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== "ADMIN") {
    redirect("/add-product/error");
  }

  return (
    <div className="w-1/2 flex flex-col gap-8 m-auto">
      <h1 className="text-lg mb-3 font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          type="text"
          required
          name="name"
          placeholder="Name"
          className="mb-3 w-full input input-bordered"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          type="url"
          required
          name="imageUrl"
          placeholder="Image URL"
          className="mb-3 w-full input input-bordered"
        />
        <input
          type="number"
          required
          name="price"
          placeholder="Price"
          className="mb-3 w-full input input-bordered"
        />
        <SubmitButton className="btn btn-primary btn-block">
          Add Product
        </SubmitButton>
      </form>
    </div>
  );
}
