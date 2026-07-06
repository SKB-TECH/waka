import Link from "next/link";
import Image from "next/image";
export function Welcome() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-blue via-cyan-400 to-emerald-300 text-white lg:grid lg:grid-cols-2 lg:bg-white">
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center lg:order-2 lg:min-h-screen">
        <Image src="/waka-cash-logo.png" alt="Waka Cash" width={230} height={100} className="h-24 w-auto rounded-xl bg-white object-contain" priority/>
        <blockquote className="mt-8 max-w-sm text-2xl font-bold leading-8">
          “Manage your own financial assets with confidence”
        </blockquote>
        <div className="mt-8 flex gap-1">
          <i className="h-1 w-5 rounded bg-white" />
          <i className="h-1 w-1 rounded bg-white" />
          <i className="h-1 w-1 rounded bg-white" />
        </div>
      </div>
      <section className="relative rounded-t-[22px] bg-white px-6 py-10 text-ink lg:order-1 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:rounded-none lg:px-[15%]">
        <Link href="/welcome" className="absolute left-[15%] top-5 hidden lg:block"><Image src="/waka-cash-logo.png" alt="Waka Cash" width={180} height={72} className="h-16 w-auto object-contain" priority/></Link>
        <h1 className="text-center text-4xl font-bold leading-tight lg:text-left lg:text-5xl">
          Manage your own
          <br />
          financial assets
        </h1>
        <p className="mt-4 text-center text-sm text-muted lg:text-left">
          Enter your details to proceed further
        </p>
        <div className="mt-10 border-t border-line lg:max-w-md">
          <p className="flex justify-between py-6 text-sm">
            Don&apos;t have an account{" "}
            <Link href="/signup" className="font-bold text-blue">
              Sign Up
            </Link>
          </p>
          <p className="flex justify-between border-t border-line py-6 text-sm">
            Already have an account{" "}
            <Link href="/login" className="font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
