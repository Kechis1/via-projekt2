+function ($) {

    var button = ".gallery .img-preview";
    var buttonClose = ".mfp-close";
    var buttonPrev = ".mfp-arrow-left";
    var buttonNext = ".mfp-arrow-right";
    var count = null;

    $(document).ready(function () { count = $(button).length; });

    $(document).keyup(function(e) {
        switch (e.keyCode) {
            case 27:
                $(buttonClose).trigger('click');
                break;
            case 37:
                $(buttonPrev).trigger('click');
                break;
            case 39:
                $(buttonNext).trigger('click');
                break;
        }
    });

    $(document).on('click', button, function (event) {
        var $this = $(this);
        var $body = $('body');
        var title = $this.attr("title");
        var href = $this.attr("href");
        var index = parseInt($this.parents(".col-md-3").index()) + 1;

        $body.addClass('mfp-open');
        $body.prepend('<div class="mfp-bg"></div><div id="mfp"><div class="mfp-container"><div class="mfp-content"><div class="mfp-figure"><button title="Close" type="button" class="mfp-close">×</button><figure><img class="mfp-img" src="'+href+'"><figcaption><div class="mfp-bottom-bar"><div class="mfp-title">'+title+'</div><div class="mfp-counter">'+index+' of '+count+'</div></div></figcaption></figure></div></div><button title="Previous" type="button" class="mfp-arrow mfp-arrow-left mfp-prevent-close fa fa-caret-left"></button><button title="Next" type="button" class="mfp-arrow fa fa-caret-right mfp-arrow-right mfp-prevent-close"></button></div></div>');

        event.preventDefault();
    });

    $(document).on('click', buttonClose, function () {
        $("body").removeClass("mfp-open");
        $(".mfp-bg, #mfp").remove();
    });

    $(document).on('click', buttonPrev, function () {
        var currentSrc = $(".mfp-content").find("img").attr("src");
        var currentIndex = parseInt($(".gallery").find("img[src='" + currentSrc + "']").parents(".col-md-3").index()) + 1;
        var nextIndex = currentIndex === 1 ? count : currentIndex - 1;
        var $nextParent = $(".gallery .col-md-3:nth-child("+nextIndex+")");
        var nextImg = {
            src: $nextParent.find(".img-preview").attr("href"),
            title: $nextParent.find(".img-preview").attr("title"),
            index: nextIndex
        };

        $(".mfp-img").attr("src", nextImg.src);
        $(".mfp-title").text(nextImg.title);
        $(".mfp-counter").text(nextImg.index + " of " + count);
    });

    $(document).on('click', buttonNext, function () {
        var currentSrc = $(".mfp-content").find("img").attr("src");
        var currentIndex = parseInt($(".gallery").find("img[src='" + currentSrc + "']").parents(".col-md-3").index()) + 1;
        var nextIndex = currentIndex === count ? 1 : currentIndex + 1;
        var $nextParent = $(".gallery .col-md-3:nth-child("+nextIndex+")");
        var nextImg = {
            src: $nextParent.find(".img-preview").attr("href"),
            title: $nextParent.find(".img-preview").attr("title"),
            index: nextIndex
        };

        $(".mfp-img").attr("src", nextImg.src);
        $(".mfp-title").text(nextImg.title);
        $(".mfp-counter").text(nextImg.index + " of " + count);
    });

}(jQuery);