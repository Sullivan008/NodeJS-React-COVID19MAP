import React from 'react';
import './Panel.css';

const Panel = ({title, subtitle, children, containerClassName, externalSubtitleClassName}) => (
    <div className = {`Panel ${containerClassName || ''}`}>
        <div className = "Panel-Title">{title}</div>
        {
            subtitle && <div className = {`Panel-SubTitle ${externalSubtitleClassName}`}>{subtitle}</div>
        }
        <div className = "Panel-Scroller">
            <div className = "Panel-Body">
                {children}
            </div>
        </div>
    </div>
);

export default Panel;