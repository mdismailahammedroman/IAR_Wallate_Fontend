import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"

type FormData = {
  name: string
  email: string
  bio: string
}

export const EditUserProfile = () => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
    },
  })

  const onSubmit = (data: FormData) => {
    console.log("Profile updated:", data)
    // You can hook into mutation here (e.g., Redux, tRPC, etc.)
    reset()
  }

  return (
    <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md
      before:content-[''] before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl
      after:content-[''] after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Update Your Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">
            Full Name
          </Label>
          <Input
            {...register("name")}
            id="name"
            type="text"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            Email Address
          </Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-gray-300">
            Bio
          </Label>
          <Textarea
            {...register("bio")}
            id="bio"
            rows={3}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white hover:opacity-90 font-bold"
          >
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  )
}
