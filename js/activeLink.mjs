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

        this.#allLinks.some(link => {
            if (link.href === event.newURL) {
                link.classList.add('active-link');
                this.#activeLink = link;
                return true
            }
        })
    }
}

export { ActiveLink };
