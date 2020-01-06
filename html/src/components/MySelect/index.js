import React, {Component} from "react";

import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import "./mySelect.css";
import isEqual from 'lodash/isEqual'

export default class Container extends Component {
  constructor(props){
    super(props)
    this.state = { data: props.data }
  }

  componentWillReceiveProps = (nextProps) => {
    if(!isEqual(nextProps.data, this.state.data)) {
      this.setState({ data: nextProps.data })
    }
  }

  shouldComponentUpdate = (nextProps) => {
    return !isEqual(nextProps.data, this.state.data)
  }

  render() {
    const { data } = this.props
    return (
        <DropdownTreeSelect
        data={this.state.data}
        onChange={this.props.onChange}
        mode="radioSelect"
        // onAction={onAction}
        // onNodeToggle={onNodeToggle}
    />
    )
  }
}


// const Dropdown = ({setCallback}) => {
//     const onChange = (currentNode, selectedNodes) => {
//         setCallback(currentNode.label)
//     };
//     const onAction = (node, action) => {
//         console.log("onAction::", action, node);
//     };
//     const onNodeToggle = currentNode => {
//         console.log("onNodeToggle::", currentNode);
//     };
//     return (
//         <DropdownTreeSelect
//             data={data}
//             onChange={onChange}
//             mode="radioSelect"
//             // onAction={onAction}
//             // onNodeToggle={onNodeToggle}
//         />
//     );
// };

// export default Dropdown;
