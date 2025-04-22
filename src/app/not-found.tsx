// "use clinet"

// import ErrorPage from "next/error";

// export default function error() {
//   return <ErrorPage statusCode={404} />;
// }


// const Notfound = () => {
//   return <ErrorPage statusCode={404} />;
// };

// export default Notfound;

"use client"

import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>404 Error</h2>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
