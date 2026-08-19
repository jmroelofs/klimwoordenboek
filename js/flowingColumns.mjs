class FlowingColumns {
    constructor() {
        if (this.#columns) {
            this.#mediaQuery.addEventListener('change', event => this.#matchesMedia = event.matches);
            this.#handleEvent(new Event('init'));
            ['scroll', 'resize'].forEach(event =>
                window.addEventListener(event, this.#handleEvent, { passive: true })
            );
        }
    }

    #animationFrameId = null;

    #container = document.querySelector('.continuous-column');
    #columns = document.querySelector('.continuous-column #column-wrapper');

    #lineHeight = this.#columns
        ? parseFloat(window.getComputedStyle(this.#columns).getPropertyValue('line-height'))
        : null;
    #marginTop = this.#container
        ? parseFloat(window.getComputedStyle(this.#container.firstElementChild).getPropertyValue('padding-top'))
        : null;
    #marginBottom = this.#container
        ? parseFloat(window.getComputedStyle(this.#container).getPropertyValue('margin-bottom'))
        : null;

    #mediaQuery = window.matchMedia('screen and (width > 800px) and (device-width >= 750px)');
    #matchesMedia = this.#mediaQuery.matches;

    #diffMoreThan = (x, y, threshold) => Math.abs(x - y) > threshold;
    #roundNearest = (value, interval) => {
        const rounded = interval * Math.round(value / interval);
        return { rounded: rounded, remainder: value - rounded };
    };

    #flowColumns = () => {
        const
            wTop = window.scrollY,
            wHeight = document.documentElement.clientHeight,
            [
                { top: lColTop, bottom: lColBottom, height: lColHeight },
                { top: rColTop, bottom: rColBottom, height: rColHeight = 0 } = {}
            ]
                = this.#columns.getClientRects()



        console.log('a');


        this.#animationFrameId = null;
    };

    #handleEvent = event => {
        if (this.#animationFrameId) {
            console.log(`[flowColumns] resetting animation in ${event.type} event`);
            window.cancelAnimationFrame(this.#animationFrameId);
            this.#animationFrameId = null;
        }

        if (!this.#matchesMedia) {
            return;
        }

        this.#animationFrameId = window.requestAnimationFrame(this.#flowColumns);
    };
}

export { FlowingColumns };
