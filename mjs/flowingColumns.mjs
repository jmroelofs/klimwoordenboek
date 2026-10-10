import { throttle } from './es-toolkit/throttle.mjs';

class FlowingColumns {
    constructor() {
        this.#column = document.querySelector('.continuous-column')

        if (!this.#column) {
            return;
        }

        const
            columnProperties = getComputedStyle(this.#column),
            throttledFlowColumns = throttle(this.#flowColumns, 75, { edges: ['trailing'] });

        [this.#lineHeight, this.#paddingTop, this.#paddingBottom] =
            ['line-height', 'padding-top', 'padding-bottom']
                .map(property => columnProperties.getPropertyValue(property)).map(parseFloat);
        [this.#container, this.#spacer] =
            ['#column-container', '#spacer']
                .map(selector => this.#column.querySelector(selector));
        this.#mediaQuery = window.matchMedia('screen and (width > 800px) and (device-width >= 750px)');
        this.#matchesMedia = this.#mediaQuery.matches;

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

    #column;
    #lineHeight;
    #paddingTop;
    #paddingBottom;
    #container;
    #spacer;
    #mediaQuery;
    #matchesMedia;

    #roundNearest = (value, interval) => {
        const rounded = interval * Math.round(value / interval);
        return { rounded: rounded, remainder: value - rounded };
    };

    #flowColumns = event => {
        if (!this.#matchesMedia) {
            return;
        }

        const
            windowHeight = document.documentElement.clientHeight,
            { rounded: roundedOffset, remainder } =
                this.#roundNearest(window.scrollY, this.#lineHeight),
            { height: spacerHeight } =
                this.#spacer.getBoundingClientRect(),
            [{ height: leftColumnHeight }, { height: rightColumnHeight = 0 } = {}] =
                this.#container.getClientRects(),

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
            `--spacer-display: ${wantedBottomOffset > 0 ? 'block' : 'none'};`;
    };
}

export default FlowingColumns;
