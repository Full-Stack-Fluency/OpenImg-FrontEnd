import { Component } from "react";
import { Card, Spinner } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import Tilt from "react-parallax-tilt";
import axios from "axios";
import FormModal from "./utils/FormModal";
import "bootstrap/dist/css/bootstrap.min.css";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      itemToChange: {},
      isModalShown: false,
      loading: {},
    };
  }
  getItems = async () => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        let config = {
          method: "get",
          baseURL: process.env.REACT_APP_SERVER,
          url: "/item",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          params: {
            email: `${this.props.auth0.user.email}`,
          },
        };
        let itemResults = await axios(config);
        this.setState({
          results: itemResults.data,
        });
      }
    } catch (error) {}
  };

  handleOpenModal = (itemToUpdate) => {
    this.setState({
      isModalShown: true,
      itemToChange: itemToUpdate,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalShown: false,
    });
  };

  handleEditItem = async (e, obj) => {
    e.preventDefault();
    this.setState({
      loading: obj,
    });
    try {
      let reqbodyObj = { prompt: e.target.prompt.value };
      let config = {
        method: "post",
        baseURL: process.env.REACT_APP_SERVER,
        url: "/item/generate",
        data: reqbodyObj,
      };
      let newGeneratedImg = await axios(config);
      let newItem = {
        prompt: e.target.prompt.value || this.state.itemToChange.prompt,
        imgSrc:
          newGeneratedImg.data.data[0].url || "Image could not be created",
        userEmail: this.state.itemToChange.userEmail,
        __v: this.state.itemToChange.__v,
        _id: this.state.itemToChange._id,
      };
      let url = `${process.env.REACT_APP_SERVER}/item/${newItem._id}`;
      let updateItemObj = await axios.put(url, newItem);
      let updatedResultsArray = this.state.results.map((item) => {
        return item._id === newItem._id ? updateItemObj.data : item;
      });
      this.setState({
        results: updatedResultsArray,
        loading: {},
      });
    } catch (err) {}
  };

  handleDeleteItem = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/item/${id}`;
      await axios.delete(url);
      let updatedResults = this.state.results.filter((item) => item._id !== id);
      this.setState({
        results: updatedResults,
      });
    } catch (error) {}
  };

  componentDidMount() {
    this.getItems();
  }

  render() {
    let cardItems = this.state.results.map((item, idx) => {
      return (
        <>
          <div className="glassContainer">
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={800}>
              <Card className="glassCard2" key={idx}>
                {this.state.loading._id === item._id ? (
                  <Spinner animation="border" />
                ) : (
                  <Card.Img
                    src={item.imgSrc}
                    className="cardPic"
                    alt="Generated with Dall-E 2"
                  />
                )}
                <Card.Body className="cardBody">
                  <Card.Title className="cardTitle">
                    {this.state.loading._id === item._id ? (
                      <Spinner animation="border" />
                    ) : (
                      item.prompt
                    )}
                  </Card.Title>
                  <div className="buttonDiv">
                    <button onClick={() => this.handleOpenModal(item)}>
                      Edit Item
                    </button>
                    <button onClick={() => this.handleDeleteItem(item._id)}>
                      Delete Item
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Tilt>
          </div>
        </>
      );
    });

    return (
      <>
        <section className="gridBox">
          {cardItems === [] ? <Spinner animation="border" /> : cardItems}
        </section>
        <FormModal
          handleEditItem={this.handleEditItem}
          handleCloseModal={this.handleCloseModal}
          isModalShown={this.state.isModalShown}
          itemToChange={this.state.itemToChange}
        />
      </>
    );
  }
}

export default withAuth0(Edit);
