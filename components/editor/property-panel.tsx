"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CanvasElement } from './canvas';

interface PropertyPanelProps {
  selected: CanvasElement | null;
  onChange: (newProps: any) => void;
}

export default function SiteEditorPropertyPanel({ selected, onChange }: PropertyPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen)
    return (
      <Button
        variant="ghost"
        className="h-full w-full rounded-none border-0"
        onClick={() => setIsOpen(true)}
      >
        &gt;
      </Button>
    );

  return (
    <div className="border-l bg-background w-80 transition-all duration-200">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-medium">Properties</h3>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
          ×
        </Button>
      </div>

      {/* Heading */}
      {selected && selected.type === 'heading' && (
        <div className="p-4 space-y-4">
          <Label>Text</Label>
          <Input
            value={selected.props.text}
            onChange={e => onChange({ props: { ...selected.props, text: e.target.value } })}
          />
          <Label>Color</Label>
          <Input
            type="color"
            value={selected.props.color}
            onChange={e => onChange({ props: { ...selected.props, color: e.target.value } })}
          />
          <Label>Font Size</Label>
          <Input
            type="number"
            value={selected.props.fontSize}
            min={8}
            max={72}
            onChange={e => onChange({ props: { ...selected.props, fontSize: Number(e.target.value) } })}
          />
          <Label>Align</Label>
          <select
            value={selected.props.align}
            onChange={e => onChange({ props: { ...selected.props, align: e.target.value } })}
            className="w-full border rounded p-2"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
          <Label>Font Weight</Label>
          <select
            value={selected.props.fontWeight}
            onChange={e => onChange({ props: { ...selected.props, fontWeight: e.target.value } })}
            className="w-full border rounded p-2"
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="lighter">Light</option>
          </select>
          <Label>Background</Label>
          <Input
            type="color"
            value={selected.props.background}
            onChange={e => onChange({ props: { ...selected.props, background: e.target.value } })}
          />
          <Label>Padding</Label>
          <Input
            type="number"
            value={selected.props.padding}
            min={0}
            max={100}
            onChange={e => onChange({ props: { ...selected.props, padding: Number(e.target.value) } })}
          />
        </div>
      )}

      {/* Paragraph */}
      {selected && selected.type === 'paragraph' && (
        <div className="p-4 space-y-4">
          <Label>Text</Label>
          <Input
            value={selected.props.text}
            onChange={e => onChange({ props: { ...selected.props, text: e.target.value } })}
          />
          <Label>Color</Label>
          <Input
            type="color"
            value={selected.props.color}
            onChange={e => onChange({ props: { ...selected.props, color: e.target.value } })}
          />
          <Label>Font Size</Label>
          <Input
            type="number"
            value={selected.props.fontSize}
            min={8}
            max={72}
            onChange={e => onChange({ props: { ...selected.props, fontSize: Number(e.target.value) } })}
          />
          <Label>Align</Label>
          <select
            value={selected.props.align}
            onChange={e => onChange({ props: { ...selected.props, align: e.target.value } })}
            className="w-full border rounded p-2"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
          <Label>Background</Label>
          <Input
            type="color"
            value={selected.props.background}
            onChange={e => onChange({ props: { ...selected.props, background: e.target.value } })}
          />
          <Label>Padding</Label>
          <Input
            type="number"
            value={selected.props.padding}
            min={0}
            max={100}
            onChange={e => onChange({ props: { ...selected.props, padding: Number(e.target.value) } })}
          />
        </div>
      )}

      {/* Image */}
      {selected && selected.type === 'image' && (
        <div className="p-4 space-y-4">
          <Label>Image URL</Label>
          <Input
            value={selected.props.src}
            onChange={e => onChange({ props: { ...selected.props, src: e.target.value } })}
          />
          <Label>Alt Text</Label>
          <Input
            value={selected.props.alt}
            onChange={e => onChange({ props: { ...selected.props, alt: e.target.value } })}
          />
          <Label>Border Radius</Label>
          <Input
            type="number"
            value={selected.props.borderRadius}
            min={0}
            max={100}
            onChange={e => onChange({ props: { ...selected.props, borderRadius: Number(e.target.value) } })}
          />
        </div>
      )}

      {/* Button */}
      {selected && selected.type === 'button' && (
        <div className="p-4 space-y-4">
          <Label>Text</Label>
          <Input
            value={selected.props.text}
            onChange={e => onChange({ props: { ...selected.props, text: e.target.value } })}
          />
          <Label>Text Color</Label>
          <Input
            type="color"
            value={selected.props.color}
            onChange={e => onChange({ props: { ...selected.props, color: e.target.value } })}
          />
          <Label>Background</Label>
          <Input
            type="color"
            value={selected.props.background}
            onChange={e => onChange({ props: { ...selected.props, background: e.target.value } })}
          />
          <Label>Font Size</Label>
          <Input
            type="number"
            value={selected.props.fontSize}
            min={8}
            max={72}
            onChange={e => onChange({ props: { ...selected.props, fontSize: Number(e.target.value) } })}
          />
          <Label>Border Radius</Label>
          <Input
            type="number"
            value={selected.props.borderRadius}
            min={0}
            max={100}
            onChange={e => onChange({ props: { ...selected.props, borderRadius: Number(e.target.value) } })}
          />
          <Label>Padding</Label>
          <Input
            type="number"
            value={selected.props.padding}
            min={0}
            max={100}
            onChange={e => onChange({ props: { ...selected.props, padding: Number(e.target.value) } })}
          />
        </div>
      )}

      {/* Video */}
      {selected && selected.type === 'video' && (
        <div className="p-4 space-y-4">
          <Label>YouTube URL</Label>
          <Input
            value={selected.props.url || ""}
            onChange={e => onChange({ props: { ...selected.props, url: e.target.value } })}
            placeholder="https://youtube.com/..."
          />
          <Label>Width</Label>
          <Input
            type="number"
            value={selected.props.width || 560}
            min={100}
            max={2000}
            onChange={e => onChange({ props: { ...selected.props, width: Number(e.target.value) } })}
          />
          <Label>Height</Label>
          <Input
            type="number"
            value={selected.props.height || 315}
            min={50}
            max={1200}
            onChange={e => onChange({ props: { ...selected.props, height: Number(e.target.value) } })}
          />
          <Label>Align</Label>
          <select
            value={selected.props.align || "center"}
            onChange={e => onChange({ props: { ...selected.props, align: e.target.value } })}
            className="w-full border rounded p-2"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
          {selected.props.url && (
            <div className="aspect-video w-full mt-2">
              <iframe
                className="w-full h-full rounded"
                src={
                  selected.props.url.includes("youtube.com") || selected.props.url.includes("youtu.be")
                    ? `https://www.youtube.com/embed/${selected.props.url.split("v=")[1]?.split("&")[0] || selected.props.url.split("/").pop()}`
                    : selected.props.url
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      )}

      {/* Columns */}
      {selected && selected.type === 'columns' && (
        <div className="p-4 space-y-4">
          <Label>Columns</Label>
          {selected.props.columns.map((col: string, i: number) => (
            <Input
              key={i}
              value={col}
              onChange={e => {
                const newCols = [...selected.props.columns];
                newCols[i] = e.target.value;
                onChange({ props: { ...selected.props, columns: newCols } });
              }}
              className="mb-2"
            />
          ))}
          <Button
            onClick={() =>
              onChange({ props: { ...selected.props, columns: [...selected.props.columns, `Column ${selected.props.columns.length + 1}`] } })
            }
            size="sm"
          >
            Add Column
          </Button>
          {selected.props.columns.length > 1 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                onChange({ props: { ...selected.props, columns: selected.props.columns.slice(0, -1) } })
              }
            >
              Remove Last Column
            </Button>
          )}
        </div>
      )}

      {/* Map */}
      {selected && selected.type === 'map' && (
        <div className="p-4 space-y-4">
          <Label>Map URL</Label>
          <Input
            value={selected.props.src || ""}
            onChange={e => onChange({ props: { ...selected.props, src: e.target.value } })}
            placeholder="https://www.openstreetmap.org/..."
          />
          <Label>Width</Label>
          <Input
            type="number"
            value={selected.props.width || 400}
            min={100}
            max={2000}
            onChange={e => onChange({ props: { ...selected.props, width: Number(e.target.value) } })}
          />
          <Label>Height</Label>
          <Input
            type="number"
            value={selected.props.height || 200}
            min={50}
            max={2000}
            onChange={e => onChange({ props: { ...selected.props, height: Number(e.target.value) } })}
          />
        </div>
      )}

      {/* Product */}
      {selected && selected.type === 'product' && (
        <div className="p-4 space-y-4">
          <Label>Product Name</Label>
          <Input
            value={selected.props.name || ""}
            onChange={e => onChange({ props: { ...selected.props, name: e.target.value } })}
          />
          <Label>Image URL</Label>
          <Input
            value={selected.props.img || ""}
            onChange={e => onChange({ props: { ...selected.props, img: e.target.value } })}
          />
          <Label>Price</Label>
          <Input
            type="number"
            value={selected.props.price || 0}
            min={0}
            onChange={e => onChange({ props: { ...selected.props, price: Number(e.target.value) } })}
          />
        </div>
      )}

      {/* Product List */}
      {selected && selected.type === 'product-list' && (
        <div className="p-4 space-y-4">
          <Label>Products (comma separated)</Label>
          <Input
            value={selected.props.products?.join(", ") || ""}
            onChange={e =>
              onChange({
                props: {
                  ...selected.props,
                  products: e.target.value.split(",").map((p: string) => p.trim()).filter(Boolean),
                },
              })
            }
            placeholder="Product 1, Product 2"
          />
        </div>
      )}

      {/* Cart */}
      {selected && selected.type === 'cart' && (
        <div className="p-4 space-y-4">
          <Label>Cart Title</Label>
          <Input
            value={selected.props.title || "Cart"}
            onChange={e => onChange({ props: { ...selected.props, title: e.target.value } })}
          />
          <Label>Empty Text</Label>
          <Input
            value={selected.props.emptyText || "0 items"}
            onChange={e => onChange({ props: { ...selected.props, emptyText: e.target.value } })}
          />
        </div>
      )}

      {/* Gallery */}
      {selected && selected.type === 'gallery' && (
        <div className="p-4 space-y-4">
          <Label>Gallery Images</Label>
          {(selected.props.images || []).map((img: { url: string, width: number, height: number }, i: number) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <Input
                className="flex-1"
                placeholder="Image URL"
                value={img.url}
                onChange={e => {
                  const images = [...selected.props.images];
                  images[i].url = e.target.value;
                  onChange({ props: { ...selected.props, images } });
                }}
              />
              <Input
                type="number"
                className="w-20"
                placeholder="Width"
                value={img.width || 100}
                min={10}
                onChange={e => {
                  const images = [...selected.props.images];
                  images[i].width = Number(e.target.value);
                  onChange({ props: { ...selected.props, images } });
                }}
              />
              <span>x</span>
              <Input
                type="number"
                className="w-20"
                placeholder="Height"
                value={img.height || 100}
                min={10}
                onChange={e => {
                  const images = [...selected.props.images];
                  images[i].height = Number(e.target.value);
                  onChange({ props: { ...selected.props, images } });
                }}
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  const images = [...selected.props.images];
                  images.splice(i, 1);
                  onChange({ props: { ...selected.props, images } });
                }}
              >×</Button>
            </div>
          ))}
          <Button
            size="sm"
            onClick={() => {
              const images = [...(selected.props.images || [])];
              images.push({ url: "", width: 100, height: 100 });
              onChange({ props: { ...selected.props, images } });
            }}
          >Add Image</Button>
        </div>
      )}

      {/* Slider */}
      {selected && selected.type === 'slider' && (
        <div className="p-4 space-y-4">
          <Label>Slides (comma separated text)</Label>
          <Input
            value={selected.props.slides?.join(", ") || ""}
            onChange={e =>
              onChange({
                props: {
                  ...selected.props,
                  slides: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean),
                },
              })
            }
            placeholder="Slide 1, Slide 2"
          />
        </div>
      )}

      {/* Contact Form */}
      {selected && selected.type === 'contact-form' && (
        <div className="p-4 space-y-4">
          <Label>Recipient Email</Label>
          <Input
            value={selected.props.recipient || ""}
            onChange={e => onChange({ props: { ...selected.props, recipient: e.target.value } })}
            placeholder="contact@example.com"
          />
          <Label>Button Text</Label>
          <Input
            value={selected.props.buttonText || "Send"}
            onChange={e => onChange({ props: { ...selected.props, buttonText: e.target.value } })}
          />
        </div>
      )}

      {/* Newsletter */}
      {selected && selected.type === 'newsletter' && (
        <div className="p-4 space-y-4">
          <Label>Placeholder</Label>
          <Input
            value={selected.props.placeholder || "Your email"}
            onChange={e => onChange({ props: { ...selected.props, placeholder: e.target.value } })}
          />
          <Label>Button Text</Label>
          <Input
            value={selected.props.buttonText || "Subscribe"}
            onChange={e => onChange({ props: { ...selected.props, buttonText: e.target.value } })}
          />
        </div>
      )}
    </div>
  );
}