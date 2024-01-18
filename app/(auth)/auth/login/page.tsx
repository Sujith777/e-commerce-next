import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import Social from "@/components/Social";

export default function LoginPage() {
  return (
    <div className="card md:w-1/3 w-1/2 bg-base-100 hover:shadow-xl transition-shadow">
      <div className="card-body">
        <div className="card-title">Welcome Back</div>
        <p>Login to your account</p>
        <form action="" className="form-control">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <Social />
          <Link href={"/"} className="flex items-center gap-2">
            <FaChevronLeft />
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}
