interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
}

export default function ServiceCard({
  number,
  title,
  description,
}: ServiceCardProps) {
  return (
    <article className="service-card group relative flex gap-4 sm:gap-5 md:gap-6 p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl bg-white/70 dark:!bg-surface-dark-elevated border border-border-beige/80 dark:!border-primary/20 hover:bg-white dark:hover:border-primary/30 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 dark:hover:shadow-accent/10 transition-all duration-500 min-w-0">
      <div className="service-card-line w-1 shrink-0 self-stretch rounded-full bg-accent/20 dark:bg-primary-bright/25 group-hover:bg-accent dark:group-hover:bg-accent-light transition-colors duration-300 dark:group-hover:shadow-[0_0_10px_rgba(155,133,247,0.35)]" />

      <div className="flex-1 min-w-0 overflow-hidden">
        <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal/30 dark:!text-primary-bright tabular-nums">
          {number}
        </span>
        <h4 className="mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-bold text-charcoal dark:!text-primary-bright tracking-tight">
          {title}
        </h4>
        <p className="mt-3 sm:mt-4 text-muted-beige dark:!text-primary-bright text-base sm:text-lg md:text-xl leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
}
