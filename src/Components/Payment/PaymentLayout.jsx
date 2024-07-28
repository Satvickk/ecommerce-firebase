import React from "react";

const PaymentForm = React.lazy(() => import("./PaymentForm"))
const PriceSummaryCard = React.lazy(() => import("./PriceSummaryCard"))

export default function PaymentLayout(){
    return(
        <section className="bg-gray-100 py-8 antialiased md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Payment</h2>
              <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                <PaymentForm />
                <PriceSummaryCard />
              </div>
              <p className="mt-6 text-center text-gray-500 sm:mt-8 lg:text-left">
                Payment processed by MyShop
              </p>
            </div>
          </div>
        </section>
      );
}