class Columns {
    animationFrameID = null;
    column = document.getElementById('continuous-column');
    offsetOriginal = 42;
    lastParagraph = document.getElementById('last-paragraph');
    spacer = document.getElementById('spacer');
    offsetOld = this.offsetOriginal;
    heightOld = 0.25;
    
    firstParagraph = this.spacer?.nextElementSibling;
    firstParagraphHeight = this.firstParagraph?.getBoundingClientRect().height;
    secondParagraph = this.firstParagraph?.nextElementSibling;
    secondParagraphLineHeight = this.secondParagraph
        ? parseInt(window.getComputedStyle(this.secondParagraph).getPropertyValue('line-height'))
        : null;
    secondParagraphHalfLineHeight = this.secondParagraphLineHeight / 2;

    diffMoreThan = (x, y, z) => Math.abs(x - y) > z;
    roundNearest = (x, y) => y * Math.round(x / y);

    flowColumns = (event) => {
        if (event.type === 'init' ) {
            this.spacer.style.height = `${this.heightOld}px`
        }

        if (this.animationFrameID) {
            console.log(`[flowColumns] resetting animation in ${event.type} event`);
            window.cancelAnimationFrame(this.animationFrameID);
        }

        if (window.getComputedStyle(this.column).columnCount !== '2') {
            return;
        }

        this.animationFrameID = window.requestAnimationFrame(() => {

            // do all the reading in the beginning

            // offset of page readings
            const
                offsetNeeded = this.roundNearest(window.scrollY + this.offsetOriginal, this.secondParagraphLineHeight),
                offsetDifference = offsetNeeded - this.offsetOld,

                // column readings
                spacerRec = this.spacer.getBoundingClientRect(),
                columnRec = this.column.getBoundingClientRect(),
                lastParagraphRec = this.lastParagraph.getBoundingClientRect(),

                // use document.documentElement.clientHeight instead of window.innerHeight to accomodate Safari on iPad
                windowInnerHeight = document.documentElement.clientHeight;

            // calculate height of spacer
            let
                heightNeeded,
                calculatedHeight;

            if (spacerRec.bottom >= lastParagraphRec.bottom) {
                // we are overshooting
                // console.log('[flowColumns] overshooting');

                heightNeeded = lastParagraphRec.bottom - spacerRec.top;
                calculatedHeight = heightNeeded - offsetDifference;

            } else {
                // we are undershooting
                // console.log('[flowColumns] undershooting');

                heightNeeded = columnRec.bottom - spacerRec.top;
                calculatedHeight = (2 * heightNeeded) - this.heightOld - offsetDifference;

            }

            // add an extra margin on top: with a maximum of the height of the biggest child and a minimum of half a line
            const
                safetyMargin = Math.max(
                    Math.min(1, calculatedHeight / windowInnerHeight)
                        * this.firstParagraphHeight, this.secondParagraphHalfLineHeight
                ),
                // we need a minumum of 0.25 pixel, or else the margin of the spacer is not picked up
                // zero heigth is ignored by getBoundingClientRect
                // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
                // 0.1 pixel gave a very long repaint time on the 'waardering' page on chrome on a 1000 px wide screen
                heightNew = Math.max(0.25, calculatedHeight + safetyMargin);

            // adjust offset
            this.column.style.setProperty('--column-offset', `${offsetNeeded}px`);
            this.offsetOld = offsetNeeded

            // adjust height of spacer
            if (this.diffMoreThan(heightNew, this.heightOld, 1)) {
                this.spacer.style.height = `${heightNew}px`;
                this.heightOld = heightNew;
            }

            this.animationFrameID = null;
        });
    };


    setupFlow = () => {
        if (this.column) {
            this.flowColumns({ type: 'init' });
            ['scroll', 'resize'].forEach(event =>
                window.addEventListener(event, this.flowColumns, { passive: true, capture: true })
            );
        }
    }
}

export { Columns };
