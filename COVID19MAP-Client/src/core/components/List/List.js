import React, { useCallback } from 'react';
import './List.css';

const List = ({children}) => (
    <div className = "List">{children}</div>
);
  
const ListItem = ({id, children, onClick, externalClassName, ...props}) => {
    const handleOnClickEvent = useCallback(() => {
        if(!onClick) {
            return;
        }

        onClick(id);
    }, [id, onClick]);
    
    return (
        <div key = {id} className = {`List-Item ${externalClassName}`} onClick = {handleOnClickEvent} {...props}>
            {children}
        </div>
    );
};

List.Item = ListItem;

export default List;