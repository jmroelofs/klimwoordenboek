class ActiveLink {
    allLinks;
    activeLink;

    setActive = (event) => {
        this.activeLink?.classList.remove('active-link');

        this.allLinks.some(link => {
            if (link.href === event.newURL) {
                link.classList.add('active-link');
                this.activeLink = link;
                return true
            }
        })
    }

    setupLinks = links => {
        this.allLinks = Array.from(links);
        this.setActive({ newURL: window.location.href });
        window.addEventListener('hashchange', this.setActive)
    }
}

export { ActiveLink };
