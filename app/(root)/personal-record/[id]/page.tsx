import { fetchPersonalRecordById } from "@/lib/actions/pr.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { formatDateString2 } from "@/lib/utils";
import Link from "next/link";


const Page = async ({ params }: { params: { id: string }}) => {
    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding')

    const pr = await fetchPersonalRecordById(params.id);

    return (
        <section>
            <h1 className="pr_head-text-dark text-center">{pr.name}</h1>
            <div className="mt-12 text-center">
                <p className="text-big-heading2-bold sm:text-big-heading1-bold">
                    {pr.value}
                    <span className="text-body-normal text-gray-500 inline-block ml-1 relative -top-4">
                        {pr.unit}
                    </span>
                </p>
                <p className="text-gray-500">{formatDateString2(pr.entryDate.toISOString())}</p>
                <Link
                    href="/add-personal-record"
                    className="bg-primary relative rounded-lg p-4 text-light-1 max-w-sm mt-12 w-full inline-block"
                >
                    <p>Add a new PR</p>
                </Link>
            </div>
        </section>
    )
}

export default Page;