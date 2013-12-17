function JAtom(xml) {
    this._parse(xml);
};

JAtom.prototype = {

    _parse: function(xml) {

        var channel = jQuery('feed', xml).eq(0);

        this.version = '1.0';
        this.title = jQuery(channel).find('title:first').text();
        this.link = jQuery(channel).find('link:first').attr('href');
        this.description = jQuery(channel).find('subtitle:first').text();
        this.language = jQuery(channel).attr('xml:lang');
        this.updated = jQuery(channel).find('updated:first').text();

        this.items = new Array();

        var feed = this;

        jQuery('entry', xml).each( function() {

            var item = new JFeedItem();
            var t = jQuery(this);

            item.title = t.find('title').eq(0).text();
            item.description = t.find('content').eq(0).text();
            item.content = t.find('content').eq(0).text();
            item.updated = t.find('updated').eq(0).text();
            item.id = t.find('id').eq(0).text();
            item.author = t.find('author name').eq(0).text();

            t.find('link').each(function() {
                var t = jQuery(this);
                var rel = t.attr('rel');

                if (rel == 'enclosure') {
                    item.enclosure = {
                        url: t.attr('url'),
                        type: t.attr('type')
                    }
                }

                /*
                 * RFC 4287 - 4.2.7.2: take first encountered 'link' node
                 *                     to be of the 'alternate' type.
                 */
                if ((rel == 'alternate') || (!rel && !item.link)) {
                    item.link = t.attr('href');
                }
            });

            var point = t.find('georss\\:point').eq(0).text();
            if (!point) point = t.find('point').eq(0).text();
            if (point.length > 0) {
                point = point.split(" ");
                item.coordinates = [point[1], point[0]];
            }

            feed.items.push(item);
        });
    }
};

