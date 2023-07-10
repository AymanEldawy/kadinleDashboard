import React from "react";

const TabsContent = ({ children, activeTabName, containerClassName }) => {
  return (
    <div className={containerClassName}>
      {React.Children.map(children, (child) => {
        if (child?.props?.tabName === activeTabName) return child;
      })}
    </div>
  );
};

export default TabsContent;
