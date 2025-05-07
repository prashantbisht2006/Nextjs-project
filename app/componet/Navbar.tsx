import React from 'react';
import { auth } from '@/auth';
import { githubSignIn, logout } from '@/app/actions/auth-action';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-2 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <a href="/">
          <img src="./logo.jpg" alt="logo" width={144} height={30} />
        </a>

        <div className="flex items-center gap-5">
          {session?.user ? (
            <>
              <a href="/startup/create">
                <span>Create</span>
              </a>

              <form action={logout}>
                <button type="submit">
                  <span>Logout</span>
                </button>
              </form>

              <a href={`/user/${session.user.id}`}>
                <span>{session.user.name}</span>
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
