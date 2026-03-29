import { personas } from "@/app/data/personas";

export default function NotificationPreview() {
  const persona = personas[0];
  const message = persona.messages[0];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl bg-surface border border-border p-4 shadow-2xl shadow-black/40">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-xl">
            {persona.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">
                The Nagging Partner
              </span>
              <span className="text-xs text-text-secondary">now</span>
            </div>
            <p className="text-sm font-medium text-text-primary mt-0.5">
              {persona.name}
            </p>
            <p className="text-sm text-text-secondary mt-1 leading-relaxed">
              {message.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
