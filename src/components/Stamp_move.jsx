import React, { useCallback, useState, useEffect } from 'react';
import { Background, ReactFlow, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import style from "../style/Stamp_move.module.css";

// Componente del nodo personalizado
const CustomNode = ({ data }) => {
  return (
    <div>
      {data.label}
    </div>
  );
};

function Stamp_move({ position, selectedModel, selectedColor, selectedImage, showLimits}) {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [pos, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const getImagePath = (model, color) => {
      return `src/assets/${model}/${model}-neck-${color}.png`
    };

    const newBackgroundImage = getImagePath(selectedModel, selectedColor);
    setBackgroundImage(newBackgroundImage);
  }, [selectedModel, selectedColor]);

  const initialNodes = [
    {
      id: '0',
      type: 'group',
      data: { label: null },
      position: { x: 127, y: 130 },
      style: { 
        width: 240, 
        height: 350, 
        border: showLimits ? '2px dashed rgba(0, 0, 0, 0.6)' : 'none',
        borderRadius: showLimits ? '8px' : '0',
        boxShadow: showLimits ? '0px 0px 8px rgba(0, 0, 0, 0.3)' : 'none',
        pointerEvents: 'none', 
        backgroundColor: 'transparent' 
      },
      draggable: false,
    },
    {
      id: '1',
      type: 'custom',
      data: { 
        label: <img src={selectedImage} 
                alt="Estampa" 
                style={{ width: '100px', height: '100px' }} /> 
      },
      position: pos,
      parentId: '0',
      extent: 'parent',
      draggable: true,
      selectable: false,
      resizeable: false
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const drag = useCallback((event, node) => {
    setPosition(node.position);
  }, [pos]);

  return (
    <div className={style.containerPreview}>
      <div className={style.flowCanvas}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          onNodeDrag={drag}
          nodeTypes={{ custom: CustomNode }}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: '490px 490px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnDrag={false}
          draggable={false}
          translateExtent={[
            [0, 0], // Límite superior izquierdo
            [500, 600], // Límite inferior derecho
          ]}
        >
        </ReactFlow>
      </div>
    </div>
  );
}

export default Stamp_move;