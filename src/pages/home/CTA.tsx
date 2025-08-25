import { motion } from "framer-motion";

export const CTA = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground text-center dark:bg-dark-primary dark:text-dark-primary-foreground">
      <h2 className="text-3xl font-bold mb-6">
        Ready to get started?
      </h2>
      <p className="text-xl mb-8">
        Join thousands of customers who trust our platform.
      </p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-primary py-3 px-8 rounded-lg text-lg dark:bg-dark-button dark:text-dark-button-text"
      >
        Start Your Free Trial
      </motion.button>
    </section>
  );
};
