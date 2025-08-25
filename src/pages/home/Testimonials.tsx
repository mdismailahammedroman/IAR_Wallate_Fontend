import { motion } from "framer-motion";

export const Testimonials = () => {
  const testimonials = [
    { name: "John Doe", feedback: "This product changed the way I work. Highly recommended!" },
    { name: "Jane Smith", feedback: "I can't imagine going back to the old way. Simply amazing." },
    { name: "Sara Lee", feedback: "The best decision we made for our company!" },
  ];

  return (
    <section className="py-20 bg-background dark:bg-muted-foreground text-center">
      <h2 className="text-3xl font-bold mb-10 text-foreground dark:text-dark-foreground">
        What Our Clients Say
      </h2>
      <div className="flex justify-center gap-10">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-card p-6 rounded-lg shadow-lg w-72 dark:bg-card-dark"
          >
            <p className="text-xl italic text-muted-foreground dark:text-dark-muted-foreground">
              "{testimonial.feedback}"
            </p>
            <p className="mt-4 font-semibold text-foreground dark:text-dark-foreground">
              {testimonial.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
