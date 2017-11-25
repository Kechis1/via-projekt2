+function ($) {
    "use strict";

    var FILE_MESSAGES_PATH = "json/messages.json";

    var CLASS_HAS_ERROR = "has-error"; 
    var CLASS_HELP_BLOCK = "help-block";
    var CLASS_MSG_MINLENGTH = "msg-minlength";
    var CLASS_MSG_MAXLENGTH = "msg-maxlength";
    var CLASS_MSG_EMPTY = "msg-empty";
    var CLASS_MSG_EMAILPATTERN = "msg-emailpattern";

    var ATTR_MIN_LENGTH = "minlength";
    var ATTR_MAX_LENGTH = "maxlength";

    var form = "form[data-input-validation='on']";
    var inputs = form + " :input[required]";
    var inputEmail = form + " :input[type='email']";

    var messages = null;


    $.getJSON(FILE_MESSAGES_PATH, function(json) {
        messages = json;
    });

    $(document).on('keyup change', inputs, function () {
        var $this = $(this);
        var $parent = $this.parent();
        var minlength = $this.attr(ATTR_MIN_LENGTH);
        var maxlength = $this.attr(ATTR_MAX_LENGTH);
        var length = $.trim($this.val()).length;
        var $counter = $this.prev();

        var n = $counter.text().indexOf('/');
        var result = $counter.text().substring(n + 1);

        $counter.text(length + "/" + result);
        verifyEmpty(messages, length, $parent);
        verifyMinCharacters(messages, length, minlength, $parent);
        verifyMaxCharacters(messages, length, maxlength, $parent);
        verifyClassHasError($parent);
    });

    $(document).on('keyup', inputEmail, function () {
        var $this = $(this);
        var $parent = $this.parent();

        verifyEmailPattern(messages, $parent, $this);
        verifyClassHasError($parent);
    });

    function verifyClassHasError($parent) {
        if ($parent.hasClass(CLASS_HAS_ERROR) && $parent.find("." + CLASS_HELP_BLOCK).children().length === 0) {
            $parent.removeClass(CLASS_HAS_ERROR);
        } else if ($parent.hasClass(CLASS_HAS_ERROR) === false && $parent.find("." + CLASS_HELP_BLOCK).children().length > 0) {
            $parent.addClass(CLASS_HAS_ERROR);
        }
    }

    function verifyMinCharacters(messages, length, minlength, $parent) {
        if (minlength > length && $parent.find("." + CLASS_MSG_MINLENGTH).length === 0) {
            $parent.find("." + CLASS_HELP_BLOCK).append(
                '<p class="'+CLASS_MSG_MINLENGTH+'">' + messages.error.THIS_FIELD_IS_TOO_SHORT + '</p>'
            );
        } else if (minlength <= length) {
            $parent.find("." + CLASS_MSG_MINLENGTH).remove();
        }
    }

    function verifyMaxCharacters(messages, length, maxlength, $parent) {
        if (maxlength < length && $parent.find("." + CLASS_MSG_MAXLENGTH).length === 0) {
            $parent.find("." + CLASS_HELP_BLOCK).append(
                '<p class="'+CLASS_MSG_MAXLENGTH+'">' + messages.error.THIS_FIELD_IS_TOO_LONG + '</p>'
            );
        } else if (maxlength >= length) {
            $parent.find("." + CLASS_MSG_MAXLENGTH).remove();
        }
    }

    function verifyEmailPattern(messages, $parent, $element) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test($element.val()) === false && $parent.find("." + CLASS_MSG_EMAILPATTERN).length === 0) {
            $parent.find("." + CLASS_HELP_BLOCK).append(
                '<p class="'+CLASS_MSG_EMAILPATTERN+'">' + messages.error.THIS_NEEDS_TO_BE_A_VALID_EMAIL + '</p>'
            );
        } else if (re.test($element.val())) {
            $parent.find("." + CLASS_MSG_EMAILPATTERN).remove();
        }
    }

    function verifyEmpty(messages, length, $parent) {
        if (length === 0 && $parent.find("." + CLASS_MSG_EMPTY).length === 0) {
            $parent.find("." + CLASS_HELP_BLOCK).append(
                '<p class="'+CLASS_MSG_EMPTY+'">' + messages.error.THIS_FIELD_IS_REQUIRED + '</p>'
            );
        } else if (length > 0) {
            $parent.find("." + CLASS_MSG_EMPTY).remove();
        }
    }
}(jQuery);