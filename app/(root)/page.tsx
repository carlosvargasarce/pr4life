import PrCard from "@/components/cards/PrCard";
import { fetchPersonalRecords } from "@/lib/actions/pr.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
	const result = await fetchPersonalRecords();
	const user = await currentUser();

	console.log('Result', result);
	return (
		<div>
			<h1 className="pr_head-text-dark text-left">My Personal Records</h1>

			<section className="mt-9 flex flex-col gap-6">
				{result.prs.length === 0 ? (
					<p className="no-result">No PR's found</p>
				) : (
					<>
						{result.prs.map((pr) => (
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