class Columns {
    animationFrameID = null;

    column = document.getElementById('continuous-column');
    offsetOriginal = this.column 
        ? parseInt(window.getComputedStyle(this.column).getPropertyValue('--column-offset'))
        : null;
    spacer = this.column?.querySelector('#spacer');
    lastParagraph = this.column?.lastElementChild;
    
    firstParagraph = this.spacer?.nextElementSibling;
    firstParagraphHeight = this.firstParagraph?.getBoundingClientRect().height;
    secondParagraph = this.firstParagraph?.nextElementSibling;
    secondParagraphLineHeight = this.secondParagraph
        ? parseInt(window.getComputedStyle(this.secondParagraph).getPropertyValue('line-height'))
        : null;

    offsetOld = this.offsetOriginal;
    heightOld = 0;

    diffMoreThan = (x, y, z) => Math.abs(x - y) > z;
    roundNearest = (x, y) => y * Math.round(x / y);

    flowColumns = () => {
        // do all the reading in the beginning

        // offset of page readings
        const
            offsetNeeded = this.roundNearest(window.scrollY + this.offsetOriginal, this.secondParagraphLineHeight),
            offsetDifference = offsetNeeded - this.offsetOld,

            // column readings
            {top: spacerTop, bottom: spacerBottom} = this.spacer.getBoundingClientRect(),
            spacerContentTop = spacerTop - 1,
            {bottom: columnBottom} = this.column.getBoundingClientRect(),
            {bottom: lastParagraphBottom} = this.lastParagraph.getBoundingClientRect(),

            // use document.documentElement.clientHeight instead of window.innerHeight to accomodate Safari on iPad
            windowInnerHeight = document.documentElement.clientHeight;

        // calculate height of spacer
        let calculatedHeight;

        if (spacerBottom >= lastParagraphBottom) {
            // we are overshooting
            // console.log('[flowColumns] overshooting');

            const heightNeeded = lastParagraphBottom - spacerContentTop;
            calculatedHeight = heightNeeded - offsetDifference;

        } else {
            // we are undershooting
            // console.log('[flowColumns] undershooting');

            const heightNeeded = columnBottom - spacerContentTop;
            calculatedHeight = (2 * heightNeeded) - this.heightOld - offsetDifference;

        }

        // add an extra margin on top: with a maximum of the height of the biggest child and a minimum of half a line
        const
            safetyMargin = Math.max(
                Math.min(1, calculatedHeight / windowInnerHeight) * this.firstParagraphHeight,
                this.secondParagraphLineHeight / 2
            ),
            heightNew = Math.max(0, calculatedHeight + safetyMargin);

        // adjust offset
        this.column.style.setProperty('--column-offset', `${offsetNeeded}px`);
        this.offsetOld = offsetNeeded

        // adjust height of spacer
        if (this.diffMoreThan(heightNew, this.heightOld, 1)) {
            this.spacer.style.height = `${heightNew}px`;
            this.heightOld = heightNew;
        }

        this.animationFrameID = null;
    };

    handleEvent = event => {
        if (this.animationFrameID) {
            console.log(`[flowColumns] resetting animation in ${event.type} event`);
            window.cancelAnimationFrame(this.animationFrameID);
        }

        if (window.getComputedStyle(this.column).columnCount !== '2') {
            return;
        }

        this.animationFrameID = window.requestAnimationFrame(this.flowColumns);
    };

    setupFlow = () => {
        if (this.column) {
            this.handleEvent({ type: 'init' });
            ['scroll', 'resize'].forEach(event =>
                window.addEventListener(event, this.handleEvent, { passive: true, capture: true })
            );
        }
    }
}

export { Columns };
