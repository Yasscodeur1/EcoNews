import { Link } from '@inertiajs/react'

export default function welcome() {
  return (
    <div>
      <Link
        href="/login"
        style={{
          color: "white",
          textDecoration: "none",
          display: "block",
          transition: "transform 0.3s ease",
        }}
      >
        Login
      </Link>
    </div>
  )
}
