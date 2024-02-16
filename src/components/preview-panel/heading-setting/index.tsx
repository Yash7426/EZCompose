import React, { useContext } from 'react'
import { set, get } from "lodash";
import './heading-setting.css'
import { usePageDesignContext } from '@/contexts/page-design';

enum HeadingType{
    "none",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p" 
}
export default function HeadingSettings(props:Allow) {

    let pageDesignState = usePageDesignContext();

    const directChangeHeadingType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== "none") {

            let currentNode = props.currentlyActive.current;
            let __current_elem = getNodeData(currentNode, 0)
            __current_elem.elemType = e.target.value;
            setNodeData(currentNode, 0, __current_elem);
        }

    }

    const setNodeData = (elString:string, level:number, data:Allow) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, level);
        let __temp_structure = { ...pageDesignState.design }

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]"
        } else {
            _node_path = "elements[" + currentNodeLast + "]"
        }

        set(__temp_structure, _node_path, data);
        pageDesignState.setDesign(__temp_structure);

        //close panel

    }

    const getNodeData = (elString:string, level:number) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, level);

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]"
        } else {
            _node_path = "elements[" + currentNodeLast + "]"
        }

        return get(pageDesignState.design, _node_path);
    }

    return (
        <div className='headingSettingsPanel'>
            <div className="headingSettingsInner">
                <h5>Heading type:</h5>
                <select onChange={directChangeHeadingType}>
                    <option value={HeadingType.none}>Select option..</option>
                    <option value={HeadingType.h1}>Heading 1</option>
                    <option value={HeadingType.h2}>Heading 2</option>
                    <option value={HeadingType.h3}>Heading 3</option>
                    <option value={HeadingType.h4}>Heading 4</option>
                    <option value={HeadingType.h5}>Heading 5</option>
                    <option value={HeadingType.h6}>Heading 6</option>
                    <option value={HeadingType.p}>Paragraph</option>
                </select>
            </div>
        </div>
    )
}
