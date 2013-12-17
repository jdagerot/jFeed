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
            item.link = t.find('link').eq(0).text();
            item.description = t.find('content').eq(0).text();
            item.content = t.find('content').eq(0).text();
            item.updated = t.find('updated').eq(0).text();
            item.id = t.find('id').eq(0).text();
            item.author = t.find('author name').eq(0).text();

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

