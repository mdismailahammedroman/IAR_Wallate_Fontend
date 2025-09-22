import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

export const UserProfile = () => {
//   const { data: profile, isLoading, error, refetch } = useGetProfileQuery()
//   const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  // Populate form once profile loads
 

  const onSubmit = () => {
   
  }

//   if (isLoading) return <div className="text-center py-10">Loading profile...</div>
//   if (error) return <div className="text-center py-10 text-red-500">Failed to load profile</div>

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex flex-col items-center space-y-4 mb-6">
        {/* <Avatar src={profile?.avatarUrl} alt={profile?.name} size="lg" />
        <p className="text-xl font-semibold">{profile?.name}</p>
        <p className="text-gray-500 dark:text-gray-400">{profile?.email}</p> */}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" 
        // disabled={isUpdating}
         className="w-full">
          {/* {isUpdating ? 'Saving...' : 'Save Changes'} */}
        </Button>
      </form>
    </div>
  )
}
