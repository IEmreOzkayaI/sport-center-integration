import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ArrowRight, MoveRight, PanelRight, ToggleRight } from "lucide-react"
import { IconRight } from "react-day-picker"

export default function PaginationLine(props: { className?: string }) {
    return (
        <Pagination className={`${props.className}`}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationLink href="#">Geri</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">İleri</PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
