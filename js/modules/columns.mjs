class Columns {
    animationFrameID = null;
    column = document.getElementById('continuous-column');
    offsetOriginal = 42;
    spacer = document.getElementById('spacer');

    secondParagraph = this.spacer?.nextElementSibling?.nextElementSibling;
    secondParagraphLineHeight = this.secondParagraph
        ? parseInt(window.getComputedStyle(this.secondParagraph).getPropertyValue('line-height'))
        : null;

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

            // offset of page readings
            const offsetNeeded = this.roundNearest(window.scrollY + this.offsetOriginal, this.secondParagraphLineHeight);

            // adjust offset
            this.column.style.setProperty('--column-offset', `${offsetNeeded}px`);
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
