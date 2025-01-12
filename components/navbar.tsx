import { auth, signOut, signIn } from "@/auth.ts"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const session = await auth();

    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Image src='/logo.png' alt='logo' width={144} height={30}></Image>

                {/* Show when user is logged in */}
                <div className='flex items-center gap-5 text-black'>
                    {session && session?.user ? (
                        <>
                            <Link href='/startup/create'>
                                <span>Create</span>
                            </Link>

                            <form
                                action={async () => {
                                    "use server";
                                    await signOut({ redirectTo: '/' });
                                }}
                            >
                                <button type="submit">
                                    <span className="max-sm:hidden">Logout</span>
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user.name}</span>
                            </Link>
                        </>
                    ) : (
                            <form
                                action={async () => {
                                    "use server";
                                    await signIn();
                                }}
                            >
                                <button type="submit">Login</button>
                            </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar