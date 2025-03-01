class ActiveLink {
    allLinks;
    activeLink = null;

    setActive = () => {
        const href = window.location.href;

        if (this.activeLink && this.activeLink.href !== href) {
            this.activeLink.classList.remove('active-link');
        }

        this.allLinks.forEach(link => {
            if (link.href === href) {
                link.classList.add('active-link');
                this.activeLink = link;
            }
        })
    }

    setupLinks = links => {
        this.allLinks = links;
        this.setActive();
        window.addEventListener('hashchange', this.setActive)
    }
}

export { ActiveLink };
