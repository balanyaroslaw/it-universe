
const RenderTree = ({
  node,
  x,
  y,
  levelSpacing,
  nodeSpacing,
  CustomNode,
  nodeWidth,
  nodeHeight,
  customOffsetX,
  customOffsetY
}) => {
  const calculateSubtreeWidth = (node, nodeSpacing) => {
    if (!node.parents || node.parents.length === 0) {
      return nodeWidth + nodeSpacing;
    }
    return (
      node.parents.reduce(
        (total, parent) => total + calculateSubtreeWidth(parent, nodeSpacing),
        0
      ) + (node.parents.length - 1) * nodeSpacing
    );
  };

  const subtreeWidth = calculateSubtreeWidth(node, nodeSpacing);
  let parentXStart = x - subtreeWidth / 2 + nodeSpacing / 2;

  return (
    <g>
      <CustomNode
        key={node.id}
        position={{ x: x + customOffsetX, y: y + customOffsetY }}
        scale={1}
        width={nodeWidth}
        height={nodeHeight}
        node={node}
      />

      {node.parents &&
        node.parents.map((parent) => {
          const parentSubtreeWidth = calculateSubtreeWidth(parent, nodeSpacing);
          const parentX = parentXStart + parentSubtreeWidth / 2 - nodeSpacing / 2;
          parentXStart += parentSubtreeWidth + nodeSpacing;

          return (
            <g key={parent.id}>
              <path
                d={`M ${x + nodeWidth / 2} ${y + nodeHeight} 
                   V ${y + levelSpacing + nodeHeight/2} 
                   H ${parentX + nodeWidth / 2} 
                   V ${y + levelSpacing}`}
                stroke="gray"
                fill="none"
                strokeWidth="2"
              />

              <RenderTree
                node={parent}
                x={parentX}
                y={y + levelSpacing}
                levelSpacing={levelSpacing}
                nodeSpacing={nodeSpacing}
                nodeWidth={nodeWidth}
                nodeHeight={nodeHeight}
                CustomNode={CustomNode}
                customOffsetX={customOffsetX}
                customOffsetY={customOffsetY}
              />
            </g>
          );
        })}
    </g>
  );
};

export default RenderTree