'use client'

export default function NotFound() {
  return (
    <main className="flex grow flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="mb-8 text-xl">
        This page could not be found
      </p>
      <img width={300} src={'https://res.cloudinary.com/dynrld3nm/image/upload/f_auto,q_auto,w_300/guntxjakka.me/404_fdi8fx.jpg'} alt="A cat with a loading spinner icon on its forehead, appearing as if it is buffering or deep in thought." />
    </main>
  )
}
