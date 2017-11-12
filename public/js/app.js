new Vue({

	el: '#stories',

	data: {
		slug: "",
		posts: []
	},

	mounted: function () {
		this.fetchStories();
	},

	methods: {
		fetchStories: function () {
			var self = this;
			$.ajax({
					url: 'http://localhost:3000/posts',
					method: 'GET',
					data: this.slug ? {slug: this.slug} : null
					})
					.done(function (res) {
						self.posts = res.data;
					})
					.fail(function (err) {
						self.posts = self.parseData(JSON.parse(err.responseText.replace('])}while(1);</x>', '')));
					});
		},

		parseData: function (data) {
			return Medium.parse(data);
		}
	}
});