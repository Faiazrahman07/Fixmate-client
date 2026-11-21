import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
}

const StatsCard = ({ title, value, icon: Icon, description }: StatsCardProps) => {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-base-content/60">{title}</p>
            <h2 className="text-3xl font-bold mt-2">{value}</h2>
          </div>

          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <Icon size={24} />
          </div>
        </div>

        {description && (
          <p className="text-xs text-base-content/50 mt-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;