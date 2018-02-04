$(document).on('turbolinks:load', function() {
	
	let tweet
	let user_id
	let content
	let time
	let modal
	let postId
	let postImg
	let userName
	let userImg
	let popover_user = []
	
	
    $(".home").on('click', function() {
        window.location.href = '/posts/index';
    });
    
    
    $(".comment").on("click", function(e) {
    	alert("test");
    	e.stopPropagation();
    });
    
    $(".like").on("click", function(e) {
		e.stopPropagation();
		if (!tweet) {
			tweet = $(this).parents(".body-tweets")
		}
    	postId = tweet.data('post-id');
    	
    	$.ajax({
			url: "/posts/like",
			method: "POST",
			cache: false,
			data: {postId: postId}
		});
    	
    	$(this).toggleClass("liked");
    	
    	if ($("#tweet-detail").css("display") !== "none") {
			tweet.find(".like").toggleClass("liked");
		}
    });
    
    $(".retweet").on("click", function(e) {
		e.stopPropagation();
		if (!tweet) {
			tweet = $(this).parents(".body-tweets")
		}
    	postId = tweet.data('post-id');
    	
    	$.ajax({
			url: "/posts/retweet",
			method: "POST",
			cache: false,
			data: {postId: postId}
		});
    	
    	$(this).toggleClass("retweeted");
    	
    	if ($("#tweet-detail").css("display") !== "none") {
			tweet.find(".retweet").toggleClass("retweeted");
		}
    });
    
    $(".tweet-message").on("click", function(e) {
    	alert("test");
    	e.stopPropagation();
    });
    
    $(".body-tweets").on('click', function (e) {
    	if ($(this).find(".popover-content").length == 0) {
			tweet = $(this);
			user_id = tweet.data('user_id');
			content = tweet.data('content');
			time = tweet.data('time');
			modal = $('#tweet-detail');
			postId = tweet.data('post-id');
			postImg = tweet.data('post-img');
			userName = tweet.data('user-name');
			userImg = tweet.data('user-img');
			modal.attr("data-post-id", postId);
			modal.find(".bodyTweets-top").children(".bodyTweets-user").text(userName);	
			modal.find(".bodyTweets-top").children(".bodyTweets-idTime").text("@" + user_id + "- " + time);
			modal.find(".bodyTweets-bottom").children("p").text(content);
			modal.find(".bodyTweets-bottom img").remove();
			if (postImg) {
				let post_image = '<img src="/images/user_images/srcUser/srcImg">'.replace("srcImg", postImg).replace("srcUser", user_id);
				modal.find(".modal-img").append(post_image);
			}
			if (userImg == true) {
				modal.find("#modal-profilImg").attr('src', "/images/profil_images/" + user_id + ".jpg");
			}else {
				modal.find("#modal-profilImg").attr('src', "/images/profil_images/default.jpg");
			}
			if (tweet.find(".liked").length) {
				modal.find(".like").addClass("liked");
			}else {
				modal.find(".like").removeClass("liked");
			}
			if (tweet.find(".retweeted").length) {
				modal.find(".retweet").addClass("retweeted");
			}else {
				modal.find(".retweet").removeClass("retweeted");
			}
		$("#tweet-detail").modal();
    	}
	});
	
	$("#destroy").on('click', function() {
		let id = $("#tweet-detail").attr("data-post-id");
		
		$.ajax({
			url: "/posts/destroyTweet",
			method: "POST",
			cache: false,
			data: {postId: id}
		});
	});
	

	$(".body-tweet-input").focusin(function() {
		$(this).css("padding-bottom", "46px");
		$(this).css("height", "80px");
	});
	
	$(".body-tweet-input").focusout(function() {
		setTimeout(function() {
			$(".body-tweet-input").css("padding-bottom", "6px");
			$(".body-tweet-input").css("height", "40px");
		}, 100)
		
	});
	
	$("body").on("change", 'input[type="file"]', function(e) {
		let file = e.target.files[0],
			reader = new FileReader(),
			$preview = $(".preview"),
			t = this;
		
		if(file.type.indexOf("image") < 0) {
			return false;
		}
	
		reader.onload = (function(file) {
			return function(e) {
				$preview.empty();
				$preview.append($('<img>').attr({
                  src: e.target.result,
                  width: "150px",
                  title: file.name
            	}));
            	$preview.append($('<div>').attr({
            		class: "img-delete-btn"
            		}).append($('<i>').attr({
            			class: "fa fa-times"
            		}))
            	);
			};
		})(file);
		reader.readAsDataURL(file);
	});
	
	$(document).on("click", ".img-delete-btn", function() {
		$(".preview").empty();
		$('input[type="file"]').val('');
	});
	


	$('.popover-user-details').popover({
		trigger: 'manual',
		html: true
	});
	
    $(document).on("click", ".follow-btn", function(e) {
    	let user = $(this).attr("data-user");
    	$(this).toggleClass('followed');
    	if ($(this).attr("value") == "アンフォロー") {
    		$(this).attr("value", "フォロー");
    	}else {
    		$(this).attr("value", "アンフォロー");
    	}
    	
    	if ($.inArray(user, popover_user) !== -1) {
    			popover_user.some(function(v, i){
    				if (v==user) popover_user.splice(i,1);    
				});
    		}else {
				popover_user.push(user);
    		}
    	
    	$.ajax({
    		url: "/users/follow", 
    		method: "POST", 
    		cache: false,
    		data: {userId: user},
    		error:function() {
        		//取得失敗時に実行する処理
        		console.log("何らかの理由で失敗しました");
    		}
    	});
    });
	
	let popover_timeout = {};
	let popover_show = {};
	let element = {};
	
	$(document).on('mouseenter', '.popover-user-details, .popover-content', function() {
		let postId = $(this).parents(".body-tweets").attr("data-post-id")
		if (popover_timeout[postId]) {
			clearTimeout(popover_timeout[postId]);
			delete popover_timeout[postId];
		}
		if (popover_show[postId] == true) {
			return false
		}
		element[postId] = $(this)
		popover_timeout[postId] = setTimeout(function() {			
			popover_show[postId] = true;
			element[postId].popover('show');
			const user = element[postId].attr("data-user-id");
			if ($.inArray(user, popover_user) !== -1) {
				const follow_btn = $(document).find(".follow-btn")
				follow_btn.toggleClass("followed");
				if (follow_btn.attr("value") == "フォロー") {
					follow_btn.attr("value", "アンフォロー");
				}else {
					follow_btn.attr("value", "フォロー");
				}
			}
		}, 500); 
	});
	
	$(document).on('mouseleave', '.popover-user-details, .popover-content', function() {
		let postId = $(this).parents(".body-tweets").attr("data-post-id")
		if (popover_timeout[postId]) {
			clearTimeout(popover_timeout[postId]);
			delete popover_timeout[postId];
		}
		popover_timeout[postId] = setTimeout(function() {
			popover_show[postId] = false;
			element[postId].popover('hide');
		}, 500);
	});

	
			
});
