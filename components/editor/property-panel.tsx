"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Slider 
} from '@/components/ui/slider';
import { ChevronRight, AlignLeft, AlignCenter, AlignRight, AlignJustify, Type as TypeIcon, Palette, Ruler as Rulers, Layers, X } from 'lucide-react';

export default function SiteEditorPropertyPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [fontSize, setFontSize] = useState([16]);
  const [lineHeight, setLineHeight] = useState([1.5]);
  const [padding, setPadding] = useState([16]);

  return (
    <div 
      className={`border-l bg-background transform transition-all duration-200 ${
        isOpen ? 'w-80' : 'w-10'
      }`}
    >
      {isOpen ? (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">Properties</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Tabs defaultValue="style" className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-4 h-11 rounded-none border-b">
              <TabsTrigger value="style" className="rounded-none data-[state=active]:bg-background">
                <Palette className="h-4 w-4" />
                <span className="sr-only">Style</span>
              </TabsTrigger>
              <TabsTrigger value="typography" className="rounded-none data-[state=active]:bg-background">
                <TypeIcon className="h-4 w-4" />
                <span className="sr-only">Typography</span>
              </TabsTrigger>
              <TabsTrigger value="layout" className="rounded-none data-[state=active]:bg-background">
                <Rulers className="h-4 w-4" />
                <span className="sr-only">Layout</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="rounded-none data-[state=active]:bg-background">
                <Layers className="h-4 w-4" />
                <span className="sr-only">Advanced</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-auto">
              <TabsContent value="style" className="p-4 space-y-4 m-0">
                <div>
                  <Label className="mb-2 block">Background</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex h-10 items-center border rounded-md px-3">
                      <div className="h-4 w-4 rounded-full bg-primary mr-2" />
                      <span className="text-sm">#FFFFFF</span>
                    </div>
                    <Input 
                      type="color" 
                      defaultValue="#FFFFFF"
                      className="h-10 cursor-pointer"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Text Color</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex h-10 items-center border rounded-md px-3">
                      <div className="h-4 w-4 rounded-full bg-foreground mr-2" />
                      <span className="text-sm">#000000</span>
                    </div>
                    <Input 
                      type="color" 
                      defaultValue="#000000"
                      className="h-10 cursor-pointer"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Border</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex h-10 items-center border rounded-md px-3">
                      <span className="text-sm">1px</span>
                    </div>
                    <div className="flex h-10 items-center border rounded-md px-3">
                      <span className="text-sm">Solid</span>
                    </div>
                    <Input 
                      type="color" 
                      defaultValue="#E2E8F0"
                      className="h-10 cursor-pointer"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Border Radius</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex h-10 items-center border rounded-md px-3">
                      <span className="text-sm">8px</span>
                    </div>
                    <div className="flex h-10 items-center border rounded-md px-3">
                      <span className="text-sm">8px</span>
                    </div>
                    <div className="flex h-10 items-center border rounded-md px-3">
                      <span className="text-sm">8px</span>
                    </div>
                    <div className="flex h-10 items-center border rounded-md px-3">
                      <span className="text-sm">8px</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="typography" className="p-4 space-y-4 m-0">
                <div>
                  <Label className="mb-2 block">Font</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="h-10 border rounded-md px-3 flex items-center">
                      <span className="text-sm">Inter</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Font Size: {fontSize}px</Label>
                  <Slider
                    defaultValue={[16]}
                    max={72}
                    min={8}
                    step={1}
                    value={fontSize}
                    onValueChange={setFontSize}
                    className="py-4"
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Line Height: {lineHeight}</Label>
                  <Slider
                    defaultValue={[1.5]}
                    max={3}
                    min={0.5}
                    step={0.1}
                    value={lineHeight}
                    onValueChange={setLineHeight}
                    className="py-4"
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Font Weight</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="h-10">
                      Regular
                    </Button>
                    <Button variant="outline" size="sm" className="h-10">
                      Medium
                    </Button>
                    <Button variant="outline" size="sm" className="h-10">
                      Bold
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Text Alignment</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" size="sm" className="p-2">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2">
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2">
                      <AlignRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2">
                      <AlignJustify className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="layout" className="p-4 space-y-4 m-0">
                <div>
                  <Label className="mb-2 block">Padding: {padding}px</Label>
                  <Slider
                    defaultValue={[16]}
                    max={100}
                    min={0}
                    step={1}
                    value={padding}
                    onValueChange={setPadding}
                    className="py-4"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">Width</Label>
                    <div className="h-10 border rounded-md px-3 flex items-center">
                      <span className="text-sm">100%</span>
                    </div>
                  </div>
                  <div>
                    <Label className="mb-2 block">Height</Label>
                    <div className="h-10 border rounded-md px-3 flex items-center">
                      <span className="text-sm">Auto</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Margin</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="h-10 border rounded-md px-3 flex items-center justify-center">
                      <span className="text-sm">8</span>
                    </div>
                    <div className="h-10 border rounded-md px-3 flex items-center justify-center">
                      <span className="text-sm">8</span>
                    </div>
                    <div className="h-10 border rounded-md px-3 flex items-center justify-center">
                      <span className="text-sm">8</span>
                    </div>
                    <div className="h-10 border rounded-md px-3 flex items-center justify-center">
                      <span className="text-sm">8</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Position</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" size="sm" className="h-10">
                      Static
                    </Button>
                    <Button variant="outline" size="sm" className="h-10">
                      Relative
                    </Button>
                    <Button variant="outline" size="sm" className="h-10">
                      Absolute
                    </Button>
                    <Button variant="outline" size="sm" className="h-10">
                      Fixed
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="p-4 space-y-4 m-0">
                <div>
                  <Label className="mb-2 block">CSS Classes</Label>
                  <Input placeholder="e.g. my-custom-class" />
                </div>
                
                <div>
                  <Label className="mb-2 block">Custom ID</Label>
                  <Input placeholder="e.g. header-section" />
                </div>
                
                <div>
                  <Label className="mb-2 block">Custom CSS</Label>
                  <div className="border rounded-md overflow-hidden">
                    <div className="p-2 bg-muted text-xs font-mono">
                      <pre className="whitespace-pre-wrap">
                        {`.element {
  /* Custom styles */
}`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Animations</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="h-10 border rounded-md px-3 flex items-center">
                      <span className="text-sm">None</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      ) : (
        <Button 
          variant="ghost" 
          className="h-full w-full rounded-none border-0" 
          onClick={() => setIsOpen(true)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}