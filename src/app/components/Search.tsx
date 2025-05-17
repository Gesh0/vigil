import Image from "next/image";

export default function Search() {
  return (
    <div className="flex gap-[1rem]">
      <input type="text" className="min-w-0 w-full bg-neutral-800 rounded-sm px-[1rem] py-[0.5rem]" placeholder="Search ..."></input>
      <button className="bg-neutral-800 w-max rounded-sm px-[0.5rem] py-[0.5rem]">
        <Image src={'/search_24.svg'} alt="search icon" width={24} height={24} />
      </button>
    </div>
  )
}