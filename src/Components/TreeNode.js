import React from 'react';
import { FaFile, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import last from 'lodash/last';
import PropTypes from 'prop-types';





const getNodeLabel = node => last(node.path.split('/'));

const getPaddingLeft = (level, type) => {
    let paddingLeft = level * 20;
    if (type === 'file') paddingLeft += 20;
    return paddingLeft;
}



const StyledTreeNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  padding-left: ${props => getPaddingLeft(props.level, props.type)}px;

  &:hover {
    background: lightgray;
  }
`;
const NodeRightIcon = styled.div`
  font-size:12px;
  margin-right:${props => props.marginRight ? props.marginRight : 5}px;
}
`;
const TreeNode = (props) => {
    const { node, getChildNodes, level, onToggle,onSelectNode } = props;
    const iconLeft = node.isOpen === true? <FaChevronDown /> : <FaChevronRight />;

    const onShowIcon = (node)=>{
        var sct = [];
        if(getChildNodes(node).length===0){
            return false;
        }
        return true;
    }
    return (
        <React.Fragment>
            <StyledTreeNode level={level} type={node.type}>
                <NodeRightIcon marginRight={10} onClick={() => onToggle(node)}>
                    {node.type === 'folder' && (onShowIcon(node)?iconLeft:'')}
                    {node.type ==='folder' }
                    {node.type === 'folder' && node.isOpen === true && <FaFolderOpen />}
                    {node.type === 'file' && <FaFile /> }
                    {node.type === 'folder' && !node.isOpen && <FaFolder />}
                </NodeRightIcon>
                <span role="button" onClick={() => onSelectNode(node)}>
                    {getNodeLabel(node)}
    
                </span>
            </StyledTreeNode>
            {/* lay cac phan con */}
            {node.isOpen && getChildNodes(node).map(childnode => (
                <TreeNode
                    {...props}
                    node={childnode}
                    level={level + 1}
                />
            )
            )}

        </React.Fragment>
    )
}

TreeNode.propTypes = {
    node: PropTypes.object.isRequired,
    getChildNodes: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    onToggle: PropTypes.func.isRequired
};
TreeNode.defaultProps = {
    level: 0
};
export default TreeNode;
