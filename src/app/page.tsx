import { Button } from "@/components/ui/button"
import { SignUpButton } from "@clerk/nextjs"

const Home = () => {
  return (
    <div>
      Home
      <SignUpButton mode="modal">Sign Up</SignUpButton>
    </div>
  )
}

export default Home