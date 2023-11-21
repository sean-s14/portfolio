import { auth, signIn, signOut } from "@/auth";

export default async function Footer() {
  const session = await auth();

  return (
    <footer className="h-12 flex gap-4 flex-wrap items-center justify-center border-t px-6">
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
      <span className="text-sm">
        &copy; {new Date().getFullYear()} Sean Stocker
      </span>
    </footer>
  );
}
