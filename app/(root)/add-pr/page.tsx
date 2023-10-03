import PostPR from "@/components/forms/PostPR";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

async function Page() {
    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');
    
    return (
        <>
            <h1 className="pr_head-text-dark">Add Personal Record</h1>
            <PostPR userId={userInfo._id} />
        </>
    )
}

export default Page;