import { HoverCardContent, HoverCardTrigger,HoverCard } from "@/components/ui/hover-card"
import { Phone, Mail, Globe, MapPin } from "lucide-react"

export const UserProfile = () => {
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
            <p>
              <a className="text-sm font-medium hover:underline" href="#">
                Keith Kennedy
              </a>
            </p>
          </HoverCardTrigger>
          <p className="text-muted-foreground text-xs">@k.kennedy</p>
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
              <p className="text-sm font-medium">Keith Kennedy</p>
              <p className="text-muted-foreground text-xs">@k.kennedy</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            Designer at{" "}
            <strong className="text-foreground font-medium">@Origin UI</strong>.
            Crafting web experiences with Tailwind CSS.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <img
                className="ring-background rounded-full ring-1"
                src="/avatar-20-04.jpg"
                width={20}
                height={20}
                alt="Friend 01"
              />
              <img
                className="ring-background rounded-full ring-1"
                src="/avatar-20-05.jpg"
                width={20}
                height={20}
                alt="Friend 02"
              />
              <img
                className="ring-background rounded-full ring-1"
                src="/avatar-20-06.jpg"
                width={20}
                height={20}
                alt="Friend 03"
              />
            </div>
            <div className="text-muted-foreground text-xs">
              3 mutual friends
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
      </div>
      <div className="headings *:text-center *:leading-4">
        <p className="text-xl font-serif font-semibold text-[#434955]">ANNA WILSON</p>
        <p className="text-sm font-semibold text-[#434955]">DEVELOPER</p>
      </div>
      <div className="w-full items-center justify-center flex">
        <ul
          className="flex flex-col items-start gap-2 has-[:last]:border-b-0 *:inline-flex *:gap-2 *:items-center *:justify-center *:border-b-[1.5px] *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[#434955] pb-3"
        >
          <li className="flex items-center gap-2">
            <Phone size={15} className="text-stone-700 group-hover:text-[#58b0e0]" />
            <p>+123-458-784</p>
          </li>
          <li className="flex items-center gap-2">
            <Mail size={15} className="text-stone-700 group-hover:text-[#58b0e0]" />
            <p>smkys@gmail.com</p>
          </li>
          <li className="flex items-center gap-2">
            <Globe size={15} className="text-stone-700 group-hover:text-[#58b0e0]" />
            <p>smkydevelopr.com</p>
          </li>
          <li className="flex items-center gap-2">
            <MapPin size={15} className="text-stone-700 group-hover:text-[#58b0e0]" />
            <p>456 Anytown, Near Anywhere, ST 47523</p>
          </li>
        </ul>
      </div>
      <hr
        className="w-full group-hover:h-5 h-3 bg-[#58b0e0] group-hover:transition-all group-hover:duration-300 transition-all duration-300"
      />
    </div>
  )
}
