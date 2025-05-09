"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Edit, ExternalLink, MoreVertical, Trash } from 'lucide-react';

interface Site {
  id: string;
  name: string;
  domain: string;
  lastEdited: string;
  published: boolean;
  thumbnail: string;
}

const sites: Site[] = [
  {
    id: '1',
    name: 'Fashion Boutique',
    domain: 'fashion-boutique.example.com',
    lastEdited: '2 days ago',
    published: true,
    thumbnail: 'https://images.pexels.com/photos/6214478/pexels-photo-6214478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Portfolio Site',
    domain: 'creative-portfolio.example.com',
    lastEdited: '1 week ago',
    published: true,
    thumbnail: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    name: 'Restaurant Landing',
    domain: 'not-published-yet.example.com',
    lastEdited: 'Just now',
    published: false,
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default function SitesList() {
  return (
    <div className="space-y-4">
      {sites.map((site) => (
        <div key={site.id} className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
          <div className="sm:w-1/4 w-full">
            <div className="aspect-video rounded-md overflow-hidden">
              <img 
                src={site.thumbnail} 
                alt={site.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium truncate">{site.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{site.domain}</p>
                <div className="flex items-center mt-2 gap-2">
                  <Badge variant={site.published ? "default" : "outline"}>
                    {site.published ? "Published" : "Draft"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Edited {site.lastEdited}
                  </span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" asChild>
                <Link href={`/editor/${site.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Site
                </Link>
              </Button>
              {site.published ? (
                <Button size="sm" variant="outline" asChild>
                  <Link href={`https://${site.domain}`} target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live
                  </Link>
                </Button>
              ) : (
                <Button size="sm" variant="outline">
                  Publish Site
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}