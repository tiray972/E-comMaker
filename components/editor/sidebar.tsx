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
        { id: 'section', name: 'Section', icon: <Layout /> },
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
  
  const sections = [
    { id: 'header', name: 'Header', img: 'https://images.pexels.com/photos/4065400/pexels-photo-4065400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'hero', name: 'Hero', img: 'https://images.pexels.com/photos/6347738/pexels-photo-6347738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'features', name: 'Features', img: 'https://images.pexels.com/photos/6177688/pexels-photo-6177688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'gallery', name: 'Gallery', img: 'https://images.pexels.com/photos/5541019/pexels-photo-5541019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'testimonials', name: 'Testimonials', img: 'https://images.pexels.com/photos/5604511/pexels-photo-5604511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'contact', name: 'Contact', img: 'https://images.pexels.com/photos/4065615/pexels-photo-4065615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'footer', name: 'Footer', img: 'https://images.pexels.com/photos/6508165/pexels-photo-6508165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
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
        <TabsList className="grid grid-cols-2 h-11 rounded-none border-b bg-muted/30">
          <TabsTrigger value="components" className="rounded-none data-[state=active]:bg-background">
            Components
          </TabsTrigger>
          <TabsTrigger value="sections" className="rounded-none data-[state=active]:bg-background">
            Sections
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
          
          <TabsContent value="sections" className="m-0 p-0">
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2">
                {sections.map((section) => (
                  <div 
                    key={section.id}
                    className="group border rounded-md overflow-hidden bg-background hover:border-primary cursor-grab transition-all"
                    draggable
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={section.img} 
                        alt={section.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2 text-xs font-medium">{section.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}