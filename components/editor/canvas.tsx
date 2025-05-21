"use client";

import { useState, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Youtube, Trash2 } from 'lucide-react';
import SiteEditorPropertyPanel from '@/components/editor/property-panel';

const DEFAULT_PROPS: Record<string, any> = {
  heading: { text: 'Heading', color: '#000000', fontSize: 32, align: 'left', fontWeight: 'bold', background: '#FFFFFF', padding: 16 },
  paragraph: { text: 'This is a paragraph.', color: '#222222', fontSize: 16, align: 'left', background: '#FFFFFF', padding: 8 },
  image: { src: 'https://placehold.co/400x200', alt: 'Image', borderRadius: 8 },
  button: { text: 'Button', color: '#ffffff', background: '#2563eb', fontSize: 16, borderRadius: 8, padding: 12 },
  video: { url: "" },
  columns: { columns: ['Column 1', 'Column 2'] },
  container: { children: [] },
  product: {},
  'product-list': {},
  cart: {},
  gallery: {},
  slider: {},
  map: {},
  'contact-form': {},
  newsletter: {},
};

export type CanvasElement = { type: string; props: any };

export default function SiteEditorCanvas() {
  const [components, setComponents] = useState<CanvasElement[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedChild, setSelectedChild] = useState<{ parentIdx: number, childIdx: number } | null>(null);
  const dragItem = useRef<number | null>(null);
  const childDragItems = useRef<Record<number, number | null>>({});

  // Drag depuis la sidebar
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('component/type');
    if (componentType && DEFAULT_PROPS[componentType]) {
      setComponents(prev => [
        ...prev,
        { type: componentType, props: { ...DEFAULT_PROPS[componentType] } }
      ]);
    }
  };

  // Drag & drop interne (réorganisation)
  const handleDragStart = (idx: number) => {
    dragItem.current = idx;
  };
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragItem.current === null || dragItem.current === idx) return;
    setComponents(prev => {
      const newArr = [...prev];
      const [removed] = newArr.splice(dragItem.current!, 1);
      newArr.splice(idx, 0, removed);
      dragItem.current = idx;
      return newArr;
    });
  };
  const handleDragEnd = () => {
    dragItem.current = null;
  };

  const handleUpdateSelected = (newProps: any) => {
    if (selectedIndex === null) return;
    setComponents((prev) =>
      prev.map((el, idx) =>
        idx === selectedIndex ? { ...el, props: { ...el.props, ...newProps.props } } : el
      )
    );
  };

  const handleDelete = (idx: number) => {
    setComponents(prev => prev.filter((_, i) => i !== idx));
    if (selectedIndex === idx) setSelectedIndex(null);
  };

  function renderComponent(el: CanvasElement) {
    if (el.type === 'heading') {
      return (
        <h2
          className="my-4"
          style={{
            color: el.props.color,
            fontSize: el.props.fontSize,
            textAlign: el.props.align,
            fontWeight: el.props.fontWeight,
            background: el.props.background,
            padding: el.props.padding,
          }}
        >
          {el.props.text}
        </h2>
      );
    }
    if (el.type === 'paragraph') {
      return (
        <p
          className="my-2"
          style={{
            color: el.props.color,
            fontSize: el.props.fontSize,
            textAlign: el.props.align,
            background: el.props.background,
            padding: el.props.padding,
          }}
        >
          {el.props.text}
        </p>
      );
    }
    if (el.type === 'image') {
      return (
        <img
          src={el.props.src}
          alt={el.props.alt}
          className="my-2"
          style={{ borderRadius: el.props.borderRadius }}
        />
      );
    }
    if (el.type === 'button') {
      return (
        <button
          className="my-2"
          style={{
            color: el.props.color,
            background: el.props.background,
            fontSize: el.props.fontSize,
            borderRadius: el.props.borderRadius,
            padding: el.props.padding,
          }}
        >
          {el.props.text}
        </button>
      );
    }
    if (el.type === 'columns') {
      return (
        <div className="grid grid-cols-2 gap-4 my-2">
          {el.props.columns?.map((col: string, i: number) => (
            <div key={i} className="bg-gray-200 p-4 rounded">{col}</div>
          ))}
        </div>
      );
    }
    if (el.type === 'container') {
      const parentIdx = components.findIndex(c => c === el);
      if (childDragItems.current[parentIdx] === undefined) {
        childDragItems.current[parentIdx] = null;
      }

      const handleContainerDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Fix duplication
        const componentType = e.dataTransfer.getData('component/type');
        if (componentType && DEFAULT_PROPS[componentType]) {
          const updated = [...el.props.children, { type: componentType, props: { ...DEFAULT_PROPS[componentType] } }];
          setComponents(prev =>
            prev.map((c, i) =>
              i === parentIdx ? { ...c, props: { ...c.props, children: updated } } : c
            )
          );
        }
      };

      const handleChildDragStart = (childIdx: number) => {
        childDragItems.current[parentIdx] = childIdx;
      };
      const handleChildDragOver = (e: React.DragEvent, childIdx: number) => {
        e.preventDefault();
        if (
          childDragItems.current[parentIdx] === null ||
          childDragItems.current[parentIdx] === childIdx
        )
          return;
        const updated = [...el.props.children];
        const [removed] = updated.splice(childDragItems.current[parentIdx]!, 1);
        updated.splice(childIdx, 0, removed);
        childDragItems.current[parentIdx] = childIdx;
        setComponents(prev =>
          prev.map((c, i) =>
            i === parentIdx ? { ...c, props: { ...c.props, children: updated } } : c
          )
        );
      };
      const handleChildDragEnd = () => {
        childDragItems.current[parentIdx] = null;
      };
      const handleChildDelete = (childIdx: number) => {
        const updated = el.props.children.filter((_: any, i: number) => i !== childIdx);
        setComponents(prev =>
          prev.map((c, i) =>
            i === parentIdx ? { ...c, props: { ...c.props, children: updated } } : c
          )
        );
        if (selectedChild && selectedChild.parentIdx === parentIdx && selectedChild.childIdx === childIdx) {
          setSelectedChild(null);
        }
      };

      return (
        <div className="p-4 bg-white rounded shadow my-2 border-2 border-dashed border-primary/30">
          <div className="font-semibold mb-2">Container</div>
          <div
            className="min-h-[60px] bg-muted/10 rounded p-2"
            onDragOver={e => e.preventDefault()}
            onDrop={handleContainerDrop}
          >
            {el.props.children.length === 0 ? (
              <div className="text-muted-foreground text-sm text-center py-4">Drag components here</div>
            ) : (
              el.props.children.map((child: CanvasElement, childIdx: number) => (
                <div
                  key={childIdx}
                  draggable
                  onDragStart={() => handleChildDragStart(childIdx)}
                  onDragOver={e => handleChildDragOver(e, childIdx)}
                  onDragEnd={handleChildDragEnd}
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedChild({ parentIdx, childIdx });
                    setSelectedIndex(null);
                  }}
                  className={`group cursor-pointer border transition-all bg-white mb-2 ${
                    selectedChild && selectedChild.parentIdx === parentIdx && selectedChild.childIdx === childIdx
                      ? "border-primary ring-2 ring-primary/40"
                      : "border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">{renderComponent(child)}</div>
                    <button
                      className="opacity-0 group-hover:opacity-100 ml-2 text-red-500"
                      onClick={e => {
                        e.stopPropagation();
                        handleChildDelete(childIdx);
                      }}
                      title="Delete"
                      tabIndex={-1}
                      type="button"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }
    if (el.type === 'video') {
      const width = el.props.width || 560;
      const height = el.props.height || 315;
      let justify = "center";
      if (el.props.align === "left") justify = "flex-start";
      if (el.props.align === "right") justify = "flex-end";
      return (
        <div className="my-2 flex flex-col"
          style={{ alignItems: justify }}>
          {el.props.url ? (
            <div
              className="aspect-video"
              style={{
                width,
                height,
                resize: "both",
                overflow: "auto",
                minWidth: 100,
                minHeight: 50,
                maxWidth: 2000,
                maxHeight: 1200,
                display: "flex",
                justifyContent: "center"
              }}
            >
              <iframe
                className="w-full h-full rounded"
                src={
                  el.props.url.includes("youtube.com") || el.props.url.includes("youtu.be")
                    ? `https://www.youtube.com/embed/${el.props.url.split("v=")[1]?.split("&")[0] || el.props.url.split("/").pop()}`
                    : el.props.url
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <Youtube className="w-16 h-16 text-red-600" />
            </div>
          )}
        </div>
      );
    }
    if (el.type === 'gallery') {
      const images = el.props.images && Array.isArray(el.props.images) && el.props.images.length > 0
        ? el.props.images
        : [
            { url: "https://placehold.co/100x100", width: 100, height: 100 },
            { url: "https://placehold.co/100x100", width: 100, height: 100 },
            { url: "https://placehold.co/100x100", width: 100, height: 100 }
          ];
      return (
        <div className="grid grid-cols-3 gap-2 my-2">
          {images.map((img: { url: string, width: number, height: number }, i: number) => (
            <img
              key={i}
              src={img.url && img.url.trim() !== "" ? img.url : "https://placehold.co/100x100"}
              width={img.width || 100}
              height={img.height || 100}
              className="rounded object-cover"
              style={{ width: img.width || 100, height: img.height || 100 }}
              alt=""
            />
          ))}
        </div>
      );
    }
    if (el.type === 'product') {
      return (
        <div className="p-4 border rounded my-2 bg-white">
          <div className="font-bold mb-2">{el.props.name || "Product Name"}</div>
          <img src={el.props.img || "https://placehold.co/200x150"} className="mb-2 rounded" />
          <div className="text-primary font-semibold">{el.props.price ? `$${el.props.price}` : "$99.99"}</div>
        </div>
      );
    }
    if (el.type === 'product-list') {
      return (
        <div className="my-2">
          <div className="font-bold mb-2">Product List</div>
          <div className="grid grid-cols-2 gap-2">
            {(el.props.products || ["Product 1", "Product 2"]).map((p: string, i: number) => (
              <div key={i} className="border p-2 rounded">{p}</div>
            ))}
          </div>
        </div>
      );
    }
    if (el.type === 'cart') {
      return (
        <div className="p-4 border rounded my-2 bg-white">
          <div className="font-bold mb-2">{el.props.title || "Cart"}</div>
          <div>{el.props.emptyText || "0 items"}</div>
        </div>
      );
    }
    if (el.type === 'contact-form') {
      return (
        <form className="space-y-2 my-2">
          <input className="border rounded p-2 w-full" placeholder="Your email" />
          <textarea className="border rounded p-2 w-full" placeholder="Message" />
          <button className="px-4 py-2 bg-primary text-white rounded">
            {el.props.buttonText || "Send"}
          </button>
        </form>
      );
    }
    if (el.type === 'newsletter') {
      return (
        <form className="space-y-2 my-2">
          <input className="border rounded p-2 w-full" placeholder={el.props.placeholder || "Your email"} />
          <button className="px-4 py-2 bg-primary text-white rounded">
            {el.props.buttonText || "Subscribe"}
          </button>
        </form>
      );
    }
    if (el.type === 'slider') {
      return (
        <div className="my-2">
          <div className="bg-gray-200 rounded h-32 flex items-center justify-center">
            {(el.props.slides || ["Slider"]).join(" / ")}
          </div>
        </div>
      );
    }
    if (el.type === 'map') {
      return (
        <div
          className="my-2 resize overflow-auto border rounded"
          style={{
            width: el.props.width || 400,
            height: el.props.height || 200,
            minWidth: 100,
            minHeight: 50,
            maxWidth: 2000,
            maxHeight: 2000,
          }}
        >
          <iframe
            className="w-full h-full rounded"
            src={el.props.src || "https://www.openstreetmap.org/export/embed.html?bbox=2.2945%2C48.8584%2C2.295%2C48.8585&amp;layer=mapnik"}
          ></iframe>
        </div>
      );
    }
    return <div className="p-4 bg-red-100 rounded">Unknown: {el.type}</div>;
  }

  return (
    <div className="flex flex-1 min-w-0 h-full">
      <div className="flex-1 relative min-w-0">
        <ScrollArea className="h-[calc(100vh-3.5rem)] w-full">
          <div
            className="bg-muted/30 min-h-[calc(100vh-3.5rem)] relative flex flex-col"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
          >
            {components.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-12 relative">
                <div className="text-center max-w-md mx-auto p-8 rounded-lg border-2 border-dashed border-muted-foreground/20">
                  <PlusCircle className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Add components to your page</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Drag and drop components from the sidebar to start building your page.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-4">
                {components.map((el, idx) => (
                  <div
                    key={idx}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={e => handleDragOver(e, idx)}
                    onDragEnd={handleDragEnd}
                    onClick={() => {
                      setSelectedIndex(idx);
                      setSelectedChild(null);
                    }}
                    className={`group cursor-pointer border transition-all bg-white ${
                      selectedIndex === idx
                        ? "border-primary ring-2 ring-primary/40"
                        : "border-transparent"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">{renderComponent(el)}</div>
                      <button
                        className="opacity-0 group-hover:opacity-100 ml-2 text-red-500"
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(idx);
                        }}
                        title="Delete"
                        tabIndex={-1}
                        type="button"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <SiteEditorPropertyPanel
        selected={
          selectedChild
            ? components[selectedChild.parentIdx]?.props.children[selectedChild.childIdx] || null
            : selectedIndex !== null
              ? components[selectedIndex]
              : null
        }
        onChange={newProps => {
          if (selectedChild) {
            setComponents(prev =>
              prev.map((c, i) =>
                i === selectedChild.parentIdx
                  ? {
                      ...c,
                      props: {
                        ...c.props,
                        children: c.props.children.map((child: CanvasElement, j: number) =>
                          j === selectedChild.childIdx
                            ? { ...child, ...newProps, props: { ...child.props, ...newProps.props } }
                            : child
                        ),
                      },
                    }
                  : c
              )
            );
          } else if (selectedIndex !== null) {
            setComponents(prev =>
              prev.map((el, idx) =>
                idx === selectedIndex ? { ...el, ...newProps, props: { ...el.props, ...newProps.props } } : el
              )
            );
          }
        }}
      />
    </div>
  );
}