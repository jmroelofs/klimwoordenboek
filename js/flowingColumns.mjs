class FlowingColumns {
    constructor() {
        if (this.#column) {
            this.#mediaQuery.addEventListener('change', event => this.#matchesMedia = event.matches);

            this.#handleEventTop({ type: 'init' });
            ['scroll', 'resize'].forEach(event =>
                window.addEventListener(event, this.#handleEventTop, { passive: true })
            );

            this.#handleEventBottom({ type: 'init' });
            ['scroll', 'resize'].forEach(event =>
                window.addEventListener(event, this.#handleEventBottom, { passive: true })
            );
        }
    }

    #topAnimationFrameID = null;
    #bottomAnimationFrameID = null;

    #column = document.querySelector('.continuous-column');
    #spacer = this.#column?.querySelector('#spacer');
    #lastParagraph = this.#column?.lastElementChild;
    #paragraphLineHeight = this.#lastParagraph
        ? parseFloat(window.getComputedStyle(this.#lastParagraph).getPropertyValue('line-height'))
        : null;
    #firstHeader = this.#column?.querySelector('h3');
    #headerHeight = this.#firstHeader?.getBoundingClientRect().height;
    #baseOffset = this.#firstHeader
        ? parseFloat(window.getComputedStyle(this.#firstHeader).getPropertyValue('padding-top'))
        : null;

    #offset = 0;
    #heightOld = 1;

    #mediaQuery = window.matchMedia('screen and (width > 800px) and (device-width >= 750px)');
    #matchesMedia = this.#mediaQuery.matches;

    #diffMoreThan = (x, y, threshold) => Math.abs(x - y) > threshold;
    #roundNearest = (value, interval) => interval * Math.round(value / interval);


    #flowTop = () => {
        // adjust offset;
        this.#column.style.setProperty(
            '--column-offset',
            `${this.#roundNearest(window.scrollY, this.#paragraphLineHeight) + this.#baseOffset}px`
        );

        this.#topAnimationFrameID = null;
    };


    #flowBottom = () => {
        // column readings
        const
            { top: spacerTop, bottom: spacerBottom } = this.#spacer.getBoundingClientRect(),
            { bottom: lastParagraphBottom } = [...this.#lastParagraph.getClientRects()].at(-1);

        // calculate height of spacer
        let calculatedHeight;

        if (spacerBottom >= lastParagraphBottom) {
            // we are overshooting
            // console.log('[flowColumns] overshooting');

            const heightNeeded = lastParagraphBottom - spacerTop;
            calculatedHeight = heightNeeded;

        } else {
            // we are undershooting
            // console.log('[flowColumns] undershooting');

            const heightNeeded = this.#column.getBoundingClientRect().bottom - spacerTop;
            calculatedHeight = (2 * heightNeeded) - this.#heightOld;

        }

        // add an extra margin on top
        const
            safetyMargin = this.#paragraphLineHeight / 2,
            heightNew = Math.max(1, calculatedHeight + safetyMargin);

        // adjust height of spacer
        if (this.#diffMoreThan(heightNew, this.#heightOld, 1)) {
            this.#spacer.style.height = `${heightNew}px`;
            this.#heightOld = heightNew;
        }

        this.#bottomAnimationFrameID = null;
    };



    #handleEventTop = event => {
        if (this.#topAnimationFrameID) {
            console.log(`[flowColumns top] resetting top animation in ${event.type} event`);
            window.cancelAnimationFrame(this.#topAnimationFrameID);
            this.#topAnimationFrameID = null;
        }

        if (this.#bottomAnimationFrameID) {
            console.log(`[flowColumns top] resetting bottom animation in ${event.type} event`);
            window.cancelAnimationFrame(this.#bottomAnimationFrameID);
            this.#bottomAnimationFrameID = null;
        }

        if (!this.#matchesMedia) {
            return;
        }

        this.#topAnimationFrameID = window.requestAnimationFrame(this.#flowTop);
    };

    #handleEventBottom = event => {
        if (this.#bottomAnimationFrameID) {
            console.log(`[flowColumns bottom] resetting bottom animation in ${event.type} event`);
            window.cancelAnimationFrame(this.#bottomAnimationFrameID);
            this.#bottomAnimationFrameID = null;
        }

        if (!this.#matchesMedia) {
            return;
        }

        this.#bottomAnimationFrameID = window.requestAnimationFrame(this.#flowBottom);
    };
}

export { FlowingColumns };
