import PrCard from "@/components/cards/PrCard";
import { fetchPersonalRecordById } from "@/lib/actions/pr.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string }}) => {
    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding')

    const pr = await fetchPersonalRecordById(params.id);

    return (
        <section className="relative">
            <PrCard 
                key={pr._id}
                id={pr._id}
                //currentUserId={user?.id || ''}
                //details={pr.details}
                name={pr.name}
                value={pr.value}
                unit={pr.unit}
                variation={pr.variation}
                // owner={pr.owner}
                date={pr.entryDate}
            />
        </section>
    )
}

export default Page;