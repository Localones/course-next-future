import React, {useRef, useState} from 'react';
import {useRecoilState} from "recoil";
import {modalState} from "@/atom/modalAtom";
import Modal from 'react-modal';
import {AiOutlineCamera} from 'react-icons/ai';
import Image from "next/image";
import {addDoc, collection, doc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {db, storage} from "@/firebase";
import {useSession} from "next-auth/react";
import {getDownloadURL, ref, uploadString} from "@firebase/storage";

function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const filePickerRef = useRef(null);
    const captionRef = useRef(null);

    const {data: session} = useSession();

    async function uploadPost() {
        if (loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, 'posts'), {
            caption: captionRef.current.value,
            username: session?.user?.username,
            profileImg: session?.user?.image,
            timestamp: serverTimestamp(),
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(imageRef, selectedFile, 'data_url')
            .then(async (snapshot) => {
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, 'posts', docRef.id), {
                    image: downloadURL,
                })
            })

        setOpen(false)
        setLoading(false)
        setSelectedFile(null)
    }

    function addImage(event) {
        const readerFile = new FileReader();

        if (event.target.files[0]) {
            readerFile.readAsDataURL(event.target.files[0]);
        }

        readerFile.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    return (
        <div>

            {open && (
                <Modal className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white
                border-2 rounded-md shadow-md" isOpen={open} onRequestClose={() => {
                    setOpen(false);
                    setSelectedFile(null)
                }}>
                    <div className="flex flex-col justify-center items-center h-[100%]">
                        {selectedFile ? (
                            <Image onClick={() => setSelectedFile(null)} src={selectedFile} alt={selectedFile}
                                   width={100} height={50}/>
                        ) : (
                            <AiOutlineCamera onClick={() => filePickerRef.current.click()}
                                             className="cursor-pointer h-20 w-10 bg-red-200 p-2 rounded-full border-2 text-red-500"/>)}

                        <input type="file" hidden ref={filePickerRef} onChange={addImage}/>
                        <input type="text" maxLength={150}
                               placeholder="Please enter you"
                               className="m-4 border-none text-center w-full focus:ring-0"
                               ref={captionRef}/>
                        <button disabled={!selectedFile || loading}
                                onClick={uploadPost} className="w-full bg-red-600 text-white p-2
                         shadow-md hover:brightness-125 disabled:bg-gray-200
                          disabled:cursor-not-allowed disabled:hover:brightness-100">
                            Upload Post
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default UploadModal;
