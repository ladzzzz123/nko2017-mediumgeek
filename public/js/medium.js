var Medium = (function () {
	'use strict';
	
	// Number conversion util fn
	function kFormatter(num) {
		return num > 999 ? (num/1000).toFixed(1) + 'k' : num
	}

	function parseContent(data) {
		var items = data.payload.streamItems;

		var stories = [];
		var postMap = data.payload.references.Post;
		var userMap = data.payload.references.User;
		var collection = data.payload.references.Collection;
		var item, post, urlPrefix, story, prop, user, slug;

		var minCount = 10;
		
		// build stories array
		for (var i = 0, len = Math.min(minCount, items.length); i < len; i++) {
			item = items[i];
			prop = 'postPreview';
				
			// Check if it is a story
			try {
				post = postMap[item[prop].postId];
			} catch(e) {
				if (len < minCount) { len++; }
				continue;
			}
			
			slug = userMap[post.creatorId].username;
			urlPrefix = 'https://medium.com/' + '@' + slug;
			story = {
				headline: post.title,
				subtitle: post.virtuals.subtitle,
				time: post.createdAt,
				readingTime: Math.ceil(post.virtuals.readingTime) + ' min read',
				url: urlPrefix + '/' + post.uniqueSlug,
				claps: kFormatter(post.virtuals.recommends)
			};
			stories.push(story);
		}
		return stories;
	}

	return {
		parse: parseContent
	}
})();