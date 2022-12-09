import React, {useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct
} from "../redux/actions/productsActions";
import Page404 from "./Page404";
const ProductDetails = () => {


  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const { id, title, img, content } = product;
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState([]);
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`http://localhost/ApiRedux/blogs.php/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value ,id:id }));
    setFormErrors(validate(name));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost/ApiRedux/blogs.php/${id}`, inputs)
      .then(function (response) {
        console.log(response.data);
      });
    setInputs("");
    
  };

  const [formErrors, setFormErrors] = useState({});
  



  
  const validate = (values) => {
    const errors = {};
    const regex =
        /^[a-zA-Z]*$/;

    if (!values.title) {
        errors.title = "title is required";
    } else if (regex.test(values.title)) {
        errors.title = "Please enter a valid title";
    }


    if (!values.content) {
      errors.content = "content is required";
  } else if (regex.test(values.content)) {
      errors.content = "Please enter a valid content";
  }

    const pregex =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;




    if (!values.img) {
        errors.img = "image is required";
    }else if (pregex.test(values.img)) {
      errors.img = "Please enter a valid image";
  }

    return errors;
};


  return (

<>
    {sessionStorage.getItem("username")!== null?



    <div className="ui grid container mt-5">
      {product.length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="container">
          <div className="ui two column stackable center aligned grid">
            
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={img} />
              </div>
             
              <div className="column rp">
                 <form className=' container' onSubmit={handleSubmit}  >
                <h4 style={{marginTop:"12px"}}>Title</h4>
                <input type='text' name="title" className="ui brown block header" onChange={handleChange} placeholder={title}/>
                <p className="text-danger">{formErrors.title}</p>
                <h4>Content</h4>
                <input type='text' name="content" className="ui brown block header"  onChange={handleChange}  placeholder={content}/>
                <p className="text-danger">{formErrors.content}</p>
                <h4>Image</h4>
                <input type='text' name="img" className="ui brown block header"   onChange={handleChange} placeholder={img}/>
                <p className="text-danger">{formErrors.img}</p>
               <br/>    <br/>    <br/>    <br/>
                <button className="btn btn-info" type="submit">Apply edits</button>
              </form>  
              </div>
            
            </div>
            
          </div>
        </div>
      )
      
      
      }
    </div>
:<Page404/>}
   </> 
  );
};

export default ProductDetails;
