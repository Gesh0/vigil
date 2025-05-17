import { ReactNode } from "react"

type Props = {
  children: ReactNode
  style: string
}

export default function Card({ children, style }: Props) {
  return (
    <div className={`bg-neutral-800 rounded-sm p-[1rem] ${style}`} >
      {children}
    </div >
  )
}