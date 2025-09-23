import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

type Role = "user" | "agent";
type Action = "login" | "register";

interface RoleSelectionModalProps {
  action: Action;
}

export function RoleSelectionModal({ action }: RoleSelectionModalProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (role: Role) => {
    setOpen(false);

   if (role === "user") {
  navigate(`/user/register`);
} else {
  navigate(`/agent/agent-register`);
}

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={action === "login" ? "ghost" : "default"}>
          {action === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] max-w-sm">
        <DialogHeader>
          <DialogTitle>Select your role</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-4">
          <Button
            onClick={() => handleSelect("user")}
            variant="outline"
            aria-label="Register or Login as User"
          >
            I’m a User
          </Button>
          <Button
            onClick={() => handleSelect("agent")}
            variant="outline"
            aria-label="Register or Login as Agent"
          >
            I’m an Agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
