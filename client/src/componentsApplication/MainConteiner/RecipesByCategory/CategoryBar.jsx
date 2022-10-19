import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from '../../..';


const CategoryBar = observer(() => {
  const { recipe } = useContext(Context);
  return (
    <ListGroup>
      {recipe.categories.map(category =>
          <ListGroup.Item 
          action variant="success"
          style={{cursor: 'pointer'}}
          active={category.id === recipe.selectedCategory.id}
          onClick={() => recipe.setSelectedCategory(category)}
          key={category.id}
          >
            {category.name}
          </ListGroup.Item>
        )}
    </ListGroup>
  );
});

export default CategoryBar; 