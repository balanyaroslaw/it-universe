
import React, { useMemo, useState, useRef } from "react";
import Tree from 'react-d3-tree';
import TreeComponent from "../shared/components/tree.component";
import NodeComponent from "../shared/components/node.component";

const familyTree = {
  id: 1,
  name: "John Doe",
  year: "1950",
  url: "https://via.placeholder.com/100",
  children: [
    {
      id: 2,
      name: "Jane Doe",
      year: "1975",
      url: "https://via.placeholder.com/100",
      children: [
        {
          id: 4,
          name: "Emily Doe",
          year: "2000",
          url: "https://via.placeholder.com/100",
          children: [
            { id: 8, name: "Liam Doe", year: "2025", url: "https://via.placeholder.com/100", children: [] },
            { id: 9, name: "Olivia Doe", year: "2027", url: "https://via.placeholder.com/100", children: [] },
            { id: 14, name: "Ethan Doe", year: "2029", url: "https://via.placeholder.com/100", children: [] },
          ],
        },
        {
          id: 5,
          name: "Michael Doe",
          year: "2002",
          url: "https://via.placeholder.com/100",
          children: [
            { id: 10, name: "Noah Doe", year: "2030", url: "https://via.placeholder.com/100", children: [] },
            { id: 15, name: "Ava Doe", year: "2032", url: "https://via.placeholder.com/100", children: [] },
          ],
        },
        {
          id: 16,
          name: "Isabella Doe",
          year: "2004",
          url: "https://via.placeholder.com/100",
          children: [
            { id: 17, name: "Sophia Doe", year: "2033", url: "https://via.placeholder.com/100", children: [] },
            { id: 18, name: "James Doe", year: "2035", url: "https://via.placeholder.com/100", children: [] },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Richard Doe",
      year: "1978",
      url: "https://via.placeholder.com/100",
      children: [
        {
          id: 6,
          name: "Sophia Doe",
          year: "2005",
          url: "https://via.placeholder.com/100",
          children: [
            { id: 11, name: "Emma Doe", year: "2033", url: "https://via.placeholder.com/100", children: [] },
            { id: 19, name: "Benjamin Doe", year: "2037", url: "https://via.placeholder.com/100", children: [] },
          ],
        },
        {
          id: 7,
          name: "Maria Doe",
          year: "2008",
          url: "https://via.placeholder.com/100",
          children: [
            { id: 12, name: "Lucas Doe", year: "2036", url: "https://via.placeholder.com/100", children: [] },
            { id: 13, name: "Amelia Doe", year: "2038", url: "https://via.placeholder.com/100", children: [] },
            { id: 20, name: "Henry Doe", year: "2040", url: "https://via.placeholder.com/100", children: [] },
          ],
        },
        {
          id: 21,
          name: "William Doe",
          year: "2010",
          url: "https://via.placeholder.com/100",
          children: [
            { id: 22, name: "Charlotte Doe", year: "2041", url: "https://via.placeholder.com/100", children: [] },
            { id: 23, name: "Elijah Doe", year: "2043", url: "https://via.placeholder.com/100", children: [] },
          ],
        },
        {
          id: 24,
          name: "Ella Doe",
          year: "2012",
          url: "https://via.placeholder.com/100",
          children: [
            { id: 25, name: "Harper Doe", year: "2045", url: "https://via.placeholder.com/100", children: [] },
            { id: 26, name: "Jack Doe", year: "2047", url: "https://via.placeholder.com/100", children: [] },
            { id: 27, name: "Mia Doe", year: "2048", url: "https://via.placeholder.com/100", children: [] },
          ],
        },
      ],
    },
  ],
};


function TreeBoard() {
   return(
    <div style={
      {
        width:'500px',
        height:'100%'
      }
    }>
      <TreeComponent 
        node={{width:150, height:140}}
        data = {familyTree}
        CustomComponent={NodeComponent}
      />
    </div>
   )
}

export default TreeBoard