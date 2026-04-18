/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  Node,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
} from 'reactflow';

const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Trigger: New Lead' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Action: Send Email' }, position: { x: 250, y: 100 } },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

const SidebarItem = ({ label, type }: { label: string; type: string }) => (
  <div className="p-3 bg-[#1F1F1F] border border-[#333] rounded-lg shadow-sm hover:border-[#D4AF37] cursor-grab text-xs text-[#E0E0E0] text-center">
    {label}
  </div>
);

const TemplateCard = ({ name, meta }: { name: string; meta: string }) => (
  <div className="bg-[#1F1F1F] border border-[#333] rounded-lg p-3 mb-3 cursor-pointer hover:border-[#D4AF37]">
    <div className="text-sm text-[#E0E0E0] font-serif mb-1">{name}</div>
    <div className="text-[10px] text-[#666] uppercase tracking-wider">{meta}</div>
  </div>
);

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(eds, changes)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="h-screen w-full flex flex-col bg-[#0A0A0A] text-[#E0E0E0] font-sans">
      <header className="h-[60px] bg-[#141414] border-b border-[#333] flex items-center justify-between px-6">
        <div className="text-xl tracking-widest text-[#D4AF37]">AUTOBIZ <span className="font-thin italic">Studio</span></div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded border border-[#444] text-xs">Preview Mode</button>
          <button className="px-4 py-2 rounded border border-[#444] text-xs">Test Flow</button>
          <button className="px-4 py-2 rounded bg-[#D4AF37] text-[#000] text-xs font-semibold">Publish Workflow</button>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-[220px] bg-[#141414] border-r border-[#333] p-5 flex flex-col gap-6">
          <div>
            <h2 className="text-[11px] uppercase tracking-widest text-[#888] mb-3">Triggers</h2>
            <div className="grid grid-cols-2 gap-2">
              <SidebarItem label="New Lead" type="trigger" />
              <SidebarItem label="New Order" type="trigger" />
            </div>
          </div>
          <div>
            <h2 className="text-[11px] uppercase tracking-widest text-[#888] mb-3">Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              <SidebarItem label="Send Email" type="action" />
              <SidebarItem label="Update CRM" type="action" />
              <SidebarItem label="Add to Sheet" type="action" />
            </div>
          </div>
        </aside>
        <div className="flex-1 bg-[#0D0D0D]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="bg-[radial-gradient(#222_1px,transparent_1px)] bg-[length:24px_24px]"
          >
            <Background />
            <Controls className="!bg-[#141414] !border-[#333]" />
          </ReactFlow>
        </div>
        <aside className="w-[280px] bg-[#141414] border-l border-[#333] p-5 flex flex-col gap-6">
          <div>
            <h2 className="text-[11px] uppercase tracking-widest text-[#888] mb-4">Template Library</h2>
            <TemplateCard name="Email: Welcome Sequence" meta="E-commerce • Popular" />
            <TemplateCard name="Email: Abandoned Cart" meta="E-commerce • Revenue" />
            <TemplateCard name="Social: New Product Post" meta="Marketing • Launch" />
            <TemplateCard name="Social: Weekly Promo" meta="Marketing • Seasonal" />
          </div>
        </aside>
      </div>
      <footer className="h-[30px] bg-[#141414] border-t border-[#333] flex items-center justify-between px-5 text-[11px] text-[#666]">
        <div>Operational Health: <span className="text-[#2ECC71]">Active</span></div>
        <div>Workflow ID: AB-9921-X</div>
      </footer>
    </div>
  );
}
