import React from 'react'

function Category({activity, onClick, onDragStart, onDragEnter}) {


    return (
        <div   
            onDragEnter={() => onDragEnter(activity)}
            onDragStart={(e) => onDragStart(e, activity)}
            draggable={true}
            onClick={() => onClick(activity)}
            style={{
                width: '43px',
                height: '20px',
                backgroundColor: activity.color,
                marginRight: '6px',
                marginBottom: '2px'
            }}
        >
            {/* <div 
                style={{
                    width: '18px',
                    height: '20px',
                    backgroundColor: activity.color,
                }}
            /> */}
        </div>
    );
}

export default Category;
