class Columns {
    animationFrameID = null;
    column = document.getElementById('continuous-column');
    offsetOriginal = 0;
    lastParagraph = document.getElementById('last-paragraph');
    spacer = document.getElementById('spacer');
    spacerChild = document.getElementById('spacer-child');
    content = document.getElementById('column-content');
    offsetOld = this.offsetOriginal;
    heightOld = 0;
    
    firstParagraph = this.content?.firstElementChild;

    firstParagraphHeight = this.firstParagraph?.getBoundingClientRect().height;
    secondParagraph = this.firstParagraph?.nextElementSibling;
    secondParagraphLineHeight = this.secondParagraph
        ? parseInt(window.getComputedStyle(this.secondParagraph).getPropertyValue('line-height'))
        : null;
    secondParagraphHalfLineHeight = this.secondParagraphLineHeight / 2;

    diffMoreThan = (x, y, z) => Math.abs(x - y) > z;
    roundNearest = (x, y) => y * Math.round(x / y);

    flowColumns = (event) => {
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
                offsetNeeded = this.roundNearest(window.scrollY + this.offsetOriginal, this.secondParagraphLineHeight);

// hier moet nog closest

console.log(offsetNeeded, this.offsetOriginal, this.secondParagraphLineHeight);

            //     offsetDifference = offsetNeeded - this.offsetOld,

            //     // column readings
            //     {top: spacerTop, bottom: spacerBottom} = this.spacer.getBoundingClientRect(),
            //     spacerChildTop = spacerTop - 1,
            //     {bottom: columnBottom} = this.column.getBoundingClientRect(),
            //     {bottom: lastParagraphBottom} = this.lastParagraph.getBoundingClientRect(),

            //     // use document.documentElement.clientHeight instead of window.innerHeight to accomodate Safari on iPad
            //     windowInnerHeight = document.documentElement.clientHeight;

            // // calculate height of spacer
            // let
            //     heightNeeded,
            //     calculatedHeight;

            // if (spacerBottom >= lastParagraphBottom) {
            //     // we are overshooting
            //     // console.log('[flowColumns] overshooting');

            //     heightNeeded = lastParagraphBottom - spacerChildTop;
            //     calculatedHeight = heightNeeded - offsetDifference;

            // } else {
            //     // we are undershooting
            //     // console.log('[flowColumns] undershooting');

            //     heightNeeded = columnBottom - spacerChildTop;
            //     calculatedHeight = (2 * heightNeeded) - this.heightOld - offsetDifference;

            // }

            // // add an extra margin on top: with a maximum of the height of the biggest child and a minimum of half a line
            // const
            //     safetyMargin = Math.max(
            //         Math.min(1, calculatedHeight / windowInnerHeight)
            //             * this.firstParagraphHeight, this.secondParagraphHalfLineHeight
            //     ),
            //     heightNew = Math.max(0, calculatedHeight + safetyMargin);

            // adjust offset
            this.column.style.setProperty('--column-offset', `${offsetNeeded}px`);
            this.offsetOld = offsetNeeded

            // // adjust height of spacer
            // if (this.diffMoreThan(heightNew, this.heightOld, 1)) {
            //     this.spacerChild.style.height = `${heightNew}px`;
            //     this.heightOld = heightNew;
            // }

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
