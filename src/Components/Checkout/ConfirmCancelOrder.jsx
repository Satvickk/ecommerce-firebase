import LoadingButton from "../common/LoadingButton";

export default function ConfirmCancelOrder({
  handleClose,
  handleConfirm,
  handleOrderLater,
  loading,
}) {
  return (
    <>
      <dialog id="confirmCancelOrder" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">Cancel Order ?</h3>
          <p className="py-2">
            Cancelling the order will remove all the Products from your Cart !
          </p>
          <p className="py-4">
            Order Later will save your Product in the Cart so you can buy them later <span className="text-green-500">(suggested)</span>
          </p>
          <div className="modal-action">
            <form method="dialog">
              <LoadingButton
                isLoading={loading}
                className="btn btn-primary hover:bg-red-500"
                onClick={handleConfirm}
              >
                Confirm
              </LoadingButton>
              <button className="btn mx-3" onClick={handleOrderLater}>
                Order Later
              </button>
              <button className="btn btn-outline" onClick={handleClose}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
