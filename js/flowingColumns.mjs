import throttle from './lodash/throttle.js';

class FlowingColumns {
    constructor() {
        if (this.#column) {
            this.#mediaQuery.addEventListener('change', event => this.#matchesMedia = event.matches);
            this.#flowColumns();
            ['scroll', 'resize'].forEach(event =>
                window.addEventListener(event, throttle(this.#flowColumns, 100), { passive: true })
            );
        }
    }

    #column = document.querySelector('.continuous-column');
    #spacer = this.#column?.querySelector('#spacer');
    #lineHeight = this.#column
        ? parseFloat(window.getComputedStyle(this.#column).getPropertyValue('line-height'))
        : null;
    #container = this.#column?.querySelector('#column-container');

    #mediaQuery = window.matchMedia('screen and (width > 800px) and (device-width >= 750px)');
    #matchesMedia = this.#mediaQuery.matches;

    #roundNearest = (value, interval) => {
        const rounded = interval * Math.round(value / interval);
        return { rounded: rounded, remainder: value - rounded };
    };

    #flowColumns = event => {
        if (! this.#matchesMedia) {
            return;
        }

        const
            windowHeight = document.documentElement.clientHeight,
            { rounded: roundedOffset, remainder } = this.#roundNearest(window.scrollY, this.#lineHeight),
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
                - roundedOffset;

        this.#column.style.cssText =
            `--offset-remainder: ${remainder}px;` +
            `--column-offset: ${roundedOffset}px;` +
            `--spacer-height: ${wantedBottomOffset}px;`;
    };
}

export default FlowingColumns;
