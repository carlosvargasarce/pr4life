import { fetchUserPersonalRecords } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import PrCard from "../cards/PrCard";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

const PersonalRecordsTab = async ({
    currentUserId,
    accountId,
    accountType
}: Props) => {
    let result = await fetchUserPersonalRecords(accountId);

    console.log('Result', result);
    if(!result) redirect('/');

    return (
        <section className="mt-9 flex flex-col gap-10">
            {result.personalRecords.map((pr: any) => (
                <PrCard 
                    key={pr._id}
                    id={pr._id}
                    //currentUserId={currentUserId}
                    //details={pr.details}
                    name={pr.name}
                    value={pr.value}
                    unit={pr.unit}
                    variation={pr.variation}
                    // owner={pr.owner}
                    date={pr.entryDate}
                    group={pr.group}
                />
            ))}
        </section>
    )
}

export default PersonalRecordsTab;