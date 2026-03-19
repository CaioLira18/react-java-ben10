import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';


export const Header = () => {
    const location = useLocation();
    const isHome = useLocation('/')

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    /* ================= SCROLL DETECTION ================= */
    useEffect(() => {
        if (!isHome) return;

        const handleScroll = () => {
            setScrolled(window.scrollY > 60);

            const sections = ['character'];

            for (const sec of sections) {
                const el = document.getElementById(sec);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(sec);
                        return;
                    }
                }
            }
            setActiveSection('');
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    const mouseMoveRef = useRef(null);

    useEffect(() => {
        if (!mouseMoveRef.current) {
            mouseMoveRef.current = (e) => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';

                sparkle.style.left = e.pageX + 'px';
                sparkle.style.top = e.pageY + 'px';

                const directionX = (Math.random() - 0.5) * 100;
                const directionY = (Math.random() - 0.5) * 100;

                sparkle.style.setProperty('--x', `${directionX}px`);
                sparkle.style.setProperty('--y', `${directionY}px`);

                const size = Math.random() * 8;
                sparkle.style.width = size + 'px';
                sparkle.style.height = size + 'px';

                document.body.appendChild(sparkle);

                setTimeout(() => sparkle.remove(), 800);
            };
        }

        return () => {
            document.removeEventListener('mousemove', mouseMoveRef.current);
        };
    });

    /* ================= LINKS DINÂMICOS ================= */
    const navLinks = [
        { label: 'home', href: '/', id: 'home' },
        ...(isHome ? [
            { label: 'characters', href: '#character', id: 'character' },
        ] : [])
    ];

    return (
        <header className={`hd ${scrolled ? 'hd--scrolled' : ''} ${menuOpen ? 'hd--open' : ''}`}>
            <div className="hd__top-line" />

            <div className="hd__inner">

                {/* Logo */}
                <a href="/" className="hd__logo">
                    <img
                        src=""
                        alt="Ben 10 logo"
                    />
                </a>

                {/* Desktop nav */}
                <div className="hd__nav__container">
                    <nav className="hd__nav">
                        {navLinks.map((link) => (
                            <Link
                                key={link.id}
                                to={link.href}
                                className={`hd__link ${activeSection === link.id ? 'hd__link--active' : ''}`}
                            >
                                {link.label}
                                <span className="hd__link-dot" />
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Mobile nav */}
            <div className={`hd__mobile-nav ${menuOpen ? 'hd__mobile-nav--open' : ''}`}>
                {navLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.href}
                        className="hd__mobile-link"
                        onClick={() => setMenuOpen(false)}
                    >
                        <span className="hd__mobile-gem">✦</span>
                        {link.label}
                    </a>
                ))}
            </div>
        </header>
    );
};

export default Header;