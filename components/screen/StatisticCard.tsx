import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function StatisticCard(props: { className?: string, subText: string, title: string, value: string, icon?: React.ReactNode }) {
    return (
        <Card className={`${props.className} w-full`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
                {props.icon}
            </CardHeader>
            <CardContent>
                <div className="text-lg sm:text-xl md:text-2xl font-bold">{props.value}</div>
                <p className="text-xs sm:text-sm md:text-sm md:pt-2 text-muted-foreground">{props.subText}</p>
            </CardContent>
        </Card>
    )
}
