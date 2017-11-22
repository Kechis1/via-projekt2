+function ($) {
    'use strict';
    /*
    * @buttonPrev - On click adds .hidden class to the lowest article on a screen and removes .hidden class to the uppermost
    * article. Does nothing if there are no previous articles
    *
    * @buttonNext - On click adds .hidden class to the uppermost article on a screen and add a new article to the bottom
    * Does nothing if there are no more articles
    * */
    var parent = '[data-slide="vertical"]';
    var buttonPrev = parent + ' [data-slide="prev"]';
    var buttonNext = parent + ' [data-slide="next"]';

    $(document).on('click', buttonPrev, function () {
        var $this = $(this);
        var $blog = $this.parents(parent).find(".blog");
        if($blog.find(".blog-body:not(.hidden):first").prev().hasClass("hidden")) {
            console.log("fsd");
            $blog.find(".blog-body:not(.hidden):first").prev().removeClass("hidden");
            $blog.find(".blog-body:not(.hidden):last").addClass("hidden");
        }
    });

    $(document).on('click', buttonNext, function () {
        var $this = $(this);
        var $blog = $this.parents(parent).find(".blog");
        $blog.find(".blog-body:not(.hidden):first").addClass("hidden");
        if($blog.find(".blog-body:not(.hidden):last").next().hasClass("hidden")) {
            $blog.find(".blog-body:not(.hidden):last").next().removeClass("hidden");
        } else {
            $blog.append('<div class="blog-body"><div class="img-container"><img src="img/blog1.jpg" alt=""></div><div class="blog-title"><a href="#">How to Start A Successful Online Business</a></div><div class="blog-details"><span class="blog-date">June 16, 2016</span><span class="blog-author">by Abdeirahman Hani</span><span class="blog-comments"><span class="fa fa-comment-o"></span>29</span><span class="blog-labels"><span class="label label-rounded label-transparent">Business</span></span></div></div>');
        }
    });
}(jQuery);