import React from 'react'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'

export default function Header() {
    return (
        <div>Header
            <ul>
                <li>
                    <Link href="/login">Đăng nhập</Link>
                </li>
                <li>
                    <Link href="/register">Đăng ký</Link>
                </li>
            </ul>
            <ModeToggle />
        </div>
    )
}
