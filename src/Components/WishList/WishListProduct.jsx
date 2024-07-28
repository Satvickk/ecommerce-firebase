import ProductCard from "../common/ProductCard";

export default function Products() {
    return(
        <div className="text-center w-full flex justify-center items-center flex-col my-8 gap-8 p-12">
            <h1 className="divider text-2xl sm:text-3xl font-normal">My WishList</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 py-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            </div>
        </div>
    )
}