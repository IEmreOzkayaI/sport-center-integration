'use client'

import Link from "next/link";
import { Button } from "../ui/button";

export default function PaginationLine(props: { className?: string, page: number, limit: number, count: number, next: () => void, prev: () => void }) {
    return (
        <div className={`${props.className} flex items-center justify-between px-3`}>
            <div className="text-gray-400 mb-[-16px]">{Number(props.page) * Number(props.limit)} to {Number(props.page) * Number(props.limit) + Number(props.limit)}</div>
            <div>
                {props.page > 0 &&
                    <button onClick={() => props.prev()} className="border-none bg-transparent text-gray-400 hover:text-black hover:bg-transparent"
                    >Geri</button>
                }
                {
                    (props.page * props.limit + props.limit) < props.count && (
                        <button onClick={() => props.next()} className="ml-2 border-none bg-transparent text-gray-400 hover:text-black hover:bg-transparent"
                        >İleri</button>
                    )

                }
            </div>
        </div >
    )
}
