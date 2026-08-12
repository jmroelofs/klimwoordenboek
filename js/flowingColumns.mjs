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
    #lastParagraph = this.#column?.lastElementChild;
    #paragraphLineHeight = this.#lastParagraph
        ? parseFloat(window.getComputedStyle(this.#lastParagraph).getPropertyValue('line-height'))
        : null;

    #offset = 0;
    #storedHeight = 1;

    #mediaQuery = window.matchMedia('screen and (width > 800px) and (device-width >= 750px)');
    #matchesMedia = this.#mediaQuery.matches;

    #diffMoreThan = (x, y, threshold) => Math.abs(x - y) > threshold;
    #roundNearest = (value, interval) => { 
        const rounded = interval * Math.round(value / interval);
        return { rounded: rounded, remainder: value - rounded };
    };

    #flowColumns = () => {
        // offset of page readings
        const
            {rounded: roundedOffset, remainder} = this.#roundNearest(window.scrollY, this.#paragraphLineHeight),
            offsetDifference = roundedOffset - this.#offset,
            // column readings
            { top: spacerTop, bottom: spacerBottom } = this.#spacer.getBoundingClientRect(),
            { bottom: lastParagraphBottom } = [...this.#lastParagraph.getClientRects()].at(-1);

        // calculate height of spacer
        let calculatedHeight;

        if (spacerBottom >= lastParagraphBottom - offsetDifference) {
            // we are overshooting
            // console.log('[flowColumns] overshooting');

            const heightNeeded = lastParagraphBottom - spacerTop;
            calculatedHeight = heightNeeded - offsetDifference;

        } else {
            // we are undershooting
            // console.log('[flowColumns] undershooting');

            const heightNeeded = this.#column.getBoundingClientRect().bottom - spacerTop;
            calculatedHeight = (2 * heightNeeded) - this.#storedHeight - offsetDifference;

        }

        // add a safety margin
        const
            safetyMargin = this.#paragraphLineHeight,
            heightNew = Math.max(1, calculatedHeight + safetyMargin);

        // adjust offset;
        this.#offset += offsetDifference;

        // adjust height of spacer
        if (this.#diffMoreThan(heightNew, this.#storedHeight, 1)) {
            this.#storedHeight = heightNew;
        }

        this.#column.style.cssText = 
            `--offset-remainder: ${remainder}px;` +
            `--column-offset: ${this.#offset}px;` +
            `--spacer-height: ${this.#storedHeight}px;`;

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
