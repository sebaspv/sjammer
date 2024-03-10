import { BsInstagram, BsGithub } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bottom-0 w-screen p-2 md:p-3 text-center mt-10 bg-main text-white">
      <div className="grid grid-cols-2">
        <div className="w-full">
          © {new Date().getFullYear() + " "}
          Space Jammer.
        </div>
        <div className="w-full">Made with ❤️ in Hermosillo and Puebla, Mexico</div>
      </div>
      <p className="my-2 text-xs">
        Licensed under{" "}
        <a
          target="_BLANK"
          href="https://github.com/ulisesvina/space-jammer/blob/master/LICENSE"
          rel="noreferrer"
        >
          <span className="underline">GNU General Public License 3.0</span>
        </a>
      </p>
    </footer>
  );
};

export default Footer;
