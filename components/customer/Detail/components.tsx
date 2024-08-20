export function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <>
            <div className="font-semibold">{title}</div>
            <ul className="grid gap-3">{children}</ul>
        </>
    );
}


export function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <li className="flex items-center justify-between">
            <span className="text-muted-foreground">{label}</span>
            <span>{value}</span>
        </li>
    );
}
