import { throttle } from './es-toolkit/throttle.mjs';

class FlowingColumns {
    constructor() {
        if (this.#column) {
            this.#mediaQuery.addEventListener('change', event => this.#matchesMedia = event.matches);
            const
                throttledFlowColumns = throttle(this.#flowColumns, 75),
                updateFlowColumns = () => window.dispatchEvent(new Event('update-flow'));
            ['scroll', 'resize', 'update-flow'].forEach(event =>
                window.addEventListener(event, throttledFlowColumns, { passive: true })
            );
            updateFlowColumns()
            document.fonts.ready.then(updateFlowColumns);
        }
    }

    #column = document.querySelector('.continuous-column');
    #lineHeight = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('line-height'));
    #container = this.#column?.querySelector('#column-container');
    #spacer = this.#column?.querySelector('#spacer');

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
                - roundedOffset
                + 5 * this.#lineHeight; // top margin + 2 * bottom margin

        this.#column.style.cssText =
            `--offset-remainder: ${remainder}px;` +
            `--column-offset: ${roundedOffset}px;` +
            `--spacer-height: ${wantedBottomOffset}px;` +
            `--spacer-display: ${wantedBottomOffset  > 0 ? 'block' : 'none'};`;
    };
}

export default FlowingColumns;
