import { useEffect } from "react";
import "./how.css";

import registerImage from "../../images/register.jpg";
import createBlogImage from "../../images/createblog.jpg";
import viewAndLikeImage from "../../images/viewandlike.jpg";

export const How = () => {
  const servicesData = [
    {
      title: "account creation",
      category: "account",
      description: [
        "Create your account by clicking the Register button and entering your name, email, and password.",
      ],
      image: registerImage,
    },
    {
      title: "blog creation",
      category: "blog",
      description: [
        "This section showcases various projects created by our community members.",
        "Share your latest projects, websites, and apps to inspire others and get inspired!",
      ],
      image: createBlogImage,
    },
    {
      title: "view & like",
      category: "viewlike",
      description: [
        "Only signed-up users can like other members' blog posts and contribute to the blog.",
        "Join our community today to interact with other developers and share your thoughts!",
      ],
      image: viewAndLikeImage,
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
    <img src="${details.image}" alt="${details.title}" />
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
        you can create, edit & like other members' blog posts <br />
        and view other developer blogs to be inspired by the projects of others.
      </p>
      <hr />
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

        <article className="services__right">
          {/* Content will be dynamically generated here */}
        </article>
      </div>
    </section>
  );
};
