import { useState, type ReactNode } from "react";

interface NavItem {
  key: string;
  label: string;
  href: string;
  active: boolean;
}

interface NavProps {
  navItems: NavItem[];
  children?: ReactNode;
}

export default function Nav({ navItems, children }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nav-wrapper">
      <button
        className={`nav-burger ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-menu ${isOpen ? "is-open" : ""}`}>
        <nav className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`nav-link ${item.active ? "is-active" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">{children}</div>
      </div>
    </div>
  );
}
