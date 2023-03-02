import React from 'react';
import Image from "next/image";
import {AiOutlinePlusCircle} from 'react-icons/ai'

interface userStory {
    username?: string,
    img?: string,
    isUser?: boolean
}

const Story = ({username, img, isUser}) => {
    return (
        <div className='relative group cursor-pointer'>
            <Image
                className="rounded-full p-[1.5px] border-red-500 border-2
                 group-hover:scale-110 transition-transform duration-200 ease-out"
                src={img} alt={img} width={70} height={30}/>
            {isUser && <AiOutlinePlusCircle className="h-6 absolute top-4 left-4 text-white" />}
            <p className='text-xs w-14 truncate '>{username}</p>
        </div>
    );
};

export default Story;