import { useSelector } from "react-redux"

const Home = () => {
  const { currentUser } = useSelector((state) => state.user)
  const formattedCreatedAt = new Date(currentUser.createdAt).toLocaleString()
  console.log(currentUser)
  return (
    <div className="mt-16">
      {currentUser ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-red-500 text-center mt-5">
            Welcome{" "}
            <span className="text-blue-500">{currentUser.username}</span>
          </h1>
          <img
            src={currentUser.profilePicture}
            alt="profile"
            className="h-28 w-28 rounded-full object-cover my-2 mt-3 shadow-lg"
          />
          <span className="mt-3 text-center font-medium">
            Account created at {formattedCreatedAt}
          </span>
        </div>
      ) : (
        <h1 className="text-center font-semibold text-3xl mt-5">
          Please Sign In
        </h1>
      )}
    </div>
  )
}

export default Home
