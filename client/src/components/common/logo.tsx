import { useNavigate } from "react-router-dom"

const Logo = () => {
    const navigate = useNavigate();
  return (
    <div onClick={() => {
        navigate("/")
    }}>
        <img className="cursor-pointer" src="/images/jeshop.png" width={150} height={150} />
    </div>
  )     
}

export default Logo