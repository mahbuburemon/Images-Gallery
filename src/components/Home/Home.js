import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Home.css';

// Import your images here...
import img1 from '../../images/img1.jpeg';
import img2 from '../../images/img2.jpeg';
import img3 from '../../images/img3.jpeg';
import img4 from '../../images/img4.jpeg';
import img5 from '../../images/img5.jpeg';
import img6 from '../../images/img6.jpeg';
import img7 from '../../images/img7.jpeg';
import img8 from '../../images/img8.jpeg';
import img9 from '../../images/img9.jpeg';
import img10 from '../../images/img10.jpeg';
import img11 from '../../images/img11.jpeg';

const Home = () => {
  // Define your images array with unique keys
  const images = [
    { id: '1', src: img1 },
    { id: '2', src: img2 },
    { id: '3', src: img3 },
    { id: '4', src: img4 },
    { id: '5', src: img5 },
    { id: '6', src: img6 },
    { id: '7', src: img7 },
    { id: '8', src: img8 },
    { id: '9', src: img9 },
    { id: '10', src: img10 },
    { id: '11', src: img11 },
  ];
  // const images = [
  //   { id: '1', src: img1 , name: 'Item 1' },
  //   { id: '2', src: img2 , name: 'Item 2'},
  //   { id: '3', src: img3 , name: 'Item 3'},
  //   { id: '4', src: img4 , name: 'Item 4'},
  //   { id: '5', src: img5 , name: 'Item 5'},
  //   { id: '6', src: img6 , name: 'Item 6'},
  //   { id: '7', src: img7 , name: 'Item 7'},
  //   { id: '8', src: img8 , name: 'Item 8'},
  //   { id: '9', src: img9 , name: 'Item 9'},
  //   { id: '10', src: img10 , name: 'Item 10'},
  //   { id: '11', src: img11 , name: 'Item 11'},
  // ];

  const [imageList, setImageList] = useState(images);
  const [seclete, setSeclete] =useState(false)
  const [count, setCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(imageList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImageList(items);
  };

  const toggleSeclete = e =>{
    setSeclete(e.target.checked)
  }

  const hendleClick= e=>{
    setCount(count + 1);
  }

 

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="gridd">
        <div className="line">
          
         {seclete &&  <div className="row">
                          <div className="col-md-6">
                            <p className="text-start p-2">Seleted Item:{count}</p>
                          </div>
                          <div className="col-md-6 ">
                          <p className='text-end p-2' ><a href="#" 
                           className="link-danger ">Delete File</a></p>
                            </div>                
                       </div> 
         ||
         <p className="text-start p-2"> Gallery </p>
         }
          
          <hr />
        </div>
        <Droppable droppableId="gallery" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="row"
            >
              {imageList.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                    className={`col-md-${index % 12 === 0 ?5 : index % 2 === 6 ? 7 : index % 2 === 2 ? 4 : 4} p-2 `}
                    // style={index % 12 === 0 ? { height: '295px' ,width:'100%' } : {}}
                    
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="card">
                        <img src={image.src} className="image" alt="..." />
                        <div class="middle">
                        <div class="form-check ">
                            <input class="form-check-input checkbox" onChange={toggleSeclete} onClick={hendleClick} type="checkbox" value="" id="flexCheckDefault"/>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Home;
