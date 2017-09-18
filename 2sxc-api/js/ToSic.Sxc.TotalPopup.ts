
module ToSic.Sxc {

    export class TotalPopup {
        open(url: string, callback: Function): void {
            // count parents to see how high the z-index needs to be
            let z = 10000010, p = window; // Needs at least 10000000 to be on top of the DNN9 bar
            while (p !== window.top && z < 10000100) {
                z++;
                p = p.parent;
            }

            const wrapper = document.createElement("div");
            wrapper.setAttribute("style", " top: 0;left: 0;width: 100%;height: 100%; position:fixed; z-index:" + z);
            document.body.appendChild(wrapper);

            const ifrm = document.createElement("iframe");
            ifrm.setAttribute("allowtransparency", "true");
            ifrm.setAttribute("style", "top: 0;left: 0;width: 100%;height: 100%;");
            ifrm.setAttribute("src", url);
            wrapper.appendChild(ifrm);
            document.body.className += " sxc-popup-open";
            this.frame = ifrm;
            this.callback = callback;
        }

        close(): void {
            if (this.frame) {
                document.body.className = document.body.className.replace("sxc-popup-open", "");
                const frm = this.frame;
                frm.parentNode.parentNode.removeChild(frm.parentNode);
                this.callback();
            }
        }

        closeThis(): void {
            (window.parent as any).$2sxc.totalPopup.close();
        }

        frame: any = undefined;
        callback: any = undefined;
    }

}