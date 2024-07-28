import Logo from "../common/Logo";

export default function Footer() {
  return (
    // <footer className="footer bg-neutral text-neutral-content items-center p-3 w-full mx-3">
    //   <aside className="grid-flow-col items-center">
    //     <Logo />
    //     <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
    //   </aside>
    //   <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
  


    //   </nav>
    // </footer>

    <footer className="footer bg-neutral text-neutral-content items-center p-4">
  <aside className="grid-flow-col items-center">
    <Logo />
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a
          href="https://www.linkedin.com/in/satvick-pathak-384956204"
          target="_blank"
          rel="noopener noreferrer"
          className="tooltip"
          data-tip="Linkedin"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.25 20h-3v-10.5h3v10.5zm-1.5-12c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm14.25 12h-3v-5.5c0-1.376-1.124-2.5-2.5-2.5s-2.5 1.124-2.5 2.5v5.5h-3v-10.5h3v1.5c.878-1.146 2.256-1.5 3.5-1.5 2.481 0 4.5 2.019 4.5 4.5v6z"></path>
          </svg>
        </a>
   <a
          href="https://github.com/Satvickk"
          target="_blank"
          rel="noopener noreferrer"
          className="tooltip"
          data-tip="Github"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.111.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.389-1.333-1.759-1.333-1.759-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.239 1.84 1.239 1.071 1.835 2.809 1.305 3.494.998.109-.775.42-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.931 0-1.312.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.982-.399 3.003-.404 1.02.005 2.047.138 3.005.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.909 1.235 3.221 0 4.61-2.804 5.625-5.475 5.921.432.371.817 1.102.817 2.222v3.293c0 .322.218.694.825.576 4.765-1.586 8.198-6.082 8.198-11.382 0-6.627-5.373-12-12-12z"></path>
          </svg>
        </a>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
      </svg>
    </a>
  </nav>
</footer>
  );
}
