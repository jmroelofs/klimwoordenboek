export default function activeLink(links) {
    let activeLink;

    const setActive = event => (
        activeLink?.classList.remove('active-link'),
        activeLink = [...links].find(link => link.href === event.newURL)
    )?.classList.add('active-link');

    setActive({ newURL: window.location.href });
    window.addEventListener('hashchange', setActive, { passive: true });
}
