import SiteEditorCanvas from '@/components/editor/canvas';
import SiteEditorSidebar from '@/components/editor/sidebar';
import SiteEditorHeader from '@/components/editor/header';
import SiteEditorPropertyPanel from '@/components/editor/property-panel';

export default function EditorPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteEditorHeader siteId={params.id} />
      <div className="flex-1 flex overflow-hidden">
        <SiteEditorSidebar />
        <SiteEditorCanvas />
        <SiteEditorPropertyPanel />
      </div>
    </div>
  );
}