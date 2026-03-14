import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogout = () => {

    localStorage.removeItem("token")

    navigate("/login")
  }

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow">

      {/* Logo */}

      <Link to="/" className="text-2xl font-bold">
        ResumeAI
      </Link>

      {/* Navigation */}

      <div className="flex gap-6 items-center">

        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>

        {token && (
          <>
            <Link
              to="/upload"
              className="hover:text-blue-600"
            >
              Upload
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Logout
            </button>
          </>
        )}

        {!token && (
          <>
            <Link
              to="/login"
              className="hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-black text-white rounded-lg"
            >
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  )
}