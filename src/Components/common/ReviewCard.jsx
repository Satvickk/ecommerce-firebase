export default function ReviewCard({ Image, Name, TimeStamp, Content }) {
    return (
      <div className="flex w-80 sm:w-96 flex-col gap-4 bg-slate-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 shrink-0">
            <img
              className="w-full h-full object-cover rounded-full"
              src={Image}
              alt={Name}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-lg font-semibold">{Name}</div>
            <div className="text-sm text-gray-500">{TimeStamp}</div>
          </div>
        </div>
        <div className="text-gray-700">{Content}</div>
      </div>
    );
  }
  