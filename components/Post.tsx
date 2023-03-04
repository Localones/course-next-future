import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {db} from "@/firebase";
import {AiOutlineHeart} from 'react-icons/ai'
import {BsChatDots} from 'react-icons/bs'
import {FiBookmark} from 'react-icons/fi'
import {HiOutlineEmojiHappy} from 'react-icons/hi'
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {addDoc, collection, onSnapshot, orderBy, query} from "@firebase/firestore";
import {serverTimestamp} from "@firebase/database";
import Moment from "react-moment";

interface Post {
    username: string,
    userImg: string,
    caption: string
    profileImg: string,
    id: string
}

const Post = ({id, username, image, caption, profileImg}: Post) => {

    const {data: session} = useSession();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const router = useRouter();

    async function sendComment(event) {
        event.preventDefault();
        const commentToSend = comment;
        setComment('')

        // console.log(id, commentToSend)
        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session?.user.username,
            userImage: session?.user?.image,
            timestamp: serverTimestamp(),
        })
    }

    useEffect(() => {
        return onSnapshot(
            query(collection(db, 'posts', id, 'comments'),
                orderBy('timestamp', 'desc')),
            (snapshot) => setComments(snapshot.docs))
    }, [db, id]);

    return (
        <div className='bg-white my-7 border rounded-md'>
            <div className="flex items-center p-5">
                <Image className='h-12 rounded-full object-cover border p-1 mr-3' src={profileImg} alt={username}
                       width={70} height={30} onClick={() => router.push('/')}/>
                <p className='font-bold flex-1'>{username}</p>
            </div>

            {/* Post Image */}

            <Image className="object-cover " src={image} onClick={() => router.push('/')}
                   alt={image} width={1000} height={50}/>

            {/* Post Buttons */}

            {session && (
                <div className="flex justify-between px-4 pt-4 pb-4">
                    <div className="flex space-x-4">
                        <AiOutlineHeart className='btn text-5xl'/>
                        <BsChatDots className='btn text-5xl'/>
                    </div>
                    <FiBookmark className='btn text-5xl'/>
                </div>
            )}

            {/* PostComment */}

            <p className="p-5 truncate">
                <span className="font-bold mr-2">{username}</span> {caption}
            </p>
            {comments.length > 0 && (
                <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex items-center space-x-2 mb-2">
                            <Image width={50} height={50} className="rounded-full object-cover h-7"
                                   src={comment.data().userImage} alt={comment}/>
                            <p className="font-semibold">{comment.data().username}</p>
                            <p className="flex-1 truncate">{comment.data().comment}</p>
                            <Moment fromNow>{comment.data().timestamp}</Moment>
                        </div>
                    ))}
                </div>
            )}

            {/* Post input box */}

            {session && (
                <form className="flex items-center p-4">
                    <HiOutlineEmojiHappy className="h-7"/>
                    <input value={comment}
                           onChange={event => setComment(event.target.value)}
                           className="border-none flex-1 focus:ring-0" type="text" placeholder="enter your comment..."/>
                    <button type='submit' onClick={sendComment} disabled={!comment.trim()}
                            className="disabled:text-blue-200 text-blue-400 font-bold">Post
                    </button>
                </form>
            )}
        </div>
    );
};

export default Post;