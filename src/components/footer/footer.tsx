import { auth, signIn, signOut } from "@/auth";

export default async function Footer() {
  const session = await auth();

  return (
    <footer className="h-full flex gap-4 flex-wrap items-center justify-center border-t px- bg-gradient-to-r from-slate-950 to-neutral-800">
      {session?.user?.email ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="text-blue-400 hover:text-blue-200">
            Sign out
          </button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <button className="text-blue-400 hover:text-blue-200">
            Admin Sign In
          </button>
        </form>
      )}
      <span className="text-sm" aria-label="Copyright for Sean Stocker">
        <span aria-hidden="true" className="flex gap-1">
          <span>&copy;</span>
          <span>{new Date().getFullYear()}</span>
          <span>Sean Stocker</span>
        </span>
      </span>
    </footer>
  );
}
