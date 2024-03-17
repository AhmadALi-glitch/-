import { useSearchParams } from "react-router-dom";
// @ts-ignore
import logo from "../assets/logo/logo-dark.svg"


export default function WelcomePage() {
  const [params,_] = useSearchParams();
  return (
    <section>
      <img src={logo} alt="site logo" className="w-20 absolute right-2 top-2"/>
      <span className="h-screen flex items-center justify-center text-7xl text-white drop-shadow-2xl">
        {"اهلا وسهلا بك يا " + params.get("name")}
      </span>
    </section>
  )
}
