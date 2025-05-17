'use client'

import { ReactNode } from "react"
import Account from "./Account"
import Separator from "./Separator"
import Input from "./Search"
import Controls from "./Controls"
import Card from "./Card"
import Badge from "./Badge"
import Image from "next/image"

type Props = {
  main: ReactNode
  side: ReactNode
}

type point = {
  title: string,
  type: "Crisis" | "Assets" | "Medical"
  time: string,
  notifications: number
}

const pointData: point[] = [
  {
    title: "Vodno Wildfire",
    type: "Crisis",
    time: "12:48",
    notifications: 0
  },
  {
    title: "Supply Depot 12",
    type: "Assets",
    time: "19:02",
    notifications: 0
  },
  {
    title: "Medical Centre",
    type: "Medical",
    time: "19:02",
    notifications: 0
  },
]

export default function Sidebar({ main, side }: Props) {
  return (
    <div className="h-full flex">
      <div className="w-[75vw] h-full">
        {main}
      </div>
      <div className='w-[25vw] '>
        <Panel />
      </div>
    </div>
  )
}

function Panel() {
  return (
    <div className="flex flex-col h-full p-[1rem] gap-[1rem] bg-neutral-900">
      <Account></Account>
      <Separator />
      <Input />
      <Controls />
      <Separator />
      {pointData.map((point, index) => (
        <PointCard data={point} key={index} />
      ))}
    </div>
  )
}

function PointCard({ data }: { data: point }) {

  const borderMap = {
    Crisis: "border-orange-600",
    Assets: "border-sky-600",
    Medical: "border-emerald-600",
  }

  const bgMap = {
    Crisis: "bg-orange-600",
    Assets: "bg-sky-600",
    Medical: "bg-emerald-600",
  }

  const iconMap = {
    Crisis: "./error_24.svg",
    Assets: "./package_24.svg",
    Medical: "./health_cross_24.svg",
  }

  const borderClr = borderMap[data.type]
  const bgClr = bgMap[data.type]
  const iconSrc = iconMap[data.type]

  return (
    <Card style={`flex flex-col gap-[1rem] border-l-[4px] ${borderClr}`}>
      <p className="text-xl font-medium">{data.title}</p>
      <div className="flex gap-[1rem]">
        <Badge text={data.type} clr={bgClr} icon={iconSrc} />
        <div className="flex flex-wrap gap-[0.5rem] content-center">
          <Image src={"/schedule_24.svg"} alt="clock icon" width={16} height={16} className="h-[16px] " />
          <p className="h-[16px] text-[16px] leading-[16px]">{data.time}</p>
        </div>
        <div className="flex flex-wrap gap-[0.5rem] content-center">
          <Image src={"/notification_24.svg"} alt="clock icon" width={16} height={16} className="h-[16px]" />
          <p className="h-[16px] text-[16px] leading-[16px]">{data.notifications ? data.notifications : "none"}</p>
        </div>
      </div>
    </Card>
  )
}