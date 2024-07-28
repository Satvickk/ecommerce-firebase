export default function PriceSummaryCard() {
  return (
    <div className="mt-6 grow sm:mt-8 lg:mt-0">
      <div className="space-y-4 rounded-lg border shadow-lg bg-primary p-6">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-400 ">
              Original price
            </dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">
              &#8377; 6,592.00
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-400 ">Savings</dt>
            <dd className="text-base font-medium text-green-500">
              - &#8377; 299.00
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-400 ">
              Store Pickup
            </dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">
              &#8377; 99
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-400 ">Tax</dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">
              &#8377; 799
            </dd>
          </dl>
        </div>

        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
          <dt className="text-base font-bold text-gray-900 dark:text-white">
            Total
          </dt>
          <dd className="text-base font-bold text-gray-900 dark:text-white">
            &#8377; 7,191.00
          </dd>
        </dl>
      </div>

      <div className="mt-6 flex items-center justify-center gap-8">
        <img
          className="h-8 w-auto "
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
          alt="PayPal"
        />
        {/* <img className="hidden h-8 " src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="PayPal" /> */}
        <img
          className="h-8 w-auto "
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
          alt="Visa"
        />
        {/* <img className="hidden h-8 " src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="Visa" /> */}
        <img
          className="h-8 w-auto "
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
          alt="Mastercard"
        />
        {/* <img className="hidden h-8 " src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="Mastercard" /> */}
      </div>
    </div>
  );
}
