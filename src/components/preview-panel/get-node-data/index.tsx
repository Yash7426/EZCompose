import React, { useState, useEffect, useContext } from 'react';
import { set, get } from "lodash";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { usePageDesignContext } from '@/contexts/page-design';

export default function GetNodeData({currentlyActive,closePanel}:
    {currentlyActive:Allow;closePanel:()=>void}) {


    let pageDesignState = usePageDesignContext();

    let [currentNodeData, setCurrentNodeData] = useState({
        node: {}
    })


    useEffect(() => {
        getCurrentNodeData();
    }, [])

    useEffect(() => {
        getCurrentNodeData();
    }, [currentNodeData.node])

    const setNodeData = (elString:string, level:number, data:Allow, offset:string) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, currentNode.length - level);
        let __temp_structure = { ...pageDesignState.design }

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]" + offset
        } else {
            _node_path = "elements[" + currentNodeLast + "]" + offset
        }

        set(__temp_structure, _node_path, data);
        pageDesignState.setDesign(__temp_structure);

        //close panel

    }


    const getNodeData = (elString:string, level:number, offset:string) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, currentNode.length - level);

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]" + offset
        } else {
            _node_path = "elements[" + currentNodeLast + "]" + offset
        }

        return get(pageDesignState.design, _node_path);
    }

    const getCurrentNodeData = () => {
        setCurrentNodeData((prev)=>({ ...prev, node: getNodeData(currentlyActive.current, 0, '')}));
    }

    return (
        <div className='nodeData'>
            <CodeMirror
                value={JSON.stringify(currentNodeData.node, null, 2)}
                extensions={[javascript({ jsx: true })]}
                height="100%"
            />

        </div>
    )
}
