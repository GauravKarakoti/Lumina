import { Card } from "@/components/ui/card";
import team from "@/assets/Team.jpg";

export default function Team() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Removed p-12, added p-0 and overflow-hidden to make image fill the card */}
        <Card className="cosmic-card p-0 overflow-hidden max-w-3xl mx-auto cosmic-glow border-border/50">
          <figure className="w-full relative">
            {/* Removed inner rounding/shadow since the Card now acts as the frame */}
            <div className="relative w-full">
              <img
                src={team}
                alt="Our team"
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover object-center block"
              />
            </div>
          </figure>
        </Card>
      </div>
    </section>
  );
}