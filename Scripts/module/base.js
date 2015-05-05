define(['thrust/util', 'doT'],
function (util, doT)
{
    return function(url)
    {
        return {
            container: 'content',
            context: '.content-container',
            animate: '.fade-in',
            init: util.noop,
            destroy: util.noop,
            start: function ()
            {
                if (window.thrust && !this._readyDelay)
                {
                    this.__readyDelay = this.data.get(url);
                }
            },
            ready: function ()
            {
                return this.__readyDelay && this.__readyDelay.then(util.when.apply(this.loadContent.bind(this)));
            },
            loadContent: function (data)
            {
                if (!this.dotTemplate)
                {
                    this.dotTemplate = doT.template(data.Content.replace(/~\//g, '/'));
                }
                
                // Update Title!
                this.$().html(this.dotTemplate(data));
                document.title = data.Title;
            },
            stop: function ()
            {
            }
        }
    };
})