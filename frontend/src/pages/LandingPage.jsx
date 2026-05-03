import LoginLeftSide from "../components/LoginLeftSide"
import LoginRightSide from "../components/LoginRightSide"


const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
         <LoginLeftSide/>
         <LoginRightSide/>
    </div>
  )
}

export default LandingPage