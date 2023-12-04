import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

const Page = async () => {
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding');

    return (
        <section>
           <h1 className="pr_head-text-dark text-left">Groups</h1>
           <p>Coming Soon</p>
        </section>
    )
}

export default Page