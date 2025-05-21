"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Columns, 
  Layout, 
  Heading, 
  Type, 
  Image as ImageIcon, 
  ShoppingCart, 
  Video, 
  ListTree, 
  MapPin, 
  MessageSquare, 
  Search, 
  LayoutGrid 
} from 'lucide-react';

export default function SiteEditorSidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  const componentCategories = [
    {
      name: 'Layout',
      components: [
        { id: 'columns', name: 'Columns', icon: <Columns /> },
        { id: 'container', name: 'Container', icon: <LayoutGrid /> },
      ]
    },
    {
      name: 'Basic',
      components: [
        { id: 'heading', name: 'Heading', icon: <Heading /> },
        { id: 'paragraph', name: 'Text', icon: <Type /> },
        { id: 'image', name: 'Image', icon: <ImageIcon /> },
        { id: 'button', name: 'Button', icon: <Columns /> },
        { id: 'video', name: 'Video', icon: <Video /> },
      ]
    },
    {
      name: 'Commerce',
      components: [
        { id: 'product', name: 'Product', icon: <ShoppingCart /> },
        { id: 'product-list', name: 'Product List', icon: <ListTree /> },
        { id: 'cart', name: 'Cart', icon: <ShoppingCart /> },
      ]
    },
    {
      name: 'Media',
      components: [
        { id: 'gallery', name: 'Gallery', icon: <LayoutGrid /> },
        { id: 'slider', name: 'Slider', icon: <LayoutGrid /> },
        { id: 'map', name: 'Map', icon: <MapPin /> },
      ]
    },
    {
      name: 'Forms',
      components: [
        { id: 'contact-form', name: 'Contact Form', icon: <MessageSquare /> },
        { id: 'newsletter', name: 'Newsletter', icon: <MessageSquare /> },
      ]
    },
  ];

  const filterComponents = (category: any) => {
    if (!searchTerm) return category.components;
    return category.components.filter(comp => 
      comp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="w-64 border-r bg-muted/20 flex flex-col">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search components..."
            className="pl-8 bg-background h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="components" className="flex-1 flex flex-col">
        <TabsList className="h-11 rounded-none border-b bg-muted/30">
          <TabsTrigger value="components" className="rounded-none data-[state=active]:bg-background">
            Components
          </TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1">
          <TabsContent value="components" className="m-0 p-0">
            <div className="p-4 space-y-6">
              {componentCategories.map((category) => {
                const filteredComponents = filterComponents(category);
                if (filteredComponents.length === 0) return null;
                
                return (
                  <div key={category.name}>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      {category.name}
                    </h3>
                    <div className="space-y-2">
                      {filteredComponents.map((component) => (
                        <div 
                          key={component.id} 
                          className="flex items-center p-2 rounded-md border bg-background/80 hover:bg-accent hover:text-accent-foreground cursor-grab transition-colors"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = "move";
                            e.dataTransfer.setData('component/type', component.id);
                          }}
                        >
                          <div className="mr-2 text-muted-foreground">{component.icon}</div>
                          <span className="text-sm">{component.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}