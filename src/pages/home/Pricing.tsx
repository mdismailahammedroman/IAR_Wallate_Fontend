import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const plans = [
  {
    title: "send money",
    price: "$5",
    features: [
      "1 Wallet",
      "Send & Receive Payments",
      "Basic History",
    ],
    cta: "Per taransaction",
    popular: false,
  },
  {
    title: "Tranfer money",
    price: "$10",
    features: [
      "wallet to bank",
      "Priority Support",
      "Advanced Analytics",
    ],
    cta: "Tranfer money",
    popular: true,
  },
  {
    title: "CASH OUT",
    price: "$20",
    features: [
      "Unlimited Wallets",
      "Team Management",
      "Dedicated Support",
    ],
    cta: "CASH OUT",
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Pricing Plans</h1>
        <p className="text-muted-foreground mt-2">
          Choose a plan that fits your financial goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <Card
            key={i}
            className={`relative transform rounded-xl border transition-all duration-300 ease-in-out hover:shadow-lg motion-safe:hover:scale-105 ${
              plan.popular ? "border-indigo-600 shadow-md" : ""
            }`}
          >
            {plan.popular && (
              <Badge className="absolute top-4 right-4" variant="default">
                Most Popular
              </Badge>
            )}

            <CardHeader className="text-center">
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription className="text-3xl font-bold mt-2">
                {plan.price}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button className="w-full">{plan.cta}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
