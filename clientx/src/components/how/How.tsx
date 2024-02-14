import { useEffect } from "react";
import "./how.css";

export const How = () => {
  interface data {
    title: string;
    category: string;
    description: any;
  }
  const servicesData = [
    {
      title: "account",
      category: "account",
      description: [
        "Create your account by clicking the sign-up button and entering your name, email, and password.",
      ],
      image: "path/to/blog-image.jpg",
    },
    {
      title: "blog",
      category: "blog",
      description: [
        "This section showcases various projects created by our community members.",
        "Share your latest projects, websites, and apps to inspire others and get inspired!",
      ],
      image: "path/to/blog-image.jpg",
    },
    {
      title: "viewlike",
      category: "viewlike",
      description: [
        "Only signed-up users can like other members' blog posts and contribute to the blog.",
        "Join our community today to interact with other developers and share your thoughts!",
      ],
      image: "path/to/blog-image.jpg",
    },
  ];

  useEffect(() => {
    const serviceBtns = document.querySelectorAll(
      ".service__item"
    ) as NodeListOf<HTMLButtonElement>;
    const serviceDetails = document.querySelector(
      ".services__right"
    ) as HTMLElement;

    const getService = (category: string) => {
      const details: any = servicesData.find(
        (item: { category: any }) => item.category === category
      );
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
  }, []);

  return (
    <section className="services" id="services">
      <h1>How it Works</h1>
      <p>
        Join the community today by signing up, by signing up you can create
        edit & like other memebers blog posts <br />
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
