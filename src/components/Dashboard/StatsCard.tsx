import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  description,
}: StatsCardProps) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>

            <h2 className="text-3xl font-bold mt-2">{value}</h2>
          </div>

          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <Icon size={24} />
          </div>
        </div>

        {description && (
          <p className="text-xs text-muted-foreground mt-4">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;