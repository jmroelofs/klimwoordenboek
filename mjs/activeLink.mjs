export default function activeLink(links) {
    const
        allLinks = [...links],

        setActive = event => {
            activeLink?.classList.remove('active-link');
            activeLink = allLinks.find(link => link.href === event.newURL);
            activeLink?.classList.add('active-link');
        }

    let activeLink = null;

    setActive({ newURL: window.location.href });
    window.addEventListener('hashchange', setActive, { passive: true });
}
