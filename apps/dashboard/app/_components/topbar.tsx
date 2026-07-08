import Image from "next/image";
import logo from "../../assets/genesisportugal_logo.svg";
import Profile from "./topbarprofile";

export default function TopBar() {
  return (
    <div
      className="fixed left-0 top-0 flex flex-row w-screen h-20 bg-[#0f0f0f] border-b 
      border-[#242424] p-4 justify-between"
    >
      <a
        className="relative h-full flex flex-row gap-1 items-baseline font-sans font-black
        hover:cursor-pointer
        "
        href="/"
      >
        <Image src={logo} className="h-full w-auto" alt="genesis portugal logo" />
        <p>.bot</p>
      </a>
      <div className="relative h-full">
        <Profile />
      </div>
    </div>
  );
}
