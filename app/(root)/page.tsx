import PrCard from "@/components/cards/PrCard";
import { fetchPersonalRecords } from "@/lib/actions/pr.actions";
import { fetchUser, fetchUserPersonalRecords } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

	console.log('USER', userInfo)

    if(!userInfo?.onboarded) redirect('/onboarding');

	let result = await fetchUserPersonalRecords(user.id);

	return (
		<div>
			<h1 className="pr_head-text-dark text-left">My Personal Records</h1>

			<section className="mt-9 flex flex-col gap-6">
				{result.personalRecords.length === 0 ? (
					<p className="pr_no-result">No PRs found</p>
				) : (
					<>
						{result.personalRecords.map((pr: any) => (
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
						))}
					</>
				)}
			</section>
		</div>
	)
}