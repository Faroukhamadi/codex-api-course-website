import React from "react";
import Gh from "./github";
import Tw from "./twitter";
import Li from "./linkedin";

export default function Footer({ twitter, linkedin, github }) {
  return (
    <footer className="footer">
      <ul className="socials">
        {twitter ? (
          <li className="social">
            <a href={`https://twitter.com/${twitter}`} target="_blank">
              <Tw />
            </a>
          </li>
        ) : null}
        {github ? (
          <li className="social">
            <a href={`https://github.com/${github}`} target="_blank">
              <Gh />
            </a>
          </li>
        ) : null}
        {linkedin ? (
          <li className="social">
            <a href={`https://linkedin.com/in/${linkedin}`} target="_blank">
              <Li />
            </a>
          </li>
        ) : null}
      </ul>
    </footer>
  );
}
