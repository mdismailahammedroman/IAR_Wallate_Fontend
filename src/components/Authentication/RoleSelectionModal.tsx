import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Role = "user" | "agent";
type Action = "login" | "register";

interface RoleSelectionModalProps {
  action: Action;
}

function RoleSelectionModal({ action }: RoleSelectionModalProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (role: Role) => {
    setOpen(false);

    // Custom route handling based on role and action
    if (role === "agent") {
      const path = action === "register" ? "/agent/agent-register" : "/agent/login";
      navigate(path);
    } else {
      // For users
      navigate(`/user/${action}`);
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
            aria-label={`Continue as User to ${action}`}
          >
            I’m a User
          </Button>
          <Button
            onClick={() => handleSelect("agent")}
            variant="outline"
            aria-label={`Continue as Agent to ${action}`}
          >
            I’m an Agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RoleSelectionModal;
