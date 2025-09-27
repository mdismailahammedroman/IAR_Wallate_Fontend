import {

  useGetAgentInfoQuery,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { Phone, Mail } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

export const UserProfile = () => {
  const role = localStorage.getItem("role");

  const {
    data: userRes,
    isLoading: userLoading,
    error: userError,
  } = useUserInfoQuery(undefined, { skip: role !== "USER" });

  const {
    data: agentRes,
    isLoading: agentLoading,
    error: agentError,
  } = useGetAgentInfoQuery(undefined, { skip: role !== "AGENT" });

  const data = role === "AGENT" ? agentRes : userRes;
  const isLoading = role === "AGENT" ? agentLoading : userLoading;
  const error = role === "AGENT" ? agentError : userError;

  const user = data?.data;

  if (isLoading) return <p>Loading...</p>;
  if (error || !user) return <p>Failed to load user info.</p>;

  const emailPrefix = user.email.split("@")[0];

  return (
    <div className="profile-card w-[300px] lg:w-xl mx-auto rounded-md shadow-xl overflow-hidden bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
      <div className="avatar w-full pt-5 flex items-center justify-center flex-col gap-1">
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
                <p className="text-sm font-medium hover:underline">{user.name}</p>
              </HoverCardTrigger>
              <p className="text-muted-foreground text-xs">@{emailPrefix}</p>
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
        <ul className="flex flex-col items-start gap-2 *:inline-flex *:gap-2 *:items-center *:border-b-[1.5px] *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[#434955] pb-3">
          <li className="flex items-center gap-2">
            <Phone size={15} className="text-stone-700 group-hover:text-[#58b0e0]" />
            <p>N/A</p>
          </li>
          <li className="flex items-center gap-2">
            <Mail size={15} className="text-stone-700 group-hover:text-[#58b0e0]" />
            <p>{user.email}</p>
          </li>
        </ul>
      </div>

      <hr className="w-full group-hover:h-5 h-3 bg-[#58b0e0] transition-all duration-300" />
    </div>
  );
};
