$(document).on('turbolinks:load', function() {
	
	var tweet
	var user_id
	var content
	var time
	var modal
	var postId
	var postImg
	var userName
	var userImg
	
	
    $(".home").on('click', function() {
        window.location.href = '/posts/index';
    });
    
    
    $(".comment").on("click", function(e) {
    	alert("test");
    	e.stopPropagation();
    });
    
    $(".retweet").on("click", function(e) {
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
			data: {postId: postId}
		});
    	
    	$(this).toggleClass("liked");
    	
    	if ($("#tweet-detail").css("display") !== "none") {
			tweet.find(".like").toggleClass("liked");
		}
    });
    
    $(".tweet-message").on("click", function(e) {
    	alert("test");
    	e.stopPropagation();
    });
    
    
    $("#tweet-detail").on('show.bs.modal', function (e) {
		tweet = $(e.relatedTarget);
		user_id = tweet.data('user_id');
		content = tweet.data('content');
		time = tweet.data('time');
		modal = $(this);
		postId = tweet.data('post-id');
		postImg = tweet.data('post-img');
		userName = tweet.data('user-name');
		userImg = tweet.data('user-img');
		tweet.attr("data-post-id", postId);
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
	});
	
	$("#destroy").on('click', function() {
		let id = $("#tweet-detail").attr("data-id");
		
		$.ajax({
			url: "/posts/destroyTweet",
			method: "POST",
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
	
			
});
