import React, {useState, useEffect} from 'react';
import Post from "@/components/Post";
import {collection, onSnapshot, orderBy, query} from "@firebase/firestore";
import {db} from "@/firebase";

const Posts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        return onSnapshot(
            query(collection(db, "posts"),
                orderBy('timestamp', "desc")),
            (snapshot => setPosts(snapshot.docs)));
    }, [db]);


    /*const posts = [
        {
            id: '1',
            username: 'codewithsahand',
            userImg: 'https://thebiography.org/wp-content/uploads/2021/08/jon_cor_the_flash_7.jpg',
            img: "https://images.unsplash.com/photo-1677325408720-e83dc085f304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            caption: 'Nice picture'
        },
        {
            id: '2',
            username: 'Jona',
            userImg: 'https://thebiography.org/wp-content/uploads/2021/08/jon_cor_the_flash_7.jpg',
            img: "https://images.unsplash.com/photo-1677095042813-678fb5a3e7e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            caption: 'New ocean'
        },
    ]*/
    // <Post key={post.id} {...post.data()} />
    return (
        <div>
            {posts.map(post => <Post key={post.id} id={post.id} {...post.data()} />)}
        </div>
    );
};

export default Posts;