import './about.css';
import { useState } from 'react';
import Loader from '../../components/loader/Loader';


const About = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="about">
      <section className="about__section">
        <h2>Welcome to Hotthorn</h2>
        <p>
        Hotthorn is a platform dedicated to developers and tech enthusiasts. It provides a space for showcasing creative work, projects, and sharing the journey of building them.
        </p>
      </section>

      <section className="about__stats">
        <div className="about__stats-item">
          <h3>5+</h3>
          <p>Developers</p>
        </div>
        <div className="about__stats-item">
          <h3>2+</h3>
          <p>Organizations</p>
        </div>
        <div className="about__stats-item">
          <h3>10+</h3>
          <p>Projects</p>
        </div>
        <div className="about__stats-item">
          <h3>99%</h3>
          <p>Connection Rate</p>
        </div>
      </section>

      <section className="about__section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to offer developers a stage to present their work, along with insights into the challenges, triumphs, and stories behind their projects. Hotthorn focuses on providing a supportive community for tech individuals to connect and learn from each other.
        </p>
      </section>

      <section className="about__section">
        <h2>Key Features</h2>
        <ul>
          <li>Webscraping Capabilities: Hotthorn uniquely incorporates webscraping to showcase developers' websites before entering the website of the developer.</li>
          <li>Showcase Your Work: Share your creative projects, highlight the pros and cons, and narrate the journey of building them.</li>
          <li>Community Hub: Connect with other developers, learn from their experiences, and foster a community that appreciates technology and creativity.</li>
        </ul>
      </section>

      <section className="about__contact">
        <h2>Connect with Me</h2>
        <p>Feel free to connect with me on GitHub and LinkedIn:</p>
        <div className="about__contact-links">
          <a href="https://github.com/DorielShacham" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/doriel-shacham/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
