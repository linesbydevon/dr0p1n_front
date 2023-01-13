import SVGLinkedIn from "../assets/SVGLinkedIn";
import SVGGithub from "../assets/SVGGithub";
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <ul className="socialLinks">
          <li>
            <a
              href="https://github.com/linesbydevon/dr0p1n_front"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SVGGithub />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/devondevs/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SVGLinkedIn />
            </a>
          </li>
        </ul>
        <h2>DR0P1N</h2>
        <small>&copy;2022 Devon Jones</small>
      </div>
    </footer>
  );
}
