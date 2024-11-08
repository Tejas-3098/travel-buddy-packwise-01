import { Label } from "@/components/ui/label";
import ActivityIcon from "./ActivityIcon";
import { Activity } from "@/types/types";

interface ActivityListProps {
  activities: typeof ACTIVITIES;
  selectedActivities: string[];
  onActivityToggle: (activityId: string) => void;
}

const ActivityList = ({ activities, selectedActivities, onActivityToggle }: ActivityListProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-lg">Available Activities</Label>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`p-4 border rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
              selectedActivities.includes(activity.id)
                ? "border-primary bg-primary/5 shadow-md"
                : "border-gray-200 hover:border-primary/50"
            }`}
            onClick={() => onActivityToggle(activity.id)}
          >
            <div className="flex items-center gap-3 mb-3">
              <ActivityIcon icon={activity.icon} />
              <h3 className="font-semibold">{activity.name}</h3>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              {activity.items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.weight} {item.unit}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;