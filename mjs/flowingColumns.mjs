import { throttle } from './es-toolkit/throttle.mjs';

class FlowingColumns {
    constructor() {
        if (! this.#column) {
            return;
        }

        const
            throttledFlowColumns = throttle(this.#flowColumns, 75, { edges: ['trailing'] });

        this.#mediaQuery.addEventListener('change', event => {
            this.#matchesMedia = event.matches;
            throttledFlowColumns();
        });
        ['scroll', 'resize'].forEach(event => {
            window.addEventListener(event, throttledFlowColumns, { passive: true });
        });
        document.fonts.ready.then(throttledFlowColumns);

        throttledFlowColumns();
    }

    #column = document.querySelector('.continuous-column');
    #columnProperties = this.#column ? getComputedStyle(this.#column) : null;
    #lineHeight = parseFloat(this.#columnProperties?.getPropertyValue('line-height'));
    #paddingTop = parseFloat(this.#columnProperties?.getPropertyValue('padding-top'));
    #paddingBottom = parseFloat(this.#columnProperties?.getPropertyValue('padding-bottom'));
    #container = this.#column?.querySelector('#column-container');
    #spacer = this.#column?.querySelector('#spacer');

    #mediaQuery = matchMedia('screen and (width > 800px) and (device-width >= 750px)');
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
                + this.#paddingTop
                + 2 * this.#paddingBottom;

        this.#column.style.cssText =
            `--offset-remainder: ${remainder}px;` +
            `--column-offset: ${roundedOffset}px;` +
            `--spacer-height: ${wantedBottomOffset}px;` +
            `--spacer-display: ${wantedBottomOffset  > 0 ? 'block' : 'none'};`;
    };
}

export default FlowingColumns;
