

export const Features = () => {
  const featureList = [
    { title: "Fast", description: "Instant transactions and transfers." },
    { title: "Secure", description: "Top-notch encryption to keep your data safe." },
    { title: "Low Fees", description: "Minimal transaction costs with full transparency." },
  ];

  return (
    <section className="py-20 bg-border text-center mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold mb-10 text-foreground"> Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 m-10">
        {featureList.map((feature, index) => (
          <div
            key={index}
            className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          >
            <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
