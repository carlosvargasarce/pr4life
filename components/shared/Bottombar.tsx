'use client';

import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import Icon from '@icon-park/react/es/all';

function Bottombar() {
    const pathname = usePathname();

    return (
        <section className="pr_bottombar">
            <div className="pr_bottombar_container">
                {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`pr_bottombar_link ${isActive && 'bg-primary'}`}
                        >
                            <Icon
                                type={link.type}
                                size="1.3em"
                            />

                            <p className="text-subtle-medium text-light-1 max-sm:hidden">
                                {link.label.split(/\s+./)[0]}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Bottombar;