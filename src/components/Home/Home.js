import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

// Import your images here...
import img1 from "../../images/img1.jpeg";
import img2 from "../../images/img2.jpeg";
import img3 from "../../images/img3.jpeg";
import img4 from "../../images/img4.jpeg";
import img5 from "../../images/img5.jpeg";
import img6 from "../../images/img6.jpeg";
import img7 from "../../images/img7.jpeg";
import img8 from "../../images/img8.jpeg";
import img9 from "../../images/img9.jpeg";
import img10 from "../../images/img10.jpeg";
import img11 from "../../images/img11.jpeg";

const Home = () => {
  const images = [
    { id: "1", src: img1 },
    { id: "2", src: img2 },
    { id: "3", src: img3 },
    { id: "4", src: img4 },
    { id: "5", src: img5 },
    { id: "6", src: img6 },
    { id: "7", src: img7 },
    { id: "8", src: img8 },
    { id: "9", src: img9 },
    { id: "10", src: img10 },
    { id: "11", src: img11 },
  ];

  const [imageList, setImageList] = useState(images);
  const [selectedImages, setSelectedImages] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(imageList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImageList(items);
  };

  const toggleSelect = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages((prevSelectedImages) =>
        prevSelectedImages.filter((id) => id !== imageId)
      );
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };
// deleteSelectedImages 
  const deleteSelectedImages = () => {
    const updatedImageList = imageList.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImageList(updatedImageList);
    setSelectedImages([]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Row>
          <Col>
            <div className="line">
              {selectedImages.length > 0 ? (
                <Row>
                  <Col md={6}>
                    <p className="text-start p-2">
                      Selected Item: {selectedImages.length}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p className="text-end p-2">
                      <Button variant="danger" onClick={deleteSelectedImages}>
                        Delete File
                      </Button>
                    </p>
                  </Col>
                </Row>
              ) : (
                <p className="text-start p-2">Gallery</p>
              )}
              <hr />
            </div>
          </Col>
        </Row>

        <Droppable droppableId="gallery" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="row"
            >
              {imageList.map((image, index) => (
                <Draggable
                  key={image.id}
                  draggableId={image.id}
                  index={index}
                >
                  {(provided) => (
                    <Col
                      md={
                        index % 12 === 0
                          ? 4
                          : index % 2 === 3
                          ? 6
                          : index % 2 === 5
                          ? 12
                          : 2
                      }
                      className="p-2 column"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      
                    >
                      <Card>
                        <Card.Img
                          src={image.src}
                          className="image"
                          alt="..."
                          onClick={() => toggleSelect(image.id)}
                        />
                        <div className="common_overlay">
                          <Form.Check>
                            <Form.Check.Input
                              className="checkbox"
                              type="checkbox"
                              checked={selectedImages.includes(image.id)}
                              onChange={() => toggleSelect(image.id)}
                            />
                          </Form.Check>
                        </div>
                      </Card>
                    </Col>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Container>
    </DragDropContext>
  );
};

export default Home;
