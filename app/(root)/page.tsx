import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <p className="test flex flex-col items-center">
          Hello Welcome To <br />
          <span className="font-bold text-3xl">Quick Chat</span>
        </p>
        <Link
          href={"/auth/login"}
          className="p-5 bg-black text-white rounded-md"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
