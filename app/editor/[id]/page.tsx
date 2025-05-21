import SiteEditorCanvas from '@/components/editor/canvas';
import SiteEditorSidebar from '@/components/editor/sidebar';
import SiteEditorHeader from '@/components/editor/header';

export default function EditorPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteEditorHeader siteId={params.id} />
      <div className="flex-1 flex overflow-hidden">
        <SiteEditorSidebar />
        {/* Le canvas et le property panel sont côte à côte */}
        <SiteEditorCanvas />
      </div>
    </div>
  );
}
export async function generateStaticParams() {
  // Remplace ces valeurs par les IDs réels de tes sites, si tu les récupères depuis une base
  const siteIds = ['1', '2', '3'];

  return siteIds.map((id) => ({ id }));
}
