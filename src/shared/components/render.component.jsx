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
    if(node){
      if (!node.parents || node.parents.length === 0) {
        if (!node.siblings || node.siblings.length === 0) {
          return nodeWidth + nodeSpacing;
        }
        return nodeWidth + nodeSpacing;
      }
      let parentTotal = 0;
      let siblingTotal = 0;
  
      node.parents.forEach((parent, index) => {
        parentTotal+=calculateSubtreeWidth(parent, nodeSpacing)
      });
  
      node.siblings?.forEach((sibling, index) => {
        siblingTotal+=calculateSubtreeWidth(sibling, nodeSpacing)
      });
  
      let parentWidth=parentTotal+(node.parents.length - 1) * nodeSpacing
  
      let countSib = node.parents.reduce((total,parent)=>total+=parent.siblings.length,0)
  
      return parentWidth+((nodeWidth+nodeSpacing)*countSib)
    }
  };


  

  const subtreeWidth = calculateSubtreeWidth(node, nodeSpacing);
  const countSib = node?.parents.reduce((total,parent)=>total+=parent?.siblings.length,0)
  let parentXStart = (x - subtreeWidth/2 + nodeSpacing/2)+(countSib*nodeSpacing)

  return (
    node&&
    <g>{
      node.siblings && node.isRoot&&
      node.siblings.map((sibling, sindex)=>{
        const sibUX = (x+customOffsetX+nodeWidth*(sindex+1)+nodeSpacing*(sindex+1))
        return (
          <g key={`${sibling.id}-${sindex}`}>
          <path
            d={`M ${(sibUX+nodeWidth/2)} ${y}
                V ${y+nodeHeight}  
                H ${sibUX-(nodeWidth+nodeSpacing)+nodeWidth/2}`}
            stroke="gray"
            fill="none"
            strokeWidth="2"
          />

        <CustomNode
          key={`${sibling.id}-custom`}
          position={{ x: sibUX, y: !node.isRoot&&node.siblings?.length===0?y:y-nodeHeight/2}}
          scale={1}
          width={nodeWidth}
          height={nodeHeight}
          node={sibling}
          isSibling={true}
        />
        </g>
      )
      })}

      <CustomNode
        key={`${node.id}-custom`}
        position={{ x: x + customOffsetX, y: (node.isRoot&&node.siblings.length>0) ? y - nodeHeight / 2: y + customOffsetY }}
        scale={1}
        width={nodeWidth}
        height={nodeHeight}
        node={node}
        isSibling={false}
      />
  
      {node.parents &&
        node.parents.map((parent, pindex) => {
          const parentSubtreeWidth = calculateSubtreeWidth(parent, nodeSpacing);
          const parentX = parentXStart + parentSubtreeWidth / 2 - nodeSpacing / 2;
          parentXStart += parentSubtreeWidth + nodeSpacing;
          return (
            <g key={`${parent.id}-${pindex}`}>
              <path
                d={`M ${x + nodeWidth / 2} ${node.isRoot&&node.siblings.length>0?y + nodeHeight/2:y + nodeHeight} 
                   V ${y + levelSpacing + nodeHeight / 2} 
                   H ${parentX + nodeWidth / 2}`}
                stroke="gray"
                fill="none"
                strokeWidth="2"
              />
              {parent.siblings &&
                parent.siblings.map((sibling, index) => {
                  const sibSpace = (pindex + 1) % 2 !== 0 ? index + 1 : -(index + 1);
                  const sibX = parentX + sibSpace - nodeWidth * sibSpace - nodeSpacing * sibSpace;
                  const line = -nodeSpacing / 2 - nodeSpacing;
                  const sibLine = (pindex + 1) % 2 === 0 ? (line-nodeSpacing) : (-1 * (line-nodeSpacing));
  
                  return (
                    <g key={`${sibling.id}-${pindex}-${index}`}>
                      <path
                        key={`${sibling.id}-path`}
                        d={
                         `M ${(sibX) + nodeWidth / 2} ${y + levelSpacing + nodeHeight} 
                          V ${(y + levelSpacing+nodeHeight*2)}
                          H ${((sibX) + nodeWidth / 2) + sibLine}`
                            
                        }
                        stroke="gray"
                        fill="none"
                        strokeWidth="2"
                      />
  
                      <CustomNode
                        key={`${sibling.id}-custom`}
                        position={{ x: sibX, y: y + levelSpacing }}
                        scale={1}
                        width={nodeWidth}
                        height={nodeHeight}
                        node={sibling}
                        isSibling={true}
                      />
                    </g>
                  );
                })}
  
              <RenderTree
                key={`render-${parent.id}-${pindex}`} 
                node={parent}
                x={parentX}
                y={y + levelSpacing}
                levelSpacing={parent.siblings?.length === 0 ? levelSpacing : levelSpacing + nodeHeight}
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