import { HoverCardContent, HoverCardTrigger,HoverCard } from "@/components/ui/hover-card"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { Phone, Mail } from "lucide-react"

export const UserProfile = () => {
  const { data:useDataInfo, isLoading, error } = useUserInfoQuery(undefined);
const user = useDataInfo?.data;
const email=user?.email.split("@")


if (isLoading) return <p>Loading...</p>;
if (error) return <p>Failed to load user info.</p>;
console.log("email");
  
  return (
    <div
      className="profile-card w-[300px] lg:w-xl mx-auto rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
    >
      <div
        className="avatar w-full pt-5 flex items-center justify-center flex-col gap-1"
      >
         <HoverCard>
      <div className="flex items-center gap-3">
        <img
          className="shrink-0 rounded-full"
          src="avatar-40-05.jpg"
          width={40}
          height={40}
          alt="Avatar"
        />
        <div className="space-y-0.5">
          <HoverCardTrigger asChild>
            
              <p className="text-sm font-medium hover:underline" >
                {user.name}
              
            </p>
          </HoverCardTrigger>
          <p className="text-muted-foreground text-xs">@{email[0]}</p>
        </div>
      </div>
      <HoverCardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              className="shrink-0 rounded-full"
              src="avatar-40-05.jpg"
              width={40}
              height={40}
              alt="Avatar"
            />
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-muted-foreground text-xs">{user.email}</p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
      </div>
      <div className="headings *:text-center *:leading-4">
        <p className="text-xl font-serif font-semibold text-[#434955]">{user.name}</p>
        <p className="text-sm font-semibold text-[#434955]">{user.role}</p>
      </div>
      <div className="w-full items-center justify-center flex">
        <ul
          className="flex flex-col items-start gap-2 has-[:last]:border-b-0 *:inline-flex *:gap-2 *:items-center *:justify-center *:border-b-[1.5px] *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[#434955] pb-3"
        >
          <li className="flex items-center gap-2">
            <Phone size={15} className="text-stone-700 group-hover:text-[#58b0e0]" />
            <p>N/A</p>
          </li>
          <li className="flex items-center gap-2">
            <Mail size={15} className="text-stone-700 group-hover:text-[#58b0e0]" />
            <p>{user.email}</p>
          </li>
          {/* <li className="flex items-center gap-2">
            <Globe size={15} className="text-stone-700 group-hover:text-[#58b0e0]" />
            <p>smkydevelopr.com</p>
          </li>
          <li className="flex items-center gap-2">
            <MapPin size={15} className="text-stone-700 group-hover:text-[#58b0e0]" />
            <p>456 Anytown, Near Anywhere, ST 47523</p>
          </li> */}
        </ul>
      </div>
      <hr
        className="w-full group-hover:h-5 h-3 bg-[#58b0e0] group-hover:transition-all group-hover:duration-300 transition-all duration-300"
      />
    </div>
  )
}
