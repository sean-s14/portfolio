export default function Footer() {
  return (
    <footer className="h-12 flex items-center justify-center border-t px-10">
      <span className="text-sm">
        &copy; {new Date().getFullYear()} Sean Stocker
      </span>
    </footer>
  );
}
