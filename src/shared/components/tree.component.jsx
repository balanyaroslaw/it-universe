
import React, { useEffect, useState } from 'react'
import RenderTree from './render.component';
import TreeNode from './test';
function TreeComponent({data, node, width, height, CustomComponent}) {
    const [position, setPosition] = useState({ x: width, y: height/2 }); 
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({x:0, y:0});
    const [scale, setScale] = useState(0.5);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    const [flattenedNodes, setFlattenedNodes] = useState([]);
    
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
    };
    
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
    };
    
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseClick = (e) =>{
       
    }

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
        <div>
            <svg
                style={{
                    border: "1px solid black",
                    position: "relative",
                    overflow: "hidden",

                }}
                viewBox={`${translate.x} ${translate.y} ${1000 / scale} ${500 / scale}`}
                preserveAspectRatio="xMidYMid meet"
                onMouseMove={handleMouseDrag}
                onMouseUp={handleMouseUp}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onClick={handleMouseClick}
                >
                <RenderTree
                  node={data}
                  x={800}
                  y={200}
                  levelSpacing={150}
                  nodeSpacing={100}
                  CustomNode={CustomComponent}
                  nodeWidth={node.width}
                  nodeHeight={node.height}  
                  customOffsetX={50}
                  customOffsetY={100}             
                />
            </svg>
        </div>


    );
}

export default TreeComponent