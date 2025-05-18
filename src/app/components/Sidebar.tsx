'use client'

import { ReactNode } from "react"
import Account from "./Account"
import Separator from "./Separator"
import Input from "./Search"
import Controls from "./Controls"
import Card from "./Card"
import Badge from "./Badge"
import Image from "next/image"
import points from '@/data.json';


type Props = {
  main: ReactNode
  side: ReactNode
}


export default function Sidebar({ main, side }: Props) {
  return (
    <div className="h-full flex">
      <div className="w-full xl:w-[75vw] h-full">
        {main}
      </div>
      <div className="hidden xl:block xl:w-[25vw] h-full">
        <Panel />
      </div>
    </div>
  );

}

function Panel() {
  return (
    <div className="flex flex-col h-full p-[1rem] gap-[1rem] bg-neutral-900">
      <Account></Account>
      <Separator />
      <Input />
      <Controls />
      <Separator />
      {points.features.map((point, index) => (
        <PointCard data={point.properties} key={index} />
      ))}
    </div>
  )
}

function PointCard({ data }: { data: any }) {
  const borderMap = {
    Crisis: "border-orange-600",
    Assets: "border-sky-600",
    Medical: "border-emerald-600",
  };

  const bgMap = {
    Crisis: "bg-orange-600",
    Assets: "bg-sky-600",
    Medical: "bg-emerald-600",
  };

  const iconMap = {
    Crisis: "./error_24.svg",
    Assets: "./package_24.svg",
    Medical: "./health_cross_24.svg",
  };

  const type = data.type as keyof typeof borderMap;

  const borderClr = borderMap[type];
  const bgClr = bgMap[type];
  const iconSrc = iconMap[type];

  return (
    <Card style={`flex flex-col py-[0.5rem] gap-[0.5rem] border-l-[4px] ${borderClr}`}>
      <p className="text-xl font-medium">{data.title}</p>
      <div className="flex gap-[1rem]">
        <Badge text={data.type} clr={bgClr} icon={iconSrc} />
        <div className="flex flex-wrap gap-[0.5rem] content-center">
          <Image src={"/schedule_24.svg"} alt="clock icon" width={16} height={16} className="h-[16px]" />
          <p className="h-[16px] text-[16px] leading-[16px]">{data.time}</p>
        </div>
        <div className="flex flex-wrap gap-[0.5rem] content-center">
          <Image src={"/notification_24.svg"} alt="notification icon" width={16} height={16} className="h-[16px]" />
          <p className="h-[16px] text-[16px] leading-[16px]">
            {data.notifications ? data.notifications : "none"}
          </p>
        </div>
      </div>
    </Card>
  );
}
