import { useForm } from 'react-hook-form';

export default function PaymentForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-lg border p-4 shadow-xl sm:p-6 lg:max-w-xl lg:p-8">
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="full_name"
            className="mb-2 block text-sm font-medium text-gray-900 "
          >
            Full name (as displayed on card)*
          </label>
          <input
            type="text"
            id="full_name"
            className={`input input-bordered w-full ${errors.full_name && 'input-error'}`}
            placeholder="Full name"
            {...register('full_name', { required: 'Full name is required' })}
          />
          {errors.full_name && <span className="text-red-600">{errors.full_name.message}</span>}
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="card-number-input"
            className="mb-2 block text-sm font-medium text-gray-900 "
          >
            Card number*
          </label>
          <input
            type="text"
            id="card-number-input"
            className={`input input-bordered w-full ${errors.card_number && 'input-error'}`}
            placeholder="xxxx-xxxx-xxxx-xxxx"
            {...register('card_number', {
              required: 'Card number is required',
              pattern: {
                value: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
                message: 'Invalid card number',
              },
            })}
          />
          {errors.card_number && <span className="text-red-600">{errors.card_number.message}</span>}
        </div>

        <div>
          <label
            htmlFor="card-expiration-input"
            className="mb-2 block text-sm font-medium text-gray-900 "
          >
            Card expiration*
          </label>
          <input
            type="text"
            id="card-expiration-input"
            className={`input input-bordered w-full ${errors.card_expiration && 'input-error'}`}
            placeholder="MM/YY"
            {...register('card_expiration', { required: 'Card expiration is required' })}
          />
          {errors.card_expiration && <span className="text-red-600">{errors.card_expiration.message}</span>}
        </div>

        <div>
          <label
            htmlFor="cvv-input"
            className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 "
          >
            CVV*
            <div
              className="tooltip tooltip-top"
              data-tip="The last 3 digits on back of card"
            >
              <button
                type="button"
                className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
              >
                <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </label>
          <input
            type="number"
            id="cvv-input"
            className={`input input-bordered w-full ${errors.cvv && 'input-error'}`}
            placeholder="•••"
            {...register('cvv', { required: 'CVV is required', minLength: { value: 3, message: 'CVV must be 3 digits' } })}
          />
          {errors.cvv && <span className="text-red-600">{errors.cvv.message}</span>}
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Pay now
      </button>
    </form>
  );
}
