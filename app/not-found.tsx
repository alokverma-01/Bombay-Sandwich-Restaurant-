import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-turmeric px-4 py-20 text-center text-ink">
      <div>
        <p className="font-display text-[clamp(5rem,20vw,12rem)] leading-none">404</p>
        <h1 className="mt-4 font-display text-3xl md:text-5xl">This page fell off the plate</h1>
        <p className="mx-auto mt-4 max-w-md text-lg">The link may be old or mistyped. The sandwiches are still where they always are.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-ink">Go home</Link>
          <Link href="/menu" className="btn btn-white">See the menu</Link>
        </div>
      </div>
    </section>
  );
}
