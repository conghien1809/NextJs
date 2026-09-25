import Link from "next/link"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <div>
                <Link href="/">Trang chủ</Link>
            </div>
            {children}
        </main>
    )
}