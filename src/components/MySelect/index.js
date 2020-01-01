import React from "react";

import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import "./mySelect.css";
import {bio} from "../../industries";

const data = bio;

const Dropdown = ({sub, setSub}) => {
    const onChange = (currentNode, selectedNodes) => {
        console.log("onChange::", currentNode, selectedNodes);
        setSub(currentNode.label)
    };
    const onAction = (node, action) => {
        console.log("onAction::", action, node);
    };
    const onNodeToggle = currentNode => {
        console.log("onNodeToggle::", currentNode);
    };
    return (
        <DropdownTreeSelect
            data={data}
            onChange={onChange}
            mode="radioSelect"
            onAction={onAction}
            onNodeToggle={onNodeToggle}
        />
    );
};

export default Dropdown;
