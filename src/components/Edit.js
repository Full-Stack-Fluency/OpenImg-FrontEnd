import { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import FormModal from './FormModal';


class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      itemToChange: {},
      isModalShown: false
    }
  }

  getItems = async () => {
    console.log('it worked');
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        console.log(jwt);
        let config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/item',
          headers: {
            "Authorization": `Bearer ${jwt}`
          }
        }
        console.log(config);
        let itemResults = await axios(config);
        console.log(itemResults.data);
        this.setState({
          results: itemResults.data
        });

        // console.log(this.state.results);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  handleOpenModal = (itemToUpdate) => {
    console.log(itemToUpdate)
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
    try {
      // need to generate a new URL for the new prompt
      // send URL to the database as new prompt
      // step 1: get target prompt saved to a variable
      // step 2: update the URL for that item
      // step 3: update state and render items


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
      // find the book we updated in state and replace it with the data we got back from the DB
      let updatedResultsArray = this.state.results.map(item => {
        return item._id === newItem._id ? updateItemObj.data : item;
      });
      this.setState({
        results: updatedResultsArray,
      });
    } catch (err) {
      console.log(err.response.data);
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
      console.log(error.response.data);
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
            <img src={item.imgSrc} alt="idk" />
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
        <h2>Test</h2>
        <Accordion>
          {accordionItems}
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
// export default Edit;
