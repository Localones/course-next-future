import React from 'react';
import Image from "next/image";
import {useSession,signOut} from "next-auth/react";

const MiniProfile = () => {

    const {data: session} = useSession();

    return (
        <div className="flex items-center justify-between mt-14 ml-10">
            <Image className='h-16 rounded-full border p-[2px]'
                   src={session?.user?.image}
                   alt={'avatarMini'} width={70} height={16}/>
            <div className="flex-1 ml-4">
                <h2 className='font-bold'>{session?.user?.name}</h2>
                <h3 className='text-sm text-gray-400'>Welcome to instagram</h3>
            </div>
            <button className="font-semibold text-blue-400 text-sm" onClick={signOut}>Sign out</button>
        </div>
    );
};

export default MiniProfile;