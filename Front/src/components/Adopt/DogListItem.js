import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

function DogListItem({ dog, media }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/adopt/${dog.id}`);
  };

  const isVideo = (media) => {
    return (
      media && (media.includes(".mp4") ||
      media.includes(".avi") ||
      media.includes(".mov"))
    );
  };

  const renderMedia = (media) => {
    if (isVideo(media)) {
      return (
        <div style={{ width: "100%", height: 0, paddingTop: "56.25%", position: "relative" }}>
          <video
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
            src={media}
            autoPlay
            loop
            muted
          />
        </div>
      );
    } else {
      return <Card.Img variant="top" src={media} />;
    }
  };

  return (
    <Card style={{ width: "18rem" }} onClick={handleClick}>
      {renderMedia(media)}
      <Card.Body>
        <Card.Title>{dog.title}</Card.Title>
        <Card.Text>이름: {dog.name}</Card.Text>
        <Card.Text>나이: {dog.age}세</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default DogListItem;
