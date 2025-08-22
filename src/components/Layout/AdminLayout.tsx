import type { ReactNode } from "react"

interface IProps{
    children:ReactNode
}

export const AdminLayout = ({children}:IProps) => {
  return (
    <div>{children}</div>
  )
}
