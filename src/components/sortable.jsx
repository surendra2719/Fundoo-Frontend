import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Container, Row, Col } from 'react-grid-system';
// import './index.css';
  
const SortableItem = SortableElement(({value}) =>   <Row>{value}</Row>);
 
const SortableList = SortableContainer(({items}) => {
    return (
      <div>
      <Row>
      <div>
         <Col sm={4}>
            {items.map((value, index) =>
                <SortableItem key={`item-${index}`} index={index} value={value} />
            )}
            </Col>
            </div>
      </Row>
      
      </div>
    );
});
 
export default class SortableComponent extends Component {
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    };
    render() {
        return (
        
            <Row>
      
            <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
         
            </Row>
           
        )
    }
}
