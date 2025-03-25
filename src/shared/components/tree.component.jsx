
import React, { useEffect, useState } from 'react'
import RenderTree from './render.component';
import { useDevice } from '../../hooks/useDevice';
function TreeComponent({data, node, width, height, CustomComponent, levelSpacing, nodeSpacing, start, get}) {
    const [position, setPosition] = useState({ x: width, y: height/2 }); 
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({x:0, y:0});
    const [scale, setScale] = useState(0.8);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const deviceSize = useDevice();
    
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
    };
    
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseDrag = (e) => {
      if (e.buttons !== 1) return; 
      setTranslate((prev) => ({
        x: prev.x - e.movementX / scale, 
        y: prev.y - e.movementY / scale,
      }));
    };

    const handleWheel = (e) => {
        const zoomFactor = 0.1;
        const zoomIn = e.deltaY < -1;
        
        setScale((prevScale) => {
          const newScale = zoomIn ? prevScale * (1 + zoomFactor) : prevScale / (1 + zoomFactor);
          return Math.min(Math.max(newScale, 0.1), 2);
        });

        console.log(scale)
    };
    
    return (
        <div className="overflow-hidden" style={{
           width: "100%",
           height:"600px",
           overflow: "hidden"
        }}
        >
            <svg
                style={{
                    position: "relative",
                    overflow: "hidden",
                    width: "100%",
                    height:"100%",
                    boxSizing: "border-box",
                }}
                viewBox={`${translate.x} ${translate.y} ${deviceSize.deviceWidth / scale} ${deviceSize.deviceHeight / scale}`}
                preserveAspectRatio="xMidYMid meet"
                onMouseMove={handleMouseDrag}
                onMouseUp={handleMouseUp}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                >
                <RenderTree
                  node={data} 
                  x={start.x} 
                  y={start.y}
                  childX={null} 
                  childY={null} 
                  levelSpacing={levelSpacing} 
                  nodeSpacing={nodeSpacing} 
                  CustomNode={CustomComponent}
                  customOffsetX={0}
                  customOffsetY={0}
                  nodeWidth={node.width}
                  nodeHeight={node.height}
                />
            </svg>
        </div>


    );
}

export default TreeComponent