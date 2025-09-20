import { motion } from "framer-motion"

export const Stats = () => {
  return (
    <section className="py-20 bg-background dark:bg-muted-foreground text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Our Impact</h2>
      <div className="lg:flex justify-around grid-cols-1 gap-3">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-2xl font-bold mt-4"
        >
          <p className="text-5xl text-indigo-600">1000+</p>
          <p>Happy Clients</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-2xl font-bold  mt-4"
        >
          <p className="text-5xl text-indigo-600">5</p>
          <p>Years of Service</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-2xl font-bold  mt-4"
        >
          <p className="text-5xl text-indigo-600">99%</p>
          <p>Customer Satisfaction</p>
        </motion.div>
      </div>
    </section>
  );
};
