import React from 'react';
import './List.css';

const List = ({children}) => (
    <div className="List">{children}</div>
);
  
List.Item = ({children}) => (
    <div className="List-Item">{children}</div>
);

export default List;