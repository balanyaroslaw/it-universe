// Helper function to calculate the width of a subtree
  const TreeNode = ({ node, x, y, parentX, parentY, levelSpacing, nodeSpacing, CustomNode}) => {
    const customOffsetX = 50; 
    const customOffsetY = 70; 

    const subtreeWidth = calculateSubtreeWidth(node, nodeSpacing);
  
    let childXStart = x - subtreeWidth / 2 + nodeSpacing / 2;
  
    return (
      <g>
        {/* Line to parent with 90-degree bends */}
        {typeof parentX === "number" && typeof parentY === "number" && (
          <path
            d={`M ${parentX+120} ${parentY + 210} 
               V ${y + 100 - levelSpacing / 2} 
               H ${x+150} 
               V ${y+ 110}`}
            stroke="gray"
            fill="none"
            strokeWidth="2"
          />
        )}
  
        {/* Node */}
        <CustomNode
            key={node.id}
            handleMouseDown={()=>{}}
            handleMouseClick={()=>{}}
            position={{ x: x + customOffsetX, y: y + customOffsetY }}
            scale={1}
            width={150}
            height={140}
            node={node}
          />
        
  
        {/* Render children recursively */}
        {node.children.map((child) => {
          const childSubtreeWidth = calculateSubtreeWidth(child, nodeSpacing);
          const childX = childXStart + childSubtreeWidth / 2 - nodeSpacing / 2;
          childXStart += childSubtreeWidth + nodeSpacing;
  
          return (
            <TreeNode
              key={child.id}
              node={child}
              x={childX }
              y={y + levelSpacing + customOffsetY}
              parentX={x}
              parentY={y}
              levelSpacing={levelSpacing}
              nodeSpacing={nodeSpacing}
              CustomNode={CustomNode}
            />
          );
        })}
      </g>
    );
  };
export default TreeNode;