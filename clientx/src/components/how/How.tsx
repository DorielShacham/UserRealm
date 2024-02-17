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
        "Create your account by clicking the Register button and entering your name, email, and password.",
      ],
      image: "../../images/register.jpg",
    },
    {
      title: "blog",
      category: "blog",
      description: [
        "This section showcases various projects created by our community members.",
        "Share your latest projects, websites, and apps to inspire others and get inspired!",
      ],
      image: "../../images/createblog.jpg",
    },
    {
      title: "viewlike",
      category: "viewlike",
      description: [
        "Only signed-up users can like other members' blog posts and contribute to the blog.",
        "Join our community today to interact with other developers and share your thoughts!",
      ],
      image: "../../images/viewandlike.jpg",
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
        Join the community today by signing up, by signing up <br />
        you can create, edit & like other memebers blog posts <br />
        and view other developer blogs to be inspired by the projects of others.
      </p>
      <div className="container services__container">
        <ul className="services__left">
          <li className="service__item account active">
            <span>
              <i className="fa fa-id-badge" aria-hidden="true"></i>
            </span>
            <div>
              <h3>Create account</h3>
            </div>
          </li>
          <li className="service__item blog">
            <span>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </span>
            <div>
              <h3>Create your blog</h3>
            </div>
          </li>
          <li className="service__item viewlike">
            <span>
              <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
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
          {/* <h3>Title</h3>
            <p>
                Paragraph
            </p>
            <p>
                Paragraph
            </p>
            <p>
                Paragraph
            </p> --> */}
        </article>
      </div>
    </section>
  );
};
