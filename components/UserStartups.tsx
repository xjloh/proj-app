'use client';

import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React, { useEffect, useState } from 'react'
import StartupCard, { StartupTypeCard } from './StartupCard';

const UserStartups = ({ id }: { id: string }) => {
    const [userStartups, setUserStartups] = useState([]);

    useEffect(() => {
        const fetchStartups = async () => {
            const startups = await client.withConfig({ useCdn: false }).fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
            setUserStartups(startups);
        }

        fetchStartups();
    });

    
    return (
        <>
            {userStartups.length > 0 ? (userStartups.map((startup: StartupTypeCard) => (
                <StartupCard key={startup._id} post={startup}/>
            ))
            ) : (
                <p className="no-result">No posts yet</p>
            )}
        </>
    )
}

export default UserStartups