const RenderTree = ({ node, x, y, parentX, parentY, levelSpacing, nodeSpacing, CustomNode, customOffsetX, customOffsetY, nodeWidth, nodeHeight}) => {
  const calculateSubtreeWidth = (node, nodeSpacing) => {
    if (!node.children || node.children.length === 0) {
      return nodeSpacing; 
    }
    return (
      node.children.reduce(
        (total, child) => total + calculateSubtreeWidth(child, nodeSpacing),
        0
      ) + (node.children.length - 1) * nodeSpacing
    );
  };

  const subtreeWidth = calculateSubtreeWidth(node, nodeSpacing);

  let childXStart = x - subtreeWidth / 2 + nodeSpacing / 2;

  return (
    <g>
      {typeof parentX === "number" && typeof parentY === "number" && (
        <path
          d={`M ${parentX+nodeWidth/1.25} ${parentY + nodeHeight*1.70} 
             V ${y + 120 - levelSpacing / 2} 
             H ${x + nodeWidth} 
             V ${y+ nodeHeight/1.35}`}
          stroke="gray"
          fill="none"
          strokeWidth="2"
        />
      )}

      <CustomNode
          key={node.id}
          position={{ x: x + customOffsetX, y: y + customOffsetY }}
          scale={1}
          width={nodeWidth}
          height={nodeHeight}
          node={node}
        />
      
      {node.children.map((child) => {
        const childSubtreeWidth = calculateSubtreeWidth(child, nodeSpacing);
        const childX = childXStart + childSubtreeWidth / 2 - nodeSpacing / 2;
        childXStart += childSubtreeWidth + nodeSpacing;

        return (
          <RenderTree
            key={child.id}
            node={child}
            x={childX }
            y={y + levelSpacing + customOffsetY}
            parentX={x}
            parentY={y}
            levelSpacing={levelSpacing}
            nodeSpacing={nodeSpacing}
            nodeWidth={nodeWidth}
            nodeHeight={nodeHeight} 
            CustomNode={CustomNode}
            customOffsetX={customOffsetX}
            customOffsetY={customOffsetY}
          />
        );
      })}
    </g>
  );


  
};
  
  
export default RenderTree