import AuthNavControls from "@/components/shared/AuthNavControls";
import Logo from "@/components/shared/Logo";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <Logo />

        <AuthNavControls />
      </div>
    </nav>
  );
}
