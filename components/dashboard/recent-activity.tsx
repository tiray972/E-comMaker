import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  target: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: '1',
    user: {
      name: 'You',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      initials: 'JD',
    },
    action: 'edited',
    target: 'Restaurant Landing page',
    timestamp: '10 minutes ago',
  },
  {
    id: '2',
    user: {
      name: 'You',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      initials: 'JD',
    },
    action: 'created',
    target: 'Restaurant Landing',
    timestamp: '1 hour ago',
  },
  {
    id: '3',
    user: {
      name: 'You',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      initials: 'JD',
    },
    action: 'published',
    target: 'Portfolio Site',
    timestamp: '2 days ago',
  },
  {
    id: '4',
    user: {
      name: 'You',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      initials: 'JD',
    },
    action: 'updated',
    target: 'Fashion Boutique theme',
    timestamp: '3 days ago',
  },
  {
    id: '5',
    user: {
      name: 'You',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      initials: 'JD',
    },
    action: 'published',
    target: 'Fashion Boutique',
    timestamp: '1 week ago',
  },
];

export default function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span>{' '}
              <span className="text-muted-foreground">{activity.action}</span>{' '}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}