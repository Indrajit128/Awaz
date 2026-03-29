export default function LoginLayout({ children }: { children: React.ReactNode }) {
  // No extra html/body wrapper - the root layout (app/layout.tsx) handles that.
  // This layout just renders children directly, giving the login page a clean slate.
  return <>{children}</>;
}
