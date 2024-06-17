class Columns {
    animationFrameID = null;
    column = document.getElementById('continuous-column');
    offsetOriginal = 0;
    spacer = document.getElementById('spacer');
    spacerChild = document.getElementById('spacer-child');
    content = document.getElementById('column-content');
    offsetOld = this.offsetOriginal;

    firstParagraph = this.content?.firstElementChild;

    secondParagraph = this.firstParagraph?.nextElementSibling;
    secondParagraphLineHeight = this.secondParagraph
        ? parseInt(window.getComputedStyle(this.secondParagraph).getPropertyValue('line-height'))
        : null;

    diffMoreThan = (x, y, z) => Math.abs(x - y) > z;
    roundNearest = (x, y) => y * Math.round(x / y);
    roundUneven = (x) => 1 + (2 * Math.round(x / 2));
    roundNearestUneven = (x, y) => y * this.roundUneven(Math.round(x / y));

    flowColumns = (event) => {
        if (this.animationFrameID) {
            console.log(`[flowColumns] resetting animation in ${event.type} event`);
            window.cancelAnimationFrame(this.animationFrameID);
        }

        if (window.getComputedStyle(this.column).columnCount !== '2') {
            return;
        }

        this.animationFrameID = window.requestAnimationFrame(() => {

            // column readings
            const { top: spacerTop, height: spacerHeight } = this.spacer.getBoundingClientRect();
            const windowInnerHeight = document.documentElement.clientHeight;
            const scrollY = window.scrollY;

            let adjustment = spacerTop - (windowInnerHeight - 42);

            if (adjustment < 0) {
                // we are overshooting
                console.log('[flowColumns] overshooting');
                adjustment *= 0.5;
            } else {
                // we are undershooting
                console.log('[flowColumns] undershooting');
                adjustment *= 2;
            }

            console.log('adjustment', adjustment);

            const heightNew = spacerHeight + adjustment - 1;

            console.log('spacerHeight', spacerHeight, 'spacerTop', spacerTop, 'scrollY', scrollY, 'windowInnerHeight', windowInnerHeight, 'heightNew', heightNew);
            console.log(this.spacer.getBoundingClientRect());

            this.spacerChild.style.height = `${heightNew}px`;

            // offset of page readings
            const offsetNeeded = this.roundNearestUneven(window.scrollY + this.offsetOriginal, this.secondParagraphLineHeight);

            // adjust offset
            this.column.style.setProperty('--column-offset', `${offsetNeeded}px`);
            this.offsetOld = offsetNeeded;

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
    };
}

export { Columns };
