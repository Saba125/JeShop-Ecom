import React from 'react';

const DefaultDeleteDesc = (name:string) => {
    return (
        <span>
            დარწმუნებული ხართ რომ გინდათ წაშალოთ <span className="text-red-500">"{name}"</span>
        </span>
    );
};

export default DefaultDeleteDesc;
