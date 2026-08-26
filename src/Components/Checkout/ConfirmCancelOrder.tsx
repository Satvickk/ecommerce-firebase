import LoadingButton from "../common/LoadingButton";

interface ConfirmCancelOrderProps {
  handleClose: () => void;
  handleConfirm: () => void;
  handleOrderLater: () => void;
  loading: boolean;
}

export default function ConfirmCancelOrder({
  handleClose,
  handleConfirm,
  handleOrderLater,
  loading,
}: ConfirmCancelOrderProps) {
  return (
    <dialog id="confirmCancelOrder" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box border-4 border-black bg-white rounded-none p-0 max-w-md w-full">
        <div className="bg-black text-white p-4 flex items-center justify-between border-b-4 border-black">
          <h3 className="font-black text-sm uppercase tracking-widest text-swiss-accent">CANCEL ORDER CONFIRMATION</h3>
          <button onClick={handleClose} className="text-white hover:text-swiss-accent font-black text-lg">✕</button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-black leading-relaxed border-l-4 border-swiss-accent pl-3">
            CANCELLING THE ORDER WILL PERMANENTLY REMOVE ALL SELECTED PRODUCTS FROM YOUR CHECKOUT SESSION.
          </p>

          <div className="flex flex-col gap-3 pt-4 border-t-2 border-black">
            <LoadingButton
              isLoading={loading}
              className="w-full bg-swiss-accent text-white border-2 border-swiss-accent font-black text-xs uppercase tracking-widest hover:bg-black hover:border-black transition-colors duration-150 rounded-none py-3"
              onClick={handleConfirm}
            >
              CONFIRM CANCEL ORDER
            </LoadingButton>

            <button
              type="button"
              className="w-full bg-black text-white font-black text-xs uppercase tracking-widest py-3 border-2 border-black hover:bg-swiss-accent transition-colors duration-150 rounded-none"
              onClick={handleOrderLater}
            >
              SAVE FOR LATER →
            </button>

            <button
              type="button"
              className="w-full bg-white text-black font-black text-xs uppercase tracking-widest py-3 border-2 border-black hover:bg-swiss-muted transition-colors duration-150 rounded-none"
              onClick={handleClose}
            >
              RETURN TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
