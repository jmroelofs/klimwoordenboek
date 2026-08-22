class FlowingColumns {
    constructor() {
        if (this.#column) {
            this.#mediaQuery.addEventListener('change', event => this.#matchesMedia = event.matches);
            this.#handleEvent(new Event('init'));
            ['scroll', 'resize'].forEach(event =>
                window.addEventListener(event, this.#handleEvent, { passive: true })
            );
        }
    }

    #animationFrameId = null;

    #column = document.querySelector('.continuous-column');
    #spacer = this.#column?.querySelector('#spacer');
    #lineHeight = this.#column
        ? parseFloat(window.getComputedStyle(this.#column).getPropertyValue('line-height'))
        : null;
    #container = this.#column?.querySelector('#column-container');

    #mediaQuery = window.matchMedia('screen and (width > 800px) and (device-width >= 750px)');
    #matchesMedia = this.#mediaQuery.matches;

    #diffMoreThan = (x, y, threshold) => Math.abs(x - y) > threshold;
    #roundNearest = (value, interval) => { 
        const rounded = interval * Math.round(value / interval);
        return { rounded: rounded, remainder: value - rounded };
    };

    #flowColumns = () => {
        const
            windowHeight = document.documentElement.clientHeight,
            {rounded: roundedOffset, remainder} = this.#roundNearest(window.scrollY, this.#lineHeight),
            { height: spacerHeight } = this.#spacer.getBoundingClientRect(),
            [
                { height: leftColumnHeight },
                { height: rightColumnHeight = 0 } = {} 
            ] = this.#container.getClientRects(),
            wantedBottomOffset = 
                 leftColumnHeight 
                 + rightColumnHeight 
                 - spacerHeight 
                 - 2 * windowHeight 
                 - roundedOffset

        this.#column.style.cssText = 
            `--offset-remainder: ${remainder}px;` +
            `--column-offset: ${roundedOffset}px;` + 
            `--spacer-height: ${wantedBottomOffset}px;`;

        this.#animationFrameId = null;
    };

    #handleEvent = event => {
        if (this.#animationFrameId) {
            console.log(`[flowColumns] resetting animation in ${event.type} event`);
            window.cancelAnimationFrame(this.#animationFrameId);
            this.#animationFrameId = null;
        }

        if (! this.#matchesMedia) {
            return;
        }

        this.#animationFrameId = window.requestAnimationFrame(this.#flowColumns);
    };
}

export { FlowingColumns };
