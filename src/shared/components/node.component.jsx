import React from 'react'
import pencil from '../../assets/pencil.png'
import Man from '../../assets/man.png';
import Woman from '../../assets/woman.png'
import useTreeStore from '../../store/tree.store'
import useModalStore from '../../store/modal.store'
import { windowList } from '../keys/windowList'
function NodeComponent({width, height, position, scale=1, node, isSibling}) {
    const imageSize = {width:+(width/1.15), height:+(height/1.75)} 
    const setNode = useTreeStore((state)=>state.setNode)
    const openModal = useModalStore((state)=>state.open)

    const handleNodeClick = () =>{
        setNode(node)
        console.log(node)
        openModal(windowList.informationWindow, isSibling?'sibling':'parent')
    }
    return (
            <g 
            width={width}
            height={height}

            style={{ cursor: "grab", 
            transform: `translate(${position.x}px, ${position.y}px) scale(1)`,
            transformOrigin: "center"}}
            key={node.id}
            >
                <defs>
                    <clipPath id="imageClip">
                        {<rect
                            x={(width-imageSize.width)/2}
                            y={10}
                            href={node.url}
                            width={Number(width/1.15)}
                            height={Number(height/1.75)}
                            textAnchor="middle" 
                            dominantBaseline="middle"
                            rx={10}
                            ry={25}
                        />}
                    </clipPath>
                </defs>
                <rect
                    width={width}
                    height={height}
                    rx={10}
                    ry={10}
                    fill="#ECF9C7"
                    stroke={"#A2C450"}
                    strokeWidth={2}
                />

                <defs>
                    <clipPath id="imagePerson">
                        <circle
                        cx={width / 2}
                        cy={imageSize.height / 2 + 10}
                        r={Math.min(imageSize.width, imageSize.height) / 2}
                        />
                    </clipPath>
                </defs>

                <circle
                    cx={width / 2}
                    cy={imageSize.height / 2 + 10}
                    r={Math.min(imageSize.width, imageSize.height) / 2}
                    fill="#FEFFF1"
                    stroke="#A2C450"        
                    strokeWidth={3}   
                />

                <image
                    x={(width - imageSize.width) / 2}
                    y={10}
                    href={node.gender === 'female' ? Woman : Man}
                    width={imageSize.width}
                    height={imageSize.height}
                    clipPath="url(#imagePerson)"
                    onClick={() => handleNodeClick()}
                />
                
                <text
                    x={width / 2}
                    y={imageSize.height + 30}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#462F20"
                    fontFamily="Comfortaa, sans-serif" 
                    style={{ userSelect: 'none' }}
                    onClick={() => handleNodeClick()}
                    >
                    <tspan x={width / 2} dy="0">
                        {node.firstName}
                    </tspan>
                    <tspan x={width / 2} dy="1.2em">
                        {node.lastName}
                    </tspan>
                </text>
                
                <text
                    x={width/2}
                    y={imageSize.height+50}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                    fill="#000000"
                    style={{
                        userSelect: "none", 
                      }}
                >
                    {node.year}
                </text>
                
                <circle
                    fill="#9dd67a"
                    cx={width-15}
                    cy={15}
                    r={10}
                    onClick={()=>{
                        openModal(windowList.changeWindow);
                        setNode(node);
                    }}  
                />
                
                <image
                    x={width-20}
                    y={10}
                    href={pencil}
                    width={10}
                    height={10}
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    onClick={()=>{
                        openModal(windowList.changeWindow);
                        setNode(node);
                    }}
                />

                {!isSibling&&(
                    <>
                        <circle
                            fill="#cbcbcbe9"
                            cx={width-15}
                            cy={height-14}
                            r={10}
                        />

                        <text
                            x={width-15}
                            y={height-10}
                            textAnchor="middle"
                            fontSize="14"
                            fontWeight="bold"
                            fill="#000"
                            cursor="pointer"
                            style={{
                                userSelect: "none", 
                            }}
                            onClick={()=>{
                                setNode(node)
                                openModal(windowList.memberWindow);
                            }}
                        >
                            +
                        </text>
                    </>
                )}
            </g>
    )
}

export default NodeComponent