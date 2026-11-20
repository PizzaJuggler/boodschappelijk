import { Button } from "@base-ui/react"
import { Home, List, Search, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"

function BottomSheet() {
    return <div className="py-4 bg-accent absolute bottom-0 w-full px-4">
        <div className="mx-auto xl:w-4xl flex justify-center gap-4">
            <NavigationItem name="Zoeken" href="/search"><Search /></NavigationItem>
            <NavigationItem name="Lijsten" href="/lists"><List /></NavigationItem>
            <NavigationItem name="Mandje" href="/cart"><ShoppingBag /></NavigationItem>
        </div>
    </div>
}

function NavigationItem({ children, name, href }: { children: ReactNode, name: string, href: string }) {
    return <Link href={href}>
        <Button className="flex flex-col items-center cursor-pointer hover:bg-muted">
            {children}
            {name}
        </Button >
    </Link>
}

export {
    BottomSheet
}