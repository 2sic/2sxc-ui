(function () {
    $2sxc._modernDialog = Dialog();

    function Dialog() {
        var frame;
        return {
            create: create,
            remove: remove,
        };

        /**
         * Creates a new dialog.
         * @param {*object} sxc sxc instance
         * @param {*string} url the frame src
         * @param {*boolean} fullscreen fullscreen flag
         */
        function create(sxc, url, fullscreen) {
            if (frame) remove();
            frame = document.createElement('iframe');
            if (fullscreen) {
                frame.style.width = frame.style.height = '100%';
                frame.style.position = 'fixed';
                frame.style.top = frame.style.left = 0;
            }
            frame.setAttribute('src', url);
            document.body.appendChild(frame);
            window.addEventListener('message', function (ev) {
                if (ev.data === 'closeFrame') remove();
            });
        }

        /**
         * Remove the dialog.
         */
        function remove() {
            frame.remove();
        }
    }
})();