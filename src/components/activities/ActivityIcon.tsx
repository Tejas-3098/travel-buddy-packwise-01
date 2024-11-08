import { LucideIcon } from "lucide-react";

interface ActivityIconProps {
  icon: LucideIcon;
}

const ActivityIcon = ({ icon: Icon }: ActivityIconProps) => {
  return <Icon className="h-5 w-5" />;
};

export default ActivityIcon;