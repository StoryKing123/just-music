import React, { EventHandler, FC, MouseEventHandler, ReactNode } from "react";
import Tab from "./Tab";

type TabsProps = {
    value: number;
    onChange: (event: MouseEvent, newValue: number) => void;
};


const Tabs: FC<TabsProps> = (props) => {
    const renderTab = (node: React.ReactNode, index: number) => {
        if (node && (node as React.ReactElement).type === Tab) {
            const element = node as typeof Tab;
            const tabProps = {
                ...(node as React.ReactElement).props,
                className: `${element.propTypes?.className ?? ""} ${
                    props.value === index
                        ? "text-active font-bold"
                        : "text-in-active"
                }`,
                onClick: (e: MouseEvent) => {
                    props.onChange && props.onChange(e, index);
                },
            };
            return <Tab {...tabProps}></Tab>;
        }
    };

    // return <div>{renderTabs(props.children)}</div>;
    return (
        <div className="flex gap-4">
            {React.Children.map(props.children, renderTab)}
        </div>
    );
};
export default Tabs;
export { Tabs, Tab };
