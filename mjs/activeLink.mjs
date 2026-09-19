class ActiveLink {
    constructor(links) {
        this.#allLinks = [...links];
        this.#setActive({ newURL: window.location.href });
        window.addEventListener('hashchange', this.#setActive, { passive: true })
    }

    #allLinks;
    #activeLink;

    #setActive = event => {
        this.#activeLink?.classList.remove('active-link');
        this.#activeLink = this.#allLinks.find(link => link.href === event.newURL);
        this.#activeLink?.classList.add('active-link');
    }
}

export default ActiveLink;
