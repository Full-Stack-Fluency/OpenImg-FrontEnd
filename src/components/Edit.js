import { Component } from 'react';
import { Accordion, Button, Spinner } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import FormModal from './FormModal';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      itemToChange: {},
      isModalShown: false,
      loading: false,
    }
  }

  getItems = async () => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        let config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/item',
          headers: {
            "Authorization": `Bearer ${jwt}`
          },
          params: {
            "email": `${this.props.auth0.user.email}`
          }
        }
        let itemResults = await axios(config);
        this.setState({
          results: itemResults.data
        });
      }
    } catch (error) {
    }
  }

  handleOpenModal = (itemToUpdate) => {
    this.setState({
      isModalShown: true,
      itemToChange: itemToUpdate
    })
  }

  handleCloseModal = () => {
    this.setState({
      isModalShown: false,
    })
  }

  handleEditItem = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    try {
      let reqbodyObj = { prompt: e.target.prompt.value }
      let config = {
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/item/generate',
        data: reqbodyObj
      }
      let newGeneratedImg = await axios(config);
      let newItem = {
        prompt: e.target.prompt.value || this.state.itemToChange.prompt,
        imgSrc: newGeneratedImg.data.data[0].url || 'Image could not be created',
        userEmail: this.state.itemToChange.userEmail,
        __v: this.state.itemToChange.__v,
        _id: this.state.itemToChange._id
      }
      let url = `${process.env.REACT_APP_SERVER}/item/${newItem._id}`;
      let updateItemObj = await axios.put(url, newItem);
      let updatedResultsArray = this.state.results.map(item => {
        return item._id === newItem._id ? updateItemObj.data : item;
      });
      this.setState({
        results: updatedResultsArray,
        loading: false,
      });
    } catch (err) {
    }
  }

  handleDeleteItem = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/item/${id}`;
      await axios.delete(url);
      let updatedResults = this.state.results.filter(item => item._id !== id);
      this.setState({
        results: updatedResults
      })
    } catch (error) {
    }
  }

  componentDidMount() {
    this.getItems();
  }

  render() {

    let accordionItems = this.state.results.map((item, idx) => {
      return (
        <Accordion.Item key={idx}>
          <Accordion.Header>{item.prompt}</Accordion.Header>
          <Accordion.Body>
            {this.state.loading ? <Spinner animation="border" /> : <img src={item.imgSrc} alt="Generated with Dall-E 2" />}
            <Button
              onClick={() => this.handleOpenModal(item)}
            >Edit Item</Button>
            <Button
              onClick={() => this.handleDeleteItem(item._id)}
            >Delete Item</Button>
          </Accordion.Body>
        </Accordion.Item>
      )
    });

    return (
      <>
        <Accordion>
          {accordionItems === [] ? <Spinner animation="border" /> : accordionItems}
        </Accordion>
        <Button className="button" onClick={this.getItems}>Render Page (backup)</Button>
        <FormModal
          handleEditItem={this.handleEditItem}
          handleCloseModal={this.handleCloseModal}
          isModalShown={this.state.isModalShown}
          itemToChange={this.state.itemToChange}
        />
      </>
    );
  }
};
export default withAuth0(Edit);
