'use client';

import Icon from '@icon-park/react/es/all';
import { formatDateString2 } from "@/lib/utils";
import Link from 'next/link';

interface Props {
    id: string,
    //currentUserId: string,
    //details: string,
    name: string,
    value: string,
    unit: string,
    // owner: {
    //     name: string,
    //     image: string,
    //     id: string
    // },
    variation: string,
    date: Date
}

const PrCard = ({
    id,
    //currentUserId,
    //details,
    name,
    value,
    unit,
    variation,
    // owner,
    date
}: Props) => {
    return (
        <Link href={`/personal-record/${id}`}>
            <article className="flex w-full flex-col rounded-xl p-4 xs:p-7 transition-shadow hover:shadow-pr-card-hover shadow-pr-card cursor-pointer">
                <div className="flex items-start justify-between">
                    <div className="flex w-full flex-1 flex-row gap-6 items-center">
                        <div className="hidden xs:block">
                            <Icon
                                type="Weightlifting"
                                size="2.5em"
                            />
                        </div>
                        <div>
                            <p>
                                <span className="block xs:inline text-body1-bold">{name} </span>
                                <span className="text-body-medium text-gray-500 whitespace-nowrap">({variation})</span>
                            </p>
                            <p className="text-gray-500">{formatDateString2(date.toISOString())}</p>
                        </div>
                        <div className="self-center justify-self-end ml-auto min-w-fit">
                            <p className="text-heading3-bold lg:text-heading1-bold">
                                {value}
                                <span className="text-body-normal text-gray-500 inline-block ml-1 relative -top-4">
                                    {unit}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )

}

export default PrCard;