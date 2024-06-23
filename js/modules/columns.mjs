class Columns {
    animationFrameID = null;
    column = document.getElementById('continuous-column');
    content = document.getElementById('column-content');
    oldContentTopMargin = 0;
    oldContentBottomMargin = 0;

    secondParagraph = this.content?.firstElementChild?.nextElementSibling;
    lineHeight = this.secondParagraph
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

            const windowTop = window.scrollY,
                windowInnerHeight = document.documentElement.clientHeight,
                windowBottom = windowTop + windowInnerHeight,
                { top: columnTop, bottom: columnBottom } = this.column.getBoundingClientRect();

            this.content.style.marginBottom = `${63 - columnTop}px`;
            this.content.style.marginTop = `${Math.max(0, 21 + columnBottom - windowInnerHeight)}px`;

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
