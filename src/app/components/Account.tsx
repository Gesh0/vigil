import Image from "next/image"
import Card from "./Card"

const account = {
  name: 'Leo Geshovski',
  role: 'administrator'
}

export default function Account() {
  return (
    <Card style="flex gap-[1rem]">
      <Image src={'/profile-icon.svg'} alt="profile icon" width={40} height={40} />
      <div className="flex flex-col justify-around">
        <p className="text-base">{account.name}</p>
        <p className="text-sm">{account.role}</p>
      </div>
      <Image src={'/more_vert_24.svg'} alt="menu" width={24} height={24} className="ml-[auto]" />
    </Card>
  )
}