import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import axios from "axios";

const ProductComponent = (props) => {
  //Delete
  const handleDel = (id) => {
    axios
      .delete(`http://localhost/ApiRedux/blogs.php/${id}/delete`)
      .then(function (response) {
        window.location.reload(false);
      });
  };
  if (props.search == "") {



    const renderList = props.currentBlogs.map((product) => {
      const { id, title, img, content } = product;

      return (

       

          <Row xs={1} md={3} >
            <Col>
              <CardGroup>
                <Card key={id} className="mt-4">
                  <Card.Img variant="top" src={img} style={{ height: '300px' }} />
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                      {content}
                    </Card.Text>
                    {sessionStorage.getItem("role") == "admin" ? (
                      <Button onClick={() => handleDel(id)} variant="danger">
                        Delete
                      </Button>
                    ) : null}
                    {sessionStorage.getItem("role") == "admin" ? (
                      <Link className="btn btn-info my-2" to={`/product/${id}`}>
                        Edite
                      </Link>
                    ) : null}
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>
          </Row>
    
        // <div className="col" key={id}>


        //     <div className="ui link cards">
        //       <div className="card">
        //         <div className="image">
        //           <img src={img} alt={title} />
        //         </div>
        //         <div className="content">
        //           <div className="header">{title}</div>
        //           <div className="meta">{content}</div>
        //         </div>
        //         {sessionStorage.getItem("role") == "admin" ? (
        //           <Button onClick={() => handleDel(id)} variant="danger">
        //             Delete
        //           </Button>
        //         ) : null}
        //         {sessionStorage.getItem("role") == "admin" ? (
        //           <Link className="btn btn-info" to={`/product/${id}`}>
        //             Edite
        //           </Link>
        //         ) : null}
        //       </div>
        //     </div>
        //   </div>


      );
    });
    return <>{renderList}</>;
  } else {
    const filteredData = props.all.filter((el) => {
      return el.title.toLowerCase().includes(props.search);
    });

    const renderList = filteredData.map((product) => {
      const { id, title, img, content } = product;
      return (

        <Row xs={1} md={2} >
          {Array.from({ length: 4 }).map((_, idx) => (
          <Col>

            <Card key={id} className="mt-4">
              <Card.Img variant="top" src={img} style={{ height: '300px' }} />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                  {content}
                </Card.Text>
                {sessionStorage.getItem("role") == "admin" ? (
                  <Button onClick={() => handleDel(id)} variant="danger">
                    Delete
                  </Button>
                ) : null}
                {sessionStorage.getItem("role") == "admin" ? (
                  <Link className="btn btn-info" to={`/product/${id}`}>
                    Edite
                  </Link>
                ) : null}
              </Card.Body>
            </Card>
          </Col>
          ))}
        </Row>
        // <div className="col mb-5" key={id}>
        //   <div className="ui link cards">
        //     <div className="card">
        //       <div className="image">
        //         <img src={img} alt={title} />
        //       </div>
        //       <div className="content">
        //         <div className="header">{title}</div>
        //         <div className="meta">{content}</div>
        //       </div>
        //       {sessionStorage.getItem("role") == "admin" ? (
        //         <Button onClick={() => handleDel(id)} variant="danger">
        //           Delete
        //         </Button>
        //       ) : null}
        //       {sessionStorage.getItem("role") == "admin" ? (
        //         <Link className="btn btn-info" to={`/product/${id}`}>
        //           Edit
        //         </Link>
        //       ) : null}
        //     </div>
        //   </div>
        // </div>
      );
    });
    return <>{renderList}</>;
  }
};

export default ProductComponent;
