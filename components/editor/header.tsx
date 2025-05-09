"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LampDesk as Desktop, Tablet, Smartphone, Eye, Save, Undo, Redo, ChevronLeft, Settings, ChevronDown, Layers } from 'lucide-react';

interface SiteEditorHeaderProps {
  siteId: string;
}

export default function SiteEditorHeader({ siteId }: SiteEditorHeaderProps) {
  const [viewMode, setViewMode] = useState('desktop');
  const [saved, setSaved] = useState(true);

  const handleSave = () => {
    setSaved(true);
    // Mock save action
    setTimeout(() => {
      console.log('Site saved');
    }, 1000);
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back to Dashboard</span>
            </Link>
          </Button>
          
          <div className="hidden md:flex items-center">
            <span className="mx-2 text-muted-foreground">/</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  <span className="truncate max-w-[150px]">Restaurant Landing</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Fashion Boutique</DropdownMenuItem>
                <DropdownMenuItem>Portfolio Site</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Create New Site</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="mx-2 text-muted-foreground">/</span>
            <Button variant="ghost" className="gap-1">
              <Layers className="h-4 w-4" />
              <span className="truncate max-w-[100px]">Home Page</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center border rounded-md">
            <Button
              variant={viewMode === 'desktop' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 px-2.5"
              onClick={() => setViewMode('desktop')}
            >
              <Desktop className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-2">Desktop</span>
            </Button>
            <Button
              variant={viewMode === 'tablet' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 px-2.5"
              onClick={() => setViewMode('tablet')}
            >
              <Tablet className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-2">Tablet</span>
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 px-2.5"
              onClick={() => setViewMode('mobile')}
            >
              <Smartphone className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-2">Mobile</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Undo className="h-4 w-4" />
              <span className="sr-only">Undo</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Redo className="h-4 w-4" />
              <span className="sr-only">Redo</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-1"
              onClick={handleSave}
            >
              <Save className="h-4 w-4" />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </Button>
            
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Eye className="h-4 w-4" />
              <span className="hidden md:inline">Preview</span>
            </Button>
            
            <Button size="sm" className="h-8">
              Publish
            </Button>
            
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}