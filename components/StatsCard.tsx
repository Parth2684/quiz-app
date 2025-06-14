"use client"
import { LucideIcon, TrendingUp } from "lucide-react";
import { Card } from "./Card";

interface StatsCardProps {
    icon: LucideIcon;
    label: string
    value: string | number;
    trend?: number;
    color: string
}



export const StatsCard = ({ icon: Icon, label, value, trend, color }: StatsCardProps) => (
    <Card className="p-4 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {trend && (
            <p className={`text-sm flex items-center gap-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              <TrendingUp className="w-3 h-3" />
              {trend > 0 ? '+' : ''}{trend}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );