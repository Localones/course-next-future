import React from 'react';
import {getProviders, signIn} from "next-auth/react";
import Header from "@/components/Header";

export default function signin({providers}) {
    return (
        <>
            <Header/>
            <div className="flex justify-center space-x-7 mt-20">
                <h2 className="text-bold">SignIn Login</h2>
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <p>This app is created for learning purpose</p>
                        {provider.name == "GitHub" ?
                            <button className="bg-blue-400 rounded-lg p-3 text-white
                            hover:bg-blue-500" onClick={() => signIn(provider.id, {
                                callbackUrl: "/"
                            })}>
                                Войти {provider.name}
                            </button> : (
                                <button className="bg-red-400 rounded-lg p-3 text-white
                            hover:bg-red-500" onClick={() => signIn(provider.id, {
                                    callbackUrl: "/"
                                })}>
                                    Войти {provider.name}
                                </button>
                            )}
                    </div>
                ))}
            </div>
        </>
    );
};


export async function getServerSideProps(context) {
    const providers = await getProviders()

    return {
        props: {providers},
    }
}