export default function activeLink(links) {
    const setActive = event => (
        activeLink?.classList.remove('active-link'),
        activeLink = [...links].find(link => link.href === event.newURL)
    )?.classList.add('active-link');

    let activeLink = null;

    setActive({ newURL: window.location.href });
    window.addEventListener('hashchange', setActive, { passive: true });
}
