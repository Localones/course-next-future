import React from 'react';
import Image from "next/image";
import {AiOutlineHeart} from 'react-icons/ai'
import {BsChatDots} from 'react-icons/bs'
import {FiBookmark} from 'react-icons/fi'
import {HiOutlineEmojiHappy} from 'react-icons/hi'


interface Post {
    username: string,
    userImg: string,
    img: string,
    caption: string
}

const Post = ({username, userImg, img, caption}: Post) => {
    return (
        <div className='bg-white my-7 border rounded-md'>
            <div className="flex items-center p-5">
                <Image className='h-12 rounded-full object-cover border p-1 mr-3' src={userImg} alt={username}
                       width={70} height={30}/>
                <p className='font-bold flex-1'>{username}</p>
            </div>

            {/* Post Image */}

            <Image className="object-cover " src={img}
                   alt={img} width={1000} height={50}/>

            {/* Post Buttons */}

            <div className="flex justify-between px-4 pt-4 pb-4">
                <div className="flex space-x-4">
                    <AiOutlineHeart className='btn text-5xl'/>
                    <BsChatDots className='btn text-5xl'/>
                </div>
                <FiBookmark className='btn text-5xl'/>
            </div>

            {/* PostComment */}

            <p className="p-5 truncate">
                <span className="font-bold mr-2">{username}</span> {caption}
            </p>

            {/* Post input box */}

            <form className="flex items-center p-4">
                <HiOutlineEmojiHappy className="h-7" />
                <input className="border-none flex-1 focus:ring-0" type="text" placeholder="enter your comment..."/>
                <button className="text-blue-400 font-bold">Post</button>
            </form>
        </div>
    );
};

export default Post;