"use client";

import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle } from 'lucide-react';

export default function SiteEditorCanvas() {
  const dropIndicatorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dropPosition, setDropPosition] = useState<{ x: number; y: number } | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const dropIndicator = dropIndicatorRef.current;
    
    if (!canvas || !dropIndicator) return;
    
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      
      if (dropIndicator) {
        dropIndicator.style.display = 'block';
        
        // Calculate the position of the drop indicator
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setDropPosition({ x, y });
      }
    };
    
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      if (dropIndicator) {
        dropIndicator.style.display = 'none';
      }
    };
    
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (dropIndicator) {
        dropIndicator.style.display = 'none';
      }
      // Handle the actual drop logic here
    };
    
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('dragleave', handleDragLeave);
    canvas.addEventListener('drop', handleDrop);
    
    return () => {
      canvas.removeEventListener('dragover', handleDragOver);
      canvas.removeEventListener('dragleave', handleDragLeave);
      canvas.removeEventListener('drop', handleDrop);
    };
  }, []);
  
  useEffect(() => {
    const dropIndicator = dropIndicatorRef.current;
    
    if (dropIndicator && dropPosition) {
      dropIndicator.style.left = `${dropPosition.x}px`;
      dropIndicator.style.top = `${dropPosition.y}px`;
    }
  }, [dropPosition]);

  return (
    <div className="flex-1 relative">
      <ScrollArea className="h-[calc(100vh-3.5rem)] w-full">
        <div
          ref={canvasRef}
          className="bg-muted/30 min-h-[calc(100vh-3.5rem)] relative flex flex-col"
        >
          {/* Example empty canvas state */}
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="text-center max-w-md mx-auto p-8 rounded-lg border-2 border-dashed border-muted-foreground/20">
              <PlusCircle className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Add components to your page</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Drag and drop components from the sidebar to start building your page.
              </p>
              <div className="text-xs text-muted-foreground">
                Tip: You can also drag sections for pre-designed layouts
              </div>
            </div>
          </div>
          
          {/* Drop indicator that appears when dragging */}
          <div
            ref={dropIndicatorRef}
            className="absolute w-full h-2 bg-primary/50 rounded hidden transform -translate-y-1/2 pointer-events-none z-10"
            style={{ display: 'none' }}
          />
        </div>
      </ScrollArea>
    </div>
  );
}