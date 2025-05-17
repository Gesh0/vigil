import Image from "next/image";

type Props = {
  text: string
  clr: any
  icon: any
}

export default function Badge({ text, clr, icon }: Props) {
  return (
    <div className={`flex align-middle gap-[0.25rem] py-[0.125rem] px-[0.5rem] ${clr} rounded-sm`}>
      <Image src={icon} alt="icon" width={16} height={16} />
      <p className="font-medium text-[14px]">{text}</p>
    </div>
  )
}