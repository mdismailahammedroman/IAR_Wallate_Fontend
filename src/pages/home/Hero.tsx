import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import WalletImg1 from "../../assets/hero/1.png"
import WalletImg2 from "@/assets/hero/2.jpeg"
import WalletImg3 from "@/assets/hero/3.png"
import { Link } from "react-router"

const walletImages = [WalletImg1, WalletImg2, WalletImg3]

export default function Hero() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-gray-900 dark:to-black text-white dark:text-gray-200 py-24 px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {loading ? (
            <>
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-full max-w-lg mb-6" />
              <div className="flex flex-col md:flex-row gap-4">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-40" />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Secure. Smart. <br /> Your Digital Wallet.
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                Send, receive, and manage your finances with ease. WalletPro is built for security and simplicity.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Link to="/features">
                  <Button className="text-base px-6 py-3">Explore Features</Button>
                </Link>
                <Link to="/pricing">
                  <Button
                    variant="outline"
                    className="text-base px-6 py-3 border-white text-foreground hover:bg-white hover:text-indigo-700"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </>
          )}
        </motion.div>

        {/* Right Images */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative grid grid-cols-2 gap-4 max-w-md mx-auto"
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-full rounded-lg" />
              ))
            : walletImages.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt={`Wallet preview ${i + 1}`}
                  className="rounded-lg shadow-md w-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 120 }}
                />
              ))}
        </motion.div>
      </div>
    </section>
  )
}
