import React, {useEffect, useState} from 'react';
import minifaker from 'minifaker';
import "minifaker/locales/en"
import Story from "@/components/Story";
import {useSession} from "next-auth/react";

interface StoryUser {
    (id: number, username: string, img: string): void
}

const Stories = () => {
    const [storyUsers, setStoryUsers] = useState([]);

    const {data: session} = useSession();

    useEffect(() => {
        const storyUsers = minifaker.array(20, (i) => (
            {
                id: i,
                username: minifaker.username({locale: 'en'}),
                img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`
            }
        ))

        setStoryUsers(storyUsers)
    }, []);


    return (
        <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border
         overflow-x-scroll rounded-sm scrollbar-none'>
            {session && (
                <Story isUser={true} username={session.user?.name} img={session.user?.image}/>
            )}
            {storyUsers.map(user => <Story key={user.id} {...user} />)}
        </div>
    );
};

export default Stories;