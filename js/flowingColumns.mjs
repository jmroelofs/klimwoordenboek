class FlowingColumns {  
    constructor() {
        if (this.#column) {
            this.#mediaQuery.addEventListener('change', event => this.#matchesMedia = event.matches);
            this.#handleEvent({ type: 'init' });
            ['scroll', 'resize'].forEach(event =>
                window.addEventListener(event, this.#handleEvent, { passive: true, capture: true })
            );
        }
    }

    #animationFrameID = null;

    #column = document.querySelector('.continuous-column');
    #spacer = this.#column?.querySelector('#spacer');
    #lastParagraph = this.#column?.lastElementChild;
    #paragraphLineHeight = this.#lastParagraph
        ? parseInt(window.getComputedStyle(this.#lastParagraph).getPropertyValue('line-height'))
        : null;
    #middleHeaderHeight = this.#column?.querySelector('p+h3')?.getBoundingClientRect().height
        ?? this.#paragraphLineHeight;

    #offsetOld = 0;
    #heightOld = 1;

    #mediaQuery = window.matchMedia('screen and (width > 800px) and (device-width >= 750px)');
    #matchesMedia = this.#mediaQuery.matches;

    #diffMoreThan = (x, y, threshold) => Math.abs(x - y) > threshold;
    #roundNearest = (value, by) => by * Math.round(value / by);
    #clamp = (min, value, max) => Math.min(Math.max(value, min), max)

    #flowColumns = () => {
        // offset of page readings
        const
            offsetNeeded = this.#roundNearest(window.scrollY, this.#paragraphLineHeight),
            offsetDifference = offsetNeeded - this.#offsetOld,
            // column readings
            {top: spacerTop, bottom: spacerBottom} = this.#spacer.getBoundingClientRect(),
            {bottom: lastParagraphBottom} = [...this.#lastParagraph.getClientRects()].at(-1);

        // calculate height of spacer
        let calculatedHeight;

        if (spacerBottom >= lastParagraphBottom) {
            // we are overshooting
            // console.log('[flowColumns] overshooting');

            const heightNeeded = lastParagraphBottom - spacerTop;
            calculatedHeight = heightNeeded - offsetDifference;

        } else {
            // we are undershooting
            // console.log('[flowColumns] undershooting');

            const heightNeeded =  this.#column.getBoundingClientRect().bottom - spacerTop;
            calculatedHeight = (2 * heightNeeded) - this.#heightOld - offsetDifference;

        }

        // add an extra margin on top: with a maximum of the height of the biggest child and a minimum of half a line
        const
            safetyMargin = this.#clamp(
                this.#paragraphLineHeight,
                calculatedHeight / document.documentElement.clientHeight * this.#paragraphLineHeight,
                this.#middleHeaderHeight / 2
            ),
            heightNew = Math.max(1, calculatedHeight + safetyMargin);

        // adjust offset
        this.#column.style.setProperty('--column-offset', `${offsetNeeded}px`);
        this.#offsetOld = offsetNeeded

        // adjust height of spacer
        if (this.#diffMoreThan(heightNew, this.#heightOld, 1)) {
            this.#spacer.style.height = `${heightNew}px`;
            this.#heightOld = heightNew;
        }

        this.#animationFrameID = null;
    };

    #handleEvent = event => {
        if (this.#animationFrameID) {
            console.log(`[flowColumns] resetting animation in ${event.type} event`);
            window.cancelAnimationFrame(this.#animationFrameID);
            this.#animationFrameID = null;
        }

        if (this.#matchesMedia) {
            this.#animationFrameID = window.requestAnimationFrame(this.#flowColumns);
        }        
    };
}

export { FlowingColumns };
