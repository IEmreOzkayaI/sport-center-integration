'use client';

export default function Pagination(props: { className?: string; page: number; limit: number; count: number; next: () => void; prev: () => void }) {
  return (
    <div className={`${props.className} flex items-center justify-between px-3`}>
      <div className="text-gray-400">
        {Number(props.page) * Number(props.limit)} to {Number(props.page) * Number(props.limit) + Number(props.limit)}
      </div>
      <div className="flex items-center justify-center">
        {props.page > 0 && (
          <button onClick={() => props.prev()} className="border-none bg-transparent text-gray-400 hover:text-black hover:bg-transparent">
            Geri
          </button>
        )}
        {props.page * props.limit + props.limit < props.count && (
          <button onClick={() => props.next()} className="ml-2 border-none bg-transparent text-gray-400 hover:text-black hover:bg-transparent">
            İleri
          </button>
        )}
      </div>
    </div>
  );
}
