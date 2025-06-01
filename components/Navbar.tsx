import React from 'react';
import { auth } from '@/auth';
import { githubSignIn, logout } from '@/app/actions/auth-action';
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-2 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <a href="/">
          <img src="/logo.jpg"  alt="logo" width={70} height={20}   style={{
      width: 50,
      height: 50,
      borderRadius: "50%",
      objectFit: "cover",
    }} />
        </a>

        <div className="flex items-center gap-5">
          {session?.user ? (
            <>
              <a href="/startup/create">
                <span className='max-sm:hidden'>Create</span>
                <BadgePlus className="size-6 sm:hidden" />

              </a>

              <form action={logout}>
                <button type="submit">
                  <span className='max-sm:hidden'>Logout</span>
                 <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              <a href={`/user/${session.user.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </a>
            </>
          ) : (
            <form action={githubSignIn}>
              <button type="submit">
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
