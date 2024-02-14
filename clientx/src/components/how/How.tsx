import './how.css';

export const How = () => {
  const servicesData: any = [
    {
      title: "account",
      category: "account",
      description: [
        "I'm a versatile web developer with expertise in HTML, CSS, and TypeScript. In HTML, I structure content effectively, utilizing HTML5 for multimedia. CSS mastery enables precise styling, responsive design, and dynamic animations. TypeScript adds a layer of reliability to my coding, ensuring clean and efficient development for exceptional web projects.",
      ],
    },
    {
      title: "blog",
      category: "blog",
      description: [
        "I'm a dynamic developer skilled in both front-end and back-end technologies. On the front end, I specialize in crafting engaging user interfaces using React. On the back end, I excel in creating robust server-side logic and APIs using technologies like Node.js. My expertise in TypeScript enhances code reliability, and my commitment to staying current ensures I deliver cutting-edge solutions.",
      ],
    },
    {
      title: "viewlike",
      category: "viewlike",
      description: [
        "I am highly proficient in WebdriverIO, a leading test automation framework used to automate web applications." +
          " <br> <br> " +
          "With WebdriverIO, I harness its capabilities to create robust and automated test scripts for web applications. I can efficiently locate web elements, perform actions like clicking and typing, and validate expected behaviors, ensuring high-quality software." +
          " <br> <br> " +
          "I excel in utilizing WebdriverIO's advanced features such as browser management, parallel test execution, and integration with various testing frameworks. This expertise enables me to conduct comprehensive and efficient testing, ensuring software reliability and performance across different environments and platforms.",
      ],
    },
  ];
  
  const serviceBtns = document.querySelectorAll(
    ".service__item"
  ) as NodeListOf<HTMLButtonElement>;
  const serviceDetails = document.querySelector(
    ".services__right"
  ) as HTMLElement;
  
  const getService = (category: string) => {
    const details = servicesData.find(
      (item: { category: any }) => item.category === category
    );
    console.log(details);
    serviceDetails.innerHTML = `
  <h3>${details.title}</h3>
  ${details.description
    .map((paragraph: string) => "<p>" + paragraph + "</p>")
    .join("")}`;
  };
  
  const removeActiveClass = () => {
    serviceBtns.forEach((activeClass) => {
      activeClass.classList.remove("active");
    });
  };
  
  serviceBtns.forEach((item) => {
    item.addEventListener("click", () => {
      removeActiveClass();
      const serviceClass = item.classList[1];
      console.log(serviceClass);
      getService(serviceClass);
      item.classList.add("active");
    });
  });
  
  getService("account");

  return (
    <section className="services" id="services">
      <h1>How it Works</h1>
      <p>
        Create your account then create A blog post, edit your blog post if
        needed <br />
        and view other developer blogs to be inspired by the creations of
        others.
      </p>
      <div className="container services__container">
        <ul className="services__left">
          <li className="service__item account active">
            <span>
              <i className="fas fa-laptop"></i>
            </span>
            <div>
              <h3>Create account</h3>
            </div>
          </li>
          <li className="service__item blog">
            <span>
              <i className="fas fa-database"></i>
            </span>
            <div>
              <h3>Create your blog</h3>
            </div>
          </li>
          <li className="service__item viewlike">
            <span>
              <i className="fas fa-robot"></i>
            </span>
            <div>
              <h3>View & Like</h3>
            </div>
          </li>
        </ul>

        <article
          className="services__right"
          data-aos="fade-in"
          data-aos-delay="200"
        >
          {/* <!-- <h3>HTML CSS</h3>
            <p>
                I possess strong expertise in HTML (Hypertext Markup Language) and CSS (Cascading Style Sheets), foundational skills in web development.
            </p>
            <p>
                With HTML, I skillfully utilize various tags to structure web content. These include tags for headings, paragraphs, lists, and tables. I also leverage HTML5's capabilities for embedding multimedia elements, which enhances both the aesthetics and accessibility of web pages.
            </p>
            <p>
                In CSS, I'm adept at using selectors to precisely target HTML elements for styling. This includes applying fonts, colors, spacing, and responsive design. My proficiency in CSS3 enables me to implement animations and transitions for dynamic web experiences, ensuring consistent and polished appearances across different devices and browsers.
            </p> --> */}
        </article>
      </div>
    </section>
  );
};
