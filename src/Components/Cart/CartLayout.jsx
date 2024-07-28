import React from "react";
import { useNavigate } from "react-router-dom"
const CartCard = React.lazy(() => import('./Cart-card'))

export default function CartLayout(){

    const navigate = useNavigate();

    const CART_PRODUCTS_DATA = [
        {
          imageUrl: '/product1.jpg',
          title: "Boat Headphone 2",
          price: 200
        },
        {
          imageUrl: '/product1.jpg',
          title: "Boat Headphone 2",
          price: 200
        },
        {
          imageUrl: '/product1.jpg',
          title: "Boat Headphone 2",
          price: 200
        },
        {
          imageUrl: '/product1.jpg',
          title: "Boat Headphone 2",
          price: 200
        },
        {
          imageUrl: '/product1.jpg',
          title: "Boat Headphone 2",
          price: 200
        },
        {
          imageUrl: '/product1.jpg',
          title: "Boat Headphone 2",
          price: 200
        },
      ]

      return(
        <ul className="menu bg-base-200 text-base-content p-4">
        <h1 className="divider text-md text-3xl my-8 font-medium">
          Cart
          <img
            src={"/cart.svg"}
            alt={"cart"}
            className="w-6 h-6 inline-block"
          />
        </h1>
        <div className="flex flex-col gap-8">
          {
            CART_PRODUCTS_DATA.map((item, index) => 
            <CartCard 
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
            />
          )
          }
        </div>
        <button className="btn btn-primary w-full my-4" 
        onClick={() => navigate('/payment')}
        >Checkout</button>
      </ul>
      )
}