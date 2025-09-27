class Columns {
    animationFrameID = null;

    root = document.documentElement
    column = document.getElementsByClassName('continuous-column')[0];
    offsetOriginal = this.column 
        ? parseInt(window.getComputedStyle(this.column).getPropertyValue('--column-offset'))
        : null;
    spacer = this.column
        ? document.createElement('div')
        : null;
    lastParagraph = this.column?.lastElementChild;    
    firstParagraph = this.column?.firstElementChild;
    firstParagraphHeight = this.firstParagraph?.getBoundingClientRect().height;
    secondParagraph = this.firstParagraph?.nextElementSibling;
    secondParagraphLineHeight = this.secondParagraph
        ? parseInt(window.getComputedStyle(this.secondParagraph).getPropertyValue('line-height'))
        : null;

    offsetOld = this.offsetOriginal;
    heightOld = 1;

    mediaQuery = window.matchMedia('screen and (min-width: 801px) and (min-device-width: 750px)');
    matchesMedia = this.mediaQuery.matches;

    diffMoreThan = (x, y, z) => Math.abs(x - y) > z;
    roundNearest = (x, y) => y * Math.round(x / y);

    flowColumns = () => {
        // offset of page readings
        const
            offsetNeeded = this.roundNearest(window.scrollY + this.offsetOriginal, this.secondParagraphLineHeight),
            offsetDifference = offsetNeeded - this.offsetOld,
            // column readings
            {top: spacerTop, bottom: spacerBottom} = this.spacer.getBoundingClientRect(),
            {bottom: lastParagraphBottom} = [...this.lastParagraph.getClientRects()].at(-1);

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

            const heightNeeded =  this.column.getBoundingClientRect().bottom - spacerTop;
            calculatedHeight = (2 * heightNeeded) - this.heightOld - offsetDifference;

        }

        // add an extra margin on top: with a maximum of the height of the biggest child and a minimum of half a line
        const
            safetyMargin = Math.max(
                Math.min(1, calculatedHeight / this.root.clientHeight) * this.firstParagraphHeight,
                this.secondParagraphLineHeight / 2
            ),
            heightNew = Math.max(1, calculatedHeight + safetyMargin);

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

        if (this.matchesMedia) {
            this.animationFrameID = window.requestAnimationFrame(this.flowColumns);
        }        
    };
  
    setupFlow = () => {
        if (this.column) {
            this.spacer.id = 'spacer';
            this.column.prepend(this.spacer);
            this.mediaQuery.addEventListener('change', event => this.matchesMedia = event.matches);
            this.handleEvent({ type: 'init' });
            ['scroll', 'resize'].forEach(event =>
                window.addEventListener(event, this.handleEvent, { passive: true, capture: true })
            );
        }
    }
}

export { Columns };
