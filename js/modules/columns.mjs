class Columns {
    animationFrameID = null;

    root = document.documentElement
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
            spacerContentTop = spacerTop - 1,
            {bottom: lastParagraphBottom} = Array.from(this.lastParagraph.getClientRects()).pop();

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

            const heightNeeded =  this.column.getBoundingClientRect().bottom - spacerContentTop;
            calculatedHeight = (2 * heightNeeded) - this.heightOld - offsetDifference;

        }

        // add an extra margin on top: with a maximum of the height of the biggest child and a minimum of half a line
        const
            safetyMargin = Math.max(
                Math.min(1, calculatedHeight / this.root.clientHeight) * this.firstParagraphHeight,
                this.secondParagraphLineHeight / 2
            );

        let heightNew = Math.max(0, calculatedHeight + safetyMargin);
        if (! this.diffMoreThan(heightNew, this.heightOld, 1)) {
            heightNew = this.heightOld;
        }

        // setTimeout(() => {

            // adjust offset
            this.column.style.cssText = `--column-offset: ${offsetNeeded}px; --spacer-height: ${heightNew}px;`;
            this.offsetOld = offsetNeeded
            this.heightOld = heightNew;

            this.animationFrameID = null;

        // }, 0);
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
            this.mediaQuery.addEventListener('change', event => this.matchesMedia = event.matches);
            this.handleEvent({ type: 'init' });
            ['scroll', 'resize'].forEach(event =>
                window.addEventListener(event, this.handleEvent, { passive: true, capture: true })
            );
        }
    }
}

export { Columns };
