import { Component } from 'react';
import Tilt from 'react-parallax-tilt';
import { Modal } from 'react-bootstrap';
import './About.css';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: [ false, false, false, false]
    }
  }

  openModal = (idx) => {
    let newArr = [false, false, false, false];
    newArr[idx] = true;
    this.setState({ isOpen: newArr});
  }

  closeModal = () => {
    this.setState({ isOpen: [false, false, false, false]});
  }

  render() {

    let personArray = [{
      name: 'Keyan Tabor',
      shortBio: 'Keyan spent 4 years in the United States Marine Corps as an 0311 Infantryman.',
      bio: 'Keyan lives in upstate South Carolina with his wife Whitney and his daughter Alice.They have 2 cats Jekyll and Clyde (yes this was intentional). Prior to attending Code Fellows, Keyan spent 4 years in the United States Marine Corps as an 0311 Infantryman. Upon exiting the Marine Corps, Keyan was in search of what to do with his life next. He took on an apprenticeship working in a factory that built gas tanks for a variety of vehicles. He knew right away this wasnt a long term solution. The timing worked out perfectly because at the same time Solana NFTs took off. As soon as he got involved he was hooked. He now works towards becoming a fullstack software developer so he can return to the community with the ability to be involved in and help build out the next generation of the web (web3).',
      imgSrc: 'https://i.imgur.com/tpxB7Vo.png',
    },
    {
      name: 'DeShon Dixon',
      shortBio: 'Hey! I’m DeShon Dixon. US Army Veteran transitioning into software development.',
      bio: 'Hey! I’m DeShon Dixon. US Army Veteran transitioning into software development. I’ve chosen to transition into software development because I wanted a career where my work is meaningful and I can see the results of my hard work. The experience I’ve gained while in the military has instilled the ability to adapt in self-starting and collaborative environments.',
      imgSrc: 'https://avatars.githubusercontent.com/u/107225817?s=400&u=e5bf8fd83578ecaaa45d1820a9101f13ef7646d0&v=4',
    },
    {
      name: 'Jason Christopher',
      shortBio: 'I’m an Air Force veteran and I currently serve as an officer in the Air Forces Reserves.',
      bio: 'Welcome to our app! My name is Jason Christopher and I’m an Air Force veteran and I currently serve as an officer in the Air Forces Reserves. I excelled in my military career, but I decided to start a new journey and explore software development. I’ve had experience as a leader and project manager in the Air Force and I have test and evaluation experience working with Boeing’s software updates for the mission systems on our aircraft. I have an engineering background from college and I continue to use those analytical and technical skills in my day-to-day work. I hope you enjoy our app!',
      imgSrc: 'https://github.com/jason-christopher/reading-notes/blob/main/Profile%20Pic.jpeg?raw=true',
    },
    {
      name: 'Oliver Speir',
      shortBio: 'Hey I’m Oliver Speir! I’m a passionate Software Engineer with experience in full MERN stack.',
      bio: 'Hey I’m Oliver Speir! I’m a passionate Software Engineer with experience in full MERN stack. I approach every opportunity with excitement and an open mind. I strive to create value through my detail oriented approach to problem solving. I balance my attention to detail by maintaining a creative mindset. By consistently asking myself if there is a better way to arrive at the solution I’m working toward I gain experience not just in problem solving but creative thinking with every challenge I meet. I am currently expanding my skills to include Python, in hopes of becoming a complete package ready for deployment in any environment. This project has been a blast for me, so thank you for taking the time to engage with it!',
      imgSrc: 'https://i.imgur.com/2WJ1vWM.png',
    }
    ]

    let allCards = personArray.map((item, idx) => {
      return (
        <Tilt key={idx}>
          <div className="glassCard">
            <div className="glassContent">
              <h2 className="glassHeader">Team SA</h2>
              <h3 className="glassName">{item.name}</h3>
              <p className="glassBio">{item.shortBio}</p>
              <button onClick={() => this.openModal(idx)}>Read More</button>
            </div>
          </div>
        </Tilt>
      )
    })

    let allModals = personArray.map((item, idx) => {
      return (
        <Modal 
          dialogClassName="modal-90w public-profile-modal-class"
          size='lg'
          aria-labelledby="example-custom-modal-styling-title"
          className="modal"
          show={this.state.isOpen[idx]} 
          onHide={() => this.closeModal()}
          key={idx}
        >
          <Modal.Header closeButton>
            <img src={item.imgSrc} alt={item.name} />
            <Modal.Title className="modalTitle">{item.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{item.bio}</p>
          </Modal.Body>
        </Modal>
      )
    })

    return (
      <>
        <div className="glassContainer">
          {allCards}
        </div>
        {allModals}
      </>
    )
  };
};


export default About;
