**jFeed: jQuery feed parser plugin**

Copyright (C) 2007-2011 Jean-François Hovinne - <http://hovinne.com/>\
Modifications (C) 2013 Scott Webber, Roovy, Inc. - <http://roovy.com> -
<https://github.com/BatsShadow/jFeed> Dual licensed under the MIT
(MIT-license.txt) and GPL (GPL-license.txt) licenses.

Usage
-----

    jQuery.getFeed(options);

**Options:**

-   `url`: the feed URL (required)
-   `data`: data to be sent to the server. See [`jQuery.ajax`][] data
    property
-   `success`: a function to be called if the request succeeds. The
    function gets passed one argument: the `JFeed` object

**Example:**

     jQuery.getFeed({
       url: 'rss.xml',
       success: function(feed) {
         alert(feed.title);
       }
     });

JFeed properties
----------------

-   `feed.type`
-   `feed.version`
-   `feed.title`
-   `feed.link`
-   `feed.description`
-   `feed.language`
-   `feed.updated`
-   `feed.items`: an array of JFeedItem

JFeedItem properties
--------------------

-   `item.title`
-   `item.link`
-   `item.description`
-   `item.content`: full text
-   `item.updated`
-   `item.id`

Please see the provided examples for more information.

A basic PHP proxy is also available (`proxy.php`), if you need to load
external feeds (for testing purposes only, do not use it on public
websites).

  [`jQuery.ajax`]: http://api.jquery.com/jQuery.ajax/