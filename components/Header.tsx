import Image from "next/image";
import {signIn, useSession, signOut} from "next-auth/react";
import {useRecoilState} from "recoil";
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {BiHomeAlt} from 'react-icons/bi';
import {modalState} from "@/atom/modalAtom";

export default function Header(): JSX.Element {

    const {data: session} = useSession();
    const [open, setOpen] = useRecoilState(modalState);

    // @ts-ignore
    return (
        <div className="shadow-sm border-b sticky top-0 bg-white z-30">
            <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
                <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
                    <Image
                        src={"https://phonoteka.org/uploads/posts/2021-05/1621757085_7-phonoteka_org-p-fon-ikonki-instagrama-7.png"}
                        alt={'instagram'} width={100} height={50} className="object-contain"/>
                </div>

                <div className="relative mt-1">
                    <div className="absolute top-2 left-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                        </svg>
                    </div>
                    <input type="text" name="search" placeholder="Search"
                           className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"/>
                </div>


                {session ? (
                    <div className="flex space-x-4 items-center">
                        <BiHomeAlt
                            className="text-2xl cursor-pointer hover:scale-110 transition-transform duration-200 ease-out"/>
                        <AiOutlinePlusCircle
                            className="text-2xl cursor-pointer hover:scale-110 transition-transform duration-200 ease-out"
                            onClick={() => setOpen(true)}/>
                        <Image src={session?.user?.image} onClick={signOut}
                               className="rounded-full cursor-pointer" width={50} height={50} alt={"avatar"}/>
                    </div>
                ) : (
                    <button onClick={signIn}>Sign in</button>
                )}

            </div>
        </div>
    )
}


