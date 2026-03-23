import { useState, useEffect, type ReactNode } from "react";

interface NavItem {
  key: string;
  label: string;
  href: string;
  active: boolean;
}

interface NavProps {
  navItems: NavItem[];
  children?: ReactNode;
  actions?: ReactNode;
}

export default function Nav({ navItems, children, actions }: NavProps) {
  const slotContent = actions ?? children;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (open) root.classList.add("menu-open");
    else root.classList.remove("menu-open");
    return () => root.classList.remove("menu-open");
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div className={`header-1__menu${open ? " _open" : ""}`}>
        <nav className="header-1__menu-nav" aria-label="Main navigation">
          <ul className="header-1__menu-list" id="site-menu">
            <li className="header-1__menu-item-logo">
              <a
                href="/"
                className="menu__close"
                aria-label="Close menu"
                onClick={closeMenu}
              />
            </li>
            {navItems.map((item) => (
              <li className="header-1__menu-item" key={item.key}>
                <a
                  href={item.href}
                  className={`header-1__menu-link menu__close${item.active ? " is-active" : ""}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="header-1__buttons">
        <div className="header_login_buttons">{slotContent}</div>
      </div>

      <button
        className="header-1__menu-burger icon-menu"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
      </button>
    </>
  );
}
