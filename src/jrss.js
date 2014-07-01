function JRss(xml) {
    this._parse(xml);
};

JRss.prototype = {

    _parse: function(xml) {

        if (jQuery('rss', xml).length == 0) this.version = '1.0';
        else this.version = jQuery('rss', xml).eq(0).attr('version');

        var channel = jQuery('channel', xml).eq(0);

        this.title = jQuery(channel).find('title:first').text();
        this.link = jQuery(channel).find('link:first').text();
        this.description = jQuery(channel).find('description:first').text();
        this.language = jQuery(channel).find('language:first').text();
        this.updated = jQuery(channel).find('lastBuildDate:first').text();

        this.items = new Array();

        var feed = this;

        jQuery('item', xml).each(function() {

            var item = new JFeedItem();
            var t = jQuery(this);

            item.title = t.find('title').eq(0).text();
            item.link = t.find('link').eq(0).text();
            item.description = t.find('description').eq(0).text();
            item.updated = t.find('pubDate').eq(0).text();
            item.id = t.find('guid').eq(0).text();

            item.content = t.find('content\\:encoded').eq(0).text();
            if (!item.content) item.content = t.find('encoded').eq(0).text();

            item.image = jQuery(item.content).find('img').eq(0).attr('src');
            if (!item.image) item.image = jQuery(item.description).find('img').eq(0).attr('src');

            item.author = t.find('dc\\:creator').eq(0).text();
            if (!item.author) item.author = t.find('creator').eq(0).text();

            var point = t.find('georss\\:point').eq(0).text();
            if (!point) point = t.find('point').eq(0).text();
            if (point.length > 0) {
                point = point.split(" ");
                item.coordinates = [point[1], point[0]];
            }

            var enclosure = t.find('enclosure');
            if (enclosure.length > 0) {
                item.enclosure = {
                    url: enclosure.attr('url'),
                    type: enclosure.attr('type')
                }
            }

            // Now let's go through all items and those not covered above will just be added by their native innerhtml code.
            t.children().each(function() {
                var nodeName = this.nodeName.toLowerCase();
                if (typeof item[nodeName] === 'undefined' || item[nodeName] === '') {
                    item[nodeName] = this.innerHTML;
                }
            });


            feed.items.push(item);
        });
    }
};