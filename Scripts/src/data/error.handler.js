/*// Include the error handler and the custom status message
var includeErrorStatusHandler = function (settings)
{

    // Redirect to Login page when the ajax calls returns 401 or 403
    var redirectToLogin = function ()
    {

        window.location.href = window.location.href;

    };

    return extend(true, settings || {}, {
        error: function (jqXHR, textStatus, errorThrown)
        {

            // Redirect the page to login. No error should be thrown
            if (jqXHR.getResponseHeader('Connection') === 'Close' && jqXHR.status == '200')
                this.statusCode['302'].apply(this, arguments);

                // Give a more descriptive error message
            else if (this.statusCode[jqXHR.status])
                this.statusCode[jqXHR.status].apply(this, arguments);
            else
                log.error(errorThrown);

        },
        // Returns default error messages if there is no custom error function assigned to Upside.DSE.Ajax.Object[methodName].serviceError
        statusCode: {
            // Redirect to an informed login URL or return error message
            0: function () { log.error("0 - Is \"" + this.url + "\" a valid address?"); },
            302: function ()
            {

                // Redirect to Login page if the page should redirect
                // Have in mind that 302 is not passed to the deffered object. It can be handled by the browser
                // before jQuery can do anything about it. The symptom for a redirect usually is Connection equal to "Close"
                // and status 200.
                redirectToLogin();

                // Using info to avoid throw an error when trying to redirect
                log.info("302 - The server redirected the return URL for \"" + this.url + "\".");

            },
            401: function ()
            {

                // Redirect to Login page if the authentication failed
                redirectToLogin();

                // Using info to avoid throw an error when trying to redirect
                log.info("401 - The authentication for \"" + this.url + "\" failed.");

            },
            403: function ()
            {

                // Redirect to Login page if the authentication failed
                redirectToLogin();

                // Using info to avoid throw an error when trying to redirect
                log.info("403 - The authentication for \"" + this.url + "\" is denied.");

            },
            404: function () { log.error("404 - The page \"" + this.url + "\" could not be found or the type \"" + this.method + "\" is not the expected."); },
            405: function () { log.error("405 - The page \"" + this.url + "\" could not be displayed."); },
            407: function () { log.error("407 - You need proxy authentication for \"" + this.url + "\""); },
            408: function () { log.error("408 - The server return time out for \"" + this.url + "\"."); },
            414: function () { log.error("414 - The url \"" + this.url + "\" is too long."); },
            500: function () { log.error("500 - Internal server error for the url \"" + this.url + "\""); },
            503: function () { log.error("503 - The service in \"" + this.url + "\" is currently unavailable. <b>The application may be being deployed. Please, try again in some minutes.</b>"); }
        }
    });
};*/